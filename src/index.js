import './pages/index.css';
import { Card } from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';
import { Section } from './scripts/Section.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import { UserInfo } from './scripts/UserInfo.js';
import PopupSure from './scripts/PopupSure.js';

const buttonForEdit = document.querySelector('.profile__edit-button');
const buttonForAdd = document.querySelector('.profile__add-button');

const popupEdit = new PopupWithForm('.popup_type_name', formSubmitEditHandler);
const popupPlace = new PopupWithForm('.popup_type_place', formSubmitPlaceHandler);
const imageZoomed = new PopupWithImage('.popup_type_image');
const popupSure = new PopupSure('.popup_type_sure');

const cardsGridContainer = document.querySelector('.element');
const cardsTemplateSelector = '#cards-template';

const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const inputName = document.querySelector('.popup__field_key_name');
const inputSubtitle = document.querySelector('.popup__field_key_subtitle');
const formProfileName = document.querySelector('.popup__form_type_name');
const inputTitle = document.querySelector('.popup__field_key_title');
const inputLink = document.querySelector('.popup__field_key_image');
const formPlace = document.querySelector('.popup__form_type_place');

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__subtitle'
});

const formValidatorConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  inputErrorClass: 'popup__field_invalid',
  errorClass: 'popup__message_invalid'
};

const formValidatorName = new FormValidator(formValidatorConfig, formProfileName);
const formValidatorPlace = new FormValidator(formValidatorConfig, formPlace);

formValidatorName.enableValidation();
formValidatorPlace.enableValidation();

const cardSection = new Section({
  renderer: (cardData) => {
    const cardElement = generateCardElement(cardData);
    cardSection.addItem(cardElement);
  }
}, '.element');

async function fetchInitialCards() {
  const cohortId = 'cohort-73';
  const url = `https://mesto.nomoreparties.co/v1/${cohortId}/cards`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      authorization: '2b8cc866-b1cb-4cb1-a139-86e0e04b8844'
    }
  });

  if (response.ok) {
    const cardsData = await response.json();
    return cardsData;
  } else {
    throw new Error('Failed to fetch initial cards');
  }
}

async function generateCardElement(cardData, userId) {
  const card = new Card({
    name: cardData.name,
    link: cardData.link,
    ownerId: cardData.owner._id
  },
  cardsTemplateSelector, () => {
    imageZoomed.open(cardData.link, cardData.name);
  },
  (idCard) => {
    if (userId ===cardData.owner._id) {
    popupSure.open();
    popupSure.setSubmitSure(() => {
      deleteCard(idCard);
    });
  }
    console.log(idCard);
  }, userId);

  return card.generateCard();
}

function openPopupEdit() {
  popupEdit.open();
  inputName.value = profileName.textContent;
  inputSubtitle.value = profileSubtitle.textContent;
}

function closePopupEdit() {
  popupEdit.close();
}

async function formSubmitEditHandler(formValues) {
  const {
    'name-input': name,
    'name-subtitle': about
  } = formValues;

  try {
    const updatedUserData = await userInfo.updateProfileInfoOnServer(name, about);
    userInfo.setUserInfo(updatedUserData);
    closePopupEdit();
  } catch (error) {
    console.error(error);
  }
}

function openPopupPlace() {
  popupPlace.open();
}

function closePopupPlace() {
  popupPlace.close();
}

async function formSubmitPlaceHandler(formValues) {
  const {
    'place-edit': name,
    'place-link': link
  } = formValues;

  try {
    const cardData = { name, link };
    const cardElement = await generateCardElement(cardData); 

    cardSection.addItem(cardElement, 'afterbegin');

    closePopupPlace();
    formPlace.reset();
    formValidatorPlace.toggleButtonState();
  } catch (error) {
    console.error(error);
  }
}


async function init() {


  try {
    const userInfo = new UserInfo({
      nameSelector: '.profile__name',
      aboutSelector: '.profile__subtitle'
    });
    const userData = await userInfo.fetchUserData();
    const userId = userData._id; 


    const cardsData = await fetchInitialCards();


        const cardPromises = cardsData.map(cardData => generateCardElement(cardData, userId));

        const cardElements = await Promise.all(cardPromises);

        cardElements.forEach(cardElement => {
          cardSection.addItem(cardElement);
    });

    const initialUserData = userInfo.getUserInfo();
    userInfo.setInitialUserInfo(initialUserData);

    cardSection.renderItems();
  } catch (error) {
    console.error(error);
  }

  buttonForEdit.addEventListener('click', openPopupEdit);
  buttonForAdd.addEventListener('click', openPopupPlace);

  popupEdit.setEventListeners();
  popupPlace.setEventListeners();
  imageZoomed.setEventListeners();
  popupSure.setEventListeners();
}

init();


async function deleteCard(cardId) {
  const cohortId = 'cohort-73';
  const url = `https://mesto.nomoreparties.co/v1/${cohortId}/cards/${cardId}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      authorization: '2b8cc866-b1cb-4cb1-a139-86e0e04b8844'
    }
  });

  if (response.ok) {
    removeCardFromDOM(cardId);
  } else {
    throw new Error('Failed to delete card');
  }
}


function removeCardFromDOM(cardId) {
  const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
  if (cardElement) {
    cardElement.remove();
  }
}
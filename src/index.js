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

async function generateCardElement(cardData) {
  const card = new Card({
    name: cardData.name,
    link: cardData.link
  }, cardsTemplateSelector, () => {
    imageZoomed.open(cardData.link, cardData.name);
  }, (idCard) => {
    popupSure.open();
    popupSure.setSubmitSure(() => {
      // Запрос к апи
    });
    console.log(idCard);
  });

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

function formSubmitEditHandler(formValues) {
  const {
    'name-input': name,
    'name-subtitle': subtitle
  } = formValues;

  profileName.textContent = name;
  profileSubtitle.textContent = subtitle;
  closePopupEdit();
}

function openPopupPlace() {
  popupPlace.open();
}

function closePopupPlace() {
  popupPlace.close();
}

function formSubmitPlaceHandler(formValues) {
  const {
    'place-edit': name,
    'place-link': link
  } = formValues;
  const cardElement = generateCardElement({
    name: name,
    link: link
  });

  cardSection.addItem(cardElement, 'afterbegin');

  closePopupPlace();
  formPlace.reset();
  formValidatorPlace.toggleButtonState();
}

async function init() {
  userInfo.setInitialUserInfo();

  try {
    const cardsData = await fetchInitialCards();
    cardsData.forEach((cardData) => {
      const cardElement = generateCardElement(cardData);
      cardSection.addItem(cardElement);
    });
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

popupPlace.setSubmitCallback((formValues) => {
  formSubmitPlaceHandler(formValues);
});

init();

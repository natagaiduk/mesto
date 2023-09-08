import './pages/index.css';
import { Card } from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';
import { Section } from './scripts/Section.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import { UserInfo } from './scripts/UserInfo.js';
import PopupSure, {openPopupSure} from './scripts/PopupSure.js';
import Api from './scripts/Api.js';


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

let userId = null;

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
    const cardElement = generateCardElement(cardData, userId);
    cardSection.addItem(cardElement, 'append');
  }
}, '.element');


    const api = new Api({
      baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-73',
      headers: {
        authorization: '2b8cc866-b1cb-4cb1-a139-86e0e04b8844',
        'Content-Type': 'application/json',
      },
    });


async function init() {
  try {

    const [cardElements, userData] = await Promise.all([api.getInitialCards(), api.getUserInfo()]);

    userId = userData._id;


    const initialUserData = userInfo.getUserInfo();
    userInfo.setInitialUserInfo(initialUserData);

    cardSection.renderItems(cardElements);

    popupPlace.setSubmitCallback((formValues) => {
      formSubmitPlaceHandler(formValues);
    });



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



async function deleteCard(cardInstance) {
      try {
        popupSure.open();
        popupSure.setSubmitSure(() => {
          api.deleteCard(cardInstance.getId()).then(res => {
            cardInstance.deleteCard();
          })
        })
      } catch (error) {
        console.error('Ошибка при удалении карточки', error);
      }
    }


function generateCardElement(cardData, userId) {
  const card = new Card(
    cardData, 
    cardsTemplateSelector, 
    () => {
    imageZoomed.open(cardData.link, cardData.name);
  }, 
  deleteCard, 

  userId, 
  popupSure);

const cardElement = card.generateCard();
const buttonForDelete = cardElement.querySelector('.element__trash');



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
    const updatedUserData = await api.updateUserInfo({ name, about });
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

    const newCardData = await api.addCard({ name, link });

    const cardElement = generateCardElement(newCardData, userId);


    cardSection.addItem(cardElement, 'prepend');


    closePopupPlace();

    formPlace.reset();
    formValidatorPlace.toggleButtonState();
  } catch (error) {
    console.error('error in placehandler', error);
  }
}





//async function removeCardFromDOM(cardId, api) {
//  try {
//    await api.deleteCard(cardId);


//    const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
//    if (cardElement) {
//      cardElement.remove();
//    }
//  } catch (error) {
//    console.error('Ошибка при удалении карточки', error);
//  }
//}

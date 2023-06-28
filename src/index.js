import './pages/index.css';

import { initialCards } from './scripts/constants.js';
import { Card } from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';
import { Section } from './scripts/Section.js';
import Popup from './scripts/Popup.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import { UserInfo } from './scripts/UserInfo.js';

const buttonForEdit = document.querySelector('.profile__edit-button');
const popupEdit = new PopupWithForm('.popup_type_name', formSubmitEditHandler);
const buttonForClosingName = document.querySelector('.popup__close_type_name');
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const inputName = document.querySelector('.popup__field_key_name');
const inputSubtitle = document.querySelector('.popup__field_key_subtitle');
const formProfileName = document.querySelector('.popup__form_type_name');

const buttonForAdd = document.querySelector('.profile__add-button');
const popupPlace = new PopupWithForm('.popup_type_place', formSubmitPlaceHandler);
const inputTitle = document.querySelector('.popup__field_key_title');
const inputLink = document.querySelector('.popup__field_key_image');
const buttonForClosingPlace = document.querySelector('.popup__close_type_place');
const formPlace = document.querySelector('.popup__form_type_place');

const imageZoomed = new PopupWithImage('.popup_type_image');
const cardsGridContainer = document.querySelector('.element');

const cardsTemplateSelector = '#cards-template';

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__subtitle'
});

const userData = userInfo.getUserInfo();

userInfo.setInitialUserInfo();

const cardSection = new Section({
  items: initialCards.reverse(),
  renderer: (cardData) => {
    const cardElement = generateThisCard(cardData, imageZoomed);
    cardSection.addItem(cardElement);
  }
}, '.element');

cardSection.renderItems();

function openPopupEdit() {
  popupEdit.open();
  inputName.value = profileName.textContent;
  inputSubtitle.value = profileSubtitle.textContent;
}

function closePopupEdit() {
  popupEdit.close();
}

function formSubmitEditHandler() {
  const formValues = popupEdit._getInputValues();
  console.log(formValues);
  const name = formValues['name']; 
  const subtitle = formValues['subtitle'];

  profileName.textContent = name;
  profileSubtitle.textContent = subtitle;
  closePopupEdit();
  popupEdit.setEventListeners();
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
  const cardElement = generateThisCard({
    name: name,
    link: link
  });

  cardSection.addItem(cardElement, 'afterbegin');

  closePopupPlace();
  formPlace.reset();
  formValidatorPlace.toggleButtonState();
  popupPlace.close();
  popupPlace.setEventListeners();
}

popupPlace.setSubmitCallback(formSubmitPlaceHandler);

function generateThisCard(cardsData) {
  const card = new Card({
    name: cardsData.name,
    link: cardsData.link
  }, cardsTemplateSelector, () => {
    imageZoomed.open(cardsData.link, cardsData.name)
  }, imageZoomed);
  return card.generateCard();
}

buttonForEdit.addEventListener('click', openPopupEdit);
buttonForAdd.addEventListener('click', openPopupPlace);

popupEdit.setEventListeners();
popupPlace.setEventListeners();
imageZoomed.setEventListeners();

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  inputErrorClass: 'popup__field_invalid',
  errorClass: 'popup__message_invalid'
};

const formValidatorName = new FormValidator(config, formProfileName);
const formValidatorPlace = new FormValidator(config, formPlace);

formValidatorName.enableValidation();
formValidatorPlace.enableValidation();

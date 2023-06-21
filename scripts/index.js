import { initialCards } from './constants.js';
import { Card } from './Card.js';
import FormValidator from './FormValidator.js';
import { Section } from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

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
const imageLink = document.querySelector('.element__image');
const imageTitle = document.querySelector('.element__title-text');
const inputTitle = document.querySelector('.popup__field_key_title');
const inputLink = document.querySelector('.popup__field_key_image');
const buttonForClosingPlace = document.querySelector('.popup__close_type_place');
const formPlace = document.querySelector('.popup__form_type_place');

const cardsTemplate = document.getElementById('cards-template');

const imageZoomed = new PopupWithImage('.popup_type_image');
const imageZoomedSrc = document.querySelector('.popup__card');
const imageZoomedTitle = document.querySelector('.popup__title');
const imageZoomedClosingButton = document.querySelector('.popup__close_type_image');
const cardsGridContainer = document.querySelector('.element');

const cardsTemplateSelector = '#cards-template';


const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__subtitle'
});

const userData = userInfo.getUserInfo();

userInfo.setInitialUserInfo(); 



const cardSection = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const cardElement = generateAndAppendCard(cardData, imageZoomed);
    cardSection.addItem(cardElement);
  }
}, '.element');

cardSection.renderItems();

function openPopup(modalWindow) {
  modalWindow.open();
  document.addEventListener('keydown', closePopupEsc);
  document.addEventListener('mousedown', closePopupOverlay);
}

function closePopup(modalWindow) {
  modalWindow.close();
  document.removeEventListener('keydown', closePopupEsc);
  document.removeEventListener('mousedown', closePopupOverlay);
}

function openPopupEdit() {
  openPopup(popupEdit);
  inputName.value = profileName.textContent;
  inputSubtitle.value = profileSubtitle.textContent;
}

function closePopupEdit() {
  closePopup(popupEdit);
}

function formSubmitEditHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileSubtitle.textContent = inputSubtitle.value;
  closePopupEdit();
}

function openPopupPlace() {
  openPopup(popupPlace);
}

function closePopupPlace() {
  closePopup(popupPlace);
}

function formSubmitPlaceHandler(evt) {
  evt.preventDefault();
  const nameImageText = inputTitle.value;
  const linkText = inputLink.value;

  const cardInfo = {
    name: nameImageText,
    link: linkText
  };

  const cardElement = generateAndAppendCard(cardInfo);
  cardsGridContainer.prepend(cardElement);

  closePopupPlace();
  formPlace.reset();
  formValidatorPlace.toggleButtonState();
  closePopup(popupPlace);
}

function generateAndAppendCard(cardsData, popup) {
  const card = new Card(cardsData, cardsTemplateSelector, () => {
    imageZoomed.open(cardsData.link, cardsData.name)
  }, imageZoomed);
  return card.generateCard();
}

//function zoomCard(cardsData) {
//  const imageElementLink = cardsData.link;
//  const imageElementAlt = cardsData.name;
//  imageZoomedSrc.src = imageElementLink;
//  imageZoomedSrc.alt = imageElementAlt;
//  imageZoomedTitle.textContent = imageElementAlt;
//  openPopup(imageZoomed);
//}

function zoomCard(cardsData) {
  imageZoomed.open(cardsData.link, cardsData.name);
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(Popup.getOpenedPopup());
  }
}

function closePopupOverlay(evt) {
  if (evt && evt.target) {
    const isOverlay = evt.target.classList.contains('popup');
    const isCloseBtn = evt.target.classList.contains('popup__close');
    if (isOverlay || isCloseBtn) {
      const openedPopup = Popup.getOpenedPopup();
      closePopup(openedPopup);
    }
  }
}

buttonForEdit.addEventListener('click', openPopupEdit);
buttonForClosingName.addEventListener('click', closePopupEdit);
formProfileName.addEventListener('submit', formSubmitEditHandler);

buttonForAdd.addEventListener('click', openPopupPlace);
buttonForClosingPlace.addEventListener('click', closePopupPlace);
formPlace.addEventListener('submit', formSubmitPlaceHandler);

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

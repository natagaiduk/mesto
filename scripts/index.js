import {initialCards} from './constants.js';
import {Card} from './Card.js';
import FormValidator from './FormValidator.js';


const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_name');
const closeNameButton = document.querySelector('.popup__close_type_name');
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const inputName = document.querySelector('.popup__field_key_name');
const inputSubtitle = document.querySelector('.popup__field_key_subtitle');
const formElement = document.querySelector('.popup__form_type_name')

const addButton = document.querySelector('.profile__add-button');
const popupPlace = document.querySelector('.popup_type_place');
const imageLink = document.querySelector('.element__image'); 
const imageTitle = document.querySelector('.element__title-text');
const inputTitle = document.querySelector('.popup__field_key_title');
const inputLink = document.querySelector('.popup__field_key_image');
const closePlaceButton = document.querySelector('.popup__close_type_place');
const formPlace = document.querySelector('.popup__form_type_place');

const cardsTemplate = document.getElementById('cards-template');

const zoomImage = document.querySelector('.popup_type_image');
const zoomImageSrc = document.querySelector('.popup__card');
const zoomImageTitle = document.querySelector('.popup__title');
const closeZoomImage = document.querySelector('.popup__close_type_image');




function openPopup(modalWindow) {
  modalWindow.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
  document.addEventListener('click', closePopupOverlay);
}

function closePopup(modalWindow) {
  modalWindow.classList.remove('popup_opened');
};

function openPopupEdit() {
  openPopup(popupEdit);
  inputName.value = profileName.textContent;
  inputSubtitle.value = profileSubtitle.textContent;
}

function closePopupEdit() {
  closePopup(popupEdit);
}

function formSubmitEditHandler(evt) {
  evt.preventDefault ();
  profileName.textContent = inputName.value;
  profileSubtitle.textContent = inputSubtitle.value;
  closePopupEdit();
}

function openPopupPlace() {
  openPopup(popupPlace);
};

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

  const card = new Card(cardInfo, cardsTemplateSelector, zoomCard);
  const cardElement = card.generateCard();
  cardsGridContainer.prepend(cardElement);

  closePopupPlace();
  formPlace.reset();
}



function zoomCard(cardsData) {
  const imageElementLink = cardsData.link;
  const imageElementAlt = cardsData.name;
  zoomImageSrc.src = imageElementLink;
  zoomImageSrc.alt = imageElementAlt;
  zoomImageTitle.textContent = imageElementAlt;
  openPopup(zoomImage);
  }


  function zoomClose() {
    closePopup(zoomImage);
  }



const cardsTemplateSelector = '#cards-template'; 
const cardsGridContainer = document.querySelector('.element');


initialCards.forEach((cardsData) => {
  const card = new Card(cardsData, cardsTemplateSelector, zoomCard);
  const cardElement = card.generateCard();
  cardsGridContainer.prepend(cardElement);
});




function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

function closePopupOverlay(popupElement, evt) {
  if (evt && evt.target) {
    const isOverlay = evt.target.classList.contains('popup');
    const isCloseBtn = evt.target.classList.contains('popup__close');
    if (isOverlay || isCloseBtn) {
      closePopup(popupElement);
    }
  }
};

document.addEventListener('click', function(evt) {
  closePopupOverlay(popupPlace, evt);
});

document.addEventListener('click', function(evt) {
  closePopupOverlay(popupEdit, evt);
});

document.addEventListener('click', function(evt) {
  closePopupOverlay(zoomImage, evt);
});

editButton.addEventListener('click', openPopupEdit);

closeNameButton.addEventListener('click', closePopupEdit);

formElement.addEventListener('submit', formSubmitEditHandler);


addButton.addEventListener('click', openPopupPlace);

closePlaceButton.addEventListener('click', closePopupPlace);

formPlace.addEventListener('submit', formSubmitPlaceHandler);


const formValidatorName = new FormValidator(
{
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  inputErrorClass: 'popup__field_invalid',
  errorClass: 'popup__message_invalid'
},
document.querySelector('.popup__form_type_name')
);

const formValidatorPlace = new FormValidator(
{
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  inputErrorClass: 'popup__field_invalid',
  errorClass: 'popup__message_invalid'
},
document.querySelector('.popup__form_type_place')
);

formValidatorName.enableValidation();
formValidatorPlace.enableValidation();
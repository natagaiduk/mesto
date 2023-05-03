import {initialCards} from './constants.js'



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
const cardsGridContainer = document.querySelector('.element');
const zoomImage = document.querySelector('.popup_type_image');
const zoomImageSrc = document.querySelector('.popup__card');
const zoomImageTitle = document.querySelector('.popup__title');
const closeZoomImage = document.querySelector('.popup__close_type_image');




function openPopup(modalWindow) {
  modalWindow.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(modalWindow) {
  modalWindow.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
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
}

  const cardsElement = createCard(cardInfo);
    cardsGridContainer.prepend(cardsElement);
    closePopupPlace();
}


function zoomCard(cardImage) {
  const imageElementLink = cardImage.src;
  const imageElementAlt = cardImage.alt;
  zoomImageSrc.src = imageElementLink;
  zoomImageSrc.alt = imageElementAlt;
  zoomImageTitle.textContent = imageElementAlt;
  openPopup(zoomImage);
  }


  function zoomClose() {
    closePopup(zoomImage);
  }


function createCard (cardsData) {
  const clonedCard = cardsTemplate.content.querySelector('.element__group').cloneNode(true);
  const cardImage = clonedCard.querySelector('.element__image');
  const cardTitle = clonedCard.querySelector('.element__title-text');
  const cardDeleteButton = clonedCard.querySelector('.element__trash');
  const cardLikeButton = clonedCard.querySelector('.element__heart');


  cardTitle.textContent = cardsData.name;
  cardImage.src = cardsData.link;
  cardImage.alt = cardsData.name;

  function handleDeleteCard() {
    clonedCard.remove();
  }

  function handleLikeCard(evt) {
    cardLikeButton.classList.toggle('element__heart_active');
  }

  cardDeleteButton.addEventListener('click', handleDeleteCard);
  cardLikeButton.addEventListener('click', handleLikeCard);

  cardImage.addEventListener('click', function() {
    zoomCard(cardImage)
  });


  closeZoomImage.addEventListener('click', zoomClose);

  return clonedCard;

};


initialCards.forEach((cardsData) => {
  const cardsElement = createCard(cardsData);
  cardsGridContainer.prepend(cardsElement);
});



function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

function closePopupOverlayOrButton(popupElement, evt) {
  if (evt && evt.target) {
    const isOverlay = evt.target.classList.contains('popup');
    const isCloseBtn = evt.target.classList.contains('popup__close');
    if (isOverlay || isCloseBtn) {
      closePopup(popupElement);
    }
  }
};

document.addEventListener('click', function(evt) {
  closePopupOverlayOrButton(popupPlace, evt);
});

document.addEventListener('click', function(evt) {
  closePopupOverlayOrButton(popupEdit, evt);
});

document.addEventListener('click', function(evt) {
  closePopupOverlayOrButton(zoomImage, evt);
});

editButton.addEventListener('click', openPopupEdit);

closeNameButton.addEventListener('click', closePopupEdit);

formElement.addEventListener('submit', formSubmitEditHandler);


addButton.addEventListener('click', openPopupPlace);

closePlaceButton.addEventListener('click', closePopupPlace);

formPlace.addEventListener('submit', formSubmitPlaceHandler);

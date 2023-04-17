
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileSubtitle = document.querySelector('.profile__subtitle');
let inputName = document.querySelector('.popup__field_key_name');
let inputSubtitle = document.querySelector('.popup__field_key_subtitle');


function openPopup() {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputSubtitle.value = profileSubtitle.textContent;
};

editButton.addEventListener('click', openPopup);

const closeButton = document.querySelector('.popup__close');
function closePopup() {
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);


function formSubmitHandler(evt) {
  evt.preventDefault ();
  profileName.textContent = inputName.value;
  profileSubtitle.textContent = inputSubtitle.value;
  closePopup();
}

let formElement = document.querySelector('.popup__form')

formElement.addEventListener('submit', formSubmitHandler);



const addButton = document.querySelector('.profile__add-button');
const popupPlace = document.querySelector('.popup_type_place');
const imageLink = document.querySelector('.element__image'); 
const imageTitle = document.querySelector('.element__title-text');
const inputTitle = document.querySelector('.popup__field_key_title');
const inputLink = document.querySelector('.popup__field_key_image');


function openPopupPlace() {
  popupPlace.classList.add('popup_opened');
};

addButton.addEventListener('click', openPopupPlace);

const closePlaceButton = document.querySelector('.popup__close_type_place');
function closePopupPlace() {
  popupPlace.classList.remove('popup_opened');
}

closePlaceButton.addEventListener('click', closePopupPlace);


function formSubmitPlaceHandler(evt) {
  evt.preventDefault();
const nameImageText = inputTitle.value;
const linkText = inputLink.value;

const arrayElement = {
  name: nameImageText,
  link: linkText
}

const cardsElement = createCard(arrayElement);
  cardsGridContainer.prepend(cardsElement);

  closePopupPlace();
}

let formPlace = document.querySelector('.popup__form_type_place');

formPlace.addEventListener('submit', formSubmitPlaceHandler);




const cardsTemplate = document.getElementById('cards-template');
const cardsGridContainer = document.querySelector('.element');


function createCard (cardsData) {
  const clonedCard = cardsTemplate.content.querySelector('.element__group').cloneNode(true);
  const cardImage = clonedCard.querySelector('.element__image');
  const cardTitle = clonedCard.querySelector('.element__title-text');
  const cardDeleteButton = clonedCard.querySelector('.element__trash');
  const cardLikeButton = clonedCard.querySelector('.element__heart');
  const zoomImage = document.querySelector('.popup_type_image');
  const zoomImageSrc = document.querySelector('.popup__card');
  const zoomImageTitle = document.querySelector('.popup__title');

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


  const zoomCard = function () {
  const imageElementLink = cardImage.src;
  const imageElementAlt = cardImage.alt;
  zoomImageSrc.src = imageElementLink;
  zoomImageSrc.alt = imageElementAlt;
  zoomImageTitle.textContent = imageElementAlt;
  zoomImage.classList.add('popup_opened');
  }

  function zoomClose() {
    zoomImage.classList.remove('popup_opened');
  }

  cardImage.addEventListener('click', zoomCard);

  const closeZoomImage = document.querySelector('.popup__close_type_image');
  closeZoomImage.addEventListener('click', zoomClose);

  return clonedCard;

}

initialCards.forEach((cardsData) => {
  const cardsElement = createCard(cardsData);
  cardsGridContainer.prepend(cardsElement);
});



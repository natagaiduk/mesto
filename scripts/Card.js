import { zoomCard } from "./index.js";


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


class Card {
  constructor(cardsData, cardsTemplate) {
    this.cardsData = cardsData;
    this.clonedCard = this.createCardElement();
    this.cardImage = this.clonedCard.querySelector('.element__image');
    this.cardTitle = this.clonedCard.querySelector('.element__title-text');
    this.cardDeleteButton = this.clonedCard.querySelector('.element__trash');
    this.cardLikeButton = this.clonedCard.querySelector('.element__heart');

    this.cardTitle.textContent = this.cardsData.name;
    this.cardImage.src = this.cardsData.link;
    this.cardImage.alt = this.cardsData.name;

    this.handleDeleteCard = this.handleDeleteCard.bind(this);
    this.handleLikeCard = this.handleLikeCard.bind(this);

    this.cardDeleteButton.addEventListener('click', this.handleDeleteCard);
    this.cardLikeButton.addEventListener('click', this.handleLikeCard);

    this.cardImage.addEventListener('click', () => {
      this.zoomCard();
    });

    closeZoomImage.addEventListener('click', this.zoomClose);
  }

  createCardElement() {
    const clonedCard = cardsTemplate.content.querySelector('.element__group').cloneNode(true);
    return clonedCard;
  }

  handleDeleteCard() {
    this.clonedCard.remove();
  }

  handleLikeCard() {
    this.cardLikeButton.classList.toggle('element__heart_active');
  }

  zoomCard(cardImage) {
    const imageElementLink = this.cardImage.src;
    const imageElementAlt = this.cardImage.alt;
    zoomImageSrc.src = imageElementLink;
    zoomImageSrc.alt = imageElementAlt;
    zoomImageTitle.textContent = imageElementAlt;
    openPopup(zoomImage);
  }

  zoomClose() {
    closePopup(zoomImage);
  }

  getCardElement() {
    return this.clonedCard;
  }
}

initialCards.forEach((cardsData) => {
  const card = new Card(cardsData);
  const cardsElement = card.getCardElement();
  cardsGridContainer.prepend(cardsElement);
});


export { Card, initialCards};
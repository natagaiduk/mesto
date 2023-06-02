export class Card {
  constructor(cardsData, templateSelector, handleCardClick) {
    this._cardsData = cardsData;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.element__group').cloneNode(true);
    return cardTemplate;
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleLikeCard() {
    this._likeButton.classList.toggle('element__heart_active');
  }

  _handleImageClick() {
    if (typeof this._handleCardClick === 'function') {
      this._openPicture();
    }
  }


  _openPicture() {
    this._handleCardClick(this._cardsData);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__title-text').textContent = this._cardsData.name;
    this._element.querySelector('.element__image').src = this._cardsData.link;
    this._element.querySelector('.element__image').alt = this._cardsData.name;

    this._likeButton = this._element.querySelector('.element__heart');
    this._trashButton = this._element.querySelector('.element__trash');

    this._likeButton.addEventListener('click', this._handleLikeCard.bind(this));
    this._trashButton.addEventListener('click', this._handleDeleteCard.bind(this));
    this._element.querySelector('.element__image').addEventListener('click', this._handleImageClick.bind(this));

    return this._element;
  }

}
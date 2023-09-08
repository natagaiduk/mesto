
export class Card {
  constructor(cardsData, templateSelector, handleCardClick, handleDeleteCard, userId) {
    this._cardsData = cardsData;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._ownerId = cardsData.owner._id;
    this._userId = userId;
  }



  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element__group')
      .cloneNode(true);
    return cardTemplate;
  }

  deleteCard() {
    this._element.remove();
    this._element.null;

//  console.log('Здесь будет вызываться попап');
//  if (this._popupSure) {
//    this._popupSure.open();
//    this._popupSure.setSubmitSure(() => {
//      deleteCard(this._cardsData._id);
//    });
//  }
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

  getId() {
    return this._cardsData._id;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._element.querySelector('.element__title-text').textContent = this._cardsData.name;
    this._imageElement = this._element.querySelector('.element__image');
    this._imageElement.src = this._cardsData.link;
    this._imageElement.alt = this._cardsData.name;



    this._likeButton = this._element.querySelector('.element__heart');
    this._trashButton = this._element.querySelector('.element__trash');

    if(this._ownerId !== this._userId) {
      this._trashButton.remove();
    }

    this._likeButton.addEventListener('click', this._handleLikeCard.bind(this));
    this._trashButton.addEventListener('click', () => this._handleDeleteCard(this));
    this._cardImage.addEventListener('click', this._handleImageClick.bind(this));

    return this._element;
  }
}


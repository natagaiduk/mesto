import PopupWithForm from './PopupWithForm.js';

export default class PopupEditAvatar extends PopupWithForm {
  constructor(popupSelector, submitCallback) {
    super(popupSelector, submitCallback);
  }

  open() {
    super.open();
  }

  setAvatarUrl(avatarUrl) {
    const avatarImage = this._popup.querySelector('.profile__avatar');
    avatarImage.src = avatarUrl;
  }

  setEventListeners() {
    super.setEventListeners();
    console.log('Сработал клик по кнопке Сохранить');
    const form = this._popup.querySelector('.popup__form');
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const avatarUrl = form.querySelector('.popup__field').value;
      this._submitCallback(avatarUrl);

    });
  }
}

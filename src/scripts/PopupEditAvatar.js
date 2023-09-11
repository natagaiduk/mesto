import PopupWithForm from './PopupWithForm.js';

export default class PopupEditAvatar extends PopupWithForm {
  constructor(popupSelector, submitCallback) {
    super(popupSelector, submitCallback);
  }

  open() {
    
    super.open();
  }

  
  setAvatarUrl(avatarUrl) {
    
    const avatarImage = this._popup.querySelector('.popup__avatar-image');
    avatarImage.src = avatarUrl;
  }

    close() {
      console.log('Закрыть попап аватар')
    super.close();
    this._form.reset();
  }
}
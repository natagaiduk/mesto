import Popup from './Popup.js';

export default class PopupSure extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector('.popup__save-button');
  }

  setSubmitSure(submitSure) {
    this._submitSure = submitSure;
  }

  closeAndSubmit() {
    if (this._submitSure) {
      this._submitSure();
    }
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    console.log(this._submitButton);
    this._submitButton.addEventListener('click', () => {
      this.closeAndSubmit();
          console.log('Клик "да" сработал');
    });
  }
}

export function openPopupSure(submitSure) {
  popupSure.setSubmitSure(submitSure);
  popupSure.open();
}



import Popup from './Popup.js';

export default class PopupSure extends Popup {
    constructor(popupSelector, formSelector) {
        super(popupSelector);
        this._submitButton = this._popup.querySelector('.popup__save-button');
        this._form = this._popup.querySelector(formSelector);
        this._submitSure = null;
    }

    setSubmitSure(submitSure) {
        this._submitSure = submitSure;
    }

    async closeAndSubmit() {
        if (this._submitSure) {
            try {
                await this._submitSure();
                this.close();
            } catch (error) {
                console.error('Ошибка при выполнении операции: ', error);
            }
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.closeAndSubmit();
        });
    }
}

export function openPopupSure(submitSure) {
    popupSure.setSubmitSure(submitSure);
    popupSure.open();
}

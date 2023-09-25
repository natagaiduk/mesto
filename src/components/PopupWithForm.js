import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.popup__form');
    }

    setSubmitCallback(submitCallback) {
        this._submitCallback = submitCallback;
    }

    _getInputValues() {
        const inputList = this._form.querySelectorAll('.popup__field');
        const formValues = {};
        inputList.forEach((input) => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }


    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            if (this._submitCallback) {
                this._submitCallback(this._getInputValues())
            };
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}
export default class FormValidator {
    constructor(enableConfig, formElement) {
        this._enableConfig = enableConfig;
        this._formElement = formElement;
        this._inputList = Array.from(formElement.querySelectorAll(enableConfig.inputSelector));
        this._buttonElement = formElement.querySelector(enableConfig.submitButtonSelector);
    }

    _defineInputError(inputElement) {
        return this._formElement.querySelector(`.${inputElement.name}-invalid`);
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._defineInputError(inputElement);
        inputElement.classList.add(this._enableConfig.inputErrorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError(inputElement) {
        const errorElement = this._defineInputError(inputElement);
        inputElement.classList.remove(this._enableConfig.inputErrorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement, inputElement.validationMessage);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._enableConfig.inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', '');
        } else {
            this._buttonElement.classList.remove(this._enableConfig.inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    }

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            });
            this.toggleButtonState();
        });
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._setEventListeners();
        this.toggleButtonState();
    }
}
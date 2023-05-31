const configArray = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  inputErrorClass: 'popup__field_invalid',
  errorClass: 'popup__message_invalid',
};

class FormValidator {
  constructor(configArray, formElement) {
    this._formSelector = configArray.formSelector;
    this._inputSelector = configArray.inputSelector;
    this._submitButtonSelector = configArray.submitButtonSelector;
    this._inactiveButtonClass = configArray.inactiveButtonClass;
    this._inputErrorClass = configArray.inputErrorClass;
    this._errorClass = configArray.errorClass;
    this.formElement = formElement;
  }


  _defineInputError() {
    return this._formElement.querySelector(`.${inputElement.name}-invalid`);
  }

  _showInputError() {
    this._errorElement = this._defineInputError();
    this._inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = this._inputElement.validationMessage;
    this._errorElement.classList.add(this._activeErrorClass);
  }

  _hideInputError() {
    this._errorElement = this._defineInputError();
    this._inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._activeErrorClass);
    this._errorElement.textContent = '';
  }

  _checkInputValidity() {
    if (this._inputElement.validity.valid) {
      this._hideInputError();
    } else {
      this._showInputError();
    }
  }

  _setEventListeners() {
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._inputList = Array.from(this.formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this.formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._inputElement = inputElement;
        this._checkInputValidity();
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', '');
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._inputElement = inputElement;
      this._hideInputError();
    });
  }
};

const formValidators = {}

const enableValidation = (configArray) => {
  const formList = Array.from(document.querySelectorAll(configArray.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(configArray, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(configArray);

export { formValidators };

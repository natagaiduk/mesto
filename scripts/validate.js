

function defineInputError(formElement, inputElement) {
  return formElement.querySelector(`.${inputElement.name}-invalid`);
};

function showInputError(formElement, inputElement, errorMessage, enableConfig) {
  const errorElement = defineInputError(formElement, inputElement);
  inputElement.classList.add(enableConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
};

function hideInputError(formElement, inputElement, enableConfig) {
  const errorElement = defineInputError(formElement, inputElement);
  inputElement.classList.remove(enableConfig.inputErrorClass);
  errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement, enableConfig) {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, enableConfig);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage, enableConfig);
  }
};

function setEventListeners(formElement, enableConfig) {
  const inputList = Array.from(formElement.querySelectorAll(enableConfig.inputSelector));
  const buttonElement = formElement.querySelector(enableConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, enableConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, enableConfig);
      toggleButtonState(inputList, buttonElement, enableConfig);
    });
  });
  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
};

function enableValidation(enableConfig) {
  const formList = Array.from(document.querySelectorAll(enableConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, enableConfig);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState(inputList, buttonElement, enableConfig) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, enableConfig);
  } else {
    enableButton(buttonElement,enableConfig);
  }
};


function enableButton(buttonElement, enableConfig) {
  buttonElement.classList.remove(enableConfig.inactiveButtonClass);
  buttonElement.removeAttribute('disabled'); 
}


function disableButton(buttonElement, enableConfig) {
  buttonElement.classList.add(enableConfig.inactiveButtonClass);
  buttonElement.setAttribute('disabled', '');
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  inputErrorClass: 'popup__field_invalid',
  errorClass: 'popup__message_invalid'
});

/*
//ищем элемент ошибки
function searchInputError(formElement, inputElement) {
	formElement.querySelector(`.popup__message_invalid`);
}

//функция показа ошибки валидации (валидация не пройдена)
function showInputError(???) {

}


//функция скрытия ошибки валидации (валидация пройдена)
function hideInputError(???) {
	
}


//функция проверки валидности формы с if else 
function checkValidity() {
	if (!inputElement.validity.valid) {
		showInputError(???)
	} else {
		hideInputError(???)
	}
}

//функция навешивания обработчиков на введение данных в поля инпутов
function setEventListeners(formElement) {
	const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
	const buttonElement = formElement.querySelector('.popup__save-button');
	//+функция переключения состояния кнопки?
	inputList.forEach(function (inputElement) {
		inputElement.addEventListener('input', function() {
			checkValidity(???);
			//что-то снова сделать с кнопкой? 
		});
	};
};

//функция, ответственная за включение валидации всех форм
function enableValidation(configObj) {
	const formList = Array.from(document.querySelectorAll()'.popup__form'); 
	formList.forEach(formElement, function() {
		formElement.addEventListener('submit', function(evt) {
			evt.preventDefault();
		});
		setEventListeners(formElement);
	})
}


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  inputErrorClass: 'popup__field_invalid',
  errorClass: 'popup__message_invalid'
});

function enableValidation(configObj) {
	
}*/ 




function defineInputError(formElement, inputElement) {
  return formElement.querySelector(`.${inputElement.name}_invalid`);
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

};

function enableValidation(enableConfig) {
  const formList = Array.from(document.querySelectorAll(enableConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
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
    buttonElement.classList.add(enableConfig.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove(enableConfig.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  inputErrorClass: 'popup__field_invalid',
  errorClass: 'popup__message_invalid'
});
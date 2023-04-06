const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileSubtitle = document.querySelector('.profile__subtitle');
let inputName = document.querySelector('.popup__field_key_name');
let inputSubtitle = document.querySelector('.popup__field_key_subtitle');


function openPopup() {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputSubtitle.value = profileSubtitle.textContent;
};

editButton.addEventListener('click', openPopup);

const closeButton = document.querySelector('.popup__close');
function closePopup() {
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);


function formSubmitHandler(evt) {
  evt.preventDefault ();
  profileName.textContent = inputName.value;
  profileSubtitle.textContent = inputSubtitle.value;
  closePopup();
}

let formElement = document.querySelector('.popup__form')

formElement.addEventListener('submit', formSubmitHandler);
const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
function openPopup() {
  popup.classList.add('popup_opened');
};
editButton.addEventListener('click', openPopup);

const closeButton = document.querySelector('.popup__close');
function closePopup() {
  popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closePopup);

let profileName = document.querySelector('.profile__name');
let profileSubtitle = document.querySelector('.profile__subtitle');
let inputName = document.querySelector('.popup__field-name');
let inputSubtitle = document.querySelector('.popup__field-subtitle');
inputName.value = profileName.textContent;
inputSubtitle.value = profileSubtitle.textContent;


let formElement = document.querySelector('.popup__form') 
function formSubmitHandler(evt) {
  evt.preventDefault();
  let inputName = document.querySelector('.popup__field-name');
  let inputSubtitle = document.querySelector('.popup__field-subtitle');
  let profileName = document.querySelector('.profile__name');
  let profileSubtitle = document.querySelector('.profile__subtitle');
  profileName.textContent = inputName.value;
  profileSubtitle.textContent = inputSubtitle.value;
  popup.classList.remove('popup_opened');
}


formElement.addEventListener('submit', formSubmitHandler);
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
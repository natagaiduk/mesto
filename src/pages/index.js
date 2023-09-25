import './index.css';
import { Card } from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import PopupSure, { openPopupSure } from '../components/PopupSure.js';
import Api from '../components/Api.js';



const buttonForEdit = document.querySelector('.profile__edit-button');
const buttonForAdd = document.querySelector('.profile__add-button');


const popupEdit = new PopupWithForm('.popup_type_name', formSubmitEditHandler);
const popupPlace = new PopupWithForm('.popup_type_place', formSubmitPlaceHandler);
const imageZoomed = new PopupWithImage('.popup_type_image');
const popupSure = new PopupSure('.popup_type_sure', '.popup__form_type_sure');

const cardsGridContainer = document.querySelector('.element');
const cardsTemplateSelector = '#cards-template';

const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const inputName = document.querySelector('.popup__field_key_name');
const inputSubtitle = document.querySelector('.popup__field_key_subtitle');
const formProfileName = document.querySelector('.popup__form_type_name');
const inputTitle = document.querySelector('.popup__field_key_title');
const inputLink = document.querySelector('.popup__field_key_image');
const formPlace = document.querySelector('.popup__form_type_place');
const formAvatar = document.querySelector('.popup__form_type_avatar');


let userId = null;

const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    aboutSelector: '.profile__subtitle',
    avatarSelector: '.profile__avatar'
});

const formValidatorConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_invalid',
    inputErrorClass: 'popup__field_invalid',
    errorClass: 'popup__message_invalid'
};

const formValidatorName = new FormValidator(formValidatorConfig, formProfileName);
const formValidatorPlace = new FormValidator(formValidatorConfig, formPlace);
const formValidatorAvatar = new FormValidator(formValidatorConfig, formAvatar);

formValidatorName.enableValidation();
formValidatorPlace.enableValidation();
formValidatorAvatar.enableValidation();

const cardSection = new Section({
    renderer: (cardData) => {
        const cardElement = generateCardElement(cardData, userId);
        cardSection.addItem(cardElement, 'append');
    }
}, '.element');


const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-76',
    headers: {
        authorization: 'd993e28f-2ce3-484f-9e94-d5a6e7c68db6',
        'Content-Type': 'application/json',
    },
});


async function init() {
    try {

        const [cardElements, userData] = await Promise.all([api.getInitialCards(), api.getUserInfo()]);

        userInfo.setUserInfo({ name: userData.name, about: userData.about });
        userInfo.setUserAvatar({ avatar: userData.avatar });
        userId = userData._id;


        const initialUserData = userInfo.getUserInfo();
        userInfo.setInitialUserInfo(initialUserData);

        cardSection.renderItems(cardElements);

        popupPlace.setSubmitCallback((formValues) => {
            formSubmitPlaceHandler(formValues);
        });

    } catch (error) {
        console.error('Ошибка инициализации: ', error);
    }

    buttonForEdit.addEventListener('click', openPopupEdit);
    buttonForAdd.addEventListener('click', openPopupPlace);

    popupEdit.setEventListeners();
    popupPlace.setEventListeners();
    imageZoomed.setEventListeners();
    popupSure.setEventListeners();
};


init();



function deleteCard(cardInstance) {
    try {
        popupSure.open();
        popupSure.setSubmitSure(() => {
            api.deleteCard(cardInstance.getId()).then(res => {
                cardInstance.deleteCard();
            })
            .catch(error => {
              console.error('Ошибка при удалении карточки: ', error);
            });
        })
    } catch (error) {
        console.error('Ошибка при удалении карточки', error);
    }
}





async function formSubmitAvatarHandler(formValues) {
    const {
        'avatar-link': avatar
    } = formValues;

    try {
        const userData = await api.updateAvatar(avatar);
        userInfo.setUserAvatar({ avatar: userData.avatar });
        editAvatarPopup.close();
        document.querySelector('.popup_type_avatar .popup__save-button').setAttribute('disabled', 'disabled');
    } catch (error) {
        console.error('Ошибка при обновлении аватара: ', error);
    }
}



const editAvatarPopup = new PopupWithForm('.popup_type_avatar', formSubmitAvatarHandler);
editAvatarPopup.setEventListeners();

const editAvatarButton = document.querySelector('.profile__edit-avatar');

editAvatarButton.addEventListener('click', () => {
    editAvatarPopup.open();
});






function generateCardElement(cardData, userId) {
    const card = new Card(
        cardData,
        cardsTemplateSelector,
        () => {
            imageZoomed.open(cardData.link, cardData.name);
        },
        deleteCard,
        userId,
        likeCardFunction,
        unlikeCardFunction,
        popupSure);

    const cardElement = card.generateCard();


    return card.generateCard();
}


function likeCardFunction() {
    api.likeCard(this._cardsData._id)
        .then((data) => {
            this.setLike(data);
        })
        .catch((error) => {
            console.error('Ошибка лайка: ', error);
        });
};


function unlikeCardFunction() {
    api.unlikeCard(this._cardsData._id)
        .then((data) => {
            this.setLike(data);
        })
        .catch((error) => {
            console.error('Ошибка отмены лайка: ', error);
        });
};




function openPopupEdit() {
    const userData = userInfo.getUserInfo();

    inputName.value = userData.name;
    inputSubtitle.value = userData.about;

    popupEdit.open();
}

function closePopupEdit() {
    popupEdit.close();
}

async function formSubmitEditHandler(formValues) {
    const {
        'name-input': name,
        'name-subtitle': about
    } = formValues;

    try {
        const updatedUserData = await api.updateUserInfo({ name, about });
        userInfo.setUserInfo(updatedUserData);
        closePopupEdit();
    } catch (error) {
        console.error('Ошибка при обновлении юзеринфо: ', error);
    }
}

function openPopupPlace() {
    popupPlace.open();
}

function closePopupPlace() {
    popupPlace.close();
}


async function formSubmitPlaceHandler(formValues) {
    const {
        'place-edit': name,
        'place-link': link
    } = formValues;

    try {

        const newCardData = await api.addCard({ name, link });
        const cardElement = generateCardElement(newCardData, userId);


        cardSection.addItem(cardElement, 'prepend');
        closePopupPlace();

        formValidatorPlace.toggleButtonState();
    } catch (error) {
        console.error('Ошибка при добавлении карточки: ', error);
    }
}


function renderLoading(button, isLoading, originalText = 'Сохранить') {
    if (isLoading) {
        button.textContent = 'Сохранение...';
        button.setAttribute('disabled', true);
    } else {
        button.textContent = originalText;
        button.removeAttribute('disabled');
    }
}

popupEdit.setSubmitCallback((formValues) => {
    const saveButton = document.querySelector('.popup_type_name .popup__save-button');
    renderLoading(saveButton, true); 
    formSubmitEditHandler(formValues)
        .finally(() => {
            renderLoading(saveButton, false);
        });
});

popupPlace.setSubmitCallback((formValues) => {
    const saveButton = document.querySelector('.popup_type_place .popup__save-button');
    renderLoading(saveButton, true);
    formSubmitPlaceHandler(formValues)
        .finally(() => {
            renderLoading(saveButton, false);
        });
});

editAvatarPopup.setSubmitCallback((formValues) => {
    const saveButton = document.querySelector('.popup_type_avatar .popup__save-button');
    renderLoading(saveButton, true);
    formSubmitAvatarHandler(formValues)
        .finally(() => {
            renderLoading(saveButton, false);
        });
});
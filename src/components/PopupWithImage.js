import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__card');
        this._popupCaption = this._popup.querySelector('.popup__title');
    }

    open(imageSrc, imageCaption) {
        this._popupImage.src = imageSrc;
        this._popupImage.alt = imageCaption;
        this._popupCaption.textContent = imageCaption;
        super.open();
    };
}
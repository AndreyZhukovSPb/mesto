import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup { // 
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhoto = this._popup.querySelector('.popup__photo');
    this._popupText = this._popup.querySelector('.popup__text');
  }

  open(data) {
    super.open();
    this._popupText.textContent = data.name;
    this._popupPhoto.src = data.link;
    this._popupPhoto.alt = data.link;    
  }

  close() {
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
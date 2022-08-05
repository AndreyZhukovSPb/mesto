import { Popup } from "./Popup.js";

export class PopupEditProfilePicture extends Popup {
  constructor ({ popupSelector, submitFunction }) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitButton = this._popupForm.querySelector('.popup__submit-button')
    this._submitFunction = submitFunction;
    this._input = this._popup.querySelector('.popup__input');
  }

  open() {
    super.open();
    setTimeout(() => this._submitButton.focus(), 100) 
  } 

  close() { 
    super.close();
    this._popupForm.reset();
  }

  setEventListeners() { 
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) =>{
      evt.preventDefault();
      this._submitFunction(this._input.value);
      this.close();
    })
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = 'Сохранить';
    } 
  }

}







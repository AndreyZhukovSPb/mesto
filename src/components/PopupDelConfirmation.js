import { Popup } from "./Popup.js";

export class PopupDelConfirmation extends Popup{
  constructor({ popupSelector, submitFunction }) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitButton = this._popupForm.querySelector('.popup__submit-button')
    this._submitFunction = submitFunction;
  }
  

  open(card) {
    this._card = card;
    super.open();
    setTimeout(() => this._submitButton.focus(), 100) 
  } 
  
  close() { 
    super.close();
  }

  setEventListeners() { 
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) =>{
      evt.preventDefault();
      this._submitFunction(this._card);
      // this.close();
    })
  }

}
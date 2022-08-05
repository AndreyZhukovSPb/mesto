import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
  constructor({ popupSelector, submitFunction }) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitFunction = submitFunction;
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._submitButton = this._popupForm.querySelector('.popup__submit-button');
  }
  
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  
  
  setEventListeners() { 
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) =>{
      evt.preventDefault();
      this._newItem = this._getInputValues();
      this._submitFunction(this._newItem);
      this.close();
    } )
  }

  open() {
    super.open();
  } 
  
  close() { 
    super.close();
    this._popupForm.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = 'Сохранить';
    }
    
  }
}
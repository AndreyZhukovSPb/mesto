import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
  constructor({ popupSelector, submitFunction }) {
    super(popupSelector);
    this._userElementName = this._popup.querySelector('.popup__input_type_title');
    this._userElementLink = this._popup.querySelector('.popup__input_type_subtitle');
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitFunction = submitFunction;
  }

  _getInputValues() { 
    this._userData = new Object();
    this._userData.name = this._userElementName.value;
    this._userData.link = this._userElementLink.value;
    return(this._userData);
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
    this._userElementName.value='';
    this._userElementLink.value='';
  }
}
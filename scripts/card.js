import { оpenPopup } from './utils.js'

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = templateSelector;
  };

  _getTemplate() {
    const userTemplate = document
    .querySelector(this._cardSelector)
    .content
    .children[0]
    .cloneNode(true);
    return userTemplate;
  };

  createCard() {
    this._newCard = this._getTemplate();
    this._newCard.querySelector('.element__place').textContent = this._name;
    this._cardImage = this._newCard.querySelector('.element__photo');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeButton = this._newCard.querySelector('.element__like');
    this._delButton = this._newCard.querySelector('.element__del-button');

    this._setCardEventListeners();
    return this._newCard;
  };

  _setCardEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._changeCardLike();
    });
    this._delButton.addEventListener('click', () => {
      this._deleteCard();
    });
    this._cardImage.addEventListener('click', () => {
      this._openCardPhotoPopup();
    });
  };

  _changeCardLike() {
    this._likeButton.classList.toggle('element__like_active');
  };

  _deleteCard() {
    this._newCard.remove();
  };

  _openCardPhotoPopup() {
    const popupPhoto = document.querySelector('.popup__photo');
    const popupText = document.querySelector('.popup__text');
    popupPhoto.src = this._link;
    popupPhoto.alt = this._name;
    popupText.textContent = this._name;
    this._popup = document.querySelector('.popup_type_element-photo');
    оpenPopup(this._popup);
  };
};
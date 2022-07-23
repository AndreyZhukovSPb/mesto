export class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = templateSelector;
    this._popupPhoto = document.querySelector('.popup__photo');
    this._popupText = document.querySelector('.popup__text');
    this._popup = document.querySelector('.popup_type_element-photo');
    this._handleCardClick = handleCardClick;
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
      this._handleCardClick(this._data);
    });
  };

  _changeCardLike() {
    this._likeButton.classList.toggle('element__like_active');
  };

  _deleteCard() {
    this._newCard.remove();
  };
};
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
    this._newCard.querySelector('.element__photo').src = this._link;
    this._newCard.querySelector('.element__photo').alt = this._name;
    this._newCard.querySelector('.element__place').textContent = this._name;
    this._setCardEventListeners();
    return this._newCard;
  };

  _setCardEventListeners() {
    this._newCard.querySelector('.element__like').addEventListener('click', () => {
      this._changeCardLike();
    });
    this._newCard.querySelector('.element__del-button').addEventListener('click', () => {
      this._deleteCard();
    });
    this._newCard.querySelector('.element__photo').addEventListener('click', () => {
      this._openCardPhotoPopup();
    });
  };

  _changeCardLike() {
    this._newCard.querySelector('.element__like').classList.toggle('element__like_active');
  };

  _deleteCard() {
    this._newCard.remove();
  };

  _openCardPhotoPopup() {
      оpenPopup(popupPhotoElement);
      popupPhoto.src = this._link;
      popupPhoto.alt = this._name;
      popupText.textContent = this._name;
      console.log('test photo popup');
  };
};
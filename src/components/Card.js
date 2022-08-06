export class Card {
  constructor({ data, handleCardClick, handleDelclick, sendLikeToSerever, delLekeOnServer}, templateSelector, userId) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._count = data.likes.length;
    this._id = data._id;
    this._cardSelector = templateSelector;
    this._handleDelclick = handleDelclick;
    this._handleCardClick = handleCardClick;
    this._sendLikeToSerever = sendLikeToSerever;
    this._delLekeOnServer = delLekeOnServer;
    this._userId = userId;
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
    this._likeCounter = this._newCard.querySelector('.element__like-counter');
    this._likeCounter.innerHTML = this._count;
    this._setCardEventListeners(); 
    this._makeEnableDel();
    this._saveLikeCard();
    return this._newCard;
  };


  _setCardEventListeners() { 
    this._likeButton.addEventListener('click', () => {
      this._changeCardLike();
    });
    this._delButton.addEventListener('click', () => {
      this._handleDelclick(this);
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
  };

  setLikeСard(likes) {
    this._likeCounter.innerHTML = likes;
    this._likeButton.classList.toggle('element__like_active');
  }

  _saveLikeCard() {
    if (this._data.likes.length > 0) {
      this._data.likes.forEach(like => {
        if (like._id === this._userId) {
          this._likeButton.classList.add('element__like_active');
        }
      })
    } 
  }

  _changeCardLike() {
    if (!this._likeButton.classList.contains('element__like_active')){
      this._sendLikeToSerever(this._id, this)
    } else {
      this._delLekeOnServer(this._id, this);
    }
  };

  deleteCard() {
    this._newCard.remove();
    this._newCard = null;
  };

  _makeEnableDel() {
    if (this._userId === this._data.owner._id) {
      this._delButton.classList.add('element__del-button_enable');
    }
  }
};
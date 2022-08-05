export class Card {
  constructor({ data, handleCardClick, handleDelclick, sendLikeToSerever, delLekeOnServer}, templateSelector) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._count = data.likes.length;
    this._id = data._id;
    this._cardSelector = templateSelector;
    this._handleDelclick = handleDelclick;
    // this._popupPhoto = document.querySelector('.popup__photo');
    // this._popupText = document.querySelector('.popup__text');
    // this._popup = document.querySelector('.popup_type_element-photo');
    this._handleCardClick = handleCardClick;
    this._sendLikeToSerever = sendLikeToSerever;
    this._delLekeOnServer = delLekeOnServer;
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
    // console.log(this._data);
    return this._newCard;
  };

  _changeCardLikeCounter() {
    if (this._likeButton.classList.contains('element__like_active')){
      this._likeCounter.innerHTML = '';
      this._likeCounter.innerHTML = this._count + 1;  
      
    } else {
      this._likeCounter.innerHTML = '';
      this._likeCounter.innerHTML = this._count;
      
    }
  }

  _setCardEventListeners() { 
    this._likeButton.addEventListener('click', () => {
      this._changeCardLike();
      // this._changeCardLikeCounter();

    });
    this._delButton.addEventListener('click', () => {
      // this._deleteCard();
      this._handleDelclick(this);
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
  };

  _saveLikeCard() {
    this._likeButton.classList.add('element__like_active');
  }

  _changeCardLike() {
    if (!this._likeButton.classList.contains('element__like_active')){
      this._sendLikeToSerever(this._id)
    .then((data)=>{
        this._likeCounter.innerHTML = data.likes.length;
    })
    .then(()=>{
      this._likeButton.classList.toggle('element__like_active');
    })
    .catch((err) => {
      console.log(err); 
    });   
    } else {
      this._delLekeOnServer(this._id)
      .then((data)=>{
        this._likeCounter.innerHTML = data.likes.length;
      })
      .then(()=>{
        this._likeButton.classList.toggle('element__like_active');
      })
      .catch((err) => {
        console.log(err); 
      });   
    }
  };

  _deleteCard() {
    this._newCard.remove();
    this._newCard = null;
  };

  makeEnableDel() {
    this._delButton.classList.add('element__del-button_enable');
  }
};
import './index.css';

import { FormValidator } from '../components/FormValidator.js'
import { Card } from '../components/Card.js'
import { UserInfo } from '../components/UserInfo.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupDelConfirmation } from '../components/PopupDelConfirmation.js'
import { Section } from '../components/Section.js'
import { profileEdit } from '../utils/constants.js'
import { popupTitle } from '../utils/constants.js'
import { popupJob } from '../utils/constants.js'
import { cardAddButton } from '../utils/constants.js'
import { cardListSelector } from '../utils/constants.js'
import { config } from '../utils/constants.js'
import { profileAvatar } from '../utils/constants.js'
import { Api } from '../components/Api.js'
import { setTimeout } from 'core-js';


const popupProfileEdit = 
new PopupWithForm({
  popupSelector: '.popup_type_profile',
  submitFunction: (newItem) => {
    popupProfileEdit.renderLoading(true);
    api.setUserInfoServer(newItem.editProfileName, newItem.editProfileJob)
      .then((data)=>{
        currentUserInfo.setUserInfo({
          title: data.name,
          job: data.about
        })
      })
      .then(()=>{
        popupProfileEdit.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() =>{
        setTimeout(()=>popupProfileEdit.renderLoading(false), 1000);
      })
  },
  buttonText: 'Сохранить'
})
popupProfileEdit.setEventListeners();

const currentUserInfo = new UserInfo ({ 
  profileNameSelector: '.profile__title',
  profileJobSelector: '.profile__subtitle',
  profileAvatarSelector: '.profile__avatar'
})

profileEdit.addEventListener('click', () => {
  popupProfileEdit.open();
  const newUserInfo = currentUserInfo.getUserInfo(); 
  popupTitle.value = newUserInfo.name;
  popupJob.value = newUserInfo.link;  
  formProfileValidator.resetValidation();
})

const popupAddCard = 
  new PopupWithForm({
    popupSelector: '.popup_type_element',
    submitFunction: (item) => {
      popupAddCard.renderLoading(true);
      api.sendCard(item)
        .then((data) =>{ 
          const newItem = createNewCard(data, userId); 
          cardList.addItem(newItem);
        })
        .then(()=>{
          popupAddCard.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(()=>{
          setTimeout(()=> popupAddCard.renderLoading(false), 1000);
        })
      },
    buttonText: 'Создать'  
  })
popupAddCard.setEventListeners();

cardAddButton.addEventListener('click', () => {
  popupAddCard.open()
  formCardValidator.resetValidation(); 
});

const delPopup = new PopupDelConfirmation ({
  popupSelector: '.popup_type_delete',
  submitFunction: (currentCard) => {
    api.removeCard(currentCard._id)
      .then(()=>{
        currentCard.deleteCard();
      })
      .then(()=>{
        delPopup.close();
      })
      .catch((err) => {
        console.log(err); 
      }); 
  }
})
delPopup.setEventListeners()

const editProfilePicture = new PopupWithForm ({
  popupSelector: '.popup_type_edit-picture',
  submitFunction:(currentPictureLink) => {
    editProfilePicture.renderLoading(true);
    api.setUserAvatarServer(currentPictureLink.link)
      .then(data =>{
        currentUserInfo.setUserAvatar(data.avatar);
      })
      .then(()=>{
        editProfilePicture.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(()=>{
        setTimeout(()=> editProfilePicture.renderLoading(false), 1000);
      })
  },
  buttonText: 'Сохранить'
})
editProfilePicture.setEventListeners();

profileAvatar.addEventListener('click', () =>{
  editProfilePicture.open();
  formPictureEditValidator.resetValidation(); 
})

const imagePopup= new PopupWithImage ('.popup_type_element-photo');
imagePopup.setEventListeners();

function createNewCard(item, userId) {
  const newCard = new Card (
    {data: item,
    handleCardClick: (data) => { 
      imagePopup.open(data);},
    handleDelclick: (card) => {
      delPopup.open(card);},
    sendLikeToSerever: (cardId, currentCard) => {
      api.sendLike(cardId)
        .then((data) =>{          
          currentCard.setLikeСard(data.likes.length);
        })
        .catch((err)=>{
          console.log(err);
        })
    },
    delLekeOnServer: (cardId, currentCard) => {
      api.delLike(cardId)
      .then((data) =>{          
        currentCard.setLikeСard(data.likes.length);
      })
      .catch((err)=>{
        console.log(err);
      })
    },
    }, 
    '#user-element',
    userId);
  
    const newCardElement = newCard.createCard();
    return newCardElement; 
}

const formProfile = document.querySelector('#formProfile');
const formProfileValidator = new FormValidator (config, formProfile);
formProfileValidator.enableValidation();

const formCard = document.querySelector('#formCard');
const formCardValidator = new FormValidator (config, formCard);
formCardValidator.enableValidation();

const pictureEdit = document.querySelector('#editProfilePicture');
const formPictureEditValidator = new FormValidator (config, pictureEdit);
formPictureEditValidator.enableValidation();

const cardList = 
    new Section (
      {renderer: (item, userId) =>{
        const newElement = createNewCard(item, userId);
        cardList.addItem(newElement);} },
      cardListSelector);

const api = 
new Api(
  {baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-47/',
  token: '83fc8ebe-1f08-4a5e-8995-87cf7a67fcf1',
  }
)

let userId = null;

Promise.all([
	api.getnItialCards(),
  api.getHeroData(),
])
	.then(([initialArray, data])=>{
    userId = data._id; // здесь я его передам для создания первичного массива карточек
    currentUserInfo.setUserInfo({
      title: data.name,
      job: data.about,
    })
    currentUserInfo.setUserAvatar(data.avatar);
    cardList.renderItems(initialArray, userId);    
	})
	.catch((err)=>{
		console.log(err);
	})
  
// если здесь будет фукция создания карточки от пользователя которая попытается использовать 
// globalId - то будет тот же null


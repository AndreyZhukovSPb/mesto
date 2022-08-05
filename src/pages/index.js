import './index.css';

import { FormValidator } from '../components/FormValidator.js'
import { Card } from '../components/Card.js'
import { UserInfo } from '../components/UserInfo.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupDelConfirmation } from '../components/PopupDelConfirmation.js'
import { Section } from '../components/Section.js'
import { popupEditProfile, profileEdit } from '../utils/constants.js'
import { popupTitle } from '../utils/constants.js'
import { popupJob } from '../utils/constants.js'
import { cardAddButton } from '../utils/constants.js'
import { cardListSelector } from '../utils/constants.js'
import { config } from '../utils/constants.js'
import { initialCards } from '../utils/constants.js'
import { profileTitle, profileSubtitle, profileAvatar } from '../utils/constants.js'
import { Api } from '../components/Api.js'
import { PopupEditProfilePicture } from '../components/PopupEditProfilePicture'

const api = 
new Api(
  {baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-47/',
  authorization: '83fc8ebe-1f08-4a5e-8995-87cf7a67fcf1',
  contentType: 'application/json'}
)

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
      .catch((err) => {
        console.log(err);
      })
      .finally(() =>{
        popupProfileEdit.renderLoading(false);
      })
  }
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
      api.sendCard(item)
        .then((data) =>{
          const newItem = createNewCard(data);
          cardList.addItem(newItem);
        })
        .catch((err) => {
          console.log(err);
        }); 
    }})
popupAddCard.setEventListeners('cards', );

cardAddButton.addEventListener('click', () => {
  popupAddCard.open()
  formCardValidator.resetValidation(); 
});

const delPopup = new PopupDelConfirmation ({
  popupSelector: '.popup_type_delete',
  submitFunction: (currentCard) => {
    api.removeCard(currentCard._id)
      .then(()=>{
        currentCard._deleteCard();
      })
      .catch((err) => {
        console.log(err); 
      }); 
  }
})
delPopup.setEventListeners()

const editProfilePicture = new PopupEditProfilePicture ({
  popupSelector: '.popup_type_edit-picture',
  submitFunction:(currentPictureLink) => {
    editProfilePicture.renderLoading(true);
    console.log(currentPictureLink);
    api.setUserAvatarServer(currentPictureLink)
      .then(data =>{
        console.log(data);
        currentUserInfo.setUserAvatar(data.avatar);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(()=>{
        editProfilePicture.renderLoading(false);
      })
  }
})
editProfilePicture.setEventListeners();

profileAvatar.addEventListener('click', () =>{
  editProfilePicture.open();
  formPictureEditValidator.resetValidation(); 
})

const imagePopup= new PopupWithImage ('.popup_type_element-photo');
imagePopup.setEventListeners();

function createNewCard(item) {
  const newCard = new Card (
    {data: item,
    handleCardClick: (data) => { 
      imagePopup.open(data);},
    handleDelclick: (card) => {
      delPopup.open(card);},
    sendLikeToSerever: (cardId) => {
      return api.sendLike(cardId)},
    delLekeOnServer: (cardId) => {
      return api.delLike(cardId)},
    }, 
    '#user-element');
  
  const newCardElement = newCard.createCard();
  api.getHeroData()
    .then((data) =>{
      if (data._id === item.owner._id) {
        newCard.makeEnableDel();
      }; 
      if (item.likes.length > 0) {
        item.likes.forEach(like => {
          if (like._id === data._id) {
            newCard._saveLikeCard();
          }
        })
      };
    })
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
      {renderer: (item) =>{
        const newElement = createNewCard(item);
        cardList.addItem(newElement);} },
      cardListSelector);

Promise.all([
	api.getnItialCards(),
  api.getHeroData(),
])
	.then(([initialArray, data])=>{
		cardList.renderItems(initialArray);
    currentUserInfo.setUserInfo({
      title: data.name,
      job: data.about
    })
    currentUserInfo.setUserAvatar(data.avatar);
	})
	.catch((err)=>{
		console.log(err);
	})
  
  


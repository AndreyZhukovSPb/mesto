import './index.css';

import { FormValidator } from '../components/FormValidator.js'
import { Card } from '../components/Card.js'
import { UserInfo } from '../components/UserInfo.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { Section } from '../components/Section.js'
import { profileEdit } from '../utils/constants.js'
import { popupTitle } from '../utils/constants.js'
import { popupJob } from '../utils/constants.js'
import { cardAddButton } from '../utils/constants.js'
import { cardListSelector } from '../utils/constants.js'
import { config } from '../utils/constants.js'
import { data } from '../utils/constants.js'

const popupProfileEdit = 
new PopupWithForm({
  popupSelector: '.popup_type_profile',
  submitFunction: (newItem) => {
    currentUserInfo.setUserInfo({
      name: newItem.editProfileName,
      job: newItem.editProfileJob,
    })
  },
})
popupProfileEdit.setEventListeners();

const currentUserInfo = new UserInfo ({ 
  profileNameSelector: '.profile__title',
  profileJobSelector: '.profile__subtitle',
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
      const newItem = createNewCard(item);
      cardList.addItem(newItem);
    }})
popupAddCard.setEventListeners();

cardAddButton.addEventListener('click', () => {
  popupAddCard.open()
  formCardValidator.resetValidation(); 

});

const imagePopup= new PopupWithImage ('.popup_type_element-photo');
imagePopup.setEventListeners();

function createNewCard(item) {
  const newCard = new Card (
    {data: item,
    handleCardClick: (data) => { 
      imagePopup.open(data);}}, 
    '#user-element');
  const newCardElement = newCard.createCard(); 
  return newCardElement;
}

const cardList = 
  new Section (
      {items: data, 
      renderer: (item) =>{
        const newElement = createNewCard(item);
        cardList.addItem(newElement);} },
      cardListSelector);
cardList.renderItems();

const formProfile = document.querySelector('#formProfile');
const formProfileValidator = new FormValidator (config, formProfile);
formProfileValidator.enableValidation();

const formCard = document.querySelector('#formCard');
const formCardValidator = new FormValidator (config, formCard);
formCardValidator.enableValidation();
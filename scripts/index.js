import { FormValidator } from './FormValidator.js'
import { Card } from './newCard.js'
import { оpenPopup, closePopup} from './utils.js'

const profileEdit = document.querySelector ('.profile__edit-button')
const profileName =  document.querySelector ('.profile__title')
const profileJob = document.querySelector ('.profile__subtitle')

const popupEditProfile = document.querySelector ('.popup_type_profile') 
const popupTitle = popupEditProfile.querySelector ('.popup__input_type_title')
const popupJob = popupEditProfile.querySelector ('.popup__input_type_subtitle')
const profileForm = popupEditProfile.querySelector ('.popup__form')

const popupAddElement = document.querySelector ('.popup_type_element') 
const cardAddButton = document.querySelector('.profile__add-button')
const popupForm = popupAddElement.querySelector ('.popup__form')

const elementsGroup = document.querySelector('.elements');
const userElementName = popupAddElement.querySelector ('.popup__input_type_title')
const userElementLink = popupAddElement.querySelector ('.popup__input_type_subtitle')

const config = { 
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_invalid', 
  errorClass: 'error_type_visible'
}

profileEdit.addEventListener('click', () => {
  оpenPopup(popupEditProfile);
  popupTitle.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
  formProfileValidator.resetValidation();
})

const popups = document.querySelectorAll('.popup')
popups.forEach((popup) => {
  popup.addEventListener('click', evt => {  
    const isOverlay = evt.target.classList.contains('popup');
    const isCloseBtn = evt.target.classList.contains('popup__close-button');
    if (isOverlay || isCloseBtn) {
      closePopup(popup);
    };
  })
})

function preventDefaultAndClose (evt, popup) {
  evt.preventDefault();
  closePopup (popup);
}

function editProfile() {
  profileName.textContent = popupTitle.value;
  profileJob.textContent = popupJob.value;
}

profileForm.addEventListener ('submit', (evt) => {
  preventDefaultAndClose(evt, popupEditProfile);
  editProfile();
})

function resetAddElementInputs() {
  userElementName.value='';
  userElementLink.value='';
}


cardAddButton.addEventListener('click', () => {
  оpenPopup(popupAddElement);
  resetAddElementInputs();
  formCardValidator.resetValidation();
});

popupForm.addEventListener('submit', (evt) => {
  preventDefaultAndClose(evt, popupAddElement);
  createCardUserElement();
})

function createCardUserElement() {
  const userData = new Object();
  userData.name = userElementName.value;
  userData.link = userElementLink.value;
  const userCard = createNewCard(userData);
  elementsGroup.prepend(userCard);
  popupForm.reset();
}

const data = [
  {
    name: 'Архыз',
    link: './images/Архыз.jpg'
  },
  {
    name: 'Питер',
    link: './images/Питер.jpg'
  },
  {
    name: 'Терскол',
    link: './images/Терскол.jpg'
  },
  {
    name: 'Байкал',
    link: './images/Baikal.jpg'
  },
  {
    name: 'Выборг',
    link: './images/Выборг.jpg'
  },
  {
    name: 'Кировск',
    link: './images/Кировск.jpg'
  }
]; 


function createNewCard (item) {
  const newCard = new Card(item, '#user-element');
  const newCardElement = newCard.createCard();
  return newCardElement;
}


data.forEach((item) => {
  const cardElement = createNewCard(item);
  elementsGroup.prepend(cardElement);
});


const formProfile = document.querySelector('#formProfile');
const formProfileValidator = new FormValidator (config, formProfile);
formProfileValidator.enableValidation();

const formCard = document.querySelector('#formCard');
const formCardValidator = new FormValidator (config, formCard);
formCardValidator.enableValidation();



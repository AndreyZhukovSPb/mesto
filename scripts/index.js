import { FormValidator } from './FormValidator.js'
import { Card } from './Card.js'
import { оpenPopup, closePopup} from './utils.js'

const profileEdit = document.querySelector ('.profile__edit-button')
const profileName =  document.querySelector ('.profile__title')
const profileJob = document.querySelector ('.profile__subtitle')

const popupEditProfile = document.querySelector ('.popup_type_profile') 
const popupTitle = popupEditProfile.querySelector ('.popup__input_type_title')
const popupJob = popupEditProfile.querySelector ('.popup__input_type_subtitle')
const profileForm = popupEditProfile.querySelector ('.popup__form')

const popupAddElement = document.querySelector ('.popup_type_element') 
const profileEditButton = document.querySelector('.profile__add-button')
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
  const currentForm = popupEditProfile.querySelector(config.formSelector);
  const currentInputList = Array.from(popupEditProfile.querySelectorAll(config.inputSelector));
  const newCardFormValidator = new FormValidator (config, currentForm);
  newCardFormValidator.switchOffButton();
  currentInputList.forEach((currentInput) => {
    newCardFormValidator.hideError(currentInput);
  });
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


profileEditButton.addEventListener('click', () => {
  оpenPopup(popupAddElement);
  resetAddElementInputs();
  const currentForm = popupAddElement.querySelector(config.formSelector);
  const currentInputList = Array.from(popupAddElement.querySelectorAll(config.inputSelector));
  const newCardFormValidator = new FormValidator (config, currentForm);
  newCardFormValidator.switchOffButton();
  currentInputList.forEach((currentInput) => {
    newCardFormValidator.hideError(currentInput);
  });

});

popupForm.addEventListener('submit', (evt) => {
  preventDefaultAndClose(evt, popupAddElement);
  createCardUserElement();
})

function createCardUserElement() {
  const userData = new Object();
  userData.name = userElementName.value;
  userData.link = userElementLink.value;
  const userCard = new Card (userData, '#user-element');
  const userCardElement = userCard.createCard();
  elementsGroup.prepend(userCardElement);
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

data.forEach((item) => {
  const card = new Card(item, '#user-element');
  const cardElement = card.createCard();
  elementsGroup.prepend(cardElement);
  
});

const formValidationList = Array.from(document.querySelectorAll('.popup__form'));
formValidationList.forEach((formValidation) => {
  const formValidationElement = new FormValidator (config, formValidation);
  formValidationElement.enableValidation();
})


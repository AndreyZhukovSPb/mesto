export const profileEdit = document.querySelector ('.profile__edit-button')
export const popupEditProfile = document.querySelector ('.popup_type_profile') 
export const popupTitle = popupEditProfile.querySelector ('.popup__input_type_title')
export const popupJob = popupEditProfile.querySelector ('.popup__input_type_subtitle')
export const cardAddButton = document.querySelector('.profile__add-button')
export const cardListSelector = '.elements';

export const config = { 
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_invalid', 
  errorClass: 'error_type_visible'
}

const arhizImage = new URL('../images/Архыз.jpg', import.meta.url);
const spbImage = new URL('../images/Питер.jpg', import.meta.url);
const terskolImage = new URL('../images/Терскол.jpg', import.meta.url);
const baikalImage = new URL('../images/Baikal.jpg', import.meta.url);
const viborgImage = new URL('../images/Выборг.jpg', import.meta.url);
const kirovskImage = new URL('../images/Кировск.jpg', import.meta.url);

export const data = [
  {
    name: 'Архыз',
    link: arhizImage
  },
  {
    name: 'Питер',
    link: spbImage
  },
  {
    name: 'Терскол',
    link: terskolImage
  },
  {
    name: 'Байкал',
    link: baikalImage
  },
  {
    name: 'Выборг',
    link: viborgImage
  },
  {
    name: 'Кировск?',
    link: kirovskImage
  }
];
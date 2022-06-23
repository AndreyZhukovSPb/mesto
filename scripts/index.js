const profileEdit = document.querySelector ('.profile__edit-button')
const profileName =  document.querySelector ('.profile__title')
const profileJob = document.querySelector ('.profile__subtitle')

const popupEditProfile = document.querySelector ('.popup_type_profile') 
const popupTitle = popupEditProfile.querySelector ('.popup__input_type_title')
const popupJob = popupEditProfile.querySelector ('.popup__input_type_subtitle')
const profileEditSubmit = popupEditProfile.querySelector ('.popup__form')
const profileEditExit = popupEditProfile.querySelector ('.popup__close-button')

const popupAddElement = document.querySelector ('.popup_type_element') 
const addElementButton = document.querySelector('.profile__add-button')
const addElementExit = popupAddElement.querySelector ('.popup__close-button')
const addElementSubmit = popupAddElement.querySelector ('.popup__form')

const elements = document.querySelector('.elements');
const userElementName = popupAddElement.querySelector ('.popup__input_type_title')
const userElementLink = popupAddElement.querySelector ('.popup__input_type_subtitle')

const popupPhotoElement = document.querySelector ('.popup_type_element-photo') 
const popupPhoto = document.querySelector ('.popup__photo')
const popupText = document.querySelector ('.popup__text')  
const popupPhotoElementExit = popupPhotoElement.querySelector ('.popup__close-button')

const getElementByEvent = evt => evt.currentTarget.closest('.element')

function addListenerEsc(evt) {
  if (evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
}

function оpenPopup (popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener ('keydown', addListenerEsc);
  const currentCloseButton = popupName.querySelector(config.submitButtonSelector);
  const currentForm = popupName.querySelector(config.formSelector);
  const currentInputList = Array.from(popupName.querySelectorAll(config.inputSelector));

  if (popupName != popupPhotoElement) {
    switchOffButton(currentCloseButton, config);
    currentInputList.forEach((currentInput) => {
      hideError (currentForm, currentInput, config);
    })  
  };
}

function closePopup (popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener ('keydown', addListenerEsc);
}

profileEdit.addEventListener('click', () => {
  оpenPopup(popupEditProfile);
  popupTitle.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
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

profileEditSubmit.addEventListener ('submit', (evt) => {
  preventDefaultAndClose(evt, popupEditProfile);
  editProfile();
})

function createUserElement(){
  const userElement = new Object();
  userElement.name = userElementName.value;
  userElement.link = userElementLink.value;
  addElement(userElement);
  addElementSubmit.reset();
}

function resetAddElementInputs() {
  userElementName.value='';
  userElementLink.value='';
}

addElementButton.addEventListener('click', () => {
  оpenPopup(popupAddElement);
  resetAddElementInputs();
});

addElementSubmit.addEventListener('submit', (evt) => {
  preventDefaultAndClose(evt, popupAddElement);
  createUserElement();
})


const initialCards = [
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

function changeLike(evt) {
  evt.currentTarget.classList.toggle('element__like_active');
} 

function removeElement (evt) {
  const currentElement = getElementByEvent(evt);
  currentElement.remove();
}

function openPhotoPopup (evt) {
  оpenPopup(popupPhotoElement);
  popupPhoto.src = evt.target.src;
  popupPhoto.alt = evt.target.alt;
  popupText.textContent = evt.target.alt;
}

function addElementListeners (element) {
  element.querySelector('.element__like').addEventListener('click', changeLike);
  element.querySelector('.element__del-button').addEventListener('click', removeElement);
  element.querySelector('.element__photo').addEventListener('click', openPhotoPopup);
}

const createElement = preElement => {
  const userTemplate = document.querySelector('#user-element').content;
  const newElement = userTemplate.querySelector('.element').cloneNode(true);
  const elementPhoto = newElement.querySelector('.element__photo');
  elementPhoto.src=preElement.link;
  elementPhoto.alt=preElement.name;
  newElement.querySelector('.element__place').textContent=preElement.name;
  addElementListeners(newElement);
  return newElement;
  
};

const addElement = preElement => {
  const newElement = createElement(preElement);
  elements.prepend(newElement);
}
  
initialCards.forEach(addElement);



const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_invalid', 
  errorClass: 'error_type_visible'
}

enableValidation(config);
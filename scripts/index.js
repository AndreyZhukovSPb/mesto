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

function оpenPopup (popupName) {
  popupName.classList.add('popup_opened');
}

profileEdit.addEventListener('click', () => {
  оpenPopup(popupEditProfile);
  popupTitle.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
})

function closePopup (popupName) {
  popupName.classList.remove('popup_opened');
}

const closeButtons = document.querySelectorAll('.popup__close-button')

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
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

addElementButton.addEventListener('click', () => оpenPopup(popupAddElement))
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
  const currentElement = getElementByEvent(evt);
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
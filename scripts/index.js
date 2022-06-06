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

const getLikeByEvent = evt => evt.currentTarget.closest('.element__like')
const getElementByEvent = evt => evt.currentTarget.closest('.element')


function оpenPopup (popupName) {
  popupName.classList.add('popup_opened');
  popupTitle.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
}

profileEdit.addEventListener('click', () => оpenPopup(popupEditProfile))

function closePopup (popupName) {
  popupName.classList.remove('popup_opened');
}

profileEditExit.addEventListener('click', () => closePopup (popupEditProfile))

function popupSubmit (evt, popup) {
  evt.preventDefault();
  closePopup (popup);
}

function editProfile() {
  profileName.textContent = popupTitle.value;
  profileJob.textContent = popupJob.value;
}

profileEditSubmit.addEventListener ('submit', (evt) => {
  popupSubmit(evt, popupEditProfile);
  editProfile();
})

function createUserElement(){
  let userElement = new Object();
  userElement.name = userElementName.value;
  userElement.link = userElementLink.value;
  addElement(userElement);
  addElementSubmit.reset();
}

addElementButton.addEventListener('click', () => оpenPopup(popupAddElement))
addElementExit.addEventListener('click', () => closePopup(popupAddElement))
addElementSubmit.addEventListener('submit', (evt) => {
  popupSubmit(evt, popupAddElement);
  createUserElement();
})

popupPhotoElementExit.addEventListener ('click', () => closePopup(popupPhotoElement))


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
  const currentElement = getLikeByEvent(evt);
  currentElement.classList.toggle('element__like_active');
} 

function removeElement (evt) {
  const currentElement = getElementByEvent(evt);
  currentElement.remove();
}

function opnenPhotoPopup (evt) {
  оpenPopup(popupPhotoElement);
  const currentElement = getElementByEvent(evt);
  popupPhoto.src = currentElement.querySelector('.element__photo').src;
  popupText.textContent = currentElement.querySelector('.element__place').textContent;
}

function addElementListeners (element) {
  element.querySelector('.element__like').addEventListener('click', changeLike);
  element.querySelector('.element__del-button').addEventListener('click', removeElement);
  element.querySelector('.element__photo').addEventListener('click', opnenPhotoPopup);
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





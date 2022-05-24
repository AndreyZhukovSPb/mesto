let profileEdit = document.querySelector ('.profile__edit-button')
let popup = document.querySelector ('.popup') 
let profileName =  document.querySelector ('.profile__title')
let profileJob = document.querySelector ('.profile__subtitle')
let popupTitle = document.querySelector ('.popup__input_type_title')
let popupJob = document.querySelector ('.popup__input_type_subtitle')
let formElement = document.querySelector ('.popup__form')
let profileEditExit = document.querySelector ('.popup__close-button')

function popupOpen(popupName) {
  popupName.classList.add('popup_opened');
  popupTitle.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
}

profileEdit.addEventListener('click', () => popupOpen(popup))

function popupClose (popupName) {
  popupName.classList.remove('popup_opened');
}

profileEditExit.addEventListener('click', () => popupClose(popup))

function popupSubmit (event, popup) {
  event.preventDefault();
  popupClose(popup);
  profileName.textContent = popupTitle.value;
  profileJob.textContent = popupJob.value;
}

formElement.addEventListener ('submit', (event) => popupSubmit(event, popup))
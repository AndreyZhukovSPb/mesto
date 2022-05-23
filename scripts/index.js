let profileEdit = document.querySelector ('.profile__edit-button')
let popup = document.querySelector ('.popup') 
let profileName =  document.querySelector ('.profile__title')
let profileJob = document.querySelector ('.profile__subtitle')
let popupName = document.querySelector ('.popup__input_type_title')
let popupJob = document.querySelector ('.popup__input_type_subtitle')
let formElement = document.querySelector ('.popup__form')
let profileEditExit = document.querySelector ('.popup__close-button')

function popupOpen(popupName) {
  popupName.classList.add('popup_opened');
}

profileEdit.addEventListener('click', function() {
  popupOpen(popup);
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
})

function popupClose (popupName) {
  popupName.classList.remove('popup_opened');
}

profileEditExit.addEventListener('click', function () {
  popupClose(popup);
})

function poopupSubmit(popupName) {
  popupName.classList.remove('popup_opened');
} 

formElement.addEventListener ('submit', function(event){
  event.preventDefault();
  poopupSubmit(popup);
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value
}) 
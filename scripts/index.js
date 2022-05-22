let profileEdit = document.querySelector ('.profile__edit-button')
let popup = document.querySelector ('.popup') 
let profileName =  document.querySelector ('.profile__title')
let profileJob = document.querySelector ('.profile__subtitle')
let popupName = document.querySelector ('.popup__input-title')
let popupJob = document.querySelector ('.popup__input-subtitle')
let formElement = document.querySelector ('.popup__form')
let profileEditExit = document.querySelector ('.popup__close-button')

profileEdit.addEventListener('click', function () {
  popup.classList.add('popup_type_opened');
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
})

profileEditExit.addEventListener('click', function () {
  popup.classList.remove('popup_type_opened');
})

formElement.addEventListener ('submit', function(event){
  event.preventDefault();
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
  popup.classList.remove('popup_type_opened');
}) 
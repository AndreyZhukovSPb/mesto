function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
}

function оpenPopup (popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener ('keydown', handleEscape);
}

function closePopup (popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener ('keydown', handleEscape);
}

export {оpenPopup, closePopup}
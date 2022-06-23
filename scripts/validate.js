const showError = (activeForm, activeInput, errorMessage, objectList) => {
  const inputError = activeForm.querySelector(`.${activeInput.id}-error`);
  activeInput.classList.add(objectList.inputErrorClass);
  inputError.textContent = errorMessage;
  inputError.classList.add(objectList.errorClass);
  
}

const hideError = (activeForm, activeInput, objectList) => {
  const inputError = activeForm.querySelector(`.${activeInput.id}-error`);
  activeInput.classList.remove(objectList.inputErrorClass);
  inputError.textContent = '';
  inputError.classList.remove(objectList.errorClass);
}

const checkValidity = (formElement, inputElement, objectList) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, objectList);
  } else {
    hideError(formElement, inputElement, objectList);
  }
}

function setInputListeners(testForm, objectList) {
  const newInputList = Array.from(testForm.querySelectorAll(objectList.inputSelector));
  const newButtonElement = testForm.querySelector(objectList.submitButtonSelector);
  
  toggleButtonState(newInputList, newButtonElement, objectList);
  
  newInputList.forEach((testInput) => {
    testInput.addEventListener('input', function() {
      checkValidity(testForm, testInput, objectList);
      toggleButtonState(newInputList, newButtonElement, objectList);
    });
  });
}

const enableValidation = (objectList) => {
  const formList = Array.from(document.querySelectorAll(objectList.formSelector));
  formList.forEach((formElement) => {
    setInputListeners(formElement, objectList);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

function switchOffButton (buttonElement, objectList) {
  buttonElement.classList.add(objectList.inactiveButtonClass);
  buttonElement.disabled = true;
}

function switchOnButton(buttonElement, objectList) {
  buttonElement.classList.remove(objectList.inactiveButtonClass);
  buttonElement.disabled = false;
}

function toggleButtonState(inputList, buttonElement, objectList) {
  if (hasInvalidInput(inputList)) {
    switchOffButton(buttonElement, objectList);
  } else {
    switchOnButton(buttonElement, objectList);
  }
}
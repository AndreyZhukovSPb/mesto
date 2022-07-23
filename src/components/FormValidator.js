export class FormValidator {
  constructor (config, formValidation) {
    this._formElement = formValidation;
    this._inputList = Array.from(this._formElement.querySelectorAll(config.inputSelector));
    this._submitButton = this._formElement.querySelector(config.submitButtonSelector);
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  };

  enableValidation() {
    this._toggleButtonState();
    this._inputList.forEach((testInput) => {
      testInput.addEventListener('input', () =>  {
        this._checkValidity(testInput);
        this._toggleButtonState();
      });
    }); 
  };

  switchOffButton () {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.switchOffButton ();
    } else {
      this._switchOnButton();
    };
  };

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });  
  };

  _switchOnButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  };

  _checkValidity (testInput) {
    if (!testInput.validity.valid) {
      this._showError(testInput, testInput.validationMessage);
    } else {
      this._hideError(testInput);
    }
  };

  _showError = (testInput, errorMessage) => {
    const inputError = this._formElement.querySelector(`.${testInput.id}-error`);
    testInput.classList.add(this._inputErrorClass);
    inputError.textContent = errorMessage;
    inputError.classList.add(this._errorClass);
  };


  _hideError = (testInput) => {
    const inputError = this._formElement.querySelector(`.${testInput.id}-error`);
    testInput.classList.remove(this._inputErrorClass);
    inputError.textContent = '';
    inputError.classList.remove(this._errorClass);
  };

  resetValidation() {
    this.switchOffButton();
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    }) 
  }
}
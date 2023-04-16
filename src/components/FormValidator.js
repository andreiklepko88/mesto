export default class FormValidator {
constructor (config, formSelector) {
  this.config = config;
  this._formSelector = formSelector;
}

_showError (inputSelector, errorMessage) {
  const errorElement = this._formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(this.config.inputErrorClass);
  errorElement.textContent = errorMessage;
}

_hideError (inputSelector) {
  const errorElement = this._formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove(this.config.inputErrorClass);
  errorElement.textContent = '';
}

_checkInputValidity (inputSelector) {
  if (!inputSelector.validity.valid) {
    this._showError(inputSelector, inputSelector.validationMessage);
  } else {
    this._hideError(inputSelector);
  };
}

_hasInvalidInput () {
  return this._inputList.some((item) => {
  return !item.validity.valid;
  });
}

disableButton () {
  this._submitButtonSelector.classList.add(this.config.inactiveButtonClass);
  this._submitButtonSelector.setAttribute('disabled', 'disabled');
}

enableButton () {
  this._submitButtonSelector.classList.remove(this.config.inactiveButtonClass);
  this._submitButtonSelector.removeAttribute('disabled');
}


_toggleButtonState () {
  if (this._hasInvalidInput()) {
    this.disableButton();
  } else {
    this.enableButton();
  };
}

resetValidation() {
  this._toggleButtonState();

  this._inputList.forEach((inputSelector) => {
    this._hideError(inputSelector) 
  });
}

_setEventListeners () {
  this._inputList = Array.from(this._formSelector.querySelectorAll(this.config.inputSelector));
  this._submitButtonSelector = this._formSelector.querySelector(this.config.submitButtonSelector);
  this._toggleButtonState ();
  this._inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      this._checkInputValidity(inputSelector);
      this._toggleButtonState();
    });
  });
}

enableValidation () {
  this._setEventListeners();
};
}

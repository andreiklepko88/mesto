const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error'
};

const showError = (formSelector, inputSelector, errorMessage, config) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
}

const hideError = (formSelector, inputSelector, config) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
}

const checkInputValidity = (formSelector, inputSelector, config) => {
  if (!inputSelector.validity.valid) {
    showError(formSelector, inputSelector, inputSelector.validationMessage, config);
  } else {
    hideError(formSelector, inputSelector, config);
  }
};

const setEventListeners = (formSelector, config) => {
  const inputList = Array.from(formSelector.querySelectorAll(config.inputSelector));
  const buttonElement = formSelector.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', function () {
      checkInputValidity(formSelector, inputSelector, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
  formSelector.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(inputList, buttonElement, config), 0 })
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formSelector, config);
  });
};

enableValidation(config);

function hasInvalidInput(inputList, config) {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
}

function toggleButtonState (inputList, submitButtonSelector, config) {
  if(hasInvalidInput(inputList, config)) {
    submitButtonSelector.classList.add(config.inactiveButtonClass);
    submitButtonSelector.setAttribute('disabled', 'disabled')
  } else {
    submitButtonSelector.classList.remove(config.inactiveButtonClass);
    submitButtonSelector.removeAttribute('disabled')
  };
};

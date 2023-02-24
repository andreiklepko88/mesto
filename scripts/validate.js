const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error'
};

const showError = (formSelector, inputSelector, errorMessage) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
}

const hideError = (formSelector, inputSelector) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
}

const checkInputValidity = (formSelector, inputSelector) => {
  if (!inputSelector.validity.valid) {
    showError(formSelector, inputSelector, inputSelector.validationMessage);
  } else {
    hideError(formSelector, inputSelector);
  }
};

const setEventListeners = (formSelector) => {
  const inputList = Array.from(formSelector.querySelectorAll(config.inputSelector));
  const buttonElement = formSelector.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', function () {
      checkInputValidity(formSelector, inputSelector);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formSelector);
  });
};

enableValidation();

function hasInvalidInput(inputList) {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
}

function toggleButtonState (inputList, submitButtonSelector) {
  if(hasInvalidInput(inputList)) {
    submitButtonSelector.classList.add(config.inactiveButtonClass);
    submitButtonSelector.setAttribute('disabled', 'disabled')
  } else {
    submitButtonSelector.classList.remove(config.inactiveButtonClass);
    submitButtonSelector.removeAttribute('disabled')
  };
};

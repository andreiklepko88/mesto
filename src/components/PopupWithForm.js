import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitProfile) {
    super(popupSelector);
    this._submitProfile = submitProfile;
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._form = this._popup.querySelector('.popup__form');
    this._popupSubmitBtn = this._popup.querySelector('.popup__save');
    this._saveButtonText = this._popupSubmitBtn.textContent;
  }

  close() {
    super.close();
    this._form.reset()
  }

  _getInputValues() {
    this._inputValues = {};

    this._inputs.forEach((input) => 
      (this._inputValues[input.name] = input.value)
  );
    return this._inputValues;
  }

  savingButton(saving, savingText = "Сохранение...") {
    if (saving) {
      this._popupSubmitBtn.textContent = savingText;
    } else {
      this._popupSubmitBtn.textContent = this._saveButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitProfile(this._getInputValues());
    });
  };
}


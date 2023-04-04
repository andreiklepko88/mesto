import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitProfile) {
    super(popupSelector);
    this._submitProfile = submitProfile;
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._form = this._popup.querySelector('.popup__form');
  }

  close() {
    super.close();
    this._form.reset()
  }

  _getInputValues() {
    const formValues = {};
    this._formValues = formValues;

    this._inputs.forEach((input) => {
      this._formValues[input.name] = input.value;
  });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitProfile(this._getInputValues());

      this.close();
    });
  };
}


import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor (popupSelector) {
  super(popupSelector);
  this._confirmBtn = this._popup.querySelector('.popup__save');
  };

  setSubmitAction (action) {
    this._handleSubmitAction = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmBtn.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleSubmitAction(evt);
    });
  }
}

import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._caption = this._popup.querySelector(".popup__caption");
    this._image = this._popup.querySelector(".popup__image");
  };

  open(link, name){
    super.open();
    this._caption.textContent = name;
    this._image.alt = name;
    this._image.src = link;
  };
}

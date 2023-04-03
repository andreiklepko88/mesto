export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeByClick = this._closeByClick.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._popup.addEventListener('click', this._closeByClick);
    document.addEventListener('keyup', this._handleEscClose)
  };

  close() {
    this._popup.classList.remove('popup_opened');
    this._popup.removeEventListener('click', this._closeByClick);
    document.removeEventListener('keyup', this._handleEscClose)
  };

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
       this.close()
  };
}
  
  _closeByClick() {
    this._popup.addEventListener('click', (event) => {
    if (event.target === this._popup) {
    this.close();
    };
  });
}

  _closeByButton() {
    this._popup.querySelector('.popup__icon-close').addEventListener('click', () => {
      this.close()
    });
  }

  setEventListeners() {
    this._closeByClick();
    this._closeByButton() 
  };
}

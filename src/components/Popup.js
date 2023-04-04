export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose)
  };

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose)
  };

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
       this.close()
    };
  }
  
  _initCloseByClick() {
    this._popup.addEventListener('click', (event) => {
      if (event.target === this._popup) {
        this.close();
      };
    });
  }

  _initCloseByButton() {
    this._popup.querySelector('.popup__icon-close').addEventListener('click', () => {
      this.close();
    });
  }

  setEventListeners() {
    this._initCloseByClick();
    this._initCloseByButton();
  };
}

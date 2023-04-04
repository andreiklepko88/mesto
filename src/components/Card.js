export default class Card {
constructor(data, templateSelector, openBigPhotoPopup) {
  this._name = data.name;
  this._link = data.link;
  this._templateSelector = templateSelector;
  this._openBigPhotoPopup = openBigPhotoPopup;
}

_getTemplate() {
  const cardElement = document.querySelector('.cards__template').content.querySelector('.cards__item').cloneNode(true);
  return cardElement;
}

createCards() {
  this._element = this._getTemplate();
  this._cardsImage = this._element.querySelector('.cards__image');
  this._setEventListeners();

  
  this._cardsImage.src = this._link;
  this._cardsImage.alt = this._name;

  const cardsText = this._element.querySelector('.cards__text');
  cardsText.textContent = this._name; 

  return this._element;
}

_removeElement() {
  this._element.remove();
  this._element = null;
  this._likeButton = null;
  this._cardsImage = null;
}

_toggleLikeButton() {
  this._likeButton.classList.toggle('cards__like_active');
}

_setEventListeners () {
  this._element.querySelector('.cards__delete').addEventListener('click', () =>{
    this._removeElement();
  });

  this._likeButton = this._element.querySelector('.cards__like');
  this._likeButton.addEventListener('click', () =>{
    this._toggleLikeButton();
  });

  this._cardsImage.addEventListener('click', () => {
    this._openBigPhotoPopup(this._link, this._name)
  });
};
}
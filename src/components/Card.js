export default class Card {
constructor(data, userId, templateSelector, openBigPhotoPopup, handleLikeClick, handleDeleteClick) {
  this._name = data.name;
  this._link = data.link;
  this._templateSelector = templateSelector;
  this._openBigPhotoPopup = openBigPhotoPopup;
  this._ownerId = data.owner._id;
  this._userId = userId;
  this._likes = data.likes;
  this.id = data._id;
  this.handleLikeClick = handleLikeClick;
  this._handleDeleteClick = handleDeleteClick;
}

_getTemplate() {
  const cardElement = document.querySelector('.cards__template').content.querySelector('.cards__item').cloneNode(true);
  return cardElement;
}
 
createCards() {
  this._element = this._getTemplate();
  this._setEventListeners();

  this._cardsImage = this._element.querySelector('.cards__image');
  this._cardsImage.src = this._link;
  this._cardsImage.alt = this._name;
  this._element.querySelector('.cards__text').textContent = this._name;
  
  if (this._userId !== this._ownerId) {
    this._trashBinBtn.remove();
  };
  
  
  this.setLikeStatus(this._likes);
  
  return this._element;
}

removeElement() {
  this._element.remove();
  this._element = null;
  this._likeButton = null;
  this._cardsImage = null;
}

checkLikes() {
  if (this._likes.some((like) => like._id === this._userId)) {
  return true;
  }
  return false;
}

addLike() {
  this._likeButton.classList.add('cards__like_active');
}

removeLike() {
  this._likeButton.classList.remove('cards__like_active');      
}


setLikeStatus(data) {
  this._likeCounter = this._element.querySelector('.cards__like-amount');
  this._likeCounter.textContent = data.length;
  this._likes = data;
  if (this.checkLikes()) {
    this.addLike();
  } else {
    this.removeLike();
  };
};

_setEventListeners () {
  this._trashBinBtn = this._element.querySelector('.cards__delete');
  this._trashBinBtn.addEventListener('click', () =>{
  this._handleDeleteClick(this.id, this);
  });

  this._likeButton = this._element.querySelector('.cards__like');
  this._likeButton.addEventListener('click', () =>{
  this.handleLikeClick(this.id, this.checkLikes(), this);
  });

  this._element.querySelector('.cards__image').addEventListener('click', () => {
    this._openBigPhotoPopup(this._link, this._name);
  });
};
}

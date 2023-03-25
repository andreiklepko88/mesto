import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const popupProfile = document.querySelector('.popup_profile');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const crossButtons = document.querySelectorAll('.popup__icon-close');
const profileJob = document.querySelector('.profile__job');
const profileName = document.querySelector('.profile__name');
const editButton = document.querySelector('.profile__edit-button');
const popupForm = document.querySelector('.popup__form_profile');
const popups = document.querySelectorAll('.popup');

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error'
};

const openBigPhotoPopup = (link, name) => {
  bigImage.src = link;
  bigImage.alt = name;
  bigCaption.textContent = name;
  openPopup(bigPhoto);
}

crossButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
};

editButton.addEventListener('click', function () {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  validationProfile.resetValidation(); 
  validationProfile.toggleButtonState();
});

function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
};

popupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
});

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const template = document.querySelector('.cards__template').content.querySelector('.cards__item');
const list = document.querySelector('.cards__list');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputLink = document.querySelector('.popup__input_type_link');
const newPlace = document.querySelector('.profile__add-place');
const popupCards = document.querySelector('.popup_cards');
const formPlace = document.querySelector('.popup__form_place');
const bigPhoto = document.querySelector('.popup_img_big');
const bigImage = document.querySelector('.popup__image');
const bigCaption = document.querySelector('.popup__caption');

const validationProfile = new FormValidator(config, popupProfile);
validationProfile.enableValidation();

const validationAddCard = new FormValidator(config, popupCards);
validationAddCard.enableValidation();

newPlace.addEventListener('click', function () {
 openPopup(popupCards);

 validationAddCard.resetValidation();
 validationAddCard.toggleButtonState();
});

formPlace.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const card = makeCard({name:inputPlace.value, link:inputLink.value}, '.cards__template', openBigPhotoPopup);
  list.prepend(card);
  closePopup(popupCards);

  evt.target.reset();
});

const makeCard = (data, templateSelector, openBigPhotoPopup) => {
 const card = new Card (data, templateSelector, openBigPhotoPopup);
 const cardElement = card.createCards();
 return cardElement;
}

const renderCards = () => {
  initialCards.map((item) => {
  const cards = makeCard(item, '.cards__template', openBigPhotoPopup);
  list.prepend(cards);
  });
};

renderCards();

popups.forEach(function(popup) {
  popup.addEventListener('click', function(event) {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
  });
});

function closePopupByEscape (evt) {
  if (evt.key === 'Escape') {
  const popupActive = document.querySelector('.popup_opened');
  closePopup(popupActive);
}
};

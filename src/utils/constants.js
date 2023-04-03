export const popupProfile = document.querySelector('.popup_profile');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');
export const crossButtons = document.querySelectorAll('.popup__icon-close');
export const profileJob = document.querySelector('.profile__job');
export const profileName = document.querySelector('.profile__name');
export const editButton = document.querySelector('.profile__edit-button');
export const popupForm = document.querySelector('.popup__form_profile');
export const popups = document.querySelectorAll('.popup');

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error'
};

export const initialCards = [
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

export const template = document.querySelector('.cards__template').content.querySelector('.cards__item');
export const list = document.querySelector('.cards__list');
export const inputPlace = document.querySelector('.popup__input_type_place');
export const inputLink = document.querySelector('.popup__input_type_link');
export const newPlace = document.querySelector('.profile__add-place');
export const popupCards = document.querySelector('.popup_cards');
export const formPlace = document.querySelector('.popup__form_place');
export const bigPhoto = document.querySelector('.popup_img_big');
export const bigImage = document.querySelector('.popup__image');
export const bigCaption = document.querySelector('.popup__caption');

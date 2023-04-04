import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {config, initialCards, popupProfile, nameInput, jobInput, crossButtons,
   profileJob, profileName, editButton, popupForm, popups, template, list,
   inputPlace, inputLink, newPlace, popupCards, formPlace, bigPhoto, bigImage,
    bigCaption} from '../utils/constants.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const handleCardClick = (link, name) => {
   popupBigImage.open(link, name);
};

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job'
});

const makeCard = (data, templateSelector, handleCardClick) => {
  const card = new Card(data, templateSelector, handleCardClick);
  const cardElement = card.createCards();
  return cardElement;
};

const validationProfile = new FormValidator(config, popupProfile);
validationProfile.enableValidation();

const validationAddCard = new FormValidator(config, popupCards);
validationAddCard.enableValidation();

const defaultCardList = new Section(
{
  items: initialCards,
  renderer: (item) => {
    const cardElement = makeCard(item, '.cards__template', handleCardClick);
    defaultCardList.addItem(cardElement);
  }
}, '.cards__list');

defaultCardList.renderItems();

const popupAddPlace = new PopupWithForm('.popup_cards', submitAddCard);
popupAddPlace.setEventListeners();

function submitAddCard (inputValues) {
  const card = makeCard(
    {name: inputValues['place'], link: inputValues['link']}, '.cards__template', handleCardClick);
  defaultCardList.addItem(card);
};

newPlace.addEventListener('click', () => {
  popupAddPlace.open();
  validationAddCard.resetValidation();
});

const popupEditProfile = new PopupWithForm('.popup_profile', submitProfile);
popupEditProfile.setEventListeners();

function submitProfile (formValues) {
  userInfo.setUserInfo(formValues['name'], formValues['job']);
};

editButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  popupEditProfile.open();
})

const popupBigImage = new PopupWithImage('.popup_img_big');
popupBigImage.setEventListeners();


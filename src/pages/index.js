import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {config, initialCards, popupProfile, nameInput, jobInput, crossButtons,
   profileJob, profileName, editButton, popupForm, popups, template, list,
   inputPlace, inputLink, newPlace, popupCards, formPlace, bigPhoto, bigImage,
    bigCaption, popupConfirm, popupAvatar, avatarEditForm, avatarButton} from '../utils/constants.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { api } from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js"


function handleDeleteClick (id, card) {
  popupWithConfirmation.setSubmitAction(() => confirmAction(id, card));
  popupWithConfirmation.open();
};

function confirmAction(id, card) {
  api.deleteCard(id)
  .then(() => {
    card.removeElement();
    popupWithConfirmation.close();
  })
  .catch((err) => console.log(err));
};

function makeCard (data, userId) {
  const card = new Card(data, userId, '.cards__template', openBigPhotoPopup, handleLikeClick, handleDeleteClick);
  const cardElement = card.createCards();
  return cardElement;
};
const userInfo = new UserInfo({
  name: '.profile__name',
  job: '.profile__job',
  avatar: '.profile__avatar'
});

const defaultCardList = new Section(
  {
    data: {},
    renderer: (data) => {
      const cardElement = makeCard(data, userId);
      defaultCardList.addItem(cardElement);
    }
  }, '.cards__list');

function handleLikeClick(id, isLiked, card) {
  if (isLiked) {
    api.removeLike(id)
    .then((res) => {
      card.setLikeStatus(res.likes);
    });
  } else {
    api.addLike(card.id)
    .then((res) => {
      card.setLikeStatus(res.likes);
    });
  };
};


const popupWithConfirmation = new PopupWithConfirmation('.popup_confirmation');
popupWithConfirmation.setEventListeners();


const popupAddPlace = new PopupWithForm('.popup_cards', handleSubmitAddCard);

newPlace.addEventListener('click', () => {
  popupAddPlace.open();
  validationAddCard.disableButton();
});

let userId = null;

 function handleSubmitAddCard(data) {
  popupAddPlace.savingButton(true);
  api.addCard({ name: data["place-input"], link: data["link-input"]})
  .then ((res) => { const card = makeCard(res, userId)
    defaultCardList.addItem(card),
    popupAddPlace.close()
  })
  .catch((err) => console.log(err))
  .finally(() => {
    popupAddPlace.savingButton(false);
  });
 };

 popupAddPlace.setEventListeners();

 const popupBigImage = new PopupWithImage('.popup_img_big');

 const openBigPhotoPopup = (link, name) => {
    popupBigImage.open(link, name);
 };
 popupBigImage.setEventListeners();


 const popupEditProfile = new PopupWithForm('.popup_profile', submitProfile);

function submitProfile(data) {
  popupEditProfile.savingButton(true);
  api.editProfile({name: data.name, job: data.job})
  .then((res) => {
    userInfo.setInfo(res),
    popupEditProfile.close()
  })
  .catch((err) => console.log(err))
  .finally(() => {
    popupEditProfile.savingButton(false);
  });
};

editButton.addEventListener('click', () => {
  const userValues = userInfo.getInfo();
  nameInput.value = userValues.name;
  jobInput.value = userValues.job;
  popupEditProfile.open();
});

popupEditProfile.setEventListeners();


const popupAvatarEdit = new PopupWithForm('.popup_avatar', handleAvatarEdit);

function handleAvatarEdit(data) {
  popupAvatarEdit.savingButton(true);
  api.changeAvatar({ link: data.link })
  .then((res) => {
    userInfo.setInfo(res);
    popupAvatarEdit.close();
  })
  .catch((err) => console.log(err))
  .finally(() => {
    popupAvatarEdit.savingButton(false);
  });
 };

 avatarButton.addEventListener('click', () => {
  popupAvatarEdit.open();
  validationAvatarEdit.disableButton();
 });

 popupAvatarEdit.setEventListeners();

Promise.all([ api.getUserData(), api.getCards() ])
.then(([resUserData, resCards ]) => {
  userId = resUserData._id;
  userInfo.setInfo(resUserData);
  defaultCardList.renderItems(resCards);
})
.catch((err) => console.log(err));

  const validationProfile = new FormValidator(config, popupProfile);
  validationProfile.enableValidation();

  const validationAddCard = new FormValidator(config, popupCards);
  validationAddCard.enableValidation();

  const validationAvatarEdit = new FormValidator(config, popupAvatar);
  validationAvatarEdit.enableValidation();







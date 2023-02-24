const popupProfile = document.querySelector('.popup_profile');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const closeButtons = document.querySelectorAll('.popup__icon-close');
const profileJob = document.querySelector('.profile__job');
const profileName = document.querySelector('.profile__name');
const editButton = document.querySelector('.profile__edit-button');
const popupForm = document.querySelector('.popup__form_profile');
const popups = document.querySelectorAll('.popup');

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

closeButtons.forEach((button) => {
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

const template = document.querySelector('.cards__template').content.querySelector('.cards__item');
const list = document.querySelector('.cards__list');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputLink = document.querySelector('.popup__input_type_link');
const addPlace = document.querySelector('.profile__add-place');
const popupCards = document.querySelector('.popup_cards');
const formPlace = document.querySelector('.popup__form_place');
const closePlaceForm = document.querySelector('.popup_cards').querySelector('.popup__icon-close');
const bigPhoto = document.querySelector('.popup_img_big');
const bigImage = document.querySelector('.popup__image');
const bigCaption = document.querySelector('.popup__caption');
const closeBigPhoto = document.querySelector('.popup_img_big').querySelector('.popup__icon-close');
const createCardButton = document.getElementById('createCard');

addPlace.addEventListener('click', function () {
 openPopup(popupCards);
 if (inputPlace.textContent === '' || inputLink.textContent === '') {
  createCardButton.setAttribute('disabled', 'disabled');
  createCardButton.classList.add('popup__save_disabled');
 };
});

formPlace.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const card = createCards({name:inputPlace.value, link:inputLink.value});

  list.prepend(card);

  closePopup(popupCards);

  evt.target.reset();
});

function renderCards() {
  const cards = initialCards.map((item) => {
    return createCards(item);
    });

  list.prepend(...cards);
};

renderCards();

function createCards(item) {
const card = template.cloneNode(true);
    const cardsImage = card.querySelector('.cards__image');
    cardsImage.src = item.link;
    cardsImage.alt = item.name;
    const cardsText = card.querySelector('.cards__text');
    cardsText.textContent = item.name;

    card.querySelector('.cards__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('cards__like_active')});

    card.querySelector('.cards__delete').addEventListener('click', (evt) => {
      evt.target.closest('.cards__item').remove()});

    cardsImage.addEventListener('click', () => {
      openPopup(bigPhoto);
      bigImage.src = item.link;
      bigImage.alt = item.name;
      bigCaption.textContent = item.name;
    });

    return card;

}

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

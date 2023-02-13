let popupProfile = document.querySelector('.popup_profile');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let closeButton = document.querySelector('.popup__icon-close');
let profileJob = document.querySelector('.profile__job');
let profileName = document.querySelector('.profile__name');
let editButton = document.querySelector('.profile__edit-button');
let popupForm = document.querySelector('.popup__form_profile');

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

function openPopup(item) {
  item.classList.add('popup_opened');
}

editButton.addEventListener('click', () => openPopup(popupProfile));

function closePopup(item) {
  item.classList.remove('popup_opened');
}

popupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
})

closeButton.addEventListener('click', () => closePopup(popupProfile));

const template = document.querySelector('.cards__template').content.querySelector('.cards__item');
const list = document.querySelector('.cards__list');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputLink = document.querySelector('.popup__input_type_link');
const addPlace = document.querySelector('.profile__add-place');
const popupCards = document.querySelector('.popup_cards');
const submitPlace = document.querySelector('.popup_cards').querySelector('.popup__save');
const closePlaceForm = document.querySelector('.popup_cards').querySelector('.popup__icon-close');
const bigPhoto = document.querySelector('.popup_img_big');
const bigImage = document.querySelector('.popup__image');
const bigCaption = document.querySelector('.popup__caption');
const closeBigPhoto = document.querySelector('.popup_img_big').querySelector('.popup__icon-close');

addPlace.addEventListener('click', () => openPopup(popupCards));

submitPlace.addEventListener('click', (evt) => {
  evt.preventDefault();

  const card = createCards({name:inputPlace.value, link:inputLink.value});
  card.querySelector('.cards__image').alt = inputPlace.value;

  list.prepend(card);

  closePopup(popupCards);
  inputPlace.value = '';
  inputLink.value = '';
});

renderCards();

closePlaceForm.addEventListener('click', () => closePopup(popupCards));

function renderCards() {
  const cards = initialCards.map((item) => {
    return createCards(item);
    });

  list.prepend(...cards);
};

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

closeBigPhoto.addEventListener('click', () => closePopup(bigPhoto));


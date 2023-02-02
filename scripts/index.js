let popup = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let closeButton = document.querySelector('.popup__icon-close');
let profileJob = document.querySelector('.profile__job');
let profileName = document.querySelector('.profile__name');
let editButton = document.querySelector('.profile__edit-button');
let popupForm = document.querySelector('.popup__form');

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

editButton.addEventListener('click', openPopup);

function closePopup() {
    popup.classList.remove('popup_opened');
}

popupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
})

closeButton.addEventListener('click', closePopup);

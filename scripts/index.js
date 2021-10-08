import FormValidator from './FormValidator.js';
import Card from './Card.js';

// Constants
const ESC_KEYCODE = 27;

const initialCards = [
  {
    name: 'Yosemite Valley',
    link: 'https://code.s3.yandex.net/web-code/yosemite.jpg',
  },
  {
    name: 'Lake Louise',
    link: 'https://code.s3.yandex.net/web-code/lake-louise.jpg',
  },
  {
    name: 'Bald Mountains',
    link: 'https://code.s3.yandex.net/web-code/bald-mountains.jpg',
  },
  {
    name: 'Latemar',
    link: 'https://code.s3.yandex.net/web-code/latemar.jpg',
  },
  {
    name: 'Vanoise National Park',
    link: 'https://code.s3.yandex.net/web-code/vanoise.jpg',
  },
  {
    name: 'Lago di Braies',
    link: 'https://code.s3.yandex.net/web-code/lago.jpg',
  },
];

// Wrappers
const placesWrap = document.querySelector('.places__list');
const editFormModalWindow = document.querySelector('.popup_type_edit');
const cardFormModalWindow = document.querySelector('.popup_type_new-card');
const imageModalWindow = document.querySelector('.popup_type_image');

// Buttons and other home components
const openEditFormButton = document.querySelector('.profile__edit-button');
const openCardFormButton = document.querySelector('.profile__add-button');

// DOM profile nodes
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Form data and form elements
const titleInputValue = editFormModalWindow.querySelector(
  '.popup__input_type_name'
);
const descriptionInputValue = editFormModalWindow.querySelector(
  '.popup__input_type_description'
);
const cardNameInputValue = cardFormModalWindow.querySelector(
  '.popup__input_type_card-name'
);
const cardLinkInputValue = cardFormModalWindow.querySelector(
  '.popup__input_type_url'
);

const isEscEvent = (evt, action) => {
  const activePopup = document.querySelector('.popup_is-opened');
  if (evt.which === ESC_KEYCODE) {
    action(activePopup);
  }
};

const openModalWindow = (modalWindow) => {
  modalWindow.classList.add('popup_is-opened');
  document.addEventListener('keyup', handleEscUp);
};

const closeModalWindow = (modalWindow) => {
  modalWindow.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', handleEscUp);
};

const renderCard = (data, wrap) => {
  const card = new Card(data, '#card-template').generateCard();
  wrap.prepend(card);
};

// Handlers
const handleEscUp = (evt) => {
  evt.preventDefault();
  isEscEvent(evt, closeModalWindow);
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = titleInputValue.value;
  profileDescription.textContent = descriptionInputValue.value;
  closeModalWindow(editFormModalWindow);
};

const cardFormSubmitHandler = (evt) => {
  evt.preventDefault();
  renderCard(
    {
      name: cardNameInputValue.value,
      link: cardLinkInputValue.value,
    },
    placesWrap
  );
  closeModalWindow(cardFormModalWindow);
};

// EventListeners
editFormModalWindow.addEventListener('submit', formSubmitHandler);
cardFormModalWindow.addEventListener('submit', cardFormSubmitHandler);

openEditFormButton.addEventListener('click', () => {
  titleInputValue.value = profileTitle.textContent;
  descriptionInputValue.value = profileDescription.textContent;
  openModalWindow(editFormModalWindow);
});

openCardFormButton.addEventListener('click', () => {
  openModalWindow(cardFormModalWindow);
});

editFormModalWindow.addEventListener('click', (evt) => {
  if (
    evt.target.classList.contains('popup') ||
    evt.target.classList.contains('popup__close')
  ) {
    closeModalWindow(editFormModalWindow);
  }
});
cardFormModalWindow.addEventListener('click', (evt) => {
  if (
    evt.target.classList.contains('popup') ||
    evt.target.classList.contains('popup__close')
  ) {
    closeModalWindow(cardFormModalWindow);
  }
});
imageModalWindow.addEventListener('click', (evt) => {
  if (
    evt.target.classList.contains('popup') ||
    evt.target.classList.contains('popup__close')
  ) {
    closeModalWindow(imageModalWindow);
  }
});

// Render
initialCards.forEach((data) => {
  renderCard(data, placesWrap);
});

// Validation
const addFormEl = cardFormModalWindow.querySelector('.popup__form');
const editFormEl = editFormModalWindow.querySelector('.popup__form');

const formValidationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const addFormValidator = new FormValidator(formValidationConfig, addFormEl);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(formValidationConfig, editFormEl);
editFormValidator.enableValidation();

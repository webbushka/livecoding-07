const ESC_KEYCODE = 27;
const imageModalWindow = document.querySelector('.popup_type_image');
const imageElement = imageModalWindow.querySelector('.popup__image');
const imageCaption = imageModalWindow.querySelector('.popup__caption');

const isEscEvent = (evt, action) => {
  const activePopup = document.querySelector('.popup_is-opened');
  if (evt.which === ESC_KEYCODE) {
    action(activePopup);
  }
};

const handleEscUp = (evt) => {
  evt.preventDefault();
  isEscEvent(evt, closeModalWindow);
};

const openModalWindow = (modalWindow) => {
  modalWindow.classList.add('popup_is-opened');
  document.addEventListener('keyup', handleEscUp);
};

const closeModalWindow = (modalWindow) => {
  modalWindow.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', handleEscUp);
};

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.places__item')
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeIcon() {}

  _handleDeleteCard() {}

  _handlePreviewPicture() {}

  _setEventListeners() {
    // this is where we setup the events
    console.warn('This is not done yet');
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(
      '.card__image'
    ).style.backgroundImage = `url(${this._link})`;
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }
}

export default Card;

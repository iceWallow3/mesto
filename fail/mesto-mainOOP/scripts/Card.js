// карточки
// импортируем массив с карточками
import { openPopupImage } from "./index.js";

// ООП

const popupImage = picture.querySelector(".popup__figure-image");
const imagePopupText = picture.querySelector(".popup__figure-text");

export { popupImage, imagePopupText };

// отрисовка карточек на старницу

export class Card {
  constructor(data, templateSelector) {
    this._text = data.text;
    this._link = data.link;
    // this._openPopupImage = openPopupImage;
    this._templateSelector = templateSelector;
  }

  // метод добавление темплейт элемента
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  //кнопка лайк
  _likeButton = () => {
    this._element
      .querySelector(".element__heart")
      .classList.toggle("element__heart_active");
  };

  // удаление карточки
  _deleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  generateCard() {
    this._element = this._getTemplate();

    // попап с картинкой
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        openPopupImage(this._text, this._link);
      });

    //кнопка лайк
    this._element
      .querySelector(".element__heart")
      .addEventListener("click", this._likeButton);

    //удаление карточки
    this._element
      .querySelector(".element__trash")
      .addEventListener("click", this._deleteCard);

    // ссылка на картинку, alt и ссылка на текст в карточке
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._text;
    this._element.querySelector(".element__title").textContent = this._text;

    return this._element;
  }
}

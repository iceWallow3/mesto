// карточки
// импортируем массив с карточками
import { openPopupImage, popupImage, imagePopupText } from "./index.js";

// ООП

// export { popupImage, imagePopupText };

// отрисовка карточек на старницу

export class Card {
  constructor(text, link, templateSelector) {
    this._text = text;
    this._link = link;
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
    // ищем картинку и лайк один раз, чтобы потом больше не искать
    this._elementImage = this._element.querySelector(".element__image");
    this._elementLike = this._element.querySelector(".element__heart");

    // попап с картинкой
    this._elementImage.addEventListener("click", () => {
      openPopupImage(this._text, this._link);
    });

    //кнопка лайк
    this._elementLike.addEventListener("click", this._likeButton);

    //удаление карточки
    this._element
      .querySelector(".element__trash")
      .addEventListener("click", this._deleteCard);

    // ссылка на картинку, alt и ссылка на текст в карточке
    this._elementImage.src = this._link;
    this._elementImage.alt = this._text;
    this._element.querySelector(".element__title").textContent = this._text;

    return this._element;
  }
}

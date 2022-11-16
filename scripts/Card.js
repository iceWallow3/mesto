// массив с карточками
const cards = [
  {
    text: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    text: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    text: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    text: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    text: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    text: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// // OOП
// class Card {
//   constructor(text, link) {
//     this._text = text;
//     this._link = link;
//   }

//   // это для вызова всех товарищей
//   generateCard() {
//     // вызывает элемент копирования карточки
//     this._element = this._getTemplate();

//     this._element.querySelector(".element__image").src = this._link; // `url(${this._image})`;
//     this._element.querySelector(".element__title").textContent = this._text;

//     return this._element;
//   }

//   //это для появления загрузку карточек на сайт
//   _getTemplate() {
//     const cardElement = document
//       .querySelector(".template")
//       .content.querySelector(".element")
//       .cloneNode(true);

//     return cardElement;
//   }

//   _renderInitialCards() {
//     cards.forEach((card) => {
//       const currentCard = createCardNode(card.text, card.link);
//       containerCards.append(currentCard);
//     });
//   }
// }

// cards.forEach((item) => {
//   const card = new Card(item.text, item.link);
//   const cardElement = card.generateCard();

//   document.querySelector(".elements").append(cardElement);
// });

//!!!!!!!!!!

// карточки

// через template появление карточек на странице

const containerCards = document.querySelector(".elements");
const template = document.querySelector(".template");

const inputPopupName = add.querySelector(".popup__input_type_name"); // текст

const inputPopupLink = add.querySelector(".popup__input_type_url"); // ссылка

const renderInitialCards = () => {
  cards.forEach((card) => {
    const currentCard = createCardNode(card.text, card.link);
    containerCards.append(currentCard);
  });
};

// попап 3 (с картинкой):
//  ссылка (попап с картинкой)
const imagePopup = picture.querySelector(".popup__figure-image");

// текст попапа с картинкой
const imagePopupText = picture.querySelector(".popup__figure-text");

// попап с картинкой (закрыть)
// const closePopupThird = document.querySelector(".popup__close-third");
const closePopupPicture = picture.querySelector(".popup__close");
closePopupPicture.addEventListener("click", function () {
  // picture.classList.remove("popup_opened");
  closePopup(picture);
});

const createCardNode = (text, link) => {
  const currentCard = template.content.cloneNode(true);

  // текст карточки
  const currentText = currentCard.querySelector(".element__title");
  currentText.textContent = text;

  // ссылка карточки
  const cardImageLink = currentCard.querySelector(".element__image");
  cardImageLink.src = link;
  cardImageLink.alt = text;

  // это для кнопки удаления
  const deleteButton = currentCard.querySelector(".element__trash");
  deleteButton.addEventListener("click", deleteCard);

  // это для кнопки лайка
  const likeButton = currentCard.querySelector(".element__heart");
  likeButton.addEventListener("click", likeCardElement);

  // попап с картинкой (открыть)
  cardImageLink.addEventListener("click", function () {
    // если что, в скобках был evt
    // picture.classList.add("popup_opened");
    openPopup(picture);

    // попап 3 (с картинкой):
    // добавление картинки в попап 3
    // ссылка (попап с картинкой)
    imagePopup.src = link;
    imagePopup.alt = text;

    // текст попапа с картинкой
    imagePopupText.textContent = text;
  });

  return currentCard;
};

// добавление карточек через попап
const submitAddCardPopup = () => {
  // evt.preventDefault();
  const card = createCardNode(inputPopupName.value, inputPopupLink.value); // name
  containerCards.prepend(card);
  inputPopupName.value = "";
  inputPopupLink.value = "";
};

// удаление карточек
const deleteCard = (evt) => {
  const cardDeleteElement = evt.target.closest(".element");
  cardDeleteElement.remove();
};

// лайк
const likeCardElement = (evt) => {
  const likeCard = evt.target.classList.toggle("element__heart_active");
};

renderInitialCards();

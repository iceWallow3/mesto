// 1 попап
const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closePopupButton = document.querySelector(".popup__close");

const titleElement = document.querySelector(".profile__title");
const nameFieldElement = document.querySelector(".popup__input_type_name");

const subtitleElement = document.querySelector(".profile__subtitle");
const surnameFieldElement = document.querySelector(
  ".popup__input_type_surname"
);

const formElement = document.querySelector(".popup__form");

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

editButton.addEventListener("click", function () {
  nameFieldElement.value = titleElement.textContent;
  surnameFieldElement.value = subtitleElement.textContent;
  openPopup(edit);
});
closePopupButton.addEventListener("click", function () {
  closePopup(edit);
});

formElement.addEventListener("submit", function (Event) {
  Event.preventDefault();
  closePopup(edit);
  titleElement.textContent = nameFieldElement.value;
  subtitleElement.textContent = surnameFieldElement.value;
});

//  2 попап

const addButton = document.querySelector(".profile__add-button");

addButton.addEventListener("click", function () {
  add.classList.add("popup_opened");
});

const closePopupTwo = add.querySelector(".popup__close");

closePopupTwo.addEventListener("click", function () {
  add.classList.remove("popup_opened");
});
const buttonSaveTwo = add.querySelector(".popup__button"); // Кнопка

// при нажатии на "сохранить" попап закрывается
buttonSaveTwo.addEventListener("click", function () {
  add.classList.remove("popup_opened");
});

// карточки

const cards = [
  // {
  //   text: "Архыз",
  //   link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  // },
  // {
  //   text: "Челябинская область",
  //   link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  // },
  // {
  //   text: "Иваново",
  //   link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  // },
  {
    text: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  // {
  //   text: "Холмогорский район",
  //   link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  // },
  {
    text: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// через template появление карточек на странице

const containerCards = document.querySelector(".elements");
const template = document.querySelector(".template");

// const buttonSaveTwo = add.querySelector(".popup__button"); // Кнопка

const inputPopupName = add.querySelector(".popup__input_type_name"); // текст

const inputPopupLink = add.querySelector(".popup__input_type_surname"); // ссылка

const render = () => {
  cards.forEach((card) => {
    const currentCard = createCardNode(card.text, card.link);
    containerCards.append(currentCard);
  });
  // слушатель на кнопку
  buttonSaveTwo.addEventListener("click", addCardPopup);
};

const createCardNode = (text, link) => {
  const currentCard = template.content.cloneNode(true);

  // текст карточки
  const currentText = currentCard.querySelector(".element__title");
  currentText.textContent = text;

  // ссылка карточки
  const currentLink = currentCard.querySelector(".element__image");
  currentLink.src = link;

  // это для кнопки удаления
  const deleteButton = currentCard.querySelector(".element__trash");
  deleteButton.addEventListener("click", deleteCard);

  // это для кнопки лайка
  const likeButton = currentCard.querySelector(".element__heart");
  likeButton.addEventListener("click", likeCardElement);

  // попап с картинкой (открыть)
  const openPopupPictureClick = currentCard.querySelector(".element__image");
  openPopupPictureClick.addEventListener("click", function (evt) {
    picture.classList.add("popup_opened");

    // добавление картинки в попап
    // const addPicturePopup = evt.target.closest(".popup__figure_image");
    const addPicturePopup = picture.querySelector("img");
    console.log(addPicturePopup);
    // addPicturePopup = evt.target;
    console.log(openPopupPictureClick.src);
    // console.log(addPicturePopup);
    addPicturePopup.src = link;

    // текст попапа с картинкой
    const addTextPicturePopup = picture.querySelector("p");
    addTextPicturePopup.textContent = text;
  });
  // попап с картинкой (закрыть)
  const closePopupThird = document.querySelector(".popup__close-third");
  closePopupThird.addEventListener("click", function () {
    picture.classList.remove("popup_opened");
  });
  // картинка попапа с картинкой (масла маслянное)

  // let picturePopupLink = (evt) => {
  //   const openPopupThird = picture.querySelector(".popup");
  //   openPopupThird = evt.target.closest(".popup__figure_image");
  //   console.log(openPopupThird);
  // };
  // picturePopupLink();
  // picturePopupBig.addEventListener("click", picturePopup);

  return currentCard;
};

// добавление карточек через попап
const addCardPopup = (evt) => {
  const card = createCardNode(inputPopupName.value, inputPopupLink.value); // name
  containerCards.prepend(card);
  inputPopupName.value = "";
  inputPopupLink.value = "";
  evt.preventDefault();
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
// const openPicture = (evt) => {
//   const openPicturePopup = evt.target.add(".popup__figure_image");
// };
// EventTarget.dispatchEvent();
render();

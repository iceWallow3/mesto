// импортируем кардочки
import { Card } from "./Card.js";

// импортируем массив с карточками
import { cards } from "./cards.js";

// валидацию импортируем
import { FormValidator } from "./FormValidator.js"; // , settings
// 1 попап
const editButton = document.querySelector(".profile__edit-button");
// const profilePopup = document.querySelector("#edit");

const titleElement = document.querySelector(".profile__title");
const nameFieldElement = document.querySelector(".popup__input_type_name");

const subtitleElement = document.querySelector(".profile__subtitle");
const surnameFieldElement = document.querySelector(".popup__input_type_about");

const formEditProfile = edit.querySelector("#formEdit");

// попап редактирования
const popupEditProfile = document.querySelector("#edit");

// функция закрытия всех крестиков 0_0
const closeButtons = document.querySelectorAll(".popup__close");

const addButton = document.querySelector(".profile__add-button");

const popupAddCard = document.querySelector("#add");

// const buttonSaveAdd = add.querySelector(".popup__button"); // Кнопка

const closePopupAdd = document.querySelector("#btnCloseAdd");

// добавление карточек через 2-ой попап
const inputPopupName = document.querySelector("#name-card");
const inputPopupLink = document.querySelector("#url-card");

const popupButtonCard = document.querySelector("#popupButtonCard");
const popupEditButton = document.querySelector("#popupButtonSave");
console.log(popupEditButton);

const formAddCard = document.querySelector("#formAdd");

// все карточки (для созданияы)
const allCards = document.querySelector(".elements"); //.prepend(cardElement);

// картинка попупа с картинкой
const popupImage = picture.querySelector(".popup__figure-image");
// текст попупа с картинкой
const imagePopupText = picture.querySelector(".popup__figure-text");

export { popupImage, imagePopupText };

// настройки классов для валидации
const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  popupButtonValid: "popup__button_valid",
  popupButtonInValid: "popup__button_invalid",
  errorClass: "popup__input_error",
};

const profileEditFormValidator = new FormValidator(settings, formEditProfile);
// profileEditFormValidator.enableValidation();
const cardAddFormValidator = new FormValidator(settings, formAddCard);
// cardAddFormValidator.enableValidation();

// функция открытия попапа
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closeWithEsc);
}

// функция закрытия попапа
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeWithEsc);
}

editButton.addEventListener("click", function () {
  nameFieldElement.value = titleElement.textContent;
  surnameFieldElement.value = subtitleElement.textContent;

  openPopup(popupEditProfile);

  // вызываем валидацию
  profileEditFormValidator.enableValidation();
});

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");

  button.addEventListener("click", () => closePopup(popup));
});

formEditProfile.addEventListener("submit", function (evt) {
  evt.preventDefault();
  closePopup(popupEditProfile);
  titleElement.textContent = nameFieldElement.value;
  subtitleElement.textContent = surnameFieldElement.value;
  Card;
});

//  2 попап (добавления карточки)
addButton.addEventListener("click", function () {
  openPopup(popupAddCard);
  // эти команды делают кнопку невалидной, когда открывается 2 попап
  // popupButtonCard.classList.add("popup__button_invalid");
  // popupButtonCard.setAttribute("disabled", true);
  //* валидация кнопки
  cardAddFormValidator.enableValidation();
});

// вызываем валидацию
// const cardAddFormValidator = new FormValidator(settings, formAddCard);
// cardAddFormValidator.enableValidation();

closePopupAdd.addEventListener("click", function () {
  closePopup(popupAddCard);
});

// функция закрытия попапа на оверлей
const overleyClosePopups = Array.from(document.querySelectorAll(".popup"));
overleyClosePopups.forEach((overley) => {
  overley.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
      // закрываются все попупы
      closePopup(overley);
    }
  });
});

// функция закрытия попапов всех попупов на esc
function closeWithEsc(evt) {
  if (evt.key === "Escape") {
    const openedAnyPopup = document.querySelector(".popup_opened");
    closePopup(openedAnyPopup);
  }
}

// функция открытия картинки попапа 3
export function openPopupImage(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  imagePopupText.textContent = name;
  openPopup(picture);
}

//!!!!!!!!!!!!! функции создания и добавления карточек
// функция создает карточки
function createCard(text, link) {
  const card = new Card(text, link, ".template");
  const cardElement = card.generateCard();
  return cardElement;
}
// функция добавляет карточки
const addCard = (text, link) => {
  const card = createCard(text, link);
  allCards.prepend(card);
};
// функция обходит массив и добавляет карточки на экран
const renderCards = (array) => {
  array.forEach((item) => {
    addCard(item.text, item.link);
    allCards.append(cards);
  });
};
// форма в которой вызывается функция добавления карточки
formAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  addCard(inputPopupName.value, inputPopupLink.value);
  closePopup(popupAddCard);
  formAddCard.reset();
});
renderCards(cards);
// // функция создания карточки через класс
// function createCard(item) {
//   const card = new Card(item.text, item.link, ".template");
//   const cardElement = card.generateCard();

//   allCards.append(cardElement);
// }
// // обходим массив, чтобы данные, которые мы вносили выше появились
// cards.forEach((item) => {
//   createCard(item);
// });

// //функция добавления карточки через попап
// function cardAddInPopup() {
//   const card = new Card(
//     inputPopupName.value,
//     inputPopupLink.value,
//     ".template"
//   );
//   const cardElement = card.generateCard();
//   allCards.prepend(cardElement);
// }

// // создание карточки через форму попапа добавления
// formAddCard.addEventListener("submit", function (evt) {
//   evt.preventDefault();

//   cardAddInPopup(); // вызываем функцию добавления карточки
//   closePopup(popupAddCard);
//   inputPopupName.value = "";
//   inputPopupLink.value = "";
// });

// импортируем кардочки
import {
  cards,
  popupElement,
  popupImage,
  popupButtonClose,
  imagePopupText,
  imageTemplateCard,
  Card,
} from "./Card.js";

// валидацию импортируем
import { FormValidator } from "./FormValidator.js"; // , settings
// 1 попап
const editButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector("#edit");

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

const closePopupAdd = add.querySelector(".popup__close");

// добавление карточек через 2-ой попап
const inputPopupName = add.querySelector("#name-card");
const inputPopupLink = add.querySelector("#url-card");

const popupButtonCard = add.querySelector("#popupButtonCard");

const formAddCard = add.querySelector(".popup__form");

// все карточки (для созданияы)
const allCards = document.querySelector(".elements"); //.prepend(cardElement);

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

export { settings };

export { openPopup, closePopup };
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
  const profileEditFormValidator = new FormValidator(settings, formEditProfile);
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
});

//  2 попап (добавления карточки)

addButton.addEventListener("click", function () {
  openPopup(popupAddCard);
  // buttonSaveTwo.classList.add("popup__button_invalid");
  // buttonSaveTwo.classList.remove("popup__button_valid");
  // buttonSaveTwo.setAttribute("disabled", true);
  //* валидация кнопки
  // эти 3 строчки для того, чтобы при повторном нажатии кнопка была неактивна
});

// вызываем валидацию
const cardAddFormValidator = new FormValidator(settings, formAddCard);
cardAddFormValidator.enableValidation();

closePopupAdd.addEventListener("click", function () {
  closePopup(popupAddCard);
});

//функция добавления карточки
function cardAddInPopup() {
  const card = new Card(inputPopupName.value, inputPopupLink.value);
  const cardElement = card.generateCard();
  allCards.prepend(cardElement);
}

// создание карточки через форму попапа добавления
formAddCard.addEventListener("submit", function (evt) {
  evt.preventDefault();

  cardAddInPopup(); // вызываем функцию добавления карточки
  closePopup(popupAddCard);
  inputPopupName.value = "";
  inputPopupLink.value = "";
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
// вызов класса, который откроет картинку в попапе
const element = new Card(openPopupImage); // data, templateSelector,

// обходим массив, чтобы данные, которые мы вносили выше появились
cards.forEach((item) => {
  const card = new Card(item.text, item.link);
  const cardElement = card.generateCard();

  document.querySelector(".elements").append(cardElement);
});

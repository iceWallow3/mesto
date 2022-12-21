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
import { FormValidator, settings } from "./validate.js";
// 1 попап
const editButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector("#edit");
const closePopupButton = document.querySelector(".popup__close");

const titleElement = document.querySelector(".profile__title");
const nameFieldElement = document.querySelector(".popup__input_type_name");

const subtitleElement = document.querySelector(".profile__subtitle");
const surnameFieldElement = document.querySelector(".popup__input_type_about");

const formEditProfile = document.querySelector(".popup__form");

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

// попап редактирования
const popupEditProfile = document.querySelector("#edit");

editButton.addEventListener("click", function () {
  nameFieldElement.value = titleElement.textContent;
  surnameFieldElement.value = subtitleElement.textContent;
  openPopup(popupEditProfile);

  // вызываем валидацию
  const profileEditFormValidator = new FormValidator(settings, formEditProfile);
  profileEditFormValidator.enableValidation();
});

// функция закрытия всех крестиков 0_0
const closeButtons = document.querySelectorAll(".popup__close");

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");

  button.addEventListener("click", () => closePopup(popup));
});

// closePopupButton.addEventListener("click", function () {
//   closePopup(popupEditProfile);
// });

formEditProfile.addEventListener("submit", function (evt) {
  evt.preventDefault();
  closePopup(popupEditProfile);
  titleElement.textContent = nameFieldElement.value;
  subtitleElement.textContent = surnameFieldElement.value;
});

//  2 попап (добавления карточки)

const addButton = document.querySelector(".profile__add-button");

const popupAddCard = document.querySelector("#add");

const buttonSaveTwo = add.querySelector(".popup__button"); // Кнопка

addButton.addEventListener("click", function () {
  openPopup(popupAddCard);
  // buttonSaveTwo.classList.add("popup__button_invalid");
  // buttonSaveTwo.classList.remove("popup__button_valid");
  // buttonSaveTwo.setAttribute("disabled", true);
  //* валидация кнопки
  // эти 3 строчки для того, чтобы при повторном нажатии кнопка была неактивна

  // вызываем валидацию
  const cardAddFormValidator = new FormValidator(settings, formAddCard);
  cardAddFormValidator.enableValidation();
});

const closePopupAdd = add.querySelector(".popup__close");

closePopupAdd.addEventListener("click", function () {
  closePopup(popupAddCard);
});

// попап закроется если нажать на "сохранить"
const formAddCard = add.querySelector(".popup__form");
formAddCard.addEventListener("submit", function (evt) {
  evt.preventDefault();
  closePopup(popupAddCard);
});

// функция закрытия попапов (1  2  3)
// document.addEventListener("keydown", function (evt) {
//   if (evt.key === "Escape") {
//     closePopup(popup);
//     closePopup(popupAddCard);
//     closePopup(picture);
//   }
// });
// функция закрытия попапов (1  2  3)
function closeWithEsc(evt) {
  if (evt.key === "Escape") {
    const openedAnyPopup = document.querySelector(".popup_opened");
    closePopup(profilePopup);
    closePopup(popupAddCard);
    closePopup(picture);
  }
}

// функция закрытия попапа на оверлей
const OverleyClosePopups = Array.from(document.querySelectorAll(".popup"));
OverleyClosePopups.forEach((overley) => {
  overley.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(profilePopup);
      closePopup(popupAddCard);
      closePopup(picture);
    }
  });
});

// добавление карточек через 2-ой попап
const inputPopupName = add.querySelector("#name-card");
const inputPopupLink = add.querySelector("#url-card");

const popupButtonCard = add.querySelector("#popupButtonCard");

popupButtonCard.addEventListener("click", (evt) => {
  // он берет вводимые данные и отправляет их в консоль (2 попап)
  console.log(inputPopupName.value);
  console.log(inputPopupLink.value);
  const card = new Card(inputPopupName.value, inputPopupLink.value);
  const cardElement = card.generateCard();
  document.querySelector(".elements").prepend(cardElement);
  inputPopupName.value = "";
  inputPopupLink.value = "";
});

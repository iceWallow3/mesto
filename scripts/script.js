// 1 попап
const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closePopupButton = document.querySelector(".popup__close");

const titleElement = document.querySelector(".profile__title");
const nameFieldElement = document.querySelector(".popup__input_type_name");

const subtitleElement = document.querySelector(".profile__subtitle");
const surnameFieldElement = document.querySelector(".popup__input_type_about");

const formEditProfile = document.querySelector(".popup__form");

// функция открытия попапа
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

// функция закрытия попапа
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  // это удалит данные во 2 попапе, если закрыть
  // formAddCard.reset();
}

// попап редактирования
const popupEditProfile = document.querySelector("#edit");

editButton.addEventListener("click", function () {
  nameFieldElement.value = titleElement.textContent;
  surnameFieldElement.value = subtitleElement.textContent;
  openPopup(popupEditProfile);
});
closePopupButton.addEventListener("click", function () {
  closePopup(popupEditProfile);
});

formEditProfile.addEventListener("submit", function (evt) {
  evt.preventDefault();
  closePopup(popupEditProfile);
  titleElement.textContent = nameFieldElement.value;
  subtitleElement.textContent = surnameFieldElement.value;
});

//  2 попап (добавления карточки)

const addButton = document.querySelector(".profile__add-button");

const popupAddCard = document.querySelector("#add");

addButton.addEventListener("click", function () {
  openPopup(popupAddCard);
});

const closePopupAdd = add.querySelector(".popup__close");

closePopupAdd.addEventListener("click", function () {
  closePopup(popupAddCard);
});

const buttonSaveTwo = add.querySelector(".popup__button"); // Кнопка

// попап закроется если нажать на "сохранить"
const formAddCard = add.querySelector(".popup__form");
formAddCard.addEventListener("submit", function (evt) {
  evt.preventDefault();
  closePopup(popupAddCard);
  submitAddCardPopup();
  // validateForm();
});

// карточки

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

    // добавление картинки в попап 3
    // попап 3 (с картинкой):
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

// formEditProfile форма 1 попапа
// formAddCard форма 2 попапа
// nameFieldElement  имя 1 попапа
// surnameFieldElement о себе 1 попап
// inputPopupName  // название карточк 2 попапа
// inputPopupLink  // ссылка карточки 2 попапа

// кнопка сохранить 1 попап
const popupButtonSave = edit.querySelector("#popupButtonSave");

// кнопка, которая меняется в зависимости от валидации (1 form)
const setSubmitButtonState = (isActive) => {
  if (isActive) {
    // если функция валидна
    popupButtonSave.removeAttribute("disabled"); // кнопка активной становится
    popupButtonSave.classList.add("popup__button_valid"); // добавляется класс чк (черной кнопки)
    popupButtonSave.classList.remove("popup__button_invalid"); // убирается класс ск (серой кнопки)
  } else {
    // если функция невалидна
    popupButtonSave.setAttribute("disabled", true); // кнопка становится неактивной
    popupButtonSave.classList.add("popup__button_invalid"); // добавляется класс ск
    popupButtonSave.classList.remove("popup__button_valid"); // убирается класс чк
  }
};

// объявляем валидате инпут 1 формы
const validateInput = (inputElement) => {
  // console.log(inputElement.id);

  // ошибка 1 формы
  const errorElement = formEditProfile.querySelector(
    `#${inputElement.id}-error`
  );

  // console.log(errorElement);

  // в этой функции будет вылазить текст ошибки если форма не прошла валидацию (1 форма)
  if (inputElement.checkValidity()) {
    // console.log("Инпут валидный");
    errorElement.textContent = "";
  } else {
    // console.log("инпут НЕвалидный");
    errorElement.textContent = inputElement.validationMessage;
  }
  if (formEditProfile.checkValidity()) {
    setSubmitButtonState(true);
  } else {
    setSubmitButtonState(false);
  }
};

// валидация 1 формы
const validateForm = (evt) => {
  evt.preventDefault();
  // 1 форма
  validateInput(nameFieldElement);
  validateInput(surnameFieldElement);

  // проверить, валидная ли форма
  // if (formEditProfile.checkValidity()) {
  //   console.log("Валидна 1 форма");
  // } else {
  //   console.log("НЕвалидана 1 форма");
  // }
};

// отправка 1 формы
formEditProfile.addEventListener("input", validateForm);

// кнопка "создать"
const popupButtonCreate = add.querySelector("#popupButtonCard");
console.log(popupButtonCreate);

const setSubmitButtonStateCard = (isActiveCard) => {
  if (isActiveCard) {
    // если функция валидна
    popupButtonCreate.removeAttribute("disabled"); // кнопка активной становится
    popupButtonCreate.classList.add("popup__button_valid"); // добавляется класс чк (черной кнопки)
    popupButtonCreate.classList.remove("popup__button_invalid"); // убирается класс ск (серой кнопки)
  } else {
    // если функция невалидна
    popupButtonCreate.setAttribute("disabled", true); // кнопка становится неактивной
    popupButtonCreate.classList.add("popup__button_invalid"); // добавляется класс ск
    popupButtonCreate.classList.remove("popup__button_valid"); // убирается класс чк
  }
};

// Форма текста ошибки 2 попапа
const validateInputCard = (inputElementCard) => {
  const errorElementCard = formAddCard.querySelector(
    `#${inputElementCard.id}-error`
  );

  if (inputElementCard.checkValidity()) {
    // console.log("Валидна 2 форма");
    errorElementCard.textContent = "";
  } else {
    // console.log("НЕвалидана 2 форма");
    errorElementCard.textContent = inputElementCard.validationMessage;
  }
  // функция добавляет и убирает классы кнопке "создать"
  if (formAddCard.checkValidity()) {
    setSubmitButtonStateCard(true);
  } else {
    setSubmitButtonStateCard(false);
  }
};

// валидация 2 формы
const validateFormCard = (evt) => {
  evt.preventDefault();
  // 1 форма
  validateInputCard(inputPopupName);
  validateInputCard(inputPopupLink);

  // проверить, валидная ли форма
  if (formAddCard.checkValidity()) {
    console.log("Валидна 2 форма");
  } else {
    console.log("НЕвалидана 2 форма");
  }
};

// отправка 2 формы
formAddCard.addEventListener("input", validateFormCard);

// функция закрытия попапов (1  2  3)
document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    closePopup(popup);
    closePopup(popupAddCard);
    closePopup(picture);
  }
});

// функция закрытия попапа на оверлей
const popupOverleyClose = Array.from(document.querySelectorAll(".popup"));
popupOverleyClose.forEach((overley) => {
  overley.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
      closePopup(popupAddCard);
      closePopup(picture);
    }
  });
});

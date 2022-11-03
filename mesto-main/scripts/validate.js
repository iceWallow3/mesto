// formEditProfile форма 1 попапа
// formAddCard форма 2 попапа
// nameFieldElement  имя 1 попапа
// surnameFieldElement о себе 1 попап
// inputPopupName  // название карточк 2 попапа
// inputPopupLink  // ссылка карточки 2 попапа

// const popupForm = document.querySelector(".popup__form"); // форма
// const popupInputElement = popupForm.querySelector(".popup__input"); // инпут в форме
// const formError = popupForm.querySelector(`#${popupInputElement.id}-error`); // ошибка в форме

//! создание всей фалидации с помощью одной функции

// функция, показывает ошибку
const showMeError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  //   console.log(errorElement);
  inputElement.classList.add("popup__input_error"); // если ничего не работает, попробуй убрать или добавить точку
  errorElement.textContent = errorMessage;
  //   errorElement.classList.add("error"); // класс ошибки
};

// функция, которая убирает ошибку
const hideOutError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  console.log(errorElement);
  inputElement.classList.remove("popup__input_error");
  errorElement.textContent = "";
  //   errorElement.classList.remove("error"); // класс ошибки
};

// функция проверяет на валидность элементы
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showMeError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideOutError(formElement, inputElement);
  }
};

// функция берет все инпуты, обходит их, и если есть ошибка - выдает её
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));

  const buttonElement = formElement.querySelector(".popup__button"); // 1

  //   toggleButtonState(inputList, buttonElement); // валидация будет работать если нажать на люб кнопку в инпуте

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableFullValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    // const fieldsetList = Array.from(formElement.querySelectorAll(".form__set")); //todo если что, потом вернуть
    setEventListeners(formElement);
  });
};

// есть ли ошибка в форме? Проверяем весь массив
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// если поля невалидные, то кнопка (сохр, созд) блокируется
const toggleButtonState = (inputElement, buttonElement) => {
  if (!hasInvalidInput(inputElement)) {
    buttonElement.classList.add("popup__button_valid");
    buttonElement.classList.remove("popup__button_invalid");
    buttonElement.removeAttribute("disabled");
  } else {
    buttonElement.classList.add("popup__button_invalid");
    buttonElement.classList.remove("popup__button_valid");
    buttonElement.setAttribute("disabled", true);
  }
};
enableFullValidation();
// enableFullValidation({
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__button",
//   inactiveButtonClass: "popup__button_disabled",
//   inputErrorClass: "popup__input_type_error",
//   errorClass: "popup__input_error",
// });
// let object = enableFullValidation[errorClass];
// console.log(object);
// setEventListeners(popupForm);

// popupForm.addEventListener("input", function (evt) {
//   evt.preventDefault();
// });
// popupInputElement.addEventListener("input", function () {
//   checkInputValidity(popupForm, popupInputElement);
// });

//* это с помощью вебинара, тут для каждой формы нужно создать отдельную функцию
// // кнопка сохранить 1 попап
// const popupButtonSave = edit.querySelector("#popupButtonSave");

// // кнопка, которая меняется в зависимости от валидации (1 form)
// const setSubmitButtonState = (isActive) => {
//   if (isActive) {
//     // если функция валидна
//     popupButtonSave.removeAttribute("disabled"); // кнопка активной становится
//     popupButtonSave.classList.add("popup__button_valid"); // добавляется класс чк (черной кнопки)
//     popupButtonSave.classList.remove("popup__button_invalid"); // убирается класс ск (серой кнопки)
//   } else {
//     // если функция невалидна
//     popupButtonSave.setAttribute("disabled", true); // кнопка становится неактивной
//     popupButtonSave.classList.add("popup__button_invalid"); // добавляется класс ск
//     popupButtonSave.classList.remove("popup__button_valid"); // убирается класс чк
//   }
// };

// // объявляем валидате инпут 1 формы
// const validateInput = (inputElement) => {
//   // console.log(inputElement.id);

//   // ошибка 1 формы
//   const errorElement = formEditProfile.querySelector(
//     `#${inputElement.id}-error`
//   );

//   // console.log(errorElement);

//   // в этой функции будет вылазить текст ошибки если форма не прошла валидацию (1 форма)
//   if (inputElement.checkValidity()) {
//     // console.log("Инпут валидный");
//     errorElement.textContent = "";
//   } else {
//     // console.log("инпут НЕвалидный");
//     errorElement.textContent = inputElement.validationMessage;
//   }
//   if (formEditProfile.checkValidity()) {
//     setSubmitButtonState(true);
//   } else {
//     setSubmitButtonState(false);
//   }
// };

// // валидация 1 формы
// const validateForm = (evt) => {
//   evt.preventDefault();
//   // 1 форма
//   validateInput(nameFieldElement);
//   validateInput(surnameFieldElement);

//   // проверить, валидная ли форма
//   // if (formEditProfile.checkValidity()) {
//   //   console.log("Валидна 1 форма");
//   // } else {
//   //   console.log("НЕвалидана 1 форма");
//   // }
// };

// // отправка 1 формы
// formEditProfile.addEventListener("input", validateForm);

// // кнопка "создать"
// const popupButtonCreate = add.querySelector("#popupButtonCard");
// console.log(popupButtonCreate);

// const setSubmitButtonStateCard = (isActiveCard) => {
//   if (isActiveCard) {
//     // если функция валидна
//     popupButtonCreate.removeAttribute("disabled"); // кнопка активной становится
//     popupButtonCreate.classList.add("popup__button_valid"); // добавляется класс чк (черной кнопки)
//     popupButtonCreate.classList.remove("popup__button_invalid"); // убирается класс ск (серой кнопки)
//   } else {
//     // если функция невалидна
//     popupButtonCreate.setAttribute("disabled", true); // кнопка становится неактивной
//     popupButtonCreate.classList.add("popup__button_invalid"); // добавляется класс ск
//     popupButtonCreate.classList.remove("popup__button_valid"); // убирается класс чк
//   }
// };

// // Форма текста ошибки 2 попапа
// const validateInputCard = (inputElementCard) => {
//   const errorElementCard = formAddCard.querySelector(
//     `#${inputElementCard.id}-error`
//   );

//   if (inputElementCard.checkValidity()) {
//     // console.log("Валидна 2 форма");
//     errorElementCard.textContent = "";
//   } else {
//     // console.log("НЕвалидана 2 форма");
//     errorElementCard.textContent = inputElementCard.validationMessage;
//   }
//   // функция добавляет и убирает классы кнопке "создать"
//   if (formAddCard.checkValidity()) {
//     setSubmitButtonStateCard(true);
//   } else {
//     setSubmitButtonStateCard(false);
//   }
// };

// // валидация 2 формы
// const validateFormCard = (evt) => {
//   evt.preventDefault();
//   // 1 форма
//   validateInputCard(inputPopupName);
//   validateInputCard(inputPopupLink);

//   // проверить, валидная ли форма
//   if (formAddCard.checkValidity()) {
//     console.log("Валидна 2 форма");
//   } else {
//     console.log("НЕвалидана 2 форма");
//   }
// };

// // отправка 2 формы
// formAddCard.addEventListener("input", validateFormCard);

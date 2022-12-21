//! Валидация ООП

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

export class FormValidator {
  constructor(data, formElement) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._popupButtonValid = data.popupButtonValid;
    this._popupButtonInValid = data.popupButtonInValid;
    this._errorClass = data.errorClass;

    this._formElement = formElement;

    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  // покажи ошибку
  _showMeError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    //   console.log(errorElement);
    inputElement.classList.add(this._errorClass); // если ничего не работает, попробуй убрать или добавить точку
    errorElement.textContent = errorMessage;
  }

  // убери ошибку
  _hideOutError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    // console.log(errorElement);
    inputElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
    //   errorElement.classList.remove("error"); // класс ошибки
  }

  // проверка на валидность элементы и если что, выдавать или убирать ошибки
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showMeError(inputElement, inputElement.validationMessage);
    } else {
      this._hideOutError(inputElement);
    }
  }

  // проверка массива на наличие ошибок
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // если поля НЕвалидные, тогда кнопка не работает и белая
  // а если поля валидные, тогда кнопка  работает и черная
  _toggleButtonState() {
    if (!this._hasInvalidInput(this._inputList)) {
      this.disabledButtonSubmit();
      this._buttonElement.classList.add(settings.popupButtonValid);
      this._buttonElement.classList.remove(settings.popupButtonInValid);
      this._buttonElement.removeAttribute("disabled");
    } else {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disbaled = true;
      this._buttonElement.classList.add(settings.popupButtonInValid);
      this._buttonElement.classList.remove(settings.popupButtonValid);
      this._buttonElement.setAttribute("disabled", true);
    }
  }

  // не рабочая кнопка
  disabledButtonSubmit() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disbaled = true;
  }

  // функция обходит массив и запускает валидацию кнопки и формы
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // возвращает ошибки
  removeErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideOutError(inputElement);
    });
  }

  // запускаем валидацю
  enableValidation() {
    this._setEventListeners();
  }
  // enableFullValidation(settings);
}

// //* валидация по алгоритмам (до ооп)

// const settings = {
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__button",
//   inactiveButtonClass: "popup__button_disabled",
//   popupButtonValid: "popup__button_valid",
//   popupButtonInValid: "popup__button_invalid",
//   errorClass: "popup__input_error",
// };

// // функция, показывает ошибку
// const showMeError = (formElement, inputElement, errorMessage) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   //   console.log(errorElement);
//   inputElement.classList.add(settings.errorClass); // если ничего не работает, попробуй убрать или добавить точку
//   errorElement.textContent = errorMessage;
//   //   errorElement.classList.add("error"); // класс ошибки
// };

// // функция, которая убирает ошибку
// const hideOutError = (formElement, inputElement, settings) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   console.log(errorElement);
//   inputElement.classList.remove(settings.errorClass);
//   errorElement.textContent = "";
//   //   errorElement.classList.remove("error"); // класс ошибки
// };

// // функция проверяет на валидность элементы
// const checkInputValidity = (formElement, inputElement, settings) => {
//   if (!inputElement.validity.valid) {
//     showMeError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideOutError(formElement, inputElement, settings);
//   }
// };

// // функция берет все инпуты, обходит их, и если есть ошибка - выдает её
// const setEventListeners = (formElement, settings) => {
//   const inputList = Array.from(formElement.querySelectorAll(".popup__input"));

//   const buttonElement = formElement.querySelector(
//     settings.submitButtonSelector
//   ); // 1

//   //   toggleButtonState(inputList, buttonElement); // валидация будет работать если нажать на люб кнопку в инпуте

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", function () {
//       checkInputValidity(formElement, inputElement, settings);
//       toggleButtonState(inputList, buttonElement, settings);
//     });
//   });
// };

// const enableFullValidation = (settings) => {
//   const formList = Array.from(document.querySelectorAll(".popup__form"));

//   formList.forEach((formElement) => {
//     formElement.addEventListener("submit", function (evt) {
//       evt.preventDefault();
//     });
//     // const fieldsetList = Array.from(formElement.querySelectorAll(".form__set")); //todo если что, потом вернуть
//     setEventListeners(formElement, settings);
//   });
// };

// // есть ли ошибка в форме? Проверяем весь массив
// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// // если поля невалидные, то кнопка (сохр, созд) блокируется
// const toggleButtonState = (inputElement, buttonElement, settings) => {
//   if (!hasInvalidInput(inputElement)) {
//     buttonElement.classList.add(settings.popupButtonValid);
//     buttonElement.classList.remove(settings.popupButtonInValid);
//     buttonElement.removeAttribute("disabled");
//   } else {
//     buttonElement.classList.add(settings.popupButtonInValid);
//     buttonElement.classList.remove(settings.popupButtonValid);
//     buttonElement.setAttribute("disabled", true);
//   }
// };

// enableFullValidation(settings);

//* если что, добавить этот код между removeErrors() и   enableValidation()

// enableSubmitButton() {
//   // исправляет баг, когда при открытии попапа форма валидна, а кнопка неактивна
//   this._buttonElement.classList.remove(this._inactiveButtonClass);
//   this._buttonElement.disbaled = false;
// }

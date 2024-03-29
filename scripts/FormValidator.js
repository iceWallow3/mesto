//! Валидация ООП

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
    const inputList = this._inputList;
    if (!this._hasInvalidInput(inputList)) {
      this.includeButtonSubmit();
    } else {
      this.disableButtonSubmit();
    }
  }
  // рабочая кнопка
  includeButtonSubmit() {
    this._buttonElement.disabled = false;
    this._buttonElement.classList.remove(this._popupButtonInValid);
  }
  // не рабочая кнопка
  disableButtonSubmit() {
    this._buttonElement.classList.add(this._popupButtonInValid);
    this._buttonElement.setAttribute("disabled", true);
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
    this._toggleButtonState();
  }

  // запускаем валидацю
  enableValidation() {
    this._setEventListeners();
  }
  // enableFullValidation(settings);
}

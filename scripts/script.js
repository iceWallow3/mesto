const editButton = document.querySelector('.profile__editButton')
const popup = document.querySelector('.popup')
const closePopupButton = document.querySelector('.popup__close')

const titleElement = document.querySelector('.profile-info__title')
const nameFieldElement = document.querySelector('.popup__input_name')

 const subtitleElement = document.querySelector('.profile-info__subtitle')
 const surnameFieldElement = document.querySelector('.popup__input_surname')

 const formElement = document.querySelector('.popup__form')

//  console.log(closePopupButton)

function openPopup(popupElement) {
  popupElement.classList.add('popup__opened')
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup__opened')
}

editButton.addEventListener('click', function() {
   // console.log(popup.classList)
   // popup.classList.add('popup__opened')
    nameFieldElement.value = titleElement.textContent
    surnameFieldElement.value = subtitleElement.textContent
    openPopup(popup)
})
closePopupButton.addEventListener('click', function(){
   // popup.classList.remove('popup__opened')
   closePopup(popup)

})

formElement.addEventListener('submit', function(Event){
    // console.log(Event)
  //  debugger;
    Event.preventDefault()
    closePopup(popup)
    titleElement.textContent = nameFieldElement.value;
    subtitleElement.textContent =  surnameFieldElement.value;
})
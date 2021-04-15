export const ulPhotoGridList = document.querySelector(".photo-grid__list");
export const cardTemplate = document.querySelector(".fotocards").content;
//Попапы
export const profilePopupReal = document.querySelector(".popup_profilePopup");
export const popupNewplace = document.querySelector(".popup_newplace");
export const popupImageZoom = document.querySelector(".popup_image-zoom");
export const popupAvatar = document.querySelector(".popup_avatar");
export const popupCardDelConfirm = document.querySelector(".popup_delConfirm");
//Кнопки
export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__addbutton");
export const avatarEditButton = document.querySelector(
  ".profile__avatar-edit-button"
);
//Форма профиля
export const profileForm = document.querySelector(".popup__form_profile");
export const inputName = document.querySelector(".popup__input_name_name");
export const inputDiscription = document.querySelector(
  ".popup__input_name_discription"
);
//Формы
export const formNewplace = popupNewplace.querySelector(
  ".popup__form_newplace"
);
export const avatarForm = popupAvatar.querySelector(".popup__form_avatar");

export const profileInfo = {
  profileName: document.querySelector(".profile__name"),
  discription: document.querySelector(".profile__discription"),
};
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inputInvalidClass: "popup__input_state_invalid",
  buttonInvalidClass: "popup__save-button_invalid",
};

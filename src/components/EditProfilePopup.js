import PopupWithForm from "./PopupWithForm.js";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  // Подписка на контекст
  const curentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(`${curentUser.name}`);
  const [description, setDescription] = React.useState(`${curentUser.about}`);

  function handleSetName(e) {
    setName(e.target.value);
  }

  function handleSetDescription(e) {
    setDescription(e.target.value);
  }
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(curentUser.name);
    setDescription(curentUser.about);
  }, [curentUser]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      forSubmit="Сохранить"
    >
      <input
        value={name}
        onChange={handleSetName}
        id="user_name"
        type="text"
        className="popup__input popup__input_name_name"
        name="name"
        minLength="2"
        maxLength="30"
        required=""
        placeholder="Имя"
      />
      <span id="user_name-error" className="error"></span>
      <input
        value={description}
        onChange={handleSetDescription}
        id="about"
        type="text"
        className="popup__input popup__input_name_discription"
        name="discription"
        required=""
        minLength="2"
        maxLength="60"
        placeholder="О себе"
      />
      <span id="about-error" className="error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

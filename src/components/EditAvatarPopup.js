import PopupWithForm from "./PopupWithForm.js";
import React from "react";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    // ПОПАП АВАТАР
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      title="Обновить аватар"
      forSubmit="Сохранить"
    >
      <input
        ref={avatarRef}
        id="link-avatar"
        required=""
        type="url"
        className="popup__input popup__input_name_url"
        name="link"
        placeholder="Ссылка на аватар"
      />
      <span id="link-avatar-error" className="error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

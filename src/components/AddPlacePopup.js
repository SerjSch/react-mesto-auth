import PopupWithForm from "./PopupWithForm.js";
import React from "react";

function AddPlacePopup(props) {
  const [place, setPlace] = React.useState("");
  const [link, setLink] = React.useState("");

  function handlePlaceChange(e) {
    setPlace(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddCard({
      place: place,
      link: link,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      title="Новое место"
      forSubmit="Создать"
    >
      <input
        value={place}
        onChange={handlePlaceChange}
        id="name-card"
        type="text"
        minLength="3"
        maxLength="30"
        required=""
        className="popup__input popup__input_name_place"
        name="name"
        placeholder="Название"
        noValidate=""
      />
      <span id="name-card-error" className="error"></span>
      <input
        value={link}
        onChange={handleLinkChange}
        id="link"
        required=""
        type="url"
        className="popup__input popup__input_name_url"
        name="link"
        placeholder="Ссылка на картинку"
      />
      <span id="link-error" className="error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

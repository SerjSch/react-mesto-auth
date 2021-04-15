import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `photo-grid__trash-bin ${
    isOwn ? "" : "photo-grid__trash-bin_hidden"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `photo-grid__heart ${
    isLiked ? "photo-grid__heart_liked" : ""
  }`;

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onDeleteCard(props.card);
  }

  return (
    <li className="photo-grid__item-fotocard">
      <img
        className="photo-grid__item"
        src={props.card.link}
        alt={props.card.text}
        onClick={() => {
          props.onCardClick(props.card);
        }}
      />
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
      <div className="photo-grid__foto-discription">
        <h2 className="photo-grid__place-name">{props.card.name}</h2>
        <div className="photo-grid__likes-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="photo-grid__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;

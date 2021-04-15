import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Header from "./Header.js";

function Main(props) {
  const curentUser = React.useContext(CurrentUserContext);
  return (
    <>
      <Header link={"sign-in"} text={"Выход"} onClick={props.onLogout} />
      <main className="content">
        <section className="profile">
          <div className="profile__card">
            <div
              className="profile__avatar-foto"
              style={{ backgroundImage: `url(${curentUser.avatar})` }}
            >
              <button
                className="profile__avatar-edit-button"
                type="button"
                onClick={props.onEditAvatar}
              ></button>
            </div>
            <div className="profile__info">
              <div className="profile__title">
                <h1 className="profile__name"> {curentUser.name} </h1>
                <button
                  type="button"
                  className="profile__edit-button"
                  onClick={props.onEditProfile}
                ></button>
              </div>
              <p className="profile__discription"> {curentUser.about} </p>
            </div>
          </div>
          <button
            type="button"
            className="profile__addbutton"
            onClick={props.onAddPlace}
          ></button>
        </section>
        <section className="photo-grid">
          <ul className="photo-grid__list">
            {props.cards.map((card) => (
              <Card
                card={card}
                key={card._id}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onDeleteCard={props.onDeleteCard}
              />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
export default Main;

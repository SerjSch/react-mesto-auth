import React from "react";
import { Redirect, Switch, Route, useHistory } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import Api from "../utils/api.js";
import * as auth from "../utils/auth.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ProtectedRoute from "./ProtectedRoute.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";

function App() {
  ////////////// КОНСТАНТЫ //////////////////////////////////////////////////////
  const history = useHistory();
  const [delCard, setDelCard] = React.useState(null);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(true);
  const [isInfoToolOpen, setIsInfoToolOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setUserData] = React.useState({
    name: "",
    about: "",
    avatar: "",
  });

  ////////// ЮЗЭФЕКТЫ /////////////////////////////////////////////////////////////////

  function getInitialData(email) {
    setLoggedIn(true);
    return Promise.all([Api.getInitialCards(), Api.getUserData()])
      .then(([initialCards, userData]) => {
        setUserData({ ...userData, email });
        setCards(initialCards);
      })
      .catch((err) => {
        console.log("Ошибка в getInitialData", err);
      });
  }

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      auth
        .tokenValid(token)
        .then((res) => {
          if (res) {
            getInitialData(res.data.email);
          } else {
            setLoggedIn(false);
          }
        })
        .catch((err) => {
          console.log("Ошибка валидации токена", err);
        });
    }
  }, []);

  // React.useEffect(() => {
  //   Api.getUserData()
  //     .then((res) => {
  //       setUserData(res);
  //     })
  //     .catch((err) => {
  //       console.log("Ошибка в получении данных пользователя: ", err);
  //     });
  // }, []);
  // React.useEffect(() => {
  //   Api.getInitialCards()
  //     .then((res) => {
  //       setCards(res);
  //     })
  //     .catch((err) => {
  //       console.log("Ошибка в получении карточек", err);
  //     });
  // }, []);

  /////////////////////////////////////////////////////////////////////////////
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    Api.likeTheCard(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }
  function handleUpdateUser(userData) {
    Api.sendUserInfo(userData)
      .then((res) => {
        setUserData(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка при обновление данных пользователя", err);
      });
  }
  function handleUpdateAvatar(userData) {
    Api.sendUserAvatar(userData)
      .then((res) => {
        setUserData(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка в обновлении аватара", err);
      });
  }
  function handleAddPlaceSubmit(userCardData) {
    Api.sendNewCard(userCardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка в отправке фотокарточки на сервер", err);
      });
  }
  function handleCardDelete(card) {
    setDelCard(card);
    Api.delCardFromServer(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoToolOpen(false);
  }

  /////////////// - РЕГИСТРАЦИЯ - ВХОД - ВЫХОД - //////////////////
  function handleRegister(registerData) {
    auth
      .signup(registerData)
      .then((res) => {
        if (res !== null) {
          setIsRegisterSuccess(true);
          setIsInfoToolOpen(true);
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        console.log("Ошибка в handleRegister", err);
        setIsRegisterSuccess(false);
        setIsInfoToolOpen(true);
      });
  }
  function handleLogin(loginData) {
    auth
      .signin(loginData)
      .then((res) => {
        if (res !== null) {
          getInitialData(loginData.email).catch((err) => {
            console.log("Ошибка получения почты при логине", err);
          });
        }
      })
      .catch((err) => {
        console.log("Ошибка логина", err);
        setIsRegisterSuccess(false);
        setIsInfoToolOpen(true);
      });
  }
  function handleLogout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUserData({ name: "", about: "", avatar: "", email: "" });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Switch>
            <Route path={"/sign-up"}>
              {loggedIn ? (
                <Redirect to="./" />
              ) : (
                <>
                  <Header link={"sign-in"} text={"Войти"} />
                  <Register handleRegister={handleRegister} />
                </>
              )}
            </Route>

            <Route path={"/sign-in"}>
              {loggedIn ? (
                <Redirect to="./" />
              ) : (
                <>
                  <Header link={"sign-up"} text={"Регистрация"} />
                  <Login handleLogin={handleLogin} />
                </>
              )}
            </Route>
            <ProtectedRoute
              component={Main}
              path={"/"}
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onDeleteCard={handleCardDelete}
              onLogout={handleLogout}
              isLoggedIn={loggedIn}
            >
              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                currentUser={currentUser}
                onUpdateUser={handleUpdateUser}
              />
              <EditAvatarPopup
                onUpdateAvatar={handleUpdateAvatar}
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
              />
              <ImagePopup
                isOpen={isImagePopupOpen}
                card={selectedCard}
                onClose={closeAllPopups}
              />
              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddCard={handleAddPlaceSubmit}
              />
            </ProtectedRoute>
          </Switch>
          <InfoTooltip
            isSuccess={isRegisterSuccess}
            isOpen={isInfoToolOpen}
            onClose={closeAllPopups}
          />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;

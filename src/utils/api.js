export class Api {
  constructor(settings) {
    this._baseUrl = settings.baseUrl;
    this._headers = settings.headers;
  }

  /////Получаем данные пользователя с сервера////////////////
  getUserData() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers,
    }).then(this._getResponseData);
  }

  /////Получаем карточки с сервера//////////////////////////////
  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers,
    }).then(this._getResponseData);
  }

  /////Отправляем измененные данные пользователя на сервер////////////////
  sendUserInfo(userData) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    }).then(this._getResponseData);
  }

  /////Отправляем аватар на сервер////////////////
  sendUserAvatar(picture) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: picture.avatar,
      }),
    }).then(this._getResponseData);
  }

  /////////////Отправляем новую фотокарточку///////////////
  sendNewCard(values) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: values.place,
        link: values.link,
      }),
    }).then(this._getResponseData);
  }

  /////////////Поставим Лайк///////////////
  likeTheCard(cardId) {
    return fetch(this._baseUrl + `/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  /////////////Удалим Лайк///////////////
  // delCardsLike(cardId) {
  //     return fetch(this._baseUrl + `/cards/likes/${cardId}`, {
  //             method: 'DELETE',
  //             headers: this._headers
  //         })
  //         .then(this._getResponseData(res));
  // }

  /////////////Удалим Фотокарточку///////////////
  delCardFromServer(cardId) {
    return fetch(this._baseUrl + `/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка, что-то пошло не так: ${res.status}`);
    }
    return res.json();
  }
}

//////////////////////////////////
export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-19",
  headers: {
    authorization: "35a14b0b-ee14-4289-9936-131b6a5ac6f5",
    "Content-Type": "application/json",
  },
});
export default api;
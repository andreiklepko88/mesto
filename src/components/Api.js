class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    _checkServerAnswer(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    };

    getUserData() {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "GET",
        headers: this._headers,
      })
      .then(this._checkServerAnswer);
      }
    

    getCards() {
      return fetch(`${this._baseUrl}/cards`, {
        method: "GET",
        headers: this._headers
      })
      .then(this._checkServerAnswer);
      };
    

    addCard({ name, link }) {
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({name, link})
      })
      .then(this._checkServerAnswer);
    };

    changeAvatar({ link }) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify ({
          avatar: link
        })
      })
      .then(this._checkServerAnswer);
    };

    addLike(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers,
      })
      .then(this._checkServerAnswer);
    };

    removeLike(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(this._checkServerAnswer);
    };

    editProfile({ name, job }) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({ name: name, about: job })
      })
      .then(this._checkServerAnswer);
    };

    deleteCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(this._checkServerAnswer);
    }
}

export const api = new Api ({
      baseUrl: `https://mesto.nomoreparties.co/v1/cohort-63`,
      headers: {
        authorization: "814609e7-5da5-42af-82d7-cad74745ca16",
        "Content-Type": "application/json"
      }
    })

export class Api {
  constructor({baseUrl, token}) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  _getHeaders(){
    return {
        authorization: this._token,
        'content-type': 'application/json',
    }
  }
  
  getHeroData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._getHeaders()
    })
    .then(this._getJsonOrError)
  }

  getnItialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._getHeaders()
    })
    .then(this._getJsonOrError)
  }

  _getJsonOrError(res){
    if (res.ok){
        return res.json();
    }
    return Promise.reject({status: res.status})
  }

  setUserInfoServer (title, job){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: title,
        about: job
      })
    })
    .then(this._getJsonOrError)
  }

  setUserAvatarServer(avatarLink){
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: avatarLink,
      })
    })
    .then(this._getJsonOrError)
  }


  sendCard(newCard) {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._getHeaders(),
        body: JSON.stringify({
          name: newCard.name,
          link: newCard.link
        })
      })
      .then(this._getJsonOrError)
  }


  removeCard(id){
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders()
      })
    .then(this._getJsonOrError)
  }

  sendLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._getHeaders()
      })
    .then(this._getJsonOrError)
  }

  delLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders()
      })
    .then(this._getJsonOrError)
  }
}


  




  





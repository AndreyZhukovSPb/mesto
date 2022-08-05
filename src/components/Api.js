export class Api {
  constructor({baseUrl, authorization, contentType}) {
    this._baseUrl = baseUrl;
    this._authorization = authorization;
    // this._contentType = contentType; // писать в явном виде в методах
  }

  // 'application/json'
  
  getHeroData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._getJsonOrError)
    .catch((err) => {
      return Promise.reject(err);
    }); 
  }

  getnItialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._getJsonOrError)
    .catch((err) => {
      return Promise.reject(err);
    }); 
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
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: title,
        about: job
      })
    })
    .then(this._getJsonOrError)
    .catch((err) => {
      return Promise.reject(err);
    }); 
  }

  setUserAvatarServer(avatarLink){
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarLink,
      })
    })
    .then(this._getJsonOrError)
    .catch((err) => {
      return Promise.reject(err);
    }); 
  }


  sendCard(newCard) {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: {
          authorization: this._authorization,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newCard.name,
          link: newCard.link
        })
      })
      .then(this._getJsonOrError)
      .catch((err) => {
        return Promise.reject(err);
      }); 
  }


  removeCard(id){
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        }
      })
    .then(this._getJsonOrError)
  }

  sendLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
        }
      })
    .then(this._getJsonOrError)
    .catch((err) => {
      return Promise.reject(err);
    }); 
  }

  delLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        }
      })
    .then(this._getJsonOrError)
    
  }
}


  




  





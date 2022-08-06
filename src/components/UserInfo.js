export class UserInfo {
  constructor({profileNameSelector, profileJobSelector, profileAvatarSelector}) {
    this._name = document.querySelector(profileNameSelector);
    this._job = document.querySelector(profileJobSelector);
    this._avatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    this._profileInfo = new Object();
    this._profileInfo.name = this._name.textContent;
    this._profileInfo.link = this._job.textContent;
    return(this._profileInfo);
  }

  setUserInfo({title, job}) {
    this._name.textContent = title;
    this._job.textContent = job;
    // this._id = id;
    // console.log(this._id);
  }

  setUserAvatar(link) {
    this._avatar.src = link;
  }  
  
}
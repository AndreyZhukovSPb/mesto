export class UserInfo {
  constructor({profileNameSelector, profileJobSelector}) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileJob = document.querySelector(profileJobSelector);
  }

  getUserInfo() {
    this._profileInfo = new Object();
    this._profileInfo.name = this._profileName.textContent;
    this._profileInfo.link = this._profileJob.textContent;
    return(this._profileInfo);
  }

  setUserInfo({name, job}) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
  }
}
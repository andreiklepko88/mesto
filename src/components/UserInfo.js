export default class UserInfo {
  constructor(userInfo) {
    this._userName = document.querySelector(userInfo.name);
    this._userJob = document.querySelector(userInfo.job);
    this._avatar = document.querySelector(userInfo.avatar);
  };

  getInfo() {
    return  {
      name: this._userName.textContent,
      job: this._userJob.textContent,
    }
    
  };

  setInfo(data) { 
    this._userName.textContent = data.name;
    this._userJob.textContent = data.about;
    this._avatar.src = data.avatar
  };
}

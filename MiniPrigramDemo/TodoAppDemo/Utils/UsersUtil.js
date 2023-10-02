/*
 * @FilePath: \TodoAppDemo\Utils\UsersUtil.js
 * @Description: 用户登录帮助 
 * @Author: SurpassIllusion
 * @Date: 2023-09-20 21:34:11
 * @LastEditors: SurpassIllusion 
 */
class UserInfoUtil{
  static _instance;
  static get instance (){
    if(!this._instance){
      this._instance = new UserInfoUtil();
    }
    return this._instance;
  } 
  getUserInfo() {
    return new Promise((resolve, reject) => {
      if (this.UserInfo)
        // Data exists
        resolve(this.UserInfo);
      my.getAuthCode(
        {
          scopes: "auth_user",
          success: ret => {
            console.info("getAuthCode Success Information:", ret);
            my.getAuthUserInfo({
              success: res => {
                this.UserInfo = res;
                resolve(this.UserInfo);
              },
              fail: err => {
                console.log("my.getAuthUserInfo error information:", err);
                reject();
              }
            });
          },
          fail: err => {
            console.log("my.getAuthCode error information:", err);
            reject();
          }
        }
      )

    })
  }
}
module.exports = {
  UserInfoUtil: UserInfoUtil
}
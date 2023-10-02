/*
 * @FilePath: \TodoAppDemo\app.js
 * @Description:  
 * @Author: SurpassIllusion
 * @Date: 2023-09-22 22:11:14
 * @LastEditors: SurpassIllusion 
 */

import { UserInfoUtil } from "/Utils/UsersUtil"
App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
  getUserInfo(options){
    return UserInfoUtil.instance.getUserInfo();
  }
});

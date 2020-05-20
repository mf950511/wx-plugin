/*
 * @Author: your name
 * @Date: 2020-04-02 11:27:39
 * @LastEditTime: 2020-05-20 16:34:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \WXPlugin\plugin\lib\untils.js
 */
function getStorage(key) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: key,
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        resolve('')
      },
    });
  })
}

function setStorage(key, value) {
  return new Promise((resolve, reject) => {
    wx.setStorage({
      key: key,
      data: value,
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        resolve('')
      }
    });
  })
}

module.exports = {
  getStorage,
  setStorage
}

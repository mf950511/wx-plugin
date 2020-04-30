/*
 * @Author: your name
 * @Date: 2020-01-16 13:44:14
 * @LastEditTime: 2020-04-10 16:42:14
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \WXPlugin\plugin\api\data.js
 */
var data = 'init data'

function getData() {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'test',
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      },
    });
  })
}

function setData(value) {
  data = value
}

module.exports = {
  getData: getData,
  setData: setData
}
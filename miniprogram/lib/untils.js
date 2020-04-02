/*
 * @Author: your name
 * @Date: 2020-04-01 11:23:55
 * @LastEditTime: 2020-04-01 11:32:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \WXPlugin\miniprogram\lib\untils.js
 */

function getSetting() {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: function (res) {
        console.log('getSetting------------------', res)
        console.log('')
        resolve(res.authSetting)
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}

function isUndefined(value) {
  return typeof value === 'undefined'
}

function getAuth(desc = {}) {
  return new Promise((resolve, reject) => {
    getSetting().then(settingInfo => {
      const res = settingInfo[`scope.${desc.type}`];
      // return
      if (res) {
        resolve(true)
      } else if(isUndefined(res)) {
        wx.authorize({
          scope: `scope.${desc.type}`,
          success () {
            resolve(true)
          }
        })
      } else {
        wx.showModal({
          title: `是否授权获取${ desc.text }权限`,
          content: desc.desc,
          success(tip){
            if(tip.confirm) {
              wx.openSetting({
                success (res) {
                  console.log(res.authSetting)
                }
              })
            }
            reject(false)
          }
        })
      }
    });
  })
 
}

module.exports = {
  getAuth
}


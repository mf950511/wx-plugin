/*
 * @Author: your name
 * @Date: 2020-04-01 11:06:22
 * @LastEditTime: 2020-04-02 13:58:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \WXPlugin\miniprogram\pages\test-image\test-image.js
 */
Page({
  data: {
    uploadObject: {
      url: "https://test-yhb-node.xwfintech.com/api/v1/serveInside/help_feedback",
      name: "images",
      formData: {
        id: 123
      }
    }
  },
  back: function(){
    wx.showToast({
      title: '成功',
      content: '组件正常',
      duration: 1500,
      complete: function(){
        wx.navigateBack()
      }
    })
    
  },
  getSetting() {
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
  },
  methods: {
    getSetting() {
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
    },
    
  },
  uploadFail: function(err){
    console.log(123, err)
    wx.showModal({
      content: "图片上传失败"
    })
  },
  uploadImage: function(list){
    const length = list.detail && list.detail.length
    console.log(list.detail.length, list.detail)
    wx.showToast({
      title: `上传${ length }张图片`,
      duration: 1500,
      complete: () => {
        // setTimeout(() => {
        //   wx.navigateBack()
        // }, 1500)
      }
    })
  },
  onMyEvent: function(event){
    console.log(123, event)
  }
})
/*
 * @Author: your name
 * @Date: 2020-04-01 11:06:22
 * @LastEditTime: 2020-04-10 16:43:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \WXPlugin\miniprogram\pages\test-image\test-image.js
 */
var plugin = requirePlugin("myPlugin")
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
  methods: {
  },
  uploadVideo: function(list){
    plugin.getData().then(res => {
      console.log(333,res)
    }, err => {
      console.log(444, err)
    })
    const length = list.detail && list.detail.length
    console.log(list.detail.length, list.detail)
    wx.showToast({
      title: `上传${ length }个视频`,
      duration: 1500,
      complete: () => {
      }
    })
  },
  uploadFail: function(err){
    console.log(123, err)
    wx.showModal({
      content: "图片上传失败"
    })
  }
})
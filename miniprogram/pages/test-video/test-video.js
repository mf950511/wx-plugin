/*
 * @Author: your name
 * @Date: 2020-04-01 11:06:22
 * @LastEditTime: 2020-04-02 14:03:11
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
  methods: {
  },
  uploadVideo: function(list){
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
/*
 * @Author: your name
 * @Date: 2020-01-16 13:44:14
 * @LastEditTime: 2020-05-20 16:34:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \WXPlugin\miniprogram\pages\index\index.js
 */
var plugin = requirePlugin("myPlugin")
var untils = require('../../lib/untils')
Page({
  data: {
  },
  onLoad: function() {
    const configData = [
      {
        name: '资料一',
        status: '已完成',
        config: [
          {
            title: '资料标题+证明形式',
            type: 'image',
            dataArray: [
              {
                url: '',
                iconDesc: '保险受益人页'
              },
              {
                url: '',
                iconDesc: '保险理赔页'
              },
              {
                url: '',
                iconDesc: '自定义页'
              }
            ]
          },
          {
            title: '视频资料',
            type: 'video',
            dataArray: [
              {
                url: '',
                iconDesc: '保险受益视频'
              },
              {
                url: '',
                iconDesc: '保险理赔视频'
              }
            ]
          }
        ]
      },
      {
        name: '资料二',
        status: '未完成',
        config: [
          {
            title: '证明形式',
            type: 'image',
            dataArray: [
              {
                url: '',
                iconDesc: '受益人页'
              },
              {
                url: '',
                iconDesc: '理赔页'
              },
              {
                url: '',
                iconDesc: '自定义页'
              }
            ]
          },
          {
            title: '视频资料',
            type: 'video',
            dataArray: [
              {
                url: '',
                iconDesc: '受益视频'
              },
              {
                url: '',
                iconDesc: '理赔视频'
              }
            ]
          }
        ]
      }
    ]
    plugin.getData().then(res => {
      console.log(66666, res)
    }, err => {
      console.log(77777, err)
    })
    plugin.setData(configData).then(res => {
      console.log(123213, res)
    })
    
    console.log(untils)
  },
  getAuth: function(){
    console.log(234)
    let record = untils.getAuth({
      type: 'record',
      desc: '是否获取录音权限，否则无法正常进行',
      text: '录音'
    })
    let camera = untils.getAuth({
      type: 'camera',
      desc: '是否获取摄像头权限，否则无法正常进行',
      text: '摄像头'
    })
    Promise.all([record, camera]).then(res => {
      console.log('可以开始录像了')
    },err => {
      console.log('授权拒绝')
    })
    
  },
  liveness: function(){
    wx.navigateTo({
      url: 'plugin://myPlugin/fill-info'
    })
  },
  testPlugin: function(){
    wx.navigateTo({
      url: '/pages/test-plugin/test-plugin'
    })
  },
  testImage: function(){
    wx.navigateTo({
      url: '/pages/test-image/test-image'
    })
  },
  testVideo: function(){
    wx.navigateTo({
      url: '/pages/test-video/test-video'
    })
  }
})
/*
 * @Author: your name
 * @Date: 2020-01-16 13:44:14
 * @LastEditTime: 2020-04-02 13:43:36
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
    plugin.getData()
    
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
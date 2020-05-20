/*
 * @Author: your name
 * @Date: 2020-04-07 10:03:07
 * @LastEditTime: 2020-05-20 16:35:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \WXPlugin\plugin\pages\upload-information\upload-information.js
 */
const api = require('../../api/data')
const untils = require('../../lib/untils')
Page({
  data: {
    testArray: [],
    testArray2: [],
    uploadImageObject: {
      url: "https://test-yhb-node.xwfintech.com/api/v1/serveInside/help_feedback",
      name: "images",
      formData: {
        id: 123
      }
    },
    uploadVideoObject: {
      url: "https://test-yhb-node.xwfintech.com/api/v1/serveInside/help_feedback1",
      name: "video",
      formData: {
        id: 123
      },
      header: {}
    },
    videoConfig: {
      sourceType: ['camera', 'album'],
      maxDuration: 30,
      camera: 'back',
      compressed: true,
    },
    configData: [],
    activeConfig: [],
    activeIndex: 0,
  },
  onLoad: function(){
    api.getData().then(res => {
      console.log('获取数据', res)
      if(!res) return
      res = res.data
      this.setData({
        configData: res,
        activeConfig: res[this.data.activeIndex].config
      }, () => {
        
        console.log(123, res[this.data.activeIndex].config)
      })
    }, err => {
      console.log('出错了', err)
    })
  },
  onShow: function(){
    wx.getStorage({
      key: 'videoData',
      success: (videoData) => {
        const { data }  = videoData
        const { videoSrc = '', imageSrc = '', configIndex = -1, urlindex = -1} = data || {}
        console.log(44444, videoSrc, imageSrc, configIndex, urlindex, this.activieVideoConfigindex, this.activieVideoUrlindex)
        if((+configIndex) === this.activieVideoConfigindex && (+urlindex) === this.activieVideoUrlindex) {
          const cloneObj = this.data.activeConfig[configIndex] || {}
          cloneObj.dataArray[urlindex] = {
            ...cloneObj.dataArray[urlindex],
            url: imageSrc,
            videoSrc,
            showDelete: true
          }

          this.setData({
            activeConfig: this.data.activeConfig,
          }, () => {
            console.log(this.data.activeConfig)
            this.activieVideoUrlindex = this.activieVideoConfigindex = -1
          })
        }
      }
    })
  },
  uploadAll(){
    try {
      console.log(123123, this.data.configData)
      wx.setStorageSync('test', this.data.configData)
      wx.navigateBack();
    } catch (e) { 
      console.log('出错了', e)
    }
  },
  changeConfig(e){
    const data = e.currentTarget.dataset || {}
    const { index = 0 } = data
    console.log(index)
    this.setData({
      activeIndex: index,
      activeConfig: this.data.configData[index].config
    })
  },
  uploadVideo(e){
    const data = e.currentTarget.dataset || {}
    const { configindex = 0, urlindex = 0 } = data
    this.activieVideoConfigindex = configindex
    this.activieVideoUrlindex = urlindex
    wx.navigateTo({
      url: `plugin-private://wx29eaa708fc6bf3a4/pages/video/video?configIndex=${ configindex }&urlindex=${ urlindex }`
    })
  },
  deleteSingle(e){
    const data = e.currentTarget.dataset || {}
    const { configindex = 0, urlindex = 0 } = data
    const cloneObj = this.data.activeConfig[configindex] || {}
    cloneObj.dataArray[urlindex] = {
      ...cloneObj.dataArray[urlindex],
      url: '',
      showDelete: false
    }
    this.setData({
      activeConfig: this.data.activeConfig
    }, () => {
      console.log(this.data.activeConfig)
    })
  },
  uploadImage(e){
    const data = e.currentTarget.dataset || {}
    const { configindex = 0, urlindex = 0 } = data
    const url = e.detail || {}
    const cloneObj = this.data.activeConfig[configindex] || {}
    cloneObj.dataArray[urlindex] = {
      ...cloneObj.dataArray[urlindex],
      url,
      showDelete: true
    }

    this.setData({
      activeConfig: this.data.activeConfig
    }, () => {
      console.log(this.data.activeConfig)
    })
  },
  methods: {
    
  }
})
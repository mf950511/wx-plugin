/*
 * @Author: your name
 * @Date: 2020-04-07 10:03:07
 * @LastEditTime: 2020-05-13 15:32:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \WXPlugin\plugin\pages\upload-information\upload-information.js
 */
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
    configData: [
      {
        name: '资料一',
        status: '未完成',
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
    ],
    activeConfig: [],
    activeIndex: 0,
  },
  onLoad: function(){
    console.log(123, this.data.configData[this.data.activeIndex].config)
    this.setData({
      activeConfig: this.data.configData[this.data.activeIndex].config
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
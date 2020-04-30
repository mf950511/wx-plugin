/*
 * @Author: your name
 * @Date: 2020-04-07 10:03:07
 * @LastEditTime: 2020-04-30 17:15:57
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
    showVideo: false,
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
  videoSuccess(e){
    console.log(e)
    const videoInfo = e.detail || {}
    const { videoSrc = '', imageSrc = '' } = videoInfo
    const configindex = this.activieVideoConfigindex || 0
    const urlindex = this.activieVideoUrlindex || 0

    const cloneObj = this.data.activeConfig[configindex] || {}
    cloneObj.dataArray[urlindex] = {
      ...cloneObj.dataArray[urlindex],
      url: imageSrc,
      videoSrc,
      showDelete: true
    }

    this.setData({
      activeConfig: this.data.activeConfig,
      showVideo: false
    }, () => {
      console.log(this.data.activeConfig)
    })

  },
  uploadVideo(e){
    const data = e.currentTarget.dataset || {}
    const { configindex = 0, urlindex = 0 } = data
    this.activieVideoConfigindex = configindex
    this.activieVideoUrlindex = urlindex
    this.setData({
      showVideo: true
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
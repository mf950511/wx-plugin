/*
 * @Author: your name
 * @Date: 2020-04-02 11:34:18
 * @LastEditTime: 2020-04-02 14:03:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \WXPlugin\plugin\components\upload-video\upload-video.js
 */

import regeneratorRuntime from '../../lib/runtime'
Component({
  options: {
    multipleSlots: true, // 启用多slot支持
  },
  attached: function(){
  },
  data: {
    uploadImgUrl: 'https://test-yhb-node.xwfintech.com/static/imgs/help-center/fill.png',
    cWidth:'',
    cHeight:'',
    activeVideo: ''
  },
  properties: {
    uploadImageObj: {
      type: Object,
      value: {}
    },
    videoPath: {
      type: Array,
      value: []
    },
    chooseVideoConfig: {
      type: Object,
      value: {
        sourceType: ['album','camera'],
        maxDuration: 60,
        camera: 'back',
        compressed: true,
      }
    }
  },
  methods: {
    play(e){
      const data = e.currentTarget.dataset || {}
      const { video: item } = data
      this.setData({
        activeVideo: item
      })
      const video = wx.createVideoContext(`video`, this)
      video.play()
      video.showStatusBar()
      video.requestFullScreen()
    },
    uploadVideo(){
      wx.chooseVideo({
        ...this.data.chooseVideoConfig,
        success: (res)=> {
          console.log(res.tempFilePath)
          const obj = {
            url: res.tempFilePath,
            showDelete: true
          }
          const arr1 = [...this.data.videoPath, obj]
          this.setData({
            videoPath: arr1
          })
          this.triggerEvent('upload-video', this.data.videoPath)
        },
        err: (err) => {
          this.triggerEvent('upload-fail', err)
        }
      })
    },
    deleteVideo(e) {
      console.log(e)
      const data = e.currentTarget.dataset || {}
      const { video: index } = data
      console.log(index, data)
      this.data.videoPath.splice(index, 1)
      const arr1 = this.data.videoPath.slice()
      this.setData({
        videoPath: arr1
      })
    }
  }
})
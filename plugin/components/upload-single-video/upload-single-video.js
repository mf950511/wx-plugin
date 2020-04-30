/*
 * @Author: your name
 * @Date: 2020-04-02 11:34:18
 * @LastEditTime: 2020-04-30 16:33:08
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
  },
  properties: {
    iconDesc: {
      type: String,
      value: ''
    },
    chooseVideoConfig: {
      type: Object,
      value: {
        sourceType: ['camera', 'album'],
        maxDuration: 30,
        camera: 'back',
        compressed: true,
      }
    },
    url: {
      type: String,
      value: ''
    },
    urlIndex: {
      type: String,
      value: ''
    },
    showDelete: {
      type: Boolean,
      value: false
    },
    videoSrc: {
      type: String,
      value: ''
    }
  },
  methods: {
    selectContent(){
      this.uploadVideo()
    },
    deleteVideo(e) {
      this.triggerEvent('delete-video')
    },
    endVideo(e){
      this.video.exitFullScreen()
    },
    play(e){
      const data = e.currentTarget.dataset || {}
      const { index } = data
      this.video = wx.createVideoContext(`video-${ index }`, this)
      this.video.play()
      this.video.showStatusBar()
      this.video.requestFullScreen()
    },
    uploadVideo(){
      console.log(234)
      this.triggerEvent('upload-video')
      
    },
  }
})
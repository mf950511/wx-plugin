/*
 * @Author: your name
 * @Date: 2020-04-07 10:03:07
 * @LastEditTime: 2020-04-10 15:20:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \WXPlugin\plugin\pages\upload-information\upload-information.js
 */
Page({
  data: {
    testArray: [1,2,3],
    testArray2: [1],
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
    showVideo: false
  },
  videoSuccess(res){
    console.log(res)
    const videoInfo = res.detail || {}
    const { videoSrc, imageSrc } = videoInfo
    const index = this.videoIndex
    this.data.testArray[index] = {
      url: imageSrc,
      urlIndex: index,
      showDelete: true,
      videoSrc: videoSrc
    }
    console.log(imageSrc, index, this.data.testArray)
    this.setData({
      testArray: this.data.testArray,
      showVideo: false
    })
  },
  uploadVideo(res){
    const indexInfo = res.detail || {}
    const { index } = indexInfo
    this.videoIndex = index
    this.setData({
      showVideo: true
    })
  },
  deleteVideo(res) {
    const indexInfo = res.detail || {}
    const { index } = indexInfo
    const obj = {
      url: '',
      urlIndex: index,
      showDelete: false
    }
    this.data.testArray[index] = obj
    this.setData({
      testArray: this.data.testArray
    })
  },
  deleteImage(res){
    const indexInfo = res.detail || {}
    const { index } = indexInfo
    const obj = {
      url: '',
      urlIndex: index,
      showDelete: false
    }
    this.data.testArray2[index] = obj
    this.setData({
      testArray2: this.data.testArray2
    })
  },
  uploadImage(res){
    const imageInfo = res.detail || {}
    const { index } = imageInfo
    const cloneArr = this.data.testArray2.slice()
    cloneArr[index] = imageInfo
    console.log(imageInfo, cloneArr)
    this.setData({
      testArray2: cloneArr
    })
  },
  methods: {
    
  }
})
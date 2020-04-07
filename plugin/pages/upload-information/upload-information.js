/*
 * @Author: your name
 * @Date: 2020-04-07 10:03:07
 * @LastEditTime: 2020-04-07 15:53:44
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
    }
  },
  uploadImage(res){
    console.log(123,res)
  },
  methods: {
    
  }
})
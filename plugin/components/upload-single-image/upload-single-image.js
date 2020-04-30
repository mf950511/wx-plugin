/*
 * @Author: your name
 * @Date: 2020-04-02 11:34:18
 * @LastEditTime: 2020-04-30 16:53:45
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
  },
  properties: {
    iconDesc: {
      type: String,
      value: ''
    },
    uploadObject: {
      type: Object,
      value: {}
    },
    quality: {
      type: Number,
      value: 0.5
    },
    url: {
      type: String,
      value: ''
    },
    showDelete: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    selectContent(){
      this.addImage()
    },
    chooseImage(args = {}) {
      return new Promise((resolve, reject) => {
        wx.chooseImage({
          count: 1,
          sourceType: [
            'camera'
          ],
          sizeType: ['original'],
          success: function (res) {
            resolve(res)
          },
          fail: function (res) {
            reject(res)
          }
        })
      })
    },
    addImage(args = {}) {
      let that = this
      //贷款用途图片压缩
      this.chooseImage()
        .then(async res => {
          const {tempFilePaths = [],tempFiles = []} = res;
          let {path, size} = tempFiles[0] || {};
          let image = tempFilePaths[0]
          wx.showLoading({
            title: `上传中`,
            mask: true
          });
          that.uploadImageItem(path, image).then(res => {
            that.triggerEvent('upload-image', res)
            wx.hideLoading()
          }).catch( err => {// 捕获异常则停止剩余图片的上传
            console.log(err)
            wx.hideLoading()
            that.triggerEvent('upload-fail', err)
          })
          
        }, error => {
          const {errMsg = ''} = error || {};
          if(errMsg.indexOf('cancel') === -1) {
            wx.showModal({
              content: '获取图片失败，请拍摄5兆以内大小的图片',
              showCancel: false
            });
          }
        });
    },
    // 单张图片上传
    uploadImageItem(path, image){
      // return Promise.resolve(path)
      let that = this
      return new Promise((resolve, reject) => {
        wx.getImageInfo({
          src: path,
          success: function (res) {
            let scale=res.width/res.height//获取原图比例
            //构造画板宽高
            that.setData({
              cWidth: 500,
              cHeight: 500/scale
            })
            setTimeout(()=>{ // 100ms的延时用于canvas初始化
              that.myCanvasImg(image, that.data.cWidth, that.data.cHeight, that.data.quality).then(res=> { // canvas绘图
                that.uploadSingleImage(res.tempFilePath).then(res => { // 上传绘图
                  resolve(res)
                }, err=> {
                  reject(err)
                })
              }, err => {
                reject(err)
              })
            }, 100)
          }
        })
      })
    },
    /**
     * 质量压缩
    */
    myCanvasImg(tempFilePaths, canvasWidth, canvasHeight, quality) {
      return new Promise((resolve, reject) => {
        var that = this; 
        const ctx = wx.createCanvasContext('canvas-1', that);
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(tempFilePaths, 0, 0, canvasWidth, canvasHeight);        
        ctx.draw(false, setTimeout(()=>{
          wx.canvasToTempFilePath({
            canvasId: 'canvas-1',
            fileType: 'jpg',
            quality: +quality,
            success: res => {
              resolve(res)
            }, fail: function (e) {
              reject(e)
            }
          }, that);
        }, 300));
      })
    },
    uploadSingleImage(path) {
      let that = this
      console.log(234, that.data.uploadObject)
      return new Promise((resolve, reject) => {
        wx.uploadFile({
          ...that.data.uploadObject,
          filePath: path,
          success: response => {
            const data = JSON.parse(response.data);
            const { url = '' } = data.data || {}
            console.log(`url: ${ response.data }`)
            wx.hideLoading();
            resolve(url)
          },
          fail: err => {
            reject(err)
          }
        })
      })
    },
    deleteImage(e) {
      console.log(e)
      this.triggerEvent('delete-image')
    },
    previewImage(e){
      console.log(e)
      const data = e.currentTarget.dataset || {}
      const { image: item } = data
      const arr = [item]
      wx.previewImage({
        current: item, // 当前显示图片的http链接
        urls: arr // 需要预览的图片http链接列表
      })
    }
  }
})
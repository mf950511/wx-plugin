
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
    uploadImageObj: {
      type: Object,
      value: {}
    },
    quality: {
      type: Number,
      value: 0.5
    },
    uploadResultList: {
      type: Array,
      value: []
    },
    limitNumber: {
      type: Number,
      value: 4
    }
  },
  methods: {
    chooseImage(args = {}) {
      return new Promise((resolve, reject) => {
        wx.chooseImage({
          count: args.count || 1,
          sourceType: args.sourceType || [
            'album', 'camera'
          ],
          sizeType: args.sizeType || ['compressed'],
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
      let that = this,remainderNumber = +(this.data.limitNumber) - this.data.uploadResultList.length
      
      //贷款用途图片压缩
      this.chooseImage({ sizeType: ['original'], count: remainderNumber })
        .then(async res => {
          const {tempFilePaths = [],tempFiles = []} = res;
          wx.showLoading({
            title: `上传中`,
            mask: true
          });
          for(let i = 0, len = tempFiles.length; i < len; i++) { // 遍历上传图片
            let {path, size} = tempFiles[i] || {};
            let image = tempFilePaths[i]
            wx.showLoading({
              title: `上传中${i+1}/${len}`,
              mask: true
            });
            await that.uploadImageItem(path, image).then(res => {
              let obj = {
                url: res,
                showDelete: true
              }
              const arr = [...that.data.uploadResultList, obj]
              that.setData({
                uploadResultList: arr
              })
            }).catch( err => {// 捕获异常则停止剩余图片的上传
              console.log(err)
              wx.hideLoading()
              i = tempFiles.length
              that.triggerEvent('upload-fail', err)
            })
          }
          that.triggerEvent('upload-image', this.data.uploadResultList)
          wx.hideLoading()
          
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
    uploadLoanPurchase(path) {
      let that = this
      return new Promise((resolve, reject) => {
        wx.uploadFile({
          ...that.data.uploadImageObj,
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
            that.cWidth = 500
            that.cHeight = 500/scale
            that.setData({
              cWidth: 500,
              cHeight: 500/scale
            })
            setTimeout(()=>{ // 100ms的延时用于canvas初始化
              that.myCanvasImg(image, that.cWidth, that.cHeight, that.quality).then(res=> { // canvas绘图
                that.uploadLoanPurchase(res.tempFilePath).then(res => { // 上传绘图
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
    getSetting() {
      return new Promise((resolve, reject) => {
        wx.getSetting({
          success: function (res) {
            console.log('getSetting------------------', res)
            console.log('')
            resolve(res.authSetting)
          },
          fail: function (res) {
            reject(res)
          }
        })
      })
    },
    confirm(){
      this.triggerEvent('upload-image', this.data.uploadResultList)
    },
    deleteImage(e) {
      console.log(e)
      const data = e.currentTarget.dataset || {}
      const { image: index } = data
      console.log(index, data)
      this.data.uploadResultList.splice(index, 1)
      const arr1 = this.data.uploadResultList.slice()
      this.setData({
        uploadResultList: arr1
      })
    },
    previewImage(e){
      console.log(e)
      const data = e.currentTarget.dataset || {}
      const { image: item } = data
      const arr = this.data.uploadResultList.map(item => item.url)
      wx.previewImage({
        current: item, // 当前显示图片的http链接
        urls: arr // 需要预览的图片http链接列表
      })
    },
    inputValue: function(event){
      this.triggerEvent('inputuser', event, { bubbles: true, composed: true })
    }
  }
})
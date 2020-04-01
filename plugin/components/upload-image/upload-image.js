
Component({
  options: {
    multipleSlots: true, // 启用多slot支持
  },
  attached: function(){
    setTimeout(() => {
      let a = wx.createCanvasContext('asdasd');
      console.log(a)
    }, 2000)
  },
  data: {
    // uploadImgUrl: 'https://test-yhb-node.xwfintech.com/static/imgs/help-center/fill.png',
    uploadSuccessList: [],
    uploadResultList: [],
    showUpload: false,
    limitNumber: 10,
    cWidth:'',
    cHeight:'',
    quality: 0.5,
    uploadImagePath: '',
    imagePath: [],
  },
  properties: {
    uploadImageUrl: {
      type: String,
      default: ''
    }
  },
  test(){
    console.log(234)
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
      let that = this,remainderNumber = this.data.limitNumber - this.data.uploadSuccessList.length
      
      //贷款用途图片压缩
      this.chooseImage({ sizeType: ['original'], count: remainderNumber })
        .then(res => {
          const {tempFilePaths = [],tempFiles = []} = res;
          wx.showLoading({
            title: `上传中`,
            mask: true
          });
          let promiseAll = []
          for(let i = 0, len = tempFiles.length; i < len; i++) { // 遍历上传图片
            let {path, size} = tempFiles[i] || {};
            let image = tempFilePaths[i]
            promiseAll.push(that.uploadImageItem(path, image))
          }
          Promise.all(promiseAll).then(res => {
            console.log('全部加载完成', that.data.uploadResultList, that.data.uploadSuccessList)
            wx.hideLoading()
          })
          
        }, error => {
          const {errMsg = ''} = error || {};
          if(errMsg.indexOf('cancel') === -1) {
            untils.showModal({
              content: '获取图片失败，请拍摄5兆以内大小的图片',
              showCancel: false
            });
          }
        });
    },
    uploadLoanPurchase(path) {
      let that = this
      return new Promise((resolve, reject) => {
        let args = {
          url: 'common/loan_purpose_datum',
          filePath: path,
          name: 'images'
        };
        wx.uploadFile({
          url: that.data.uploadImageUrl,
          filePath: args.filePath,
          name: args.name,
          success: response => {
            console.log(response, that.data.uploadSuccessList, path)
            const data = JSON.parse(response.data);
            const { url = '' } = data.data || {}
            const arr = that.data.uploadSuccessList.slice()
            const arr1 = that.data.uploadResultList.slice()
            arr.push(path)
            arr1.push(url)
            console.log(4444, url)
            that.setData({
              uploadSuccessList: arr,
              uploadResultList: arr1
            })
            wx.hideLoading();
            resolve(path)
          },
          fail: err => {
            reject(err)
          }
        })
      })
    },
    // 单张图片上传
    uploadImageItem(path, image){
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
                that.uploadImagePath = res.tempFilePath;
                that.uploadLoanPurchase(that.uploadImagePath).then(res => { // 上传绘图
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
        const ctx = wx.createCanvasContext('asdasd', that);
        console.log(234, ctx)
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        console.log(12321321, tempFilePaths, 0, 0, canvasWidth, canvasHeight)
        ctx.drawImage(tempFilePaths, 0, 0, canvasWidth, canvasHeight);        
        ctx.draw(false, setTimeout(()=>{
          wx.canvasToTempFilePath({
            canvasId: 'asdasd',
            fileType: 'jpg',
            quality: quality,
            success: res => {
              resolve(res)
            }, fail: function (e) {
              wx.showToast({
                title: '图片上传失败，请重新上传！',
                icon: 'none'
              })
              reject(e)
            }
          }, that);
        }, 1000));
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
    uploadFile(){
      console.log(this.uploadFile)
      console.log(this.data.uploadSuccessList)
      this.getSetting().then(settingInfo => {
        console.log('settingInfo-entry', settingInfo);
        const res = settingInfo['scope.camera'];
        // return
        if (res) {
          console.log(1, '授权成功')
          return false;
        } else if(typeof res === 'undefined') {
          wx.authorize({
            scope: 'scope.camera',
            success () {
              console.log(2, '授权成功')
            }
          })
        } else {
          wx.showModal({
            title: '是否授权获取相机权限',
            content: '需要获取您的相机权限，请确认授权，否则拍照功能将无法使用',
            success(tip){
              if(tip.confirm) {
                wx.openSetting({
                  success (res) {
                    console.log(3, res.authSetting)
                  }
                })
              }
            }
          })
        }
      });
      let that = this
      wx.chooseImage({
        count: 1,
        sourceType: [
          'album', 'camera'
        ],
        sizeType: ['compressed'],
        success:  (res)=> {
          let file = res.tempFiles[0].path
          const ctx = wx.createCanvasContext('asdasd');
          console.log(234, ctx)
          ctx.clearRect(0, 0, 500, 500);
          console.log(12321321, tempFilePaths, 0, 0, 500, 500)
          ctx.drawImage(tempFilePaths, 0, 0, 500, 500);        
          ctx.draw(false, setTimeout(()=>{
            wx.canvasToTempFilePath({
              canvasId: 'asdasd',
              fileType: 'jpg',
              quality: quality,
              success: res => {
                resolve(res)
              }, fail: function (e) {
                wx.showToast({
                  title: '图片上传失败，请重新上传！',
                  icon: 'none'
                })
                reject(e)
              }
            });
          }, 1000))
          if(file) {
            wx.showLoading({
              title: '上传中',
              mask: true
            });
            let args = {
              url: 'serveInside/help_feedback',
              filePath: file,
              name: 'images'
            };
            let requestUrl = 'https://test-yhb-node.xwfintech.com/api/v1/' + args.url;
            wx.uploadFile({
              url: that.data.uploadImageUrl,
              filePath: args.filePath,
              name: args.name,
              success: response => {
                console.log(response, that.data.uploadSuccessList, file)
                const data = JSON.parse(response.data);
                const { url = '' } = data.data || {}
                const arr = that.data.uploadSuccessList.slice()
                const arr1 = that.data.uploadResultList.slice()
                arr.push(file)
                arr1.push(url)
                that.setData({
                  uploadSuccessList: arr,
                  uploadResultList: arr1
                })
                wx.hideLoading();
              },
              fail: err => {

              }
            })
          }
        },
        fail: function (res) {
          wx.showModal({
            content: '上传图片失败，请拍摄5兆以内大小的图片'
          });
        }
      })
      
    },
    deleteImage(index) {
      const arr = this.data.uploadSuccessList.splice(index, 1).slice()
      const arr1 = this.data.uploadResultList.splice(index, 1).slice()
      this.setData({
        uploadSuccessList: arr,
        uploadResultList: arr1
      })
    },
    previewImage(item){
      wx.previewImage({
        current: item, // 当前显示图片的http链接
        urls: this.uploadSuccessList // 需要预览的图片http链接列表
      })
    },
    inputValue: function(event){
      this.triggerEvent('inputuser', event, { bubbles: true, composed: true })
    }
  },
  // 上传文件
  uploadFile(args = {}) {
    return new Promise((resolve, reject) => {
      const {
        url,
        header,
        filePath,
        name,
        formData,
        noModel,
        isShowLoading = true,
        isShowError = true,
        isV2
      } = args;
      let requestUrl = 'https://test-yhb-node.xwfintech.com/api/v1/' + url;
      wx.uploadFile({
        url: requestUrl,
        filePath: filePath,
        name: name,
        formData: formData,
        success: response => {
          const {statusCode, data} = response;
          let resData = {};
          try {
            resData = JSON.parse(data);
          } catch (e) {
            resData = {};
          }
          const resCode = parseInt(resData.code);
          if (statusCode !== 200) {
            reject(response);
            return false;
          }
          if (resCode === 0) {
            resolve(response);
            return false;
          }
          if (response.msg) {
            if(args.isShowError) {
              wx.showModal({
                title: '提示',
                content: response.msg || '请求出现错误了',
                showCancel: false
              });
            }
            
          } else {
            // 不需要统一弹窗
            if (noModel) {
              reject(resData);
              return false;
            }
            const {
              msg = '请求出现错误了'
            } = resData;
            if(args.isShowError) {
              wx.showModal({
                title: '提示',
                content: msg.toString(),
                showCancel: false
              }).then(res => {
                reject(res);
              });
            } else {
              reject(resData)
            }
            
          }
        },
        fail: error => {
          reject(error);
          if(args.isShowError) {
            wx.showToast({icon: 'none', title: '系统开小差了，请稍后再试【F001】'});
          }
          if (wx.reportMonitor) {
            wx.reportMonitor('3', 1);
          }
        },
        complete: () => {
          if(isShowLoading) {
            wx.hideLoading();
          }
        }
      });
    });
  }
})
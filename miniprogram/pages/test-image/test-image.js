Page({
  data: {
    userInfo: [
      {
        placeholder: '请输入姓名',
        title: '姓  名',
      },
      {
        placeholder: '请输入工作',
        title: '工  作',
      },
      {
        placeholder: '请输入家庭住址',
        title: '家庭住址',
      }
    ],
    marriedArray: [
      {
        placeholder: '请输入姓名',
        title: '姓  名',
      },
      {
        placeholder: '请输入工作',
        title: '工  作',
      },
      {
        placeholder: '请输入家庭住址',
        title: '家庭住址',
      }
    ],
  },
  back: function(){
    wx.showToast({
      title: '成功',
      content: '组件正常',
      duration: 1500,
      complete: function(){
        wx.navigateBack()
      }
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
  methods: {
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
    
  },
  uploadImage: function(list){
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
    const length = list.detail && list.detail.length
    console.log(list.detail.length)
    wx.showToast({
      title: `上传${ length }张图片`,
      duration: 1500,
      complete: () => {
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      }
    })
  },
  onMyEvent: function(event){
    console.log(123, event)
  }
})
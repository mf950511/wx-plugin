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
    return
    wx.request({
      method: "POST",
      url: 'https://test-yhb-node.xwfintech.com/api/v1/common/qa_guess', //仅为示例，并非真实的接口地址
      data: {
        app_id: "wx0aafc04d07c3bfa6",
        app_type: "wx-app",
        appid: "wx8366509cef541c14",
        entry: "wx-app",
        merchant_code: "00000100",
        open_id: "oifOl5DwjQtfb86Y4Be_9130_dco",
        platform: "wx",
        platform_name: "wx",
        product_code: "1600000100",
        version: "v1.6.2",
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
      }
    })
  },
  methods: {
    back: function(){
      wx.request({
        url: 'https://test-yhb-node.xwfintech.com/api/v1/common/qa_guess', //仅为示例，并非真实的接口地址
        data: {
          app_id: "wx0aafc04d07c3bfa6",
          app_type: "wx-app",
          appid: "wx8366509cef541c14",
          entry: "wx-app",
          merchant_code: "00000100",
          open_id: "oifOl5DwjQtfb86Y4Be_9130_dco",
          platform: "wx",
          platform_name: "wx",
          product_code: "1600000100",
          version: "v1.6.2",
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          console.log(res.data)
        }
      })
      // wx.showToast({
      //   title: '成功',
      //   content: '插件页面展示正常，组件可用',
      //   duration: 1500,
      //   complete: function(){
      //     wx.navigateBack()
      //   }
      // })
    }
  },
  onMyEvent: function(event){
    console.log(123, event)
  }
})
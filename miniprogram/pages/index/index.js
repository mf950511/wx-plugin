var plugin = requirePlugin("myPlugin")
Page({
  data: {
  },
  onLoad: function() {
    plugin.getData()
  },
  liveness: function(){
    wx.navigateTo({
      url: 'plugin://myPlugin/fill-info'
    })
  },
  testPlugin: function(){
    wx.navigateTo({
      url: '/pages/test-plugin/test-plugin'
    })
  },
  testImage: function(){
    wx.navigateTo({
      url: '/pages/test-image/test-image'
    })
  }
})
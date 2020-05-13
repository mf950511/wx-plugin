/*
 * @Author: your name
 * @Date: 2020-04-09 16:53:24
 * @LastEditTime: 2020-05-13 15:28:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \WXPlugin\plugin\components\video\video.js
 */


Page({
  data: {
    hasEnd: false,
    hasStart: false
  },
  onLoad: function(options){
    console.log(333333, options)
    const { configIndex, urlindex } = options
    this.setData({
      configIndex,
      urlindex
    })
  },
  ready: function(){
    this.recordTime = 0
  },
  operator: function(){
    if(!this.data.hasStart) {
      this.camera = wx.createCameraContext('myCamera1', this);
      this.ctx = wx.createCanvasContext('camera-canvas', this);
      this.startRecord()
      console.log('执行了开始录像')
    } else {
      this.stopRecord()
      console.log('执行了结束录像')
    }
    
  },
  error: function(err){
    console.log('相机错误', err)
  },
  restart: function(){
    this.setData({
      hasEnd: false,
      hasStart: false
    }, () => {
      console.log('重新录制')
      this.startRecord()
    })
  },
  success: function(){
    console.log('录制成功', this.data.videoSrc)
    wx.setStorageSync('videoData', {
      videoSrc: this.data.videoSrc,
      imageSrc: this.data.imageSrc,
      configIndex: this.data.configIndex,
      urlindex: this.data.urlindex,
    });
    wx.navigateBack();
  },
  getRadit: function(){
    let res = wx.getSystemInfoSync();
    let clientWidth = res.windowWidth;
    return 750 / clientWidth;
  },
  clearCanvas: function(){
    const radit = this.getRadit()
    const width = 750 / radit
    const height = 300 / radit
    // 清空画布(每次清空画布重新绘制，才能更新)
    this.ctx.clearRect(0,0, width, height);
    this.ctx.draw()
    clearInterval(this.progressTimerId)
    this.progressTimerId = null
    console.log('清空画布完成')
  },
  drawProgress: function(num){
    const radit = this.getRadit()
    const width = 750 / radit
    const height = 300 / radit
    // 清空画布(每次清空画布重新绘制，才能更新)
    this.ctx.clearRect(0,0, width, height);
    // 首先绘制背景
    this.ctx.beginPath();
    this.ctx.setLineCap('round')
    this.ctx.setLineWidth(20 / radit)
    this.ctx.setStrokeStyle('rgba(255, 255, 255, 0.5)');
    this.ctx.lineTo(32 / radit, 30 / radit);
    this.ctx.lineTo(718 / radit, 30 / radit);
    this.ctx.stroke();
    this.ctx.closePath();
    // 绘制进度条线
    this.ctx.beginPath();
    this.ctx.setLineCap('round')
    this.ctx.setLineWidth(20 / radit)
    this.ctx.setStrokeStyle('#7BF000');
    this.ctx.lineTo(32 / radit, 30 / radit);
    this.ctx.lineTo(Math.min((32 + num), 718) / radit, 30 / radit);
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.draw()

  },
  // 绘制同进度的canvas
  startProgress: function(){
    let num = 0
    this.progressTimerId = setInterval(() => {
      num += 0.46
      this.drawProgress(num)
    }, 20)
    console.log('绘制进度条')
    
  },
  initData: function(res){
    const { tempThumbPath, tempVideoPath } = res || {}
    this.clearCanvas()
    this.setData({
      videoSrc: tempVideoPath,
      imageSrc: tempThumbPath,
      hasEnd: true,
      hasStart: false
    })
    console.log('清除画布成功')
  },
  stopRecord: function(){
    console.log(232323)
    this.camera.stopRecord({
      success: res => {
        console.log('stopRecord success', res);
        // res.tempVideoPath
        this.initData(res)
      },
      fail: res => {
        wx.showToast({
          icon: 'none',
          title: '录制视屏失败，请重新录制'
        });
        this.setData({
          hasEnd: false,
          hasStart: false
        })
      }
    });
  },
  startRecord: function(){
    this.camera.startRecord({
      timeoutCallback: (res) => {
        console.log('到时间自动停止了')
        this.initData(res)
      },
      success: res => {
        console.log('开始录像', res)
        this.setData({
          hasStart: true
        })
        this.startProgress()
        
      },
      fail: err => {
        console.log('录像失败', err, this.recordTime)
        this.recordTime = this.recordTime + 1
        if (this.recordTime >= 2) {
          wx.showModal({
            title: '提示',
            content: '微信视频调用失败, 请重试或尝试升级微信版本',
            showCancel: false
          })
          // 重置
          this.recordTime = 0
          return ;
        }
        this.startRecord()
      }
    })
  },
  methods: {
    
  }
})
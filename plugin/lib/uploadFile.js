/*
 * @Author: your name
 * @Date: 2020-04-02 11:24:28
 * @LastEditTime: 2020-04-02 11:29:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \WXPlugin\plugin\lib\uploadFile.js
 */
// 上传文件
function uploadFile(args = {}) {
  return new Promise((resolve, reject) => {
    const {
      url,
      header,
      filePath,
      name,
      formData,
      isShowError = true
    } = args;
    wx.uploadFile({
      url: url,
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
          const {
            msg = '请求出现错误了'
          } = resData;
          if(args.isShowError) {
            wx.showModal({
              title: '提示',
              content: msg.toString(),
              showCancel: false
            })
          } 
          reject(resData)
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
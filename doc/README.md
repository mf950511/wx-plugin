# 基于小程序的插件与组件库

## 首次提交提供两个组件

### 输入框组件

- 提供基础的样式与输入形式，可通过回调获取相应的输入值
- 使用方式如下

```js
<input-item noBorder="{{ index === userInfo.length }}" placeholder="{{item.placeholder}}" title="{{item.title}}" bind:inputuser="onMyEvent"></input-item>

onMyEvent: function(event){
  console.log(event)
}
```

### 图片上传组件

- 提供图片上传组件，基础样式与接口回调能力
- 使用方式如下,回调可获取上传的文件与文件ID

```js
<upload-image bind:upload-image="uploadImage"></upload-image>

uploadImage: function(list){
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


```
# 基于小程序的插件与组件库

## 此次提交提供三个组件，引用方式如下

- 在app中引入此小程序(在小程序管理后台搜索此小程序，并添加)，引入方式如下

```js
  "plugins": {
    "myPlugin": {
      "version": "xxxxxxx", // 需要使用的版本号
      "provider": "wx29eaa708fc6bf3a4"
    }
  },
```

- 在需要使用的页面中按需引入各组件，所有组件对应为

```js
  "usingComponents": {
    "upload-image": "plugin://myPlugin/upload-image", // 上传图片
    "input-item": "plugin://myPlugin/input-item", // 输入框组件
    "upload-video": "plugin://myPlugin/upload-video", // 上传视频
  }

```

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

- 图片上传经常会遇到多图片上传的情况，又因为上传操作是异步，所以无法即时的反馈图片的上传情况，此组件将图片上传变为了同步的上传方式，可以即时的反馈上传到第几张，方便开发者使用

- 图片上传组件优化，可接受外部传参，参数名称如下
   1. uploadImageObj，为上传图片地址与请求的基本项，格式如下
    ```js
    uploadObject: {
      url: "#####",
      name: "XXX",
      formData: {
        id: 123
      }
    }
    ```
   2. quality，类型为数字。代表上传图片的压缩质量，目前小程序提供的图片选取只有原图或压缩图，部分情况下无法满足情况，如原图过大，压缩图过于模糊的情况，此组件提供 0-1的图片质量，默认为0.5，可根据业务需要自己调整
   3. uploadResultList，类型为数组。可在组件初始化时传入，用于给该组件初始化几张图片，内部参数为对象，需要有两个字段，分别为url:图片的路径地址，showDelete:是否展示右侧的删除按钮，示例如下：
   ```js
   uploadResultList:[
      {
        url: 'xxxxxxx',
        showDelete: true
      },
      {
        url: 'yyyyyyyy',
        showDelete: false
      }
    ]
   ```
   4. limitNumber，类型为数字。标识该组件最多可上传多少张图片，当图片数量超出时会隐藏后面的上传按钮，默认值为10
  
- 组件对外提供两个回调函数，分别对应图片上传成功与图片上传失败的回调，回调函数分别为upload-image与upload-fail，使用方式与参数如下

```js
<upload-image bind:upload-image="uploadImage"  bind:upload-fail="uploadFail" uploadImageObj="{{ uploadObject }}" limitNumber="10"></upload-image>

uploadImage: function(list){ 
  // list.detail为上传组件内的图片数组，每一项的结构为 {url: '图片地址', showDelete: Boolean }， 根据业务需求操作数据即可
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

uploadFail: function(err) {
  // err 为报错原因，根据业务需求使用即可
  wx.showModal({
    content: "图片上传失败"
  })
}


```

- 注意事项：受组件内部实现影响，使用者需保证后台返回的在线地址字段包裹在 url 中，请求部分代码实现如下，使用者注意沟通格式需求

```js
  wx.uploadFile({
    ...that.data.uploadImageObj,
    filePath: path,
    success: response => {
      const data = JSON.parse(response.data);
      const { url = '' } = data.data || {}
    },
    fail: err => {
    }
  })
```

### 视频上传组件

- 小程序视频上传并不支持多视频选择，所以仅仅提供基本的样式与数据交互，同样可以接收外部参数控制，对应参数如下
   1. videoPath，类型为数组。标识为初始化的视频数组，用于在组件中展示用户个人的视频信息，内部参数为对象，需要有两个字段，分别为url:图片的路径地址，showDelete:是否展示右侧的删除按钮，示例如下：
    ```js
    videoPath:[
        {
          url: 'xxxxxxx',
          showDelete: true
        },
        {
          url: 'yyyyyyyy',
          showDelete: false
        }
      ]
    ```
   2. chooseVideoConfig，类型为对象。用于配置视频的选取项，是否允许拍摄与上传，拍摄时的时常为多少，示例与默认值如下：
    ```js
    chooseVideoConfig:{
      sourceType: ['album','camera'],
      maxDuration: 60,
      camera: 'back',
      compressed: true,
    }
    ```

- 视频组件同样对外提供两个回调函数，分别对应视频选取成功与视频选取失败的回调，回调函数分别为upload-video与upload-fail，使用方式与参数如下

```js
<upload-video bind:upload-video="uploadVideo"  bind:upload-fail="uploadFail"></upload-video>

uploadVideo: function(list){ 
  // list.detail为上传组件内的视频数组，每一项的结构为 {url: '视频地址', showDelete: Boolean }， 根据业务需求操作数据即可
  const length = list.detail && list.detail.length
  console.log(list.detail.length)
  wx.showToast({
    title: `上传${ length }个视频`,
    duration: 1500,
    complete: () => {
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }
  })
},

uploadFail: function(err) {
  // err 为报错原因，根据业务需求使用即可
  wx.showModal({
    content: "视频上传失败"
  })
}


```
Component({
  options: {
    multipleSlots: true // 启用多slot支持
  },
  properties: {
    title: {
      type: String,
      value: '默认标题'
    },
    placeholder: {
      type: String,
      value: "请输入内容"
    },
    noBorder: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    inputValue: function(event){
      this.triggerEvent('inputuser', event)
    }
  },
  
})
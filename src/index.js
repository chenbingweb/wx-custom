Component({
    /**
     * 组件的属性列表
     */
    properties: {
   
    },
  
    /**
     * 组件的初始数据
     */
    data: {
      show:false
    },
  
    /**
     * 组件的方法列表
     */
    methods: {
      onOpen(){
        this.setData({
          show:true
        })
        
      },
      onChange(val){
        console.log(val)
      },
      onconfirm(val){
        console.log(val)
      },
      onStart(val){
        console.log(val)
      },
      onEnd(val){
        console.log(val)
      }
    }
  })
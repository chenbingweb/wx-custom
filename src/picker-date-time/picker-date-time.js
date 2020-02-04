// components/picker-date-time/picker-date-time.js
import TimeClass from "./fn.js"
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    show:{
      type: Boolean,
      value: false,
      observer: function (n) {
        this.setData({
          shows:n
        })
      }
    },
    start:{
      type:String,
      value:'',
      observer:function(){

      }
    },
    'current-val':{
      type:String,
      value:'',
      observer:function(n){
        if(n)
        {
          if( this.tc )
          {
            
          }
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    shows:false,
    value:[0,0,0,0,0],
    year:[],
    month:[],
    day:[],
    hour:[],
    min:[]
  },
  ready(){
    this.myEventOption = {
      bubbles: false,
      composed: false,
      capturePhase: false
    }
   this.tc =  new TimeClass({
      _obj_:this
    })
   this._flag=false;
  },
  /**
   * 组件的方法列表
   */
  methods: {
    selectCity(){
      if (this._flag) return
      let val =this.data.value;

      this.triggerEvent('confirm', {
        
          value: `${this.data.year[val[0]]}-${this.data.month[val[1]]}-${this.data.day[val[2]]} ${this.data.hour[val[3]]}:${this.data.min[val[4]]}`
        
      }, this.myEventOption )
      this.setData({
        shows: false
      })
     // console.log(`${this.data.year[val[0]]}-${this.data.month[val[1]]}-${this.data.day[val[2]]} ${this.data.hour[val[3]]}:${this.data.min[val[4]]}`)
      
    },
    hiddenPicker(){
      if (this._flag) return
      this.setData({
        shows: false
      })

    },
    bindChange(ev){
      let { detail: { value } } = ev;
      this.tc.callBack && this.tc.callBack(value)
      this.setData({
        value: value
      },()=>{
        this.triggerEvent('change', {
         
            value: `${this.data.year[value[0]]}-${this.data.month[value[1]]}-${this.data.day[value[2]]} ${this.data.hour[value[3]]}:${this.data.min[value[4]]}`
          
        }, this.myEventOption )
      })
    },
    bindpickstart(ev){
     
      this._flag = true;
     
      let { detail: { value } } = ev;
      this.triggerEvent('pickstart', {}, this.myEventOption )
    },
    bindpickend(ev){
     
      this._flag = false;
      let { detail: { value } } = ev;
      this.triggerEvent('picksend', {}, this.myEventOption )
    },
    onShow(){
        this.setData({
          shows:true
        })
    }
  }
})

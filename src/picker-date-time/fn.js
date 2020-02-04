export default class TimeClass{
  constructor(option){
    let { _obj_, start,end } = option;
    this._obj_ = _obj_||{};
    this._start_ = start || 1970;
    this._end_ = end;
    this.currentVal = '';
    this._value=[0,0,0,0,0]
    this.init()
    
  }
  callBack(arr){
    // console.log(arr)
    if (this._value[1] !== arr[1] || this._value[0] !== arr[0])
    {
      let year = this._obj_.data.year[arr[0]]
      let month = Number(this._obj_.data.month[arr[1]])
      //console.log(year, month)
      this.getDayList(year, month).then(res => {
        this._value = arr;
        this._obj_.setData({
          value: this._value
        })
      })
    }
    
  }
  //初始化
  init(callback){
    let value = []
     //年
    this.getYearList().then(res=>{
      value.push(res)
      return Promise.resolve()
    }).then(()=>{
      //月
     return this.getMonthList().then(res=>{
        value.push(res)
      })
      
    }).then((res)=>{
      //日
      let year = this._obj_.data.year[value[0]]
      let month = Number(this._obj_.data.month[value[1]]) 
      return this.getDayList(year, month).then(res=>{
        value.push(res)
      })
    }).then(()=>{
       //时
      return this.getHourList().then(res=>{
        value.push(res)
      })
    }).then(()=>{
      //分
      return this.getMinList().then(res=>{
        value.push(res)
      })
     }).then(() => {
       this._value = value
       this._obj_.setData({
         value: value
       })

     })
    
   /*
   this._obj_.setData({
        value: [this.initStartIndex(list, 'year'), 0, 0, 0, 0]
      })
   */
  }
  //获取年
  getYearList(){
    return new Promise((resolve)=>{
      let list = []
      for (let i = 0; i < 100; i++) {

        list.push(this._start_ + i)
      }
      this._obj_.setData({
        year: list,

      }, () => {

        resolve(this.initStartIndex(list, 'year'))

      })
    })
  
    
  }
  //获取月
  getMonthList(){
    let list = this.getListInfo(12)
    return new Promise(resolve=>{
      this._obj_.setData({
        month: list,
      }, () => {
        resolve(this.initStartIndex(list, 'month'))
      })
    })
  
  }
  //获取日
  getDayList(year, month){
    
    let len = this.Month(year, month)
   

    return new Promise(resolve=>{
      // for(let i =0;i<len;i++){
        
      //   list.push( (i+1)<10?('0'+(i+1)):(i+1))
      // }
      let list = this.getListInfo(len);
      this._obj_.setData({
        day: list,
      }, () => {
        resolve(this.initStartIndex(list, 'day'))
      })
      
    })
  }
  //获取小时列表
  getHourList(){
    let list = this.getListInfo(24,'hour')
    
    return new Promise(resolve => {
      this._obj_.setData({
        hour: list,
      }, () => {
        resolve(this.initStartIndex(list, 'hour'))
      })
    })
  }
  //获取分钟
  getMinList() {
    let list = this.getListInfo(60,'min')

    return new Promise(resolve => {
      this._obj_.setData({
        min: list,
      }, () => {
        resolve(this.initStartIndex(list, 'min'))
      })
    })
  }


  getYear(){
    let date = new Date();
    return `${date.getFullYear()}`
  }
  //默认开始时间位置
  initStartIndex(arr,ty){
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : date.getMonth();
    let day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
    let hour = date.getHours() < 10 ? ('0' + date.getHours() ) : date.getHours();
    let min = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes();

    let _time_obj_ = { year, month, day, hour, min}
  
    let index= 0;
    arr.forEach((item,_index_)=>{
      if (item == _time_obj_[ty])
      {
        index = _index_ 
      }
    })
    return index;
     
  }
  //获取月的天数
  Month(year, month) {
    let allday = 0;
    if (month !== 2) {
      if (month === 4 || month === 6 || month === 9 || month === 11)
        allday = 30;
      else
        allday = 31;
    }
    else {
      //判断是否是闰年
      if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0)
        allday = 29;
      else
        allday = 28;
    }
    return allday
  }
  getListInfo(n,ty){
    let list=[]
    for(let i=0;i<n;i++){
      if (ty == 'hour' || ty == 'min')
      {
        list.push((i ) < 10 ? ('0' + (i)) : (i))
      }
      else
      {
        list.push((i + 1) < 10 ? ('0' + (i + 1)) : (i + 1))
      }
      
    }
    return list
  }
  
}

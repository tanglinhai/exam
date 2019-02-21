
var i=0;
export default {
  //获取sessionStorage
  storage:{
    get: function(key, format) {
      var data;
      if (sessionStorage.getItem(key)) {
        if (format == 'json') {
          data = JSON.parse(sessionStorage.getItem(key));
        } else {
          data = sessionStorage.getItem(key);
        }
      } else {
        data = false
      }
      return data;
    },
    //写入sessionStorage
    set: function(key, content, format) {
      var data;
      if (format == 'json') {
        data = JSON.stringify(content);
      } else {
        data = content;
      }
      sessionStorage.setItem(key, data);
    },
  },
  
  exam_operation_answer_calc: function(cxt, storeType, popwinOperationType){
    window.parent.vm.$children[0].$children[0].$children[1].operationAnswer(cxt, storeType, window.itemIndex, window.location.href+(popwinOperationType?popwinOperationType:''));
  },

  /**
   * backBtn方法是合理低价的返回按钮的路由事件 返回到/operation/zjps/hldj/bidLink页面
   */
  backBtn:function(){
    window.location.href ='/operation/zjps/hldj/bidLink';
  },
  /**
   * backBtn2方法是综合评标的返回按钮的路由事件 返回到/operation/zjps/zhpbbf/bidLink页面
   */
  backBtn2:function(){
    //console.log($(window.frameElement).attr("name"),111111111111111111111)
    window.location.href ='/operation/zjps/zhpbbf/bidLink';
  },
  /**
   *  StoredValue方法是如果是判断是双信封进入得话再次判断是第一信封按钮点击得还是第二信封按钮点击得
   * iframName=3代表是双信封点击进去得
   * sxfBtnSure=1代表是第一信封按钮点击进入
   * sxfBtnSure=2代表是第二信封按钮点击进入
   * 调用方法this.$commonFun.StoredValue(this);
   * @param {*} tab 
   * @param {*} event 
   * @param {*} tabIndex 
   * @param {*} pageIndex 
   * @param {*} _this 
   */
  StoredValue:function(_this){
    var iframName = $(window.frameElement).attr("name");  //获取iframe得name值判断是合理低价考试还是双信封合理低价考试
      //_this.$loaclStore.get('sxfBtnSure');
      //console.log(iframName,sxfBtnSure,12345678)
      if(iframName=="1"){
        return iframName
      }else if(iframName=="3"){
        //console.log(_this.$loaclStore.get('sxfBtnSure'),11111)
        if(!_this.$loaclStore.get('sxfBtnSure')){
          return iframName
        }else if(_this.$loaclStore.get('sxfBtnSure')==1){
          //console.log(_this.$loaclStore.get('sxfBtnSure'),2222222)
          return iframName+'1'
          
        }else if(_this.$loaclStore.get('sxfBtnSure')==2){
          //console.log(_this.$loaclStore.get('sxfBtnSure'),3333333)
          return iframName+'2'
        }
      }else if(iframName=="2"){
        return iframName
      }else if(iframName=="4"){
         //console.log(_this.$loaclStore.get('sxfBtnSure'),11111)
         if(!_this.$loaclStore.get('sxfBtnSure')){
          return iframName
        }else if(_this.$loaclStore.get('sxfBtnSure')==1){
          //console.log(_this.$loaclStore.get('sxfBtnSure'),2222222)
          return iframName+'1'
          
        }else if(_this.$loaclStore.get('sxfBtnSure')==2){
          //console.log(_this.$loaclStore.get('sxfBtnSure'),3333333)
          return iframName+'2'
        }
      }
  },
  

  /**
   * [onTabClick 合理低价评标办法tab页跳转逻辑] 
   * @param  {[type]} tab       [description]
   * @param  {[type]} event     [description]
   * @param  {[type]} tabIndex  [description]
   * @param  {[type]} pageIndex [description]
   * @param  {[type]} _this     [description]
   * @return {[type]}           [description]
   */
  onTabClick: function(tab, event, tabIndex, pageIndex, _this){
    if(tabIndex == tab.name){
      _this.tabDisabled[tabIndex] = true;
      return false;
    }
    if(tab.name=="1"){// 资格审查项
      if(!_this.$loaclStore.get(this.StoredValue(_this)+'资格审查isSubmit')){
        window.location.href ='/operation/zjps/hldj/startEvaluation';
      }else{
        window.location.href ='/operation/zjps/hldj/myQualificationsResult';
      }
    }else if(tab.name=="2"){//资格审查项汇总
      if(_this.$loaclStore.get(this.StoredValue(_this)+'资格审查isSubmit')){
        window.location.href ='/operation/zjps/hldj/finishQualificationsResult';
      }else{
        window.location.href ='/operation/zjps/hldj/unFinishQualificationsResult';
      }
    }else if(tab.name=="3"){//符合性审查项
      if(!_this.$loaclStore.get(this.StoredValue(_this)+'资格审查项汇总是否提交')){
        tab.disabled = true;
      }else{
        if(!_this.$loaclStore.get(this.StoredValue(_this)+'符合性审查isSubmit')){
          window.location.href ='/operation/zjps/hldj/startEvaluation_fhx';
        }else{
          window.location.href ='/operation/zjps/hldj/myQualificationsResult_fhx';
        }
      }
    }else if(tab.name=="4"){//符合性审查项汇总
      if(!_this.$loaclStore.get(this.StoredValue(_this)+'资格审查项汇总是否提交')){
        tab.disabled = true;
      }else{
        if(_this.$loaclStore.get(this.StoredValue(_this)+'符合性审查isSubmit')){
          window.location.href ='/operation/zjps/hldj/finishQualificationsResult_fhx';
        }else{
          window.location.href ='/operation/zjps/hldj/unFinishQualificationsResult_fhx';
        }
      }
    }else if(tab.name=="5"){//详细评审（技术）
      if(!_this.$loaclStore.get(this.StoredValue(_this)+'资格审查项汇总是否提交') || !_this.$loaclStore.get(this.StoredValue(_this)+'符合性审查项汇总是否提交')){
        tab.disabled = true;
      }else{
        if(!_this.$loaclStore.get(this.StoredValue(_this)+'详细评审（技术）isSubmit')){
          window.location.href ='/operation/zjps/hldj/startEvaluation_xxjs';
        }else{
          window.location.href ='/operation/zjps/hldj/myQualificationsResult_xxjs';
        }
      }
    }else if(tab.name=="6"){//详细评审（技术）汇总
      if(!_this.$loaclStore.get(this.StoredValue(_this)+'资格审查项汇总是否提交') || !_this.$loaclStore.get(this.StoredValue(_this)+'符合性审查项汇总是否提交')){
        tab.disabled = true;
      }else{
        if(_this.$loaclStore.get(this.StoredValue(_this)+'详细评审（技术）isSubmit')){
          window.location.href ='/operation/zjps/hldj/finishQualificationsResult_xxjs';
        }else{
          window.location.href ='/operation/zjps/hldj/unFinishQualificationsResult_xxjs';
        }
      }
    }else if(tab.name=="7"){//评审汇总
      if(!_this.$loaclStore.get(this.StoredValue(_this)+'资格审查项汇总是否提交') || !_this.$loaclStore.get(this.StoredValue(_this)+'符合性审查项汇总是否提交') || !_this.$loaclStore.get(this.StoredValue(_this)+'详细评审（技术）项汇总是否提交')){
        tab.disabled = true;
      }else{
        if(_this.$loaclStore.get(this.StoredValue(_this)+'评审汇总是否提交')){
          window.location.href ='/operation/zjps/hldj/submitSummary';
        }else{
          window.location.href ='/operation/zjps/hldj/reviewSummary';
        }
      }
    }
  },

  /**
   * [onTabClick 综合评标办法tab页跳转逻辑] 
   * @param  {[type]} tab       [description]
   * @param  {[type]} event     [description]
   * @param  {[type]} tabIndex  [description]
   * @param  {[type]} pageIndex [description]
   * @param  {[type]} _this     [description]
   * @return {[type]}           [description]
   */
  onTabClick1: function(tab, event, tabIndex, pageIndex, _this){
    if(tabIndex == tab.name){
      _this.tabDisabled[tabIndex] = true;
      return false;
    }
    if(tab.name=="1"){// 资格审查项
      if(!_this.$loaclStore.get(this.StoredValue(_this)+'zhpbbf_资格审查isSubmit')){
        window.location.href ='/operation/zjps/zhpbbf/startEvaluation';
      }else{
        window.location.href ='/operation/zjps/zhpbbf/myQualificationsResult';
      }
    }else if(tab.name=="2"){//资格审查项汇总
      if(_this.$loaclStore.get(this.StoredValue(_this)+'zhpbbf_资格审查isSubmit')){
        window.location.href ='/operation/zjps/zhpbbf/finishQualificationsResult';
      }else{
        window.location.href ='/operation/zjps/zhpbbf/unFinishQualificationsResult';
      }
    }else if(tab.name=="3"){//符合性审查项
      if(!_this.$loaclStore.get(this.StoredValue(_this)+'zhpbbf_资格审查项汇总是否提交')){
        tab.disabled = true;
      }else{
        if(!_this.$loaclStore.get(this.StoredValue(_this)+'zhpbbf_符合性审查isSubmit')){
          window.location.href ='/operation/zjps/zhpbbf/startEvaluation_fhx';
        }else{
          window.location.href ='/operation/zjps/zhpbbf/myQualificationsResult_fhx';
        }
      }
    }else if(tab.name=="4"){//符合性审查项汇总
      if(!_this.$loaclStore.get(this.StoredValue(_this)+'zhpbbf_资格审查项汇总是否提交')){
        tab.disabled = true;
      }else{
        if(_this.$loaclStore.get(this.StoredValue(_this)+'zhpbbf_符合性审查isSubmit')){
          window.location.href ='/operation/zjps/zhpbbf/finishQualificationsResult_fhx';
        }else{
          window.location.href ='/operation/zjps/zhpbbf/unFinishQualificationsResult_fhx';
        }
      }
    }else if(tab.name=="5"){//商务
      if(!_this.$loaclStore.get(this.StoredValue(_this)+'zhpbbf_资格审查项汇总是否提交') || !_this.$loaclStore.get(this.StoredValue(_this)+'zhpbbf_符合性审查项汇总是否提交')){
        tab.disabled = true;
      }else{
        if(_this.$loaclStore.get(this.StoredValue(_this)+'zhpbbf_商务isSubmit')){
          window.location.href ='/operation/zjps/zhpbbf/businessAffairs2';
        }else{
          window.location.href ='/operation/zjps/zhpbbf/businessAffairs';
        }
      }
    }else if(tab.name=="6"){//技术
      if(!_this.$loaclStore.get(this.StoredValue(_this)+'zhpbbf_资格审查项汇总是否提交') || !_this.$loaclStore.get(this.StoredValue(_this)+'zhpbbf_符合性审查项汇总是否提交')){
        tab.disabled = true;
      }else{
        if(_this.$loaclStore.get(this.StoredValue(_this)+'zhpbbf_技术isSubmit')){
          window.location.href ='/operation/zjps/zhpbbf/businessAffairs4';
        }else{
          window.location.href ='/operation/zjps/zhpbbf/businessAffairs3';
        }
      }
    }else if(tab.name=="7"){//评审汇总
      if(!_this.$loaclStore.get(this.StoredValue(_this)+'zhpbbf_资格审查项汇总是否提交') || !_this.$loaclStore.get(this.StoredValue(_this)+'zhpbbf_符合性审查项汇总是否提交')
       || !_this.$loaclStore.get(this.StoredValue(_this)+'zhpbbf_商务isSubmit') || !_this.$loaclStore.get(this.StoredValue(_this)+'zhpbbf_技术isSubmit')){
        tab.disabled = true;
      }else{
        if(_this.$loaclStore.get(this.StoredValue(_this)+'zhpbbf_评审汇总是否提交')){
          window.location.href ='/operation/zjps/zhpbbf/submitSummary';
        }else{
          window.location.href ='/operation/zjps/zhpbbf/reviewSummary';
        }
      }
    }
  }
  

}









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
  
  exam_operation_answer_calc: function(){
    window.parent.vm.$children[0].$children[0].$children[1].operationAnswer(window.itemIndex, window.location.href);
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
      if(!_this.$loaclStore.get('资格审查isSubmit')){
        window.location.href ='/operation/zjps/hldj/startEvaluation';
      }else{
        window.location.href ='/operation/zjps/hldj/myQualificationsResult';
      }
    }else if(tab.name=="2"){//资格审查项汇总
      if(_this.$loaclStore.get('资格审查isSubmit')){
        window.location.href ='/operation/zjps/hldj/finishQualificationsResult';
      }else{
        window.location.href ='/operation/zjps/hldj/unFinishQualificationsResult';
      }
    }else if(tab.name=="3"){//符合性审查项
      if(!_this.$loaclStore.get('资格审查项汇总是否提交')){
        tab.disabled = true;
      }else{
        if(!_this.$loaclStore.get('符合性审查isSubmit')){
          window.location.href ='/operation/zjps/hldj/startEvaluation_fhx';
        }else{
          window.location.href ='/operation/zjps/hldj/myQualificationsResult_fhx';
        }
      }
    }else if(tab.name=="4"){//符合性审查项汇总
      if(!_this.$loaclStore.get('资格审查项汇总是否提交')){
        tab.disabled = true;
      }else{
        if(_this.$loaclStore.get('符合性审查isSubmit')){
          window.location.href ='/operation/zjps/hldj/finishQualificationsResult_fhx';
        }else{
          window.location.href ='/operation/zjps/hldj/unFinishQualificationsResult_fhx';
        }
      }
    }else if(tab.name=="5"){//详细评审（技术）
      if(!_this.$loaclStore.get('资格审查项汇总是否提交') || !_this.$loaclStore.get('符合性审查项汇总是否提交')){
        tab.disabled = true;
      }else{
        if(!_this.$loaclStore.get('详细评审（技术）isSubmit')){
          window.location.href ='/operation/zjps/hldj/startEvaluation_xxjs';
        }else{
          window.location.href ='/operation/zjps/hldj/myQualificationsResult_xxjs';
        }
      }
    }else if(tab.name=="6"){//详细评审（技术）汇总
      if(!_this.$loaclStore.get('资格审查项汇总是否提交') || !_this.$loaclStore.get('符合性审查项汇总是否提交')){
        tab.disabled = true;
      }else{
        if(_this.$loaclStore.get('详细评审（技术）isSubmit')){
          window.location.href ='/operation/zjps/hldj/finishQualificationsResult_xxjs';
        }else{
          window.location.href ='/operation/zjps/hldj/unFinishQualificationsResult_xxjs';
        }
      }
    }else if(tab.name=="7"){//评审汇总
      if(!_this.$loaclStore.get('资格审查项汇总是否提交') || !_this.$loaclStore.get('符合性审查项汇总是否提交') || !_this.$loaclStore.get('详细评审（技术）项汇总是否提交')){
        tab.disabled = true;
      }else{
        if(_this.$loaclStore.get('评审汇总是否提交')){
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
      if(!_this.$loaclStore.get('zhpbbf_资格审查isSubmit')){
        window.location.href ='/operation/zjps/zhpbbf/startEvaluation';
      }else{
        window.location.href ='/operation/zjps/zhpbbf/myQualificationsResult';
      }
    }else if(tab.name=="2"){//资格审查项汇总
      if(_this.$loaclStore.get('zhpbbf_资格审查isSubmit')){
        window.location.href ='/operation/zjps/zhpbbf/finishQualificationsResult';
      }else{
        window.location.href ='/operation/zjps/zhpbbf/unFinishQualificationsResult';
      }
    }else if(tab.name=="3"){//符合性审查项
      if(!_this.$loaclStore.get('zhpbbf_资格审查项汇总是否提交')){
        tab.disabled = true;
      }else{
        if(!_this.$loaclStore.get('zhpbbf_符合性审查isSubmit')){
          window.location.href ='/operation/zjps/zhpbbf/startEvaluation_fhx';
        }else{
          window.location.href ='/operation/zjps/zhpbbf/myQualificationsResult_fhx';
        }
      }
    }else if(tab.name=="4"){//符合性审查项汇总
      if(!_this.$loaclStore.get('zhpbbf_资格审查项汇总是否提交')){
        tab.disabled = true;
      }else{
        if(_this.$loaclStore.get('zhpbbf_符合性审查isSubmit')){
          window.location.href ='/operation/zjps/zhpbbf/finishQualificationsResult_fhx';
        }else{
          window.location.href ='/operation/zjps/zhpbbf/unFinishQualificationsResult_fhx';
        }
      }
    }else if(tab.name=="5"){//商务
      if(!_this.$loaclStore.get('zhpbbf_资格审查项汇总是否提交') || !_this.$loaclStore.get('zhpbbf_符合性审查项汇总是否提交')){
        tab.disabled = true;
      }else{
        if(_this.$loaclStore.get('zhpbbf_商务isSubmit')){
          window.location.href ='/operation/zjps/zhpbbf/businessAffairs2';
        }else{
          window.location.href ='/operation/zjps/zhpbbf/businessAffairs';
        }
      }
    }else if(tab.name=="6"){//技术
      if(!_this.$loaclStore.get('zhpbbf_资格审查项汇总是否提交') || !_this.$loaclStore.get('zhpbbf_符合性审查项汇总是否提交')){
        tab.disabled = true;
      }else{
        if(_this.$loaclStore.get('zhpbbf_技术isSubmit')){
          window.location.href ='/operation/zjps/zhpbbf/businessAffairs4';
        }else{
          window.location.href ='/operation/zjps/zhpbbf/businessAffairs3';
        }
      }
    }else if(tab.name=="7"){//评审汇总
      if(!_this.$loaclStore.get('zhpbbf_资格审查项汇总是否提交') || !_this.$loaclStore.get('zhpbbf_符合性审查项汇总是否提交')
       || !_this.$loaclStore.get('zhpbbf_商务isSubmit') || !_this.$loaclStore.get('zhpbbf_技术isSubmit')){
        tab.disabled = true;
      }else{
        if(_this.$loaclStore.get('zhpbbf_评审汇总是否提交')){
          window.location.href ='/operation/zjps/zhpbbf/submitSummary';
        }else{
          window.location.href ='/operation/zjps/zhpbbf/reviewSummary';
        }
      }
    }
  }
  

}







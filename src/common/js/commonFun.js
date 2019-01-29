

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
      console.log(_this.$loaclStore.get('资格审查项汇总是否提交'), _this.$loaclStore.get('符合性审查项汇总是否提交'));
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
        if(!_this.$loaclStore.get('评审汇总是否提交')){
          window.location.href ='/operation/zjps/hldj/submitSummary';
        }else{
          window.location.href ='/operation/zjps/hldj/reviewSummary';
        }
      }
    }
  }
  

}







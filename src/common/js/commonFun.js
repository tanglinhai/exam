

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
  }
  

}







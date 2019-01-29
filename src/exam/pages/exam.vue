<template>
  <div class="exam">
    <h3 class="text-center marginT10">{{paperData.name}}</h3>
    <div class="text-center marginT10">模拟评标时长：{{paperData.time}}分钟  总分：{{paperData.totalPoints}}分</div>
    <hr>  
    <div class="submit-box" ref="submitBox" v-show="lianxi">
      <el-button @click="submit" type="primary" class="submit-btn">提交模拟评标</el-button>
      <div class="timeout">
        <p>距离模拟评标结束</p>
        <p>{{time}}</p>
      </div>
    </div>
    <div class="main">
      <div class="question single" v-if="singleQuestions.length>0">
        <h3>一、单选题（只有一个正确答案）</h3>
        <ul class="question-item">
          <li class="marginB10" v-for="(item,index) in singleQuestions" :key="item.id">
            <p class="question-title">{{index+1}} 、{{item.name}}</p>
            <div class="question-content">
              <span class="option"
                  v-if="item.type!='judgement'&&item.type!='Q&A'"item
                  v-for="(item1,index1) in item.selection" :key="item1.id">
                <el-radio v-model="item.sanswer" :label="options[index1]" :key="index1">
                {{options[index1]}}、{{item1}}
                </el-radio>
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div class="question multi" v-if="multiQuestions.length>0">
        <h3>二、多选题（有多个正确答案）</h3>
        <ul class="question-item">
          <li class="marginB10" v-for="(item,index) in multiQuestions" :key="item.id">
            <p class="question-title">{{index+1}} 、{{item.name}}</p>
            <div class="question-content">
              <span class="option"
                  v-if="item.type!='judgement'&&item.type!='Q&A'"item
                  v-for="(item1,index1) in item.selection" :key="item1.id">
                <el-checkbox v-model="item.sanswer" :label="options[index1]" :key="index1">
                {{options[index1]}}、{{item1}}
                </el-checkbox>
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div class="question judge" v-if="judgeQuestions.length>0">
        <h3>三、判断题</h3>
        <ul class="question-item">
          <li class="marginB10" v-for="(item,index) in judgeQuestions" :key="item.id">
            <p class="question-title">{{index+1}} 、{{item.name}}</p>
            <div class="question-content">
              <el-radio v-model="item.sanswer" label="A" :key="'A'+index">正确</el-radio>
              <el-radio v-model="item.sanswer" label="B" :key="'B'+index">错误</el-radio>
            </div>
          </li>
        </ul>
      </div>
      <div class="question judge" v-if="QAQuestions.length>0">
        <h3>四、简答题</h3>
        <ul class="question-item">
          <li class="marginB10" v-for="(item,index) in QAQuestions" :key="item.id">
            <p class="question-title">{{index+1}} 、{{item.name}}</p>
            <div class="question-content">
              <el-input
               class="textarea"
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="item.sanswer">
              </el-input>
            </div>
          </li>
        </ul>
      </div>
      <div class="question operation" v-if="operationQuestions.length>0">
        <h3>五、操作题</h3>
        <ul class="question-item">
          <li class="marginB10" v-for="(item,index) in operationQuestions" :key="item.id">
            <p class="question-title">
              {{index+1}} 、{{item.name}}
              <el-button size="mini" @click="operation_answer(item,index)">{{item.isEnd?'操作结束':'加载操作程序，并开始操作'}}</el-button>
            </p>
            <div class="question-content">
              <el-dialog
                :title="item.name"
                :visible.sync="item.show"
                width="100%"
                center
              >
                <iframe 
                  :ref="'iframe_operation_'+item._operation.name"
                  width="100%"
                  height="auto"
                  frameborder="0"
                  scrolling="no"
                ></iframe>
                <div class="submit-box" slot="footer" style="top: 50px;">
                  <el-button @click="endOperation(item)" type="danger" size="small">结束操作</el-button>
                </div>
              </el-dialog>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="scroll_top" @click="scrollTop" v-if="scroll>500">
      <i class="el-icon-caret-top"></i>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default{
    name: 'exam',
    data(){
      return {
        id: '',
        dialogVisible: false,
        paperData:{
          name:'',
          time:'',
          totalPoints:''
        },
        startTime:'',
        nowTime: '',
        examTime: '',
        timer: null,
        singleQuestions:[],
        multiQuestions:[],
        QAQuestions:[],
        judgeQuestions:[],
        operationQuestions:[],
        options:['A','B','C','D','E','F','G','H','I','J','K',
          'L','M','N','O','P','Q','R','S','T'],
        scroll: document.body.scrollTop,
        lianxi:true,    //如果练习点击进入此项不显示
      }
    },
    computed:{
      time:function(){
        let time = this.examTime;
        let hour = 0;
        let mm = 0;
        let ss = 0;
        hour = Math.floor(time / 3600);
        mm = Math.floor((time / 60 % 60));
        ss = Math.floor((time % 60));
        return  `${hour}小时${mm}分钟${ss}秒`;
      }
    },
    watch: {
      time(curVal, oldVal) {
        if(curVal == "小时分钟秒"){
          this.$message.error('考试时间到，强制提交!');
          let isMust = true;
          this.submit(isMust);
        }
      }
    },
    mounted(){
      this.nowTime = new Date();
      this.id = this.$route.params.id;
      this.id2 = this.$route.params.id2;   //传递第二个值用于判断是不是练习入口进入
      console.log(this.id2,this.id)
      // this.startTime = new Date();
      this.init();
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy(){
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods:{
      /**
       * 操作题统计分数
       */
      operationAnswer(itemIndex, url){
        var _item = this.operationQuestions[itemIndex];
        _item.sanswer = _item.sanswer || [];
        let isExist = false;

        for(var i=0;i<_item.sanswer.length;i++){
          if(_item.sanswer[i].url == url){
            isExist = true;
            break;
          }
        }
        if(!isExist){
          _item.sanswer.push({
            url: url,
            score: 1
          });
        }
      },
      /**
       * 结束操作
       */
      endOperation(item){
        
        this.$confirm('结束不可再继续操作, 您是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          item.sanswer = item.sanswer ? item.sanswer : [];
          item.isEnd = true;
          item.show = false;
          this.$message({
            type: 'success',
            message: '结束操作成功!'
          });
          this.$loaclStore.set('isSubmitPaper_'+item.id, true)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      },
      /**
       * 操作题答题按钮
       */
      operation_answer(item,index){
        var _this = this;

        if(!item.isEnd)
        item.show = true;
        setTimeout(function () {  //设置滚动条位置
          const iframe = _this.$refs['iframe_operation_'+item._operation.name][0];
          if(iframe.getAttribute('isLoaded') || item.isEnd){
            return;
          }
          iframe.style.cssText = 'min-height: '+(window.screen.height*.7)+'px';
          iframe.onload = function() {
              // 提前还原高度
              this.setAttribute('height', 'auto'); // 或设为''
              // 再在下一轮事件循环中设置新高度
              setTimeout(function() {
                  iframe.setAttribute('height', iframe.contentWindow.document.body.scrollHeight);
                  iframe.contentWindow.itemIndex = index;
              }, 0);
          }
          iframe.src = "/operation/zjps/"+
          (
            item._operation.name == '专家评审-双信封评标办法' ? 'sxfpbbf' :
            item._operation.name == '专家评审-综合评分办法' ? 'zhpbbf' : 'hldj'
          )
          +"/participateIn"
          iframe.setAttribute('isLoaded', true);
        }, 1000);
      },
      /**
       * 初始化
       */
      init(){
        if(this.id&&this.id2==11){    //如果练习点击进入此项不显示
          this.lianxi=false;
        }

        if(this.id == '' || !this.id ){
            this.$router.push({path:'forntexamindex'});
            return
        } else {
          this.$axios.get('/api/getExamInfo',{
            params:{
              id: this.id
            }
          }).then(response => {
            let res = response.data;
            if(res.status == '0') {
              for(let key in this.paperData) {
                  this.paperData[key] = res.result[key];
              }
              this.startTime = res.result.startTime;
              this.examTime = this.paperData.time*60 - ((this.nowTime - new Date(this.startTime))/1000);
              if(this.examTime <= 0&&!this.id2){
                this.$message.error('考试时间已过!');
                this.$router.go(-1);
              }
              this.getCode();
              // this.timeOut();
              res.result._questions.forEach(item => {
                if(item.type=='single'){
                  item.sanswer = '';
                  this.singleQuestions.push(item);
                } else if(item.type == 'multi'){
                  item.sanswer = [];
                  this.multiQuestions.push(item);
                } else if(item.type == 'Q&A') {
                  item.sanswer = '';
                  this.QAQuestions.push(item);
                } else if(item.type == 'judgement'){
                  item.sanswer = '';
                  this.judgeQuestions.push(item);
                } else if(item.type == 'operation'){
                  item.sanswer = '';
                  this.operationQuestions.push(item);
                }
              })
            }

            /*this.$nextTick(() => {
              //重置iframe的高度
              var iframes = document.getElementsByTagName('iframe');
              for (var i = 0, j = iframes.length; i < j; ++i) {
                  // 放在闭包中，防止iframe触发load事件的时候下标不匹配
                  (function(_i) {
                      iframes[_i].onload = function() {
                          // 提前还原高度
                          this.setAttribute('height', 'auto'); // 或设为''
                          // 再在下一轮事件循环中设置新高度
                          setTimeout(function() {
                              iframes[_i].setAttribute('height', iframes[_i].contentWindow.document.body.scrollHeight);
                          }, 0);
                      }
                  })(i);
              }
            })*/
          }).catch(err => {
            this.$message.error(err);
          })
        }
      },
      /**
       * 回到顶部
       * @return {[type]} [description]
       */
      scrollTop(){
        let timer = setInterval(() => {
          let top = document.body.scrollTop || document.documentElement.scrollTop;
          let speed = Math.ceil(top / 5);
          document.body.scrollTop = top - speed;
          if (top === 0) {
            clearInterval(timer);
          }
        }, 20)
      },
      getCode(){
        const TIME_COUNT = this.examTime;
        if (!this.timer) {
          this.timer = setInterval(() => {
            if (this.examTime > 0 && this.examTime <= TIME_COUNT) {
              this.examTime--;
            } else {
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
      },
      handleScroll(){
        this.scroll = document.body.scrollTop;
        if(this.scroll>250) {
          this.$refs.submitBox.style.top=10+'px';
        } else {
          this.$refs.submitBox.style.top=250+'px';
        }
      },
      /**
       * 提交试卷
       * @return {[type]} [description]
       */
      submit(isMust){
        let isAllAnswer = true;
        let single = true;
        let mutil = true;
        let judge = true;
        let QA = true;
        let operation__ = true;
        this.singleQuestions.some((item) => {
          single = !item.sanswer == '';
        })
        this.multiQuestions.some((item) => {
          mutil = !item.sanswer.length == 0;
        })
        this.judgeQuestions.some((item) => {
          judge = !item.sanswer == '';
        })
        this.QAQuestions.some((item) => {
          QA = !item.sanswer == '';
        })
        this.operationQuestions.some((item) => {
          operation__ = this.$loaclStore.get('isSubmitPaper_'+item.id) == '';


          console.log('=====================', this.$loaclStore.get('isSubmitPaper_'+item.id));
        })
        if(single&&mutil&&judge&&QA&&operation__){
          isAllAnswer = true;
        } else {
          isAllAnswer = false;
        }
        console.log(isAllAnswer,isMust);
        if(isAllAnswer === false && isMust !== true){
          this.$message.warning('考试时间未到，请完成所有题目!');
        } else {
          let score = 0; // 得分
          let answers = [];
          this.singleQuestions.forEach(item => {
            if(item.sanswer === item.answer){
              score += item.score;
            }
          });
          this.multiQuestions.forEach(item => {
            let answer = item.answer.split(',');
            if(answer.equals(item.sanswer)){
              score += item.score;
            }
          });
          this.judgeQuestions.forEach((item) => {
            if(item.sanswer === item.answer){
              score += item.score;
            }
          })
          if(this.QAQuestions.length > 0) {
            this.QAQuestions.forEach(item => {
              answers.push({
                _question: item._id,
                answer: item.sanswer
              })
            })
          }
          this.operationQuestions.forEach((item) => {
            if(item._operation.type == '1'){//最低价
              //最低价评分环节： 参加评审+1 ---->推举组长+1 ---->资格审查+1 ---->符合性审查+1 ---->详细评审(技术)+1 ----> 评审汇总+1
              var totalSteps = 6;
              var steps = 0;
              for(var i=0;i<item.sanswer.length;i++){
                steps += item.sanswer[i].score;
              }
              score += item.score*steps/totalSteps;
            }else if(item._operation.type == '2'){//综合评标
              var totalSteps = 8;
              var steps = 0;
              for(var i=0;i<item.sanswer.length;i++){
                steps += item.sanswer[i].score;
              }
              score += item.score*steps/totalSteps;
            }else if(item._operation.type == '3'){//双信封
              score += 0;
            }
          })
          if(isMust === true){
            this.submitApi(score,answers);
          } else {
            this.$confirm('是否提前交卷？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(() => {
              this.submitApi(score,answers);
            }).catch(()=>{
              this.$message({
                type: 'info',
                message: '已取消操作'
              });
            })
          } 
        } 
      },
      /**@argument score answers
       * 提交试卷api请求
       */
      submitApi(score,answers){
        this.$axios.post('/api/submitExam',{
          id: this.id,
          score: score,
          answers: answers,
          startTime: this.startTime
        }).then(response => {
          let res = response.data;
          if(res.status == '0') {
            this.$message.success('提交成功!');
            this.$router.push({path:'frontstudentinfo'});
          }
        }).catch(err => {
          this.$message.error('提交失败，请联系老师!');
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .exam{
    padding: 20px 0;
    .main{
      padding: 20px 20px;
      .question{
        margin-bottom: 20px;
        
        .operation{
          .question-title{
            
          }
        }
        
        .option{
          display: block;
          margin:5px 0 0 15px;
        }
        .question-item{
          margin-top: 20px;
          >li{
            border: 1px solid #ebebeb;
            border-radius: 3px;
            transition: .2s;
            background-color: #f3f2f2;
            .question-title{
              font-size: 16px;
              padding: 20px 20px 12px;
              border-bottom: 1px solid #ebebeb;
            }
            .question-content{
              padding: 20px;
              padding-top: 0;
              .el-dialog{
                position: fixed;
                top:0;
                left:0;
                margin: 0 !important;
                width: 100%;
                height: 100%;
                overflow-y: auto;
              }
            }
          }
        }
        .textarea{
          width: 500px;
        }
      }
    }
    .scroll_top{
      background-color: #fff;
      position: fixed;
      right: 100px;
      bottom: 150px;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      cursor: pointer;
      transition: .3s;
      box-shadow: 0 0 6px rgba(0,0,0,.12);
      z-index: 5;
      i{
        color: #409eff;
        display: block;
        line-height: 40px;
        text-align: center;
        font-size: 18px;
      }
    }
    .submit-box{
      position: fixed;
      right: 30px;
      padding: 30px;
      transition: 1s;
      text-align: center;
      border: 1px solid #ffffff;
      box-shadow: 1px 1px 1px #c5c5c5;
      background: #fff4007d;
      border-radius: 20px;
      .timeout{
        margin-top: 10px;
        text-align: center;
      }
    }
  }
</style>

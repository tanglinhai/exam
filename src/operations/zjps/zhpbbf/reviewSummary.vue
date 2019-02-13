<template>
  <div class="busa">
    <div class="busa_a">
      <el-row style="padding:0 15px;">
        <el-col :span="10">
          <div class="grid-content bg-purple busa_aleft">
            <span>标名称：<em>tih招标项目-专家评标2</em></span>
            <span>标号：<em>0635-1909n987</em></span>
            <span>包号：<em>0635-1909n987/1</em></span>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple busa_aright">
            <el-button type="primary" size="small" icon="el-icon-circle-check-outline" @click="checkAllScoreReaultBtn">查看全部打分结果</el-button>
            <el-button type="primary" size="small" icon="el-icon-circle-check-outline" @click="abandonedTenderBtn">废标</el-button>
            <el-button type="primary" size="small" icon="el-icon-circle-check-outline"  @click="inquiryBtn">标中质询</el-button>
            <el-button type="primary" size="small" icon="el-icon-tickets"><a href="/static/docs/zhaoBiaoFile.pdf" target="_blank" style="color:#fff;">查看招标文件</a></el-button>
            <el-button type="primary" size="small" icon="el-icon-tickets" @click="checkBidOpeningListBtn">查看开标一览表</el-button>
            <el-button type="primary" size="small" icon="el-icon-tickets" @click="bindResultSign">评标结果签字</el-button>
            <el-button type="primary" size="small" icon="el-icon-tickets"  @click="qualificationSign">资格审查签字</el-button>
            <el-button type="primary" size="small" icon="el-icon-d-arrow-left">返回</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="busa_b">
      <el-tabs type="border-card" v-model="activeName" @tab-click="onTabClick1">
        <el-tab-pane name="1" :disabled="tabDisabled[0]">
          <span slot="label" class="paddmar"><i class="el-icon-circle-check" style="color:#85ce61;"></i> 资格审查项</span>
        </el-tab-pane>
        <el-tab-pane name="2" :disabled="tabDisabled[1]">
          <span slot="label" class="paddmar"><i class="el-icon-circle-check" style="color:#85ce61;"></i> 资格审查项汇总</span>
        </el-tab-pane>
        <el-tab-pane name="3" :disabled="tabDisabled[2]">
          <span slot="label" class="paddmar"><i class="el-icon-circle-check" style="color:#85ce61;"></i> 符合性审查项</span>
        </el-tab-pane>
        <el-tab-pane name="4" :disabled="tabDisabled[3]">
          <span slot="label" class="paddmar"><i class="el-icon-circle-check" style="color:#85ce61;"></i> 符合性审查项汇总</span>
        </el-tab-pane>
        <el-tab-pane name="5" :disabled="tabDisabled[4]">
          <span slot="label" class="paddmar"><i class="el-icon-circle-check" style="color:#85ce61;"></i> 商务</span>
        </el-tab-pane>
        <el-tab-pane name="6" :disabled="tabDisabled[5]">
          <span slot="label" class="paddmar"><i class="el-icon-circle-check" style="color:#85ce61;"></i> 技术</span>
        </el-tab-pane>
        <el-tab-pane name="7" :disabled="tabDisabled[6]">
          <span slot="label" class="paddmar"><i class="el-icon-circle-check"></i> 评审汇总</span>
          <el-row style="line-height:40px;">
              <el-col :span="4">
                  <div class="grid-content bg-purple" style="font-size:14px;">评标委员会组长：张三</div>
              </el-col>
              <el-col :span="20">
                  <div class="grid-content bg-purple" style="text-align:right;">
                      <el-button size="small" type="primary" plain  @click="scoring">计算报价得分</el-button>
                      <el-button size="small" @click="sort"><i class="el-icon-sort "></i>排序</el-button>
                      <el-button size="small" @click="biddingAdvice">评标意见</el-button>
                      <el-button size="small" type="primary" plain @click="goToNextStage()"><i class="el-icon-printer"></i>提交</el-button>
                  </div>
              </el-col>
          </el-row>
          <el-table
                :data="tableData"
                border
                style="width:100%">
                <el-table-column
                    prop="bidder"
                    label="投标人">
                </el-table-column>
                <el-table-column
                    prop="num"
                    label="投标序号">
                </el-table-column>
                <el-table-column
                        label="评标委员会">
                        <el-table-column
                            prop="bida"
                            label="张三">
                        </el-table-column>
                        <el-table-column
                            prop="bidb"
                            label="李四">
                        </el-table-column>
                        <el-table-column
                            prop="bidc"
                            label="王五">
                        </el-table-column>
                </el-table-column>
                <el-table-column
                    prop="nub"
                    label="报价分">
                </el-table-column>
                <el-table-column
                    prop="end"
                    label="最终得分">
                </el-table-column>
                <el-table-column
                    prop="ip"
                    label="名次">
                </el-table-column>
            </el-table>
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark aaa_aright" style="text-align:center;padding:7px 0;">
                        <el-button type="primary" size="small"  @click="reviewLockRequest">评分解锁</el-button>
                        <el-button type="primary" size="small" @click="checkUnlockRecord">查看评分解锁记录</el-button>
                        <el-button type="primary" size="small" @click="checkProScore">查看专家个人打分表</el-button>
                        <el-button type="primary" size="small" @click="bindScore">投标人分项得分表</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog
      title="评分解锁申请"
      :visible.sync="dialogFormVisible"
      width="700px"
    >
      <ReviewLockRequest></ReviewLockRequest>
    </el-dialog>
    <el-dialog
      title="查看专家个人打分表"
      :visible.sync="dialogVisible"
      width="1000px"
    >
      <CheckProScore></CheckProScore>
    </el-dialog>
    <el-dialog
      title="投标人分项得分表"
      :visible.sync="dialogBindScore"
      width="1000px"
    >
      <CheckProScore></CheckProScore>
    </el-dialog>
    <el-dialog
      title="报价分计算"
      :visible.sync="dialogScoring"
      width="900px"
    >
      <Scoring @calcScore="calcScore"></Scoring>
    </el-dialog>
    <el-dialog
      title="投标人排序调整"
      :visible.sync="dialogSort"
      width="700px"
      class="sortDialog"
    >
      <Sort></Sort>
    </el-dialog>
    <el-dialog
      title="评标意见"
      :visible.sync="dialogBiddingAdvice"
      width="700px"
      class="failureEntryDialog"
    >
      <BiddingAdvice @savePbyj="savePbyj"></BiddingAdvice>
    </el-dialog>
    <el-dialog
      title="解锁申请记录"
      :visible.sync=" dialogViewUnlockRecord"
      width="700px"
    >
      <ViewUnlockRecord ></ViewUnlockRecord>
    </el-dialog>
    <el-dialog
      title="签字"
      :visible.sync="dialogVisibleSignatureReviewResult"
      width="1700px"
    >
      <SignatureReviewResult @childByValue="childByValue(a)"></SignatureReviewResult>
    </el-dialog>
    <el-dialog
      title="查看全部打分结果"
      :visible.sync="dialogCheckAllScoreReault"
      width="1700px"
    >
      <CheckAllScoreReault ></CheckAllScoreReault>
    </el-dialog>
    <el-dialog
      title="废标"
      :visible.sync="dialogAbandonedTender"
      width="700px"
    >
      <AbandonedTender ></AbandonedTender>
    </el-dialog>
    <el-dialog
      title="标中质询信息列表"
      :visible.sync="dialogStandardChallengeInformation"
      width="900px"
    >
      <StandardChallengeInformation ></StandardChallengeInformation>
    </el-dialog>
    <el-dialog
      title="开标一览表"
      :visible.sync="dialogCheckBidOpeningList"
      width="900px"
    >
      <CheckBidOpeningList ></CheckBidOpeningList>
    </el-dialog>
  </div>
</template>
<script>
  import ReviewLockRequest from '../dialog/ReviewLockRequest';
  import CheckProScore from '../dialog/CheckProScore';
  import Scoring from '../dialog/Scoring';
  import Sort from '../dialog/Sort';
  import BiddingAdvice from '../dialog/BiddingAdvice';
  import ViewUnlockRecord from '../dialog/ViewUnlockRecord';
  import SignatureReviewResult from '../dialog/SignatureReviewResult';
  import CheckAllScoreReault from '../dialog/CheckAllScoreReault';
  import AbandonedTender from '../dialog/AbandonedTender';
  import StandardChallengeInformation from '../dialog/StandardChallengeInformation';
  import CheckBidOpeningList from '../dialog/CheckBidOpeningList';
  export default {
    components: {
      ReviewLockRequest,
      CheckProScore,
      Scoring,
      Sort,
      BiddingAdvice,
      ViewUnlockRecord,
      SignatureReviewResult,
      AbandonedTender,
      CheckAllScoreReault,
      StandardChallengeInformation,
      CheckBidOpeningList,
    },
    data () {
      return {
        dialogVisibleSignatureReviewResult:false,
        dialogCheckBidOpeningList:false,//查看开标一览表
        dialogStandardChallengeInformation:false,//标中质询信息表
        dialogAbandonedTender:false,
        dialogCheckAllScoreReault:false,//查看全部打分结果
        activeName:'7',
        tabDisabled: [],

        /**
         * tableData:[
          {bidder:'重庆网控科技发展有限公司',num:'1',name:'就世纪浩劫',bida:'10.00',bidb:'8.10',bidc:'22.00',nub:'40.00',end:'45.37',ip:'3'},
          {bidder:'普瑞太阳能有限公司',num:'2',bida:'9.00',bidb:'7.20',bidc:'25.00',nub:'41.20',end:'47.73',ip:'1'},
          {bidder:'夏丰热工研究院有限公司',num:'3',bida:'11.00',bidb:'13.30',bidc:'20.00',nub:'44.00',end:'46.10',ip:'2'}
        ],
         */

        tableData:[
          {bidder:'重庆网控科技发展有限公司',num:'1',bida:'53.2',bidb:'47.2',bidc:'53',nub:'40',end:'',ip:''},
          {bidder:'普瑞太阳能有限公司',     num:'2',bida:'52.2',bidb:'48.2',bidc:'59',nub:'41',end:'',ip:''},
          {bidder:'夏丰热工研究院有限公司', num:'3',bida:'54.2',bidb:'42.2',bidc:'51',nub:'42',end:'',ip:''}
        ],
        dialogFormVisible: false,//评分解锁申请弹框
        dialogVisible: false,//查看专家个人打分表 和 投标人分项得分表弹框
        dialogScoring:false,//计算报价得分弹框
        dialogSort:false,//排序弹框
        dialogBiddingAdvice: false,//调转评标价弹框
        dialogViewUnlockRecord:false,
        dialogBindScore:false//投标人分项得分表
      }
    },
    mounted(){
        var psyj = this.$loaclStore.get('zhpbbf_评审意见_copy');
        if(psyj){
          this.psyj = psyj;
        }
    },
    methods: {
      checkBidOpeningListBtn(){
        this.dialogCheckBidOpeningList=true;
      },
      inquiryBtn(){
        this.dialogStandardChallengeInformation=true;
      },
      checkAllScoreReaultBtn(){
        this.dialogCheckAllScoreReault=true;
      },
      abandonedTenderBtn(){
        this.dialogAbandonedTender=true;
      },
      qualificationSign(){
        this.dialogVisibleSignatureReviewResult=true;
      },
      bindResultSign(){
        this.dialogVisibleSignatureReviewResult=true;
      },
      calcScore(data){//91.13 94.13 91.13 2 1 3
        this.dialogScoring = false;
        this.tableData[0].nub = 40;
        this.tableData[1].nub = 41;
        this.tableData[2].nub = 42;
        this.tableData[0].end = 91.13;
        this.tableData[1].end = 94.13;
        this.tableData[2].end = 91.13;
        this.tableData[0].ip = 2;
        this.tableData[1].ip = 1;
        this.tableData[2].ip = 3;
        this.$commonFun.exam_operation_answer_calc('calcBidderPrice');
      },
      savePbyj(content){
        this.dialogBiddingAdvice = false;
        this.$loaclStore.set('zhpbbf_评审意见', content);
      },
      onTabClick1(tab, event){
        this.$commonFun.onTabClick1(tab, event, '7', '1', this);
      },
      goToNextStage(){
        this.$loaclStore.set('zhpbbf_评审汇总是否提交', true);
        this.$commonFun.exam_operation_answer_calc();
        this.changeView('/operation/zjps/zhpbbf/submitSummary');
      },
      changeView(name){      //路由跳转传参函数
          window.location.href = name;
      },
      reviewLockRequest() {
        this.dialogFormVisible = true;
      },
      checkProScore() {
        this.dialogBindScore = true;
      },
      bindScore(){
        this.dialogVisible = true;
      },
      scoring() {
        this.dialogScoring = true;
      },
      sort() {
        this.dialogSort = true;
      },
      biddingAdvice() {
        this.dialogBiddingAdvice = true;
      },
      checkUnlockRecord(){
        this.dialogViewUnlockRecord=true;
      }
    },
  }
</script>

<style lang="scss">
  .busa{
    background:white;
    border-radius:5px;
    overflow: hidden;
    .busa_a{
      background:#c8d3d8;
      // height:42px;
      .el-row{
        // margin-left:0px!important;
        // margin-right:0px!important;
        .busa_aleft{
          line-height:42px;
          span{
            color:#777777;
            font-size:14px;
            font-weight: bold;
            margin-right:8px;
            em{
              color:#ff0000;
              font-weight: bold;
            }
          }
        }
        .busa_aright{
          float: right;
          button{
            margin-top:5px;
          }
        }
      }
    }
    .busa_b{
      border-bottom:1px solid #d0d0d0;
      margin-top:10px;
      .el-tabs__nav{
        margin-left:30%;
      }
      .el-tabs--border-card>.el-tabs__header{
        background:white;
      }
      .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
        background: #ffefa4;
        color:#ff0000;
      }
      .busa_bleft{
        background:#ebeff3;
        overflow: hidden;
        padding-left:20px;
        min-height:600px;
        h6{
          color:#000000;
          font-size:16px;
          padding-top:15px;
          margin-bottom:30px;
          font-weight:bold;
        }
        .a_bleft_btn{
          margin-top:20px;
        }
      }
      .busa_bright{
        display:none;
        .a_bright_title{
          margin-bottom:10px;
          span{
            font-size:14px;
            margin-right:20px;
          }
        }
      }

    }
    .qu{
        height: 40px;
        line-height: 40px;
        border: 1px solid #ebeef5;
        border-bottom: none;
        font-size: 14px;
    }
    .iconfont{
        font-size: 14px;
    }
    .icon-queren{
        color:#35D437;
    }
    .el-progress-bar__inner{
        background: #35D437;
    }
    .el-progress-bar{
      width:35%;
    }
    .btnBox{
        .el-button{
            margin-right:5px;
        }
    }
    .with{
      border: 1px solid #ebeef5;
      border-top:none;
      padding: 15px;
      .letter{
        padding-bottom: 5px;
        font-size: 14px;
      }
      .pad{
        padding-left: 28px;
        font-size: 14px;
      }
    }
    .textSty{
      line-height: 27px;
      padding-left: 15px;
      font-size: 14px;
    }
  }
</style>


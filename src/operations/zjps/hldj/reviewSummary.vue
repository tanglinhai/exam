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
            <el-button type="primary" size="small" icon="el-icon-edit-outline">废标</el-button>
            <el-button type="primary" size="small" icon="el-icon-edit-outline">标中质询</el-button>
            <el-button type="primary" size="small" icon="el-icon-tickets">查看招标文件</el-button>
            <el-button type="primary" size="small" icon="el-icon-tickets">查看开标一览表</el-button>
            <el-button type="primary" size="small" icon="el-icon-tickets">评标结果签字</el-button>
            <el-button type="primary" size="small" icon="el-icon-tickets">资格审查签字</el-button>
            <el-button type="primary" size="small" icon="el-icon-d-arrow-left">返回</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="busa_b">
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-circle-check"></i> 资格审查项</span>
          资格审查项
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-edit"></i> 资格审查项汇总</span>
          资格审查项汇总
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-edit"></i> 符合性审查项</span>
          符合性审查项
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-edit"></i> 符合性审查项汇总</span>
          符合性审查项汇总
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-edit"></i> 商务</span>
          商务
        </el-tab-pane>
        <el-tab-pane name="sec">
          <span slot="label"><i class="el-icon-edit"></i> 评审汇总</span>
          <el-row style="line-height:40px;">
              <el-col :span="4">
                  <div class="grid-content bg-purple" style="font-size:14px;">评标委员会组长：3</div>
              </el-col>
              <el-col :span="20">
                  <div class="grid-content bg-purple" style="text-align:right;">
                      <el-button size="small" type="primary"  @click="scoring">计算报价得分</el-button>
                      <el-button size="small" type="info" @click="sort">排序</el-button>
                      <el-button size="small" type="info" @click="biddingAdvice">评标意见</el-button>
                      <el-button size="small" type="info">提交</el-button>
                  </div>
              </el-col>
          </el-row>
          <el-table
                :data="tableData"
                border
                style="width:100%"
                :span-method="arraySpanMethod">
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
                            label="1">
                        </el-table-column>
                        <el-table-column
                            prop="bidb"
                            label="2">
                        </el-table-column>
                        <el-table-column
                            prop="bidc"
                            label="3">
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
                    <div class="grid-content bg-purple-dark" style="text-align:center;padding:7px 0;">
                        <el-button type="primary" size="small"  @click="reviewLockRequest">评分解锁</el-button>
                        <el-button type="primary" size="small">查看评分解锁记录</el-button>
                        <el-button type="primary" size="small" @click="checkProScore">查看专家个人打分表</el-button>
                        <el-button type="primary" size="small">投标人分项得分表</el-button>
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
      title="查看专家个人打分表和投标人分项得分表"
      :visible.sync="dialogVisible"
      width="1000px"
    >
      <CheckProScore></CheckProScore>
    </el-dialog>
    <el-dialog
      title="报价分计算"
      :visible.sync="dialogScoring"
      width="900px"
    >
      <Scoring></Scoring>
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
      <BiddingAdvice></BiddingAdvice>
    </el-dialog>
  </div>
</template>
<script>
  import ReviewLockRequest from '../dialog/ReviewLockRequest';
  import CheckProScore from '../dialog/CheckProScore';
  import Scoring from '../dialog/Scoring';
  import Sort from '../dialog/Sort';
  import BiddingAdvice from '../dialog/BiddingAdvice';
  export default {
    name: 'updateBill',
    components: {
      ReviewLockRequest,
      CheckProScore,
      Scoring,
      Sort,
      BiddingAdvice
    },
    data () {
      return {
        activeName:'sec',
        tableData:[
          {bidder:'夏丰热工研究院有限公司（测试）',num:'3',bida:'2.00',bidb:'3.30',bidc:'33.00',nub:'3.00',end:'16.10',ip:'1'},
          {bidder:'阿里巴巴(分)',name:'就世纪浩劫',bida:'1.00',bidb:'1.10',bidc:'22.00',nub:'1.00',end:'5.37',ip:'2'},
          {bidder:'普瑞太阳能有限公司（测试）',num:'6',bida:'3.00',bidb:'2.20',bidc:'11.00',nub:'2.00',end:'10.73',ip:'3'}
        ],
        dialogFormVisible: false,//评分解锁申请弹框
        dialogVisible: false,//查看专家个人打分表 和 投标人分项得分表弹框
        dialogScoring:false,//计算报价得分弹框
        dialogSort:false,//排序弹框
        dialogBiddingAdvice: false,//调转评标价弹框
      }
    },
    mounted(){
    },
    methods: {
      reviewLockRequest() {
        this.dialogFormVisible = true;
      },
      checkProScore() {
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


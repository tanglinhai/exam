<template>
  <div class="leader">
    <div class="leader_a">
      <el-row style="padding:0 15px;">
        <el-col :span="10">
          <div class="grid-content bg-purple leader_aleft">
            <span>标名称：<em>tih招标项目-专家评标2</em></span>
            <span>标号：<em>0635-1909n987</em></span>
            <span>包号：<em>0635-1909n987/1</em></span>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple leader_aright">
            <el-button type="primary" size="small" icon="el-icon-circle-check-outline">废标</el-button>
            <el-button type="primary" size="small" icon="el-icon-circle-check-outline">标中质询</el-button>
            <el-button type="primary" size="small" icon="el-icon-tickets"><a href="/static/docs/zhaoBiaoFile.pdf" target="_blank" style="color:#fff;">查看招标文件</a></el-button>
            <el-button type="primary" size="small" icon="el-icon-tickets">查看开标一览表</el-button>
            <el-button type="primary" size="small" icon="el-icon-tickets">评标结果签字</el-button>
            <el-button type="primary" size="small" icon="el-icon-tickets">资格审查签字</el-button>
            <el-button type="primary" size="small" icon="el-icon-d-arrow-left">返回</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="leader_b">
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane>
          <span slot="label" @click="changeView('/operation/zjps/hldj/myQualificationsResult')"><i class="el-icon-circle-check"></i> 资格审查项</span>
        </el-tab-pane>
        <el-tab-pane name="sec">
          <span slot="label"><i class="el-icon-circle-check"></i> 资格审查项汇总</span>
          <div>
            <el-row style="line-height:40px;">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                    <span>评标委员会组长：3</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple btnBox" style="text-align:right;">
                    <el-button size="small" type="info" @click="changeView('/operation/zjps/hldj/startEvaluation_fhx')">提交</el-button>
                    <el-button size="small" type="info" @click="individualTrial">查看个人资格审查项表</el-button>
                    <el-button size="small" type="info" @click="checkUnlockRecord">查看资格审查项解锁记录</el-button>
                    <el-button size="small" type="info" @click="qualificationUnlockApplication">资格审查项解锁</el-button>
                </div>
              </el-col>
            </el-row>
            <el-table
                :data="tableData"
                border
                style="width:100%">
                <el-table-column
                    prop="num"
                    label="序号"
                    width="120px">
                </el-table-column>
                <el-table-column
                    prop="factor"
                    label="评审因素">
                </el-table-column>
                <el-table-column
                    label="投标人">
                    <el-table-column
                        prop="name"
                        label="阿里巴巴（1）">
                    </el-table-column>
                    <el-table-column
                        prop="name1"
                        label="普瑞太阳能有限公司（测试）（2）">
                    </el-table-column>
                    <el-table-column
                        prop="name2"
                        label="夏丰热工研究院有限公司（测试）（3）">
                    </el-table-column>
                </el-table-column>
            </el-table>
            <el-row class="with">
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="letter">注：1、对于实质性响应项，凡资格审查项中有任何一条未通过评审要求，即界定为无效投标人。</div>
                  <div class="letter pad">2、对于非实质响应项，当启用废标设置并且未通过评审要求的项数大于最大偏离项，即界定为无效投标人。</div>
                  <div class="pad">3、评标委员会各成员在表格相应位置中记录各投标人是否符合要求，符合要求打“√”，不符合要求打“×”。结论为“合格”或“不合格”。 </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <div class="grid-content bg-purple textSty">
                    <div>其他说明：</div>
                    <div>(1000字以内)</div>
                </div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple">
                    <el-input type="textarea"></el-input>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" @click="changeView('/operation/zjps/hldj/startEvaluation_fhx')"><i class="el-icon-circle-check"></i> 符合性审查项</span>
        </el-tab-pane>
        <el-tab-pane disabled>
          <span slot="label"><i class="el-icon-circle-check"></i> 符合性审查项汇总</span>
        </el-tab-pane>
        <el-tab-pane disabled>
          <span slot="label"><i class="el-icon-circle-check"></i> 详细评审（技术）</span>
        </el-tab-pane>
        <el-tab-pane disabled>
          <span slot="label"><i class="el-icon-circle-check"></i> 详细评审（技术）汇总</span>
        </el-tab-pane>
        <el-tab-pane disabled>
          <span slot="label"><i class="el-icon-circle-check"></i> 评审汇总</span>
        </el-tab-pane>
        <el-tab-pane disabled>
          <span slot="label"><i class="el-icon-circle-check"></i> 评审汇总</span>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="952px"
    >
      <IndividualTrial ></IndividualTrial>
    </el-dialog>
    <el-dialog
      :title="dialogVisibleTitle"
      :visible.sync=" dialogFormVisible"
      width="700px"
    >
      <QualificationUnlock ></QualificationUnlock>
    </el-dialog>
    <el-dialog
      title="解锁申请记录"
      :visible.sync=" dialogViewUnlockRecord"
      width="700px"
    >
      <ViewUnlockRecord ></ViewUnlockRecord>
    </el-dialog>
  </div>
</template>
<script>
  import IndividualTrial from '../dialog/IndividualTrial';
  import QualificationUnlock from '../dialog/QualificationUnlockApplication';
  import ViewUnlockRecord from '../dialog/ViewUnlockRecord';
  export default {
    name: 'updateBill',
    components: {
      IndividualTrial,
      QualificationUnlock,
      ViewUnlockRecord
    },

    data () {
      return {
        activeName:'sec',
        tableData:[
          {num:'1',factor:'1',name:'√(3√0×)',name1:'√(3√0×)',name2:'√(3√0×)'},
          {num:'2',factor:'11',name:'√(3√0×)',name1:'√(3√0×)',name2:'√(3√0×)'},
          {num:'结论',factor:'是否通过资格审查项检查',name:'合格',name1:'合格',name2:'合格'}
        ],
        dialogVisible:false,//查看个人资格审查项表弹框
        title:'个人初审类活动表',
        dialogFormVisible:false,//资格审查项汇总解锁申请
        dialogVisibleTitle:'资格审查项汇总解锁申请',
        dialogViewUnlockRecord:false
      }
    },
    mounted(){
    },
    methods: {
      changeView(url){
        window.location.href = url;
      },
      individualTrial(){
        this.dialogVisible = true;
      },
      qualificationUnlockApplication(){
        this.dialogFormVisible = true;
      },
      checkUnlockRecord(){
        this.dialogViewUnlockRecord=true;
      }
    },
  }



</script>

<style lang="scss">
  .leader{
    background:white;
    border-radius:5px;
    overflow: hidden;
    .leader_a{
      background:#c8d3d8;
      // height:42px;
      .el-row{
        // margin-left:0px!important;
        // margin-right:0px!important;
        .leader_aleft{
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
        .leader_aright{
          float: right;
          button{
            margin-top:5px;
          }
        }
      }
    }
    .leader_b{
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
      .leader_bleft{
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
      .leader_bright{
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


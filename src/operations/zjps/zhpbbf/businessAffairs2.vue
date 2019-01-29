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
      <el-tabs type="border-card" v-model="activeName" @tab-click="onTabClick1">
        <el-tab-pane name="1" :disabled="tabDisabled[0]">
          <span slot="label" class="paddmar"><i class="el-icon-circle-check"></i> 资格审查项</span>
        </el-tab-pane>
        <el-tab-pane name="2" :disabled="tabDisabled[1]">
          <span slot="label" class="paddmar"><i class="el-icon-edit"></i> 资格审查项汇总</span>
        </el-tab-pane>
        <el-tab-pane name="3" :disabled="tabDisabled[2]">
          <span slot="label" class="paddmar"><i class="el-icon-edit"></i> 符合性审查项</span>
        </el-tab-pane>
        <el-tab-pane name="4" :disabled="tabDisabled[3]">
          <span slot="label" class="paddmar"><i class="el-icon-edit"></i> 符合性审查项汇总</span>
        </el-tab-pane>
        <el-tab-pane name="5" :disabled="tabDisabled[4]">
          <span slot="label"><i class="el-icon-edit"></i> 商务</span>
          <el-row style="line-height:40px;">
              <el-col :span="1">
                  <div class="grid-content bg-purple" style="font-size:14px;">进度：</div>
              </el-col>
              <el-col :span="8">
                  <div class="grid-content bg-purple" style="padding-top:12px;">
                      <el-progress :percentage="100"></el-progress>
                  </div>
              </el-col>
              <el-col :span="15">
                  <div class="grid-content bg-purple" style="text-align:right;">
                      <span style="display:inline-block; margin-top:5px;">专家： 张三</span>
                  </div>
              </el-col>
          </el-row>
          <el-table
                
                :data="tableData"
                :row-class-name="tableRowClassName"
                border
                style="width:100%"
                >
                <el-table-column
                    prop="num"
                    label="项目">
                </el-table-column>
                <el-table-column
                        label="投标人">
                        <el-table-column
                            prop="name"
                            label="重庆网控科技发展有限公司">
                        </el-table-column>
                        <el-table-column
                            prop="name1"
                            label="普瑞太阳能有限公司">
                        </el-table-column>
                        <el-table-column
                            prop="name2"
                            label="夏丰热工研究院有限公司">
                        </el-table-column>
                    </el-table-column>
            </el-table>
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark" style="text-align:right;border:1px solid #ebeef5;border-top:none;padding:7px 0; overflow:hidden;">
                        <el-pagination
                            :current-page="currentPage4"
                            :page-sizes="[10, 20, 50, 100]"
                            :page-size="10"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="3">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </el-tab-pane>
        <el-tab-pane name="6" :disabled="tabDisabled[5]">
          <span slot="label"><i class="el-icon-edit"></i> 技术</span>
        </el-tab-pane>
        <el-tab-pane name="7" :disabled="tabDisabled[6]">
          <span slot="label"><i class="el-icon-edit"></i> 评审汇总</span>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="未完成打分项"
      :visible.sync="dialogUnfinishedGrade"
      width="700px"
    >
      <UnfinishedGrade ></UnfinishedGrade>
    </el-dialog>
  </div>
</template>
<script>
  import UnfinishedGrade  from '../dialog/UnfinishedGrade';
  export default {
    name: 'updateBill',
    components: {
      UnfinishedGrade,
    },
    data () {
      return {
        activeName:'5',
        tabDisabled: [],
        tableData:[
          {num:'第一章、项目经理任职资格与业绩(0.00分-10.00分)',name:'8',name1:'7.5',name2:'9'},
          {num:'第二章、其他要求(0.00分-10.00分)',            name:'6.8',name1:'8.5',name2:'8'},
          {num:'商务小计(分)',name:'14.8',name1:'16',name2:'17'},
          {num:'总分小计(分)',name:'14.8',name1:'16',name2:'17'}
        ],
        currentPage4: 1,
        dialogUnfinishedGrade:false,//未完成打分项弹框
      }

    },
    mounted(){
    },

    methods: {  

      changeView(name){      //路由跳转传参函数
          // console.log(name)
          //this.$router.push({path:`${name}`});
          window.location.href = name;
      }, 
      onTabClick1(tab, event){
        this.$commonFun.onTabClick1(tab, event, '5', '2', this);
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 0||rowIndex === 1) {
          return 'success-row';
        }
        return '';
      },
      unfinishedGrade(){
        this.dialogUnfinishedGrade=true;
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
    .el-table .success-row {
      background: #f0f9eb;
    }
  }
</style>


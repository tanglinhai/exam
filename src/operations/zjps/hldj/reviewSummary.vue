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
          <span slot="label" @click="changeView('/operation/zjps/hldj/myQualificationsResult')"><i class="el-icon-circle-check"></i> 资格审查项</span>
        </el-tab-pane>

        <el-tab-pane>
          <span slot="label" @click="changeView('/operation/zjps/hldj/finishQualificationsResult')"><i class="el-icon-edit"></i> 资格审查项汇总</span>
        </el-tab-pane>

        <el-tab-pane>
          <span slot="label" @click="changeView('/operation/zjps/hldj/myQualificationsResult_fhx')"><i class="el-icon-edit"></i> 符合性审查项</span>
        </el-tab-pane>

        <el-tab-pane>
          <span slot="label" @click="changeView('/operation/zjps/hldj/finishQualificationsResult_fhx')"><i class="el-icon-edit"></i> 符合性审查项汇总</span>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" @click="changeView('/operation/zjps/hldj/myQualificationsResult_xxjs')"><i class="el-icon-edit"></i> 详细评审（技术）</span>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" @click="changeView('/operation/zjps/hldj/finishQualificationsResult_xxjs')"><i class="el-icon-edit"></i> 详细评审（技术）汇总</span>
        </el-tab-pane>
        <el-tab-pane name="sec">
          <span slot="label"><i class="el-icon-edit"></i> 评审汇总</span>
          <el-row style="line-height:40px;border-bottom:2px solid #66b1ff;margin-bottom:5px;">
              <el-col :span="4">
                  <div class="grid-content bg-purple" style="font-size:16px;color:#66b1ff">评审汇总</div>
              </el-col>
              <el-col :span="20">
                  <div class="grid-content bg-purple" style="text-align:right;">
                      <!-- <el-button size="small" @click="changeView('/operation/zjps/hldj/reviewSummary')"><i class="iconfont icon-fanhuishouye1"></i>&nbsp;&nbsp;退回</el-button> -->
                      <el-button style="border:none" size="small" @click="changeView('/operation/zjps/hldj/submitSummary')"><i class="el-icon-printer"></i>&nbsp;&nbsp;提交</el-button>
                      <el-button style="border:none" size="small" @click="sort"><i class="el-icon-sort "></i>&nbsp;&nbsp;排序</el-button>
                  </div>
              </el-col>
          </el-row>
          <el-table
            :data="tableData"
            border
            style="width:100%">
                <el-table-column
                    prop="num"
                    width="120px"
                    label="投标序号">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="投标人">
                </el-table-column>
                <el-table-column
                    prop="total"
                    label="评标价(人名币)">
                </el-table-column>
                <el-table-column
                    prop="ip"
                    label="排名">
                </el-table-column>
          </el-table>
          <el-row class="myform">
            <div class="le">
              评标意见：<br/>
              (2000字之内)  
            </div> 
            <div class="ri">
              <textarea style="width: 1000px;height: 200px;"></textarea>
            </div>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-dialog
        title="投标人排序调整"
        :visible.sync="dialogSort"
        width="700px"
        class="sortDialog"
      >
        <Sort></Sort>
      </el-dialog>

    </div>

  </div>
</template>
<script>
  import Sort from '../dialog/Sort';
  export default {
    name: 'updateBill',
    components: {
      Sort
    },
    data () {
      return { 
        activeName:'sec',
        tableData:[
          {num:'3',name:'中招国际招标有限公司',total:'10000.0000',ip:'1'},
          {num:'4',name:'北京麦徳森医疗器械有限公司',total:'30000.0000',ip:'2'},
        ],
        dialogSort:false,//排序弹框
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
      sort() {
        this.dialogSort = true;
      },
    },
  }
  

  
</script>

<style lang="scss">
  .busa{
    background:white;
    border-radius:5px;
    overflow: hidden;

    .myform{
      .le{
        float: left;
        width: 120px;
      }
      .ri{
        float: left;
        textarea{
          width: 1000px;
        }
      }
    }

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
      .iconfont{
          font-size:14px;
      }
    }
  }
</style>


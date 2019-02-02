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

    <div class="busa_b">
      <el-tabs type="border-card" v-model="activeName" @tab-click="onTabClick">
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
          <span slot="label" class="paddmar"><i class="el-icon-circle-check" style="color:#85ce61;"></i> 详细评审（技术）</span>
        </el-tab-pane>
        <el-tab-pane name="6" :disabled="tabDisabled[5]">
          <span slot="label" class="paddmar"><i class="el-icon-circle-check" style="color:#85ce61;"></i> 详细评审（技术）汇总</span>
        </el-tab-pane>
        <el-tab-pane name="7" :disabled="tabDisabled[6]">
          <span slot="label" class="paddmar"><i class="el-icon-circle-check"></i> 评审汇总</span>
          <el-row style="line-height:40px;border-bottom:2px solid #66b1ff;margin-bottom:5px;">
              <el-col :span="4">
                  <div class="grid-content bg-purple" style="font-size:16px;color:#66b1ff">评审汇总</div>
              </el-col>
              <el-col :span="20">
                  <div class="grid-content bg-purple" style="text-align:right;">
                      <el-button type="primary" plain size="small" @click="cancelSubmit()"><i class="iconfont icon-fanhuishouye1"></i>&nbsp;&nbsp;退回</el-button>
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
    </div>

  </div>
</template>
<script>
  export default {
    name: 'updateBill',
    data () {
      return {
        activeName:'7',
        tabDisabled:[],
        tableData:[
          {num:'1',name:'重庆网控科技发展有限公司',total:'30000.0000',ip:'1'},
          {num:'3',name:'普瑞太阳能有限公司（测试）',total:'10000.0000',ip:'2'},
          {num:'2',name:'夏丰热工研究院有限公司（测试）',total:'20000.0000',ip:'3'}
        ],
      }

    },
    mounted(){

    },
    methods: {
      cancelSubmit(){
        this.$loaclStore.set('评审汇总是否提交', '');
        var psyj = this.$loaclStore.get('评审意见');
        this.$loaclStore.set('评审意见', '');
        this.$loaclStore.set('评审意见_copy', psyj);
        this.changeView('/operation/zjps/hldj/reviewSummary')
      },
       onTabClick(tab, event){
        this.$commonFun.onTabClick(tab, event, '8', '2', this);
      },
      changeView(name){      //路由跳转传参函数
          window.location.href = name;
      }
    },
  }



</script>

<style lang="scss">
  .busa{
    background:white;
    border-radius:5px;
    overflow: hidden;

    .myform{
      margin-top: 20px;
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


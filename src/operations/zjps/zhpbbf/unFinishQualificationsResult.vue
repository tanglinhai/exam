<template>
  <div class="delet">
    <div class="delet_a">
      <el-row :gutter="20">
        <el-col :span="10">
          <div class="grid-content bg-purple delet_aleft">
            <span>标名称：<em>tih招标项目-专家评标2</em></span>
            <span>标号：<em>0635-1909n987</em></span>
            <span>包号：<em>0635-1909n987/1</em></span>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple delet_aright">
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

    <div class="delet_b">
      <el-tabs type="border-card" v-model="activeName" @tab-click="onTabClick1">
        <el-tab-pane name="1" :disabled="tabDisabled[0]">
          <span slot="label" class="paddmar"><i class="el-icon-circle-check"></i> 资格审查项</span>
        </el-tab-pane>
        <el-tab-pane name="2" :disabled="tabDisabled[1]">
          <span slot="label"><i class="el-icon-edit"></i> 资格审查项汇总</span>
          <div>
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple" style="display:block;">
                  <template>
                      <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="name"
                            label="评审专家"
                            width="120px">
                        </el-table-column>
                        <el-table-column
                            label="资格审查项进度">
                            <template slot-scope="scope">
                                <el-progress :percentage="scope.row.completePercent"></el-progress>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="是否提交资格审查结果">
                            <template slot-scope="scope">
                                <span>{{scope.row.address}}</span>
                            </template>
                        </el-table-column>
                      </el-table>
                  </template>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane name="3" :disabled="tabDisabled[2]">
          <span slot="label" class="paddmar"><i class="el-icon-edit"></i> 符合性审查项</span>
        </el-tab-pane>
        <el-tab-pane name="4" :disabled="tabDisabled[3]">
          <span slot="label" class="paddmar"><i class="el-icon-edit"></i> 符合性审查项汇总</span>
        </el-tab-pane>
        <el-tab-pane name="5" :disabled="tabDisabled[4]">
          <span slot="label" class="paddmar"><i class="el-icon-edit"></i> 商务</span>
        </el-tab-pane>
        <el-tab-pane name="6" :disabled="tabDisabled[5]">
          <span slot="label" class="paddmar"><i class="el-icon-edit"></i> 技术</span>
        </el-tab-pane>
        <el-tab-pane name="7" :disabled="tabDisabled[6]">
          <span slot="label" class="paddmar"><i class="el-icon-edit"></i> 评审汇总</span>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'updateBill',
    props:{
    },
    data () {
      return {
        activeName:'2',
        tabDisabled:[],
        tableData: [{
          date: '100.0%',
          name: '张三',
          address: '未完成'
        }, {
          date: '100.0%',
          name: '李四',
          address: '未完成'
        }, {
          date: '100.0%',
          name: '王五',
          address: '未完成'
        }],
        progres:'',
        d:0
      }
    },
    computed:{
      completePercent(){
        var tableData = this.$loaclStore.get('zhpbbf_资格审查项1');
        var tableData11 = this.$loaclStore.get('zhpbbf_资格审查项2');
        let len=tableData11.length+tableData.length;
        let fillCount = 0;
        for(var i=0;i<tableData.length;i++){
          if(tableData[i].radio){
            fillCount++;
          }
        }
        for(var i=0;i<tableData11.length;i++){
          if(tableData11[i].radio){
            fillCount++;
          }
        }
        return Math.floor(fillCount /len*100);
      }
    },
    mounted(){
      this.tableData[0].completePercent = this.completePercent;
    },
    methods: {
      onTabClick1(tab, event){
        this.$commonFun.onTabClick1(tab, event, '2', '1', this);
      },
      changeView(name){      //路由跳转传参函数
          window.location.href = name;
      },
    },
  }
</script>

<style lang="scss">
  .delet{
    background:white;
    border-radius:5px;
    overflow: hidden;
    .delet_a{
      background:#c8d3d8;
      height:42px;
      .el-row{
        margin-left:0px!important;
        margin-right:0px!important;
        .delet_aleft{
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
        .delet_aright{
          float: right;
          button{
            margin-top:5px;
          }
        }
      }
    }
    .delet_b{
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
      .el-col-4,.el-row{
        padding-left:0px!important;
        padding-right:0px!important;
        margin-left:0px!important;
        margin-right:0px!important;
      }
      .delet_bleft{
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
      .delet_bright{
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
  }
</style>


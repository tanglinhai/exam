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
        </el-tab-pane>
        <el-tab-pane name="6" :disabled="tabDisabled[5]">
          <span slot="label"><i class="el-icon-edit"></i> 技术</span>
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
                      <el-button size="small" plain>查看未完成项</el-button>
                      <el-button size="small" plain @click="saveData()">保存</el-button>
                      <el-button size="small" type="primary" @click="submitData()">提交商务</el-button>
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
                            label="夏丰热工研究院有限公司（测试）（1）">
                            <template slot-scope="scope">
                                <div>
                                    <div v-if="scope.$index < 8">
                                      <el-input style="width:150px;" :value="scope.row.name"></el-input>
                                      <i class="el-icon-edit-outline"></i>
                                    </div>
                                    <div v-else>{{scope.row.name}}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="name1"
                            label="益达天然产物有限公司（测试）（2）">
                            <template slot-scope="scope">
                                <div>
                                    <div v-if="scope.$index < 8">
                                      <el-input style="width:150px;" :value="scope.row.name1"></el-input>
                                      <i class="el-icon-edit-outline"></i>
                                    </div>
                                    <div v-else>{{scope.row.name1}}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="name2"
                            label="北京蓝天环境保护有限公司（测试）（3）">
                            <template slot-scope="scope">
                                <div>
                                    <div v-if="scope.$index < 8">
                                      <el-input style="width:150px;" :value="scope.row.name2"></el-input>
                                      <i class="el-icon-edit-outline"></i>
                                    </div>
                                    <div v-else>{{scope.row.name2}}</div>
                                </div>
                            </template>
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
        <el-tab-pane name="7" :disabled="tabDisabled[6]">
          <span slot="label"><i class="el-icon-edit"></i> 评审汇总</span>
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
        activeName:'6',
        tabDisabled: [],
        tableData:[
          {num:'第一章、施工方案与技术措施(0.00分-5.00分)',    name:'5',name1:'5',name2:'5'},
          {num:'第二章、质量管理体系与措施(0.00分-5.00分)',    name:'4',name1:'3.3',name2:'9'},
          {num:'第三章、安全管理体系与措施(0.00分-5.00分)',    name:'8',name1:'4.1',name2:'2'},
          {num:'第四章、环境保护管理体系与措施(0.00分-5.00分)',name:'5.3',name1:'2.8',name2:'3'},
          {num:'第五章、工程进度计划与措施(0.00分-5.00分)',    name:'4.5',name1:'3',name2:'4'},
          {num:'第六章、资源配备计划(0.00分-1.00分)',         name:'3.7',name1:'4',name2:'5'},
          {num:'第七章、施工设备(0.00分-2.00分)',             name:'5.9',name1:'8',name2:'6.5'},
          {num:'第八章、试验,检测仪器设备(0.00分-2.00分)',     name:'2.0',name1:'1',name2:'1.5'},
          {num:'技术小计(分)',                               name:'38.4',name1:'31.2',name2:'36'},
          {num:'总分小计(分)',name:'53.2',name1:'47.2',name2:'53'}
        ],
        currentPage4: 1
      }
      
    },
    mounted(){
    },
    methods: {   
      onTabClick1(tab, event){
        this.$commonFun.onTabClick1(tab, event, '6', '1', this);
      },
      saveData(){
        
      },
      submitData(){
        this.$commonFun.exam_operation_answer_calc();
        this.changeView('/operation/zjps/zhpbbf/businessAffairs4');
        this.$loaclStore.set('zhpbbf_技术isSubmit', true);
      },
      changeView(name){      //路由跳转传参函数
          window.location.href = name;
      },   
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 0||rowIndex === 1||rowIndex === 2||rowIndex === 3||rowIndex === 4||rowIndex === 5||rowIndex === 6||rowIndex === 7) {
          return 'success-row';
        }
        return '';
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


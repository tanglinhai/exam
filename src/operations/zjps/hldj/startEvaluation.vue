<template>
  <div class="aaa">
    <div class="aaa_a">
      <el-row :gutter="20">
        <el-col :span="10">
          <div class="grid-content bg-purple aaa_aleft">
            <span>标名称：<em>tih招标项目-专家评标2</em></span>
            <span>标号：<em>0635-1909n987</em></span>
            <span>包号：<em>0635-1909n987/1</em></span>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple aaa_aright">
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

    <div class="aaa_b">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-circle-check"></i> 资格审查项</span>
          <div>
            <el-row :gutter="20">
              <el-col :span="4">
                <div class="grid-content bg-purple aaa_bleft">
                  <h6>审查项</h6>
                  <!---->
                  <div class="content_wrap">
                    <div class="zTreeDemoBackground left">
                      <ul id="treeDemo" class="ztree"></ul>
                    </div>
                  </div>
                  <!---->
                  <el-button class="a_bleft_btn" type="success" size="small">个人资格审查项表</el-button>
                </div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple aaa_bright a1" style="display:block;">
                  <el-row :gutter="20">
                    <el-col :span="1" style="padding:0px;">
                      <div class="grid-content bg-purple" style="text-align:left; font-size:14px;">我的进度</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple" style="text-align:left;">
                        <el-progress :percentage="0"></el-progress>
                      </div>
                    </el-col>
                    <el-row :span="10" style="padding:0px; float:right;">
                        <el-button @click="quanbu" size="mini" type="info">全部合格</el-button>
                        <el-button size="mini" type="info" @click="allSubmit">全部提交</el-button>
                    </el-row>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="24" style="padding:0px;">
                      <div class="grid-content bg-purple" style="text-align:left; font-size:14px;">资格审查项：专业资质是否达标？</div>
                    </el-col>
                  </el-row>
                  <template>
                      <el-row class="qu">
                          <el-col :span="24">
                              <div class="grid-content bg-purple" style="padding-left:5px;">
                                  审查标准：专业等级三级以上？
                              </div>
                          </el-col>
                      </el-row>
                      <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                        <el-table-column
                          prop="name"
                          label="名称">
                          <template slot-scope="scope">
                            <span style="margin-left: 10px">投标人：<i class="el-icon-search fs14 mr3"></i>{{scope.row.name}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="pass"
                          label="是否合格">
                          <template slot-scope="scope">
                            <span style="margin-left: 10px">
                              <el-radio-group @change="hahaha(scope.row.radio,scope.row.id)" ref="shet" v-model="scope.row.radio">
                                <el-radio :label="scope.row.ra1">合格</el-radio>
                                <el-radio :label="scope.row.ra2" >不合格</el-radio>
                              </el-radio-group>
                            </span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="kong"
                          label="">
                          <template>
                            <span style="margin-left: 10px">
                            </span>
                          </template>
                        </el-table-column>
                      </el-table>
                  </template>

                  <el-row :gutter="20">
                    <el-col :span="24" style="padding:0px;">
                      <div class="grid-content bg-purple" style="text-align:left; font-size:14px;">资格审查项：公司投资金额是否达标？</div>
                    </el-col>
                  </el-row>
                  <template>
                      <el-row class="qu">
                          <el-col :span="24">
                              <div class="grid-content bg-purple" style="padding-left:5px;">
                                  审查标准：公司投资金额是否达到20000万以上？
                              </div>
                          </el-col>
                      </el-row>
                      <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                        <el-table-column
                          prop="name"
                          label="名称">
                          <template slot-scope="scope">
                            <span style="margin-left: 10px">投标人：<i class="el-icon-search fs14 mr3"></i>{{scope.row.name}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="pass"
                          label="是否合格">
                          <template slot-scope="scope">
                            <span style="margin-left: 10px">
                              <el-radio-group @change="hahaha(scope.row.radio,scope.row.id)" ref="shet" v-model="scope.row.radio">
                                <el-radio :label="scope.row.ra1">合格</el-radio>
                                <el-radio :label="scope.row.ra2" >不合格</el-radio>
                              </el-radio-group>
                            </span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="kong"
                          label="">
                          <template>
                            <span style="margin-left: 10px">
                            </span>
                          </template>
                        </el-table-column>
                      </el-table>
                  </template>
                </div>
                <div class="grid-content bg-purple aaa_bright a2">
                  <div class="a_bright_title">
                    <span>分包号：0635-1909N987/1[第一包]</span>
                    <span>评标委员会：0635-1909N987/1评委会</span>
                  </div>
                  <!--表格-->
                  <template>
                    <el-table
                      :data="tableData3"
                      :span-method="arraySpanMethod"
                      style="width: 100%">
                      <el-table-column
                        prop="number"
                        align="center"
                        label="序号"
                        width="100">
                      </el-table-column>
                      <el-table-column
                        prop="date"
                        align="center"
                        label="评审因素">
                      </el-table-column>
                      <el-table-column
                      label="投标人"
                      align="center"
                      >
                          <el-table-column
                            prop="province"
                            align="center"
                            label="阿里巴巴(2)">
                          </el-table-column>
                          <el-table-column
                            prop="city"
                            align="center"
                            label="普瑞太阳能有限公司(测试)(2)">
                          </el-table-column>
                          <el-table-column
                            prop="name"
                            align="center"
                            label="夏丰热工研究院有限公司(测试)(3)">
                          </el-table-column>
                      </el-table-column>
                    </el-table>
                  </template>
                  <!--表格-->
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" @click="changeView"><i class="el-icon-edit"></i> 资格审查项汇总</span>
          <!-- 资格审查项汇总 -->
        </el-tab-pane>
        <el-tab-pane disabled>
          <span slot="label"><i class="el-icon-edit"></i> 符合性审查项</span>
        </el-tab-pane>
        <el-tab-pane disabled>
          <span slot="label"><i class="el-icon-edit"></i> 符合性审查项汇总</span>
        </el-tab-pane>
        <el-tab-pane disabled>
          <span slot="label"><i class="el-icon-edit"></i> 详细评审（技术）</span>
        </el-tab-pane>
        <el-tab-pane disabled>
          <span slot="label"><i class="el-icon-edit"></i> 详细评审（技术）汇总</span>
        </el-tab-pane>
        <el-tab-pane disabled>
          <span slot="label"><i class="el-icon-edit"></i> 评审汇总</span>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="不合格录入"
      :visible.sync="dialogVisible"
      width="700px"
    >
      <FailureEntry></FailureEntry>
    </el-dialog>
  </div>
</template>
<script>
  import FailureEntry from '../dialog/FailureEntry'
  export default {
    name: 'updateBill',
    props:{
    },
    components: {
      FailureEntry
    },
    data () {
      return {
        dialogVisible:false,//不合格录入
        tableData3: [{
          number:'1',
          date: '1',
          name: '√',
          province: '√',
          city: '√',
        }, {
          number:'2',
          date: '11',
          name: '√',
          province: '√',
          city: '√',
        }, {
          number:'结论',
          date: '是否通过资格审查项检查',
          name: '合格',
          province: '合格',
          city: '合格',
        }, {
          number:'注：1.凡资格审查项中任何一条未通过评审要求的投标人，即界定为无效投标人。2.评标委员会各成员在表格相应位置中记录各投标人是否符合要求，符合要求打"√",不符合要求打"×",结论为"合格",或"不合格"',
          date: '',
          name: '',
          province: '',
          city: '',
        }],
        tableData: [{
          people: '招标人1：',
          name: '[1]重庆网控科技发展有限公司',
          pass: '1',
          kong:'',
          ra1:'合格',
          ra2:'不合格',
          radio: '',
          id:2222
        }, {
          people: '招标人2：',
          name: '[2] 普瑞太阳能有限公司',
          pass: '2',
          kong:'',
          ra1:'合格',
          ra2:'不合格',
          radio: '',
          id:3333
        },{
          people: '招标人2：',
          name: '[2] 普瑞太阳能有限公司',
          pass: '2',
          kong:'',
          ra1:'合格',
          ra2:'不合格',
          radio: '',
          id:55555
        }],
        allRadio:[],
      }

    },
    mounted(){
    var setting = {
			view: {
				dblClickExpand: dblClickExpand
			},
			data: {
				simpleData: {
					enable: true
				}
			}
		};

		var zNodes =[
			{ id:1, pId:0, name:"资格审查项", open:true},
			{ id:11, pId:1, name:"专业资质是否达标", open:false},
			{ id:12, pId:1, name:"公司投资金额是否达标", open:false},

		];

		function dblClickExpand(treeId, treeNode) {
			return treeNode.level > 0;
		}

		$(document).ready(function(){
			$.fn.zTree.init($("#treeDemo"), setting, zNodes);
		});
      setTimeout(function(){
        $("#treeDemo_1_a").addClass("curSelectedNode");
      },200)
      $("#treeDemo").on('click','#treeDemo_1_a',function(){
        $(".a1").show();
        $(".a2").hide();
      });
      $(".a_bleft_btn").click(function(){
        $(".a2").show();
        $(".a1").hide();
      })
    },
    methods: {
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      //  console.log(row, column, rowIndex, columnIndex)
        if (rowIndex === 3) {
          return [1, 5];
        }
      },

      hahaha(radio,id){
        // console.log(radio,id)
        if(radio=='不合格'){
          this.dialogVisible=true
        }
        this.cover(this.allRadio,id,radio);
        this.$loaclStore.set('isSubmit',false);
      },

      // 本地存储local封装
      cover(num,id,radio){
        num.push({
          id:id,
          value:radio,
        });
        let str={};
        num.forEach(item => {
          str[item.id]=item;
        })
        let ps=Object.values(str);
        this.$loaclStore.set('msg',ps);
      },

      quanbu(){
        for(var i = 0;i<this.tableData.length;i++){
          this.tableData[i].radio='合格';
          this.cover(this.allRadio,this.tableData[i].id,this.tableData[i].radio);
          this.$loaclStore.set('isSubmit',false);
        }
      },
      changeView(){      //路由跳转传参函数
        window.location.href = '/operation/zjps/hldj/unFinishQualificationsResult';
      },
      allSubmit(){
        this.$loaclStore.set('isSubmit',true);
        let mssg=this.$loaclStore.get('msg');
        if(mssg.length != this.tableData.length){
          this.$message({
            message: '请选择合格/不合格',
            center: true
          });
        }else{
          this.$router.push({
            path: '/operation/zjps/hldj/myQualificationsResult'
          })
        }
      }
    },
  }



</script>

<style lang="scss">
  .aaa{
    background:white;
    border-radius:5px;
    overflow: hidden;
    .aaa_a{
      background:#c8d3d8;
      //height:42px;
      .el-row{
        margin-left:0px!important;
        margin-right:0px!important;
        .aaa_aleft{
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
        .aaa_aright{
          float: right;
          button{
            margin-top:5px;
          }
        }
      }
    }
    .aaa_b{
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
      .el-tabs--border-card>.el-tabs__content{
        padding:15px 0px;
        margin-top:85px;
      }
      .el-col-4,.el-row{
        padding-left:0px!important;
        padding-right:0px!important;
        margin-left:0px!important;
        margin-right:0px!important;
      }
      .aaa_bleft{
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
      .aaa_bright{
        display:none;
        .a_bright_title{
          margin-bottom:10px;
          span{
            font-size:14px;
            margin-right:20px;
          }
        }
      }
      .a1{
        .el-progress-bar__outer{
          border-radius:0px;
          height:10px!important;
          margin-top:-3px;
        }
        .el-table__header-wrapper{
          display:none;
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
  }
</style>


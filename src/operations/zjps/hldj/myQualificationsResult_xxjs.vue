<template>
  <div class="quexa">
    <div class="quexa_a">
      <el-row :gutter="20">
        <el-col :span="10">
          <div class="grid-content bg-purple quexa_aleft">
            <span>标名称：<em>tih招标项目-专家评标2</em></span>
            <span>标号：<em>0635-1909n987</em></span>
            <span>包号：<em>0635-1909n987/1</em></span>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple quexa_aright">
            <el-button type="primary" size="small" icon="el-icon-circle-check-outline" @click="checkAllScoreReaultBtn">查看全部打分结果</el-button>
            <el-button type="primary" size="small" icon="el-icon-circle-check-outline" @click="abandonedTenderBtn">废标</el-button>
            <el-button type="primary" size="small" icon="el-icon-circle-check-outline" @click="inquiryBtn">标中质询</el-button>
            <el-button type="primary" size="small" icon="el-icon-tickets"><a href="/static/docs/zhaoBiaoFile.pdf" target="_blank" style="color:#fff;">查看招标文件</a></el-button>
            <el-button type="primary" size="small" icon="el-icon-tickets"  @click="checkBidOpeningListBtn">查看开标一览表</el-button>
            <el-button type="primary" size="small" icon="el-icon-tickets" @click="bindResultSign" >评标结果签字</el-button>
            <el-button type="primary" size="small" icon="el-icon-tickets" @click="qualificationSign">资格审查签字</el-button>
            <el-button type="primary" size="small" icon="el-icon-d-arrow-left">返回</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="quexa_b">
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
          <span slot="label" class="paddmar"><i class="el-icon-circle-check"></i> 详细评审（技术）</span>
          <div>
            <el-row :gutter="20">
              <el-col :span="4">
                <div class="grid-content bg-purple quexa_bleft">
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
                <div class="grid-content bg-purple quexa_bright a1" style="display:block;">
                  <el-row :gutter="20">
                    <el-col :span="1" style="padding:0px;">
                      <div class="grid-content bg-purple" style="text-align:left; font-size:14px;">我的进度</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple" style="text-align:left;">
                        <el-progress :percentage="100"></el-progress>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col>
                      <div class="grid-content bg-purple" style="text-align:left; font-size:14px;padding-bottom:15px;">资格审查项：专业资质是否达标？</div>
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
                        :show-header="false"
                        style="width: 100%">
                        <el-table-column
                            label="名称"
                            width="120px">
                            <template slot-scope="scope">
                                <i class="iconfont icon-queren"></i><span style="margin-left: 5px">{{scope.row.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="1q11">
                            <template slot-scope="scope">
                                <i class="iconfont icon-chaxun"></i><span style="margin-left: 5px">{{scope.row.date}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="1q22">
                            <template slot-scope="scope">
                                <span style="color:red;">{{scope.row.address}}</span>
                            </template>
                        </el-table-column>
                      </el-table>
                  </template>
                  <el-row>
                    <el-col :span="24">
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
                        :data="tableData11"
                        border
                        :show-header="false"
                        style="width: 100%">
                        <el-table-column
                            label="名称"
                            width="120px">
                            <template slot-scope="scope">
                                <i class="iconfont icon-queren"></i><span style="margin-left: 5px">{{scope.row.name}}：</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="1q11">
                            <template slot-scope="scope">
                                <i class="iconfont icon-chaxun"></i><span style="margin-left: 5px">{{scope.row.date}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="1q22">
                            <template slot-scope="scope">
                                <span style="color:red">{{scope.row.address}}</span>
                            </template>
                        </el-table-column>
                      </el-table>
                  </template>
                </div>
                <div class="grid-content bg-purple quexa_bright a2">
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
                            label="重庆网控科技发展有限公司">
                          </el-table-column>
                          <el-table-column
                            prop="city"
                            align="center"
                            label="普瑞太阳能有限公司">
                          </el-table-column>
                          <el-table-column
                            prop="name"
                            align="center"
                            label="夏丰热工研究院有限公司">
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
       <el-tab-pane name="6" :disabled="tabDisabled[5]">
          <span slot="label" class="paddmar"><i class="el-icon-circle-check xxhz"></i> 详细评审（技术）汇总</span>
        </el-tab-pane>
        <el-tab-pane name="7" :disabled="tabDisabled[6]">
          <span slot="label" class="paddmar" @click="pshz"><i class="el-icon-circle-check pshz"></i> 评审汇总</span>
        </el-tab-pane>
      </el-tabs>
    </div>
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
  import SignatureReviewResult from '../dialog/SignatureReviewResult';
  import CheckAllScoreReault from '../dialog/CheckAllScoreReault';
  import AbandonedTender from '../dialog/AbandonedTender';
  import StandardChallengeInformation from '../dialog/StandardChallengeInformation';
  import CheckBidOpeningList from '../dialog/CheckBidOpeningList';
  export default {
    name: 'updateBill',
    props:{
    },
    components: {
      SignatureReviewResult,
      AbandonedTender,
      CheckAllScoreReault,
      StandardChallengeInformation,
      CheckBidOpeningList,
    },
    data () {
      return {
        dialogCheckBidOpeningList:false,//查看开标一览表
        dialogStandardChallengeInformation:false,//标中质询信息表
        dialogAbandonedTender:false,
        dialogCheckAllScoreReault:false,//查看全部打分结果
        activeName:'5',
        tabDisabled:[],
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
          date: '重庆网控科技发展有限公司',
          name: '投标人',
          address: ''
        }, {
          date: '普瑞太阳能有限公司',
          name: '投标人',
          address: ''
        }, {
          date: '夏丰热工研究院有限公司',
          name: '投标人',
          address: ''
        }],
        tableData11: [{
          date: '重庆网控科技发展有限公司',
          name: '投标人',
          address: ''
        }, {
          date: '普瑞太阳能有限公司',
          name: '投标人',
          address: ''
        }, {
          date: '夏丰热工研究院有限公司',
          name: '投标人',
          address: ''
        }],
        dialogVisibleSignatureReviewResult:false
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
    let xxhz=this.$loaclStore.get('详细评审（技术）项汇总是否提交');
    let pshz=this.$loaclStore.get('评审汇总是否提交');
		$(document).ready(function(){
      $.fn.zTree.init($("#treeDemo"), setting, zNodes);
      if(xxhz)$('.xxhz').css('color','#85ce61');
      if(pshz)$('.pshz').css('color','#85ce61');
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


      let zgsc1=this.$loaclStore.get('详细评审（技术）1');
      let zgsc2=this.$loaclStore.get('详细评审（技术）2');
      zgsc1.forEach((val,index) => {
          this.tableData[index].address = val.radio;
      })
      zgsc2.forEach((val,index) => {
          this.tableData11[index].address = val.radio;
      })
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
      onTabClick(tab, event){
        this.$commonFun.onTabClick(tab, event, '5', '2', this);
      },
       viewChange(name){
        this.$router.push({path:`${name}`});
      },
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 3) {
          return [1, 5];
        }
      },
      pshz(){
        if(this.$loaclStore.get('submitView') == true){
          window.location.href='/operation/zjps/hldj/reviewSummary'
        }else{
          return;
        }
      }

    },
  }



</script>

<style lang="scss">
  .quexa{
    background:white;
    border-radius:5px;
    overflow: hidden;
    .quexa_a{
      background:#c8d3d8;
      height:42px;
      .el-row{
        margin-left:0px!important;
        margin-right:0px!important;
        .quexa_aleft{
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
        .quexa_aright{
          float: right;
          button{
            margin-top:5px;
          }
        }
      }
    }
    .quexa_b{
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
      .quexa_bleft{
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
      .quexa_bright{
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
        .el-progress-bar__inner{
            background: #35D437;
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
  }
</style>


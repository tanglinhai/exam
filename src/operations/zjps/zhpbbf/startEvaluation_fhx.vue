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
            <el-button type="primary" size="small" icon="el-icon-circle-check-outline" @click="checkAllScoreReaultBtn">查看全部打分结果</el-button>
            <el-button type="primary" size="small" icon="el-icon-circle-check-outline" @click="abandonedTenderBtn">废标</el-button>
            <el-button type="primary" size="small" icon="el-icon-circle-check-outline" @click="inquiryBtn">标中质询</el-button>
            <el-button type="primary" size="small" icon="el-icon-tickets"><a href="/static/docs/zhaoBiaoFile.pdf" target="_blank" style="color:#fff;">查看招标文件</a></el-button>
            <el-button type="primary" size="small" icon="el-icon-tickets" @click="checkBidOpeningListBtn">查看开标一览表</el-button>
            <el-button type="primary" size="small" icon="el-icon-tickets" @click="bindResultSign">评标结果签字</el-button>
            <el-button type="primary" size="small" icon="el-icon-tickets" @click="qualificationSign" >资格审查签字</el-button>
            <el-button type="primary" size="small" icon="el-icon-d-arrow-left" @click="backBtn">返回</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="aaa_b">
      <el-tabs type="border-card" v-model="activeName" @tab-click="onTabClick1">
        <el-tab-pane name="1" :disabled="tabDisabled[0]">
          <span slot="label" class="paddmar"><i class="el-icon-circle-check" style="color:#85ce61;"></i> 资格审查项</span>
        </el-tab-pane>
        <el-tab-pane name="2" :disabled="tabDisabled[1]">
          <span slot="label" class="paddmar"><i class="el-icon-circle-check" style="color:#85ce61;"></i> 资格审查项汇总</span>
          <!-- 资格审查项汇总 -->
        </el-tab-pane>
        <el-tab-pane name="3" :disabled="tabDisabled[2]">
          <span slot="label" class="paddmar"><i class="el-icon-circle-check"></i> 符合性审查项</span>
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
                        <el-progress :percentage="completePercent"></el-progress>
                      </div>
                    </el-col>
                    <el-row :span="10" style="padding:0px; float:right;">
                        <el-button @click="quanbu" size="mini" plain type="primary">全部合格</el-button>
                        <el-button size="mini" type="primary" @click="allSubmit">全部提交</el-button>
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
                              <el-radio-group @change="failuredRadio(scope.row.radio,scope.row.id, scope.$index, 'tableData')" ref="shet" v-model="scope.row.radio">
                                <el-radio :label="scope.row.ra1">合格</el-radio>
                                <el-radio :label="scope.row.ra2" >不合格</el-radio>
                              </el-radio-group>
                            </span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop=""
                          label="">
                          <template slot-scope="scope">
                            <span style="margin-left: 10px">
                              {{scope.row.content}}
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
                        :data="tableData11"
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
                              <el-radio-group @change="failuredRadio(scope.row.radio,scope.row.id, scope.$index, 'tableData11')" ref="shet" v-model="scope.row.radio">
                                <el-radio :label="scope.row.ra1">合格</el-radio>
                                <el-radio :label="scope.row.ra2" >不合格</el-radio>
                              </el-radio-group>
                            </span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop=""
                          label="">
                          <template slot-scope="scope">
                            <span style="margin-left: 10px">
                              {{scope.row.content}}
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
        <el-tab-pane name="4" :disabled="tabDisabled[3]">
          <span slot="label" class="paddmar"><i class="el-icon-circle-check"></i> 符合性审查项汇总</span>
        </el-tab-pane>
        <el-tab-pane name="5" :disabled="tabDisabled[4]">
          <span slot="label" class="paddmar"><i class="el-icon-circle-check"></i> 商务</span>
        </el-tab-pane>
        <el-tab-pane name="6" :disabled="tabDisabled[5]">
          <span slot="label" class="paddmar"><i class="el-icon-circle-check"></i> 技术</span>
        </el-tab-pane>
        <el-tab-pane name="7" :disabled="tabDisabled[6]">
          <span slot="label" class="paddmar"><i class="el-icon-circle-check"></i> 评审汇总</span>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="不合格录入"
      :visible.sync="dialogVisible"
      width="700px"
    >
      <FailureEntry @childByValue="childByValue"></FailureEntry>
    </el-dialog>
    <el-dialog
      title="签字"
      :visible.sync="dialogVisibleSignatureReviewResult"
      width="1700px"
    >
      <SignatureReviewResult ></SignatureReviewResult>
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
  import FailureEntry from '../dialog/FailureEntry';
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
      FailureEntry,
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
        dialogVisibleSignatureReviewResult:false,
        activeName:'3',
        tabDisabled:[],
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
          index:0,
          people: '招标人1：',
          name: '[1]重庆网控科技发展有限公司',
          pass: '1',
          content:'',
          ra1:'合格',
          ra2:'不合格',
          radio: '',
          id:1,
        }, {
          index:1,
          people: '招标人2：',
          name: '[2] 普瑞太阳能有限公司',
          pass: '2',
          content:'',
          ra1:'合格',
          ra2:'不合格',
          radio: '',
          id:2,
        },{
          index:2,
          people: '招标人2：',
          name: '[2] 夏丰热工研究院有限公司',
          pass: '2',
          content:'',
          ra1:'合格',
          ra2:'不合格',
          radio: '',
          id:3,
        }],
        tableData11: [{
          index:3,
          people: '招标人1：',
          name: '[1]重庆网控科技发展有限公司',
          pass2: '1',
          content:'',
          ra1:'合格',
          ra2:'不合格',
          radio: '',
          id:4,
        }, {
          index:4,
          people: '招标人2：',
          name: '[2] 普瑞太阳能有限公司',
          pass2: '2',
          content:'',
          ra1:'合格',
          ra2:'不合格',
          radio: '',
          id:5,
        },{
          index:5,
          people: '招标人2：',
          name: '[2] 夏丰热工研究院有限公司',
          pass2: '2',
          content:'',
          ra1:'合格',
          ra2:'不合格',
          radio: '',
          id:6,
        }],
        allRadio:[],
        idradionoprss:'',//table不合格的id
        checkedNumRadio:"",
        d:0
      }
    },
    computed: {
      completePercent(){
        let a=this.tableData11.length;
        let b=this.tableData.length;
        let s=a+b;
        let fillCount = 0;
        for(var i=0;i<this.tableData.length;i++){
          if(this.tableData[i].radio){
            fillCount++;
          }
        }
        for(var i=0;i<this.tableData11.length;i++){
          if(this.tableData11[i].radio){
            fillCount++;
          }
        }
        return Math.floor(fillCount /( this.tableData11.length +this.tableData.length)*100);
      }
    },
    mounted(){
      //获取之前的选择的值
      var tableData = this.$loaclStore.get(this.$commonFun.StoredValue(this)+'zhpbbf_符合性审查项1');
      var tableData11 = this.$loaclStore.get(this.$commonFun.StoredValue(this)+'zhpbbf_符合性审查项2');
      if(tableData){
        this.tableData = tableData;
      }
      if(tableData11){
        this.tableData11 = tableData11;
      }

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
      },200);
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
      backBtn(){   //顶部的返回按钮事件
        this.$commonFun.backBtn2();
      },
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
      checkAllScoreReaultBtn(){
        this.dialogCheckAllScoreReault=true;
      },
      qualificationSign(){
        this.dialogVisibleSignatureReviewResult=true;
      },
      bindResultSign(){
        this.dialogVisibleSignatureReviewResult=true;
      },
       onTabClick1(tab, event){
        this.$commonFun.onTabClick1(tab, event, '3', '1', this);
      },
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 3) {
          return [1, 5];
        }
      },

      failuredRadio(radio,id,index, tableKey){
        var store_radio = null;
        for(var i = 0;i<this[tableKey].length;i++){
          if(this[tableKey][i].id==id){
            store_radio = this[tableKey][i];
            break;
          }
        }
        if(radio=='不合格'){
          this.dialogVisible=true;
          this.idradionoprss = id;
        }else if(radio=='合格'){
          store_radio.content = '';
          this.saveStorage();
        }
      },
      // 本地存储local封装
      saveStorage(){
        this.$loaclStore.set(this.$commonFun.StoredValue(this)+'zhpbbf_符合性审查项1',this.tableData);
        this.$loaclStore.set(this.$commonFun.StoredValue(this)+'zhpbbf_符合性审查项2',this.tableData11);
      },
      isAllFilled(){
        var tableData = this.$loaclStore.get(this.$commonFun.StoredValue(this)+'zhpbbf_资格审查项1');
        var tableData11 = this.$loaclStore.get(this.$commonFun.StoredValue(this)+'zhpbbf_资格审查项2');
        var isAllF = true;
        for(var i=0;i<tableData.length;i++){
          if(!tableData[i].radio){
            isAllF = false;
            break;
          }
        }
        for(var i=0;i<tableData11.length;i++){
          if(!tableData11[i].radio){
            isAllF = false;
            break;
          }
        }
        return isAllF;
      },
      quanbu(){
        for(var i = 0;i<this.tableData.length;i++){
          this.tableData[i].radio='合格';
        }
        for(var i = 0;i<this.tableData11.length;i++){
          this.tableData11[i].radio='合格';
        }
        this.saveStorage();
      },
      viewChange(name){
        this.$router.push({path:`${name}`});
      },
      changeView(){      //路由跳转传参函数
        window.location.href = '/operation/zjps/zhpbbf/unFinishQualificationsResult_fhx';
      },
      isAllFilled(){
        var tableData = this.$loaclStore.get(this.$commonFun.StoredValue(this)+'zhpbbf_符合性审查项1');
        var tableData11 = this.$loaclStore.get(this.$commonFun.StoredValue(this)+'zhpbbf_符合性审查项2');
        var isAllF = true;
        for(var i=0;i<tableData.length;i++){
          if(!tableData[i].radio){
            isAllF = false;
            break;
          }
        }
        for(var i=0;i<tableData11.length;i++){
          if(!tableData11[i].radio){
            isAllF = false;
            break;
          }
        }

        return isAllF;
      },
      allSubmit(){
        this.$loaclStore.set(this.$commonFun.StoredValue(this)+'zhpbbf_符合性审查isSubmit',true);
        let mssg=this.$loaclStore.get(this.$commonFun.StoredValue(this)+'zhpbbf_符合性审查项1');
        let mssg11=this.$loaclStore.get(this.$commonFun.StoredValue(this)+'zhpbbf_符合性审查项2');
        if(!this.isAllFilled()){
          this.$message({
            message: '请选择合格/不合格',
            center: true
          });
        }else{
          this.$router.push({
            path: '/operation/zjps/zhpbbf/myQualificationsResult_fhx'
          })
        }
      },
      childByValue: function (childValue) {
        // childValue就是子组件传过来的值
        for(var i = 0;i<this.tableData.length;i++){
          if(this.tableData[i].id==this.idradionoprss){
            this.tableData[i].content=childValue;
          }
        }
        for(var i = 0;i<this.tableData11.length;i++){
          if(this.tableData11[i].id==this.idradionoprss){
            this.tableData11[i].content=childValue;
          }
        }
        this.saveStorage();
        this.dialogVisible=false;
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


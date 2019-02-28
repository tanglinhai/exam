<template>
  <div class="signatureReviewResult">
    <el-row class="top clearfix" >
      <el-col  class="left pull-left">
        <div class="logo_div" >
          <img  v-lazy="logoSrc" alt="logo" class="logo">
        </div>
        <div class=" width90">
          <el-row class="marginT15">
            <el-col :span="16" > <i class="fa fa-user-circle" style="font-size:16px"></i>&nbsp;&nbsp;<span>新增专家一号</span></el-col>
            <el-col :span="8"><el-button type="primary" @click="lookAlldata" size="small">查看所有文档</el-button></el-col>
          </el-row>
          <div class="he479">
            <div class="table1">
              <el-button type="primary" size="small" >我的签名文档</el-button>
              <el-table
                :data="tableData1"
                style="width: 100%">
                <el-table-column
                  prop="docName"
                  label="文件名称"
                >
                  <template slot-scope="scope">
                    <span @click="changeImg(scope.row)" class="curPoint">{{scope.row.docName}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="creationTime"
                  label="创建时间"
                  width="150px"
                >
                  <template slot-scope="scope">
                    <span @click="changeImg(scope.row)" class="curPoint">{{scope.row.creationTime}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="状态"
                  width="80px"
                >
                  <template slot-scope="scope">
                    <span class="coreds curPoint statusColor" @click="changeImg(scope.row)">{{scope.row.status}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="table2">
              <el-button type="primary" size="small">我的签名文档</el-button>
              <el-table
                :data="tableData2"
                style="width: 100%">
                <el-table-column
                  prop="docName"
                  label="文件名称"
                >
                  <template slot-scope="scope">
                    <span @click="changeImg2(scope.row)" class="curPoint">{{scope.row.docName}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="creationTime"
                  label="创建时间"
                  width="150px"
                >
                  <template slot-scope="scope">
                    <span @click="changeImg2(scope.row)" class="curPoint">{{scope.row.creationTime}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="状态"
                  width="80px"
                >
                  <template slot-scope="scope">
                    <span class="coreds curPoint statusColor" @click="changeImg2(scope.row)">{{scope.row.status}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <el-row class="text-center marginT30">
          <span class="tishi" v-if="refresh">请稍后,系统正在处理签名，完成后系统会自动刷新</span>
          <el-button v-if="qianminhuizhi" type="warning" size="medium" round @click="innerVisible = true">批量签字</el-button>
          <a v-else id="more2" href="/static/docs/zhaoBiaoFile.pdf" download="" class="btn2">签名回执</a>
        </el-row>
      </el-col>
      <el-col  class="right pull-right">
        <div class="right_top">
          <el-col :span="9">
            <ul >
              <li class="words">招标项目名称:</li>
              <li  class="boldWords">雄安施工项目总承包（施工类）001</li>
            </ul>
          </el-col >
          <el-col  :span='5'>
            <ul>
              <li class="words">招标项目编号:</li>
              <li class="boldWords">0635-1809G281</li>
            </ul>
          </el-col>
          <el-col  :span='5'>
            <ul>
              <li class="words">包编号:</li>
              <li class="boldWords">0635-1809G281/1</li>
            </ul>
          </el-col>
          <el-col  :span='5'>
            <ul>
              <li class="words">包名称:</li>
              <li class="boldWords">第1包</li>
            </ul>
          </el-col>
        </div>
        <div class="right_main">
          <img  v-lazy="morenSrc" ref="morenSrc" class="morenSrc">
        </div>
      </el-col>
    </el-row>
    <el-dialog
    width="410px"
    title="二维码"
    :visible.sync="innerVisible"
    append-to-body
    class="Sign"
    >
      <div class="batch-signature">
        <p class="coreds marginB10 text-center" >请扫描二维码提交签名</p>
        <img v-lazy="downloadSrc" alt="扫描二维码" class="paddingL50">
        <div class="moniTelBtn">
        </div>
        <el-button class="moniBtns" @click="moniqianmin" size="small">模拟手机签名</el-button>
        <p class="coreds marginT10 marginB15 text-center">如果签名已完成，该页面会自动刷新</p>
      </div>
  </el-dialog>
  <!--组长-->
  <el-dialog
    title="组长查看签字"
    :visible.sync="leaderdialogVisible"
    width="1700px"
    style="padding-bottom:100px;"
    append-to-body
    >
    <div class="signatureReviewResult">
      <el-row class="top clearfix" >
        <el-col  class="left pull-left">
          <div class="logo_div" >
            <img  v-lazy="logoSrc" alt="logo" class="logo">
          </div>
          <div class="width90">
            <el-row class="marginT15 leaderSelect">
              <el-col :span="15" > <i class="fa fa-user-circle" style="font-size:16px"></i>&nbsp;&nbsp;<span>新增专家一号</span></el-col>
              <el-col :span="9">
                <el-select size="small" v-model="valueOption" @change="leaderSelectVal(valueOption)" placeholder="请选择">
                  <el-option
                  v-for="item in options"
                  :key="item.valueOption"
                  :label="item.label"
                  :value="item.valueOption"
                  >

                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <div class="he479">
              <div class="table1" v-if="oneShow">
                <div class="leaderTip">
                  <el-button type="text" size="small" >新增专家一号</el-button>
                  <el-button style="float:right; margin-right:12px;" type="text" size="small" >会签文档</el-button>
                </div>
                <el-table
                  :data="tableData1"
                  :header-cell-style="getRowClass"
                  style="width: 100%">
                  <el-table-column
                    prop="docName"
                    label="文件名称"
                  >
                    <template slot-scope="scope">
                      <span @click="leaderChangeImg(scope.row)" class="curPoint">{{scope.row.docName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="creationTime"
                    label="创建时间"
                    width="150px"
                  >
                    <template slot-scope="scope">
                      <span @click="leaderChangeImg(scope.row)" class="curPoint">{{scope.row.creationTime}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="status"
                    label="状态"
                    width="80px"
                  >
                    <template slot-scope="scope">
                      <span class="leaderSpan leaderOneStatus coreds curPoint statusColor" @click="leaderChangeImg(scope.row)">{{scope.row.status}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="table2" v-if="twoShow">
                <div class="leaderTip">
                  <el-button type="text" size="small" >新增专家二号</el-button>
                  <el-button style="float:right; margin-right:12px;" type="text" size="small" >会签文档</el-button>
                </div>
                <el-table
                  :data="tableData2"
                  :header-cell-style="getRowClass"
                  style="width: 100%">
                  <el-table-column
                    prop="docName"
                    label="文件名称"
                  >
                    <template slot-scope="scope">
                      <span @click="leaderChangeImg2(scope.row)" class="curPoint">{{scope.row.docName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="creationTime"
                    label="创建时间"
                    width="150px"
                  >
                    <template slot-scope="scope">
                      <span @click="leaderChangeImg2(scope.row)" class="curPoint">{{scope.row.creationTime}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="status"
                    label="状态"
                    width="80px"
                  >
                    <template slot-scope="scope">
                      <span class="leaderSpan coreds curPoint statusColor" @click="leaderChangeImg2(scope.row)">{{scope.row.status}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-col>
        <el-col  class="right pull-right">
          <div class="right_top">
            <el-col :span="9">
              <ul >
                <li class="words">招标项目名称:</li>
                <li  class="boldWords">雄安施工项目总承包（施工类）001</li>
              </ul>
            </el-col >
            <el-col  :span='5'>
              <ul>
                <li class="words">招标项目编号:</li>
                <li class="boldWords">0635-1809G281</li>
              </ul>
            </el-col>
            <el-col  :span='5'>
              <ul>
                <li class="words">包编号:</li>
                <li class="boldWords">0635-1809G281/1</li>
              </ul>
            </el-col>
            <el-col  :span='5'>
              <ul>
                <li class="words">包名称:</li>
                <li class="boldWords">第1包</li>
              </ul>
            </el-col>
          </div>
          <div class="right_main right_main2" style="width:100%;height:665px; overflow-y:scroll;">
            <img  v-lazy="morenSrc" ref="morenSrc2" class="morenSrc2">
          </div>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
  <!--组长-->

  </div>
</template>

<script>
  export default {
    name: "signature-review-result",
    components: {

    },
    data(){
      return {
        oneShow:true,  //默认第一个展示
        twoShow:true,  //默认第二个展示
        options: [{ //组长页面下拉选框
          valueOption: '全部',
          label: '全部'
        },{   
          valueOption: '新增专家一号',
          label: '新增专家一号'
        }, {
          valueOption: '新增专家二号',
          label: '新增专家二号'
        }],
        valueOption:'全部',
        leaderdialogVisible:false,   //默认组长查看页面不展示
        refresh:false,       //
        qianminhuizhi:true,  //批量签名和签名回执展示隐藏判断
        downloadSrc:require('../../../common/img/download.png'),
        innerVisible: false,
        logoSrc:require('../../../common/img/logo11.png'),
        morenSrc:require('../../../common/img/moren.gif'),
        grzzsc:require('../../../common/img/signature_img/zgxscgrbb_table1.png'),//资格审查个人报表table1
        grzzscSigned:require('../../../common/img/signature_img/zgxscgrbb_table1_signed.png'),//资格审查个人报表完成签名table1

        fhxscgr:require('../../../common/img/signature_img/fhxscgrbb_table1.png'),//符合性审查个人报表table1
        fhxscgrSigned:require('../../../common/img/signature_img/fhxscgrbb_table1_signed.png'),//符合性审查个人报表完成签名table1

        zjgrxxps:require('../../../common/img/signature_img/zjgrxxps_table1.png'),//详细评审表table1
        zjgrxxpsSigned:require('../../../common/img/signature_img/zjgrxxps_table1_signed.png'),//详细评审表完成签名table1

        zgschz2:require('../../../common/img/signature_img/zgschz_table2.png'),//资格审查汇总报表table2
        zgschz2Signed:require('../../../common/img/signature_img/zgschz_table2_signed.png'),//资格审查汇总报表完成签名table2

        fhxschz2:require('../../../common/img/signature_img/fhxschz_table2.png'),//符合性审查汇总报表table2
        fhxschz2Signed:require('../../../common/img/signature_img/fhxschz_table2_signed.png'),//符合性审查汇总报表完成签名table2

        tbrfxdf2:require('../../../common/img/signature_img/tbrfxdf_table2.png'),//投标人分项得分表表table2
        tbrfxdf2Signed:require('../../../common/img/signature_img/tbrfxdf_table2_signed.png'),//投标人分项得分表表完成签名table2

        jgpy2:require('../../../common/img/signature_img/jgpy_table2.png'),//价格评议表table2
        jgpy2Signed:require('../../../common/img/signature_img/jgpy_table2_signed.png'),//价格评议表完成签名table2

        psjghz2:require('../../../common/img/signature_img/psjghz_table2.png'),//评分汇总表table2
        psjghz2Signed:require('../../../common/img/signature_img/psjghz_table2_signed.png'),//评分汇总表完成签名table2

        psbg2:require('../../../common/img/signature_img/psbg_table2.png'),//评审报告table2
        //psbg2Signed:require('../../../common/img/signature_img/psbg_table2_signed.png'),//评审报告完成签名table2

        pswyhpsyj2:require('../../../common/img/signature_img/pswyhpsyj_table2.png'),//评审报告table2
        //pswyhpsyj2Signed:require('../../../common/img/signature_img/pswyhpsyj_table2_signed.png'),//评审报告完成签名table2

        tableData1: [{
          docName: '资格审查个人报表',
          creationTime: '2019-01-11 18:25:04',
          status: '待签'
        }, {
          docName: '符合性审查个人报表',
          creationTime: '2019-01-11 18:25:04',
          status: '待签'
        }, {
          docName: '详细评审表',
          creationTime: '2019-01-11 18:25:04',
          status: '待签'
        }],
        tableData2: [
          {
            docName: '资格审查汇总报表',
            creationTime: '2019-01-11 18:25:04',
            status: '待签'
          }, {
            docName: '符合性审查汇总报表',
            creationTime: '2019-01-11 18:25:04',
            status: '待签'
          }, {
            docName: '投标人分项得分表',
            creationTime: '2019-01-11 18:25:04',
            status: '待签'
          },
          {
            docName: '价格评议表',
            creationTime: '2019-01-11 18:25:04',
            status: '待签'
          }, {
            docName: '评分汇总表',
            creationTime: '2019-01-11 18:25:04',
            status: '待签'
          }, {
            docName: '评审报告',
            creationTime: '2019-01-11 18:25:04',
            status: '待签'
          },
          {
            docName: '评审专家意见表',
            creationTime: '2019-01-11 18:25:04',
            status: '待签'
          }, {
            docName: '评审专家声明书',
            creationTime: '2019-01-11 18:25:04',
            status: '待签'
          }, {
            docName: '评审委员会签字表',
            creationTime: '2019-01-11 18:25:04',
            status: '待签'
          }
        ],
        dialogSign:false
      }
    },
    created(){

    },
    methods:{
      lookAlldata(){    //个人查看所有文档按钮事件
        this.leaderdialogVisible=true;
        setTimeout(()=>{
          console.log($(".leaderOneStatus").text(),11111)
          if($(".leaderOneStatus").text()=="完成完成完成"){
            $(".leaderSpan").addClass("successColor");
          }
        },100)
      },
      leaderSelectVal(valueOption){   //组长下拉获取值
        //console.log(valueOption,1111111111111)
        if(valueOption=="全部"){
          this.oneShow=true;
          this.twoShow=true;
        }else if(valueOption=="新增专家一号"){
          this.oneShow=true;
          this.twoShow=false;
        }else if(valueOption=="新增专家二号"){
          this.oneShow=false;
          this.twoShow=true;
        }
        
      },
      //表头第一行添加背景颜色方法
      getRowClass({row,column,rowIndex,columnIndex}){
        if(rowIndex==0){
            return 'background:#efefef'
        }else{
          return ''
        }
      },
      moniqianmin(){  //模拟手机签名
        let _this=this;
        this.innerVisible=false;
        this.refresh=true;
          setTimeout(() =>{
            _this.tableData1=[{
                docName: '资格审查个人报表',
                creationTime: '2019-01-11 18:25:04',
                status: '完成'
              }, {
                docName: '符合性审查个人报表',
                creationTime: '2019-01-11 18:25:04',
                status: '完成'
              }, {
                docName: '详细评审表',
                creationTime: '2019-01-11 18:25:04',
                status: '完成'
            }];
            _this.tableData2=[{
              docName: '资格审查汇总报表',
              creationTime: '2019-01-11 18:25:04',
              status: '完成'
            }, {
              docName: '符合性审查汇总报表',
              creationTime: '2019-01-11 18:25:04',
              status: '完成'
            }, {
              docName: '投标人分项得分表',
              creationTime: '2019-01-11 18:25:04',
              status: '完成'
            },
            {
              docName: '价格评议表',
              creationTime: '2019-01-11 18:25:04',
              status: '完成'
            }, {
              docName: '评分汇总表',
              creationTime: '2019-01-11 18:25:04',
              status: '完成'
            }, {
              docName: '评审报告',
              creationTime: '2019-01-11 18:25:04',
              status: '完成'
            },
            {
              docName: '评审专家意见表',
              creationTime: '2019-01-11 18:25:04',
              status: '完成'
            }, {
              docName: '评审专家声明书',
              creationTime: '2019-01-11 18:25:04',
              status: '完成'
            }, {
              docName: '评审委员会签字表',
              creationTime: '2019-01-11 18:25:04',
              status: '完成'
            }];
          this.refresh=false;
          this.qianminhuizhi=false;
          $(".statusColor").addClass("successColor");
          
        },3000)
      },
      batchsign_btn(){
        this.dialogSign=true;
      },
      changeImg(obj){
        if(obj.docName=='资格审查个人报表'&&obj.status=='待签'){
          this.$refs.morenSrc.src=this.grzzsc;
          $(".grzzsc").css('width','0');
          $(".morenSrc").css('left','16%');
        }else if(obj.docName=='资格审查个人报表'&&obj.status=='完成'){
          this.$refs.morenSrc.src=this.grzzscSigned;
          $(".grzzsc").css('width','0');
          $(".morenSrc").css('left','16%');
        }
        if(obj.docName=='符合性审查个人报表'&&obj.status=='待签'){
          this.$refs.morenSrc.src=this.fhxscgr;
          $(".fhxscgr").css('width','0');
          $(".morenSrc").css('left','20%');
        }else if(obj.docName=='符合性审查个人报表'&&obj.status=='完成'){
          this.$refs.morenSrc.src=this.fhxscgrSigned;
          $(".fhxscgr").css('width','0');
          $(".morenSrc").css('left','20%');
        }
        if(obj.docName=='详细评审表'&&obj.status=='待签'){
          this.$refs.morenSrc.src=this.zjgrxxps;
          $(".zjgrxxps").css('width','0');
          $(".right_main img").css('top','20px');
          $(".morenSrc").css('left','25%');
        }else if(obj.docName=='详细评审表'&&obj.status=='完成'){
          this.$refs.morenSrc.src=this.zjgrxxpsSigned;
          $(".zjgrxxps").css('width','0');
          $(".right_main img").css('top','20px');
          $(".morenSrc").css('left','25%');
        }
      },

      leaderChangeImg(obj){
        if(obj.docName=='资格审查个人报表'&&obj.status=='待签'){
          this.$refs.morenSrc2.src=this.grzzsc;
          $(".grzzsc").css('width','0');
          $(".morenSrc2").css('left','16%');
        }else if(obj.docName=='资格审查个人报表'&&obj.status=='完成'){
          this.$refs.morenSrc2.src=this.grzzscSigned;
          $(".grzzsc").css('width','0');
          $(".morenSrc2").css('left','16%');
        }
        if(obj.docName=='符合性审查个人报表'&&obj.status=='待签'){
          this.$refs.morenSrc2.src=this.fhxscgr;
          $(".fhxscgr").css('width','0');
          $(".morenSrc2").css('left','20%');
        }else if(obj.docName=='符合性审查个人报表'&&obj.status=='完成'){
          this.$refs.morenSrc2.src=this.fhxscgrSigned;
          $(".fhxscgr").css('width','0');
          $(".morenSrc2").css('left','20%');
        }
        if(obj.docName=='详细评审表'&&obj.status=='待签'){
          this.$refs.morenSrc2.src=this.zjgrxxps;
          $(".zjgrxxps").css('width','0');
          $(".right_main2 img").css('top','20px');
          $(".morenSrc2").css('left','25%');
        }else if(obj.docName=='详细评审表'&&obj.status=='完成'){
          this.$refs.morenSrc2.src=this.zjgrxxpsSigned;
          $(".zjgrxxps").css('width','0');
          $(".right_main2 img").css('top','20px');
          $(".morenSrc2").css('left','25%');
        }
      },

      changeImg2(obj){
        console.log(obj);
        if(obj.docName=='资格审查汇总报表'&&obj.status=='待签'){
          this.$refs.morenSrc.src=this.zgschz2;
          $(".zgschz2").css('width','0');
          $(".morenSrc").css('left','20%');
          $(".right_main img").css('top','20px');
        }else if(obj.docName=='资格审查汇总报表'&&obj.status=='完成'){
          this.$refs.morenSrc.src=this.zgschz2Signed;
          $(".zgschz2").css('width','0');
          $(".morenSrc").css('left','20%');
          $(".right_main img").css('top','20px');
        }
        if(obj.docName=='符合性审查汇总报表'&&obj.status=='待签'){
          this.$refs.morenSrc.src=this.fhxschz2;
          $(".fhxschz2").css('width','0');
          $(".morenSrc").css('left','20%');
          $(".right_main img").css('top','20px');
        }else if(obj.docName=='符合性审查汇总报表'&&obj.status=='完成'){
          this.$refs.morenSrc.src=this.fhxschz2Signed;
          $(".fhxschz2").css('width','0');
          $(".morenSrc").css('left','20%');
          $(".right_main img").css('top','20px');
        }
        if(obj.docName=='投标人分项得分表'&&obj.status=='待签'){
          this.$refs.morenSrc.src=this.tbrfxdf2;
          $(".right_main img").css('top','15px');
          $(".tbrfxdf2").css('width','0');
          $(".morenSrc").css('left','10%');
        }else if(obj.docName=='投标人分项得分表'&&obj.status=='完成'){
          this.$refs.morenSrc.src=this.tbrfxdf2Signed;
          $(".right_main img").css('top','15px');
          $(".tbrfxdf2").css('width','0');
          $(".morenSrc").css('left','10%');
        }
        if(obj.docName=='价格评议表'&&obj.status=='待签'){
          this.$refs.morenSrc.src=this.jgpy2;
          $(".jgpy2").css('width','0');
          $(".morenSrc").css('left','20%');
          $(".right_main img").css('top','15px');
        }else if(obj.docName=='价格评议表'&&obj.status=='完成'){
          this.$refs.morenSrc.src=this.jgpy2Signed;
          $(".jgpy2").css('width','0');
          $(".morenSrc").css('left','20%');
          $(".right_main img").css('top','15px');
        }
        if(obj.docName=='评分汇总表'&&obj.status=='待签'){
          this.$refs.morenSrc.src=this.psjghz2;
          $(".psjghz2").css('width','0');
          $(".morenSrc").css('left','20%');
          $(".right_main img").css('top','50px');
        }else if(obj.docName=='评分汇总表'&&obj.status=='完成'){
          this.$refs.morenSrc.src=this.psjghz2Signed;
          $(".psjghz2").css('width','0');
          $(".morenSrc").css('left','20%');
          $(".right_main img").css('top','50px');
        }

        if(obj.docName=='评审报告'){
          this.$refs.morenSrc.src=this.psbg2;
          $(".psbg2").css('width','0');
          $(".right_main img").css('top','15px');
          $(".morenSrc").css('left','30%');
        }
        if(obj.docName=='评审委员会签字表'||obj.docName=='评审专家声明书'||obj.docName=='评审专家意见表'){
          this.$refs.morenSrc.src=this.pswyhpsyj2;
          $(".pswyhpsyj2").css('width','0');
          $(".morenSrc").css('left','20%');
          $(".right_main img").css('top','35px');
        }
      },

      leaderChangeImg2(obj){
        console.log(obj);
        if(obj.docName=='资格审查汇总报表'&&obj.status=='待签'){
          this.$refs.morenSrc2.src=this.zgschz2;
          $(".zgschz2").css('width','0');
          $(".morenSrc2").css('left','20%');
          $(".right_main2 img").css('top','20px');
        }else if(obj.docName=='资格审查汇总报表'&&obj.status=='完成'){
          this.$refs.morenSrc2.src=this.zgschz2Signed;
          $(".zgschz2").css('width','0');
          $(".morenSrc2").css('left','20%');
          $(".right_main2 img").css('top','20px');
        }
        if(obj.docName=='符合性审查汇总报表'&&obj.status=='待签'){
          this.$refs.morenSrc2.src=this.fhxschz2;
          $(".fhxschz2").css('width','0');
          $(".morenSrc2").css('left','20%');
          $(".right_main2 img").css('top','20px');
        }else if(obj.docName=='符合性审查汇总报表'&&obj.status=='完成'){
          this.$refs.morenSrc2.src=this.fhxschz2Signed;
          $(".fhxschz2").css('width','0');
          $(".morenSrc2").css('left','20%');
          $(".right_main2 img").css('top','20px');
        }
        if(obj.docName=='投标人分项得分表'&&obj.status=='待签'){
          this.$refs.morenSrc2.src=this.tbrfxdf2;
          $(".right_main2 img").css('top','15px');
          $(".tbrfxdf2").css('width','0');
          $(".morenSrc2").css('left','10%');
        }else if(obj.docName=='投标人分项得分表'&&obj.status=='完成'){
          this.$refs.morenSrc2.src=this.tbrfxdf2Signed;
          $(".right_main2 img").css('top','15px');
          $(".tbrfxdf2").css('width','0');
          $(".morenSrc2").css('left','10%');
        }
        if(obj.docName=='价格评议表'&&obj.status=='待签'){
          this.$refs.morenSrc2.src=this.jgpy2;
          $(".jgpy2").css('width','0');
          $(".morenSrc2").css('left','20%');
          $(".right_main2 img").css('top','15px');
        }else if(obj.docName=='价格评议表'&&obj.status=='完成'){
          this.$refs.morenSrc2.src=this.jgpy2Signed;
          $(".jgpy2").css('width','0');
          $(".morenSrc2").css('left','20%');
          $(".right_main2 img").css('top','15px');
        }
        if(obj.docName=='评分汇总表'&&obj.status=='待签'){
          this.$refs.morenSrc2.src=this.psjghz2;
          $(".psjghz2").css('width','0');
          $(".morenSrc2").css('left','20%');
          $(".right_main2 img").css('top','50px');
        }else if(obj.docName=='评分汇总表'&&obj.status=='完成'){
          this.$refs.morenSrc2.src=this.psjghz2Signed;
          $(".psjghz2").css('width','0');
          $(".morenSrc2").css('left','20%');
          $(".right_main2 img").css('top','50px');
        }

        if(obj.docName=='评审报告'){
          this.$refs.morenSrc2.src=this.psbg2;
          $(".psbg2").css('width','0');
          $(".right_main2 img").css('top','15px');
          $(".morenSrc2").css('left','30%');
        }
        if(obj.docName=='评审委员会签字表'||obj.docName=='评审专家声明书'||obj.docName=='评审专家意见表'){
          this.$refs.morenSrc2.src=this.pswyhpsyj2;
          $(".pswyhpsyj2").css('width','0');
          $(".morenSrc2").css('left','20%');
          $(".right_main2 img").css('top','35px');
        }
      }


    }
  }





</script>

<style lang="scss">
  .leaderSelect{
    .el-select{
      background: #f79d3c;
      border-radius: 5px;
      .el-input{
        background: #f79d3c;
        border-radius: 36px;
        overflow: hidden;
        input{
          background: #f79d3c;
          color: white;
          border: none;
        }
      }
      .el-input__suffix{
        i{
          color:white;
        }
      }
    }
  }
  .leaderTip{
    height:40px;
    background:#f79d3c;
    border-radius:5px 5px 0px 0px;
    .el-button--text{
      color:white;
      line-height:20px;
      text-indent: 12px;
      font-size:14px;
    }
  }
  #more2{
    color: #fff;
    background-color: #e6a23c;
    border-color: #e6a23c;
    padding: 10px 20px;
    border-radius: 20px;
  }
  .successColor{
    color:#67c23a;
  }
  .marginT30{
    position: relative;
    .el-button{
      margin-top:10px;
    }
    .tishi{
      color:red;
    }
  }
  .batch-signature{
    position: relative;
    .moniTelBtn{
      width: 270px;
      height:270px;
      position: absolute;
      opacity: .5;
      background: #000;
      left:50px;
      top:29px;
    }
    .moniBtns{
      position: absolute;
      left:137px;
      top:145px;
    }
  }
  .signatureReviewResult{
    .top{
      .left{
        width: 24%;
        .logo_div{
          background: #348fe2;
          padding-top: 25px;
          padding-bottom: 25px;
          text-align: center;
        }
        .he479{
          height: 580px;
          margin-top: 20px;
          padding: 25px 0;
          overflow-y: auto;
          .table1{
            height: 300px;
            margin-bottom: 20px;
          }
          .table2{
            height: 600px;
            margin-bottom: 10px;
          }
        }
        .width90{
          width: 90%;
          margin-left: 5%;

        }
      }
      .right{
        width: 76%;
        .right_top{
          height: 86px;
          box-shadow: 0 1px 5px rgba(0,0,0,0.1);
          -khtml-box-shadow: 0 1px 5px rgba(0,0,0,0.1);
          -webkit-box-shadow: 0 1px 5px rgba(0,0,0,0.1);
          -moz-box-shadow: 0 1px 5px rgba(0,0,0,0.1);
          -ms-box-shadow: 0 1px 5px rgba(0,0,0,0.1);
          -o-box-shadow: 0 1px 5px rgba(0,0,0,0.1);
          .boldWords{
            font-weight: bold;
            line-height: 20px;
            font-size: 16px;
            color: #333;
          }
          .words{
            line-height: 43.5px;
            font-size: 14px;
            color: #666;
            margin-top: 5px;
          }
          ul{
            padding-left: 30px;
            margin-bottom: 23px;
          }
        }
        .right_main{
          position: relative;
          img{
            cursor: pointer;
            position: absolute;
            left: 30%;
            top:170px;
          }
        }
      }
    }
  }
</style>

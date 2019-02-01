<template>
  <div class="signatureReviewResult">
    <el-row class="top clearfix" >
      <el-col  class="left pull-left">
        <div class="logo_div" >
          <img  v-lazy="logoSrc" alt="logo" class="logo">
        </div>
        <div class=" width90">
          <el-row class="marginT15">
            <el-col :span="16" > <i class="fa fa-camera-retro"></i>&nbsp;&nbsp;<span>新增专家一号</span></el-col>
            <el-col :span="8"><el-button type="primary" size="small">查看所有文档</el-button></el-col>
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
                    <span class="coreds curPoint" @click="changeImg(scope.row)">{{scope.row.status}}</span>
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
                    <span class="coreds curPoint" @click="changeImg2(scope.row)">{{scope.row.status}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <el-row class="text-center marginT60">
          <el-button type="warning" size="medium" round @click="batchsign_btn">批量签字</el-button>
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
      title=""
      :visible.sync="dialogSign"
      width="410px"
      class="Sign"
    >
      <BatchSignature></BatchSignature>
    </el-dialog>
  </div>
</template>

<script>
  import BatchSignature from '../operations/zjps/dialog/BatchSignature';
    export default {
      name: "signature-review-result",
      components: {
        BatchSignature
      },
      data(){
        return {
          logoSrc:require('../common/img/logo11.png'),
          morenSrc:require('../common/img/moren.gif'),
          grzzsc:require('../common/img/grzzsc.svg'),//资格审查个人报表table1
          fhxscgr:require('../common/img/fhxscgr.svg'),//符合性审查个人报表table1
          zjgrxxps:require('../common/img/zjgrxxps.svg'),//详细评审表table1

          zgschz2:require('../common/img/zgschz2.svg'),//资格审查汇总报表table2
          fhxschz2:require('../common/img/fhxschz2.svg'),//符合性审查汇总报表table2
          tbrfxdf2:require('../common/img/tbrfxdf2.svg'),//投标人分项得分表表table2
          jgpy2:require('../common/img/jgpy2.svg'),//价格评议表table2
          psjghz2:require('../common/img/psjghz2.svg'),//评分汇总表table2
          psbg2:require('../common/img/psbg2.svg'),//评审报告table2
          pswyhpsyj2:require('../common/img/pswyhpsyj2.svg'),//评审报告table2
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
      methods:{
        batchsign_btn(){
            this.dialogSign=true;
        },
        changeImg(obj){

         if(obj.docName=='资格审查个人报表'){
           this.$refs.morenSrc.src=this.grzzsc;
           $(".grzzsc").css('width','0');
         }else if(obj.docName=='符合性审查个人报表'){
           this.$refs.morenSrc.src=this.fhxscgr;
           $(".fhxscgr").css('width','0');
         }else if(obj.docName=='详细评审表'){
           this.$refs.morenSrc.src=this.zjgrxxps;
           $(".zjgrxxps").css('width','0');
         }
          $(".morenSrc").css('left','13%');
        },
        changeImg2(obj){
          console.log(obj);
          if(obj.docName=='资格审查汇总报表'){
            this.$refs.morenSrc.src=this.zgschz2;
            $(".zgschz2").css('width','0');
            $(".morenSrc").css('left','13%');
          }else if(obj.docName=='符合性审查汇总报表'){
            this.$refs.morenSrc.src=this.fhxschz2;
            $(".fhxschz2").css('width','0');
            $(".morenSrc").css('left','13%');
          }else if(obj.docName=='投标人分项得分表'){
            this.$refs.morenSrc.src=this.tbrfxdf2;
            $(".tbrfxdf2").css('width','0');
            $(".morenSrc").css('left','13%');
          }else if(obj.docName=='价格评议表'){
            this.$refs.morenSrc.src=this.jgpy2;
            $(".jgpy2").css('width','0');
            $(".morenSrc").css('left','13%');
          }else if(obj.docName=='评分汇总表'){
            this.$refs.morenSrc.src=this.psjghz2;
            $(".psjghz2").css('width','0');
            $(".morenSrc").css('left','13%');
          }else if(obj.docName=='评审报告'){
            this.$refs.morenSrc.src=this.psbg2;
            $(".psbg2").css('width','0');
            $(".right_main img").css('top','0');
            $(".morenSrc").css('left','20%');
          }else if(obj.docName=='评审委员会签字表'||obj.docName=='评审专家声明书'||obj.docName=='评审专家意见表'){
            this.$refs.morenSrc.src=this.pswyhpsyj2;
            $(".pswyhpsyj2").css('width','0');
            $(".right_main img").css('top','0');
            $(".morenSrc").css('left','20%');
          }
        }
      }
    }





</script>

<style lang="scss">
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

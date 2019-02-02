<template>
  <div class="CheckAllScoreReault">
    <!----------------------查看个人资格审查项表--------------------->
    <div class="biaoba_fisrt">
      <el-row class="marginB15" >
        <el-col :span="2" class="col852 colfff lin-height28 text-center"><div class="grid-content bg-purple-dark">分包号：第1包</div></el-col>
        <el-col :span="4" class="col852 colfff lin-height28"><div class="grid-content bg-purple-dark">专家组：0635-1809G281/1评委会 </div></el-col>
        <el-col :span="3" class="col852 colfff lin-height28" ><div class="grid-content bg-purple-dark">专家：新增专家一号 </div></el-col>
      </el-row>
      <el-table
        :data="msgBox"
        size="small"
        tooltip-effect="dark"
        border
        class="changePriceTable"
        el-table__header-wrapper
        :summary-method="getSummaries"
        show-summary>
        <el-table-column type="index"  label="序号" header-align="left"
                         align="left"></el-table-column>
        <el-table-column prop="project" header-align="left" label="项目"></el-table-column>
        <el-table-column prop="bidder" header-align="left" label="投标人">
          <el-table-column
            prop="panduan1"
            label="重庆网控科技发展有限公司"
          >
          </el-table-column>
          <el-table-column label="普瑞太阳能有限公司" prop="panduan2" >
          </el-table-column>
          <el-table-column label="夏丰热工研究院有限公司" prop="panduan3" >
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>

    <el-row class="marginB15 text-center marginT30">
      <el-button   type="primary" size="small"><i class="icon iconfont icon-fanhuishouye1 mr5"  ></i>刷新</el-button>
      <el-button   type="primary" size="small"><i class="icon iconfont icon-fanhuishouye1 mr5"  ></i>关闭</el-button>
    </el-row>
  </div>
</template>
<script>

  export default {
    name: 'individualTrial',
    components: {},
    data() {
      return {
        msgBox: [{
          project: '一、商务和技术（30.00分）',
          bidder: '北京蓝天环境保护有限公司',
          finalQuotation: '1,000,000,00',
          panduan1:"4.0000",
          panduan2:"4.0000",
          panduan3:"4.0000",
        },
      {
        project: '1、安全管理体系与措施(0.00分-5.00分)',
        bidder: '北京蓝天环境保护有限公司',
        finalQuotation: '1,000,000,00',
        panduan1:"4.0000",
        panduan2:"4.0000",
        panduan3:"4.0000",
      },{
            project: ' 2、工程进度计划与措施(0.00分-5.00分)',
            bidder: '北京蓝天环境保护有限公司',
            finalQuotation: '1,000,000,00',
            panduan1:"4.0000",
            panduan2:"4.0000",
            panduan3:"4.0000",
          },{
            project: '3、试验、检测仪器设备(0.00分-2.00分)',
            bidder: '北京蓝天环境保护有限公司',
            finalQuotation: '1,000,000,00',
            panduan1:"4.0000",
            panduan2:"4.0000",
            panduan3:"4.0000",
          },{
            project: ' 4、资源配备计划(0.00分-1.00分)',
            bidder: '北京蓝天环境保护有限公司',
            finalQuotation: '1,000,000,00',
            panduan1:"4.0000",
            panduan2:"4.0000",
            panduan3:"4.0000",
          },{
            project: '5、施工设备(0.00分-2.00分)',
            bidder: '北京蓝天环境保护有限公司',
            finalQuotation: '1,000,000,00',
            panduan1:"4.0000",
            panduan2:"4.0000",
            panduan3:"4.0000",
          },{
            project: '6、环境保护管理体系与措施(0.00分-5.00分)',
            bidder: '北京蓝天环境保护有限公司',
            finalQuotation: '1,000,000,00',
            panduan1:"4.0000",
            panduan2:"4.0000",
            panduan3:"4.0000",
          },{
            project: '7、质量管理体系与措施(0.00分-5.00分)',
            bidder: '北京蓝天环境保护有限公司',
            finalQuotation: '1,000,000,00',
            panduan1:"4.0000",
            panduan2:"4.0000",
            panduan3:"4.0000",
          },{
            project: '8、施工方案与技术措施(0.00分-5.00分)',
            bidder: '北京蓝天环境保护有限公司',
            finalQuotation: '1,000,000,00',
            panduan1:"4.0000",
            panduan2:"4.0000",
            panduan3:"4.0000",
          },{
            project: '二、商务部分(24.00分)',
            bidder: '北京蓝天环境保护有限公司',
            finalQuotation: '1,000,000,00',
            panduan1:"4.0000",
            panduan2:"4.0000",
            panduan3:"4.0000",
          },{
            project: '1、1111(0.00分-4.00分)',
            bidder: '北京蓝天环境保护有限公司',
            finalQuotation: '1,000,000,00',
            panduan1:"4.0000",
            panduan2:"4.0000",
            panduan3:"4.0000",
          },{
            project: '2、其他他要求(0.00分-10.00分)',
            bidder: '北京蓝天环境保护有限公司',
            finalQuotation: '1,000,000,00',
            panduan1:"4.0000",
            panduan2:"4.0000",
            panduan3:"4.0000",
          },{
            project: '  3、项目经理任职资格与业绩(0.00分-10.00分)',
            bidder: '北京蓝天环境保护有限公司',
            finalQuotation: '1,000,000,00',
            panduan1:"4.0000",
            panduan2:"4.0000",
            panduan3:"4.0000",
          },{
            project: ' 三、报价部分(50.00分)',
            bidder: '北京蓝天环境保护有限公司',
            finalQuotation: '1,000,000,00',
            panduan1:"4.0000",
            panduan2:"4.0000",
            panduan3:"4.0000",
          },{
            project: '  1、价格6(50.00分)',
            bidder: '北京蓝天环境保护有限公司',
            finalQuotation: '1,000,000,00',
            panduan1:"4.0000",
            panduan2:"4.0000",
            panduan3:"4.0000",
          }
        ],

      }
    },
    created() {
    },
    mounted() {

    },
    methods: {
      changePrice1() {
        this.dialogVisible = true;
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '16';
            return;
          }else if(index === 1){
            sums[index] = '专家个人打分';
            return;
          }else if(index === 2){
            sums[index] = '42.50';
            return;
          }else if(index === 3){
            sums[index] = '40.50';
            return;
          }else if(index === 4){
            sums[index] = '36.00';
            return;
          }
        });
        return sums;
      }
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .CheckAllScoreReault{

  }
</style>



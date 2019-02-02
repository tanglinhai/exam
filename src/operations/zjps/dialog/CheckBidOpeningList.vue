<template>
    <div class="checkBidOpeningList">
      <el-row><h3 class="text-center fs18">开标记录表</h3></el-row>
      <el-row>
        <el-col class="lin-height28">项目名称：雄安施工项目总承包（施工类）001</el-col>
      </el-row>
      <el-row>
        <el-col class="lin-height28">招标编号：0635-1809G281/1</el-col>
      </el-row>
      <el-table
        ref="singleTable"
        :data="tableData"
        size="small"
        tooltip-effect="dark"
        border
        el-table__header-wrapper
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          property="bidderName"
          label="投标人名称"
          width="200">
        </el-table-column>
        <el-table-column
          property="bidderTotalPrice"
          label="投标总价"
         >
        </el-table-column>
        <el-table-column
          property="qualityCriterion"
          label="质量标准">
        </el-table-column>
        <el-table-column
          property="bidBond"
          label="投标保证金">
        </el-table-column>
        <el-table-column
          property="safeConstructionCost"
          label="安全文明施工费">
        </el-table-column>
        <el-table-column
          property="expertEngineerPrice"
          label="专业工程暂估价">
        </el-table-column>
        <el-table-column
          property="remark"
          label="备注">
        </el-table-column>
        <el-table-column
          property="bidderSignature"
          label="投标人签字">
        </el-table-column>
      </el-table>
      <el-row><p  class="lin-height28 marginT5" >备注：</p></el-row>
      <el-row>
        <el-col class="lin-height28">记录人：</el-col>
      </el-row>
      <el-row>
        <el-col class="lin-height28">唱标人：</el-col>
      </el-row>
      <el-row>
        <el-col class="lin-height28">监督人：</el-col>
      </el-row>
      <el-row class="text-right">
       <p>第一页/共1页</p>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "check-bid-opening-list",
      data() {
        return {
          tableData: [
            {
            bidderName: '重庆网控科技发展有限公司',
            bidderTotalPrice: '9,000,000.00',
            qualityCriterion: '1',
            bidBond:"30",
            safeConstructionCost:"1",
            expertEngineerPrice:"1",
            remark:"1111",
            bidderSignature:""
          },  {
              bidderName: '普瑞太阳能有限公司',
              bidderTotalPrice: '9,000,000.00',
              qualityCriterion: '1',
              bidBond:"30",
              safeConstructionCost:"1",
              expertEngineerPrice:"1",
              remark:"1111",
              bidderSignature:""
            }, {
              bidderName: '夏丰热工研究院有限公司',
              bidderTotalPrice: '9,000,000.00',
              qualityCriterion: '1',
              bidBond:"30",
              safeConstructionCost:"1",
              expertEngineerPrice:"1",
              remark:"1111",
              bidderSignature:""
            },
          ],

        }
      },

      methods: {

      }
    }
</script>

<style lang="scss">

</style>

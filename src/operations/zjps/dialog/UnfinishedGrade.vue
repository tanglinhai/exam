<template>
  <div class="unfinishedGrade">
    <el-table
      :data="tableData"
      size="small"
      tooltip-effect="dark"
      border
      el-table__header-wrapper
      style="width: 100%">
      <el-table-column
        prop="supplierName"
        label="供应商名称"
        >
      </el-table-column>
      <el-table-column
        prop="scorePosition"
        label="打分项位置"
       >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "unfinished-grade",
      data() {
        return {
          tableData: [{
            supplierName: '重庆网控科技发展有限公司',
            scorePosition:"第1页:其他要去,项目经理任职资格与业绩"
          }, {
            supplierName: '夏丰热工研究院有限公司',
            scorePosition:"第1页:其他要去,项目经理任职资格与业绩"
          }]

        }
      },
      created() {
      },
      mounted() {

      },
      methods: {

      }
    }
</script>

<style lang="scss">
.unfinishedGrade{

}
</style>

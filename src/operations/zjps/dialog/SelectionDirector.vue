<template>
  <div class="failureEntryDialog">
      <div class="failureoOject">
        0635-1909N963/2[2]:评委组长为[<span class="coreds">张三</span> ]
      </div>
      <el-row class="text-center dijilun">
        <el-col :span="12">第1轮</el-col>
        <el-col :span="12">张三(1票),李四(0票),王五(0票)</el-col>
      </el-row>
      <el-row class="text-center dijilun">
        <el-col :span="12">第2轮</el-col>
        <el-col :span="12">张三(0票),李四(1票),王五(0票)</el-col>
      </el-row>
      <el-row class="text-center dijilun">
        <el-col :span="12">第3轮</el-col>
        <el-col :span="12">张三(1票),李四(0票),王五(0票)</el-col>
      </el-row>
      <el-row  class="text-center">
        <el-button @click="closeBtn" size="small" type="primary" icon="el-icon-close">关闭</el-button>
      </el-row>
  </div>
</template>

<script>
  export default {
    name: 'SelectionDirector',
    components: {},
    data() {
      return {

      }
    },
    created() {
    },
    mounted() {

    },
    methods: {
      closeBtn(){

      }
    }
  }
</script>

<style lang="scss">

  .failureEntryDialog{
    .failureoOject{
      line-height: 38px;
      height: 38px;
      border-top: 1px dotted #ccc;
      border-bottom: 1px dotted #ccc;
    }
    .dijilun{
      line-height: 38px;
      height: 38px;
      border-bottom: 1px dotted #ccc;
      margin-bottom: 25px;
    }
  }

</style>

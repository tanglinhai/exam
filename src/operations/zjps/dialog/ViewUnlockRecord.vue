<template>
  <div class="ViewUnlockRecord">
    <el-row class="lin-height35">
      <div>
        0635-1809 NB15/7评委会的初审类解锁申请
      </div>
    </el-row>
    <el-row class="lin-height35">
      <el-col :span="4"><div class="grid-content bg-purple" >申请人：</div> </el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light"><div>张三 </div> </div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">申请时间： </div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light">2018/11/27&nbsp;16:52:21</div></el-col>
    </el-row>
    <el-row class="lin-height35">
      <el-col :span="4"><div class="grid-content bg-purple">解锁对象：</div> </el-col>
      <el-col :span="20" class="text-center"><div class="grid-content bg-purple">1</div> </el-col>
    </el-row>
    <el-row class="lin-height35">
      <el-col :span="4"> <div class="grid-content bg-purple">申请原因：</div> </el-col>
      <el-col :span="20"><div class="grid-content bg-purple">投标函格式</div></el-col>

    </el-row>
    <el-row class="lin-height35">
      <el-col :span="4">
        <div class="grid-content bg-purple">审批人：</div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">&nbsp;</div>
      </el-col>
      <el-col :span="4" >
        <div class="grid-content bg-purple">审批结果:</div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">同意</div>
      </el-col>
    </el-row>
    <el-row class="lin-height35">
      <el-col :span="4">
        <div class="grid-content bg-purple">解锁理由：</div>
      </el-col>

      <el-col :span="20">
        <div class="grid-content bg-purple">1</div>
      </el-col>

    </el-row>
    <el-row class="text-center marginT20">
      <el-button size="small" type="primary" @click="reback">返回</el-button>
    </el-row>


  </div>

</template>

<script>
  export default {
    name: 'changePrice',
    components: {},
    data() {
      return {}
    },
    created() {
    },
    mounted() {

    },
    methods: {
      reback() {

      }
    }
  }
</script>

<style lang="scss">
  .ViewUnlockRecord {

  }
</style>

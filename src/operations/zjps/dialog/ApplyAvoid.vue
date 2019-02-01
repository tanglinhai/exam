<template>
  <div class="ApplyAvoid">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
      <el-form-item  prop="desc">
        <label ><span  class="coreds">*</span>回避原因：</label>
        <el-input type="textarea" v-model="ruleForm.desc" class="textarea"></el-input>
      </el-form-item>
      <el-form-item class="text-center">
        <el-button type="primary" @click="submitForm('ruleForm')" size="small" > <i class="icon iconfont icon-baocun1 mr5"  ></i> 确定</el-button>
        <el-button @click="reback" size="small" type="primary"> <i class="icon iconfont icon-fanhuishouye1 mr5"  ></i>返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'ApplyAvoid',
    components: {},
    data() {
      return {
        ruleForm: {
          desc: '',
        },
        rules: {
          desc: [
            { required: true, message: '请填写申请原因', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
    },
    mounted() {

    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            
          } else {
            return false;
          }
        });

        alert('提交后您将没有权限参与此项目，此模拟系统暂时不支持此操作！');
      },
      reback(){

      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .ApplyAvoid {
    .demo-ruleForm{
      .el-textarea__inner{
        min-height: 120px!important;
      }
    }
  }
</style>



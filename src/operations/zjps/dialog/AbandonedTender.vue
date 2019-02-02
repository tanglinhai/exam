<template>
    <div class="abandoned-tender">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="废标理由：" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"   placeholder="最多输入500字！" ></el-input>
        </el-form-item>
        <el-row class="text-center">
          <el-button type="primary" @click="submitForm('ruleForm')" size="small">确定废标</el-button>
          <el-button @click="reback" size="small">返回</el-button>
        </el-row>
      </el-form>
    </div>
</template>

<script>
    export default {
        name: "abandoned-tender",
      data() {
        return {
          ruleForm: {
            desc: ''
          },
          rules: {
            desc: [
              { required: true, message: '请填写内容废标理由!', trigger: 'blur' },

            ]
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        reback() {

        }
      }


    }
</script>

<style lang="scss">
.abandoned-tender{
  .el-textarea{
    .el-textarea__inner{
      min-height: 240px!important;
    }
  }
}
</style>

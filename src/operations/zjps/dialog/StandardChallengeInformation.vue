<template>
    <div class="StandardChallengeInformation">
      <el-row class="marginB15">
        <el-col :span="12" > <p  style="padding-top: 5px;" class=" fs16 ">标中质询信息列表</p></el-col>
        <el-col :span="12" class="text-right">
          <el-button size="small" @click="add" type="primary">新增</el-button>
        </el-col>
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
          property="inquiryConten"
          label="质询内容"
          width="120">
        </el-table-column>
        <el-table-column
          property="questionTime "
          label="提问时间"
          width="120">
        </el-table-column>
        <el-table-column
          property="requestReplyTime"
          label=" 要求回复时间">
        </el-table-column>
        <el-table-column
          property="bidder"
          label="投标人">
        </el-table-column>
        <el-table-column
          property="operation"
          label="操作">
        </el-table-column>
        <el-table-column
          property=""
          label="回复时间">
        </el-table-column>
      </el-table>
      <div class="form_div"  style="display: none">
        <el-row class="marginB15 marginT15">
          <el-col :span="12" > <p  style="padding-top: 5px;" class=" fs16 ">新增质询</p></el-col>
          <el-col :span="12" class="text-right">
            <el-button type="primary" @click="submitForm('ruleForm')" size="small">提交</el-button>
            <el-button @click="cancel('ruleForm')" size="small">取消</el-button>
          </el-col>
        </el-row>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="新增投标人：" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="重庆网控科技发展有限公司" name="type"></el-checkbox>
              <el-checkbox label="普瑞太阳能有限公司" name="type"></el-checkbox>
              <el-checkbox label="夏丰热工研究院有限公司" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="质询内容：" prop="desc">
            <el-input type="textarea"  autosize  v-model="ruleForm.desc" ></el-input>
          </el-form-item>
          <el-form-item label="要求回复时间：" >
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;" size="small"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line text-center" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;" size="small"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
    export default {
        name: "standard-challenge-information",
      data() {
        return {
          tableData: [
          //   {
          //   date: '2016-05-02',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1518 弄'
          // }, {
          //   date: '2016-05-04',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1517 弄'
          // }, {
          //   date: '2016-05-01',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1519 弄'
          // }, {
          //   date: '2016-05-03',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1516 弄'
          // }
          ],
          ruleForm: {
            date1: '',
            date2: '',
            type: [],
            desc: ''
          },
          rules: {
            type: [
              {type: 'array', required: true, message: '请选择投标人！', trigger: 'change'}
            ],
            desc: [
              {required: true, message: '质询内容不允许为空！', trigger: 'blur'}
            ]
          }
        }
      },
      mounted(){

      },
      methods: {
        add(){
          $('.form_div').show();
        },
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
          resetForm(formName) {
            this.$refs[formName].resetFields();
          }
        }
    }
</script>

<style lang="scss">
.StandardChallengeInformation{

}
</style>

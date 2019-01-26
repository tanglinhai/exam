<template>
    <div class="biddingAdvice">
          <el-form ref="form" :model="form" class="demo-ruleForm">
              <el-form-item class="border_div">
                  <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item class="text-center">
                  <el-button type="primary" @click="save" size="small"><i class="icon iconfont icon-baocun1 mr5"  ></i>保存</el-button>
                  <el-button @click="reback" size="small"><i class="icon iconfont icon-fanhuishouye1 mr5"  ></i>返回</el-button>
              </el-form-item>
          </el-form>
    </div>
</template>
<script>
    export default {
        name: 'SelectionDirector',
        components: {},
        data() {
            return {
                form: {
                    desc: ''
                }
            }
        },
        created() {
        },
        mounted() {

        },
        methods: {
            save() {
                console.log('submit!');
            },
            reback() {

            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .biddingAdvice {
          .border_div {
              padding: 5px;
              border: 1px dotted #ccc;
          }
          .demo-ruleForm {
              .el-textarea__inner {
                  min-height: 220px !important;
              }
          }
    }
</style>



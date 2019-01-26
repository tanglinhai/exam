<template>
    <div class="SubmitBusiness">
            <el-row  class="text-center">
                <p class="lin-height30">您的评分已进行[<span class="coreds">100.0%</span>], 请确认您已经完成本包[<span class="coreds">第1包</span>]的评分工作,</p>
                <p  class="lin-height30">确认后您将不能再更改打分结果,但可以通过点击[结果]进行查阅!</p>
            </el-row>
            <el-row  class="text-center marginT20" >
                <el-button @click="comfirm" size="small" type="primary"><i class="icon iconfont icon-queren mr5"  ></i>确认</el-button>
                <el-button @click="reback" size="small" type="primary"><i class="icon iconfont icon-fanhuishouye1 mr5"  ></i>返回</el-button>
            </el-row>

    </div>
</template>
<script>
    export default {
        name: 'submitBusiness',
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

            comfirm(){

            },
            reback(){

            },
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

    .SubmitBusiness {

    }
</style>



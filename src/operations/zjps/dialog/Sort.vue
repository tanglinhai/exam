<template>
  <div class="sort">
    <!----------------------投标人排序调整--------------------->
    <div class="warp clearfix">
      <div class="sortDiv pull-left">
        <ul>
          <li>夏丰热工研究院有限公司</li>
          <li>重庆网控科技发展有限公司</li>
          <li>普瑞太阳能有限公司</li>
        </ul>
      </div>
      <ul class="right_icon pull-left">
        <li><i class="el-icon-arrow-up" @click="sort_up"></i></li>
        <li><i class="el-icon-arrow-down"  @click="sort_down"></i></li>
      </ul>
    </div>
    <div class="text-center paddingT20" >
      <el-button size="small" @click="save" type="primary"> <i class="icon iconfont icon-baocun1 mr5"  ></i>保存</el-button>
      <el-button size="small" @click="reback" type="primary"><i class="icon iconfont icon-fanhuishouye1 mr5"  ></i>返回</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'sort',
    components: {},
    data() {
      return {
        dialogVisible: false,//调转评标价弹框
      }
    },
    created() {
    },
    mounted() {

    },
    methods: {

      reback(){

      },
      save(){

      },
      sort_up(){

      },
      sort_down(){

      },
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .sort {
    .warp{
      .sortDiv{
        width: 600px;
        height: 200px;
        border: 1px solid #ccc;
        padding-left: 3px;
        li{
          line-height: 20px;
        }
      }
      .right_icon{
        padding-top:89px;
        padding-left: 5px;
        li{
          i{
            color: #409EFF;
          }
        }
      }
    }
  }
</style>



<template>
    <div class="student">
      <el-row :gutter="20">
        <el-col :span="3">
          <div class="grid-content bg-purple helpcenterLeft">
            <div class="LmTitleBg">导航菜单</div>
            <ul>
              <li>专家评审<i class="el-icon-arrow-right"></i></li>
            </ul>
          </div>
        </el-col>
        <el-col :span="21">
          <div class="grid-content bg-purple helpcenterRight">
            <ul>
              <li><router-link class="person" :to="{name:'HelpCenterInpormation'}">1.专家评审-合理低价</router-link></li>
              <li><router-link class="person" :to="{name:'HelpCenterInpormation'}">2.专家评审-合理低价</router-link></li>
              <li><router-link class="person" :to="{name:'HelpCenterInpormation'}">3.专家评审-合理低价</router-link></li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  export default {
    data(){
      return {
        
      }
    },
    created(){
      
    },
    methods:{
      /**
       * 获取个人信息
       */
      inpormation(){

      }
      /**
       * 提交表单
       * @param formName
       */
      
      /**
       * 取消
       * @param formName
       */
     
      /**
       * 搜索
       */
     
      /**
       * 每页多少条
       * @param val
       */
     
      /**
       * 第几页
       * @param val
       */
   
      /**
       * 获取考试记录
       */
      
    }
  }
</script>

<style rel="stylesheet/scss" scoped="scoped" lang="scss">
.main{
  .title{
    font-size: 16px;
    color: #000;
  }
}
.student{
  margin-top:10px;
  .el-row{
    margin:0px!important;
  }
  .helpcenterLeft{
    border:1px solid #e0e0e0;
    text-indent:20px;
    .LmTitleBg{
      height:46px;
      background:#66b1ff;
      width:100%;
      color:white;
      font-size:16px;
      line-height:46px;
    }
    ul{
      li{
        height:46px;
        border-bottom:1px solid #e0e0e0;
        line-height:46px;
        cursor: pointer;
        i{
          float:right;
          margin-top:16px;
          margin-right:10px;
        }
        &:last-child{
          border-bottom:none;
        }
      }
    }
  }
  .helpcenterRight{
    border:1px solid #e0e0e0;
    min-height:500px;
    text-indent:20px;
    padding:20px 0px;
    ul{
      li{
        line-height:28px;
      }
    }
  }
}
</style>

<template>
    <div class="sidebar">
      <el-row>
        <el-col class="text-center " style="margin-top: 7px;margin-bottom: 4px">
          <img width="150" v-lazy="logoSrc" alt="logo" >
        </el-col>
        <el-col>
          <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router>
            <el-menu-item index="/endhome/index"><i class="fa-icon fa fa-home"></i>首页</el-menu-item>
            <el-submenu index="2">
              <template slot="title"><i class="fa-icon fa fa-folder"></i>试卷管理</template>
                <el-menu-item index="/endhome/mypapers">我的试卷</el-menu-item>
                <el-menu-item index="/endhome/markpapers">阅卷</el-menu-item>
            </el-submenu>
            <el-menu-item index="/endhome/studentmanage"><i class="fa-icon fa fa-group"></i>考试成绩管理</el-menu-item>
            <el-menu-item index="/endhome/user"><i class="fa-icon fa fa-user"></i>我的信息管理</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex:'/endhome/index',
        logoSrc:require('../common/img/LOGO112.png')
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      //初始化列表active状态
      initActiveIndex(){
        // var str =this.$router.currentRoute.path;
        this.activeIndex=this.$router.currentRoute.path;
        // console.log(str)
        /*  if(str=='userrouter'){
            this.activeIndex=this.$router.currentRoute.path;
         } */
//        if(str=='materialrouter'){
//          this.activeIndex='/materialrouter/materials';
//        }

      }
    },
    watch:{
      '$route':'initActiveIndex'
    },
    created(){
      this.initActiveIndex();
    }
  }
</script>

<style scoped="scoped">


</style>

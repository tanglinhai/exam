<template>
  <div class="batch-signature">
      <p class="coreds marginB10" >请扫描二维码提交签名</p>
      <img v-lazy="downloadSrc" alt="扫描二维码" class="downloadSrc">
      <p class="coreds marginT10 marginB15">如果签名已完成，该页面会自动刷新</p>
  </div>
</template>

<script>
    export default {
        name: "batch-signature",

      data(){
        return {
          downloadSrc:require('../../../common/img/download.png'),


        }
      },
      methods:{

      }
    }
</script>

<style lang="scss">
.batch-signature{
    .coreds{
      text-align: center;
    }
  .downloadSrc{
    padding-left: 50px;
  }
}
</style>

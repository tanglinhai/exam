<template>
    <!-- 推举组长，等待其他专家签到和推举组长，自己推举之后就在等待中，一直到所有专家都推举之后，然后进入评标环节 -->
    <div class="elect">
        <el-row class="nav">
            <el-col :span="4">
                <div class="grid-content bg-purple-dark">
                    <img src="../../../common/img/nav_logo.png" alt="">
                </div>
            </el-col>
            <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                    <h2>项目名称：雄安施工项目总承包（施工类）001</h2>
                    <div class="num">项目编号：0635-1909N987</div>
                </div>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple-dark" style="text-align:center;">
                    <el-button type="warning" size="small"><i class="iconfont icon-quxiao"></i>&nbsp;&nbsp;关闭</el-button>
                </div>
            </el-col>
        </el-row>
        <el-container>
            <el-aside width="500px">
                <h4>项目资料</h4>
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    :show-header="false"
                    border>
                    <el-table-column
                        label="1"
                        prop="num"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="file"
                        label="招标文件">
                    <template slot-scope="scope">
                      <div @click="downloadZB">
                        <a href="javascript:void(0);" class="curStyot">
                          <span>{{scope.row.file}}</span>
                          <i class="fa fa-file fa-fw"></i>
                        </a>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <h4>投标文件查看：</h4>
                <el-table
                    :data="tableData1"
                    :show-header="false"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="num"
                        label="1"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="file"
                        label="招标文件">

                    <template slot-scope="scope">
                      <div @click="downloadTouBiao">
                        <a class="curStyot"  href="javascript:void(0);">
                          <span> {{scope.row.file}}</span>
                          <i class="fa fa-file fa-fw"></i>
                        </a>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
            </el-aside>
            <el-main>
                <el-row style="line-height:40px;margin-bottom:15px;">
                    <el-col :span="2">
                        <div class="grid-content bg-purple-dark" style="border-bottom:2px solid #409EFF;font-size:16px;font-weight:bold;">
                            项目分包
                        </div>
                    </el-col>
                    <el-col :span="19">
                        <div class="grid-content bg-purple-dark" style="text-align:right;border-bottom:2px solid #ccc">
                            评标专家：<font style="color:red;">张三</font>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class="grid-content bg-purple-dark" style="text-align:center;border-bottom:2px solid #ccc">
                            <el-button type="primary" size="small"  @click="selectionDirector"><i class="iconfont icon-duxinyequerencanjia"></i>&nbsp;&nbsp;查看推举情况</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-table
                    :data="tableData3"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="num"
                        label="序号"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="id"
                        label="包号">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="包名称">
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="状态">
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                            <div>
                                <el-button size="small" @click="selectTeamLeader()">推举组长</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content bg-purple-dark" style="text-align:right;border:1px solid #ebeef5;border-top:none;padding:7px 0;">
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage4"
                                :page-sizes="[10, 20, 50, 100]"
                                :page-size="10"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="3">
                            </el-pagination>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>

      <el-dialog
        title="推举主任情况"
        :visible.sync="dialogSelectionDirector"
        width="700px"
      >
        <SelectionDirector></SelectionDirector>
      </el-dialog>
    </div>
</template>

<script>
  import SelectionDirector from '../dialog/SelectionDirector';

export default {
  components: {
    SelectionDirector
  },
    data(){
        return {
            currentPage4:1,
            tableData:[
                {num:1,file:'招标文件(pdf)'}
            ],
            tableData1:[
                {num:'0635-198N517/1',file:'重庆网控科技发展有限公司'},
                {num:'0635-198N517/1',file:'普瑞太阳能有限公司'},
                {num:'0635-198N517/1',file:'夏丰热工研究院有限公司'}
            ],
            tableData3:[
                {num:'1',name:'第1包',id:'0635-198N517/1',status:'进行中'},
            ],
          dialogSelectionDirector:false
        }
    },
    methods:{
        handleSizeChange(pageSize){

        },
        handleCurrentChange(currPage){

        },

        changeView(name){      //路由跳转传参函数
            // console.log(name)
            //this.$router.push({path:`${name}`});
            window.location.href = name;
        },

        selectTeamLeader(){
            this.changeView('/operation/zjps/hldj/electAfter');
        },
      selectionDirector(){
        this.dialogSelectionDirector =true;
      },
      downloadZB(){
        window.open('http://localhost:9000/static/docs/zhaoBiaoFile.pdf');
      },
      downloadTouBiao(){
        window.open('http://localhost:9000/static/docs/touBiaoFile.pdf');
      }

    }
}
</script>

<style lang="scss">
.elect{
    background: #fff;
    padding: 15px 0;
    .nav{
        background: #F8F8F8;
        padding:0 15px;
        height:60px;
        line-height: 60px;
        img{
            vertical-align: middle;
        }
        h2{
            font-size: 18px;
            color:orange;
            font-weight: bold;
            line-height: 30px;
        }
        .num{
            // padding-top: 5px;
            line-height: 30px;
        }
    }
    h4{
        width:120px;
        background: green;
        text-align: center;
        padding: 5px 0;
        margin: 5px 0;
        color: #fff;
        font-size: 14px;
    }
    .el-main{
        padding: 0 15px;
        overflow: hidden;
    }
    .el-container{
        padding: 0 15px;
    }
}
</style>

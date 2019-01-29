<template>
    <!-- 申请回避或者参加评标 -->
    <div class="information">
        <div class="aaa_a">
            <el-row :gutter="20">
                <el-col :span="10">
                <div class="grid-content bg-purple aaa_aleft">
                    <span>标名称：<em>tih招标项目-专家评标2</em></span>
                    <span>标号：<em>0635-1909n987</em></span>
                    <span>包号：<em>0635-1909n987/1</em></span>
                </div>
                </el-col>
                <el-col :span="14">
                <div class="grid-content bg-purple aaa_aright">
                    <el-button type="primary" size="small" icon="el-icon-edit-outline">废标</el-button>
                    <el-button type="primary" size="small" icon="el-icon-edit-outline">标中质询</el-button>
                    <el-button type="primary" size="small" icon="el-icon-tickets">查看招标文件</el-button>
                    <el-button type="primary" size="small" icon="el-icon-tickets">查看开标一览表</el-button>
                    <el-button type="primary" size="small" icon="el-icon-tickets">评标结果签字</el-button>
                    <el-button type="primary" size="small" icon="el-icon-tickets">资格审查签字</el-button>
                    <el-button type="primary" size="small" icon="el-icon-d-arrow-left">返回</el-button>
                </div>
                </el-col>
            </el-row>
        </div>
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
                    </el-table-column>
                </el-table>    
            </el-aside>
            <el-main>
                <h4>专家个人信息</h4>
                <el-table
                    :data="tableData2"
                    :show-header="false"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="name"
                        label="1"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="招标文件">
                    </el-table-column>
                    <el-table-column
                        prop="tel"
                        label="招标文件">
                    </el-table-column>
                    <el-table-column
                        prop="telNum"
                        label="招标文件">
                    </el-table-column>
                </el-table> 
                <h4>投标人信息</h4>
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
                        prop="file"
                        label="招标人名称">
                    </el-table-column>
                    <el-table-column
                        prop="id"
                        label="所投分包">
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
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content bg-purple-dark" style="text-align:center;padding-top:200px;">
                            <el-checkbox></el-checkbox> <b style="font-weight:bold;font-size:14px;"> &nbsp;我已读并同意了此承诺书</b>  <a style="font-size:14px;" href="javascript:void(0)">《承诺书协议》</a>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content bg-purple-dark" style="text-align:center;padding-top:15px;">
                            <el-button size="small" type="primary">申请回避</el-button>
                            <el-button size="small" type="primary" disabled>参加评标</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tableData:[
                {num:1,file:'招标文件(pdf)'}
            ],
            tableData1:[
                {num:'0635-198N517/1',file:'阿里巴巴(1)'},
                {num:'0635-198N517/1',file:'普瑞太阳能有限公司(测试)(2)'},
                {num:'0635-198N517/1',file:'夏丰热工研究院有限公司(测试)(3)'}
            ],
            tableData2:[
                {name:'姓名：',num:'3',tel:"手机：",telNum:'18700000003'},
                {name:'证件号码：',num:''},
            ],
            tableData3:[
                {num:'1',file:'阿里巴巴',id:'0635-198N517/1'},
                {num:'2',file:'普瑞太阳能有限公司(测试)',id:'0635-198N517/1'},
                {num:'3',file:'夏丰热工研究院有限公司(测试)',id:'0635-198N517/1'}
            ],
            currentPage4: 1
        }
    }
}
</script>

<style lang="scss">
.information{
    background: #fff;
    padding: 15px;
    padding-bottom: 30px;
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
    .aaa_a{
      background:#c8d3d8;
      //height:42px;
      .el-row{
        margin-left:0px!important;
        margin-right:0px!important;
        .aaa_aleft{
          line-height:42px;
          span{
            color:#777777;
            font-size:14px;
            font-weight: bold;
            margin-right:8px;
            em{
              color:#ff0000;
              font-weight: bold;
            }
          }
        }
        .aaa_aright{
          float: right;
          button{
            margin-top:5px;
          }
        }
      }
    }
}
</style>

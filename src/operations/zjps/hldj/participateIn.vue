<template>
    <!-- 申请回避或者参加评标 -->
    <div class="information">
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
                    <!--<el-table-column-->
                        <!--prop="file"-->
                        <!--label="招标文件">-->
                    <el-table-column>
                      <template slot-scope="scope">
                        <a href="http://localhost:9000/static/docs/zhaoBiaoFile.pdf">
                          <span>招标文件(pdf)</span>
                          <i class="fa fa-file fa-fw"></i>
                        </a>
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
                    <!--<el-table-column-->
                        <!--prop="file"-->
                        <!--label="招标文件">-->
                    <!--</el-table-column>-->

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
                            <el-checkbox v-model="agreement"></el-checkbox> <b style="font-weight:bold;font-size:14px;"> &nbsp;我已读并同意了此承诺书</b>  <a style="font-size:14px;" href="javascript:void(0)">《承诺书协议》</a>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content bg-purple-dark" style="text-align:center;padding-top:15px;">
                            <el-button size="small" type="primary">申请回避</el-button>
                            <el-button size="small" type="primary" :disabled="!agreement" @click="participateIn">参加评标</el-button>
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
            agreement: false,
            currentPage4:1,
            tableData:[
                {num:1,file:'招标文件(pdf)'}
            ],
            tableData1:[
                {num:'0635-198N517/1',file:'重庆网控科技发展有限公司'},
                {num:'0635-198N517/1',file:'普瑞太阳能有限公司'},
                {num:'0635-198N517/1',file:'夏丰热工研究院有限公司'}
            ],
            tableData2:[
                {name:'姓名：',num:'张三',tel:"手机：",telNum:'18700000003'},
                {name:'证件号码：',num:''},
            ],
            tableData3:[
                {num:'1',file:'重庆网控科技发展有限公司',id:'0635-198N517/1'},
                {num:'2',file:'普瑞太阳能有限公司',id:'0635-198N517/1'},
                {num:'3',file:'夏丰热工研究院有限公司',id:'0635-198N517/1'}
            ],
            currentPage4: 1
        }
    },
    methods:{
        handleSizeChange(pageSize){

        },
        handleCurrentChange(currPage){

        },
        participateIn(){
            window.location.href = '/operation/zjps/hldj/electTeamLeader';
            /*this.$router.push({
                path: '/operation/zjps/hldj/electTeamLeader'
            })*/
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
}
</style>

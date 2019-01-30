<template>
    <div class="changePassword">
            <el-form :model="form">
                <el-row class="coreds ">
                    <el-col :span="8" class="lin-height30">
                        <div class="grid-content bg-purple">
                            首轮报价：<span>1,000,000,00元</span>
                        </div>
                    </el-col>
                    <el-col :span="8" class="lin-height30">
                        <div class="grid-content bg-purple-light"> 最终报价：<span>1,000,000,00元</span></div>
                    </el-col>
                    <el-col :span="8" class="lin-height30">
                        <div class="grid-content bg-purple-light"></div>
                    </el-col>
                </el-row>
                <el-row class="coreds ">
                    <el-col :span="8" class="lin-height30">
                        <div class="grid-content bg-purple">
                            技术性价格调整小计：<span>0,00元</span>
                        </div>
                    </el-col>
                    <el-col :span="8" class="lin-height30">
                        <div class="grid-content bg-purple-light">商务性价格调整小计：<span>0,00元</span></div>
                    </el-col>
                    <el-col :span="8" class="lin-height30">
                        <div class="grid-content bg-purple">调整价格总计：<span>0,00元</span></div>
                    </el-col>
                </el-row>
                <el-row class="coreds ">
                    <el-col :span="24" class="text-center fs15 fwb lin-height35">
                        <div class="grid-content bg-purple ">注意事项</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content bg-purple lin-height22">1.可直接调整金额，计算基数项及比例项可为空；</div>
                    </el-col>
                    <el-col :span="24">
                        <div class="grid-content bg-purple lin-height22">2.采用计算基数与比例计算值，默认填写至调整金额输入框，但调整金额可修改；</div>
                    </el-col>
                </el-row>
                <!----------------------技术性价值调整------------------------>
                <div class="technicalAdjustment">
                    <el-row class="clearfix paddingB15 paddingT10">
                        <el-col :span="12" class="coc0c pull-left lin-height28">
                            <div class="grid-content bg-purple ">技术性价格调整</div>
                        </el-col>
                        <el-col :span="12" class="pull-left text-right">
                            <el-button @click="addBtn" size="small"> <i class="icon iconfont icon-add mr5"></i>添加</el-button>
                        </el-col>
                    </el-row>
                    <el-table
                            ref="multipleTable"
                            :data="msgBox"
                            size="small"
                            tooltip-effect="dark"
                            border
                            el-table__header-wrapper>
                        <el-table-column prop="changeReason" header-align="left" label="调整因素说明"></el-table-column>
                        <el-table-column prop="computationalBase" header-align="left"
                                         label="计算基数（单位：元）"></el-table-column>
                        <el-table-column prop="increaseDecrease" header-align="left" label="增减"></el-table-column>
                        <el-table-column prop="ratio" header-align="left" label="比例（100.00）%"></el-table-column>
                        <el-table-column prop="changeMoney" header-align="left" label="调整金额（单位：元）"></el-table-column>
                        <el-table-column prop="operate" header-align="left" label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" @click.stop="del(scope.$index, scope.row)" >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="technicalAdjustment">
                    <el-row class="clearfix paddingB15 paddingT15">
                        <el-col :span="12" class="coc0c pull-left lin-height28">
                            <div class="grid-content bg-purple ">商务性价格调整</div>
                        </el-col>
                        <el-col :span="12" class="pull-left text-right">
                            <el-button @click="technicalAdjustment_add" size="small">
                                <i class=" icon iconfont icon-add mr5"></i>
                                添加</el-button>
                        </el-col>
                    </el-row>
                    <el-table
                            :data="tableBox"
                            size="small"
                            tooltip-effect="dark"
                            border
                            el-table__header-wrapper>
                        <el-table-column prop="changeReason" header-align="left" label="调整因素说明"></el-table-column>
                        <el-table-column prop="computationalBase" header-align="left"
                                         label="计算基数（单位：元）"></el-table-column>
                        <el-table-column prop="increaseDecrease" header-align="left" label="增减"></el-table-column>
                        <el-table-column prop="ratio" header-align="left" label="比例（100.00）%"></el-table-column>
                        <el-table-column prop="changeMoney" header-align="left" label="调整金额（单位：元）"></el-table-column>
                        <el-table-column prop="operate" header-align="left" label="操作">
                            <template slot-scope="scope">
                              <el-button size="mini" @click.stop="del2(scope.$index, scope.row)" >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <el-form-item label="降价附件：" class="clearfix marginT15" >
                    <el-input v-model="form.name" class="marginR10 pull-left " style="width: 300px"  size="small "></el-input>
                    <el-button size="small"  @click.stop="adjunctBtn" class="pull-left" style="margin-top: 4px"> 浏览 </el-button>
                </el-form-item>
                <el-form-item class="text-center">
                    <el-button type="primary" @click="onSubmit"  size="medium"> <i class="icon iconfont icon-baocun1 mr5"  ></i>提交</el-button>
                    <el-button  size="medium"><i class="icon iconfont icon-fanhuishouye1 mr5"  ></i>返回</el-button>
                </el-form-item>
            </el-form>
    </div>
</template>
<script>


    export default {
        name: 'dd',
        components: {},
        data() {
            return {
                //标价价调整

                formLabelWidth: '120px',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                msgBox: [{
                    changeReason: '小微企业',
                    computationalBase: '1,000',
                    increaseDecrease: '11',
                    ratio: '10%',
                    changeMoney: '1,000',
                },{
                    changeReason: '付款方式',
                      computationalBase: '1,000',
                      increaseDecrease: '11',
                      ratio: '10%',
                      changeMoney: '1,000',
                  }],
                tableBox: [
                  {
                    changeReason: '小微企业',
                    computationalBase: '1,000',
                    increaseDecrease: '11',
                    ratio: '10%',
                    changeMoney: '1,000',
                  },
                  {
                    changeReason: '付款方式',
                    computationalBase: '1,000',
                    increaseDecrease: '11',
                    ratio: '10%',
                    changeMoney: '1,000',
                }],
            }
        },
        created() {
        },
        mounted() {

        },
        methods: {

            changePrice2() {
                this.dialogFormVisible = true;
            },
            add() {

            },
            technicalAdjustment_add(){

            },
          del(){

          },
          del2(){

          }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .changePassword {
        .insolvProWrap {
            .priceAdjustment {

            }
        }
    }
</style>



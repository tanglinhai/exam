<template>
    <div class="ChangePrice">
            <el-table
                    ref="multipleTable"
                    :data="msgBox"
                    size="small"
                    tooltip-effect="dark"
                    border
                    class="changePriceTable"
                    el-table__header-wrapper>
                <el-table-column prop="name" header-align="left" label="投标人名称"></el-table-column>
                <el-table-column prop="firstPrice" header-align="left" label="首轮报价"></el-table-column>
                <el-table-column prop="finalQuotation" header-align="left" label="最终报价"></el-table-column>
                <el-table-column prop="operate" header-align="left" label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click.stop="changePrice(scope.$index, scope.row)"
                        >
                            <i class="icon iconfont icon-zhifu mr5"></i>调转评标价
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
      <el-dialog title="评标调整：北京蓝天环境保护有限公司" :visible.sync="dialogFormVisible" append-to-body
                 class="priceAdjustment" width="952px">
        <PriceAdjustment></PriceAdjustment>
      </el-dialog>
    </div>
</template>
<script>
  import PriceAdjustment from './/PriceAdjustment'
    export default {
        name: 'changePrice',
      components: {
        PriceAdjustment
      },
        data() {
            return {
                 dialogFormVisible: false,//标价价调整弹框
                dialogVisible: false,//调转评标价弹框
                msgBox: [{
                    firstPrice: '1,000,000,00 人民币',
                    name: '北京蓝天环境保护有限公司',
                    finalQuotation: '1,000,000,00'
                },

                  {  firstPrice: '1,000,000,00 人民币',
                  name: '蓝天环境保护有限公司',
                  finalQuotation: '1,000,000,00'
                 },
                  { firstPrice: '1,000,000,00 人民币',
                    name: '北京环境保护有限公司',
                    finalQuotation: '1,000,000,00'
                  },
                ],
            }
        },
        created() {
        },
        mounted() {

        },
        methods: {
            individualTrial() {
                this.dialogVisible = true;
            },
          changePrice(){
            this.dialogFormVisible=true;//标价价调整弹框
          }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .ChangePrice {
        .insolvProWrap {
            .changePriceTable {
            }
        }
    }
</style>



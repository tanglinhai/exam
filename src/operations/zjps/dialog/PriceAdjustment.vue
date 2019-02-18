<template>
  <div class="priceAdjustment">
    <!--<el-form :model="form" :rules="rules" ref="form">-->
    <el-form :rules="model.rules" :model="model" ref="form">
      <div class="fixed_div">
        <el-row class="coreds ">
          <el-col :span="8" class="lin-height30">
            <div class="grid-content bg-purple">
              首轮报价：<span>{{model.fristQuote}}元</span>
            </div>
          </el-col>
          <el-col :span="8" class="lin-height30">
            <div class="grid-content bg-purple-light"> 评标价格：<span>{{evaluationPrice}}元</span></div>
          </el-col>
          <el-col :span="8" class="lin-height30">
            <div class="grid-content bg-purple-light"></div>
          </el-col>
        </el-row>
        <el-row class="coreds ">
          <el-col :span="8" class="lin-height30">
            <div class="grid-content bg-purple">
              技术性价格调整小计：<span class="technicalAdjustmentPrice">{{model.technicalAdjustmentPrice}}元</span>
            </div>
          </el-col>
          <el-col :span="8" class="lin-height30">
            <div class="grid-content bg-purple-light">商务性价格调整小计：<span>{{model.businessAdjustmentPrice}}元</span>
            </div>
          </el-col>
          <el-col :span="8" class="lin-height30">
            <div class="grid-content bg-purple">调整价格总计：<span>{{sumAdjustmentPriceTotal}}元</span></div>
          </el-col>
        </el-row>
      </div>
      <div class="scroll_warp">
        <div class="scroll_div">
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
                <el-button @click="addBtn()" size="small"><i class="icon iconfont icon-add mr5"></i>添加</el-button>
              </el-col>
            </el-row>
            <el-table
              class="mt5 table_form1"
              :data="model.arr"
              size="small"
              max-height="350"
              style="width: 100%"
              :default-sort="{prop: 'date', order: 'descending'}"
              border>
              <el-table-column label="调整因素说明">
                <template slot-scope="scope">
                  <el-form-item :prop="'arr.' + scope.$index + '.changeFactor'"
                                :rules='model.rules.changeFactor'>
                    <el-input size="small" v-model="scope.row.changeFactor" class="changeFactor_ipt"></el-input>
                    <span class="coreds pull-right" style="display: block;margin-top: -38px">*</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="计算基数（单位：元）">
                <template slot-scope="scope">
                  <el-form-item :prop="'arr.' + scope.$index + '.computationalBase'">
                    <el-input v-model="scope.row.computationalBase" size="small" class="computationalBase"
                              type="number"></el-input>
                    <span class="pull-right" style="display: block;margin-top: -39px;">元</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="增减" width="110">
                <template slot-scope="scope">
                  <el-form-item :prop="'arr.' + scope.$index + '.resource'">
                    <el-radio-group v-model="scope.row.resource" class="radio_group">
                      <el-radio label="增"></el-radio>
                      <el-radio label="减"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="比例（100.00）%">
                <template slot-scope="scope">
                  <el-form-item :prop="'arr.' + scope.$index + '.ratio'">
                    <el-input v-model="scope.row.ratio" size="small" class="ratio_input"
                              @blur="ratio(scope.$index, scope.row)" type="number"></el-input>
                    <span class="pull-right" style="display: block;margin-top: -39px;">%</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="调整金额（单位：元）">
                <template slot-scope="scope">
              <span class="pull-left symbol" style="display: block;  margin-top: 8px; margin-right: 9px;"
                    v-show="scope.row.resource==='增'">  {{model.jiahao}}</span>
                  <span class="pull-left symbol" style="display: block;  margin-top: 8px; margin-right: 9px;"
                        v-show="scope.row.resource==='减'">  {{model.jianhao}}</span>
                  <el-form-item :prop="'arr.' + scope.$index + '.chageCount'"
                                :rules='model.rules.chageCount'>
                    <el-input size="small" v-model="scope.row.chageCount" class="chageCount_ipt"
                              @blur="chageCountSum(scope.$index, scope.row)" type="number"></el-input>
                    <span class="coreds pull-left" style="display: block;margin-top: 2px;margin-left:10px">*</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="80" class="del_th">
                <template slot-scope="scope">
                  <div class="del-btn ">
                    <el-button @click="handleRemoveRow(scope.row,scope.$index)" size="small">删除
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!----------------商务性价格调整----------------------->
          <div class="technicalAdjustment">
            <el-row class="clearfix paddingB15 paddingT15">
              <el-col :span="12" class="coc0c pull-left lin-height28">
                <div class="grid-content bg-purple ">商务性价格调整</div>
              </el-col>
              <el-col :span="12" class="pull-left text-right">
                <el-button @click="business_add()" size="small">
                  <i class=" icon iconfont icon-add mr5"></i>
                  添加
                </el-button>
              </el-col>
            </el-row>
            <el-table
              class="mt5 table_form1"
              :data="model.arrbusiness"
              size="small"
              max-height="350"
              style="width: 100%"
              :default-sort="{prop: 'date', order: 'descending'}"
              border>
              <el-table-column label="调整因素说明">
                <template slot-scope="scope">
                  <el-form-item :prop="'arrbusiness.' + scope.$index + '.changeFactorbusiness'"
                                :rules='model.rulesbusiness.changeFactorbusiness'>
                    <el-input size="small" v-model="scope.row.changeFactorbusiness" class="changeFactor_ipt"></el-input>
                    <span class="coreds pull-right" style="display: block;margin-top: -38px">*</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="计算基数（单位：元）">
                <template slot-scope="scope">
                  <el-form-item :prop="'arrbusiness.' + scope.$index + '.computationalBasebusiness'">
                    <el-input v-model="scope.row.computationalBasebusiness" size="small" class="computationalBase"
                              type="number"></el-input>
                    <span class="pull-right" style="display: block;margin-top: -39px;">元</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="增减" width="110">
                <template slot-scope="scope">
                  <el-form-item :prop="'arrbusiness.' + scope.$index + '.resourcebusiness'">
                    <el-radio-group v-model="scope.row.resourcebusiness" class="radio_group">
                      <el-radio label="增"></el-radio>
                      <el-radio label="减"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="比例（100.00）%">
                <template slot-scope="scope">
                  <el-form-item :prop="'arrbusiness.' + scope.$index + '.ratiobusiness'">
                    <el-input v-model="scope.row.ratiobusiness" size="small" class="ratio_input"
                              @blur="ratiobusiness(scope.$index, scope.row)" type="number"></el-input>
                    <span class="pull-right" style="display: block;margin-top: -39px;">%</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="调整金额（单位：元）">
                <template slot-scope="scope">
              <span class="pull-left symbol" style="display: block;  margin-top: 8px; margin-right: 9px;"
                    v-show="scope.row.resource==='增'">  {{model.jiahao}}</span>
                  <span class="pull-left symbol" style="display: block;  margin-top: 8px; margin-right: 9px;"
                        v-show="scope.row.resource==='减'">{{model.jianhao}}</span>
                  <el-form-item :prop="'arrbusiness.' + scope.$index + '.chageCountbusiness'"
                                :rules='model.rulesbusiness.chageCountbusiness'>
                    <el-input size="small" v-model="scope.row.chageCountbusiness" class="chageCount_ipt"
                              @blur="chageCountSumbusiness(scope.$index, scope.row)" type="number"></el-input>
                    <span class="coreds pull-left" style="display: block;margin-top: 2px;margin-left:10px">*</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="80" class="del_th">
                <template slot-scope="scope">
                  <div class="del-btn ">
                    <el-button @click="del_business(scope.row,scope.$index)" size="small">删除
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <el-form-item label="降价附件：" class="clearfix marginT15">
        <el-input v-model="model.name" class="marginR10 pull-left " style="width: 300px" size="small "></el-input>
        <el-button size="small" @click.stop="adjunctBtn" class="pull-left" style="margin-top: 4px"> 浏览</el-button>
      </el-form-item>
      <el-form-item class="text-center">
        <el-button type="primary" @click="handeleSave(model)" size="small"
                   ref="submit">
          <i class="iconfont icon-queren"></i>
          提交
        </el-button>
        <el-button size="small" @click="goback()">
          <i class="iconfont icon-fanhuishouye1"></i>
          返回
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'PriceAdjustment',
    components: {},
    data() {
      return {
        //标价价调整
        model: {
          /*---------------技术性价格调整---------------*/
          jiahao: "+",//加减
          jianhao: "-",//加减
          fristQuote: 1000000,//投标价格
          evaluationPrice: 1000000,//评标价格
          technicalAdjustmentPrice: 0,//技术性价格调整小计
          businessAdjustmentPrice: 0,//商务性价格调整小计
          adjustmentPriceTotal: 0,//调整价格总计
          rules: {
            changeFactor: [
              {type: "string", required: true, message: "调整因素说明不能为空!",},
              {min: 1, max: 200, message: '长度在 1 到 200 个字符!', trigger: 'blur'}
            ],
            chageCount: {type: "string", required: true, message: "调整金额不能为空!",},
          },
          arr: [],
          resource: '',
          computationalBase: 0,//计算基数
          chageCount: 0,//调整金额
          ratio: 0,//比例
          name: "",
          moneySum: 0,
          arrjishu: [],//加法的时候，比例失去焦点所有的对象
          sumAmt: 0,//加法的时候，所有的调整金额之和
          arrjianfa: [],//减法的时候，比例失去焦点所有的对象
          sumjianfa: 0,//减法的时候，所有的调整金额之和
          delArr: [],//删除的数组
          delArrSum: 0,//删除的值
          deljainfaArr:[],
          deljainfaSum:[],
          /*-------------------------商务性调整---------------------*/
          arrbusiness: [],
          businessjiahao: "+",//加减
          businessjianhao: "-",//加减
          rulesbusiness: {
            changeFactorbusiness: [
              {type: "string", required: true, message: "调整因素说明不能为空!",},
              {min: 1, max: 200, message: '长度在 1 到 200 个字符!', trigger: 'blur'}
            ],
            chageCountbusiness: {type: "string", required: true, message: "调整金额不能为空!",},
          },
          resourcebusiness: '',
          computationalBasebusiness: 0,//计算基数
          chageCountbusiness: '0',//调整金额
          ratiobusiness: 0,//比例
          namebusiness: "",
          moneySumbusiness: 0,
          arrjishubusiness: [],//加法的时候，比例失去焦点所有的对象
          sumAmtbusiness: 0,//加法的时候，所有的调整金额之和
          arrjianfabusiness: [],//减法的时候，比例失去焦点所有的对象
          sumjianfabusiness: 0,//减法的时候，所有的调整金额之和
          delArrbusiness: [],//删除的数组
          delArrSumbusiness: 0,//删除的值
        },
        formLabelWidth: '120px',
      }
    },
    created() {
    },
    computed: {
      sumAdjustmentPriceTotal: function () {
        return this.model.technicalAdjustmentPrice + this.model.businessAdjustmentPrice;//调整价格总计：技术性价格调整表的调整金饿和商务性调整金饿的和
      },
      evaluationPrice: function () {
        return this.model.fristQuote + this.model.technicalAdjustmentPrice + this.model.businessAdjustmentPrice;//评标价格为首轮报价和调整价格的和
      }
    },
    watch: {
      'model.resource'(val) {
        if (val === '增') {
          $(".jiahao").show();
          $(".jianhao").hide();
        } else if (val === '减') {
          $(".jianhao").hide();
          $(".jiahao").show();
        }
      }
    },
    mounted() {

    },
    methods: {
      //技术性评标价格
      addBtn() {  //新增
        this.model.arr.push({changeFactor: '', computationalBase: '', resource: '增', chageCount: 0, ratio: ""})
      },
      ratio(index, obj) {//比例失焦
        if (obj.computationalBase !== '' && obj.ratio !== '' && obj.resource !== '') {
          if (obj.resource == '增') {     //radio为增
            obj.chageCount = Number(obj.computationalBase) * (Number(obj.ratio) / 100);//当计算基数和比例不为空时，调整金额=计算基数*（比例/100）;
            this.model.arrjishu.push(obj.chageCount);//加法：所有的调整金额放入数组
            this.model.sumAmt = this.model.arrjishu.reduce(function (e, b) {
              return e + b;
            });//求和（所有的调整金额之和）
          } else {     //radio为减
            obj.chageCount = Number(obj.computationalBase) * (Number(obj.ratio) / 100);
            this.model.arrjianfa.push(obj.chageCount);//减法：所有的调整金额放入数组
            this.model.sumjianfa = this.model.arrjianfa.reduce(function (e, b) {
              return e + b;
            });//求和（所有的调整金额之和）
          }
          this.model.technicalAdjustmentPrice = Number((this.model.sumAmt - this.model.sumjianfa - this.model.delArrSum).toFixed(2));//赋值
        }
      },
      chageCountSum(index, obj) {//调整金额失去焦点时
        if (obj.computationalBase == '' && obj.ratio == ''&&obj.resource=="增") {
          this.model.moneySum = Number(obj.chageCount);
          this.model.technicalAdjustmentPrice=Number(this.model.technicalAdjustmentPrice)+Number(this.model.moneySum);
        }else if (obj.computationalBase == '' && obj.ratio == ''&&obj.resource=="减") {
          this.model.moneySum = Number(obj.chageCount);
          this.model.technicalAdjustmentPrice=Number((this.model.technicalAdjustmentPrice-this.model.moneySum).toFixed(2));
        }
      },

      handleRemoveRow(obj, index) { //删除
        console.log(obj, index,'0');
        let _this = this;
        _this.$confirm('此操作将永久删除该费用项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.model.arr.splice(index, 1);
          if(obj.resource=="增"){
            _this.model.delArr.push(Number(obj.chageCount));
            _this.model.delArrSum = _this.model.delArr.reduce(function (e, b) {
              return e + b;
            });//所有的删除之和
            // _this.model.technicalAdjustmentPrice = Number((_this.model.technicalAdjustmentPrice -(obj.chageCount)).toFixed(2));
            console.log(this.model.sumAmt, this.model.sumjianfa, this.model.delArrSum);
            _this.model.technicalAdjustmentPrice = (Number((this.model.sumAmt) + Number(this.model.sumjianfa) - Number(this.model.delArrSum)).toFixed(2));
          }
          // else if(obj.resource=="减"){
          //   _this.model.delArr.push(obj.chageCount);
          //   _this.model.delArrSum = _this.model.delArr.reduce(function (e, b) {
          //     return e + b;
          //   });//所有的删除之和
          //   // _this.model.technicalAdjustmentPrice = Number((_this.model.technicalAdjustmentPrice+(obj.chageCount)).toFixed(2));
          //   _this.model.technicalAdjustmentPrice = Number((this.model.sumAmt - this.model.sumjianfa +this.model.delArrSum).toFixed(2));
          // } else if(  _this.model.arr=[]){
          //   _this.model.technicalAdjustmentPrice=0;
          // }
          _this.$message({
            type: 'success',
            message: '删除成功!',
          });

        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除!'
          });
        });
      },
      handeleSave(formName) { //必填保存
        this.$refs["form"].validate((valid, model) => {
          this.valid = valid;
          if (valid) {
            this.$message({
              type: 'success',
              message: '提交成功',
              center: true
            });
          } else {
            return false;
          }
        })
      },
      changePrice2() {
        this.dialogFormVisible = true;
      },
      //商务性评标价格
      business_add() {
        this.model.arrbusiness.push({
          changeFactorbusiness: '',
          computationalBasebusiness: '',
          resourcebusiness: '增',
          chageCountbusiness: "",
          ratiobusiness: ""
        })
      },
      ratiobusiness(index, obj) { //当计算基数和比例有值时，比例失焦
        // console.log(index, obj, '比例失焦商务');
        if (obj.computationalBasebusiness !== '' && obj.ratiobusiness !== '' && obj.resourcebusiness !== '') {
          if (obj.resourcebusiness == '增') {     //radio为增
            obj.chageCountbusiness = Number(obj.computationalBasebusiness) * (Number(obj.ratiobusiness) / 100);//当计算基数和比例不为空时，调整金额=计算基数*（比例/100）
            this.model.arrjishubusiness.push(obj.chageCountbusiness);//加法：所有的调整金额放入数组
            this.model.sumAmtbusiness = this.model.arrjishubusiness.reduce(function (e, b) {
              return e + b;
            });//求和（所有的调整金额之和）
          } else {     //radio为减
            obj.chageCountbusiness = Number(obj.computationalBasebusiness) * (Number(obj.ratiobusiness) / 100);
            this.model.arrjianfabusiness.push(obj.chageCountbusiness);//减法：所有的调整金额放入数组
            this.model.sumjianfabusiness = this.model.arrjianfabusiness.reduce(function (e, b) {
              return e + b;
            });//求和（所有的调整金额之和）
          }
          this.model.businessAdjustmentPrice = Number((this.model.sumAmtbusiness - this.model.sumjianfabusiness-this.model.delArrSumbusiness).toFixed(2));//赋值
        }
      },
      chageCountSumbusiness(index, obj) {//商务调整金额失去焦点时
        if (obj.computationalBasebusiness == '' && obj.ratiobusiness == '') {
          this.model.moneySumbusiness = Number(obj.chageCountbusiness);
        }
      },
      del_business(obj, index) { //商务删除
        // console.log(obj, index, '商务删除');
        this.model.businessAdjustmentPrice = Number((this.model.businessAdjustmentPrice - (obj.chageCountbusiness)).toFixed(2));
        // console.log(this.model.technicalAdjustmentPrice, obj.chageCountbusiness, '11111111111111111');
        this.model.delArrbusiness.push(obj.chageCountbusiness);
        // console.log(this.model.delArrbusiness, '删除的数组');
        this.model.delArrSumbusiness = this.model.delArrbusiness.reduce(function (e, b) {
          return e + b;
        });//所有的删除之和
        // console.log(this.model.delArrSumbusiness, '所有的删除之和');
        let _this = this;
        _this.$confirm('此操作将永久删除该费用项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.model.arrbusiness.splice(index, 1);
          _this.$message({
            type: 'success',
            message: '删除成功!',
          });
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除!'
          });
        });
      },
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .priceAdjustment {
    .scroll_warp {
      .scroll_div {
        /*position: absolute;*/
        /*top: 16px;*/
        /*left: 0;*/
        /*width: 100%;*/
        /*height: 700px;*/
        /*padding: 25px 0;*/
        /*overflow-y: auto;*/
        .technicalAdjustment {
          .table_form1 {
            .changeFactor_ipt {
              float: left;
              .el-input__inner {
                width: 95%;
              }
            }
            .computationalBase {
              float: left;
              .el-input__inner {
                width: 90%;
              }
            }
            .ratio_input {
              float: left;
              .el-input__inner {
                width: 93%;
              }
            }
            .radio_group {
              .el-radio + .el-radio {
                margin-left: 13px;
              }
            }
            .el-table__row {
              .el-table_5_column_19 {
                margin-top: -20px;
              }
            }
            .chageCount_ipt {
              width: 80%;
              float: left;
              .el-form-item__error {
                margin-left: 16px !important;
              }
            }
            .el-table_5_column_16 {

              .el-radio-group1 {
                .el-radio + .el-radio {
                  margin-left: 13px;
                }
              }
            }
            /*.el-table_5_column_19{*/
            /*margin-top: 13px;*/
            /*float: left;*/
            /*width: 100%;*/
            /*}*/
          }
        }
      }
    }
  }
</style>


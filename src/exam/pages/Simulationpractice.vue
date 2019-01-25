 <template>
    <div class="mypapers">
      <el-row>
        <el-col>
            <div class="pull-left search-warpper marginB10">
              <div class="pull-left search-title marginR10">试卷名称:</div>
              <el-input class=" pull-left input150" v-model="name" @keyup.enter.native="getMypapers"></el-input>
              <el-button class="pull-left marginL10" type="primary" @click="getMypapers"  icon="search">搜索</el-button>
            </div>
            <!-- <div class="pull-right">
              <router-link :to="{path:'edit',query:{'id':'1'}}"><el-button type="primary">新增试卷</el-button></router-link>
              <el-button type="danger" :disabled="isSelected" @click="deletePaper">批量删除</el-button>
            </div> -->
        </el-col>
        <el-col>
          <el-table
            class="table"
            ref="multipleTable"
            :data="mypapers"
            border
            tooltip-effect="dark"
            style="width: 100%"
            >
            
            <el-table-column
              label="试卷名称"
              prop="name"
              show-overflow-tooltip>
              <template scope="scope">
                {{scope.row.name}}
              </template>
            </el-table-column>
            <el-table-column
              label="试卷总分"
              prop="totalPoints"
              align="center"
              width="100">
            </el-table-column>
            <el-table-column
              prop="time"
              width="100"
              align="center"
              label="考试时长"
             >
            </el-table-column>
            <el-table-column
              width="190"
              align="center"
              label="考试时间"
            >
            <template scope="scope">
              {{scope.row.startTime?new Date(scope.row.startTime).toLocaleString():'还未开考'}}
            </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
            >
              <template scope="scope">
                <el-button type="primary" size="mini" @click="publish(scope.row._id)">练习</el-button>
                <!-- <el-button type="primary" size="mini" v-if="scope.row.startTime&&(nowTime - new Date(scope.row.startTime))/(1000*60) > 2" @click="publish(scope.row._id)">再次发布</el-button>
                <el-button type="primary" size="mini" v-else :disabled="scope.row.startTime?true:false" @click="publish(scope.row._id)">{{scope.row.startTime?'已发布':'发布'}}</el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="deletePaper(scope.row)">删除</el-button>
                <router-link :to="{path:'edit',query:{'id':scope.row._id}}">
                  <el-button type="info" size="mini" icon="el-icon-edit" :disabled="scope.row.startTime&&(nowTime - new Date(scope.row.startTime))/(1000*60) < 60">编辑</el-button>
                </router-link> -->
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col class="marginT10" v-if="pageTotal>pageSize">
          <div class="page-wrapper pull-right">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="pageNumber"
              :page-size="pageSize"
              layout="total, prev, pager, next"
              :total="pageTotal">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
export default {
  data() {
    return {
      selections:[],
      visible:false,
      name: '', // 试卷名称 v-model
      pageNumber: 1, // 当前页
      pageSize:10 ,
      pageTotal: 0, // 数据总数
      examLogs: [],
      isExam: false,
      mypapers: [] // 试卷数据
    }
  },
  computed: {
    /**
     * 判断是否有选中项
     * @return {Boolean}
     */
    isSelected() {
      if (this.selections.length>0) {
        return false
      }else {
        return true
      }
    },
    nowTime(){
      return new Date();
    }
  },
  mounted(){
    this.getMypapers();

    this.getExamLogs();   //跳转需要的数据
  },
  methods: {
    /**
     * [getMypapers 加载试卷信息]
     * @return {[type]} [description]
     */
    getMypapers(){
      this.$axios.get('/api/mypapers',{
        params:{
          name: this.name,
          pageSize: this.pageSize,
          pageNumber: this.pageNumber
        }
      }).then(response => {
        let res = response.data;
        if(res.status == 0) {
          this.mypapers = res.result._papers;
          this.pageTotal = res.count;
        }
      }).catch(err => {
        this.$message.error("获取试卷数据失败!")
      })
    },
    /**
     * 将选中项赋值给this.selections
     * @param  {val} 框架自带，选中项
     * @return {[type]}
     */
   
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    /**
     * 删除试卷
     * @return {[type]}
     */
    
    /**
     * 发布试卷
     * @param id 试卷id
     */
      
    publish(paper){
      console.log(paper)
      this.judgeTime(paper);
    },
    getExamLogs(){
      this.$axios.get('/api/getexamlogs',{
        params:{
          name: '',
          pageNumber: 1,
          pageSize: 10000,
        }
      }).then(response => {
        let res = response.data;
        this.examLogs = res.result.exams || [];
      })
    },
    judgeTime(paper){
      // console.log(paper)
      this.isExam = false;
      if(this.examLogs.length > 0){
        this.examLogs.forEach(item => {
          // console.log(item);
          if(item._paper&&item._paper._id == paper && item.startTime == paper.startTime){
            this.isExam = true;
            this.$message.error('已经参加过本次考试，不能重复参加!');
            return;
          }
        })
        if(!this.isExam){
          this.$router.push({name:'ForntExam',params:{id:paper}});
        }
      }else {
        this.$router.push({name:'ForntExam',params:{id:paper}});
      }
      
    }
  }
}
</script>

<style rel="stylesheet/scss" scoped="scoped" lang="scss">
  .mypapers{
   // width: 100%;
    height:100%;
    overflow-y: scroll;
    margin:15px;
  }
  .mypapers::-webkit-scrollbar {
    display:none
  }
</style>

import Vue from 'vue'
import Router from 'vue-router'
// 前台考试
import FrontLogin from '@/exam/login'
import FrontRegister from '@/exam/register'
import FrontHome from '@/exam/home'
import FrontIndex from '@/exam/pages/index' // 学生端首页
import FrontStudentInfo from '@/exam/pages/studentinfo'  // 学生端个人信息
import Simulationpractice from '@/exam/pages/Simulationpractice'  // 模拟练习
import ForntExamIndex from '@/exam/pages/examindex'
import ForntExam from '@/exam/pages/exam'
//------------ 后台管理----------------//
import EndLogin from '@/examManage/login'
import EndRegister from '@/examManage/register'
import EndHome from '@/examManage/home'
import Index from '@/examManage/pages/index'
// 试卷管理
import MyPapers from '@/examManage/pages/papersManage/mypapers'
import MarkPapers from '@/examManage/pages/papersManage/markpapers'
// import EditPaper from '@/examManage/pages/papersManage/editpaper'
import EditPaper from '@/examManage/pages/papersManage/editpaper'
import CheckPaper from '@/examManage/pages/papersManage/checkpaper'
// 我的信息管理
import User from '@/examManage/pages/usermsg'
// 学生成绩管理
import StudentManage from '@/examManage/pages/studentManage'
import StudentResult from '@/examManage/pages/studentResult'




// 404
import NoFind from '@/errpages/404'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // 前台考试
    { path: '/', name: 'FrontLogin', component: FrontLogin},
    { path: '/frontregister', name: 'FrontRegister', component: FrontRegister },
    { path: '/fronthome', name: 'FrontHome', component: FrontHome,
      children: [
        { path: 'frontindex', name: 'FrontIndex', component: FrontIndex},
        { path: 'frontstudentinfo', name: 'FrontStudentInfo', component: FrontStudentInfo},
        { path: 'Simulationpractice', name: 'Simulationpractice', component: Simulationpractice},
        { path: 'forntexamindex', name: 'ForntExamIndex', component: ForntExamIndex},
        { path: 'forntexam', name: 'ForntExam', component: ForntExam}
      ]
    },
    // 后台管理
    { path: '/managelogin', name: 'EndLogin', component: EndLogin}, //后台登录
    { path: '/manageregister', name: 'EndRegister', component: EndRegister }, // 后台注册
    { path: '/endhome', name: 'EndHome', component: EndHome, meta: {breadName:'管理系统'},
      children: [
        { path: 'index', name: 'Index', component: Index, meta: {breadName:'首页'},}, // 后台首页
        // 试卷管理
        { path: 'mypapers', name: 'MyPapers', component: MyPapers, meta: {breadName: '我的试卷'}},
        // { path: 'edit/:id', name: 'EditPaper', component: EditPaper, meta: {breadName: '编辑试卷'}},
        { path: 'edit', name: 'EditPaper', component: EditPaper, meta: {breadName: '编辑试卷'}},
        { path: 'markpapers', name: 'MarkPapers', component: MarkPapers, meta: {breadName: '查看考试'}},
        { path: 'checkpaper', name: 'CheckPaper', component: CheckPaper, meta: {breadName: '阅卷'}},
        { path: 'studentmanage', name: 'StudentManage', component: StudentManage, meta: {breadName: '学生成绩管理'}},
        { path: 'studentresult', name: 'StudentResult', component: StudentResult, meta: {breadName: '学生考试成绩'}},
        // 我的信息
        { path: 'user', name: 'User', component: User, meta: {breadName:'我的信息'},} // 我的信息管理
      ]
    },


    // 操作题路由
    { path: '/operation', name: 'Operation', component: () => import('../operations/index.vue'), meta: {breadName:'操作题'},
      children: [
        // 合理低价办法
        { path: 'zjps/hldj/participateIn', name: 'zjps/hldj/participateIn', component: () => import('../operations/zjps/hldj/participateIn.vue'), meta: {breadName:'参与评审'},}, // 参与评审
        { path: 'zjps/hldj/electTeamLeader', name: 'zjps/hldj/electTeamLeader', component: () => import('../operations/zjps/hldj/electTeamLeader.vue'), meta: {breadName:'推举组长'},}, // 推举组长
        { path: 'zjps/hldj/electAfter', name: 'zjps/hldj/electAfter', component: () => import('../operations/zjps/hldj/electAfter.vue'), meta: {breadName:'推举组长下一步'},}, // 推举组长下一步
        { path: 'zjps/hldj/bidLink', name: 'zjps/hldj/bidLink.vue', component: () => import('../operations/zjps/hldj/bidLink.vue'), meta: {breadName:'评标环节'},}, // 评标环节
        { path: 'zjps/hldj/startEvaluation', name: 'zjps/hldj/startEvaluation.vue', component: () => import('../operations/zjps/hldj/startEvaluation.vue'), meta: {breadName:'开始评标'},}, // 开始评标
        { path: 'zjps/hldj/myQualificationsResult', name: 'zjps/hldj/myQualificationsResult.vue', component: () => import('../operations/zjps/hldj/myQualificationsResult.vue'), meta: {breadName:'单项评标结果'},}, // 单项评标结果
        { path: 'zjps/hldj/unFinishQualificationsResult', name: 'zjps/hldj/unFinishQualificationsResult.vue', component: () => import('../operations/zjps/hldj/unFinishQualificationsResult.vue'), meta: {breadName:'未完成时的评审汇总'},}, // 未完成时的评审汇总
        { path: 'zjps/hldj/finishQualificationsResult', name: 'zjps/hldj/finishQualificationsResult.vue', component: () => import('../operations/zjps/hldj/finishQualificationsResult.vue'), meta: {breadName:'完成时的评审汇总'},}, // 完成时的评审汇总
        { path: 'zjps/hldj/businessAffairs', name: 'zjps/hldj/businessAffairs.vue', component: () => import('../operations/zjps/hldj/businessAffairs.vue'), meta: {breadName:'商务评审'},}, // 商务评审
        { path: 'zjps/hldj/reviewSummary', name: 'zjps/hldj/reviewSummary.vue', component: () => import('../operations/zjps/hldj/reviewSummary.vue'), meta: {breadName:'评审汇总'},}, // 评审汇总
        { path: 'zjps/hldj/submitSummary', name: 'zjps/hldj/submitSummary.vue', component: () => import('../operations/zjps/hldj/submitSummary.vue'), meta: {breadName:'提交评审汇总'},}, // 提交评审汇总

        // 综合评标办法
        { path: 'zjps/zhpbbf/participateIn', name: 'zjps/zhpbbf/participateIn', component: () => import('../operations/zjps/zhpbbf/participateIn.vue'), meta: {breadName:'参与评审'},}, // 参与评审
        { path: 'zjps/zhpbbf/electTeamLeader', name: 'zjps/zhpbbf/electTeamLeader', component: () => import('../operations/zjps/zhpbbf/electTeamLeader.vue'), meta: {breadName:'推举组长'},}, // 推举组长
        { path: 'zjps/zhpbbf/bidLink', name: 'zjps/zhpbbf/bidLink.vue', component: () => import('../operations/zjps/zhpbbf/bidLink.vue'), meta: {breadName:'评标环节'},}, // 评标环节
        { path: 'zjps/zhpbbf/startEvaluation', name: 'zjps/zhpbbf/startEvaluation.vue', component: () => import('../operations/zjps/zhpbbf/startEvaluation.vue'), meta: {breadName:'开始评标'},}, // 开始评标
        { path: 'zjps/zhpbbf/myQualificationsResult', name: 'zjps/zhpbbf/myQualificationsResult.vue', component: () => import('../operations/zjps/zhpbbf/myQualificationsResult.vue'), meta: {breadName:'单项评标结果'},}, // 单项评标结果
        { path: 'zjps/zhpbbf/unFinishQualificationsResult', name: 'zjps/zhpbbf/unFinishQualificationsResult.vue', component: () => import('../operations/zjps/zhpbbf/unFinishQualificationsResult.vue'), meta: {breadName:'未完成时的评审汇总'},}, // 未完成时的评审汇总
        { path: 'zjps/zhpbbf/finishQualificationsResult', name: 'zjps/zhpbbf/finishQualificationsResult.vue', component: () => import('../operations/zjps/zhpbbf/finishQualificationsResult.vue'), meta: {breadName:'完成时的评审汇总'},}, // 完成时的评审汇总
        { path: 'zjps/zhpbbf/businessAffairs', name: 'zjps/zhpbbf/businessAffairs.vue', component: () => import('../operations/zjps/zhpbbf/businessAffairs.vue'), meta: {breadName:'商务评审'},}, // 商务评审
        { path: 'zjps/zhpbbf/reviewSummary', name: 'zjps/zhpbbf/reviewSummary.vue', component: () => import('../operations/zjps/zhpbbf/reviewSummary.vue'), meta: {breadName:'评审汇总'},}, // 评审汇总
        { path: 'zjps/zhpbbf/submitSummary', name: 'zjps/zhpbbf/submitSummary.vue', component: () => import('../operations/zjps/zhpbbf/submitSummary.vue'), meta: {breadName:'提交评审汇总'},}, // 提交评审汇总

        // 双信封评标办法
        { path: 'zjps/sxfpbbf/participateIn', name: 'zjps/sxfpbbf/participateIn', component: () => import('../operations/zjps/sxfpbbf/participateIn.vue'), meta: {breadName:'参与评审'},}, // 参与评审



      ]
    },

    { path: '/*', name: '404', component: NoFind }
  ]
})

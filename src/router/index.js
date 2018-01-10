import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/application/Hello'
// import {ActionSheet, Navbar, TabItem, ListContainer, ListItem} from 'yun-ui'
import 'yun-ui/dist/yun/ActionSheet/index.css'
import 'yun-ui/dist/yun/Navbar/index.css'
import 'yun-ui/dist/yun/TabItem/index.css'
import 'yun-ui/dist/yun/ListContainer/index.css'
import 'yun-ui/dist/yun/ListItem/index.css'
const views = r => require.ensure([], () => r(require('../components/views')))
const index = r => require.ensure([], () => r(require('../components/index')))
// const Ready = r => require.ensure([], () => r(require('../components/Ready')))
const selectDate = r => require.ensure([], () => r(require('../components/application/selectDate')))
const approval = r => require.ensure([], () => r(require('../components/application/approval')))
const addApproval = r => require.ensure([], () => r(require('../components/application/addApproval')))
const fund = r => require.ensure([], () => r(require('../components/fund/index')))
const fundReceipt = r => require.ensure([], () => r(require('../components/fund/receipt')))
// 差旅费报销首页
const indexTravel = r => require.ensure([], () => r(require('../components/approval/index')))
// 差旅费新建
const travelNew = r => require.ensure([], () => r(require('../components/approval/new')))
// 差旅费-金额明细
const travelPriceDetail = r => require.ensure([], () => r(require('../components/approval/priceDetail')))
// 差旅费-报销单
const travelDispatchList = r => require.ensure([], () => r(require('../components/approval/dispatchList')))
// 差旅费-报销单－暂存
const travelDispatchHold = r => require.ensure([], () => r(require('../components/approval/dispatchHold')))
// 单据搜索
const indexSearch = r => require.ensure([], () => r(require('../components/search/index')))
// 单据搜索-搜索页
const searchFrame = r => require.ensure([], () => r(require('../components/search/searchFrame')))
// 单据搜索-只有搜索框
const searchJust = r => require.ensure([], () => r(require('../components/search/justSearch')))
// 单据搜索-选择公司
const searchCompany = r => require.ensure([], () => r(require('../components/search/chooseCompany')))
// 选择部门
const searchDepart = r => require.ensure([], () => r(require('../components/search/chooseDepart')))
// 选择人员
const searchPerson = r => require.ensure([], () => r(require('../components/search/choosePerson')))
// 费用报销-新建
const addFundReceipt = r => require.ensure([], () => r(require('../components/fund/addReceipt')))
// 资金支付-首页
const payment = r => require.ensure([], () => r(require('../components/payment/index')))
// 资金支付-单据
const paymentReceipt = r => require.ensure([], () => r(require('../components/payment/receipt')))
// 资金支付-新建
const addPaymentReceipt = r => require.ensure([], () => r(require('../components/payment/addReceipt')))
// 审批记录
const history = r => require.ensure([], () => r(require('../components/application/history')))
// 案场管理-销控表
const table = r => require.ensure([], () => r(require('../components/manage/table')))
// 顾问助手-选择项目
const selectProject = r => require.ensure([], () => r(require('../components/assistant/selectProject')))
// 顾问助手-选择楼栋
const selectBuilding = r => require.ensure([], () => r(require('../components/assistant/selectBuilding')))
// 顾问助手首页-修改客户基本信息
const basicMess = r => require.ensure([], () => r(require('../components/assistant/basicMess')))
// 顾问助手首页-修改客户详细信息
const detailedMess = r => require.ensure([], () => r(require('../components/assistant/detailedMess')))
// 顾问助手首页
const assIndex = r => require.ensure([], () => r(require('../components/assistant/assIndex')))
// 顾问助手-客户-客户管理
const client = r => require.ensure([], () => r(require('../components/assistant/client')))
// 顾问助手业绩
const performance = r => require.ensure([], () => r(require('../components/assistant/performance')))
// 顾问助手首页-跟进-逾期未跟进（客户列表）
const notFollow = r => require.ensure([], () => r(require('../components/assistant/notFollow')))
// 顾问助手首页-催办-认购未签约（客户列表）
const notSign = r => require.ensure([], () => r(require('../components/assistant/notSign')))
// 顾问助手首页-跟进-即将逾期（客户列表）
const aboutOver = r => require.ensure([], () => r(require('../components/assistant/aboutOver')))
// 顾问助手首页-催办-签约未回款（客户列表）
const notReturn = r => require.ensure([], () => r(require('../components/assistant/notReturn')))
// 顾问助手 添加客户基本信息
const addClientBasic = r => require.ensure([], () => r(require('../components/assistant/addClientBasic')))
// 顾问助手 添加客户详细信息
const addClientDetailed = r => require.ensure([], () => r(require('../components/assistant/addClientDetailed')))
// 顾问助手业绩详情-预定
const performanceReserve = r => require.ensure([], () => r(require('../components/assistant/performanceReserve')))
// 顾问助手业绩详情-认购
const performanceSubscription = r => require.ensure([], () => r(require('../components/assistant/performanceSubscription')))
// 顾问助手业绩详情-签约
const performanceSign = r => require.ensure([], () => r(require('../components/assistant/performanceSign')))
// 顾问助手业绩详情-回款
const performancePayment = r => require.ensure([], () => r(require('../components/assistant/performancePayment')))
// 案场管理-房间信息
const manageHouse = r => require.ensure([], () => r(require('../components/manage/houseMess')))
// 顾问助手--客户-客户管理-客户详情
const customerInfo = r => require.ensure([], () => r(require('../components/assistant/customerInfo')))
// 调查问卷
const questionnaireLine = r => require.ensure([], () => r(require('../components/assistant/questionnaireLine')))
// 调查问卷内容
const questionSurvey = r => require.ensure([], () => r(require('../components/assistant/questionSurvey')))
// 顾问助手--客户-客户管理-客户详情-新增跟进-选择跟进类型
const selectRecordType = r => require.ensure([], () => r(require('../components/assistant/selectRecordType')))
// 顾问助手--客户-新增客户多选项
const chooseItem = r => require.ensure([], () => r(require('../components/assistant/choose')))
// 顾问助手--选择国家
const national = r => require.ensure([], () => r(require('../components/assistant/national')))
// 顾问助手-销控表
const assistantTable = r => require.ensure([], () => r(require('../components/assistant/assistantTable')))
// 顾问助手-房间信息
const assistantHouse = r => require.ensure([], () => r(require('../components/assistant/assistantHouse')))
// 顾问助手--客户--新增跟进信息
const newFollow = r => require.ensure([], () => r(require('../components/assistant/newFollow')))
// 案场管理-首页
const manageIndex = r => require.ensure([], () => r(require('../components/manage/index')))
// 案场管理-客户
const manageClient = r => require.ensure([], () => r(require('../components/manage/client')))
// 案场管理-销控表
const manageTable = r => require.ensure([], () => r(require('../components/manage/table')))
// 案场管理-业绩
const managePerformance = r => require.ensure([], () => r(require('../components/manage/performance')))
// 案场管理-选择项目
const manageSelectProject = r => require.ensure([], () => r(require('../components/manage/selectProject')))
// 案场管理-选择楼栋
const manageSelectBuilding = r => require.ensure([], () => r(require('../components/manage/selectBuilding')))
// 案场管理-客户-分配置业顾问
const manageCounsellor = r => require.ensure([], () => r(require('../components/manage/counsellor')))
// 顾问助手-业绩中的房间信息(预定，认购，签约)
const performanceHouse = r => require.ensure([], () => r(require('../components/assistant/performanceHouse')))
// 顾问助手-业绩中的房间信息(回款)
const huikuanHouse = r => require.ensure([], () => r(require('../components/assistant/huikuanHouse')))
// 案场管理-团队管理
const performanceTeam = r => require.ensure([], () => r(require('../components/manage/team')))
// 案场管理-团队管理详情
const manageTeamMess = r => require.ensure([], () => r(require('../components/manage/teamMess')))
// 案场管理-置业顾问业绩
const assistantPer = r => require.ensure([], () => r(require('../components/manage/assistantPer')))
// 案场管理-业绩-销售业绩
const manageSale = r => require.ensure([], () => r(require('../components/manage/sale')))
// 案场管理-调查问卷
const manageQuestionnaireLine = r => require.ensure([], () => r(require('../components/manage/questionnaireLine')))
// 案场管理-调问卷内容
const manageQuestionSurvey = r => require.ensure([], () => r(require('../components/manage/questionSurvey')))
// 案场管理-业绩-销售业绩-预订图
const saleReserve = r => require.ensure([], () => r(require('../components/manage/saleReserve')))
// 案场管理-业绩-销售业绩-认购图
const saleSubscription = r => require.ensure([], () => r(require('../components/manage/saleSubscription')))
// 案场管理-业绩-销售业绩-签约图
const saleSign = r => require.ensure([], () => r(require('../components/manage/saleSign')))
// 案场管理-业绩-销售业绩-回款图
const salePayment = r => require.ensure([], () => r(require('../components/manage/salePayment')))
// 案场管理-来电来访
const manageCallVisit = r => require.ensure([], () => r(require('../components/manage/callVisit')))
// 案场管理-业绩-销售业绩-预定详情
const manageReserve = r => require.ensure([], () => r(require('../components/manage/performanceReserve')))
// 案场管理-业绩-销售业绩-认购详情
const manageSubscription = r => require.ensure([], () => r(require('../components/manage/performanceSubscription')))
// 案场管理-业绩-销售业绩-签约详情
const manageSign = r => require.ensure([], () => r(require('../components/manage/performanceSign')))
// 案场管理-业绩-销售业绩-回款详情
const managePayment = r => require.ensure([], () => r(require('../components/manage/performancePayment')))
// 案场管理-来电来访详情
const manageCallVisitDetail = r => require.ensure([], () => r(require('../components/manage/callVisitDetail')))
// 案场管理-业绩-在途情况
const manageZaiTu = r => require.ensure([], () => r(require('../components/manage/zaitu')))
// 案场管理-业绩-房间信息(预订 认购 签约)
const manageRengouHouse = r => require.ensure([], () => r(require('../components/manage/performanceHouse')))
// 案场管理-跟进详情
const manageFollowDetail = r => require.ensure([], () => r(require('../components/manage/followDetail')))
// 案场管理-客户详情
const manageCustomerInfo = r => require.ensure([], () => r(require('../components/manage/customerInfo.vue')))
// 案场管理-业绩-房间信息(回款)
const managehuikuanHouse = r => require.ensure([], () => r(require('../components/manage/huikuanHouse')))
// 费用报销-选择审批人员
const chooseFlow = r => require.ensure([], () => r(require('../components/search/chooseFlow.vue')))
// 报表-首页
const statementIndex = r => require.ensure([], () => r(require('../components/statement/index')))
// 报表-销售分析
const salesAnalysis = r => require.ensure([], () => r(require('../components/statement/salesAnalysis')))
// 报表-销售分析-选择时间
const selectTime = r => require.ensure([], () => r(require('../components/statement/selectTime')))
// 报表-选择项目
const statementProject = r => require.ensure([], () => r(require('../components/statement/selectProject')))
// 报表-逾期分析
const statementOverDate = r => require.ensure([], () => r(require('../components/statement/overDateHeader')))
// 报表-客户分析
const customerAnalysis = r => require.ensure([], () => r(require('../components/statement/customerAnalysis')))
// 报表-逾期分析-认购未签约
const overDateRenGou = r => require.ensure([], () => r(require('../components/statement/overDateRenGou')))
// 报表-逾期分析-签约未回款
const overDateQianYue = r => require.ensure([], () => r(require('../components/statement/overDateQianYue')))
// 报表-团队业绩
const teamManage = r => require.ensure([], () => r(require('../components/statement/teamManage')))
// 报表-逾期分析-1
const overDateAnalysis = r => require.ensure([], () => r(require('../components/statement/overDateAnalysis')))
// 报表-逾期分析-认购未签约-1
const renGouAnalysis = r => require.ensure([], () => r(require('../components/statement/renGouAnalysis')))
// 报表-逾期分析-签约未回款-1
const qianYueAnalysis = r => require.ensure([], () => r(require('../components/statement/qianYueAnalysis')))

// Vue.component(TabItem.name, TabItem)
// Vue.component(ActionSheet.name, ActionSheet)
// Vue.component(ListContainer.name, ListContainer)
// Vue.component(ListItem.name, ListItem)

Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/',
            name: 'views',
            component: views
        }, {
            path: '/hello',
            name: 'Hello',
            component: Hello
        }, {
            path: '/index',
            name: 'index',
            component: index
        }, {
            path: '/select/:module',
            name: 'selectDate',
            component: selectDate
        }, {
            path: '/approval/:id',
            name: 'approval',
            component: approval
        }, {
            path: '/addApproval',
            name: 'addApproval',
            component: addApproval
        }, {
            // 审批记录
            path: '/history',
            name: 'history',
            component: history
        }, {
            // 差旅费报销首页
            path: '/indexTravel',
            name: 'indexTravel',
            component: indexTravel
        }, {
            // 差旅费新建
            path: '/travelNew',
            name: 'travelNew',
            component: travelNew
        }, {
            // 差旅费-金额明细
            path: '/travelPriceDetail',
            name: 'travelPriceDetail',
            component: travelPriceDetail
        }, {
            // 差旅费报销单
            path: '/travelDispatchList/:id',
            name: 'travelDispatchList',
            component: travelDispatchList
        }, {
            // 差旅费报销单－暂存
            path: '/travelDispatchHold',
            name: 'travelDispatchHold',
            component: travelDispatchHold
        }, {
            //  单据搜索
            path: '/indexSearch',
            name: 'indexSearch',
            component: indexSearch
        }, {
            //  单据搜索－搜索页
            path: '/searchFrame',
            name: 'searchFrame',
            component: searchFrame
        }, {
            //  单据搜索－只有搜索框
            path: '/searchJust',
            name: 'searchJust',
            component: searchJust
        }, {
            //  单据搜索－选择公司
            path: '/searchCompany/:path/:item/:code',
            name: 'searchCompany',
            component: searchCompany
        }, {
            path: '/searchDepart/:path/:item/:code',
            name: 'searchDepart',
            component: searchDepart
        }, {
            path: '/searchPerson/:path/:item/:code',
            name: 'searchPerson',
            component: searchPerson
        }, {
            path: '/fund',
            name: 'fund',
            component: fund
        }, {
            path: '/fund/receipt/:id',
            name: 'fundReceipt',
            component: fundReceipt
        }, {
            path: '/fund/addReceipt',
            name: 'addFundReceipt',
            component: addFundReceipt
        }, {
            path: '/payment',
            name: 'payment',
            component: payment
        }, {
            path: '/payment/receipt/:id',
            name: 'paymentReceipt',
            component: paymentReceipt
        }, {
            path: '/payment/addReceipt',
            name: 'addPaymentReceipt',
            component: addPaymentReceipt
        }, {
            path: '/dist',
            redirect: '/'
        }, {
            path: '/assistant/table',
            name: 'table',
            component: table
        }, {
            path: '/assistant/selectProject/:code/:type',
            name: 'selectProject',
            component: selectProject
        }, {
            path: '/assistant/selectBuilding/:type',
            name: 'selectBuilding',
            component: selectBuilding
        }, {
            path: '/assistant/assIndex/notFollow/:id/basicMess',
            name: 'basicMess',
            component: basicMess
        }, {
            path: '/assistant/assIndex/notFollow/detailedMess',
            name: 'detailedMess',
            component: detailedMess
        }, {
            path: '/assistant/assIndex',
            name: 'assIndex',
            component: assIndex
        }, {
            path: '/assistant/client',
            name: 'client',
            component: client
        }, {
            path: '/assistant/performance',
            name: 'performance',
            component: performance
        }, {
            path: '/assistant/assIndex/notFollow',
            name: 'notFollow',
            component: notFollow
        }, {
            path: '/assistant/assIndex/notSign',
            name: 'notSign',
            component: notSign
        }, {
            path: '/assistant/assIndex/aboutOver',
            name: 'aboutOver',
            component: aboutOver
        }, {
            path: '/assistant/assIndex/notReturn',
            name: 'notReturn',
            component: notReturn
        }, {
            path: '/assistant/addClientBasic',
            name: 'addClientBasic',
            component: addClientBasic
        }, {
            path: '/assistant/addClientDetailed',
            name: 'addClientDetailed',
            component: addClientDetailed
        }, {
            path: '/assistant/performanceReserve',
            name: 'performanceReserve',
            component: performanceReserve
        }, {
            path: '/assistant/performanceSubscription',
            name: 'performanceSubscription',
            component: performanceSubscription
        }, {
            path: '/assistant/performanceSign',
            name: 'performanceSign',
            component: performanceSign
        }, {
            path: '/assistant/performancePayment',
            name: 'performancePayment',
            component: performancePayment
        }, {
            path: '/manage/houseMess',
            name: 'manageHouse',
            component: manageHouse
        }, {
            path: '/assistant/client/customerInfo/:id',
            name: 'customerInfo',
            component: customerInfo
        }, {
            path: '/assistant/questionnaireLine/:id',
            name: 'questionnaireLine',
            component: questionnaireLine
        }, {
            path: '/assistant/questionnaireLine/:id/:type',
            name: 'questionSurvey',
            component: questionSurvey
        }, {
            path: '/assistant/client/customerInfo/:id/selectRecordType',
            name: 'selectRecordType',
            component: selectRecordType
        }, {
            path: '/assistant/addClientBasic/:type',
            name: 'chooseItem',
            component: chooseItem
        }, {
            path: '/assistant/addClientDetailed/national',
            name: 'national',
            component: national
        }, {
            path: '/assistant/assistantTable',
            name: 'assistantTable',
            component: assistantTable
        }, {
            path: '/assistant/assistantHouse',
            name: 'assistantHouse',
            component: assistantHouse
        }, {
            path: '/assistant/client/customerInfo/:id/newFollow',
            name: 'newFollow',
            component: newFollow
        }, {
            path: '/manage/index',
            name: 'manageIndex',
            component: manageIndex
        }, {
            path: '/manage/client',
            name: 'manageClient',
            component: manageClient
        }, {
            path: '/manage/table',
            name: 'manageTable',
            component: manageTable
        }, {
            path: '/manage/performance',
            name: 'managePerformance',
            component: managePerformance
        }, {
            path: '/manage/selectProject/:code/:type',
            name: 'manageSelectProject',
            component: manageSelectProject
        }, {
            path: '/manage/selectBuilding/:type',
            name: 'manageSelectBuilding',
            component: manageSelectBuilding
        }, {
            path: '/manage/counsellor',
            name: 'manageCounsellor',
            component: manageCounsellor
        }, {
            path: '/assistant/performanceHouse',
            name: 'performanceHouse',
            component: performanceHouse
        }, {
            path: '/assistant/huikuanHouse',
            name: 'huikuanHouse',
            component: huikuanHouse
        }, {
            path: '/manage/questionnaireLine/:id',
            name: 'manageQuestionnaireLine',
            component: manageQuestionnaireLine
        }, {
            path: '/manage/performance/assistantPer',
            name: 'assistantPer',
            component: assistantPer
        }, {
            path: '/manage/performance/sale',
            name: 'manageSale',
            children: [
                {path: '', component: saleReserve},
                {path: 'subscription', component: saleSubscription},
                {path: 'sign', component: saleSign},
                {path: 'payment', component: salePayment}
            ],
            component: manageSale
        }, {
            path: '/manage/questionnaireLine/:id/:type',
            name: 'manageQuestionSurvey',
            component: manageQuestionSurvey
        }, {
            path: '/manage/performance/team',
            name: 'performanceTeam',
            component: performanceTeam
        }, {
            path: '/manage/performance/teamMess',
            name: 'manageTeamMess',
            component: manageTeamMess
        }, {
            path: '/manage/performance/callVisit',
            name: 'manageCallVisit',
            component: manageCallVisit
        }, {
            path: '/manage/performance/performanceReserve',
            name: 'manageReserve',
            component: manageReserve
        }, {
            path: '/manage/performance/performanceSubscription',
            name: 'manageSubscription',
            component: manageSubscription
        }, {
            path: '/manage/performance/performanceSign',
            name: 'manageSign',
            component: manageSign
        }, {
            path: '/manage/performance/performancePayment',
            name: 'managePayment',
            component: managePayment
        }, {
            path: '/manage/performance/callVisit/:type',
            name: 'manageCallVisitDetail',
            component: manageCallVisitDetail
        }, {
            path: '/manage/performance/zaitu',
            name: 'manageZaiTu',
            component: manageZaiTu
        }, {
            path: '/manage/performanceHouse',
            name: 'manageRengouHouse',
            component: manageRengouHouse
        }, {
            path: '/manage/performance/follow/:type',
            name: 'manageFollowDetail',
            component: manageFollowDetail
        }, {
            path: '/manage/client/customerInfo/:id',
            name: 'manageCustomerInfo',
            component: manageCustomerInfo
        }, {
            path: '/manage/huikuanHouse',
            name: 'managehuikuanHouse',
            component: managehuikuanHouse
        }, {
            path: '/search/chooseFlow',
            name: 'chooseFlow',
            component: chooseFlow
        }, {
            path: '/statement/index',
            name: 'statementIndex',
            component: statementIndex
        }, {
            path: '/statement/salesAnalysis',
            name: 'salesAnalysis',
            component: salesAnalysis
        }, {
            path: '/statement/selectTime',
            name: 'selectTime',
            component: selectTime
        }, {
            path: '/statement/selectProject/:code/:type',
            name: 'statementProject',
            component: statementProject
        }, {
            path: '/statement/customerAnalysis',
            name: 'customerAnalysis',
            component: customerAnalysis
        }, {
            path: '/statement/overDate',
            name: 'statementOverDate',
            children: [
                {path: '', component: overDateRenGou},
                {path: 'overDateQianYue', component: overDateQianYue}
            ],
            component: statementOverDate
        }, {
            path: '/statement/teamManage',
            name: 'teamManage',
            component: teamManage
        }, {
            path: '/statement',
            name: 'overDateAnalysis',
            children: [
                {path: 'analysis', component: renGouAnalysis},
                {path: 'qianYueAnalysis', component: qianYueAnalysis}
            ],
            component: overDateAnalysis
        }
    ]
})

import axio from '../js/axio'

// 新增出差申请
export const insertApproval = data => axio('/NCMobileSlSaveServlet', data)

// 修改出差申请
export const updateApproval = data => axio('/NCMobileUPDateServlet', data)

// 删除出差申请
export const removeApproval = data => axio('/NCMobileDeleteServlet', data)

// 新增差旅费报销
export const insertTravel = data => axio('/NCMobileSlSaveServlet', data)

// 获取用户信息
export const getUserInfo = data => axio('/NCUserServlet', data)

// 获取出差申请列表
export const getApplicaionList = data => axio('/NCMobileERServlet', data)

// 新增资金支付
export const insertPayment = data => axio('/NCMobileSlSaveServlet', data)

// 新增费用报销
export const insertFund = data => axio('/NCMobileSlSaveServlet', data)

// 顾问助手获取销控状态信息
export const getMarketingControl = data => axio('/NCHouseServlet', data)

// 顾问助手获取客户跟进记录
export const getClientRecords = data => axio('/NCMobileInsertAfterrecord', data)

// 文件上传
export const uploadImg = data => axio('/FileUploadServlet', data)

// 顾问助手获取项目列表
export const getProjectList = data => axio('/NCProjectServlet', data)

// 获取客户信息
export const getClientInfo = data => axio('/NCMobileCustomerDetialsServlet', data)

// 获取公司列表
export const getCompanyList = data => axio('/NCMobileCorpQueryAllServlet', data)

// 获取部门列表
export const getDepartList = data => axio('/NCMobileDeptQueryAllServlet', data)

// 获取人员列表
export const getStaffList = data => axio('/NCMobilePsonQueryAllServlet', data)

// 获取费用项列表
export const getCostList = data => axio('/NCCostsubjServlet', data)

// 获取客户详情(基本信息、详细信息)
export const getCusDetails = data => axio('/NCMobileCustomerDetialsServlet', data)

// 获取客户详情（跟进记录）
export const getCusRecords = data => axio('/NCMobileCustomerDetialsServlet', data)

// 获取客户详情 （新增跟进信息）
export const insertRecords = data => axio('/NCMobileInsertAfterrecord', data)

// 添加客户
export const addCustomer = data => axio('/NCMobileConsumerServlet', data)

// 添加客户获取认知途径
export const addRoute = data => axio('/NCSelectConsumerListServlet', data)

// 获取楼栋列表
export const getBuildingList = data => axio('/NCHouseServlet', data)

// 顾问助手--获取首页客户跟进&催办信息
export const followUrg = data => axio('/NCMobileQueryAfterrecord', data)

// 顾问助手--获取客户页面客户列表
export const getClientInfoList = data => axio('/NCCustomerServlet', data)

// 顾问助手--获取国籍列表
export const getNationalList = data => axio('/NCSelectConsumerListServlet', data)

// 顾问助手--问卷调查列表
export const getQuestionList = data => axio('/NCMobileInquireListServlet', data)

// 顾问助手--问卷调查内容
export const getQuestionContent = data => axio('/NCMobileInquireServlet', data)

// 顾问助手--获取业绩
export const getPerformance = data => axio('/NCSaleDataQueryServlet', data)

// 顾问助手--提交问卷内容
export const submitQuestion = data => axio('/NCMobileInquireSubmitServlet', data)

// 案场管理--获取业绩
export const managePerformance = data => axio('/NCSaleDataSceneServlet', data)

// 顾问助手--预定详情
export const reserveDetails = data => axio('/NCSaleDataQueryServlet', data)

// 顾问助手--业绩中的房间信息(预定、认购、签约)
export const performanceHouse = data => axio('/NCSaleDataQueryServlet', data)

// 案场管理--业绩-团队管理
export const manageTeamMess = data => axio('/NCMobileGroupServlet', data)

// 案场管理--获取客户
export const manageGetCustomerList = data => axio('/NCMobileCustomerSellerServlet', data)

// 案场管理--获取用户权限
export const manageGetRight = data => axio('/NCMobileCaseOfFieldUser', data)

// 案场管理--获取来电数量
export const manageCalls = data => axio('/NCMobileAfterTimeServlet', data)

// 案场管理--获取来访数量
export const manageVisits = data => axio('/NCMobileAfterVisitServlet', data)

// 案场管理--获取来电来访途径
export const manageRoute = data => axio('/NCMobilePhoneServlet', data)

// 案场管理--获取今日跟进
export const manageToday = data => axio('/NCMobileAfterServlet', data)

// 案场管理--获取逾期跟进
export const manageOverDay = data => axio('/NCMobileYuDayAfterServlet', data)

// 案场管理--业绩--销售业绩
export const manageSale = data => axio('/NCMobileSalePerformServlet', data)

// 案场管理--置业顾问列表
export const saleList = data => axio('/NCMobileAdviserLisetServlet', data)

// 案场管理--业绩在途情况(认购未签约)
export const undersigned = data => axio('/NCMobileRenServlet', data)

// 案场管理-- 业绩在途情况(签约未回款)

export const noReturn = data => axio('/NCMobileQianServlet', data)

// 顾问助手-- 设置默认项目
export const defaultProject = data => axio('/NCMobileProjectUpdateServlet', data)

// 案场管理--客户分配置业顾问
export const personChange = data => axio('/NCMobileConsumerAllotServlet', data)

// 报表--首页数据
export const statementIndex = data => axio('/NCMobileReportIndexServlet', data)

// 案场管理-来电来访列表数字
export const phoneVisitNum = data => axio('/NCMobilePhoneServlet', data)

// 报表--销售分析
export const saleAnalysize = data => axio('/NCMobileSaleAnalyzeServlet', data)

// huoqushijian
export const getTime = data => axio('http://61.136.222.247:7000/time', data, 'GET', 1)

// 报表--团队业绩
export const teamManage = data => axio('/NCMobileGroupReportServlet', data)

// 报表-客户分析（单项目多项目）
export const customerForm = data => axio('/NCMobileFromPhoneServile', data)

// 报表-逾期分析-认购未签约
export const overDateRenGou = data => axio('/NCMobileFromRenServlet', data)

// 报表-逾期分析-签约未回款
export const overDateQianYue = data => axio('/NCMobileFromQianServlet', data)

// 报表-客户分析（单项目多项目排序）
export const customerFormOrder = data => axio('/NCMobileFromOrderByServlet', data)

export default {
    showorhide (state) {
        state.showItem = !state.showItem
    },
    shownif (state, show) {
      state.shown = show
    },
    setUserInfo (state, userInfo) {
        state.userInfo = userInfo
    },
    setApproval (state, approvalInfo) {
        state.approval = approvalInfo
    },
    setClass (state, userMess) {
        state.userMess = userMess
    },
    setClass2 (state, userMess) {
        state.userMess = userMess
    },
    setActive (state, performanceHeader) {
      state.performanceHeader = performanceHeader
    },
    setFund (state, fundInfo) {
      state.fund = fundInfo
    },
    setPayment (state, paymentInfo) {
      state.fund = paymentInfo
    },
    setTravel (state, travelInfo) {
      state.travel = travelInfo
    },
    setSearch (state, searchInfo) {
      state.search = searchInfo
    },
    setWorkFlow (state, workFlow) {
      state.workflow = workFlow
    },
    setCompanyTree (state, companyTree) {
      state.companyTree = companyTree
    },
    setCompanyApp (state, companyInfo) {
      state.companyApp = companyInfo
    },
    setDepartApp (state, departInfo) {
      state.departApp = departInfo
    },
    setCompanyFund (state, companyInfo) {
      state.companyFund = companyInfo
    },
    setDepartFund (state, departInfo) {
      state.departFund = departInfo
    },
    setStaff (state, staffInfo) {
      state.staff = staffInfo
    },
    editApproval (state, approvalInfo) {
      state.approvalInfo = approvalInfo
    },
    editFund (state, fundInfo) {
      state.fundInfo = fundInfo
    },
    editTravel (state, approvalInfo) {
      state.travelInfo = approvalInfo
    },
    editPayment (state, approvalInfo) {
      state.paymentInfo = approvalInfo
    },
    emptyApproval (state) {
      state.approvalInfo = {
        user_count: '',
        trip_dest: '',
        trip_type: '',
        description: '',
        trip_desc: '',
        item_list: [],
        files: {},
        file_list: [],
        id: ''
      }
      state.departFund = {}
      state.departApp = {}
      state.staff = {}
    },
    emptyFund (state) {
      state.fundInfo = {
        beginDate: '',
        endDate: '',
        billStatus: '',
        dateIndex: 0,
        statusIndex: 0,
        item_list: [],
        files: {},
        file_list: [],
        id: ''
      }
      state.departFund = {}
      state.departApp = {}
      state.staff = {}
    },
    emptyPayment (state) {
      state.paymentInfo = {
        beginDate: '',
        endDate: '',
        billStatus: '',
        dateIndex: 0,
        statusIndex: 0,
        item_list: [],
        files: {},
        file_list: [],
        id: ''
      }
      state.departFund = {}
      state.departApp = {}
      state.staff = {}
    },
    emptyTravel (state) {
      state.travelInfo = {
        beginDate: '',
        endDate: '',
        billStatus: '',
        dateIndex: 0,
        statusIndex: 0,
        item_list: [],
        files: {},
        file_list: [],
        id: ''
      }
      state.departApp = {}
      state.departFund = {}
      state.staff = {}
    },
    setTypeInfo (state, typeInfo) {
      state.type = typeInfo
    },
    setAttentionInfo (state, attentionInfo) {
      state.attention = attentionInfo
    },
    setGradesInfo (state, gradesInfo) {
      state.grade = gradesInfo
    },
    setAppItem(state, itemList) {
      state.appItem = itemList
    },
    setRecord (state, recordInfo) {
      state.recordsInfo = recordInfo
    },
    setRecordType (state, followTypeInfo) {
      state.followType = followTypeInfo
    },
    searchProjectName (state, project) {
      state.project = project
    },
    addPersonal (state, project) {
       state.personalInfo = project
    },
    emptyPersonal (state) {
      let prname = {
        code: state.selectedProject.outpk_project,
        value: state.selectedProject.name,
        vcode: state.selectedProject.pk_project,
        pk_responsecorp: state.selectedProject.pk_responsecorp
      }
      console.log('name', prname)
      state.personalInfo = {
        projectName: prname,
        customerName: '',
        sex: {
          value: '',
          code: ''
        },
        telephone: '',
        route: {
          value: '请选择认知途径',
          code: ''
        },
        idName: {
          value: '身份证',
          code: '0'
        },
        id: '',
        address: '',
        customerTypes: {
          value: '潜在',
          code: '4'
        },
        level: {
          value: '请选择客户级别',
          code: ''
        },
        focusOn: '',
        time: '',
        vmemo: '',
        entitledTo: '',
        maritalStatus: {
          value: '',
          code: ''
        },
        // totalPrice: '',
        totalPrice: {
         value: '请选择总价预算',
         code: ''
        },
        ageRange: {
          value: '请选择年龄范围',
          code: ''
        },
        education: {
          value: '请选择教育程度',
          code: ''
        },
        family: '',
        shopPurpose: {
          value: '请选择购房用途',
          code: ''
        },
        annualSalary: {
          value: '请选择年薪',
          code: ''
        },
        occupationItems: {
          value: '请选择职业分类',
          code: ''
        },
        industry: '',
        occupation: '',
        duty: '',
        workArea: '',
        nationality: {
        value: '请选择国籍',
        code: ''
        },
        pk_customer_sellor: '',
        pk_customerway: ''
      }
    },
    setProjectName (state, project) {
      state.selectedProject = project
    },
    setBuildingName (state, project) {
      state.selectedBuilding = project
    },
    setSearchType (state, types) {
      state.searchType = types
    },
    setRoomMess (state, mess) {
      state.roomMess = mess
    },
    setNations (state, nations) {
      state.nations = nations
    },
    manageProjectName (state, project) {
      state.manageProject = project
    },
    manageBuildingName (state, building) {
      state.manageBuilding = building
    },
    manageRoomMess (state, roomMess) {
      state.manageRoomMess = roomMess
    },
    performanceDate (state, project) {
      state.performanceDate = project
    },
    setBillid (state, project) {
      state.billid = project
    },
    getQuestionInfo (state, project) {
      state.questionInfo = project
    },
    performanceCount (state, project) {
      state.performanceCount = project
    },
    performanceCheckedDate (state, project) {
      state.performanceCheckedDate = project
    },
    setProjectNameTable (state, project) {
      state.selectedProjectTable = project
    },
    manageProjectTable (state, project) {
      state.manageProjectTable = project
    },
    setUserRight (state, right) {
      state.fright = right
    },
    manageActive (state, project) {
      state.manageActive = project
    },
    setCall (state, project) {
      state.manageCall = project
    },
    setVisits (state, project) {
      state.manageVisit = project
    },
    setSeries (state, project) {
      state.series = project
    },
    setIsPhone (state, isphone) {
      state.isphone = isphone
    },
    setymd (state, ymd) {
      state.ymd = ymd
    },
    manageDate (state, project) {
      state.manageDate = project
    },
    manageType (state, project) {
      state.manageType = project
    },
    setPath (state, path) {
      state.path = path
    },
    setListone (state, list) {
      state.distributionList = list
      state.listSize = list.size
    },
    setApprovalParam (state, params) {
      state.approvalParam = params
    },
    setTravelParam (state, params) {
      state.travelParam = params
    },
    setFundParam (state, params) {
      state.fundParam = params
    },
    setPaymentParam (state, params) {
      state.paymentParam = params
    },
    setFlowPerson (state, list) {
      state.flowPerson = list
    },
    setChoosenList (state, list) {
      state.choosenList = list
    },
    setAppPath (state, path) {
      state.appPath = path
    },
    manageDates (state, project) {
      state.manageDates = project
    },
    managePerCount (state, project) {
      state.managePerCount = project
    },
    managePerDate (state, project) {
      state.managePerDate = project
    },
    manageSaleDate (state, project) {
      state.manageSaleDate = project
    },
    updateUserInfo (state, project) {
      state.updateUserInfo = project
    },
    manageUserInfo (state, project) {
      state.manageUserInfo = project
    },
    manageSaleCheckedDate (state, project) {
      state.manageSaleCheckedDate = project
    },
    manageBillid (state, project) {
      state.manageBillid = project
    },
    manageTable (state, project) {
      state.manageTable = project
    },
    manageSaleCheckedType (state, project) {
      state.manageSaleCheckedType = project
    },
    manageSellGroup (state, project) {
      state.manageSellGroup = project
    },
    manageUserId (state, project) {
      state.manageUserId = project
    },
    setAllotId (state, allotId) {
      state.allotId = allotId
    },
    overDateType (state, project) {
      state.overDateType = project
    },
    serverTime (state, project) {
      state.serverTime = project
    },
    statementProject (state, project) {
      state.statementProject = project
    },
    setdateList (state, dateList) {
      state.dateList = dateList
    },
    statementOverIsactive (state, project) {
      state.statementOverIsactive = project
    },
    setFollowdesc (state, followdesc) {
      state.followdesc = followdesc
    },
    statementAnalysis (state, project) {
      state.statementAnalysis = project
    },
    isTable (state, project) {
      state.isTable = project
    },
    phoneCartogram (state, project) {
      state.phoneCartogram = project
    },
    visitCartogram (state, project) {
      state.visitCartogram = project
    },
    dealCartogram (state, project) {
      state.dealCartogram = project
    }
}

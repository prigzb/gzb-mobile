import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
    showItem: false,
    shown: true,
    userInfo: {
        user_id: '',
        user_name: '',
        yzjmobile: '',
        locked_tag: '',
        user_code: '',
        user_note: ''
    },
    approval: {
        beginDate: '',
        endDate: '',
        billStatus: '',
        dateIndex: 0,
        statusIndex: 0
    },
    userMess: {
        isactive: true,
        isactive2: false
    },
    performanceHeader: {
      isactive: true,
      isactive2: false,
      isactive3: false,
      isactive4: false
    },
    fund: {
      beginDate: '',
      endDate: '',
      billStatus: '',
      dateIndex: 0,
      statusIndex: 0
    },
    payment: {
      beginDate: '',
      endDate: '',
      billStatus: '',
      dateIndex: 0,
      statusIndex: 0
    },
    travel: {
      beginDate: '',
      endDate: '',
      billStatus: '',
      dateIndex: 0,
      statusIndex: 0
    },
    search: {
      beginDate: '',
      endDate: '',
      billType: 'ALL',
      dateIndex: 0,
      statusIndex: 0,
      keyword: ''
    },
    approvalInfo: {
      user_count: '',
      trip_dest: '',
      trip_type: '',
      description: '',
      trip_desc: '',
      item_list: [],
      files: {},
      file_list: [],
      id: ''
    },
    fundInfo: {
      user_count: '',
      trip_dest: '',
      trip_type: '',
      description: '',
      trip_desc: '',
      item_list: [],
      files: {},
      file_list: [],
      id: ''
    },
    travelInfo: {
      user_count: '',
      trip_dest: '',
      trip_type: '',
      description: '',
      trip_desc: '',
      item_list: [],
      files: {},
      file_list: [],
      id: ''
    },
    paymentInfo: {
      user_count: '',
      trip_dest: '',
      trip_type: '',
      description: '',
      trip_desc: '',
      item_list: [],
      files: {},
      file_list: [],
      id: ''
    },
    workflow: {},
    companyTree: {},
    companyApp: {
      vname: '请选择公司'
    },
    departApp: {},
    companyFund: {
      vname: '',
      code: ''
    },
    departFund: {},
    staff: {},
    type: {
      statusIndex: 0,
      code: ''
    },
    attention: {
      statusIndex: 0,
      code: ''
    },
    grade: {
      statusIndex: 0,
      code: ''
    },
    project: {
      projectName: ''
    },
    appItem: [],
    recordsInfo: {
      pk_project: '',
      name: '',
      vpreferredtel: ''
    },
    followType: {
      typeIndex: 6,
      type: 6
    },
    personalInfo: {
      projectName: {
        value: '请选择项目意向',
        code: '',
        vcode: '',
        pk_responsecorp: ''
      },
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
        value: '请选择客户等级',
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
      afccategory: '',
      auser_name: '',
      status: '',
      customerId: '',
      vccode: '',
      vbillno: '',
      pk_customer_sellor: '',
      pk_customerway: '',
      vdef5: '',
      vdef10: '',
      reserve10: ''
    },
    selectedProject: {
      outpk_project: '',
      pk_project: '',
      name: '',
      vincode: '',
      vcode: '',
      vcodes: '',
      pk_responsecorp: ''
    },
    selectedBuilding: {
      pk_building: '',
      name: ''
    },
    searchType: '',
    roomMess: {
      vhname: '',
      vroomname: '',
      votname: '',
      nbuildarea: '',
      ninarea: '',
      price: '',
      prices: '',
      dsubscdate: '',
      dsigndate: '',
      nsellareaprice: '',
      nbalancemny: '',
      vpmname: '',
      seller_name: '',
      sell_channel: ''
    },
    nations: '',
    manageProject: {
      pk_project: '',
      name: '',
      fright: '',
      vcode: '',
      pk_responsecorp: '',
      outvcode: ''
    },
    manageBuilding: {
      pk_building: '',
      name: ''
    },
    manageRoomMess: {
      vhname: '',
      vroomname: '',
      votname: '',
      nbuildarea: '',
      ninarea: '',
      price: '',
      prices: '',
      dsubscdate: '',
      dsigndate: '',
      nsellareaprice: '',
      nbalancemny: '',
      vpmname: '',
      seller_name: '',
      sell_channel: '',
      pk_sign: ''
    },
    performanceDate: {
      begin_date: '',
      end_date: ''
    },
    billid: '',
    questionInfo: {
      pkInquire: '',
      pkexamtemp: ''
    },
    performanceCount: {
      yudingCount: '',
      rengouCount: '',
      qianyueCount: '',
      shoukuanCount: ''
    },
    performanceCheckedDate: '今日',
    manageCall: {
      total: '0',
      valid: '0',
      invalid: '0',
      checkDate: '今日'
    },
    manageVisit: {
      total: '0',
      valid: '0',
      invalid: '0',
      checkDate: '今日'
    },
    series: [{
      name: '有效客户(人)',
      type: 'bar',
      itemStyle: {
      emphasis: {
        opacity: 1,
        color: '#3CBAFF'
      },
      normal: {
        color: '#3CBAFF'
      }
      },
      barGap: '-100%', // Make series be overlap
      z: 20,
      animation: false,
      markArea: {
       silent: true
      },
      data: []
      }, {
      type: 'bar',
      name: '总客户(人)',
      legendHoverLink: false,
      itemStyle: {
        emphasis: {
          opacity: 1,
          color: '#EAEFF3'
        },
      normal: {
        color: '#EAEFF3'
      }
      },
      z: 10,
      animation: false,
      markArea: {
        silent: true
      },
      data: []
    }],
    selectedProjectTable: {
      pk_project: '',
      name: '',
      vincode: '',
      vcode: ''
    },
    manageProjectTable: {
      pk_project: '',
      name: ''
    },
    fright: '',
    manageActive: {
      isactive: true,
      isactive2: false,
      isactive3: false,
      isactive4: false
    },
    isphone: true,
    ymd: '',
    manageDate: '今日',
    manageType: '预订',
    listSize: 0,
    path: '',
    distributionList: new Map(),
    approvalParam: {},
    travelParam: {},
    fundParam: {},
    paymentParam: {},
    choosenList: new Set(),
    appPath: '',
    manageDates: '',
    managePerCount: {
      engagenum: '0',
      subscnum: '0',
      signnum: '0',
      backmoneynum: '0'
    },
    managePerDate: {
      begin_date: '',
      end_date: ''
    },
    manageSaleDate: {
      begin_date: '',
      end_date: ''
    },
    updateUserInfo: '',
    manageUserInfo: '',
    manageSaleCheckedDate: '今日',
    manageBillid: '',
    manageTable: [],
    manageSaleCheckedType: '预订',
    manageSellGroup: '',
    manageUserId: '',
    allotId: '',
    overDateType: '金额(万元)',
    serverTime: '',
    statementProject: {
      pk_project: '',
      name: '',
      fright: '',
      pk_responsecorp: '',
      vcode: '',
      outvcode: ''
    },
    dateList: {
      statusIndex: 0,
      code: ''
    },
    statementOverIsactive: {
      isactive: true,
      isactive2: false
    },
    followdesc: '',
    statementAnalysis: {
      isactive: true,
      isactive2: false
    },
    isTable: {
      isTable: false,
      isactive1: true,
      isactive2: true
    },
    phoneCartogram: '',
    visitCartogram: '',
    dealCartogram: ''
}

export default new Vuex.Store({
    state,
    mutations
})

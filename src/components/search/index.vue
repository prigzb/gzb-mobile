<template>
  <div class="hello" :class="hasContent">
    <div class="search-header">
      <div class="frame-input" v-if="frameShown">
        <span class="frame-del" @click="keywords = ''"></span>
        <input v-model="keywords" placeholder="搜索 申请人、部门">
        <clear></clear>
      </div>
      <div class="frame-cancel" v-if="frameShown" @click="showSearch">取消</div>
      <clear></clear>
        <div class="header-choose" v-if="!frameShown">
          <div class="all-choose-far">
            <span @click="showlist">{{showtype}}</span>
            <div class="all-choose-box" v-if="listshown">
              <ul>
                <li v-for="(types,index) in typeList" :key="types.id" @click="chooseList(index)">{{types.name}}</li>
              </ul>
              <span class="san-border"></span>
            </div>
          </div>
          <div class="gzb-dot"><span @click="toCompany('fund')">{{companyFund.vname}}</span></div>
          <div class="gzb-alltime"><router-link to='/select/search'><span>{{dateLabel}}</span></router-link></div>
        </div>
        <div class="search-btn" v-if="!frameShown" @click="showSearch"></div>
        <clear></clear>
    </div>
      <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" distance="50">
    <div class="search-content" slot="list">
      <div class="content-box" v-for="group in renderList" :key="group.id">
        <div class="content-time">{{group.name}}</div>
        <ul>
          <li v-for="app in group.data" :key="app.id" @click="toDetail(app)">
            <div class="content-li-first" v-bind:class="[app.icon]">
              <div class="first-name"><span>{{app.user_name}}</span><span>{{app.billType}}</span></div>
              <div class="first-date">{{app.create_date}}</div>
              <clear></clear>
            </div>
            <div class="content-li-second">
              <div class="second-money">¥ <span>{{app.total}}</span></div>
              <div class="second-state" v-bind:class="[app.color]">{{app.billStatus}}</div>
              <clear></clear>
            </div>
          </li>
        </ul>
      </div>
    </div>
          <span slot="doneTip">没有数据啦~~</span>
          <img slot="loadingTip"/>
      </yd-infinitescroll>
    </div>
</template>

<script>
  import paymentItem from '@/components/payment/paymentItem'
  import clear from '@/components/clear'
  import {getApplicaionList, getCompanyList} from '@/api/getData'
  export default {
    name: 'index',
    data() {
      return {
            listshown: false,
            frameShown: false,
            geturl: 'http://61.136.222.247:8086//servlet/MobileApproveServlet',
            typeList: [{
                name: '全部单据',
                code: 'ALL',
                icon: ''
            }, {
                name: '出差申请',
                code: '264X-wangbao5',
                color: 'icon-chu'
            }, {
                name: '差旅费报销',
                code: '264X-wangbao',
                color: 'icon-chai'
            }, {
                name: '费用报销',
                code: '264X-wangbao2',
                color: 'icon-fei'
            }, {
                name: '资金支付',
                code: '264X-wangbao3',
                color: 'icon-zi'
            }],
            statusList: [{
                name: '全部状态',
                code: '',
                color: ''
            }, {
                name: '待审批',
                code: '1001',
                color: 'blue-color'
            }, {
                name: '已通过',
                code: '1002',
                color: 'green-color'
            }, {
                name: '未通过',
                code: '1003',
                color: 'grey-color'
            }, {
                name: '暂存',
                code: '1004',
                color: 'gzb-yellow'
            }],
            dateList: ['全部时间', '当日', '本周', '本月', '本年', '自定义'],
            appList: [],
            companyFund: this.$store.state.companyFund,
            renderList: [],
            hasContent: '',
            keywords: '',
            page_no: 1
      }
    },
    computed: {
        showtype() {
            return this.typeList[this.$store.state.search.statusIndex].name
        },
        dateLabel() {
            return this.dateList[this.$store.state.search.dateIndex]
        }
    },
    mounted() {},
    methods: {
      chooseList(index) {
          let searchInfo = this.$store.state.search
          searchInfo.billType = this.typeList[index].code
          searchInfo.statusIndex = index
          this.$store.commit('setSearch', searchInfo)
          this.page_no = 1
          this.appList = []
          this.renderList = []
          this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
          this.loadList()
          this.listshown = !this.listshown
      },
      toCompany(item) {
          this.$router.push('/searchCompany/search/' + item + '/0')
      },
      showlist() {
        this.listshown = !this.listshown
      },
      showSearch() {
        this.frameShown = !this.frameShown
        this.keywords = ''
      },
      async getAPPList() {
            // let res = await getApplicaionList('a3b261e9-83c7-11e7-aa29-005056b8712a', '1', '上海', '火车', '说明：出差', '', '', '', '', '', '', '', '')
            let params = {
                user_id: this.$store.state.userInfo.user_id,
                begin_date: this.$store.state.search.beginDate,
                end_date: this.$store.state.search.endDate,
                pk_corp: this.companyFund.code,
                bill_type: this.$store.state.search.billType,
                method: 'getList',
                page_no: this.page_no,
                page_size: 8,
                bill_status: '',
                keywords: this.keywords,
                search_type: 'ALL'
            }
            const res = await getApplicaionList(params)
            if (res.data.flag === '0') {
                this.hasContent = ''
                this.appList = [...this.appList, ...res.data.data.list]
                for (let i = 0; i < this.appList.length; i++) {
                    this.appList[i].begin_date = this.timeFormatter(this.appList[i].begin_date)
                    this.appList[i].end_date = this.timeFormatter(this.appList[i].end_date)
                    let type = this.typeFormatter(this.appList[i].bill_type)
                    this.appList[i].billType = type.name
                    this.appList[i].icon = type.color
                    let status = this.statusFormatter(this.appList[i].bill_status)
                    this.appList[i].billStatus = status.name
                    this.appList[i].color = status.color
                    this.appList[i].groupBy = this.timeSplit(this.appList[i].create_date)
                }
                this.makeGroup()
                return true
            } else if (this.page_no === 1) {
                this.appList = []
                this.renderList = []
                this.hasContent = 'gzb-no-content'
            } else {
                this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
            }
            console.log(res)
      },
        async loadList() {
            let result = await this.getAPPList()
            this.page_no++
            if (result) {
                this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
            }
        },
        toDetail(app) {
            if (app.billType === '出差申请') {
                this.$router.push('/approval/' + app.id)
            } else if (app.billType === '差旅费报销') {
                this.$router.push('/travelDispatchList/' + app.id)
            } else if (app.billType === '费用报销') {
                this.$router.push('/fund/receipt/' + app.id)
            } else if (app.billType === '资金支付') {
                this.$router.push('/payment/receipt/' + app.id)
            }
        },
        typeFormatter(type) {
            for (let i = 0; i < this.typeList.length; i++) {
                if (this.typeList[i].code === type) {
                    let res = {
                        name: this.typeList[i].name,
                        color: this.typeList[i].color
                    }
                    return res
                }
            }
            return ''
        },
        statusFormatter(status) {
            for (let i = 0; i < this.statusList.length; i++) {
                if (this.statusList[i].code === status) {
                    let res = {
                        name: this.statusList[i].name,
                        color: this.statusList[i].color
                    }
                    return res
                }
            }
            return ''
        },
        timeFormatter(date) {
            // 将2017-02-08 的日期格式转化为: 2月8日
            if (!date) return '--'
            let reg = new RegExp('0.*')
            let reg2 = new RegExp('.*.0.*')
            let dateArr = date.split('-')
            if (reg.test(dateArr[1]) && !reg2.test(dateArr[1])) {
                dateArr[1] = dateArr[1].slice(1)
            }
            if (reg.test(dateArr[2]) && !reg2.test(dateArr[2])) {
                dateArr[2] = dateArr[2].slice(1)
            }
            return dateArr[1] + '月' + dateArr[2] + '日'
        },
        timeSplit(date) {
            let reg = new RegExp('0.*')
            let reg2 = new RegExp('.*.0.*')
            let dateArr = date.split('-')
            if (reg.test(dateArr[1]) && !reg2.test(dateArr[1])) {
                dateArr[1] = dateArr[1].slice(1)
            }
            if (reg.test(dateArr[2]) && !reg2.test(dateArr[2])) {
                dateArr[2] = dateArr[2].slice(1)
            }
            return dateArr
        },
        makeGroup(list) {
            this.renderList = []
            const timeSet = new Set()
            for (let i of this.appList) {
                let date = new Date()
                if (i.groupBy[0] === date.getFullYear().toString()) {
                    timeSet.add(i.groupBy[1])
                } else {
                    timeSet.add(i.groupBy[0])
                }
            }
            for (let i of timeSet) {
                let group = {
                    name: '',
                    data: []
                }
                if (i.length === 4) {
                    group.name = i + '年'
                } else {
                    group.name = i + '月'
                }
                for (let app of this.appList) {
                    if (app.groupBy[0] === i) {
                        group.data.push(app)
                    } else if (app.groupBy[1] === i) {
                        group.data.push(app)
                    }
                }
                this.renderList.push(group)
            }
            console.log(this.renderList)
        }
    },
    created: async function() {
        this.$store.commit('setSearchType', 'ALL')
        this.loadList()
        let params = {
            'method': 'getAllCorpList'
        }
        let com = await getCompanyList(params)
        this.companyList = com.data.data
        for (let [index, company] of this.companyList.entries()) {
            if (!company.parent_code) {
                this.companyList[index].parent_code = '0'
            }
        }
        console.log(com)
        this.$store.commit('setCompanyTree', this.companyList)
    },
      watch: {
        keywords: function(words) {
            this.page_no = 1
            this.appList = []
            this.renderList = []
            this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
            this.loadList()
        }
      },
    components: {
      paymentItem,
      clear
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .search-header{
    line-height: 16px;
    background-color: #fff;
    font-size: 15px;
    color: #3CBAFF;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .hello {
    background-color: #EBEFF3;
    height: 100%;
    margin-top: 43px;
  }
  .search-header .header-choose{
    display: flex;
    width: 87.5%;
    float: left;
  }
  .header-choose >div{
    flex: 1;
    margin: 12px 0;
    border-right: 1px solid #EAEFF3;
    -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
        box-sizing: border-box;
  }
  .header-choose >div:last-child{
    border-right: 0;
  }
  .header-choose >div{
    padding-right: 4%;
    background: url(../../assets/arrow-down-bule.png) no-repeat 94% center;
    background-size: 8px auto;
  }
  /*.gzb-alltime span{
    padding-right: 14px;
    background: url(../../assets/arrow-down-bule.png) no-repeat right center;
    background-size: 8px auto;
  }*/
  .search-header .search-btn{
    float: right;
    width: 12.5%;
    height: 40px;
    background: url(../../assets/glass-blue.png) no-repeat center center;
    background-size: 20px auto;
    border-left: 1px solid #EAEFF3;
    -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
        box-sizing: border-box;
  }

  .search-content{
    text-align: left;
    margin-top: 40px;
  }
  .search-content .content-time{
    line-height: 30px;
    padding: 0 4%;
    font-size: 13px;
    color: #98A1A8;
  }
  .search-content ul{
  }
  .search-content ul li{
    background-color: #fff;
    padding: 6px 4% 0;
    margin-bottom: 8px;
  }
  .content-li-first{
    padding: 6px 0 6px;
    font-size: 16px;
  }
  .content-li-first .first-name{
    float: left;
    padding-left: 28px;
  }
  .content-li-first .first-name span{
    padding: 0 6px;
    border-right: 1px solid #9BA4AB;
    line-height: 22px;
  }
  .content-li-first .first-name span:last-child{
    border-right: 0;
  }
  .content-li-first .first-date{
    float: right;
  }
  .first-date{
    font-size: 12px;
    color: #98A1A8;
    line-height: 22px;
  }
  .content-li-second{
    padding: 0 0 10px 34px;
    font-size: 14px;
  }
  .content-li-second .second-money{
    float: left;
    color: #F25959;
  }
  .content-li-second .second-money span{
    font-size: 18px;
  }
  .content-li-second .second-state{
    float: right;
    font-size: 14px;
  }
  .second-state.blue-color{
    color: #3CBAFF;
  }
  .second-state.grey-color{
    color: #98A1A8;
  }
  .second-state.green-color{
    color: #01D386;
  }
  .content-li-first.icon-chu{
    background: url(../../assets/fund-blue.png) no-repeat left center;
    background-size: 22px auto;
  }
  .content-li-first.icon-chai{
    background: url(../../assets/fund-yellow.png) no-repeat left center;
    background-size: 22px auto;
  }
  .content-li-first.icon-fei{
    background: url(../../assets/fund-green.png) no-repeat left center;
    background-size: 22px auto;
  }
  .content-li-first.icon-zi{
    background: url(../../assets/payment.png) no-repeat left center;
    background-size: 22px auto;
  }
  .all-choose-far{
    position: relative;
  }
  .all-choose-far .all-choose-box{
    position: absolute;
    top: 30px;
    left: 10%;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 #BBBBBB;
    border: 1px solid #B9C7D2;
    border-radius: 3px;
    font-size: 13px;
    color: #030303;
    width: 128%;
    padding: 0 10px;
    -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
        box-sizing: border-box;
  }
  .all-choose-box ul li{
    line-height: 34px;
    border-bottom: 1px solid #B9C7D2;
  }
  .all-choose-box ul li .curr{
    color: #3CBAFF;
  }
  .all-choose-box ul li:last-child{
    border-bottom: 0;
  }
  .san-border{
    display: inline-block;
    width: 8px;
    height: 6px;
    background: url(../../assets/san.png) no-repeat center center;
    background-size: 100% auto;
    position: absolute;
    top: -6px;
    left: 24%;
  }
  a {
    color:#3CBAFF
  }
  .gzb-dot {
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    width:23%;
  }
  .gzb-no-content {
    background: url('../../assets/no-content.png') no-repeat center center;
    background-size: 100% auto;
    height: 100%;
  }
    .frame-input{
    float: left;
    width: 88%;
    border-radius: 100px;
    height: 28px;
    text-align: right;
    overflow: hidden;
    margin-top: 8px;
    background: #F0F4F7 url(../../assets/glass-grey.png) no-repeat 8px center;
    background-size: 13px auto;
  }
  .frame-del{
    display: inline-block;
    width: 10%;
    height: 28px;
    background: url(../../assets/search-close.png) no-repeat left center;
    background-size: 20px auto;
    float: right;
  }
  .frame-input input{
    width: 80%;
    height: 26px;
    background-color: #F0F4F7;
    border: 0;
    float: right;
  }
  .frame-cancel{
    float: right;
    line-height: 44px;
    font-size: 15px;
    color: #3CBAFF;
  }
</style>

<template>
  <div class="sale">
    <div class="check-data" @click='showList'>
      {{ checkedDate }}
      <img src="../../assets/arrow-down-gray.png">
    </div>
    <div class="data-list" v-if="listshown">
      <div class="data-item" v-for="(data, index) in datas" @click='checkData(index)'>{{ data }}</div>
    </div>
    <div class="middle">
      <ul class="type">
        <li>类型</li>
        <li>预订</li>
        <li>认购</li>
        <li>签约</li>
        <li>回款</li>
        <clear></clear>
      </ul>
      <ul class="number">
        <li class="grey">数量(套)</li>
        <li class="blue" @click="jumpto('performanceReserve')">{{ res.engagenum }}</li>
        <li class="blue" @click="jumpto('performanceSubscription')">{{res.subscnum}}</li>
        <li class="blue" @click="jumpto('performanceSign')">{{res.signnum}}</li>
        <li class="blue" @click="jumpto('performancePayment')">{{res.backmoneynum}}</li>
        <clear></clear>
      </ul>
      <ul class="amount">
        <li class="grey">金额(万元)</li>
        <li class="blue" @click="jumpto('performanceReserve')">- -</li>
        <li class="blue" @click="jumpto('performanceSubscription')">{{res.subscamount}}</li>
        <li class="blue" @click="jumpto('performanceSign')">{{res.signamount}}</li>
        <li class="blue" @click="jumpto('performancePayment')">{{res.backmoneyamount}}</li>
        <clear></clear>
      </ul>
      <div class="proportion" v-if="checkedDate != '今日' && checkedDate != '本周'">
        <div class="zhuanqian">转签率: <span class="blue">{{res.tosignrate}}</span></div>
        <div class="daozhang">全额到账率: <span class="blue">{{res.dzrate}}</span></div>
        <clear></clear>
      </div>
      <ul class="types">
        <li :class="{ active: isactive }" @click="jump('')">
          <span>预订</span>
        </li>
        <li :class="{ active: isactive2 }" @click="jump('subscription')">
          <span>认购</span>
        </li>
        <li :class="{ active: isactive3 }" @click="jump('sign')">
          <span>签约</span>
        </li>
        <li :class="{ active: isactive4 }" @click="jump('payment')">
          <span>回款</span>
        </li>
        <clear></clear>
      </ul>
    </div>
    <router-view></router-view>
    <div class="footer" v-if="checkedDate != '今日' && checkedDate != '本周' && isactive == false">
      <div class="tongbi">同比: <span class="blue">{{tongbi}}</span></div>
      <div class="huanbi">环比: <span class="blue">{{huanbi}}</span></div>
      <clear></clear>
    </div>
  </div>
</template>

<script>
  import clear from '@/components/clear'
  import {manageSale} from '@/api/getData'

  export default {
    name: 'sale',
    data() {
      return {
        checkedDate: this.$store.state.manageSaleCheckedDate,
        checkedType: this.$store.state.manageSaleCheckedType,
        listshown: false,
        oldYear: parseInt(this.$store.state.serverTime.split(',')[0]),
        oldMonth: parseInt(this.$store.state.serverTime.split(',')[1]),
        oldDay: parseInt(this.$store.state.serverTime.split(',')[2]),
        datas: ['今日', '本周', '本月', '本季', '本年'],
        isactive: this.$store.state.manageActive.isactive,
        isactive2: this.$store.state.manageActive.isactive2,
        isactive3: this.$store.state.manageActive.isactive3,
        isactive4: this.$store.state.manageActive.isactive4,
        params: {
          method: 'getlist',
          pk_user: this.$store.state.userInfo.user_id,
          pk_project: this.$store.state.manageProject.pk_project,
          begin_date: this.dateToday(),
          end_date: this.dateToday()
        },
        tableParams: {
          method: 'gettablelist',
          pk_user: this.$store.state.userInfo.user_id,
          pk_project: this.$store.state.manageProject.pk_project,
          begin_date: this.dateToday(),
          end_date: this.dateToday(),
          datetype: '0'
        },
        res: '',
        tongbi: '',
        huanbi: '',
        proportion: ''
      }
    },
    components: {
      clear
    },
    methods: {
      showList() {
        this.listshown = !this.listshown
      },
      checkData(index) {
        this.listshown = !this.listshown
        this.checkedDate = this.datas[index]
        this.showX()
        this.$store.commit('manageSaleCheckedDate', this.checkedDate)
      },
      jump(path) {
        let manageActive = {
          isactive: false,
          isactive2: false,
          isactive3: false,
          isactive4: false
        }
        switch (path) {
          case 'subscription':
            manageActive.isactive2 = true
            this.isactive = false
            this.isactive2 = true
            this.isactive3 = false
            this.isactive4 = false
            this.tongbi = this.proportion.rengou_tongbi
            this.huanbi = this.proportion.rengou_huanbi
            this.checkedType = '认购'
            break
          case 'sign':
            manageActive.isactive3 = true
            this.isactive = false
            this.isactive2 = false
            this.isactive3 = true
            this.isactive4 = false
            this.tongbi = this.proportion.qianyue_tongbi
            this.huanbi = this.proportion.qianyue_huanbi
            this.checkedType = '签约'
            break
          case 'payment':
            manageActive.isactive4 = true
            this.isactive = false
            this.isactive2 = false
            this.isactive3 = false
            this.isactive4 = true
            this.tongbi = this.proportion.huikuan_tongbi
            this.huanbi = this.proportion.huikuan_huanbii
            this.checkedType = '回款'
            break
          default:
            manageActive.isactive = true
            this.isactive = true
            this.isactive2 = false
            this.isactive3 = false
            this.isactive4 = false
            this.tongbi = this.proportion.Yuding_tongbi
            this.huanbi = this.proportion.Yuding_huanbi
            this.checkedType = '预订'
        }
        this.$store.commit('manageActive', manageActive)
        this.$store.commit('manageSaleCheckedType', this.checkedType)
        this.$router.replace('/manage/performance/sale/' + path)
      },
      jumpto(path) {
        let active = {
          isactive: false,
          isactive2: false,
          isactive3: false,
          isactive4: false
        }
        if (path === 'performanceReserve') {
          active.isactive = true
        } else if (path === 'performanceSubscription') {
          active.isactive2 = true
        } else if (path === 'performanceSign') {
          active.isactive3 = true
        } else {
          active.isactive4 = true
        }
        this.$store.commit('setActive', active)
        this.$router.push('/manage/performance/' + path)
      },
      async getPerfor() {
        if (this.checkedDate === '今日') {
          this.params.begin_date = this.dateToday()
        } else if (this.checkedDate === '本周') {
          this.params.begin_date = this.dateWeek()
        } else if (this.checkedDate === '本月') {
          this.params.begin_date = new Date(this.oldYear, this.oldMonth, this.oldDay).getFullYear() + '-' + this.dateMonth()
        } else if (this.checkedDate === '本季') {
          this.params.begin_date = new Date(this.oldYear, this.oldMonth, this.oldDay).getFullYear() + '-' + this.dateQuarter()
        } else {
          this.params.begin_date = this.dateYear()
        }
        let res = await manageSale(this.params)
        console.log(res)
        this.res = res.data.data
        let managePerCount = {
          engagenum: this.res.engagenum,
          subscnum: this.res.subscnum,
          signnum: this.res.signnum,
          backmoneynum: this.res.backmoneynum
        }
        let manageSaleDate = {
          begin_date: this.params.begin_date,
          end_date: this.params.end_date
        }
        this.$store.commit('managePerCount', managePerCount)
        this.$store.commit('manageSaleDate', manageSaleDate)
      },
      async getTable() {
        if (this.checkedDate === '今日') {
          this.tableParams.begin_date = this.fun_date(-7, 'today')
          this.tableParams.datetype = '0'
        } else if (this.checkedDate === '本周') {
          this.tableParams.begin_date = this.fun_date(-28, 'week')
          this.tableParams.datetype = '1'
        } else if (this.checkedDate === '本月') {
          this.tableParams.begin_date = (new Date(this.oldYear, this.oldMonth, this.oldDay).getFullYear() - 1) + '-' + this.dateMonth()
          this.tableParams.datetype = '2'
        } else if (this.checkedDate === '本季') {
          this.tableParams.begin_date = (new Date(this.oldYear, this.oldMonth, this.oldDay).getFullYear() - 1) + '-' + this.dateQuarter()
          this.tableParams.datetype = '3'
        } else {
          this.tableParams.begin_date = (new Date(this.oldYear, this.oldMonth, this.oldDay).getFullYear() - 4) + '-01-01'
          this.tableParams.datetype = '4'
        }
        let res = await manageSale(this.tableParams)
        console.log(res)
        this.proportion = res.data.data.Proportion
        if (this.checkedType === '预订') {
          this.tongbi = this.proportion.Yuding_tongbi
          this.huanbi = this.proportion.Yuding_huanbi
        } else if (this.checkedType === '认购') {
          this.tongbi = this.proportion.rengou_tongbi
          this.huanbi = this.proportion.rengou_huanbi
        } else if (this.checkedType === '签约') {
          this.tongbi = this.proportion.qianyue_tongbi
          this.huanbi = this.proportion.qianyue_huanbi
        } else {
          this.tongbi = this.proportion.huikuan_tongbi
          this.huanbi = this.proportion.huikuan_huanbii
        }
        this.$store.commit('manageTable', res.data.data.tableData)
      },
      changeDay(day) {
        let str = ''
        switch (day) {
          case 0:
            str = '星期日'
            break
          case 1:
            str = '星期一'
            break
          case 2:
            str = '星期二'
            break
          case 3:
            str = '星期三'
            break
          case 4:
            str = '星期四'
            break
          case 5:
            str = '星期五'
            break
          case 6:
            str = '星期六'
            break
          }
        return str
      },
      showX() {
        let oldYear = parseInt(this.$store.state.serverTime.split(',')[0])
        let oldMonth = parseInt(this.$store.state.serverTime.split(',')[1])
        let oldDay = parseInt(this.$store.state.serverTime.split(',')[2])
        let manageDates = []
        if (this.checkedDate === '今日') {
          let initDay = 0
          for (let i = 7; i > -1; i--) {
            let day = (new Date(oldYear, oldMonth, oldDay).getDay() - initDay)
            if (day < 0) {
              day = day + 7
            }
            manageDates[i] = this.changeDay(day)
            initDay++
          }
        } else if (this.checkedDate === '本月') {
           let initMonth = -1
           for (let i = 12; i > -1; i--) {
              let month = new Date(oldYear, oldMonth, oldDay).getMonth() - initMonth
              if (month < 1) {
                 month = (new Date(oldYear, oldMonth, oldDay).getFullYear() - 1) + '年' + (month + 12)
              }
              manageDates[i] = month + '月'
              initMonth++
            }
        } else if (this.checkedDate === '本年') {
          let initYear = 0
          for (let i = 4; i > -1; i--) {
            let year = new Date(oldYear, oldMonth, oldDay).getFullYear()
            manageDates[i] = year - initYear + '年'
            initYear++
          }
        } else if (this.checkedDate === '本季') {
          let initSeason = ''
          let month = new Date(oldYear, oldMonth, oldDay).getMonth() + 1
          if (month <= 3) {
           initSeason = 1
          } else if (month <= 6) {
           initSeason = 2
          } else if (month <= 9) {
           initSeason = 3
          } else {
           initSeason = 4
          }
          let year = new Date(oldYear, oldMonth, oldDay).getFullYear()
          for (let i = 4; i > -1; i--) {
            let season = initSeason
            if (season < 1) {
             season = season + 4
             manageDates[i] = year - 1 + '年' + season + '季'
            } else {
             manageDates[i] = year + '年' + season + '季'
            }
            initSeason--
          }
        } else if (this.checkedDate === '本周') {
          let weekday = []
          for (let j = 0; j < 5; j++) {
              weekday[j] = this.fun_date((-7 * j), 'today')
          }
          // weekday[0] = this.dateWeek()
          // let weeks = weekday.reverse()
          let weeks = ['前四周', '前三周', '前两周', '前周', '本周']
          for (let i = 4; i > -1; i--) {
            manageDates[i] = weeks[i]
          }
        }
        this.$store.commit('manageDates', manageDates)
      },
      fun_date(daysAgo, type) {
        let oldYear = parseInt(this.$store.state.serverTime.split(',')[0])
        let oldMonth = parseInt(this.$store.state.serverTime.split(',')[1])
        let oldDay = parseInt(this.$store.state.serverTime.split(',')[2])
        let date = new Date(oldYear, oldMonth, oldDay)
        let date2 = new Date(date)
        if (type === 'today') {
          date2.setDate(date.getDate() + daysAgo)
        } else {
          let days = (date.getDay() + 6) % 7
          date2.setDate(date.getDate() - days + daysAgo)
        }
        let time = ''
        let day = ''
        if (date2.getDate() < 10) {
          day = '0' + date2.getDate()
        } else {
          day = date2.getDate()
        }
        time = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + day
        return time
      },
      dateToday() {
        let oldYear = parseInt(this.$store.state.serverTime.split(',')[0])
        let oldMonth = parseInt(this.$store.state.serverTime.split(',')[1])
        let oldDay = parseInt(this.$store.state.serverTime.split(',')[2])
        let date = new Date(oldYear, oldMonth, oldDay)
        let month = date.getMonth() + 1
        let today = date.getDate().toString().length === 1 ? '0' + date.getDate().toString() : date.getDate().toString()
        month = month.toString().length === 1 ? '0' + month.toString() : month.toString()
        return date.getFullYear() + '-' + month + '-' + today
      },
      dateWeek() {
        let date = new Date(this.oldYear, this.oldMonth, this.oldDay)
        let days = (date.getDay() + 6) % 7
        date.setDate(date.getDate() - days)
        let today = date.getDate()
        let month = date.getMonth() + 1
        today = today.toString().length === 1 ? '0' + today.toString() : today.toString()
        month = month.toString().length === 1 ? '0' + month.toString() : month.toString()
        return date.getFullYear() + '-' + month + '-' + today
      },
      dateMonth() {
        let date = new Date(this.oldYear, this.oldMonth, this.oldDay)
        let month = date.getMonth() + 1
        month = month.toString().length === 1 ? '0' + month.toString() : month.toString()
        return month + '-01'
      },
      dateQuarter() {
        let date = new Date(this.oldYear, this.oldMonth, this.oldDay)
        let month = date.getMonth() + 1
        let months = ''
        if (month <= 3) {
          months = 1
        } else if (month <= 6) {
          months = 4
        } else if (month <= 9) {
          months = 7
        } else {
          months = 10
        }
        months = months.toString().length === 1 ? '0' + months.toString() : months.toString()
        return months + '-01'
      },
      dateYear() {
        let date = new Date(this.oldYear, this.oldMonth, this.oldDay)
        return date.getFullYear() + '-01-01'
      }
    },
    watch: {
      checkedDate: function() {
        this.getPerfor()
        this.getTable()
      },
      checkedType: function() {
        if (this.checkedType === '预订') {
          this.tongbi = this.proportion.Yuding_tongbi
          this.huanbi = this.proportion.Yuding_huanbi
        } else if (this.checkedType === '认购') {
          this.tongbi = this.proportion.rengou_tongbi
          this.huanbi = this.proportion.rengou_huanbi
        } else if (this.checkedType === '签约') {
          this.tongbi = this.proportion.qianyue_tongbi
          this.huanbi = this.proportion.qianyue_huanbi
        } else {
          this.tongbi = this.proportion.huikuan_tongbi
          this.huanbi = this.proportion.huikuan_huanbii
        }
      }
    },
    created: async function() {
      await this.getPerfor()
      this.showX()
      await this.getTable()
    }
  }
</script>

<style scoped>
  .check-data {
    border: 0.5px solid #B9C7D2;
    width: 37.5%;
    background: linear-gradient(-180deg, #FFFFFF 0%, #EFF4F7 100%);
    height: 30px;
    line-height: 30px;
    margin: 12px auto;
    padding-right: 4px;
    padding-left: 10px;
  }
  .check-data img {
    float: right;
    width: 8px;
    height: 4px;
    margin-top: 15px;
  }
  .data-list {
    position: absolute;
    background: #ffffff;
    width: 37.5%;
    left: 31.3%;
    top: 42px;
    z-index: 99;
  }
  .data-item {
    border-bottom: 1px solid #B9C7D2;
    height: 30px;
    line-height: 30px;
    background: linear-gradient(-180deg, #FFFFFF 0%, #EFF4F7 100%);
  }
  .middle {
    font-size: 14px;
  }
  .type li, .number li, .amount li {
    width: 20%;
    height: 40px;
    float: left;
    border-bottom: 1px solid #EAEFF3;
    border-right: 1px solid #EAEFF3;
    line-height: 40px;
  }
  .type li {
    background-image: linear-gradient(-180deg, #FCFDFE 0%, #F8FBFC 100%);
    color: #030303;
  }
  .number li, .amount li {
    background: #FFFFFF;
  }
  .grey {
    color: #7A797B;
    font-size: 12px;
  }
  .blue {
    color: #3CBAFF;
  }
  .proportion {
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    background: #FFFFFF;
  }
  .zhuanqian {
    float: left;
    color: #7A797B;
  }
  .daozhang {
    float: right;
    color: #7A797B;
  }
  .types {
    margin-top: 8px;
    background: #FFFFFF;
    border-bottom: 0.5px solid #EAEFF3;
  }
  .types li {
    float: left;
    width: 25%;
    height: 40px;
    padding-top: 10px;
  }
  .types span {
    display: inline-block;
    width: 100%;
    border-right: 1px solid #DCE1E8;
  }
  .active {
    color: #3CBAFF;
    border-bottom: 3px solid #3CBAFF;
  }
  .footer {
    padding: 0 36px 0 30px;
    height: 40px;
    background: #FFFFFF;
    line-height: 40px;
    margin-top: -40px;
  }
  .tongbi {
    float: left;
    color: #7A797B;
    font-size: 14px;
  }
  .huanbi {
    float: right;
    color: #7A797B;
    font-size: 14px;
  }
</style>
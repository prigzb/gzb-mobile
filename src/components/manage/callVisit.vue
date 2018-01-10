<template>
  <div class="wrap">
    <div class="wrapLine">
      <div class="header">
        <span @click="goDetail('phone')">来电</span>
        <!-- <span @click="goPhone()">来电</span> -->
        <div class="check-data" @click='showList'>
			    {{checkeDate}}
			    <img src='../../assets/arrow-down-gray.png'>
		    </div>
		    <clear></clear>
		    <div class="data-list" v-if="listshown">
			    <div class="data-item" v-for="(data, index) in datas" @click='checkDate(index)'>{{ data }}</div>
		    </div>
	    </div>
	    <div class="content">
	       <ul>
	       	  <li>
	       	  	 <span class="number" @click="goDetail('phone')">{{phoneList.total}}</span>
	       	  	 <span class="typeName">总客户</span>
	       	  </li>
	       	  <li>
	       	  	 <span class="number" @click="goDetail('phone')">{{phoneList.valid}}</span>
	       	  	 <span class="typeName">有效客户</span>
	       	  </li>
	       	  <li class="noneBorder">
	       	  	 <span class="number" @click="goDetail('phone')">{{phoneList.invalid}}</span>
	       	  	 <span class="typeName">无效客户</span>
	       	  </li>
	       	  <clear></clear>
	       </ul>
	    </div>
    </div>
    <div class="wrapLine">
      <div class="header">
        <span @click="goDetail('visit')">来访</span>
        <div class="check-data" @click='showLists'>
          {{checkeDates}}
          <img src='../../assets/arrow-down-gray.png'>
        </div>
        <clear></clear>
        <div class="data-list" v-if="listshowns">
          <div class="data-item" v-for="(data, index) in datas" @click='checkDates(index)'>{{ data }}</div>
        </div>
      </div>
      <div class="content">
         <ul>
             <li @click="goDetail('visit')">
                <span class="number">{{visitList.total}}</span>
                <span class="typeName">总客户</span>
             </li>
             <li @click="goDetail('visit')">
                <span class="number">{{visitList.valid}}</span>
                <span class="typeName">有效客户</span>
             </li>
             <li class="noneBorder" @click="goDetail('visit')">
                <span class="number">{{visitList.invalid}}</span>
                <span class="typeName">无效客户</span>
             </li>
             <clear></clear>
         </ul>
      </div>
    </div>
    <div class="wrapLine">
       <div class="header follow">跟进</div>
       <div class="content half">
         <ul>
             <li @click="goFollow('today')">
                <span class="number">{{todayFollow}}</span>
                <span class="typeName">今日跟进</span>
             </li>
             <li class="noneBorder" @click="goFollow('overDay')">
                <span class="number">{{overDayFollow}}</span>
                <span class="typeName">逾期未跟进</span>
             </li>
             <clear></clear>
         </ul>
      </div>
    </div>
  </div>
</template>
<script>
   import clear from '@/components/clear'
   import {phoneVisitNum, manageCalls, manageToday, manageOverDay} from '@/api/getData'
   export default {
    name: 'callVisit',
    data () {
      return {
        listshown: false,
        listshowns: false,
        checkeDate: this.$store.state.manageCall.checkDate,
        checkeDates: this.$store.state.manageVisit.checkDate,
        datas: ['今日', '本周', '本月', '本季', '本年'],
        todayFollow: '',
        overDayFollow: '',
        end_time: this.dateToday(),
        phoneResList: '',
        visitResList: '',
        oldYear: parseInt(this.$store.state.serverTime.split(',')[0]),
        oldMonth: parseInt(this.$store.state.serverTime.split(',')[1]),
        oldDay: parseInt(this.$store.state.serverTime.split(',')[2]),
        nowTime: ''
      }
     },
    components: {
       clear
     },
    methods: {
      goDetail(type) {
        console.log(type)
        if (type === 'phone') {
          let series = this.$store.state.series
          series[0].data = []
          series[1].data = []
          for (let data of this.phoneResList) {
            series[0].data.push(Number(data.ynum))
            series[1].data.push(Number(data.numm))
          }
          series[0].data = series[0].data.reverse()
          series[1].data = series[1].data.reverse()
          this.$store.commit('setSeries', series)
        } else if (type === 'visit') {
          let series = this.$store.state.series
          series[0].data = []
          series[1].data = []
          for (let data of this.visitResList) {
            series[0].data.push(Number(data.ynum))
            series[1].data.push(Number(data.numm))
          }
          series[0].data = series[0].data.reverse()
          series[1].data = series[1].data.reverse()
          this.$store.commit('setSeries', series)
        }
        this.$router.push('/manage/performance/callVisit/' + type)
      },
      goFollow(type) {
        this.$router.push('/manage/performance/follow/' + type)
      },
      showList() {
        this.listshown = !this.listshown
      },
      showLists() {
        this.listshowns = !this.listshowns
      },
      checkDate(index) {
        this.listshown = !this.listshown
        this.checkeDate = this.datas[index]
        this.getPhoneList()
        this.getPhone()
      },
      checkDates(index) {
        this.listshowns = !this.listshowns
        this.checkeDates = this.datas[index]
        this.getVisitList()
        this.getVisit()
      },
      async getPhone() {
        let start_time = ''
        let date = this.nowTime
        if (this.checkeDate === '今日') {
          start_time = this.dateToday()
        } else if (this.checkeDate === '本周') {
          start_time = this.dateWeek()
        } else if (this.checkeDate === '本月') {
          start_time = date.getFullYear() + '-' + this.dateMonth()
        } else if (this.checkeDate === '本季') {
          start_time = date.getFullYear() + '-' + this.dateQuarter()
        } else {
          start_time = this.dateYear()
        }
        console.log(start_time)
        let params = {
          'method': 'phonelist',
          'fright': this.$store.state.manageProject.fright,
          // 'fright': '1',
          'pk_corp': this.$store.state.manageProject.pk_responsecorp,
          'pk_psndoc': this.$store.state.userInfo.pk_psndoc,
          'pk_psnbasdoc': this.$store.state.userInfo.Pk_psnbasdoc,
          'pk_project': this.$store.state.manageProject.pk_project,
          'vcode': this.$store.state.manageProject.outvcode,
          'start_time': start_time,
          'end_time': this.end_time,
          'type': '0'
        }
        let res = await phoneVisitNum(params)
        // console.log(res)
        let manageCall = this.$store.state.manageCall
        manageCall.total = this.zero(res.data.data.list[0].numm)
        manageCall.valid = this.zero(res.data.data.list[0].ynum)
        manageCall.invalid = this.zero(res.data.data.list[0].notnum)
        manageCall.checkDate = this.checkeDate
        this.$store.commit('setCall', manageCall)
      },
      async getVisit() {
        let start_time = ''
        let date = this.nowTime
        if (this.checkeDates === '今日') {
          start_time = this.dateToday()
        } else if (this.checkeDates === '本周') {
          start_time = this.dateWeek()
        } else if (this.checkeDates === '本月') {
          start_time = date.getFullYear() + '-' + this.dateMonth()
        } else if (this.checkeDates === '本季') {
          start_time = date.getFullYear() + '-' + this.dateQuarter()
        } else {
          start_time = this.dateYear()
        }
        // console.log(start_time)
        let params = {
          'method': 'phonelist',
          'fright': this.$store.state.manageProject.fright,
          // 'fright': '1',
          'pk_corp': this.$store.state.manageProject.pk_responsecorp,
          'pk_psndoc': this.$store.state.userInfo.pk_psndoc,
          'pk_psnbasdoc': this.$store.state.userInfo.Pk_psnbasdoc,
          'pk_project': this.$store.state.manageProject.pk_project,
          'vcode': this.$store.state.manageProject.outvcode,
          'start_time': start_time,
          'end_time': this.end_time,
          'type': '1'
        }
        let res = await phoneVisitNum(params)
        // console.log(res)
        let manageVisit = this.$store.state.manageVisit
        manageVisit.total = this.zero(res.data.data.list[0].numm)
        manageVisit.valid = this.zero(res.data.data.list[0].ynum)
        manageVisit.invalid = this.zero(res.data.data.list[0].notnum)
        manageVisit.checkDate = this.checkeDates
        this.$store.commit('setVisits', manageVisit)
      },
      async getPhoneList() {
        let start_time = ''
        let type = ''
        let date = this.nowTime
        if (this.checkeDate === '今日') {
          start_time = this.fun_date(-7, 'today')
          type = 'date'
        } else if (this.checkeDate === '本周') {
          start_time = this.fun_date(-28, 'week')
          type = 'week'
        } else if (this.checkeDate === '本月') {
          start_time = (date.getFullYear() - 1) + '-' + this.dateMonth()
          type = 'month'
        } else if (this.checkeDate === '本季') {
          start_time = (date.getFullYear() - 1) + '-' + this.dateQuarter()
          type = 'quarter'
        } else {
          start_time = (date.getFullYear() - 4) + '-01-01'
          type = 'year'
        }
        console.log(start_time)
        let params = {
          'method': type,
          'fright': this.$store.state.manageProject.fright,
          // 'fright': '1',
          'pk_corp': this.$store.state.manageProject.pk_responsecorp,
          'pk_psndoc': this.$store.state.userInfo.pk_psndoc,
          'pk_project': this.$store.state.manageProject.pk_project,
          'vcode': this.$store.state.manageProject.outvcode,
          'start_time': start_time,
          'end_time': this.end_time,
          'type': '0'
        }
        let res = await manageCalls(params)
        // console.log(res)
        // let manageCall = this.$store.state.manageCall
        // manageCall.total = this.zero(res.data.data.list[0].numm)
        // manageCall.valid = this.zero(res.data.data.list[0].ynum)
        // manageCall.invalid = this.zero(res.data.data.list[0].notnum)
        // manageCall.checkDate = this.checkeDate
        // this.$store.commit('setCall', manageCall)
        this.phoneResList = res.data.data.list
      },
      async getVisitList() {
        let start_time = ''
        let type = ''
        let date = this.nowTime
        if (this.checkeDates === '今日') {
          start_time = this.fun_date(-7, 'today')
          type = 'date'
        } else if (this.checkeDates === '本周') {
          start_time = this.fun_date(-28, 'week')
          type = 'week'
        } else if (this.checkeDates === '本月') {
          start_time = (date.getFullYear() - 1) + '-' + this.dateMonth()
          type = 'month'
        } else if (this.checkeDates === '本季') {
          start_time = (date.getFullYear() - 1) + '-' + this.dateQuarter()
          type = 'quarter'
        } else {
          start_time = (date.getFullYear() - 4) + '-01-01'
          type = 'year'
        }
        // console.log(start_time)
        let params = {
          'method': type,
          'fright': this.$store.state.manageProject.fright,
          // 'fright': '1',
          'pk_corp': this.$store.state.manageProject.pk_responsecorp,
          'pk_psndoc': this.$store.state.userInfo.pk_psndoc,
          'pk_project': this.$store.state.manageProject.pk_project,
          'vcode': this.$store.state.manageProject.outvcode,
          'start_time': start_time,
          'end_time': this.end_time,
          'type': '1'
        }
        let res = await manageCalls(params)
        console.log(res)
        this.visitResList = res.data.data.list
      },
      async getToday() {
        let params = {
          'method': 'afterlist',
          'fright': this.$store.state.manageProject.fright,
          // 'fright': '1',
          'pk_corp': this.$store.state.manageProject.pk_responsecorp,
          'pk_psndoc': this.$store.state.userInfo.pk_psndoc,
          'pk_project': this.$store.state.manageProject.pk_project,
          'vcode': this.$store.state.manageProject.vcode
        }
        console.log('今日跟进')
        let res = await manageToday(params)
        // console.log(res)
        this.todayFollow = res.data.data.list[0].nun
      },
      async getOverDay() {
        let params = {
          'method': 'yudaynum',
          'fright': this.$store.state.manageProject.fright,
          // 'fright': '1',
          'pk_corp': this.$store.state.manageProject.pk_responsecorp,
          'pk_psndoc': this.$store.state.userInfo.pk_psndoc,
          'pk_project': this.$store.state.manageProject.pk_project,
          'vcode': this.$store.state.manageProject.vcode
        }
        let res = await manageOverDay(params)
        console.log(res)
        this.overDayFollow = res.data.data.list[0].nun
      },
      fun_date(daysAgo, type) {
          let date = this.nowTime
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
      zero(date) {
        if (date === '') {
          date = '0'
        }
        return date
      },
      dateToday() {
        // let date = new Date()
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
        // let date = new Date()
        let date = new Date(this.oldYear, this.oldMonth, this.oldDay)
        let month = date.getMonth() + 1
        // getDay() 方法可返回表示星期的某一天的数字。getDate() 方法可返回月份的某一天。
        let days = (date.getDay() + 6) % 7
        let today = (date.getDate() - days).toString().length === 1 ? '0' + (date.getDate() - days).toString() : (date.getDate() - days).toString()
        month = month.toString().length === 1 ? '0' + month.toString() : month.toString()
        return date.getFullYear() + '-' + month + '-' + today
      },
      dateMonth() {
        // let date = new Date()
        let date = new Date(this.oldYear, this.oldMonth, this.oldDay)
        let month = date.getMonth() + 1
        month = month.toString().length === 1 ? '0' + month.toString() : month.toString()
        console.log(month)
        return month + '-01'
      },
      dateQuarter() {
        // let date = new Date()
        let date = new Date(this.oldYear, this.oldMonth, this.oldDay)
        let month = date.getMonth() + 1
        let months = ''
        console.log(month)
        if (month <= 3) {
          months = 1
        } else if (month <= 6) {
          months = 4
        } else if (month <= 9) {
          months = 7
        } else {
          console.log('1')
          months = 10
        }
        months = months.toString().length === 1 ? '0' + months.toString() : months.toString()
        console.log(months)
        return months + '-01'
      },
      dateYear() {
        // let date = new Date()
        let date = new Date(this.oldYear, this.oldMonth, this.oldDay)
        return date.getFullYear() + '-01-01'
      },
      time() {
        let oldYear = parseInt(this.$store.state.serverTime.split(',')[0])
        let oldMonth = parseInt(this.$store.state.serverTime.split(',')[1])
        let oldDay = parseInt(this.$store.state.serverTime.split(',')[2])
        this.nowTime = new Date(oldYear, oldMonth, oldDay)
        console.log(this.nowTime.getDay())
      }
    },
    created: function() {
      this.time()
      this.getPhoneList()
      this.getVisitList()
      this.getToday()
      this.getOverDay()
      this.getPhone()
      this.getVisit()
    },
    computed: {
      visitList: function() {
         return this.$store.state.manageVisit
      },
      phoneList: function() {
         return this.$store.state.manageCall
       }
    }
   }
</script>
<style scoped>
.wrapLine {
  margin-top: 8px;
  padding: 0 12px;
  background: #ffffff;
}
.header {
  border-bottom:1px solid #EAEFF3;
  padding: 6px 0;
  position: relative;
}
.data-list {
  position: absolute;
  width: 34%;
  right: 0;
  position: absolute;
  top: 36px;
  z-index: 99;
  border: 1px solid #B9C7D2;
  border-top: none;
}
.data-item {
  border-bottom: 1px solid #B9C7D2;
  height: 30px;
  line-height: 30px;
  background: linear-gradient(-180deg, #FFFFFF 0%, #EFF4F7 100%);
}
.header span {
  display: inline-block;
  float: left;
  line-height: 30px;
  height: 30px;
  color: #030303;
  font-size: 16px;
}
.check-data{
  float: right;
  display: inline-block;
  border: 0.5px solid #B9C7D2;
  width: 34%;
  background: linear-gradient(-180deg, #FFFFFF 0%, #EFF4F7 100%);
  height: 30px;
  line-height: 30px;
  margin: 0 auto;
  padding-right: 4px;
  padding-left: 10px;
  border-radius: 3px;
}
.check-data img {
  float: right;
  width: 8px;
  height: 4px;
  margin-top: 13px;
}
.content {
  height: 106px;
}
.content ul {
  height: 100%;
}
.content ul li{
   float: left;
   height: 70%;
   width: 33.3%;
   margin-top: 16px;
   border-right: 1px solid #EAEFF3;
}
.noneBorder{
  border-right: none !important;
}
.noneBorder .number {
  color: #98A1A8;
}
.number {
  font-size: 24px;
  height: 33px;
  line-height: 33px;
  color: #3CBAFF;
  display: block;
  margin-top: 15px;
}
.typeName {
  font-size: 12px;
  color: #98A1A8;
  display: block;
}
.follow {
  text-align: left;
  font-size: 16px;
  height: 43px;
  line-height: 31px;
}
.half ul li {
  width: 50% !important;
}
</style>
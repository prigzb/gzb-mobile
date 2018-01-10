<template>
  <div class="wrap">
  	<div class="header">
  		<div class="check-data" @click='showList'>
  			{{renderList.checkDate}}
  			<img src='../../assets/arrow-down-gray.png'>
  		</div>
  		<clear></clear>
  		<div class="data-list" v-if="listshown">
  			<div class="data-item" v-for="(data, index) in datas" @click='checkDates(index)'>{{ data }}</div>
  		</div>
  	</div>
  	<div class="wrapLine">
	    <div class="content">
	       <ul>
	       	  <li>
	       	  	 <span class="number">{{renderList.total}}</span>
	       	  	 <span class="typeName">总客户</span>
	       	  </li>
	       	  <li>
	       	  	 <span class="number">{{renderList.valid}}</span>
	       	  	 <span class="typeName">有效客户</span>
	       	  </li>
	       	  <li class="noneBorder">
	       	  	 <span class="number">{{renderList.invalid}}</span>
	       	  	 <span class="typeName">无效客户</span>
	       	  </li>
	       	  <clear></clear>
	       </ul>
	    </div>
    </div>
    <div class="cartogram">
       <ve-histogram :data-zoom="dataZoom" :legend="legend" :xAxis="xAxis" :yAxis="yAxis" :series="series" :grid="grid"></ve-histogram>
    </div>
    <div class="detailData wrapLine">
       <div class="header">
       	  <span>认知途径</span>
       	  <img src="../../assets/manage-sort.png">
       	  <clear></clear>
       </div>
       <div class="dataList">
         <ul v-for="(data, index) in routeList">
         	<li>
         	  <span class="text">{{data.vkwtname}}</span>
         	  <span class="num">{{data.nu}}</span>
         	  <clear></clear>
         	</li>
         </ul>
       </div>
    </div>
  </div>
</template>
<script>
   import clear from '@/components/clear'
   import {manageCalls, manageRoute} from '@/api/getData'
   export default {
    name: 'callVisitDetail',
    data () {
      return {
        listshown: false,
        type: this.$route.params.type,
        checkDate: '',
        datas: ['今日', '本周', '本月', '本季', '本年'],
        routeList: '',
        renderList: '',
        end_time: this.dateToday(),
        grid: {
          bottom: '10px'
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
                textStyle: {
                  color: '#7A797B'
                }
            }
        },
        yAxis: {
          type: 'value'
        },
        legend: {
          top: '20px',
          data: ['总客户(人)', '有效客户(人)']
        },
        dataZoom: [
          {
            type: 'inside',
            filterMode: 'empty',
            start: 100,
            end: 20,
            zoomLock: false
          }
        ],
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
        showList() {
          this.listshown = !this.listshown
        },
        async checkDates(index) {
          this.listshown = !this.listshown
          this.checkDate = this.datas[index]
          console.log(this.checkDate)
          if (this.type === 'phone') {
            let manageCall = this.$store.state.manageCall
            manageCall.checkDate = this.checkDate
            this.$store.commit('setCall', manageCall)
            await this.getDateList('phone')
            this.showX()
            // console.log(this.renderList)
          } else {
            let manageVisit = this.$store.state.manageVisit
            manageVisit.checkDate = this.checkDate
            this.$store.commit('setVisits', manageVisit)
            await this.getDateList('visit')
            this.showX()
            // console.log(this.renderList)
          }
          this.getRouteList()
        },
        async getCheckDate() {
          if (this.type === 'phone') {
            this.renderList = this.$store.state.manageCall
          } else {
            this.renderList = this.$store.state.manageVisit
          }
          console.log(this.renderList)
        },
        async getDateList() {
          console.log(this.checkDate)
          let start_time = ''
          let type = ''
          let route = ''
          let date = this.nowTime
          if (this.checkDate === '今日') {
            start_time = this.fun_date(-7, 'today')
            type = 'date'
          } else if (this.checkDate === '本周') {
            start_time = this.fun_date(-28, 'week')
            type = 'week'
          } else if (this.checkDate === '本月') {
            start_time = (date.getFullYear() - 1) + '-' + this.dateMonth()
            type = 'month'
          } else if (this.checkDate === '本季') {
            start_time = (date.getFullYear() - 1) + '-' + this.dateQuarter()
            type = 'quarter'
          } else {
            start_time = (date.getFullYear() - 4) + '-01-01'
            type = 'year'
          }
          console.log(type)
          if (this.type === 'phone') {
            route = '0'
          } else {
            route = '1'
          }
          console.log(start_time)
          let params = {
            'method': type,
            'fright': this.$store.state.manageProject.fright,
            'pk_corp': this.$store.state.manageProject.pk_responsecorp,
            'pk_psndoc': this.$store.state.userInfo.pk_psndoc,
            'pk_project': this.$store.state.manageProject.pk_project,
            'vcode': this.$store.state.manageProject.outvcode,
            'start_time': start_time,
            'end_time': this.end_time,
            'type': route
          }
          let res = await manageCalls(params)
          console.log(res)
          this.renderList.total = this.zero(res.data.data.list[0].numm)
          this.renderList.valid = this.zero(res.data.data.list[0].ynum)
          this.renderList.invalid = this.zero(res.data.data.list[0].notnum)
          // 存放统计图数据
          this.xAxis.data = []
          let resList = res.data.data.list.reverse()
          // console.log(resList)
          let series = this.$store.state.series
          series[0].data = []
          series[1].data = []
          for (let data of resList) {
            series[0].data.push(Number(data.ynum))
            series[1].data.push(Number(data.numm))
          }
          this.$store.commit('setSeries', series)
        },
        async getRouteList() {
          let start_time = ''
          let date = this.nowTime
          if (this.renderList.checkDate === '今日') {
            start_time = this.dateToday()
          } else if (this.renderList.checkDate === '本周') {
            start_time = this.dateWeek()
          } else if (this.renderList.checkDate === '本月') {
            start_time = date.getFullYear() + '-' + this.dateMonth()
          } else if (this.renderList.checkDate === '本季') {
            start_time = date.getFullYear() + '-' + this.dateQuarter()
          } else {
            start_time = this.dateYear()
          }
          // console.log(start_time)
          let type = ''
          if (this.type === 'phone') {
            type = '0'
          } else {
            type = '1'
          }
          let params = {
           'method': 'phoneselect',
           'fright': this.$store.state.manageProject.fright,
           'pk_corp': this.$store.state.manageProject.pk_responsecorp,
           'pk_psndoc': this.$store.state.userInfo.pk_psndoc,
           'pk_psnbasdoc': this.$store.state.userInfo.pk_psnbasdoc,
           'vcode': this.$store.state.manageProject.outvcode,
           // 'pk_project': this.$store.state.manageProject.pk_project,
           'start_time': start_time,
           'end_time': this.end_time,
            'type': type
          }
          let res = await manageRoute(params)
          console.log(res)
          this.routeList = res.data.data.list
          for (let data of this.routeList) {
            data.nu = Number(data.nu)
          }
          this.routeList.sort(function (a, b) {
            if (a.nu > b.nu) {
              return -1
            }
            if (a.nu < b.nu) {
              return 1
            }
            return 0
           })
          console.log(this.routeList)
        },
        zero(date) {
        if (date === '') {
          date = '0'
        }
        return date
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
            if (this.renderList.checkDate === '今日') {
              let initDay = 0
              for (let i = this.series[0].data.length - 1; i > -1; i--) {
                let day = (new Date().getDay() - initDay)
                if (day < 0) {
                  day = day + 7
                }
                this.xAxis.data[i] = this.changeDay(day)
                this.xAxis = Object.assign({}, this.xAxis)
                initDay++
             }
            } else if (this.renderList.checkDate === '本月') {
               let initMonth = -1
               for (let i = this.series[0].data.length - 1; i > -1; i--) {
                  let month = new Date().getMonth() - initMonth
                  if (month < 1) {
                     month = (new Date().getFullYear() - 1) + '' + (month + 12)
                  }
                  this.xAxis.data[i] = month + '月'
                  this.xAxis = Object.assign({}, this.xAxis)
                  initMonth++
               }
            } else if (this.renderList.checkDate === '本年') {
              let initYear = 0
              for (let i = this.series[0].data.length - 1; i > -1; i--) {
                let year = new Date().getFullYear()
                this.xAxis.data[i] = year - initYear + '年'
                this.xAxis = Object.assign({}, this.xAxis)
                initYear++
              }
            } else if (this.renderList.checkDate === '本季') {
              let initSeason = ''
              let month = new Date().getMonth() + 1
              if (month <= 3) {
               initSeason = 1
              } else if (month <= 6) {
               initSeason = 2
              } else if (month <= 9) {
               initSeason = 3
              } else {
               initSeason = 4
              }
              let year = new Date().getFullYear()
              for (let i = this.series[0].data.length - 1; i > -1; i--) {
                let season = initSeason
                if (season < 1) {
                 season = season + 4
                 this.xAxis.data[i] = year - 1 + '年' + season + '季'
                } else {
                 this.xAxis.data[i] = year + '年' + season + '季'
                }
                this.xAxis = Object.assign({}, this.xAxis)
                initSeason--
               }
            } else if (this.renderList.checkDate === '本周') {
              let weekday = []
              for (let j = 0; j < this.series[0].data.length; j++) {
                  weekday[j] = this.fun_date((-7 * j), 'today')
              }
              // weekday[0] = this.dateWeek()
              // let weeks = weekday.reverse()
              let weeks = ['前四周', '前三周', '前两周', '前周', '本周']
              for (let i = this.series[0].data.length - 1; i > -1; i--) {
                this.xAxis.data[i] = weeks[i]
                this.xAxis = Object.assign({}, this.xAxis)
              }
            }
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
    created: async function() {
      this.time()
      await this.getCheckDate()
      this.getRouteList()
      this.showX()
    },
    computed: {
      series: function() {
        return this.$store.state.series
      }
    }
   }
</script>

<style scoped>
.wrapLine {
  padding: 0 12px;
  background: #ffffff;
  margin-top: 8px;
}
.header {
  border-bottom:1px solid #EAEFF3;
  padding: 9px 0;
  position: relative;
}
.data-list {
  position: absolute;
  width: 34%;
  right: 33%;
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
.header>img {
  margin-top: 6px;
  display: block;
  float: right;
  width: 20px;
}
.check-data{
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
.dataList ul li{
   height: 43px;
   border-bottom: 1px solid #EAEFF3;
}
.dataList ul li span {
  margin-top: 13px;
  font-size: 14px;
  line-height: 16px;
}
.text {
 color: #7A797B;
 float: left;
}
.num {
 float: right;
 color: #030303;
}
.cartogram {
  margin-top: 8px;
  background: #ffffff;
}
</style>
<template>
  <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
  	<div class="performance">
  		<div class="check-data" @click='showList'>
  			{{ checkedDate }}
  			<img src='../../assets/arrow-down-gray.png'>
  		</div>
  		<div class="data-list" v-if="listshown">
  			<div class="data-item" v-for="(data, index) in datas" @click='checkData(index)'>{{ data }}</div>
  		</div>
  		<div class="reserve" @click="jump('performanceReserve')">
  			<performanceBlock leftContent='预订' :reserveNum="performances.yuding.count"></performanceBlock>
  		</div>
  		<div class="subscription" @click="jump('performanceSubscription')">
  			<performanceBlockTwo leftContent='认购' :subscriptionNum="performances.rengou.count" :subscriptionMoney="rengouAmount" :subMoney="rengouSub"></performanceBlockTwo>
  		</div>
  		<clear></clear>
  		<div class="sign" @click="jump('performanceSign')">
  			<performanceBlockTwo leftContent='签约' :subscriptionNum="performances.qianyue.count" :subscriptionMoney="qianyueAmount" :subMoney="qianyueSub"></performanceBlockTwo>
  		</div>
  		<div class="pay" @click="jump('performancePayment')">
  			<performanceBlockTwo leftContent='回款' :subscriptionNum="performances.shoukuan.count" :subscriptionMoney="shoukuanAmount" :subMoney="shoukuanSub"></performanceBlockTwo>
  		</div>
  		<clear></clear>
  		<commonFooter></commonFooter>
  	</div>
  </yd-pullrefresh>	
</template>

<script>
	import clear from '@/components/clear'
	import performanceBlock from '@/components/assistant/performanceBlock'
	import performanceBlockTwo from '@/components/assistant/performanceBlockTwo'
	import commonFooter from '@/components/assistant/commonFooter'
	import {getPerformance} from '@/api/getData'

	export default {
    name: 'performance',
    components: {
      clear, performanceBlock, performanceBlockTwo, commonFooter
    },
    data() {
      return {
        listshown: false,
        checkedDate: this.$store.state.performanceCheckedDate,
        datas: ['今日', '本周', '本月', '本季', '本年'],
        performances: '',
        oldYear: parseInt(this.$store.state.serverTime.split(',')[0]),
        oldMonth: parseInt(this.$store.state.serverTime.split(',')[1]),
        oldDay: parseInt(this.$store.state.serverTime.split(',')[2]),
        params: {
          method: 'selectuserdata',
          pk_project: this.$store.state.selectedProject.pk_project,
          pk_user: this.$store.state.userInfo.user_id,
          begin_date: this.dateToday(),
          end_date: this.dateToday()
        }
      }
    },
    computed: {
      rengouAmount() {
        return this.performances.rengou.amount.split('.')[0]
      },
      rengouSub() {
        if (this.performances.rengou.amount.split('.')[1] === undefined) {
          return ''
        } else {
          return ('.' + this.performances.rengou.amount.split('.')[1])
        }
      },
      qianyueAmount() {
        return this.performances.qianyue.amount.split('.')[0]
      },
      qianyueSub() {
        if (this.performances.qianyue.amount.split('.')[1] === undefined) {
          return ''
        } else {
          return ('.' + this.performances.qianyue.amount.split('.')[1])
        }
      },
      shoukuanAmount() {
        return this.performances.shoukuan.amount.split('.')[0]
      },
      shoukuanSub() {
        if (this.performances.shoukuan.amount.split('.')[1] === undefined) {
          return ''
        } else {
          return ('.' + this.performances.shoukuan.amount.split('.')[1])
        }
      }
    },
    methods: {
      showList() {
        this.listshown = !this.listshown
      },
      checkData(index) {
        this.listshown = !this.listshown
        this.checkedDate = this.datas[index]
        this.$store.commit('performanceCheckedDate', this.checkedDate)
        this.getPerfor()
      },
      jump(path) {
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
        this.$router.push('/assistant/' + path)
      },
      async getPerfor() {
        if (this.checkedDate === '今日') {
          this.params.begin_date = this.dateToday()
        } else if (this.checkedDate === '本周') {
          this.params.begin_date = this.dateWeek()
        } else if (this.checkedDate === '本月') {
          this.params.begin_date = this.dateMonth()
        } else if (this.checkedDate === '本季') {
          this.params.begin_date = this.dateQuarter()
        } else {
          this.params.begin_date = this.dateYear()
        }
        let date = {
          begin_date: this.params.begin_date,
          end_date: this.params.end_date
        }
        this.$store.commit('performanceDate', date)
        let res = await getPerformance(this.params)
        console.log(res)
        this.performances = res.data.data
        let performanceCount = {
          yudingCount: this.performances.yuding.count,
          rengouCount: this.performances.rengou.count,
          qianyueCount: this.performances.qianyue.count,
          shoukuanCount: this.performances.shoukuan.count
        }
        this.$store.commit('performanceCount', performanceCount)
      },
      dateToday() {
        let oldYear = parseInt(this.$store.state.serverTime.split(',')[0])
        let oldMonth = parseInt(this.$store.state.serverTime.split(',')[1])
        let oldDay = parseInt(this.$store.state.serverTime.split(',')[2])
        let date = new Date(oldYear, oldMonth, oldDay)
        console.log(date, 111111111111)
        let month = date.getMonth() + 1
        let today = date.getDate().toString().length === 1 ? '0' + date.getDate().toString() : date.getDate().toString()
        month = month.toString().length === 1 ? '0' + month.toString() : month.toString()
        return date.getFullYear() + '-' + month + '-' + today
      },
      dateWeek() {
        let date = new Date(this.oldYear, this.oldMonth, this.oldDay)
        console.log(date, 222)
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
        return date.getFullYear() + '-' + month + '-01'
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
        return date.getFullYear() + '-' + months + '-01'
      },
      dateYear() {
        let date = new Date(this.oldYear, this.oldMonth, this.oldDay)
        return date.getFullYear() + '-01-01'
      },
      loadList() {
        this.getPerfor()
        this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad')
      }
    },
    created: function() {
      this.getPerfor()
    }
	}
</script>

<style scoped>
	.performance {
		font-family: 'PingFangSC-Regular';
		color: #333333;
		font-size: 14px;
		position: relative;
	}
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
    top: 35px;
		z-index: 99;
	}
	.data-item {
		border-bottom: 1px solid #B9C7D2;
		height: 30px;
		line-height: 30px;
    background: linear-gradient(-180deg, #FFFFFF 0%, #EFF4F7 100%);
	}
	.reserve, .sign {
		margin-left: 3.8%;
		width: 44.3%;
		float: left;
	}
	.subscription, .pay {
		margin-right: 3.8%;
		width: 44.3%;
		float: right;
	}
	.sign, .pay {
		margin-top: 8px;
	}
</style>
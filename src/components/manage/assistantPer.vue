<template>
  <div class="performance">
    <div class="check-data" @click='showList'>
      {{ checkedDate }}
      <img src='../../assets/arrow-down-gray.png'>
    </div>
    <div class="data-list" v-if="listshown">
      <div class="data-item" v-for="(data, index) in datas" @click='checkData(index)'>{{ data }}</div>
    </div>
    <div class="reserve">
      <performanceBlock leftContent='预定' :reserveNum="performances.yuding.count"></performanceBlock>
    </div>
    <div class="subscription">
      <performanceBlockThree leftContent='认购' :subscriptionNum="performances.rengou.count" :subscriptionMoney="rengouAmount" :subMoney="rengouSub"></performanceBlockThree>
    </div>
    <clear></clear>
    <div class="sign">
      <performanceBlockThree leftContent='签约' :subscriptionNum="performances.qianyue.count" :subscriptionMoney="qianyueAmount" :subMoney="qianyueSub"></performanceBlockThree>
    </div>
    <div class="pay">
      <performanceBlockThree leftContent='回款' :subscriptionNum="performances.shoukuan.count" :subscriptionMoney="shoukuanAmount" :subMoney="shoukuanSub"></performanceBlockThree>
    </div>
    <clear></clear>
    <commonFooter></commonFooter>
  </div>  
</template>

<script>
  import clear from '@/components/clear'
  import performanceBlock from '@/components/manage/performanceBlock'
  import performanceBlockThree from '@/components/manage/performanceBlockThree'
  import commonFooter from '@/components/manage/commonFooter'
  import {manageTeamMess} from '@/api/getData'

  export default {
    name: 'performance',
    components: {
      clear, performanceBlock, performanceBlockThree, commonFooter
    },
    data() {
      return {
        listshown: false,
        checkedDate: this.$store.state.manageDate,
        datas: ['今日', '本周', '本月', '本季', '本年'],
        performances: '',
        params: {
          method: 'getpersonlist',
          pk_project: this.$store.state.manageProject.pk_project,
          pk_personuser: this.$store.state.manageUserId,
          begin_date: this.dateToday(),
          end_date: this.dateToday(),
          pk_user: this.$store.state.userInfo.user_id,
          billtype: '1'
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
        this.$store.commit('manageDate', this.checkedDate)
        this.getPerfor()
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
        let res = await manageTeamMess(this.params)
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
        let date = new Date()
        let month = date.getMonth() + 1
        let today = date.getDate().toString().length === 1 ? '0' + date.getDate().toString() : date.getDate().toString()
        month = month.toString().length === 1 ? '0' + month.toString() : month.toString()
        return date.getFullYear() + '-' + month + '-' + today
      },
      dateWeek() {
        let date = new Date()
        let month = date.getMonth() + 1
        let days = (date.getDay() + 6) % 7
        let today = (date.getDate() - days).toString().length === 1 ? '0' + (date.getDate() - days).toString() : (date.getDate() - days).toString()
        month = month.toString().length === 1 ? '0' + month.toString() : month.toString()
        return date.getFullYear() + '-' + month + '-' + today
      },
      dateMonth() {
        let date = new Date()
        let month = date.getMonth() + 1
        month = month.toString().length === 1 ? '0' + month.toString() : month.toString()
        return date.getFullYear() + '-' + month + '-01'
      },
      dateQuarter() {
        let date = new Date()
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
        let date = new Date()
        return date.getFullYear() + '-01-01'
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
    z-index: 99;
    top: 35px;
    background: linear-gradient(-180deg, #FFFFFF 0%, #EFF4F7 100%);
  }
  .data-item {
    border-bottom: 1px solid #B9C7D2;
    height: 30px;
    line-height: 30px;
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
<template>
  <div class="gzb-back">
      <div class="gzb-list-item" v-for="(item,index) in dateList" :key="item.id" @click="chooseLabel(index)">
          <div class="gzb-list-title">
              <span>{{item.name}}</span>
          </div>
          <div class="gzb-list-detail">
          </div>
      </div>
    <div class="gzb-gray-title">
      <span>自定义</span>
    </div>
      <div class="gzb-list-item">
          <div class="gzb-list-title">
              <span>{{customList[0].name}}</span>
          </div>
          <div class="gzb-list-detail">
              <yd-datetime type="date" v-model="customList[0].value" slot="right"></yd-datetime>
          </div>
      </div>
      <div class="gzb-list-item">
          <div class="gzb-list-title">
              <span>{{customList[1].name}}</span>
          </div>
          <div class="gzb-list-detail">
              <yd-datetime type="date" v-model="customList[1].value" slot="right"></yd-datetime>
          </div>
      </div>
      <yd-button class="gzb-submit" size="large" type="hollow" @click.native="submitTime" :disabled="isChoosen">确定</yd-button>
  </div>
</template>
<script>
import listItem from '@/components/application/listItem'
export default {
    name: 'selectDate',
    data() {
        return {
            initial: false,
            dateList: [{
                name: '全部时间',
                value: ''
            }, {
                name: '当日',
                value: this.dateToday()
            }, {
                name: '本周',
                value: this.dateWeek()
            }, {
                name: '本月',
                value: this.dateMonth()
            }, {
                name: '本年',
                value: this.dateYear()
            }],
            customList: [{
                name: '开始时间',
                value: this.dateToday()
            }, {
                name: '结束时间',
                value: this.dateToday()
            }],
            module: this.$route.params.module
        }
    },
    components: {
        listItem
    },
    methods: {
        dateToday() {
            let date = new Date()
            let month = date.getMonth() + 1
            let today = date.getDate().toString().length === 1 ? '0' + date.getDate().toString() : date.getDate().toString()
            month = month.toString().length === 1 ? '0' + month.toString() : month.toString()
            return date.getFullYear() + '-' + month + '-' + today
        },
        dateWeek() {
            let date = new Date()
            let days = (date.getDay() + 6) % 7
            date.setDate(date.getDate() - days)
            let today = date.getDate()
            let month = date.getMonth() + 1
            today = today.toString().length === 1 ? '0' + today.toString() : today.toString()
            month = month.toString().length === 1 ? '0' + month.toString() : month.toString()
            return date.getFullYear() + '-' + month + '-' + today
        },
        dateMonth() {
            let date = new Date()
            let month = date.getMonth() + 1
            month = month.toString().length === 1 ? '0' + month.toString() : month.toString()
            return date.getFullYear() + '-' + month + '-01'
        },
        dateYear() {
            let date = new Date()
            return date.getFullYear() + '-01-01'
        },
        chooseLabel(index) {
            let searchInfo = {}
            switch (this.module) {
                case 'approval':
                    searchInfo = this.$store.state.approval
                    searchInfo.beginDate = this.dateList[index].value
                    searchInfo.endDate = this.dateToday()
                    searchInfo.dateIndex = index
                    this.$store.commit('setApproval', searchInfo)
                    this.$router.go(-1)
                    break
                case 'payment':
                    searchInfo = this.$store.state.payment
                    searchInfo.beginDate = this.dateList[index].value
                    searchInfo.endDate = this.dateToday()
                    searchInfo.dateIndex = index
                    this.$store.commit('setPayment', searchInfo)
                    this.$router.go(-1)
                    break
                case 'fund':
                    searchInfo = this.$store.state.fund
                    searchInfo.beginDate = this.dateList[index].value
                    searchInfo.endDate = this.dateToday()
                    searchInfo.dateIndex = index
                    this.$store.commit('setFund', searchInfo)
                    this.$router.go(-1)
                    break
                case 'travel':
                    searchInfo = this.$store.state.travel
                    searchInfo.beginDate = this.dateList[index].value
                    searchInfo.endDate = this.dateToday()
                    searchInfo.dateIndex = index
                    this.$store.commit('setTravel', searchInfo)
                    this.$router.go(-1)
                    break
                case 'search':
                    searchInfo = this.$store.state.search
                    searchInfo.beginDate = this.dateList[index].value
                    searchInfo.endDate = this.dateToday()
                    searchInfo.dateIndex = index
                    this.$store.commit('setSearch', searchInfo)
                    this.$router.go(-1)
            }
        },
        submitTime() {
            let searchInfo = {}
            switch (this.module) {
                case 'approval':
                    searchInfo = this.$store.state.approval
                    searchInfo.beginDate = this.customList[0].value
                    searchInfo.endDate = this.customList[1].value
                    searchInfo.dateIndex = 5
                    this.$store.commit('setApproval', searchInfo)
                    this.$router.go(-1)
                    break
                case 'payment':
                    searchInfo = this.$store.state.payment
                    searchInfo.beginDate = this.customList[0].value
                    searchInfo.endDate = this.customList[1].value
                    searchInfo.dateIndex = 5
                    this.$store.commit('setPayment', searchInfo)
                    this.$router.go(-1)
                    break
                case 'fund':
                    searchInfo = this.$store.state.fund
                    searchInfo.beginDate = this.customList[0].value
                    searchInfo.endDate = this.customList[1].value
                    searchInfo.dateIndex = 5
                    this.$store.commit('setFund', searchInfo)
                    this.$router.go(-1)
                    break
                case 'travel':
                    searchInfo = this.$store.state.travel
                    searchInfo.beginDate = this.customList[0].value
                    searchInfo.endDate = this.customList[1].value
                    searchInfo.dateIndex = 5
                    this.$store.commit('setTravel', searchInfo)
                    this.$router.go(-1)
                    break
                case 'search':
                    searchInfo = this.$store.state.search
                    searchInfo.beginDate = this.customList[0].value
                    searchInfo.endDate = this.customList[1].value
                    searchInfo.dateIndex = 5
                    this.$store.commit('setSearch', searchInfo)
                    this.$router.go(-1)
                    break
            }
        }
    },
    computed: {
        isChoosen() {
            return (this.customList[0].value === this.itemWeek && this.customList[1].value === this.itemWeek)
        },
        itemWeek() {
            let date = new Date()
            let month = date.getMonth() + 1
            month = month.toString().length === 1 ? '0' + month.toString() : month.toString()
            return date.getFullYear() + '-' + month + '-01'
        }
    },
    created: function() {
    }
}
</script>
<style scoped>
.gzb-back {
    background-color: #EAEFF3;
    text-align: left;
}
.gzb-gray-title {
    line-height: 30px;
    padding: 6px 12px;
}
.gzb-submit {
    text-align: center;
    position: fixed !important;
    width: 100%;
    bottom: 0;
    left: 0px;
    border: 0;
    color:#3CBAFF;
    background-color: #fff;
}
/*.yd-btn-hollow{
    color:#3CBAFF;
}*/
.gzb-list-item {
    padding: 0 12px;
    line-height: 44px;
    height: 44px;
    position: relative;
    display: flex;
    vertical-align: middle;
    overflow: hidden;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #EBEFF3;
}
.gzb-list-title {
    display: block;
    width: 0;
    -ms-flex: 1;
    flex: 1;
    -webkit-box-flex: 1;
    font-size: 16px;
}
.gzb-list-detail {
    color: #98a1a8;
    font-size: 14px;
}
</style>

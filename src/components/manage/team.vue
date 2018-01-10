<template>
  <div class="team">
    <div class="choice">
      <div class="left">
        <div class="check-date" @click="showList('date')">
          {{ checkedDate }}
          <img src='../../assets/arrow-down-gray.png'>
        </div>
        <div class="date-list" v-if="listshown">
          <div class="date-item" v-for="(date, index) in dates" @click='checkDate(index)'>{{ date }}</div>
        </div>
      </div>
      <div class="right">
        <div class="check-type" @click="showList('type')">
          {{ checkedType }}
          <img src="../../assets/arrow-down-gray.png">
        </div>
        <div class="type-list" v-if="listshown2">
          <div class="type-item" v-for="(type, index) in types" @click='checkType(index)'>{{ type }}</div>
        </div>
      </div>
      <clear></clear>
    </div>
    <div class="middle">
      <div class="border"></div>
      <div class="border2"></div>
      <div class="left">
        <span class="blue">{{ renderList.totalpsnnum }}</span><br>
        <span class="grey">总人数</span>
      </div>
      <div class="left">
        <span class="blue">{{ renderList.totalrate }}</span><br>
        <span class="grey">总转化率</span>
      </div>
      <div class="left">
        <span class="blue">{{ renderList.totalhousenum }}</span><br>
        <span class="grey">总套数</span>
      </div>
      <div class="left">
        <span class="blue" v-if="checkedType == '预订'">- -</span>
        <span class="blue" v-if="checkedType != '预订'">{{ renderList.totalamount }}</span><br>
        <span class="grey">总金额(万元)</span>
      </div>
      <clear></clear>
    </div>
    <div class="sort">
      <span>{{ sortTitle }}</span>
      <img src="../../assets/manage-sort.png">
      <clear></clear>
    </div>
    <div>
      <div class="teamItem" @click="jump(index)" v-for="(group, index) in groups" v-if="check(index)">
        <span class="left">{{ group.vsgname }}</span>
        <div class="right">
          <img src="../../assets/arrow-right.png">
          <div>
            <span>人数(人) : <span class="blue">{{ group.psnnum }}</span></span><br>
            <span v-if="checkedType != '预订'">金额(万元) : <span class="blue">{{ group.amount === '' ? 0 : group.amount }}</span></span>
            <span v-if="checkedType == '预订'">套数(套) : <span class="blue">{{ group.amount === '' ? 0 : group.amount }}</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import clear from '@/components/clear'
  import {manageTeamMess} from '@/api/getData'

  export default {
    name: 'team',
    data() {
      return {
        checkedDate: this.$store.state.manageDate,
        checkedType: this.$store.state.manageType,
        listshown: false,
        listshown2: false,
        oldYear: parseInt(this.$store.state.serverTime.split(',')[0]),
        oldMonth: parseInt(this.$store.state.serverTime.split(',')[1]),
        oldDay: parseInt(this.$store.state.serverTime.split(',')[2]),
        dates: ['今日', '本周', '本月', '本季', '本年'],
        types: ['预订', '认购', '签约', '回款'],
        sortTitle: '按套数排序',
        renderList: [],
        groups: []
      }
    },
    components: {
      clear
    },
    methods: {
      showList(kind) {
        if (kind === 'date') {
          this.listshown = !this.listshown
          this.listshown2 = false
        } else {
          this.listshown = false
          this.listshown2 = !this.listshown2
        }
      },
      check(index) {
        if (this.groups[index].vsgname === '未分配人员团队') {
          if (this.groups[index].psnnum === '0') {
            return false
          } else {
            return true
          }
        } else {
          return true
        }
      },
      checkDate(index) {
        this.listshown = !this.listshown
        this.checkedDate = this.dates[index]
        this.$store.commit('manageDate', this.checkedDate)
        this.getMess()
      },
      checkType(index) {
        this.listshown2 = !this.listshown2
        this.checkedType = this.types[index]
        this.$store.commit('manageType', this.checkedType)
        this.getMess()
      },
      async getMess() {
        let start_time = ''
        let type = ''
        let ratebegin_date = ''
        if (this.checkedDate === '今日') {
          start_time = this.dateToday()
          ratebegin_date = this.dateMonth()
        } else if (this.checkedDate === '本周') {
          start_time = this.dateWeek()
          ratebegin_date = this.dateMonth()
        } else if (this.checkedDate === '本月') {
          start_time = this.dateMonth()
          ratebegin_date = this.dateMonth()
        } else if (this.checkedDate === '本季') {
          start_time = this.dateQuarter()
          ratebegin_date = this.dateQuarter()
        } else {
          start_time = this.dateYear()
          ratebegin_date = this.dateYear()
        }
        console.log(start_time)
        if (this.checkedType === '预订') {
          type = '0'
        } else if (this.checkedType === '认购') {
          type = '1'
        } else if (this.checkedType === '签约') {
          type = '2'
        } else {
          type = '3'
        }
        console.log(type)
        let params = {
          method: 'getlist',
          pk_project: this.$store.state.manageProject.pk_project,
          billtype: type,
          pk_user: this.$store.state.userInfo.user_id,
          // pk_project: '00011210000000003JXH',
          // billtype: '1',
          // pk_user: '0001121000000000I09S',
          begin_date: start_time,
          end_date: this.dateToday(),
          ratebegin_date: ratebegin_date,
          rateend_date: this.dateToday()
        }
        let res = await manageTeamMess(params)
        this.renderList = res.data.data.data
        this.groups = res.data.data.data.group.sort(function (a, b) {
          if (parseFloat(a.amount) > parseFloat(b.amount)) {
            return -1
          } else if (parseFloat(a.amount) < parseFloat(b.amount)) {
            return 1
          } else {
            return 0
          }
        })
        if (this.groups.length === 0) {
          this.renderList = {
            totalpsnnum: 0,
            totalrate: 0,
            totalhousenum: 0,
            totalamount: 0
          }
        }
        console.log(this.renderList, 111111111)
        console.log(res)
      },
      jump(index) {
        let manageSellGroup = this.renderList.group[index].pk_sellgroup
        this.$store.commit('manageSellGroup', manageSellGroup)
        this.$router.push('/manage/performance/teamMess')
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
      checkText() {
        if (this.checkedType === '预订') {
          this.sortTitle = '按套数排序'
        } else {
          this.sortTitle = '按金额排序'
        }
      }
    },
    watch: {
      checkedType: function() {
        if (this.checkedType === '预订') {
          this.sortTitle = '按套数排序'
        } else {
          this.sortTitle = '按金额排序'
        }
      }
    },
    created: async function() {
      await this.getMess()
      this.checkText()
    }
  }
</script>

<style scoped>
  .choice {
    height: 50px;
    padding: 10px 3.8%;
    color: #333333;
    font-size: 14px;
  }
  .choice .left {
    float: left;
    width: 44.4%;
    position: relative;
  }
  .choice .right {
    width: 44.4%;
    float: right;
    position: relative;
  }
  .check-date, .check-type {
    height: 30px;
    line-height: 30px;
    padding-left: 15.8%;
    background: linear-gradient(-180deg, #FFFFFF 0%, #EFF4F7 100%);
  }
  .check-date img, .check-type img {
    float: right;
    width: 8px;
    height: 4px;
    margin-top: 12px;
    margin-right: 4px;
  }
  .date-item, .type-item {
    padding-left: 8%;
    background: linear-gradient(-180deg, #FFFFFF 0%, #EFF4F7 100%);
    height: 30px;
    line-height: 30px;
  }
  .date-list, .type-list {
    position: absolute;
    width: 100%;
    z-index: 99;
  }
  .middle {
    position: relative;
  }
  .middle .left {
    padding-top: 14px;
    width: 50%;
    height: 90px;
    background: #FFFFFF;
    float: left;
  }
  .border {
    background: #EAEFF3;
    width: 2px;
    height: 156px;
    position: absolute;
    left: 50%;
    top: 12px;
  }
  .border2 {
    background: #EAEFF3;
    height: 2px;
    width: 92.5%;
    position: absolute;
    top: 89px;
    left: 3.8%;
  }
  .blue {
    color: #3CBAFF;
    font-size: 30px;
    display: inline-block;
    margin-bottom: 4px;
  }
  .grey {
    color: #98A1A8;
  }
  .sort {
    padding-top: 5px;
    padding-left: 3.8%;
    height: 30px;
    background: #FFFFFF;
    margin-top: 8px;
  }
  .sort span {
    float: left;
  }
  .sort img {
    width: 14px;
    height: 12px;
    margin-top: 4px;
    float: left;
    margin-left: 4px;
  }
  .teamItem {
    height: 60px;
    border: 1px solid #EAEFF3;
    background: #FFFFFF;
    padding: 0 12px 0 13px;
  }
  .teamItem .left {
    margin-top: 19px;
    float: left;
    font-size: 16px;
    color: #030303;
  }
  .teamItem .right {
    float: right;
    font-size: 14px;
    color: #7A797B;
    margin-top: 9px;
    text-align: right;
  }
  .teamItem .right div {
    float: right;
  }
  .teamItem .blue {
    font-size: 14px;
  }
  .teamItem img {
    display: inline-block;
    width: 6px;
    height: 12px;
    float: right;
    margin-top: 15px;
    margin-left: 20px;
  }
  .teamItem .right span:nth-of-type(1) {
    margin-bottom: 4px;
  }

</style>
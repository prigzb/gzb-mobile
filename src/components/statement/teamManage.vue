<template>
	<div class="team-manage">
		<div class="top-title">
			<div class="interval"></div>
			<div class="select" @click="selectProject">
				<p><span>{{project.name}}</span></p>
			</div>
			<div class="interval"></div>
			<div class="select" @click="selectTime">
				<p><span>{{showdateList}}</span></p>
			</div>
			<div class="interval"></div>
			<div class="select" @click="showanalysize">
				<p><span>{{showanalysizeList}}</span></p>
			</div>
			<div class="interval"></div>
		</div>
		<!--<div class="time-list" v-if="timeshown">
			<div class="analysize-item" v-for="(date,index) in dateList" :key="date.id" @click="chooseDate(index)">
				<p><span>{{date.name}}</span></p>
			</div>
		</div>-->
		<div class="analysize-list" v-if="listshown">
			<div class="analysize-item" v-for="(analysize,index) in analysizeList" :key="analysize.id" @click="chooseList(index)">
				<p><span>{{analysize.name}}</span></p>
			</div>
		</div>
		<div class="total-number">
			<div class="block total-people">
				<p><span class="num people">{{datadata.totalpsnnum}}</span><span class="text">总人数</span></p>
			</div>
			<div class="block total-conversion">
				<p><span class="num conversion">{{datadata.totalrate}}</span><span class="text">总转化率</span></p>
			</div>
			<div class="block total-sleeve">
				<p><span class="num sleeve">{{datadata.totalhousenum}}</span><span class="text">总套数</span></p>
			</div>
			<div class="block total-amount">
				<p><span class="num amount">{{datadata.totalamount}}</span><span class="text">总金额(万元)</span></p>
			</div>
		</div>
		<div class="teams">
			<div class="teams-title">
				<span class="order" v-if="!show">按金额排序</span>
				<span class="order" v-if="show">按套数排序</span>
				<span class="order-icon"></span>
			</div>
			<div class="teams-content">
				<div v-for="(item,index) in dataList" class="team">
					<div class="team-name">{{dataList[index].vsgname}}</div>
					<div class="team-case">
						<p style="margin-bottom: 4px;">
							<span>人数(人)：</span>
							<span>{{dataList[index].psnnum}}</span>
						</p>
						<p>
							<span v-if="!show">金额(万元)：</span>
							<span v-if="show">套数(套)：</span>
							<span>{{dataList[index].amount}}</span>
						</p>
					</div>
					<clear></clear>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import clear from '@/components/clear'
import {teamManage} from '@/api/getData'
export default {
  name: 'teamManage',
  data() {
    return {
      listshown: false,
      /* timeshown: false, */
      dateList: [{
        name: '今日'
      }, {
        name: '本周'
      }, {
        name: '本月'
      }, {
        name: '本年'
      }, {
        name: '自定义'
      }],
      analysizeList: [{
        name: '预订',
        index: 0
      }, {
        name: '认购',
        index: 1
      }, {
        name: '签约',
        index: 2
      }, {
        name: '回款',
        index: 3
      }],
      project: this.$store.state.statementProject,
      type: 'teamManage',
      dataList: [],
      datadata: {},
      conversionRatebeginDate: this.dateMonth(),
      show: false
    }
  },
  components: {
    clear
  },
  methods: {
    selectProject() {
      this.$router.push({ path: '/statement/selectProject/0/' + this.type })
    },
    selectTime() {
      /* this.listshown = false
      this.timeshown = !this.timeshown */
      this.$router.push({path: '/statement/selectTime'})
    },
    showanalysize() {
      /* this.timeshown = false */
      this.listshown = !this.listshown
    },
    chooseDate(index) {
      this.match(index)
      this.conversionRatebeginDate = this.conversionRate(index)
      let list = this.$store.state.dateList
      list.statusIndex = index
      this.$store.commit('setdateList', list)
      /* this.timeshown = !this.timeshown */
      this.dataList = []
      this.getDataList()
    },
    chooseList(index) {
      let typeList = this.$store.state.type
      typeList.statusIndex = index
      this.$store.commit('setTypeInfo', typeList)
      this.listshown = !this.listshown
      this.dataList = []
      this.getDataList()
    },
    async getDataList() {
      this.$dialog.loading.open('很快加载好了')
      let pro = this.project.pk_project
      if (pro === '') {
        pro = 'allproject'
      }
      let params = {
        method: 'getreportlist',
        pk_project: pro,
        begin_date: this.$store.state.approval.beginDate,
        end_date: this.$store.state.approval.endDate,
        billtype: this.showanalysizeListIndex,
        pk_user: this.$store.state.userInfo.user_id,
        ratebegin_date: this.conversionRatebeginDate,
        rateend_date: this.dateToday()
      }
      let res = await teamManage(params)
      this.$dialog.loading.close()
      if (res.data.flag === '0') {
        this.datadata = res.data.data.data
        this.dataList = res.data.data.data.group
        if (this.showanalysizeListIndex === 0) {
          this.datadata.totalamount = '--'
          this.show = true
        } else {
          this.datadata.totalamount = this.datadata.totalamount
          this.show = false
        }
        this.dataList = this.dataList.sort(function(x, y) {
          return parseFloat(y.amount) - parseFloat(x.amount)
        })
        console.log(this.dataList)
        return true
      } else {
        return false
      }
    },
    match(index) {
      let Date = this.$store.state.approval
      Date.endDate = this.dateToday()
      switch (index) {
        case 0:
          Date.beginDate = this.dateToday()
          break
        case 1:
          Date.beginDate = this.dateWeek()
          break
        case 2:
          Date.beginDate = this.dateMonth()
          break
        case 3:
          Date.beginDate = this.dateSeason()
          break
        case 4:
          Date.beginDate = this.dateYear()
          break
        default:
          Date.beginDate = this.dateToday()
      }
      this.$store.commit('setApproval', Date)
    },
    conversionRate(index) {
      switch (index) {
        case 0:
          return this.dateMonth()
        case 1:
          return this.dateMonth()
        case 2:
          return this.dateMonth()
        case 3:
          return this.dateSeason()
        case 4:
          return this.dateYear()
      }
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
      let oldYear = parseInt(this.$store.state.serverTime.split(',')[0])
      let oldMonth = parseInt(this.$store.state.serverTime.split(',')[1])
      let oldDay = parseInt(this.$store.state.serverTime.split(',')[2])
      let date = new Date(oldYear, oldMonth, oldDay)
      let days = (date.getDay() + 6) % 7
      date.setDate(date.getDate() - days)
      let today = date.getDate()
      let month = date.getMonth() + 1
      today = today.toString().length === 1 ? '0' + today.toString() : today.toString()
      month = month.toString().length === 1 ? '0' + month.toString() : month.toString()
      return date.getFullYear() + '-' + month + '-' + today
    },
    dateMonth() {
      let oldYear = parseInt(this.$store.state.serverTime.split(',')[0])
      let oldMonth = parseInt(this.$store.state.serverTime.split(',')[1])
      let oldDay = parseInt(this.$store.state.serverTime.split(',')[2])
      let date = new Date(oldYear, oldMonth, oldDay)
      let month = date.getMonth() + 1
      month = month.toString().length === 1 ? '0' + month.toString() : month.toString()
      return date.getFullYear() + '-' + month + '-01'
    },
    dateSeason() {
      let oldYear = parseInt(this.$store.state.serverTime.split(',')[0])
      let oldMonth = parseInt(this.$store.state.serverTime.split(',')[1])
      let oldDay = parseInt(this.$store.state.serverTime.split(',')[2])
      let date = new Date(oldYear, oldMonth, oldDay)
      let month = parseInt(date.getMonth() / 3) * 3 + 1
      month = month.toString().length === 1 ? '0' + month.toString() : month.toString()
      return date.getFullYear() + '-' + month + '-01'
    },
    dateYear() {
      let oldYear = parseInt(this.$store.state.serverTime.split(',')[0])
      let oldMonth = parseInt(this.$store.state.serverTime.split(',')[1])
      let oldDay = parseInt(this.$store.state.serverTime.split(',')[2])
      let date = new Date(oldYear, oldMonth, oldDay)
      return date.getFullYear() + '-01-01'
    }
  },
  computed: {
    showanalysizeList() {
      return this.analysizeList[this.$store.state.type.statusIndex].name
    },
    showanalysizeListIndex() {
      return this.analysizeList[this.$store.state.type.statusIndex].index
    },
    showdateList() {
      return this.dateList[this.$store.state.approval.dateIndex].name
    }
  },
  created: function() {
    this.getDataList()
  }
}
</script>
<style scoped>
	.team-manage {
		width: 100%;
		height: 100%;
		background: #EAEFF3;
	}
	.top-title {
		width: 100%;
		height: 50px;
		position: fixed;
		top: 0;
		background: #EAEFF3;
		padding: 10px 0;
	}
	.top-title div {
		float: left;
	}
	.interval {
		width: 2.5%;
		height: 30px;
	}
	.select {
		width: 30%;
		height: 30px;
		background-image: linear-gradient(-180deg, #FFFFFF 0%, #EFF4F7 100%);
		border: 1px solid #B9C7D2;
		border-radius: 2.93px;
	}
	.select p {
		width: 100%;
		height: 20px;
		margin: 5px 0;
		font-size: 14px;
		color: #333333;
		background: url(../../assets/arrow-down-gray.png) no-repeat center;
		background-size: 8px 4px;
		background-position: 85.42% 9px;
		padding: 0 20px 0 10px;
		overflow: hidden;
    	text-overflow: ellipsis;
    	white-space: nowrap;
	}
	.time-list {
		position: fixed;
		width: 29%;
		height: 150px;
		background-image: linear-gradient(-180deg, #FFFFFF 0%, #EFF4F7 100%);
		z-index: 2;
		left: 35.5%;
    	top: 7.3%;
    	border: 1px solid #B9C7D2;
		border-radius: 2.93px;
	}
	.time-list .analysize-item {
		height: 30px;
		font-size: 14px;
		color: #333333;
		line-height: 20px;
		padding: 5px 0;
	}
	.time-list .analysize-item:hover {
		background-image: linear-gradient(-180deg, #FFFFFF 0%, #EFF5F7 100%);
	}
	.analysize-list {
		position: fixed;
		width: 29%;
		height: 120px;
		background-image: linear-gradient(-180deg, #FFFFFF 0%, #EFF4F7 100%);
		z-index: 2;
		left: 68%;
    	top: 7.3%;
    	border: 1px solid #B9C7D2;
		border-radius: 2.93px;
	}
	.analysize-list .analysize-item {
		height: 30px;
		font-size: 14px;
		color: #333333;
		line-height: 20px;
		padding: 5px 0;
	}
	.analysize-list .analysize-item:hover {
		background-image: linear-gradient(-180deg, #FFFFFF 0%, #EFF5F7 100%);
	}
	.total-number {
		width: 100%;
		background: #FFFFFF;
		height: 180px;
		position: fixed;
		top: 50px;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
	}
	.block {
		height: 47.9%;
	}
	.total-people {
		width: calc(46.2% + 1px);
		border-right: 1px solid #EAEFF3;
		border-bottom: 1px solid #EAEFF3;
		align-self: flex-end;
	}
	.total-conversion {
		width: 46.2%;
		border-bottom: 1px solid #EAEFF3;
		align-self: flex-end;
	}
	.total-sleeve {
		width: 46.2%;
		align-self: flex-start;
	}
	.total-amount {
		width: calc(46.2% + 1px);
		border-left: 1px solid #EAEFF3;
		align-self: flex-start;
	}
	.block p{
		height: 100%;
	}
	.block p span {
		display: block;
		width: 100%;
	}
	.num  {
		color: #3CBAFF
	}
	.text {
		font-size: 12px;
		color: #98A1A8;
		height: 17px;
		line-height: 17px;
	}
	.people, .sleeve {
		height: 42px;
		margin: 14px 0 4px;
		font-size: 30px;
		line-height: 42px;
	}
	.conversion {
		height: 37px;
		margin: 16px 0 7px;
		font-size: 26px;
		line-height: 37px;
	}
	.amount {
		height: 33px;
		margin: 19px 0 8px;
		font-size: 24px;
		line-height: 33px;
	}
	.teams {
		width: 100%;
		background: #FFFFFF;
		height: calc(100% - 238px);
		position: fixed;
		top: 238px;
	}
	.teams-title {
		width: 100%;
		height: 30px;
		border-bottom: 2px solid #EAEFF3;
	}
	.teams-title span {
		display: inline-block;
		float: left;
	}
	.teams-title .order {
		font-size: 14px;
		line-height: 20px;
		color: #7A797B;
		margin: 5px 1.3% 5px 3.8%;
	}
	.teams-title .order-icon {
		width: 14px;
		height: 14px;
		margin: 8px 0;
		background: url(../../assets/manage-sort.png) no-repeat center;
		background-size: 100%;
	}
	.teams-content {
		width: 100%;
		height: calc(100% - 30px);
		overflow: scroll;
	}
	.teams-content .team {
		width: 96.3%;
		height: 60px;
		padding: 8px 3.7% 8px 0;;
		float: right;
		border-bottom: 1px solid #EAEFF3;
		/*background: url(../../assets/arrow-right.png) no-repeat center;
		background-size: 6px 12px;
		background-position: 96.2% 24px;*/
	}
	.team .team-name {
		width: 40%;
		float: left;
		margin: 11px 0;
		font-size: 16px;
		color: #030303;
		height: 22px;
		line-height: 22px;
		text-align: left;
		white-space: nowrap;
    	overflow: hidden;
    	text-overflow: ellipsis;
	}
	.team .team-case {
		float: right;
		height: 44px;
		width: 60%;
	}
	.team-case p {
		width: 100%;
		height: 20px;
		text-align: right;
		font-size: 14px;
		line-height: 20px;
		white-space: nowrap;
    	overflow: hidden;
    	text-overflow: ellipsis;
	}
	.team-case p span:first-child {
		color:  #7A797B;
	}
	.team-case p span:last-child {
		color:  #3CBAFF;
	}
</style>
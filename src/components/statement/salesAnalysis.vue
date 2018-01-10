<template>
	<div class="sales-analysize">
		<div class="top-title">
			<div class="interval"></div>
			<div class="select" @click="selectProject">
				<p>{{project.name}}</p>
			</div>
			<div class="interval"></div>
			<div class="select" @click="selectTime">
				<p>{{showdateList}}</p>
			</div>
			<div class="interval"></div>
			<div class="select" @click="showanalysize">
				<p>{{showanalysizeList}}</p>
			</div>
			<div class="interval"></div>
			<clear></clear>
		</div>
		<div class="analysize-list" v-if="listshown">
			<div class="analysize-item" v-for="(analysize,index) in analysizeList" :key="analysize.id" @click="chooseList(index)">
				<p><span>{{analysize.name}}</span></p>
			</div>
		</div>
		<div class="forms">
			<div class="father forms-head">
				<div class="back head-project">
					<p>项目</p>
				</div>
				<div class="back head-subscribe">
					<p>认购</p>
				</div>
				<div class="back head-signing">
					<p>签约</p>
				</div>
				<div class="back head-payback">
					<p>回款</p>
				</div>
				<clear></clear>
			</div>
			<div class="xunhuan">
				<div class="father total" v-for="(item, index) in dataList">
					<div class="first project">
						<p>{{dataList[index].vname}}</p>
					</div>
					<div class="first subscribe">
						<p>{{dataList[index].subsc}}</p>
					</div>
					<div class="first signing">
						<p>{{dataList[index].sign}}</p>
					</div>
					<div class="first payback">
						<p>{{dataList[index].gathering}}</p>
					</div>
					<clear></clear>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import clear from '@/components/clear'
import {saleAnalysize} from '@/api/getData'
export default {
  name: 'salesAnalysis',
  data() {
    return {
      listshown: false,
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
        name: '金额(万元)',
        index: 0
      }, {
        name: '套数(套)',
        index: 1
      }, {
        name: '面积(㎡)',
        index: 2
      }],
      project: this.$store.state.statementProject,
      methods: '',
      projectId: '',
      type: 'salesAnalysis',
      dataList: []
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
      this.$router.push({path: '/statement/selectTime'})
    },
    showanalysize() {
      this.listshown = !this.listshown
    },
    chooseList(index) {
      let typeList = this.$store.state.type
      typeList.statusIndex = index
      this.$store.commit('setTypeInfo', typeList)
      this.listshown = !this.listshown
      this.dataList = []
      this.callInterface()
    },
    async callInterface() {
      if (this.project.pk_project === '') {
        this.methods = 'allproject'
        this.projectId = this.project.pk_project
      } else {
        this.methods = 'project'
        this.projectId = this.project.pk_project
      }
      await this.getSaleAnalysize(this.methods, this.projectId)
    },
    async getSaleAnalysize(methods, projectId) {
      if (methods === 'allproject') {
        this.$dialog.loading.open('很快加载好了')
      }
      let params = {
        method: methods,
        pk_project: projectId,
        begin_date: this.$store.state.approval.beginDate,
        end_date: this.$store.state.approval.endDate,
        analyzetype: this.showanalysizeListIndex,
        pk_user: this.$store.state.userInfo.user_id
      }
      let res = await saleAnalysize(params)
      this.$dialog.loading.close()
      if (res.data.flag === '0') {
        this.dataList = res.data.data
        return true
      } else {
        this.dataList = []
        return false
      }
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
    this.callInterface()
  }
}
</script>
<style scoped>
	.sales-analysize {
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
	.analysize-list {
		position: fixed;
		width: 29%;
		height: 90px;
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
	.forms {
		width: 100%;
		height: calc(100% - 50px);
		padding: 50px 0 0 0;
	}
	.father {
		width: 100%;
		height: 42px;
	}
	.forms-head {
		background-image: linear-gradient(-180deg, #FCFDFE 0%, #F8FBFC 100%);
		position: fixed;
		top: 50px;
	}
	.xunhuan {
		padding: 42px 0 0 0;
	}
	.back {
		float: left;
		border: 1px solid #EAEFF3;
		height: 100%;
		padding: 9px 0 11px;
		text-align: left;
	}
	.back p {
		font-size: 14px;
		color: #030303;
		line-height: 20px;
	}
	.forms-head .head-project {
		width: 25%;
		text-indent: 12px;
	}
	.forms-head .head-subscribe, .head-signing, .head-payback {
		width: 25%;
		text-indent: 28.9%;
	}
	.total {
		background: #FFFFFF;
	}
	.first {
		float: left;
		border: 1px solid #EAEFF3;
		height: 100%;
		padding: 9px 0 11px;
	}
	.first p {
		font-size: 12px;
		line-height: 20px;
        height: 100%;
		/*height: 20px;
    	overflow: hidden;
    	text-overflow: ellipsis;
    	white-space: nowrap;*/
	}
	.total .project {
		width: 25%;
		text-align: left;
		/*text-indent: 12px;*/
		font-size: 14px;
		color: #030303;
		line-height: 20px;
		padding: 0 0 0 12px;
		display: table;
	}
	.total .project p{
        display: table-cell;
        vertical-align: middle;
	}
	.total .subscribe, .signing, .payback {
		width: 25%;
		color: #3CBAFF;
	}
</style>
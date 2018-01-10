<template>
	<div class="selectTime">
	  <div class="dateselect" v-for="(item,index) in dateList" :key="item.id" @click="chooseLabel(index)">
	  	<div class="date">
	  		<span :class="dateList[index].show">{{item.name}}</span>
	  	</div>
	  </div>
	  <div class="gzb-gray-title">
      	<span>自定义</span>
      </div>
      <div style="background: #FFFFFF; width: 100%;">
      	<div class="gzb-list-item">
          <div class="gzb-list-title">
            <span>{{customList[0].name}}</span>
          </div>
          <div class="gzb-list-detail">
            <yd-datetime type="date" v-model="customList[0].value" slot="right"></yd-datetime>
          </div>
        </div>
        <div class="septal-line"></div>
        <div class="gzb-list-item">
          <div class="gzb-list-title">
            <span>{{customList[1].name}}</span>
          </div>
          <div class="gzb-list-detail">
            <yd-datetime type="date" v-model="customList[1].value" slot="right"></yd-datetime>
          </div>
        </div>
      </div>
      <yd-button class="gzb-submit" size="large" type="hollow" @click.native="submitTime">确定</yd-button>
      <yd-popup v-model="show" position="center" width="80%">
          <p>{{title}}</p>
          <yd-button @click.native="show = false">确认</yd-button>
      </yd-popup>
	</div>
</template>
<script>
  export default {
    name: 'selectTime',
    data() {
      return {
        dateList: [{
          name: '今日',
          value: this.dateToday(),
          show: ''
        }, {
          name: '本周',
          value: this.dateWeek(),
          show: ''
        }, {
          name: '本月',
          value: this.dateMonth(),
          show: ''
        }, {
          name: '本年',
          value: this.dateYear(),
          show: ''
        }],
        customList: [{
          name: '开始时间',
          value: this.dateToday()
        }, {
          name: '结束时间',
          value: this.dateToday()
        }],
        show: false,
        title: ''
      }
    },
    methods: {
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
      dateYear() {
        let oldYear = parseInt(this.$store.state.serverTime.split(',')[0])
        let oldMonth = parseInt(this.$store.state.serverTime.split(',')[1])
        let oldDay = parseInt(this.$store.state.serverTime.split(',')[2])
        let date = new Date(oldYear, oldMonth, oldDay)
        return date.getFullYear() + '-01-01'
      },
      colorselect() {
        for (let i = 0; i < this.dateList.length; i++) {
          if (i === this.$store.state.approval.dateIndex) {
            this.dateList[i].show = 'colorselect'
          } else {
            this.dateList[i].show = ''
          }
        }
      },
      timeShow() {
        if (this.$store.state.approval.dateIndex === 4) {
          this.customList[0].value = this.$store.state.approval.beginDate
          this.customList[1].value = this.$store.state.approval.endDate
        }
      },
      chooseLabel(index) {
        let approval = this.$store.state.approval
        approval.beginDate = this.dateList[index].value
        approval.endDate = this.dateToday()
        approval.dateIndex = index
        this.$store.commit('setApproval', approval)
        this.$router.go(-1)
      },
      submitTime() {
        if (this.customList[0].value > this.customList[1].value) {
          this.show = true
          this.title = '自定义时间不正确，请重新选择！'
        } else {
          let approval = this.$store.state.approval
          approval.beginDate = this.customList[0].value
          approval.endDate = this.customList[1].value
          approval.dateIndex = 4
          this.$store.commit('setApproval', approval)
          this.$router.go(-1)
        }
      }
    },
    created: function() {
      this.colorselect()
      this.timeShow()
    }
  }
</script>
<style scoped>
	.selectTime {
		background-color: #EAEFF3;
    	text-align: left;
	}
	.dateselect {
		width: 100%;
		height: 44px;
		background: #FFFFFF;
		padding: 14px 0 0 3.8%;
		font-size: 14px;
		color: #030303;
		line-height: 16px;
	}
	.date {
		width: 100%;
		height: 100%;
		border-bottom: 1px solid #EAEFF3;
	}
	.colorselect {
		color: #3CBAFF;
	}
	.gzb-gray-title {
    	line-height: 30px;
    	padding: 6px 3.8%;
	}
	.gzb-list-item {
    	padding: 0 3.8%;
    	line-height: 44px;
    	height: 44px;
    	position: relative;
    	display: flex;
   		vertical-align: middle;
    	overflow: hidden;
    	align-items: center;
    	background-color: #fff;
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
	.septal-line {
		width: 96.3%;
		height: 0;
	    border-bottom: 1px solid #EBEFF3;
	    float: right;
	}
	.yd-popup-content p {
        text-align: center;
        margin: 20px 7px;
    	font-size: 16px;
    	height: 30px;
  	}
  	.yd-popup-content button {
    	background-color: rgb(97, 184, 249);
    	color: rgb(255, 255, 255);
    	width: 33%;
    	margin: 0 30% 20px;
  	}
</style>
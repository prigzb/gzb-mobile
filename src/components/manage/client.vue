<template>
	<div>
	  <div class="top-title">
	    <div class="all-types">
	      <p class="text-icon left" @click="showList">
	      	<span class="text" v-model="showstatusCode">{{showstatus}}</span>
	      	<span class="icon"></span>
	      </p>
	    </div>
	    <div class="focus-on">
	      <p class="text-icon left" @click="showAttention">
	      	<span class="text" v-model="showattentionCode">{{showattention}}</span>
	      	<span class="icon"></span>
	      </p>
	    </div>
	    <div class="all-levels">
	      <p class="text-icon right" @click="showGrade">
	        <span class="text" v-model="showgradesCode">{{showgrades}}</span>
	        <span class="icon"></span>
	      </p>
	    </div>
	    <div class="add-client" @click="addClient">
	    	<span class="add-icon"></span>
	    </div>
	    <clear></clear>
	  </div>
	  <div class="gzb-status-list" v-if="listshown">
        <div class="gzb-status-item" v-for="(status,index) in statusList" :key="status.id" @click="chooseListone(index)">
          <span>{{status.name}}</span>
        </div>
      </div>
      <div class="gzb-attention-list" v-if="attentionshown">
      	<div class="gzb-status-item" v-for="(attention,index) in attentionList" :key="attention.id" @click="chooseListtwo(index)" >
          <span>{{attention.showname}}</span>
        </div>
      </div>
      <div class="gzb-grades-list" v-if="gradeshown">
      	<div class="gzb-status-item" v-for="(grades,index) in gradesList" :key="grades.id" @click="chooseListthree(index)" >
          <span>{{grades.name}}</span>
        </div>
      </div>
	  <div class="search-box-bg" @click="canclePullDown">
	  	<div class="search-box">
	  	  <span class="search-icon"></span>
	  	  <input v-model="keywords" placeholder="客户姓名、电话后四位、置业顾问姓名">
	  	</div>
	  </div>
	  <div style="padding-top: 84px;padding-bottom: 44px;">
	  <div class="client-info" :class="{ bg: ishide }" @click="canclePullDown">
	  	<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" distance="50">
	    <clientInfo slot="list" v-for="(item, index) in clientList" ref="election"  @newNodeEvent="cancel" :pkmkey="clientList[index].apk_customer" :bpkmkey="clientList[index].bpkmkey"  :name="clientList[index].avcname" :level="clientList[index].acuslevel" :fcustype="clientList[index].afcustype" :vpreferredtel="clientList[index].avpreferredtel" :fproceedingtype="clientList[index].afproceedingtype" :dproceedingts="clientList[index].addate" :id="clientList[index].apk_customer" :showcheck="showcheck" :psnname="clientList[index].psnname" :isgrade="clientList[index].sgrade" :overDue="clientList[index].aoverDue" :isOverDue="clientList[index].isOverDue" :pk_psndoc="clientList[index].apk_psndoc" :psnbasdoc="clientList[index].apsnbasdoc" :index="clientList.indexOf(clientList[index])"></clientInfo>
	    <span slot="doneTip">没有客户了~~</span>
		<img slot="loadingTip" src="../../assets/loading.gif"/>
	    </yd-infinitescroll>
	  </div>
	  </div>
        <div class="client-allot" v-if="showcheck" @click="canclePullDown">
            <div class="allot-left">
            	<div class="septal-linef"></div>
            	<p class="general-election">
            		<input v-model="check" type="checkbox" name="customer" id="general-election" class="check" @click="selectAll">
            		<label for="general-election" class="general"><span class="input"></span>全选</label>
            		<span class="total">共计：<span class="number">{{size}}</span>人</span>
            	</p>
            </div>
            <div class="allot-btn" @click="allotment"><div class="septal-lines"></div>分配</div>
        </div>
	  <commonFooter></commonFooter>
	  <yd-popup v-model="show" position="center" width="80%">
          <p>{{title}}</p>
          <yd-button @click.native="show = false">确认</yd-button>
      </yd-popup>
	</div>
</template>
<script>
import clientInfo from '@/components/manage/clientInfo'
import commonFooter from '@/components/manage/commonFooter'
import clear from '@/components/clear'
import {manageGetCustomerList} from '@/api/getData'
import {XuntongJSBridge} from '@/js/qingjs'
  export default {
    name: 'client',
    data() {
      return {
          show: false,
          listshown: false,
          attentionshown: false,
          gradeshown: false,
          showcheck: false,
          statusList: [{
            name: '全部类型',
            code: ''
          }, {
            name: '意向',
            code: '0'
          }, {
            name: '预订',
            code: '1'
          }, {
            name: '认购',
            code: '2'
          }, {
            name: '签约',
            code: '3'
          }, {
            name: '潜在',
            code: '4'
          }],
          attentionList: [{
            name: '是否逾期',
            showname: '全部',
            code: '0'
          }, {
            name: '逾期',
            showname: '逾期',
            code: '1'
          }, {
            name: '未逾期',
            showname: '未逾期',
            code: '2'
          }],
          gradesList: [{
            name: '全部级别',
            code: ''
          }, {
            name: 'A',
            code: '0001Y910000000057L4B'
          }, {
            name: 'B',
            code: '0001Y910000000057L4C'
          }, {
            name: 'C',
            code: '0001Y910000000057L4D'
          }, {
            name: 'D',
            code: '0001Y910000000057L4E'
          }, {
            name: 'E',
            code: '0001Y910000000057L4F'
          }],
          clientList: [],
        followList: [{
          name: '来电',
          type: 0,
          code: 'call'
        }, {
          name: '来访',
          type: 1,
          code: 'come-visit'
        }, {
          name: '去电',
          type: 2,
          code: 'go-call'
        }, {
          name: '去访',
          type: 3,
          code: 'go-visit'
        }, {
          name: '短信',
          type: 4,
          code: 'note'
        }, {
          name: 'Email',
          type: 5,
          code: 'e-mail'
        }],
        keywords: '',
        page_no: 1,
        overDate: {},
        check: false,
        title: '',
        ishide: false
      }
    },
    watch: {
      keywords: function (newKeywords) {
//      console.log(this.keywords)
        this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
        this.page_no = 1
        this.getClientList()
      },
      database: function (newDatabase) {
        this.openLoading()
      }
    },
    components: {
      clientInfo, commonFooter, clear
    },
    methods: {
      chooseListone(index) {
        let typeList = this.$store.state.type
        typeList.statusIndex = index
        typeList.code = this.statusList[index].code
        this.$store.commit('setTypeInfo', typeList)
        this.clientList = []
        this.page_no = 1
        this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
        this.getClientList()
        this.listshown = !this.listshown
      },
      chooseListtwo(index) {
        let attentionList = this.$store.state.attention
        attentionList.statusIndex = index
        attentionList.code = this.attentionList[index].code
        this.$store.commit('setAttentionInfo', attentionList)
        this.clientList = []
        this.page_no = 1
        this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
        this.getClientList()
        this.attentionshown = !this.attentionshown
      },
      chooseListthree(index) {
        let gradesList = this.$store.state.grade
        gradesList.statusIndex = index
        gradesList.code = this.gradesList[index].code
        this.$store.commit('setGradesInfo', gradesList)
        this.clientList = []
        this.page_no = 1
        this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
        this.getClientList()
        this.gradeshown = !this.gradeshown
      },
      showList() {
        this.listshown = !this.listshown
        this.attentionshown = false
        this.gradeshown = false
        /* if (this.attentionshown === true || this.gradeshown === true) {
          if (this.attentionshown === true && this.gradeshown === true) {
            this.attentionshown = !this.attentionshown
            this.gradeshown = !this.gradeshown
            this.listshown = !this.listshown
          } else if (this.attentionshown === true && this.gradeshown === false) {
            this.attentionshown = !this.attentionshown
            this.listshown = !this.listshown
          } else {
            this.gradeshown = !this.gradeshown
            this.listshown = !this.listshown
          }
        } else {
          this.listshown = !this.listshown
        } */
      },
      showAttention() {
        this.listshown = false
        this.attentionshown = !this.attentionshown
        this.gradeshown = false
        /* if (this.listshown === true || this.gradeshown === true) {
          if (this.listshown === true && this.gradeshown === true) {
            this.listshown = !this.listshown
            this.gradeshown = !this.gradeshown
            this.attentionshown = !this.attentionshown
          } else if (this.listshown === true && this.gradeshown === false) {
            this.listshown = !this.listshown
            this.attentionshown = !this.attentionshown
          } else {
            this.gradeshown = !this.gradeshown
            this.attentionshown = !this.attentionshown
          }
        } else {
          this.attentionshown = !this.attentionshown
        } */
      },
      showGrade() {
        this.listshown = false
        this.attentionshown = false
        this.gradeshown = !this.gradeshown
        /* if (this.listshown === true || this.attentionshown === true) {
          if (this.listshown === true && this.attentionshown === true) {
            this.listshown = !this.listshown
            this.attentionshown = !this.attentionshown
            this.gradeshown = !this.gradeshown
          } else if (this.listshown === true && this.attentionshown === false) {
            this.listshown = !this.listshown
            this.gradeshown = !this.gradeshown
          } else {
            this.attentionshown = !this.attentionshown
            this.gradeshown = !this.gradeshown
          }
        } else {
          this.gradeshown = !this.gradeshown
        } */
      },
      async getClientList() {
        this.$dialog.loading.open('很快加载好了')
        let params = {
          method: 'getCustomerList',
          pk_project: this.$store.state.manageProject.pk_project,
          pk_psndoc: this.$store.state.userInfo.pk_psndoc,
          fright: this.$store.state.manageProject.fright,
          keywords: this.keywords,
          isAfter: this.showattentionCode,
          page_no: this.page_no,
          page_size: '20'
        }
        if (this.showgradesCode !== '') params.pk_cuslevel = this.showgradesCode
        if (this.showstatusCode !== '') params.fcustype = this.showstatusCode
        let res = await manageGetCustomerList(params)
        this.$dialog.loading.close()
        if (this.page_no === 1) {
          this.clientList = []
        }
        if (res.data.flag === '0') {
//        console.log('请求成功！')
//        this.database = res.data.desc
          this.clientList = [...this.clientList, ...res.data.data]
          if (this.clientList.length === 0) {
            this.ishide = true
          } else {
            this.ishide = false
            if (res.data.data.length === 0) {
              this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
            }
          }
          for (let i = 0; i < this.clientList.length; i++) {
            this.clientList[i].avcname = this.clientList[i].vcname
            this.clientList[i].acuslevel = this.pkCuslevel(this.clientList[i].pk_cuslevel)
            // console.log(this.clientList[i].acuslevel)
            if (this.clientList[i].acuslevel === ' ') {
              this.clientList[i].sgrade = false
            } else {
              this.clientList[i].sgrade = true
            }
            // console.log(this.clientList[i].sgrade)
            this.clientList[i].afcustype = this.fcusType(this.clientList[i].fcustype)
            this.clientList[i].avpreferredtel = this.format(this.clientList[i].vpreferredtel)
            this.clientList[i].afproceedingtype = this.typeConversion(this.clientList[i].fproceedingtype)
            this.clientList[i].addate = this.clientList[i].dproceedingdate
            this.clientList[i].acomparedate = this.clientList[i].comparedate
            this.clientList[i].apk_customer = this.clientList[i].pk_customer
            this.clientList[i].aoverduedays = this.clientList[i].overduedays
            if (this.clientList[i].afcustype === '预订' || this.clientList[i].afcustype === '认购' || this.clientList[i].afcustype === '签约') {
              this.clientList[i].aoverDue = this.overDue(this.clientList[i].acomparedate, 0)
              if (this.clientList[i].aoverDue <= 0) {
                this.clientList[i].isOverDue = false
              } else {
                this.clientList[i].isOverDue = true
              }
            } else {
              this.clientList[i].aoverDue = this.overDue(this.clientList[i].addate, this.clientList[i].aoverduedays)
              if (this.clientList[i].aoverDue <= 0) {
                this.clientList[i].isOverDue = false
              } else {
                this.clientList[i].isOverDue = true
              }
            }
            this.clientList[i].apk_psndoc = this.clientList[i].pk_psndoc
            this.clientList[i].apsnbasdoc = this.clientList[i].pk_psnbasdoc
          }
          console.log(this.clientList)
//        console.log(res)
          return true
        } else if (this.page_no === 1) {
          this.clientList = []
          this.ishide = true
          return false
        } else {
          this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
        }
      },
      pkCuslevel(data) {
        let level = ''
        switch (data) {
          case '0001Y910000000057L4B':
            level = 'A'
            break
          case '0001Y910000000057L4C':
            level = 'B'
            break
          case '0001Y910000000057L4D':
            level = 'C'
            break
          case '0001Y910000000057L4E':
            level = 'D'
            break
          case '0001Y910000000057L4F':
            level = 'E'
            break
          default:
            level = ' '
            break
        }
        return level
      },
      fcusType(data) {
        switch (data) {
          case 0:
            data = '意向'
            break
          case 1:
            data = '预订'
            break
          case 2:
            data = '认购'
            break
          case 3:
            data = '签约'
            break
          case 4:
            data = '潜在'
            break
          case 5:
            data = '无效'
            break
        }
        return data
      },
      typeConversion(type) {
        switch (type) {
          case 0:
            return this.followList[0].name
          case 1:
            return this.followList[1].name
          case 2:
            return this.followList[2].name
          case 3:
            return this.followList[3].name
          case 4:
            return this.followList[4].name
          case 5:
            return this.followList[5].name
        }
      },
      format(data) {
        if (data === null) {
          return data
        } else {
          let test2 = data.replace(/(\d{3})(\d{4})(\d{4})/g, '$1****$3')
          return test2
        }
      },
      async loadList() {
        this.page_no++
        let result = await this.getClientList()
        if (result) {
          this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
        }
      },
      addClient() {
        this.listshown = false
        this.attentionshown = false
        this.gradeshown = false
        this.showcheck = !this.showcheck
        this.check = false
        for (let i = 0; i < this.$refs.election.length; i++) {
          this.$refs.election[i].pick = false
        }
        let clear = this.$store.state.distributionList
        clear.clear()
        this.$store.commit('setListone', clear)
      },
      canclePullDown() {
        this.listshown = false
        this.attentionshown = false
        this.gradeshown = false
      },
      selectAll() {
        let android = XuntongJSBridge.getOS()
        if (android === 'android') {
          if (this.check) {
            for (let i = 0; i < this.$refs.election.length; i++) {
              this.$refs.election[i].pick = false
            }
          } else {
            for (let i = 0; i < this.$refs.election.length; i++) {
              this.$refs.election[i].pick = true
            }
          }
        } else if (android === 'Qing') {
          if (this.check) {
            for (let i = 0; i < this.$refs.election.length; i++) {
              this.$refs.election[i].pick = false
            }
          } else {
            for (let i = 0; i < this.$refs.election.length; i++) {
              this.$refs.election[i].pick = true
            }
          }
        } else {
          if (this.check) {
            for (let i = 0; i < this.$refs.election.length; i++) {
              this.$refs.election[i].pick = true
            }
          } else {
            for (let i = 0; i < this.$refs.election.length; i++) {
              this.$refs.election[i].pick = false
            }
          }
        }
      },
      cancel() {
        this.check = false
      },
      allotment() {
        if (this.$store.state.listSize === 0) {
          this.show = true
          this.title = '请选择客户'
          return
        } else {
          this.$router.push({path: '/manage/counsellor'})
        }
      },
      overDue(dataone, datatwo) {
        if (dataone === null) {
          return -1
        } else {
          let date1 = new Date()
          let date2 = new Date()
          // console.log(dataone)
          dataone = dataone.split('-')
          // console.log(dataone)
          date1.setFullYear(dataone[0])
          date1.setMonth(dataone[1] - 1)
          date1.setDate(dataone[2])
          // console.log(date1)
          let dataa = date2.getTime() - date1.getTime()
          let datab = dataa / (1000 * 60 * 60 * 24) - datatwo
          // console.log(datab)
          let a = Math.floor(datab)
          return a
        }
      }
    },
    computed: {
        showstatus() {
          return this.statusList[this.$store.state.type.statusIndex].name
        },
        showstatusCode() {
          return this.statusList[this.$store.state.type.statusIndex].code
        },
        showattention() {
          return this.attentionList[this.$store.state.attention.statusIndex].name
        },
        showattentionCode() {
          return this.attentionList[this.$store.state.attention.statusIndex].code
        },
        showgrades() {
          return this.gradesList[this.$store.state.grade.statusIndex].name
        },
        showgradesCode() {
          return this.gradesList[this.$store.state.grade.statusIndex].code
        },
        list() {
          return this.$store.state.customerList
        },
        blist() {
            return this.$store.state.customerList2
        },
        size() {
          return this.$store.state.listSize
        }
    },
    created: function() {
      this.getClientList()
      this.$store.commit('setListone', new Map())
    }
  }
</script>
<style scoped>
    .client-allot {
        position: fixed;
        z-index: 3;
        width: 100%;
        height: 45px;
        bottom: 0;
        background: #FFFFFF;
    }
    .allot-left {
        width: 75%;
        float: left;
        height: 44px;
        line-height: 44px;
        font-size: 14px;
    }
    .septal-linef {
  	    height: 0;
  	    border-bottom: 1px solid #EAEFF3;
	}
	.septal-lines {
  	    height: 0;
  	    border-bottom: 1px solid #3CBAFF;
	}
    .allot-left .general-election {
    	height: 20px;
    	margin: 12px;
    }
    .allot-left .general-election .check {
        width: 14px;
        height: 14px;
        margin: 3px 0;
        float: left;
        border: 1px solid #B9C7D2;
        border-radius: 2px;
        opacity: 0;
    }
    .check:checked + .general .input {
    	border: 1px solid #3CBAFF;
    	background: url(../../assets/checkbox.png) no-repeat center;
    	background-size: 100%;
    }
    .allot-left .general-election .input {
    	display: inline-block;
        width: 14px;
        height: 14px;
        margin: 3px 12px 0 0;
        float: left;
        border: 1px solid #B9C7D2;
        border-radius: 2px;
    }
    .allot-left .general-election .general {
    	display: inline-block;
    	width: 54px;
    	height: 20px;
    	margin: 0 -15px;
    	font-size: 14px;
    	color: #7A797B;
    	line-height: 20px;
    	float: left;
    }
    .allot-left .general-election .total {
    	display: inline-block;
    	height: 20px;
    	line-height: 20px;
    	font-size: 14px;
    	color: #030303;
    	float: right;
    }
    .allot-left .general-election .number {
    	color: #3CBAFF;
    	margin: 0 3px 0 5px;
    }
    .allot-btn {
        width: 25%;
        float: right;
        background: #3CBAFF;
        font-size: 16px;
        line-height: 44px;
        color: #FFFFFF;
    }
	.top-title {
		width: 100%;
		height: 40px;
		background: #FFFFFF;
		position: fixed;
		top: 0;
	}
	.top-title .all-types {
		width: 29.1%;
		height: 100%;
		float: left;
	}
	.top-title .focus-on {
		width: 29.1%;
		height: 100%;
		float: left;
	}
	.top-title .all-levels {
		width: 29.3%;
		height: 100%;
		float: left;
		border-right: 2px solid #EAEFF3;
	}
	.text-icon {
		height: 15px;
		margin: 12px 0 13px 0;
		font-size: 15px;
		color: #3CBAFF;
		line-height: 15px;
	}
	.text-icon span {
		display: inline-block;
	}
	.text {
		width: 60px;
		height: 15px;
		margin: 0 6.45% 0 10.75%;
		float: left;
	}
	.icon {
		width: 8px;
		height: 4px;
		margin: 7px 0 4px;
		float: left;
		background: url(../../assets/arrow-down-blue.png) no-repeat center;
		background-size: 100%;
	}
	.top-title .add-client {
		width: 12.5%;
		height: 100%;
		float: left;
	}
	.top-title .add-client .add-icon {
		display: block;
		width: 20px;
		height: 20px;
		margin: 10px auto;
		background: url(../../assets/allot.png) no-repeat center;
		background-size: 100%;
	}
	.search-box-bg {
		width: 100%;
		background: #EAEFF3;
		position: fixed;
		top: 40px;
	}
	.search-box-bg .search-box {
		width: 93.1%;
		height: 28px;
		margin: 8px 3.1% 8px 3.8%;
		background: #FFFFFF;
		border-radius: 100px;
	}
	.search-box-bg .search-box .search-icon {
		display: inline-block;
		width: 14px;
		height: 14px;
		margin: 7px 0 7px 15.1%;
		float: left;
		background: url(../../assets/search-icon.png) no-repeat center;
		background-size: 100%;
	}
	.search-box-bg .search-box input {
		float: left;
		width: 68.4%;
		height: 17px;
		margin: 4.5px 0 6.5px 3%;
		font-size: 13px;
		color: #98A1A8;
		letter-spacing: -0.14px;
		line-height: 17px;
	}
	.client-info {
		/* margin-top: 84px; */
	}
	.bg {
		height: 400px;
		background: url(../../assets/no-content.png) no-repeat center;
		background-size: 100%;
	}
	.gzb-status-list {
    	position: fixed;
    	left: 10px;
    	top: 31px;
    	width: 37.5%;
    	height: 264px;
    	background: url('../../assets/status-box.png') no-repeat center center;
    	background-size: 100% 264px;
    	z-index: 2;
    }
    .gzb-attention-list {
    	position: fixed;
    	left: 30.1%;
    	top: 31px;
    	width: 37.5%;
    	height: 132px;
    	background: url('../../assets/status-box.png') no-repeat center center;
    	background-size: 100% 132px;
    	z-index: 2;
    }
    .gzb-grades-list {
    	position: fixed;
    	left: 59.2%;
    	top: 31px;
    	width: 37.5%;
    	height: 264px;
    	background: url('../../assets/status-box.png') no-repeat center center;
    	background-size: 100% 264px;
    	z-index: 2;
    }
	.gzb-status-item {
    	margin: 0px 12px;
    	padding: 5px 0px;
    	border-bottom: 1px solid #EAEFF3;
    	line-height: 31px;
    	font-size: 13px;
	}
	.gzb-status-item:first-child {
    	margin: 8px 12px 0px 12px;
	}
	.gzb-status-item:last-child {
    	border-bottom: 0px;
	}
	.yd-popup-content p {
        text-align: center;
        margin: 20px 7px;
    	font-size: 16px;
  	}
  	.yd-popup-content button {
    	background-color: rgb(97, 184, 249);
    	color: rgb(255, 255, 255);
    	width: 33%;
    	margin-bottom: 20px;
  	}
</style>

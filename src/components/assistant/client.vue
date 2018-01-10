<template>
	<div style="height: 100%;">
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
	  	  <input v-model="keywords" placeholder="搜索 姓名、电话">
	  	</div>
	  </div>
	  <div style="padding-top: 84px;padding-bottom: 44px;">
	  <div class="client-info" :class="{ bg: ishide }" @click="canclePullDown">
	  	<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" distance="50">
	    <clientInfo slot="list" v-for="(item, index) in clientList" :name="clientList[index].aname" :level="clientList[index].acuslevel" :fcustype="clientList[index].atype" :vpreferredtel="clientList[index].avdtel" :fproceedingtype="clientList[index].aftype" :dproceedingts="clientList[index].adpts" :id="clientList[index].acustomer" :pk_project="clientList[index].aproject" :isgrade="clientList[index].sgrade" :shide="clientList[index].shide" :isphone="isphone" :pk_customerway="clientList[index].acustomerway" :pk_customer_sellor="clientList[index].asellor" :vdef5="clientList[index].vdef5" :vdef10="clientList[index].vdef10" :reserve10="clientList[index].reserve10"></clientInfo>
	    <span slot="doneTip">没有客户了~~</span>
		<img slot="loadingTip" src="../../assets/loading.gif"/>
	    </yd-infinitescroll>
	  </div>
	  </div>
	  <commonFooter></commonFooter>
	</div>
</template>
<script>
import clientInfo from '@/components/assistant/clientInfo'
import commonFooter from '@/components/assistant/commonFooter'
import clear from '@/components/clear'
import {getClientInfoList} from '@/api/getData'
  export default {
    name: 'client',
    data() {
      return {
          listshown: false,
          attentionshown: false,
          gradeshown: false,
          ishide: false,
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
          }, {
            name: '无效',
            code: '5'
          }],
          attentionList: [{
            name: '是否关注',
            showname: '全部',
            code: ''
          }, {
            name: '是',
            showname: '是',
            code: '是'
          }, {
            name: '否',
            showname: '否',
            code: '否'
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
        isphone: this.$store.state.isphone
      }
    },
    watch: {
      keywords: function (newKeywords) {
        this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
        this.page_no = 1
        this.clientList = []
        this.getClientList()
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
        let params = {
          method: 'getList',
          pk_project: this.$store.state.selectedProject.pk_project,
          vincode: this.$store.state.selectedProject.vincode,
          user_id: this.$store.state.userInfo.user_id,
          keywords: this.keywords,
          pk_cuslevel: this.showgradesCode,
          fcustype: this.showstatusCode,
          vdef6: this.showattentionCode,
          page_no: this.page_no,
          page_size: '20'
        }
        let res = await getClientInfoList(params)
        if (res.data.flag === '0') {
          if (res.data.data.length === 0) {
            this.ishide = true
          } else {
            this.ishide = false
          }
          console.log('请求成功！')
          this.clientList = [...this.clientList, ...res.data.data]
          for (let i = 0; i < this.clientList.length; i++) {
            this.clientList[i].aname = this.clientList[i].vcname
            this.clientList[i].acuslevel = this.pkCuslevel(this.clientList[i].pk_cuslevel)
            // console.log(this.clientList[i].acuslevel)
            if (this.clientList[i].acuslevel === '') {
              this.clientList[i].sgrade = false
            } else {
              this.clientList[i].sgrade = true
            }
            // console.log(this.clientList[i].sgrade)
            this.clientList[i].atype = this.fcusType(this.clientList[i].fcustype)
            this.clientList[i].avdtel = this.clientList[i].vpreferredtel
            this.clientList[i].aftype = this.typeConversion(this.clientList[i].fproceedingtype)
            if (this.clientList[i].aftype === ' ') {
              this.clientList[i].shide = false
            } else {
              this.clientList[i].shide = true
            }
            this.clientList[i].adpts = this.clientList[i].dproceedingdate
            this.clientList[i].acustomer = this.clientList[i].pk_customer
            this.clientList[i].aproject = this.clientList[i].pk_project
            this.clientList[i].acustomerway = this.clientList[i].pk_customerway
            this.clientList[i].asellor = this.clientList[i].pk_customer_sellor
          }
          console.log(this.clientList)
          console.log(res)
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
        switch (data) {
          case '0001Y910000000057L4B':
            data = 'A'
            break
          case '0001Y910000000057L4C':
            data = 'B'
            break
          case '0001Y910000000057L4D':
            data = 'C'
            break
          case '0001Y910000000057L4E':
            data = 'D'
            break
          case '0001Y910000000057L4F':
            data = 'E'
            break
          default :
            data = ''
        }
        return data
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
          default:
            data = ' '
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
          default:
            return ' '
        }
      },
      async loadList() {
        this.page_no++
        let result = await this.getClientList()
        if (result) {
          this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
        }
      },
      canclePullDown() {
        this.listshown = false
        this.attentionshown = false
        this.gradeshown = false
      },
      addClient() {
        console.log(this.$route.path)
        console.log(this.$route.name)
        let path = this.$store.state.path
        path = this.$route.path
        this.$store.commit('setPath', path)
        this.$store.commit('emptyPersonal')
        this.$router.push({path: '/assistant/addClientBasic'})
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
        }
    },
    created: function() {
      this.getClientList()
    }
  }
</script>
<style scoped>
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
		background: url(../../assets/new-construction.png) no-repeat center;
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
		margin: 7px 0 7px 29.8%;
		float: left;
		background: url(../../assets/search-icon.png) no-repeat center;
		background-size: 100%;
	}
	.search-box-bg .search-box input {
		float: left;
		width: 31.58%;
		height: 17px;
		margin: 4.5px 0 6.5px 3%;
		font-size: 13px;
		color: #98A1A8;
		letter-spacing: -0.14px;
		line-height: 17px;
	}
	.client-info {
		/*margin-top: 84px;*/
		height: 100%;
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
    	height: 308px;
    	background: url('../../assets/status-box.png') no-repeat center center;
    	background-size: 100% 308px;
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
</style>

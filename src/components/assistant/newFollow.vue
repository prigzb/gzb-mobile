<template>
	<div class="new-follow">
		<div class="top-client">
		    <div class="left-icon">
		        <span class="head-portrait"></span>
		    </div>
		    <div class="middle-mess">
		    	<p class="client-name">
		    		<span>{{vcname}}</span>
		    	</p>
		    	<p class="client-phone">
		    		<span>{{vpreferredtel}}</span>
		    	</p>
		    </div>
		    <div class="right-icon">
		    	<a :href="'tel:'+vpreferredtel" v-if="isphone"><span class="phone-icon"></span></a>
		    </div>
		    <div class="right-icon" @click='getQuestion'>
		    	<span class="question-icon"></span>
		    </div>
		</div>
		<div class="followup-type">
			<p>
				<span class="title">{{followType}}</span>
				<span class="necessary">*</span>
				<span class="icon"></span>
				<span class="select-type" @click="selectRecordType">{{followLabel}}</span>
			</p>
		</div>
		<div class="septal-line"></div>
		<div class="followup-time">
			<p>
				<span class="title">{{followTime}}</span>
				<span class="necessary">*</span>
				<!--<span class="time-input" v-if="show" @click="shown">请选择跟进时间</span>-->
				<yd-datetime class="time-input" type="date" start-date="2015-01-01" :end-date="endDate" v-model="dproceedingdate" slot="right"></yd-datetime>
			</p>
		</div>
		<div class="septal-line"></div>
		<div class="follow-content">
			<textarea type="text" v-model="vproceedingdesc" placeholder="请输入跟进内容">
			</textarea>	
		</div>
		<div class="btn-submit" @click="commit">
			<p>提交</p>
		</div>
		<yd-popup v-model="show" position="center" width="80%">
            <p>{{title}}</p>
            <yd-button @click.native="show = false">确认</yd-button>
        </yd-popup>
	</div>
</template>
<script>
import clear from '@/components/clear'
import {insertRecords} from '@/api/getData'
import {XuntongJSBridge} from '@/js/qingjs'
  export default {
    name: 'newFollow',
    data() {
      return {
        followType: '跟进类型',
        followTime: '跟进时间',
        dproceedingdate: this.$store.state.ymd,
        endDate: this.$store.state.ymd,
        pk_corp: this.$store.state.userInfo.pk_corp,
        pk_customer: this.$route.params.id,
        pk_project: this.$store.state.recordsInfo.pk_project,
        user_id: this.$store.state.userInfo.user_id,
        vproceedingdesc: this.$store.state.followdesc,
        recordsList: [],
        followList: [{
          name: '来电',
          type: 0
        }, {
          name: '来访',
          type: 1
        }, {
          name: '去电',
          type: 2
        }, {
          name: '去访',
          type: 3
        }, {
          name: '短信',
          type: 4
        }, {
          name: 'Email',
          type: 5
        }, {
          name: '请选择跟进类型',
          type: 6
        }],
        vcname: this.$store.state.recordsInfo.name,
        vpreferredtel: this.$store.state.recordsInfo.vpreferredtel,
        title: '',
        show: false,
        isphone: this.$store.state.isphone,
        vdef5: this.phoneLogo()
      }
    },
    components: {
      clear
    },
    watch: {
      dproceedingdate: function (newDproceedingdate) {
        let ymd = this.$store.state.ymd
        ymd = this.dproceedingdate
        this.$store.commit('setymd', ymd)
      },
      vproceedingdesc: function (newVproceedingdesc) {
        let followdesc = this.$store.state.followdesc
        followdesc = this.vproceedingdesc
        this.$store.commit('setFollowdesc', followdesc)
      }
    },
    methods: {
      selectRecordType() {
        this.$router.push({path: '/assistant/client/customerInfo/' + this.pk_customer + '/selectRecordType'})
      },
      async addRecord() {
        let params = {
          method: 'cuctomerRecord',
          dproceedingdate: this.dproceedingdate,
          fproceedingtype: this.followCode,
          pk_corp: this.$store.state.selectedProject.pk_responsecorp,
          pk_customer: this.pk_customer,
          pk_project: this.pk_project,
          user_id: this.user_id,
          vproceedingdesc: this.vproceedingdesc,
          vdef5: this.vdef5
        }
        console.log(params)
        let res = await insertRecords(params)
        console.log('insert', res)
        this.$router.go(-1)
      },
      commit() {
        console.log('跟进类型：' + this.followCode)
        console.log(this.followLabel)
        console.log('跟进时间：' + this.dproceedingdate)
        if (this.followCode === 6) {
          this.show = true
          this.title = '请选择跟进类型'
          return
        } else if (this.dproceedingdate === '') {
          this.show = true
          this.title = '请选择跟进时间'
          return
        } else {
          this.addRecord()
        }
      },
      getQuestion() {
        this.$router.push('/assistant/questionnaireLine/' + this.pk_customer)
      },
      phoneLogo() {
        let get = XuntongJSBridge.getOS()
        if (get === 'ios' || get === 'android') {
          return '1'
        } else if (get === 'Qing') {
          return '0'
        } else {
          return null
        }
      }
    },
    computed: {
      followLabel() {
        return this.followList[this.$store.state.followType.typeIndex].name
      },
      followCode() {
        return this.followList[this.$store.state.followType.typeIndex].type
      }
    }
  }
</script>
<style scoped>
	.top-client {
		width: 100%;
		height: 70px;
		background: #FFFFFF;
		position: fixed;
		top: 0;
	}
	.top-client .left-icon {
		width: 16.9%;
		height: 100%;
		float: left;
	}
	.top-client .left-icon .head-portrait {
		display: block;
		width: 30px;
		height: 30px;
		margin: 20px auto;
		background: url(../../assets/head-portrait.png) no-repeat center;
		background-size: 100%;
	}
	.top-client .middle-mess {
		float: left;
		width: 55%;
		height: 100%;
		overflow: hidden;
	}
	.top-client .middle-mess .client-name {
		margin-top: 8px;
		width: 100%;
		height: 28px;
		font-size: 16px;
		color: #030303;
		line-height: 28px;
		text-align: left;
		white-space: nowrap;
    	overflow: auto;
	}
	.top-client .middle-mess .client-phone {
		height: 33px;
		font-size: 14px;
		color: #7A797B;
		line-height: 22px;
		text-align: left;
		/*white-space: nowrap;
    	overflow: scroll;*/
	}
	.top-client .right-icon {
		/*width: 16.9%;
		height: 100%;*/
		float: right;
	}
	.top-client .right-icon .question-icon {
		display: block;
		width: 30px;
		height: 30px;
		margin: 20px 12px 20px 0;
		background: url(../../assets/questionnaire.png) no-repeat center;
		background-size: 100%;
	}
	.top-client .right-icon .phone-icon {
		display: block;
		width: 30px;
		height: 30px;
		margin: 20px 12px 20px 0;
		background: url(../../assets/phone.png) no-repeat center;
		background-size: 100%;
	}
	.new-follow {
		width: 100%;
		position: fixed;
		top: 78px;
		bottom: 193px;
		background: #FFFFFF;
	}
	.new-follow .followup-type {
		width: 100%;
		height: 44px;
		padding: 7px 0;
	}
	.new-follow .followup-time {
		width: 100%;
		height: 44px;
		padding: 7px 0;
	}
	.new-follow .follow-content {
		width: 100%;
		height: 144px;
		padding: 12px;
	}
	.new-follow .follow-content textarea {
		width: 100%;
		height: 100%;
		border: 1px solid #EAEFF3;
		border-radius: 4px;
		font-size: 14px;
		color: #98A1A8;
		line-height: 20px;
		padding: 6px;
	}
	.new-follow .septal-line {
		width: 96.3%;
  		height: 0;
  		border-bottom: 1px solid #EAEFF3;
  		margin-left: 3.7%;
	}
	.new-follow p {
		height: 30px;
	}
	.new-follow p span {
		display: inline-block;
		float: left;
	}
	.title {
		width: 56px;
		height: 16px;
		margin: 7px 4px 7px 12px;
		font-size: 14px;
		color: #7A797B;
		line-height: 16px;
	}
	.necessary {
		width: 7px;
		height: 17px;
		margin: 8px 0 5px;
		font-size: 12px;
		color: #F35959;
		line-height: 17px;
	}
	.select-type {
		display: inline-block;
		width: 98px;
		float: right !important;
		font-size: 14px;
		color: #98A1A8;
		line-height: 30px;
		text-align: right;
	}
	.icon {
		width: 3px;
		height: 6px;
		float: right !important;
		margin: 12px;
		background: url(../../assets/arrow-right.png) no-repeat center;
		background-size: 100%;
	}
	.time-input {
		display: inline-block;
		width: 98px;
		height: 30px;
		float: right;
		margin: 0 27px 0 116px;
		font-size: 14px;
		color: #98A1A8;
		line-height: 30px;
		text-align: right;
	}
	.btn-submit {
		width: 100%;
		height: 44px;
		position: fixed;
		bottom: 0;
		background: #FFFFFF;
	}
	.btn-submit p {
		height: 15px;
		margin: 14px 0 15px;
		font-size: 16px;
		color: #94D301;
		line-height: 15px;
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
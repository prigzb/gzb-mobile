<template>
  <div class="follow-urge">
    <div class="action">
      <div class="first-line" :class="{ followUrge: sisHide }" @click="show">
      	<p class="fp">跟进<span :class="{ message: promptOne }"></span></p>
      </div>
      <div class="first-line" :class="{ followUrge: hisHide }" @click="hide">
      	<p>催办<span :class="{ message: promptTwo }"></span></p>
      </div>
    </div>
    <div class="septal-line"></div>
    <div class="second line">
      <div class="overDue-followUp" :class="{ followUp: sisHide }" @click="notFollow">
      	<div class="div icon not-follow"></div><!--逾期未跟进-->
      	<div class="div text">
      		<span class="title">逾期未跟进</span>
      		<span class="content">{{ this.totalStatistic.nameList_after }}</span>
      	</div>
      	<div class="num-icon">
      		<span class="peo-num">{{ this.totalStatistic.count_after }}</span>
      		<span class="into-icon"></span>
      	</div>
      </div>
      <div class="undersigned" :class="{ dersigned: hisHide }" @click="notSign">
      	<div class="div icon not-sign"></div><!--认购未签约-->
      	<div class="div text">
      		<span class="title">认购未签约</span>
      		<span class="content">{{ this.totalStatistic.nameList_subsc }}</span>
      	</div>
      	<div class="num-icon">
      		<span class="peo-num">{{ this.totalStatistic.count_subsc }}</span>
      		<span class="into-icon"></span>
      	</div>
      </div>
    </div>
    <div class="septal-line"></div>
    <div class="third line">
      <div class="the-overDue" :class="{ followUp: sisHide }" @click="aboutOver">
      	<div class="div icon about-over"></div><!--即将逾期-->
      	<div class="div text">
      		<span class="title">即将逾期</span>
      		<span class="content">{{ this.totalStatistic.nameList_will }}</span>
      	</div>
      	<div class="num-icon">
      		<span class="peo-num">{{ this.totalStatistic.count_will }}</span>
      		<span class="into-icon"></span>
      	</div>
      </div>
      <div class="noReturn" :class="{ dersigned: hisHide }" @click="notReturn">
      	<div class="div icon not-return"></div><!--签约未回款-->
      	<div class="div text">
      		<span class="title">签约未回款</span>
      		<span class="content">{{ this.totalStatistic.nameList_sign }}</span>
      	</div>
      	<div class="num-icon">
      		<span class="peo-num">{{ this.totalStatistic.count_sign }}</span>
      		<span class="into-icon"></span>
      	</div>
      </div>
    </div>
  </div>
</template>
<script>
import {followUrg, getProjectList} from '@/api/getData'
  export default {
    name: 'followUrge',
    data() {
      return {
        sisHide: true,
        hisHide: false,
        promptOne: false,
        promptTwo: false,
        geturl: 'http://10.10.168.56:7000/api/servlet/NCMobileQueryAfterrecord',
        totalStatistic: {},
        type: 'assIndex'
      }
    },
    components: {},
    methods: {
      show: function () {
        this.sisHide = true
        this.hisHide = false
      },
      hide: function () {
        this.sisHide = false
        this.hisHide = true
      },
      notFollow: function () {
        this.$router.push({path: '/assistant/assIndex/notFollow'})
      },
      notSign: function () {
        this.$router.push({path: '/assistant/assIndex/notSign'})
      },
      aboutOver: function () {
        this.$router.push({path: '/assistant/assIndex/aboutOver'})
      },
      notReturn: function () {
        this.$router.push({path: '/assistant/assIndex/notReturn'})
      },
      async gettotalStatistic() {
        await this.getProject()
        let params = {
          method: 'queryInfermationOfAfterrecord',
          action_type: '0',
          pk_project: this.$store.state.selectedProject.pk_project,
          user_id: this.$store.state.userInfo.user_id
        }
        let res = await followUrg(params)
        console.log(res)
        this.totalStatistic = res.data
        if (res.data.flag === '0') {
          console.log('请求成功！')
          this.totalStatistic.count_after = res.data.count_after
          this.totalStatistic.count_will = res.data.count_will
          this.totalStatistic.count_subsc = res.data.count_subsc
          this.totalStatistic.count_sign = res.data.count_sign
          this.totalStatistic.nameList_after = this.tString(res.data.nameList_after)
          this.totalStatistic.nameList_will = this.tString(res.data.nameList_will)
          this.totalStatistic.nameList_subsc = this.tString(res.data.nameList_subsc)
          this.totalStatistic.nameList_sign = this.tString(res.data.nameList_sign)
          this.follow()
          this.urge()
          console.log(this.totalStatistic)
        } else {
          this.totalStatistic = {}
        }
      },
      follow() {
        if (this.totalStatistic.count_after === 0 && this.totalStatistic.count_will === 0) {
          this.promptOne = false
        } else {
          this.promptOne = true
        }
        console.log('promptOne:' + this.promptOne)
        return this.promptOne
      },
      urge() {
        if (this.totalStatistic.count_subsc === 0 && this.totalStatistic.count_sign === 0) {
          this.promptTwo = false
        } else {
          this.promptTwo = true
        }
        console.log('promptTwo:' + this.promptTwo)
        return this.promptTwo
      },
      tString(data) {
        if (data === '[]') {
          return ''
        } else {
          return data.join('、')
        }
      },
      async getProject () {
        if (this.$store.state.selectedProject.pk_project === '') {
          let params = {
            method: 'getdefaultlist',
            pk_psnbasdoc: this.$store.state.userInfo.pk_psnbasdoc
          }
          let res = await getProjectList(params)
          console.log(res)
          let updateUserInfo = res.data.data
          this.$store.commit('updateUserInfo', updateUserInfo)
          if (res.data.data.project.length === 0) {
            this.$router.push('/assistant/selectProject/0/' + this.type)
          }
          let selectedProject = {
            outpk_project: res.data.data.project[1].pk_project,
            pk_project: res.data.data.project[0].pk_project,
            name: res.data.data.project[0].vname,
            vincode: res.data.data.project[0].vincode,
            vcode: res.data.data.project[0].code,
            vcodes: res.data.data.project[1].code,
            pk_responsecorp: res.data.data.project[0].pk_responsecorp
          }
          this.$store.commit('setProjectName', selectedProject)
        }
      }
    },
    created: function() {
      this.getProject()
      this.gettotalStatistic()
    }
  }
</script>
<style scoped>
  .follow-urge {
  	background: #FFFFFF;
  }
  .action {
  	margin-top: 9px;
  	width: 100%;
  	height: 40px;
  	background: #FFFFFF;
  }
  .first-line {
  	width: 50%;
  	height: 40px;
  	float: left;
  	color: #7A797B;
  }
  .followUrge {
    color: #3CBAFF;
    border-bottom: 3px solid #3CBAFF;
  }
  /*.message {
  	display: inline-block;
  	width: 5px;
  	height: 5px;
  	background: #F35959;
  	border-radius: 1000px;
  	margin: 4px 0.5px;
  }*/
  .action .first-line p {
  	font-size: 15px;
  	height: 16px;
  	line-height: 15px;
  	margin: 11px auto 14px;
  }
  .action .first-line .fp {
  	border-right: 2px solid #DCE1E8;
  }
  .septal-line {
  	width: 96.3%;
  	height: 0;
  	border-bottom: 1px solid #EAEFF3;
  	margin-left: 3.7%;
  }
  .line {
  	height: 70px;
  	background: #FFFFFF;
  }
  .overDue-followUp, .the-overDue {
    display: none;
  }
  .followUp {
  	display: block;
  	width: 100%;
  	height: 70px;
  }
  .undersigned, .noReturn {
  	display: none;
  }
  .dersigned {
  	display: block;
  	width: 100%;
  	height: 70px;
  }
  .div {
  	float: left;
  }
  .icon {
  	width: 40px;
  	height: 40px;
  	margin: 15px 12px;
  }
  .text {
  	width: 154px;
  	height: 40px;
  	margin: 15px 12px;
  }
  .text span {
  	display: block;
  	text-align: left;
  }
  .text .title {
  	height: 19px;
  	font-size: 14px;
  	color: #030303;
  	line-height: 19px;
  }
  .text .content {
  	height: 17px;
  	font-size: 12px;
  	color: #98A1A8;
  	line-height: 17px;
  	margin-top: 4px;
  	white-space: nowrap;
  	overflow: hidden;
  	text-overflow: ellipsis;
  }
  .num-icon {
  	width: 61px;
  	height: 31px;
  	float: right;
  	margin-top: 20px;
  	margin-right: 12px;
  	margin-bottom: 19px;
  }
  .num-icon .peo-num {
  	display: inline-block;
  	width: 40px;
  	height: 31px;
  	line-height: 31px;
  	text-align: right;
  	font-size: 24px;
  	color: #3CBAFF;
  }
  .num-icon .into-icon {
  	display: inline-block;
  	width: 6px;
  	height: 12px;
  	margin: 9px 0 2px 10px;
  	background: url(../../assets/unfurled.png) no-repeat center;
  	background-size: 6px 12px;
  }
  .not-follow {
  	background: url(../../assets/not-follow.png) no-repeat center;
  	background-size: 40px;
  }
  .about-over {
  	background: url(../../assets/about-over.png) no-repeat center;
  	background-size: 40px;
  }
  .not-sign {
  	background: url(../../assets/not-sign.png) no-repeat center;
  	background-size: 40px;
  }
  .not-return {
  	background: url(../../assets/not-return.png) no-repeat center;
  	background-size: 40px;
  }
</style>
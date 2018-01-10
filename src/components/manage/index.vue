<template>
  <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
  	<div class="performance">
      <div class="select-project" @click="jump()">
        <img src="../../assets/select-project-icon.png">
        <span>{{ projectName }}</span>
        <img src="../../assets/arrow-right.png">
        <clear></clear>
      </div>
  		<div class="reserve">
  			<performanceBlock leftContent='预订' :reserveNum="performances.yuding.count"></performanceBlock>
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
  </yd-pullrefresh>
</template>

<script>
	import clear from '@/components/clear'
	import performanceBlock from '@/components/manage/performanceBlock'
	import performanceBlockThree from '@/components/manage/performanceBlockThree'
	import commonFooter from '@/components/manage/commonFooter'
  import {managePerformance, manageGetRight, getProjectList} from '@/api/getData'

	export default {
    name: 'index',
    components: {
      clear, performanceBlock, performanceBlockThree, commonFooter
    },
    data() {
      return {
        type: 'index',
        performances: ''
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
      },
      projectName() {
        return this.$store.state.manageProject.name
      }
    },
    methods: {
      jump() {
        this.$router.push('/manage/selectProject/0/' + this.type)
        console.log(this.type)
      },
      dateToday() {
        let time = sessionStorage.getItem('time')
        let oldYear = parseInt(time.split(',')[0])
        let oldMonth = parseInt(time.split(',')[1])
        let oldDay = parseInt(time.split(',')[2])
        let date = new Date(oldYear, oldMonth, oldDay)
        let month = date.getMonth() + 1
        let today = date.getDate().toString().length === 1 ? '0' + date.getDate().toString() : date.getDate().toString()
        month = month.toString().length === 1 ? '0' + month.toString() : month.toString()
        return date.getFullYear() + '-' + month + '-' + today
      },
      async getPerfor() {
        let params = {
          method: 'selectalldata',
          pk_project: this.$store.state.manageProject.pk_project,
          pk_user: this.$store.state.userInfo.user_id,
          begin_date: this.dateToday(),
          end_date: this.dateToday()
        }
        let time = sessionStorage.getItem('time')
        let res = await managePerformance(params)
        console.log(res)
        this.performances = res.data.data
        this.$store.commit('serverTime', time)
        console.log('获取页面信息')
      },
      getUser() {
        let user = sessionStorage.getItem('user')
        if (!user || user === '') {
            alert('未获取到用户信息，请重新打开轻应用')
            return false
        }
        user = JSON.parse(user)
        this.$store.commit('setUserInfo', user)
      },
      async getRight() {
        let params = {
            method: 'caseoffield',
            pk_psndoc: this.$store.state.userInfo.pk_psndoc
        }
        const right = await manageGetRight(params)
        console.log(right)
        let fright = ''
        if (right.data === '') {
          return false
        } else {
          fright = right.data.data.list
        }
        this.$store.commit('setUserRight', fright)
      },
      async getProject () {
        if (this.$store.state.manageProject.pk_project === '') {
          let params = {
            method: 'getchargedefaultlist',
            pk_psnbasdoc: this.$store.state.userInfo.pk_psnbasdoc
          }
          let res = await getProjectList(params)
          console.log(res)
          let manageUserInfo = res.data.data
          this.$store.commit('manageUserInfo', manageUserInfo)
          if (res.data.data.project.length === 0) {
            this.$router.push('/manage/selectProject/0/' + this.type)
          }
          let manageProject = {
            pk_project: res.data.data.project[0].pk_project,
            name: res.data.data.project[0].vname,
            fright: '',
            outvcode: res.data.data.project[1].code,
            pk_responsecorp: res.data.data.project[0].pk_responsecorp,
            vcode: res.data.data.project[0].code
          }
          for (let fright of this.$store.state.fright) {
            if (res.data.data.project[0].pk_responsecorp === fright.pk_responsecorp) {
              manageProject.fright = fright.fright
            }
        }
          this.$store.commit('manageProjectName', manageProject)
        }
      },
      loadList() {
        this.getPerfor()
        this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad')
      }
    },
    created: async function() {
      await this.getUser()
      await this.getRight()
      await this.getProject()
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
  .select-project {
    height: 44px;
    background: #ffffff;
    line-height: 44px;
    font-family: 'PingFangSC-Regular';
    color: #030303;
    font-size: 16px;
    padding: 0 12px;
    margin-bottom: 9px;
  }
  .select-project :first-child {
    width: 20px;
    height: 20px;
    float: left;
    margin-top: 12px;
    margin-right: 13px;
  }
  .select-project img:nth-of-type(2) {
    width: 6px;
    height: 12px;
    float: right;
    margin-top: 16px;
  }
  .select-project span {
    float: left;
  }
</style>

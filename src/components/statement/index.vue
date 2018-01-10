<template>
  <div class="index">
    <div class="select-project" @click="jump()">
      <img src="../../assets/select-project-icon.png">
      <span>{{projectName}}</span>
      <img src="../../assets/arrow-right.png">
      <clear></clear>
    </div>
    <div class="reserve">
      <performanceBlock leftContent='预订' :reserveNum="returnMess.engagenum"></performanceBlock>
    </div>
    <div class="subscription">
      <performanceBlockThree leftContent='认购' :subscriptionNum="returnMess.subscnum" :subscriptionMoney="returnMess.subscamount"></performanceBlockThree>
    </div>
    <clear></clear>
    <div class="sign">
      <performanceBlockThree leftContent='签约' :subscriptionNum="returnMess.signnum" :subscriptionMoney="returnMess.signamount"></performanceBlockThree>
    </div>
    <div class="pay">
      <performanceBlockThree leftContent='回款' :subscriptionNum="returnMess.gatheringnum" :subscriptionMoney="returnMess.gatheringamount"></performanceBlockThree>
    </div>
    <clear></clear>
    <div class="sale" @click="salesAnalysis">
      <img src="../../assets/statement-sale.png">
      <span>销售分析</span>
      <clear></clear>
    </div>
    <div class="team" @click="teamManage">
      <img src="../../assets/manage-team.png">
      <span>团队业绩</span>
      <clear></clear>
    </div>
    <clear></clear>
    <div class="overdate" @click="jumpto('overdate')">
      <img src="../../assets/manage-zaitu.png">
      <span>逾期分析</span>
      <clear></clear>
    </div>
    <div class="customer" @click="customerAnalysis">
      <img src="../../assets/customer-mess.png">
      <span>客户分析</span>
      <clear></clear>
    </div>
    <clear></clear>
  </div>
</template>

<script>
  import clear from '@/components/clear'
  import performanceBlock from '@/components/statement/performanceBlock'
  import performanceBlockThree from '@/components/statement/performanceBlockThree'
  import {statementIndex, getProjectList, manageGetRight} from '@/api/getData'

  export default {
    name: 'index',
    components: {
      clear, performanceBlock, performanceBlockThree
    },
    data() {
      return {
        returnMess: ''
      }
    },
    methods: {
      jump() {
        this.$router.push('/statement/selectProject/0/index')
      },
      async getMess() {
        let time = sessionStorage.getItem('time')
        let params = {
          method: 'allproject',
          pk_project: this.$store.state.statementProject.pk_project,
          pk_user: this.$store.state.userInfo.user_id,
          begin_date: this.dateToday(),
          end_date: this.dateToday()
        }
        if (params.pk_project === '') {
          params.method = 'allproject'
        } else {
          params.method = 'project'
        }
        let res = await statementIndex(params)
        this.$store.commit('serverTime', time)
        console.log(res)
        this.returnMess = res.data.data
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
      jumpto(router) {
        let isactive = this.$store.state.statementOverIsactive.isactive
        if (isactive === true) {
          this.$router.push('/statement/overDate')
        } else {
          this.$router.push('/statement/overDate/overDateQianYue')
        }
      },
      initialization() {
        let approval = this.$store.state.approval
        approval.beginDate = this.dateToday()
        approval.endDate = this.dateToday()
        approval.dateIndex = 0
        this.$store.commit('setApproval', approval)
        let type = this.$store.state.type
        type.statusIndex = 0
        this.$store.commit('setTypeInfo', type)
        let dateList = this.$store.state.dateList
        dateList.statusIndex = 0
        this.$store.commit('setdateList', dateList)
      },
      salesAnalysis() {
        this.initialization()
        this.$router.push({ path: '/statement/salesAnalysis' })
      },
      teamManage() {
        this.initialization()
        this.$router.push({ path: '/statement/teamManage' })
      },
      customerAnalysis() {
        this.initialization()
        this.$router.push({ path: '/statement/customerAnalysis' })
      },
      getUser() {
        let user = sessionStorage.getItem('user')
        let time = sessionStorage.getItem('time')
        console.log(time)
        if (!user || user === '') {
            alert('未获取到用户信息，请重新打开轻应用')
            return false
        }
        user = JSON.parse(user)
        this.$store.commit('setUserInfo', user)
        this.$store.commit('serverTime', time)
      },
      async getProject () {
        if (this.$store.state.statementProject.name === '') {
          let params = {
            method: 'getmanagerdefaultlist',
            pk_psnbasdoc: this.$store.state.userInfo.pk_psnbasdoc
          }
          let res = await getProjectList(params)
          console.log(res)
          let manageUserInfo = res.data.data
          this.$store.commit('manageUserInfo', manageUserInfo)
          if (res.data.data.project.length === 0) {
            this.$router.push('/statement/selectProject/0/index')
          }
          let statementProject = {
            pk_project: res.data.data.project[0].pk_project,
            name: res.data.data.project[0].vname,
            fright: '',
            vcode: res.data.data.project[0].code,
            pk_responsecorp: res.data.data.project[0].pk_responsecorp,
            outvcode: res.data.data.project[1].code
          }
          for (let fright of this.$store.state.fright) {
            if (res.data.data.project[0].pk_responsecorp === fright.pk_responsecorp) {
              statementProject.fright = fright.fright
            }
        }
          this.$store.commit('statementProject', statementProject)
        }
      },
      async getRight() {
        let params = {
            method: 'caseoffield',
            pk_psndoc: this.$store.state.userInfo.pk_psndoc
        }
        const right = await manageGetRight(params)
        let fright = ''
        if (right.data === '') {
          return false
        } else {
          fright = right.data.data.list
        }
        this.$store.commit('setUserRight', fright)
      }
    },
    created: async function() {
      this.getUser()
      await this.getRight()
      await this.getProject()
      this.getMess()
    },
    computed: {
      projectName() {
        return this.$store.state.statementProject.name
      }
    }
  }
</script>

<style scoped>
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
    width: 22px;
    height: 22px;
    float: left;
    margin-top: 12px;
    margin-right: 12px;
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
  .reserve, .sign, .sale, .overdate {
    margin-left: 3.8%;
    width: 44.3%;
    float: left;
  }
  .subscription, .pay, .team, .customer {
    margin-right: 3.8%;
    width: 44.3%;
    float: right;
  }
  .sign, .pay, .sale, .team, .overdate, .customer {
    margin-top: 8px;
  }
  .sale, .team, .overdate, .customer {
    height: 80px;
    background: #FFFFFF;
  }
  .sale img, .team img, .overdate img, .customer img {
    width: 34px;
    height: 34px;
    float: left;
    margin-left: 14%;
    margin-top: 24px;
  }
  .sale span, .team span, .overdate span, .customer span {
    color: #333333;
    font-size: 14px;
    float: left;
    margin-top: 30px;
    margin-left: 12%;
  }
</style>
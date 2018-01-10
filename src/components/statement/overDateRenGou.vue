<template>
  <div class="overDateRenGou">
  <!--   <ul class="title">
      <li>项目</li>
      <li>总计</li>
      <li>未逾期</li>
      <li>逾期</li>
      <clear></clear>
    </ul>
    <ul class="item" v-if="this.$store.state.statementProject.name === '全部项目'">
      <li>合计</li>
      <li class="blue">{{addAll(add(returnMess, 'no'), add(returnMess, 'yes'))}}</li>
      <li class="blue">{{add(returnMess, 'no')}}</li>
      <li class="blue" @click="jumpYu()">{{add(returnMess, 'yes')}}</li>
      <clear></clear>
    </ul>
    <ul class="item" v-for="message in returnMess">
      <li v-if="selectname(message).length <= 7" style="line-height: 40px;">{{selectname(message)}}</li>
      <li v-else style="line-height: 20px;">{{selectname(message)}}</li>
      <li class="blue">{{merge(message)}}</li>
      <li class="blue">{{selectmonnum(message, 'no')}}</li>
      <li class="blue">{{selectmonnum(message, 'yes')}}</li>
      <clear></clear>
    </ul> -->
    <table cellspacing="0px" cellpadding="0px">
      <thead>
        <tr>
          <th width="40%" class="text">项目</th>
          <th width="20%">总计</th>
          <th width="20%">未逾期</th>
          <th width="20%">逾期</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="this.$store.state.statementProject.name === '全部项目'">
          <td class="text">合计</td>
          <td class="blue">{{addAll(add(returnMess, 'no'), add(returnMess, 'yes'))}}</td>
          <td class="blue">{{add(returnMess, 'no')}}</td>
          <td class="blue" @click="jumpYu()">{{add(returnMess, 'yes')}}</td>
        </tr>
        <tr v-for="message in returnMess">
          <td class="text">{{selectname(message)}}</td>
          <td class="blue">{{merge(message)}}</td>
          <td class="blue">{{selectmonnum(message, 'no')}}</td>
          <td class="blue">{{selectmonnum(message, 'yes')}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import clear from '@/components/clear'
  import {overDateRenGou} from '@/api/getData'

  export default {
    name: 'overDateRenGou',
    components: {
      clear
    },
    data() {
      return {
        params: {
          method: 'project',
          fright: this.$store.state.statementProject.fright,
          vcode: this.$store.state.statementProject.vcode,
          pk_psndoc: this.$store.state.userInfo.pk_psndoc
        },
        params2: {
          method: 'allproject',
          pk_psndoc: this.$store.state.userInfo.pk_psndoc
        },
        returnMess: ''
      }
    },
    methods: {
      jumpYu() {
        let isactive = this.$store.state.statementAnalysis.isactive
        if (isactive === true) {
          this.$router.push('/statement/analysis')
        } else {
          this.$router.push('/statement/qianYueAnalysis')
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
      async getMess() {
        let projectName = this.$store.state.statementProject.name
        let res = ''
        if (projectName === '全部项目') {
          this.$dialog.loading.open('很快加载好了')
          res = await overDateRenGou(this.params2)
          this.$dialog.loading.close()
        } else {
          res = await overDateRenGou(this.params)
        }
        console.log(res)
        this.returnMess = res.data.data.list
      },
      selectmonnum(mess, flag) {
        let type = this.$store.state.overDateType
        if (type === '金额(万元)') {
          if (flag === 'no') {
            mess.nomoney = (mess.nomoney === '' ? '0' : mess.nomoney)
            return (parseInt(mess.nomoney) / 10000).toFixed(2)
          } else {
            mess.ymoney = (mess.ymoney === '' ? '0' : mess.ymoney)
            return (parseInt(mess.ymoney) / 10000).toFixed(2)
          }
        } else {
          if (flag === 'no') {
            return mess.nonumm === '' ? '0' : mess.nonumm
          } else {
            return mess.ynumm === '' ? '0' : mess.ynumm
          }
        }
      },
      merge (mess) {
        let type = this.$store.state.overDateType
        if (type === '金额(万元)') {
          mess.nomoney = (mess.nomoney === '' ? '0' : mess.nomoney)
          mess.ymoney = (mess.ymoney === '' ? '0' : mess.ymoney)
          console.log(mess.nomoney)
          console.log(mess.ymoney)
          return ((parseFloat(mess.nomoney) + parseFloat(mess.ymoney)) / 10000).toFixed(2)
        } else {
          mess.nonumm = (mess.nonumm === '' ? '0' : mess.nonumm)
          mess.ynumm = (mess.ynumm === '' ? '0' : mess.ynumm)
          return parseInt(mess.nonumm) + parseInt(mess.ynumm)
        }
      },
      selectname(mess) {
        let projectName = this.$store.state.statementProject.name
        if (projectName === '全部项目') {
          return mess.vshowname
        } else {
          return projectName
        }
      },
      add(messs, flag) {
        let type = this.$store.state.overDateType
        let amount = 0
        if (type === '金额(万元)') {
          if (flag === 'no') {
            for (let mess of messs) {
              mess.nomoney = parseFloat(mess.nomoney === '' ? '0' : mess.nomoney)
              amount += mess.nomoney
            }
            amount = (amount / 10000).toFixed(2)
          } else {
            for (let mess of messs) {
              mess.ymoney = parseFloat(mess.ymoney === '' ? '0' : mess.ymoney)
              amount += mess.ymoney
            }
            amount = (amount / 10000).toFixed(2)
          }
        } else {
          if (flag === 'no') {
            for (let mess of messs) {
              mess.nonumm = parseInt(mess.nonumm === '' ? '0' : mess.nonumm)
              amount += mess.nonumm
            }
          } else {
            for (let mess of messs) {
              mess.ynumm = parseInt(mess.ynumm === '' ? '0' : mess.ynumm)
              amount += mess.ynumm
            }
          }
        }
        return amount
      },
      addAll(num, num2) {
        let type = this.$store.state.overDateType
        if (type === '金额(万元)') {
          return (parseFloat(num) + parseFloat(num2)).toFixed(2)
        } else {
          return num + num2
        }
      }
    },
    created: function() {
      this.getMess()
    }
  }
</script>

<style scoped>
 /* .title {
    width: 100%;
  }
  .title li, .item li {
    height: 40px;
    line-height: 40px;
    float: left;
    width: 20%;
    background: linear-gradient(-180deg, #FCFDFE 0%, #F8FBFC 100%);
    border-bottom: 1px solid #EAEFF3;
    border-right: 1px solid #EAEFF3;
    font-size: 14px;
  }
  .title li {
    color: #030303;
  }
  .title :first-child, .item :first-child {
    width: 40%;
    text-align: left;
    padding-left: 3.8%;
    color: #030303;
  }*/
  .blue {
    color: #3CBAFF;
  }
  table{
    width:100%;
    border:0;
    border-collapse:collapse;
    font-size:14px;
  }
  table th{
    border-collapse:collapse;
    background: #FCFDFE;
    height:40px;
    border-right:1px solid #EAEFF3;
    border-bottom:1px solid #EAEFF3;
    font-size: 14px;
    color: #030303;
    background: linear-gradient(-180deg, #FCFDFE 0%, #F8FBFC 100%);
  }
  table td{
    height:22px;
    word-wrap:break-word;
    background: #ffffff;
    max-width:200px;
    text-align:center;
    vertical-align:middle;
    border-right:1px solid #EAEFF3;
    border-bottom:1px solid #EAEFF3;
    height: 40px;
    background: linear-gradient(-180deg, #FCFDFE 0%, #F8FBFC 100%);
  }
  .text {
    text-align: left;
    padding: 0 10px;
    color: #030303;
  }
</style>
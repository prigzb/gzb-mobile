<template>
  <div class="zaitu">
    <div class="title">认购未签约</div>
    <div class="rengou">
       <div class="left">
        <performanceBlockThree leftContent="总数" :subscriptionNum="list.numm" :subscriptionMoney="list.round" :subMoney="list.decimal"></performanceBlockThree>
      </div>
      <div class="right">
        <performanceBlockThree leftContent="逾期" :subscriptionNum="list2.numm" :subscriptionMoney="list2.round" :subMoney="list2.decimal"></performanceBlockThree>
      </div>
      <clear></clear>
    </div>
    <div class="title2">签约未回款</div>
    <div class="qianyue">
      <div class="left">
        <performanceBlockThree leftContent="总数" :subscriptionNum="list3.numm" :subscriptionMoney="list3.round" :subMoney="list3.decimal"></performanceBlockThree>
      </div>
      <div class="right">
        <performanceBlockThree leftContent="逾期" :subscriptionNum="list4.numm" :subscriptionMoney="list4.round" :subMoney="list4.decimal"></performanceBlockThree>
      </div>
      <clear></clear>
    </div>
    <commonFooter></commonFooter>
  </div>
</template>

<script>
  import performanceBlockThree from '@/components/manage/performanceBlockThree'
  import clear from '@/components/clear'
  import commonFooter from '@/components/manage/commonFooter'
  import {noReturn, undersigned} from '@/api/getData'
  export default {
    name: 'zaitu',
    data() {
      return {
        list: [],
        list2: [],
        list3: [],
        list4: []
      }
    },
    components: {
      performanceBlockThree, clear, commonFooter
    },
    methods: {
      async getUndersigned() {
        let params = {
          'method': 'rennum',
          'fright': this.$store.state.manageProject.fright,
          // 'fright': '1',
          'pk_corp': this.$store.state.manageProject.pk_responsecorp,
          'pk_psndoc': this.$store.state.userInfo.pk_psndoc,
          'vcode': this.$store.state.manageProject.vcode,
          'pk_project': this.$store.state.manageProject.pk_project
        }
        // console.log(params)
        let res = await undersigned(params)
        console.log(res)
        this.list = res.data.data.list[0]
        this.list.numm = this.initNum(this.list.numm)
        this.list.round = this.init(this.list.money).split('.')[0]
        this.list.decimal = '.' + this.init(this.list.money).split('.')[1]
      },
      async getOverdersigned() {
        let params = {
          'method': 'yuqi',
          'fright': this.$store.state.manageProject.fright,
          // 'fright': '1',
          'pk_corp': this.$store.state.manageProject.pk_responsecorp,
          'pk_psndoc': this.$store.state.userInfo.pk_psndoc,
          'pk_project': this.$store.state.manageProject.pk_project,
          'vcode': this.$store.state.manageProject.vcode
        }
        // console.log(params)
        let res = await undersigned(params)
        console.log(res)
        this.list2 = res.data.data.list[0]
        this.list2.numm = this.initNum(this.list2.numm)
        this.list2.round = this.init(this.list2.money).split('.')[0]
        this.list2.decimal = '.' + this.init(this.list2.money).split('.')[1]
      },
      async getNoReturn() {
        let params = {
          'method': 'qiannum',
          'fright': this.$store.state.manageProject.fright,
          // 'fright': '1',
          'pk_corp': this.$store.state.manageProject.pk_responsecorp,
          'pk_psndoc': this.$store.state.userInfo.pk_psndoc,
          'vcode': this.$store.state.manageProject.vcode,
          'pk_project': this.$store.state.manageProject.pk_project
        }
        console.log(params)
        let res = await noReturn(params)
        // console.log(res)
        this.list3 = res.data.data.list[0]
        this.list3.numm = this.initNum(this.list3.numm)
        this.list3.round = this.init(this.list3.money).split('.')[0]
        this.list3.decimal = '.' + this.init(this.list3.money).split('.')[1]
      },
      async getSignNoReturn() {
        let params = {
          'method': 'yuqi',
          'fright': this.$store.state.manageProject.fright,
          // 'fright': '1',
          'pk_corp': this.$store.state.manageProject.pk_responsecorp,
          'pk_psndoc': this.$store.state.userInfo.pk_psndoc,
          'vcode': this.$store.state.manageProject.vcode,
          'pk_project': this.$store.state.manageProject.pk_project
        }
        // console.log(params)
        let res = await noReturn(params)
        // console.log(res)
        this.list4 = res.data.data.list[0]
        this.list4.numm = this.initNum(this.list4.numm)
        this.list4.round = this.init(this.list4.money).split('.')[0]
        this.list4.decimal = '.' + this.init(this.list4.money).split('.')[1]
      },
      init(data) {
        if (data === '') {
          data = 0
        }
        let money = (data / 10000).toFixed(1)
        return money
      },
      initNum(data) {
         if (data === '') {
           data = 0
         }
         return data
      }
    },
    created: function() {
      this.getUndersigned()
      this.getNoReturn()
      this.getOverdersigned()
      this.getSignNoReturn()
    }
  }
</script>

<style scoped>
  .title, .title2 {
    height: 30px;
    line-height: 30px;
    text-align: left;
    padding-left: 12px;
    color: #98A1A8;
    font-size: 13px;
  }
  .left {
    float: left;
    width: 46.3%;
    margin-left: 2.5%;
  }
  .right {
    float: right;
    width: 46.3%;
    margin-right: 2.5%;
  }
</style>
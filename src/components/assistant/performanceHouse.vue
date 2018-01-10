<template>
  <div class="performanceHouse">
    <div class="house-mess">
      <div class="left">
        <img src="../../assets/house-mess.png">
        <span>房间信息</span>
      </div>
      <clear></clear>
    </div>
    <houseItem leftContent='房间名称' :rightContent="houseMess.room[0].housename" v-if="houseMess.room[0].housename != null"></houseItem>
    <houseItem leftContent='户型' :rightContent="houseMess.room[0].househx" v-if="houseMess.room[0].househx != null"></houseItem>
    <houseItem leftContent='朝向' :rightContent="houseMess.room[0].housecx" v-if="houseMess.room[0].housecx != null"></houseItem>
    <houseItem leftContent='建筑面积' :rightContent="houseMess.room[0].housejzmj + 'm²'" v-if="houseMess.room[0].housejzmj != null"></houseItem>
    <houseItem leftContent='套内面积' :rightContent="houseMess.room[0].housetnmj + 'm²'" v-if="houseMess.room[0].househx != null"></houseItem>
    <houseItem leftContent='表单价' :rightContent="houseMess.room[0].bprice + '/m²'" v-if="houseMess.room[0].bprice != null"></houseItem>
    <houseItem leftContent='表总价' :redContent="houseMess.room[0].bamount" rightContent="元" v-if="houseMess.room[0].bamount != null"></houseItem>
    <div v-for='customer in houseMess.customer'>
      <div class="customer-mess">
        <div class="left">
          <img src="../../assets/customer-mess.png">
          <span>客户信息</span>
        </div>
        <clear></clear>
      </div>
      <houseItem leftContent='客户姓名' :rightContent="customer.custname" v-if="customer.custname != null"></houseItem>
      <houseItem leftContent='证件类型' :rightContent="customer.cardtype" v-if="customer.cardtype != null"></houseItem>
      <houseItem leftContent='证件号码' :rightContent="customer.cardcode" v-if="customer.cardcode != null"></houseItem>
      <houseItem leftContent='电话' :rightContent="customer.tel" v-if="customer.tel != null"></houseItem>
      <houseItem leftContent='成交渠道' :rightContent="customer.cjqd" v-if="customer.cjqd != null"></houseItem>
    </div>
    <div class="sell-mess">
      <div class="left">
        <img src="../../assets/sell.png">
        <span>销售情况</span>
      </div>
      <clear></clear>
    </div>
    <houseItem leftContent='认购日期' :rightContent="houseMess.room[0].rgdate" v-if="houseMess.room[0].rgdate != null"></houseItem>
    <houseItem leftContent='签约日期' :rightContent="houseMess.room[0].qydate" v-if="houseMess.room[0].qydate != null"></houseItem>
    <houseItem leftContent='成交单价' :rightContent="houseMess.room[0].cprice + 'm²'" v-if="houseMess.room[0].cprice != null"></houseItem>
    <houseItem leftContent='成交总价' :redContent="houseMess.room[0].camount" rightContent="元" v-if="houseMess.room[0].camount != null"></houseItem>
    <houseItem leftContent='付款方式' :rightContent="houseMess.room[0].paytype" v-if="houseMess.room[0].paytype != null"></houseItem>
    <houseItem leftContent='经办人' :rightContent="houseMess.room[0].perman" v-if="houseMess.room[0].perman != null"></houseItem>
  </div>
</template>

<script>
  import clear from '@/components/clear'
  import houseItem from '@/components/assistant/houseItem'
  import {performanceHouse} from '@/api/getData'

  export default {
    name: 'performanceHouse',
    components: {
      clear, houseItem
    },
    data() {
      return {
        houseMess: ''
      }
    },
    methods: {
      async getMess() {
        let params = {
          method: 'selecttradedata',
          begin_date: this.$store.state.performanceDate.begin_date,
          end_date: this.$store.state.performanceDate.end_date,
          billid: this.$store.state.billid
        }
        let res = await performanceHouse(params)
        console.log(res)
        this.houseMess = res.data.data
      }
    },
    created: function() {
      this.getMess()
    }
  }
</script>

<style scoped>
  .house-mess, .customer-mess, .sell-mess {
    background: #FFFFFF;
    height: 46px;
    border: 1px solid #EAEFF3;
    padding: 0 12px;
    line-height: 44px;
  }
  .left {
    font-family: 'PingFangSC-Regular';
    float: left;
    color: #030303;
    font-size: 16px;
  }
  .left img {
    width: 22px;
    height: 22px;
    display: inline-block;
    margin-right: 12px;
    vertical-align: middle;
  }
</style>
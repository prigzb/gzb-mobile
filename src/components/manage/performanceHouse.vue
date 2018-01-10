<template>
  <div class="performanceHouse">
    <div v-for="room in houseMess.room">
      <div class="house-mess">
        <div class="left">
          <img src="../../assets/house-mess.png">
          <span>房间信息</span>
        </div>
        <clear></clear>
      </div>
      <houseItem leftContent='房间名称' :rightContent="room.housename" v-if="room.housename != null"></houseItem>
      <houseItem leftContent='户型' :rightContent="room.househx" v-if="room.househx != null"></houseItem>
      <houseItem leftContent='朝向' :rightContent="room.housecx" v-if="room.housecx != null"></houseItem>
      <houseItem leftContent='建筑面积' :rightContent="room.housejzmj + 'm²'" v-if="room.housejzmj != null"></houseItem>
      <houseItem leftContent='套内面积' :rightContent="room.housetnmj + 'm²'" v-if="room.housetnmj != null"></houseItem>
      <houseItem leftContent='表单价' :rightContent="room.bprice + '元/m²'" v-if="room.bprice != null"></houseItem>
      <houseItem leftContent='表总价' :redContent="room.bamount" rightContent="元" v-if="room.bamount != null"></houseItem>
    </div>
    <div v-for="customer in houseMess.customer">
      <div class="customer-mess">
        <div class="left">
          <img src="../../assets/customer-mess.png">
          <span>客户信息</span>
        </div>
        <clear></clear>
      </div>
      <houseItem leftContent='客户姓名' :rightContent="customer.custname" v-if="customer.custname != null"></houseItem>
      <houseItem leftContent='证件类型' :rightContent="customer.cardtype" v-if="customer.cardtype != null"></houseItem>
      <houseItem leftContent='证件号码' :rightContent="formats(customer.cardcode)" v-if="customer.cardcode != null"></houseItem>
      <houseItem leftContent='电话' :rightContent="format(customer.tel)" v-if="customer.tel != null"></houseItem>
      <houseItem leftContent='成交渠道' :rightContent="customer.cjqd" v-if="customer.cjqd != null"></houseItem>
    </div>
    <div v-for="room in houseMess.room">
      <div class="sell-mess">
        <div class="left">
          <img src="../../assets/sell.png">
          <span>销售情况</span>
        </div>
        <clear></clear>
      </div>
      <houseItem leftContent='认购日期' :rightContent="room.rgdate" v-if="room.rgdate != null"></houseItem>
      <houseItem leftContent='签约日期' :rightContent="room.qydate" v-if="room.qydate != null"></houseItem>
      <houseItem leftContent='成交单价' :rightContent="room.cprice + '元/m²'" v-if="room.cprice != null"></houseItem>
      <houseItem leftContent='成交总价' :redContent="room.camount" rightContent="元" v-if="room.camount != null"></houseItem>
      <houseItem leftContent='付款方式' :rightContent="room.paytype" v-if="room.paytype != null"></houseItem>
      <houseItem leftContent='经办人' :rightContent="room.perman" v-if="room.perman != null"></houseItem>
    </div>
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
          begin_date: this.$store.state.manageSaleDate.begin_date,
          end_date: this.$store.state.manageSaleDate.end_date,
          billid: this.$store.state.manageBillid
        }
        let res = await performanceHouse(params)
        console.log(res)
        this.houseMess = res.data.data
      },
      format(data) {
        let test2 = data.replace(/(\d{3})(\d{4})(\d{4})/g, '$1****$3')
        return test2
      },
      formats(data) {
        let test2 = data.replace(/(\d{10})(\d{4})(\d{4})/g, '$1****$3')
        return test2
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
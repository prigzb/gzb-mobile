<template>
  <div class="gzb-receipt-item">
    <div class="gzb-receipt-li ">
      <div class="gzb-title-left">{{project}}</div>
      <div class="gzb-title-right"><span class="gzb-red-number">{{total}}</span>元</div>
      <clear></clear>
    </div>
    <div class="gzb-receipt-li">
      <div class="gzb-num-left">发票内容</div>
      <div class="gzb-num-right">{{content}}</div>
      <clear></clear>
    </div>
    <div class="gzb-receipt-li">
      <div class="gzb-num-left">费率</div>
      <div class="gzb-num-right">{{rate}}%</div>
      <clear></clear>
    </div>
    <div class="gzb-receipt-li">
      <div class="gzb-num-left">税额</div>
      <div class="gzb-num-right">{{tax}}元</div>
      <clear></clear>
    </div>
    <div class="gzb-receipt-li">
      <div class="gzb-num-left">不含税金额</div>
      <div class="gzb-num-right">{{not}}元</div>
      <clear></clear>
    </div>
  </div>
</template>

<script>
import clear from '@/components/clear'
  export default {
    name: 'receiptItem',
    data() {
      return {}
    },
    props: ['project', 'total', 'content', 'not', 'tax', 'rate'],
    computed: {},
    mounted() {},
    methods: {},
    components: {
      clear
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gzb-receipt-item {
  background-color: #FFFFFF;
  width: 100%;
  border-bottom: 1px solid #EAEFF3;
}
.gzb-receipt-li {
  height: 35px;
  line-height: 35px;
  padding: 0 4%;
}
.gzb-title-left {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #3CBAFF;
  float: left;
}
.gzb-title-right {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #030303;
  float: right;
}
.gzb-red-number {
  color: #F25959;
}
.gzb-num-left {
  float: left;
  font-family: PingFangSC-Regular;
  font-size: 13px;
  color: #030303;
}
.gzb-num-right {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #7A797B;
  float: right;
}
</style>

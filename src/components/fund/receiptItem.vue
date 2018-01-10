<template>
  <div class="gzb-receipt-item">
    <div class="gzb-receipt-li">
      <div class="gzb-title-left">{{title}}</div>
      <div class="gzb-title-right"><span class="title-red-color">{{price}}</span>元</div>
      <clear></clear>
    </div>
    <div class="gzb-receipt-li">
      <div class="gzb-num-left">单据张数</div>
      <div class="gzb-num-right">{{number}}张</div>
      <clear></clear>
    </div>
    <div class="gzb-receipt-li">
      <div class="gzb-num-left">备注</div>
      <div class="gzb-num-right">{{remark}}</div>
      <clear></clear>
    </div>
  </div>
</template>

<script>
import clear from '@/components/clear'
  export default {
    name: 'receiptItem',
    props: ['price', 'number', 'remark', 'title'],
    data() {
      return {}
    },
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
.title-red-color{
  color: #F25959;
}
</style>

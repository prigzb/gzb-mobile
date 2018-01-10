<template>
  <div class="gzb-fund-item">
    <div class="gzb-item-left">
      <div class="gzb-item-name">
        {{title}}
      </div>
      <div class="gzb-item-time">
        {{time}}
      </div>
    </div>
    <div class="gzb-item-money">
      <span class="gzb-red-number">{{number}}</span>元
    </div>
  </div>
</template>
<script>
import clear from '@/components/clear'
export default {
  name: 'fundItem',
  props: ['title', 'time', 'number'],
  components: {
    clear
  }
}
</script>
<style scoped>
.gzb-fund-item {
  height: 56px;
  line-height: 56px;
  background-color: #FFFFFF;
  width: 100%;
}
.gzb-item-left {
  float: left;
  padding-left: 4%;
  text-align: left;
}
.gzb-item-name {
  padding-top: 6px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #030303;
  line-height: 24px;
}
.gzb-item-time {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #98A1A8;
  line-height: 20px;
}
.gzb-item-money {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #030303;
  float: right;
  line-height: 50px;
  /*padding-left: 30%;*/
  padding-right: 4%;
}
.gzb-red-number {
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: #F25959;
}
</style>

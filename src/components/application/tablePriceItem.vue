<template>
  <div class="gzb-list-item">
    <div class="gzb-left-content">
      {{title}}
    </div>
    <div class="gzb-right-content">
      <span class="gzb-red-number">{{detail}}</span>元
    </div>
  </div>
</template>
<script>
export default {
  name: 'tableItem',
  props: ['title', 'detail']
}
</script>
<style scoped>
.gzb-list-item {
  height: 32px;
  line-height: 32px;
  padding: 0 4%;
  background-color: #FFFFFF;
}
.gzb-left-content {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #98A1A8;
  float: left;
}
.gzb-right-content {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #030303;
  float: right;
  height: 32px;
}
.gzb-red-number {
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: #F25959;
}
</style>

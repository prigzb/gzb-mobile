<template>
  <div class="gzb-list-item">
    <div class="gzb-left-content">
      {{title}}
    </div>
    <div class="gzb-right-content">
      {{detail}}
    </div>
    <clear></clear>
  </div>
</template>
<script>
import clear from '@/components/clear'
export default {
  name: 'tableItem',
  props: ['title', 'detail'],
  components: {
      clear
    }
}
</script>
<style scoped>
.gzb-list-item {
  /*height: 32px;*/
  /*line-height: 32px;*/
  padding: 6px 4%;
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
  font-size: 14px;
  color: #030303;
  float: right;
  width: 75%;
  text-align: right;
  word-wrap:break-word;
  /*white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;*/
}
</style>

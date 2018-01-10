<template>
  <div class="gzb-travel-item" @click="toDetail" v-bind:class="[color]">
      <div class="gzb-travel-title">
          <div class="gzb-travel-icon">
          </div>
          <div class="gzb-travel-location">
            <span>{{title}}</span>
          </div>
            <div class="gzb-travel-status">
              <span class="color-change">{{status}}</span>
            </div>
          <clear></clear>
      </div>
      <div class="gzb-travel-content">
          <div class="gzb-content-item">
            <div class="gzb-content-title">
              <span>开始日期</span>
            </div>
            <div class="gzb-content-detail">
              <span>{{tFrom}}</span>
            </div>
          </div>
          <div class="gzb-content-item">
            <div class="gzb-content-title">
              <span>结束日期</span>
            </div>
            <div class="gzb-content-detail">
              <span>{{tTo}}</span>
            </div>
          </div>
          <div class="gzb-content-item">
            <div class="gzb-content-title">
              <span>预计费用</span>
            </div>
            <div class="gzb-content-detail">
              <span class="red-color">{{number}}</span>
            </div>
          </div>
          <clear></clear>
      </div>
  </div>
</template>
<script>
import clear from '@/components/clear'
export default {
    name: 'travelItem',
    props: ['title', 'status', 'color', 'tFrom', 'tTo', 'people', 'number', 'travelType', 'id'],
    components: {
        clear
    },
    methods: {
        toDetail() {
            this.$router.push('/travelDispatchList/' + this.id)
        }
    }
}
</script>

<style scoped>
.gzb-travel-item {
    background-color: #FFFFFF;
    margin: 8px 0;
}
.gzb-travel-title {
    width: 92%;
    background: url('../../assets/position.png') no-repeat left 9px;
    background-size: 22px auto;
    line-height: 44px;
    border-bottom: 1px solid #EAEFF3;
    margin: 0 4%;
}
.gzb-travel-location {
    float: left;
    padding: 9px 0 9px 34px;
    font-size: 16px;
    color: #030303;
    text-align: left;
    line-height: 26px;
    width: 146px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.gzb-travel-status {
    float: right;
    /*padding: 0 12px 0 0;*/
    font-family: PingFangSC-Regular;
    font-size: 14px;
}
.gzb-travel-icon {
    width: 4%;
    height: 44px;
    float: right;
    background: url('../../assets/arrow-right.png') no-repeat center right;
    background-size: 6px auto;
}
.gzb-travel-content {
    width: 100%;
}
.gzb-content-item {
    width: 33.33333333%;
    float: left;
    height: 80px;
}
.gzb-content-title {
    padding: 14px 16px 10px 16px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #98A1A8;
}
.gzb-content-detail {
    padding-bottom: 17px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #030303;
}
.gzb-content-detail .red-color{
  color: #F35959;
}
.gzb-content-detail span{
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
.color-green{
  color: #01D386;
}
.color-grey{
  color: #98A1A8;
}
.color-grey .gzb-travel-location{
  color: #98A1A8;
}
.color-grey .gzb-content-detail{
  color: #98A1A8;
}
.color-grey .red-color{
  color: #98A1A8;
}
.color-yellow{
  color: #F7BF28;
}
.color-blue{
  color: #3CBAFF;
}
</style>

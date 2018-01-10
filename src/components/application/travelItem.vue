<template>
  <div class="gzb-travel-item" @click="toDetail">
      <div class="gzb-travel-title" v-bind:class="[travelType]">
          <div class="gzb-travel-icon">
          </div>
          <div class="gzb-travel-location">
            <span>{{title}}</span>
          </div>
            <div class="gzb-travel-status" v-bind:class="[color]">
              <span>{{status}}</span>
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
              <span>出差人数</span>
            </div>
            <div class="gzb-content-detail">
              <span>{{people}}</span>
            </div>
          </div>
          <div class="gzb-content-item">
            <div class="gzb-content-title">
              <span>预计费用</span>
            </div>
            <div class="gzb-content-detail">
              <span class="gzb-red">{{number}}</span>
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
            this.$router.push('/approval/' + this.id)
        }
    }
}
</script>

<style scoped>
.gzb-red {
    color: #F35959
}
.gzb-travel-item {
    background-color: #FFFFFF;
    margin: 8px 0;
}
.gzb-travel-title {
    width: 92%;
    line-height: 44px;
    border-bottom: 1px solid #EAEFF3;
    margin: 0 4%;
}
.gzb-flight {
    background: url('../../assets/travel-flight.png') no-repeat left 9px;
    background-size: 22px auto;
}
.gzb-train {
    background: url('../../assets/travel-train.png') no-repeat left center;
    background-size: 22px auto;
}
.gzb-bus {
    background: url('../../assets/travel-bus.png') no-repeat left center;
    background-size: 22px auto;
}
.gzb-travel-location {
    text-align: left;
    float: left;
    padding: 0 34px;
    font-size: 16px;
    color: #030303;
    width: 194px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}
.gzb-travel-status {
    float: right;
    /*padding: 0 12px;*/
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #3CBAFF;
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
    width: 25%;
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.gzb-green {
  color: #01D386;
}
.gzb-bule {
  color: #3CBAFF;
}
.gzb-yellow {
  color: #F7BF28;
}
.gzb-gray {
  color: #98A1A8;
}
</style>

<template>
  <div class="history-box">
    <ul>
      <li v-bind:class="{'curr': index === 0}" v-for="(item,index) in flow">
        <span></span>
        <div class="history-status"><span>[{{item.checkman}}]</span> {{item.approveresult === '' ? '待审批' : item.approveresult }}{{item.checknote === '' ? '' : ':' + item.checknote}}</div>
        <div class="history-time">{{item.dealdate}}</div>
      </li>
    </ul>
  </div>
</template>
<script>

import clear from '@/components/clear'
export default {
    name: 'travelItem',
    components: {
        clear
    },
    data() {
        return {
            flow: this.$store.state.workflow
        }
    }
}
</script>
<style scoped>
  .history-box{
    text-align: left;
    padding: 20px 6%;
    background-color: #fff;
    min-height: 100%;
    -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
        box-sizing: border-box;
  }
  .history-box ul li{
    /*padding-left: 24px;*/
    /*height: 72px;*/
    /*border-left: 1px solid #EAEFF3;*/
    position: relative;
  }
  .history-box ul li >span{
    padding-top: 6px;
    display: inline-block;
    background: url(../../assets/history-grey.png) no-repeat center bottom;
    background-size: 9px auto;
    position: absolute;
    top: 6px;
    left: -6px;
    width: 13px;
    height: 13px;
  }
  /*.history-box ul li.curr:first-child >span{
    background: #fff url(../../assets/history-blue.png) no-repeat center bottom;
    background-size: 13px auto;
  }
  .history-box ul li:first-child >span{
    background: #fff url(../../assets/history-grey.png) no-repeat center bottom;
    background-size: 9px auto;
  }
  .history-box ul li:last-child{
    border-left: 1px solid #fff;
  }*/
  .history-box ul li.curr >span{
    background: url(../../assets/history-blue.png) no-repeat center bottom;
    background-size: 13px auto;
  }
  .history-status{
    font-size: 14px;
    color: #030303;
    line-height: 28px;
    padding-left: 24px;
    margin-top: -10px;
  }
  .history-status span{
    color: #3CBAFF;
  }
  .history-time{
    font-size: 12px;
    color: #98A1A8;
    height: 50px;
    border-left: 1px solid #EAEFF3;
    margin-top: -10px;
    padding: 10px 0 10px 24px;
  }
  .history-box ul li:last-child .history-time{
    border-left: 1px solid #fff;
  }
</style>

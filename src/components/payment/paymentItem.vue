<template>
  <div class="gzb-fund-item" @click="toDetail">
    <div class="gzb-fund-title">
      {{title}}
    </div>
    <div class="gzb-fund-detail">
      <div class="gzb-fund-number" v-if="number !== ''">
        <span class="gzb-fund-numicon">¥</span>
        {{number}}
      </div>
      <div class="gzb-fund-status" v-bind:class="[color]">{{status}}</div>
    </div>
  </div>
</template>

<script>
import clear from '@/components/clear'
  export default {
    name: 'paymentItem',
    data() {
      return {}
    },
    props: ['title', 'number', 'status', 'color', 'id'],
    computed: {},
    mounted() {},
    methods: {
        toDetail() {
            this.$router.push('/payment/receipt/' + this.id)
        }
    },
    components: {
      clear
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gzb-fund-item {
  /*height: 75px;*/
  background-color: #FFFFFF;
  margin-top: 8px;
  padding:0 4%;
}
.gzb-fund-title {
  /*height: 38px;*/
  line-height: 38px;
  background: url('../../assets/payment.png') no-repeat left 8px;
  background-size: 20px auto;
  padding: 0 0 0 11.5%;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #030303;
  text-align: left;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.gzb-fund-detail {
  height: 37px;
  line-height: 37px;
  padding-left: 11.5%;
  text-align: left;
}
.gzb-fund-number {
  float: left;
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #F25959;
}
.gzb-fund-numicon {
  font-size: 14px;
}
.gzb-fund-status {
  float: right;
  font-family: PingFangSC-Regular;
  font-size: 14px;
}
.gzb-green {
  color: #01D386;
}
.gzb-blue {
  color: #3CBAFF;
}
.gzb-yellow {
  color: #F7BF28;
}
.gzb-gray {
  color: #98A1A8;
}
</style>

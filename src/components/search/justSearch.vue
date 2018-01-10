<template>
  <div>
    <div class="search-header">
      <div class="just-input">
        <input placeholder="搜索 申请人、单据编号" disabled="disabled">
        <clear></clear>
      </div>
      <clear></clear>
    </div>
  </div>
</template>

<script>
  import paymentItem from '@/components/payment/paymentItem'
  import clear from '@/components/clear'
  export default {
    name: 'index',
    data() {
      return {
        listshown: false
      }
    },
    computed: {},
    mounted() {},
    methods: {
      showlist() {
        this.listshown = !this.listshown
      }
    },
    components: {
      paymentItem,
      clear
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .search-header{
    height: 44px;
    padding: 0 4%;
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
  }
  .just-input{
    /*float: left;*/
    width: 100%;
    border-radius: 100px;
    height: 28px;
    text-align: center;
    overflow: hidden;
    margin-top: 8px;
    background-color: #F0F4F7;
  }
  .just-input input{
    /*width: 100%;*/
    padding-left: 30px;
    height: 26px;
    background-color: #F0F4F7;
    border: 0;
    text-align: center;
    background: url(../../assets/glass-grey.png) no-repeat 8px center;
    background-size: 13px auto;
    /*float: right;*/
  }
</style>
<template>
  <div>
    <div class="search-header">
      <div class="frame-input">
        <span class="frame-del"></span>
        <input placeholder="搜索 申请人、单据编号">
        <clear></clear>
      </div>
      <div class="frame-cancel">取消</div>
      <clear></clear>
    </div>
    <div class="search-content">
        <ul>
          <li>
            <div class="order-no">No.499849405494</div>
            <div class="li-box">
              <div class="content-li-first icon-chai">
                <div class="first-name"><span>张三</span><span>差旅费报销</span></div>
                <div class="first-date">2017-04-17</div>
                <clear></clear>
              </div>
              <div class="content-li-second">
                <div class="second-money">¥ <span>43,600.00</span></div>
                <div class="second-state green-color">已通过</div>
                <clear></clear>
              </div>
            </div>
          </li>
          <li>
            <div class="order-no">No.499849405494</div>
            <div class="li-box">
              <div class="content-li-first icon-fei">
                <div class="first-name"><span>张三</span><span>费用报销</span></div>
                <div class="first-date">2017-04-17</div>
                <clear></clear>
              </div>
              <div class="content-li-second">
                <div class="second-money">¥ <span>43,600.00</span></div>
                <div class="second-state green-color">已通过</div>
                <clear></clear>
              </div>
            </div>
          </li>
          <li>
            <div class="order-no">No.499849405494</div>
            <div class="li-box">
              <div class="content-li-first icon-zi">
                <div class="first-name"><span>张三</span><span>资金支付</span></div>
                <div class="first-date">2017-04-17</div>
                <clear></clear>
              </div>
              <div class="content-li-second">
                <div class="second-money">¥ <span>43,600.00</span></div>
                <div class="second-state grey-color">未通过</div>
                <clear></clear>
              </div>
            </div>
          </li>
        </ul>
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
  }
  .frame-input{
    float: left;
    width: 88%;
    border-radius: 100px;
    height: 28px;
    text-align: right;
    overflow: hidden;
    margin-top: 8px;
    background: #F0F4F7 url(../../assets/glass-grey.png) no-repeat 8px center;
    background-size: 13px auto;
  }
  .frame-del{
    display: inline-block;
    width: 10%;
    height: 28px;
    background: url(../../assets/search-close.png) no-repeat left center;
    background-size: 20px auto;
    float: right;
  }
  .frame-input input{
    width: 80%;
    height: 26px;
    background-color: #F0F4F7;
    border: 0;
    float: right;
  }
  .frame-cancel{
    float: right;
    line-height: 44px;
    font-size: 15px;
    color: #3CBAFF;
  }
  .search-content{
    text-align: left;
    margin-top: 52px;
  }
  .search-content .content-time{
    line-height: 30px;
    padding: 0 4%;
    font-size: 13px;
    color: #98A1A8;
  }
  .search-content ul{
  }
  .search-content ul li{
    background-color: #fff;
    /*padding: 0 4%;*/
    margin-bottom: 8px;
  }
  .content-li-first{
    padding: 12px 0 6px;
    font-size: 16px;
  }
  .content-li-first .first-name{
    float: left;
    padding-left: 28px;
  }
  .content-li-first .first-name span{
    padding: 0 6px;
    border-right: 1px solid #9BA4AB;
    line-height: 22px;
  }
  .content-li-first .first-name span:last-child{
    border-right: 0;
  }
  .content-li-first .first-date{
    float: right;
  }
  .first-date{
    font-size: 12px;
    color: #98A1A8;
    line-height: 22px;
  }
  .content-li-second{
    padding: 0 0 10px 34px;
    font-size: 14px;
  }
  .content-li-second .second-money{
    float: left;
    color: #F25959;
  }
  .content-li-second .second-money span{
    font-size: 18px;
  }
  .content-li-second .second-state{
    float: right;
    font-size: 14px;
  }
  .second-state.blue-color{
    color: #3CBAFF;
  }
  .second-state.grey-color{
    color: #98A1A8;
  }
  .second-state.green-color{
    color: #01D386;
  }
  .content-li-first.icon-chu{
    background: url(../../assets/fund-blue.png) no-repeat left center;
    background-size: 22px auto;
  }
  .content-li-first.icon-chai{
    background: url(../../assets/fund-yellow.png) no-repeat left center;
    background-size: 22px auto;
  }
  .content-li-first.icon-fei{
    background: url(../../assets/fund-green.png) no-repeat left center;
    background-size: 22px auto;
  }
  .content-li-first.icon-zi{
    background: url(../../assets/payment.png) no-repeat left center;
    background-size: 22px auto;
  }
  li .order-no{
    font-size: 13px;
    color: #98A1A8;
    line-height: 30px;
    padding: 0 4%;
    border-bottom: 1px solid #EAEFF3;
  }
  li .li-box{
    padding: 0 4%;
  }
</style>
<template>
  <div>    
    <div class="dispatch-list-con">
      <div class="con-title">
        <div class="title-left plane-icon">上海</div>
        <div class="title-right order-no">No.499849405494</div>
        <clear></clear>
      </div>
      <div>
        <tableItem title="单据日期" detail="2017-03-20"></tableItem>
        <tableItem title="出差事由" detail="项目供应商合作考核"></tableItem>
        <tableItem title="报销公司" detail="葛洲坝地产"></tableItem>
        <tableItem title="报销人员" detail="科技信息部 张三"></tableItem>
        <tableItem title="费用承担公司" detail="葛洲坝地产"></tableItem>
        <tableItem title="费用承担部门" detail="科技信息部"></tableItem>
        <div class="gzb-content-png">
          <div class="gzb-left-content">
            附件图片
          </div>
          <div>
            <img src="../../assets/logo.png" class="gzb-png-right gzb-png-first">
          </div>
        </div>
      </div>
    </div>
    <!-- 合计金额 -->
    <div class="dispatch-list-money">
      <div class="con-title">
        <div class="title-left money-icon">合计金额</div>
        <div class="title-right red-money"><span>3900.00</span>元</div>
        <clear></clear>
      </div>
      <div class="money-spread">
        <div class="spread-tit">
          <div class="tit-left">
            <div class="adress-blue">北京-上海</div>
            <div class="adress-date">4月3日-4月4日</div>
          </div>
          <div class="tit-right"><span>1900.00</span>元</div>
          <clear></clear>
        </div>
        <div class="spread-item">
          <div class="item-left">路费</div>
          <div class="item-right">1600.00元</div>
          <clear></clear>
        </div>
        <div class="spread-item">
          <div class="item-left">市内交通费</div>
          <div class="item-right">1600.00元</div>
          <clear></clear>
        </div>
        <div class="spread-item">
          <div class="item-left">住宿费</div>
          <div class="item-right">1600.00元</div>
          <clear></clear>
        </div>
      </div>
      <div class="money-spread">
        <div class="spread-tit">
          <div class="tit-left">
            <div class="adress-blue">上海-北京</div>
            <div class="adress-date">4月3日-4月4日</div>
          </div>
          <div class="tit-right"><span>1900.00</span>元</div>
          <clear></clear>
        </div>
        <div class="spread-item">
          <div class="item-left">路费</div>
          <div class="item-right">1600.00元</div>
          <clear></clear>
        </div>
        <div class="spread-item">
          <div class="item-left">市内交通费</div>
          <div class="item-right">1600.00元</div>
          <clear></clear>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="dispatch-hold-btn">
      <div class="btn-del grey-color">
        <div class="del-icon">删除</div>
      </div>
      <div class="btn-edit grey-color">
        <div class="edit-icon">编辑</div>
      </div>
      <div class="btn-submit blue-color">
        <div class="submit-icon">提交</div>
      </div>
    </div>
  </div>
</template>
<script>
  import tableItem from '@/components/application/tableItem'
  import fundItem from '@/components/application/fundItem'
  import clear from '@/components/clear'
  export default {
    name: 'approval',
    components: {
      tableItem, fundItem, clear
    },
    data() {
      return {
        fundDetail: false
      }
    },
    methods: {
      showFundDetail() {
        this.fundDetail = !this.fundDetail
      }
    }
  }
</script>
<style scoped>
.dispatch-list-con{
  background-color: #fff;
  margin-bottom: 8px;
}
.dispatch-list-con .con-title{
  line-height: 44px;
  margin-left: 4%;
  padding-right: 4%;
  border-bottom: 1px solid #EAEFF3;
}
.dispatch-list-con .title-left{
  float: left;
  padding-left: 34px;
}
.dispatch-list-con  .plane-icon{
  background: url(../../assets/travel-flight.png) no-repeat left center;
  background-size: 22px auto;
}
.dispatch-list-con .title-right{
  float: right;
}
.dispatch-list-con .order-no{
  font-size: 13px;
  color: #98A1A8;
}
.gzb-content-png {
  height: 72px;
  padding: 0 4%;
}
.gzb-left-content {
  font-size: 12px;
  color: #98A1A8;
  float: left;
  line-height: 32px;
}
.gzb-png-right {
  margin-right: 6px;
  margin-top: 6px;
  height: 54px;
  width: 54px;
  float: right;
}
.gzb-png-first {
  margin-right: 0px;
}

.dispatch-list-money{
  background-color: #fff;
  margin-bottom: 52px;
}
.dispatch-list-money .con-title{
  line-height: 44px;
  margin-left: 4%;
  padding-right: 4%;
}
.dispatch-list-money .title-left{
  float: left;
  padding-left: 34px;
}
.dispatch-list-money .money-icon{
  background: url(../../assets/fund.png) no-repeat left center;
  background-size: 22px auto;
}
.dispatch-list-money .title-right{
  float: right;
}
.dispatch-list-money .red-money{
  font-size: 12px;
  color: #030303;
  padding-right: 24px;
  background: url(../../assets/arrow-down.png) no-repeat right center;
  background-size: 12px auto;
}
.dispatch-list-money .red-money span{
  font-size: 18px;
  color: #F25959;
  margin-right: 2px;
}
/*合计金额展开*/
.money-spread{
  font-size: 12px;
  padding-right: 4%;
  margin-left: 4%;
  border-top: 1px solid #EAEFF3;
}
.money-spread .tit-left{
  float: left;
  text-align: left;
}
.money-spread .tit-right{
  float: right;
  line-height: 54px;
}
.money-spread .tit-right span{
  font-size: 14px;
  color: #F25959;
}
.money-spread .adress-blue{
  font-size: 14px;
  color: #3CBAFF;
  line-height: 24px;
  margin-top: 6px;
}
.money-spread .adress-date{
  color: #98A1A8;
}
.spread-item{
  line-height: 36px;
}
.spread-item .item-left{
  float: left;
  font-size: 13px;
  color: #030303;
}
.spread-item .item-right{
  float: right;
  color: #7A797B;
}
/*底部*/
.dispatch-hold-btn{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  line-height: 44px;
  display: flex;
  font-size: 15px;
}
.dispatch-hold-btn >div{
  flex: 1;
}
.dispatch-hold-btn .grey-color{
  border-top: 1px solid #B9C7D2;
  color: #98A1A8;
}
.dispatch-hold-btn .blue-color{
  border-top: 1px solid #3CBAFF;
  background-color: #3CBAFF;
  color: #fff;
}
.btn-del{
  border-right: 1px solid #B9C7D2;
  -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
      box-sizing: border-box;
}
.btn-edit{
  border-right: 1px solid #B9C7D2;
  -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
      box-sizing: border-box;
}
.btn-del .del-icon{
  display: inline-block;
  padding-left: 24px;
  background: url(../../assets/delete.png) no-repeat left center;
  background-size: 18px auto;
}
.btn-edit .edit-icon{
  display: inline-block;
  padding-left: 24px;
  background: url(../../assets/edit.png) no-repeat left center;
  background-size: 18px auto;
}
.btn-submit .submit-icon{
  display: inline-block;
  padding-left: 24px;
  background: url(../../assets/submit.png) no-repeat left center;
  background-size: 18px auto;
}
</style>

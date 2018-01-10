<template>
  <div class="index-height">
  <!-- <img src="../assets/index-banner.png"> -->
    <div class="index-banner"></div>
    <div class="index-item">
      <router-link to='/hello' class="item-chu"><span class="icon-chu">出差申请</span></router-link>
      <router-link to='/indexTravel' class="item-chai"><span class="icon-chai">差旅费报销</span></router-link>
      <router-link to='/fund' class="item-fei"><span class="icon-fei">费用报销</span></router-link>
      <router-link to='/payment' class="item-zi"><span class="icon-zi">资金支付</span></router-link>
    </div>
      <yd-popup v-model="showAlert" position="center" width="70%">
          <p style="text-align: center; margin: 20px 7px 20px 7px;font-size: 16px;">
              {{alertContent}}
          </p>
          <p style="text-align: center; margin-top: 20px;">
              <yd-button @click.native="showAlert = false" size="large" bgcolor="#61b8f9" color="#fff">关闭</yd-button>
          </p>
      </yd-popup>
      <y-loading v-if="showload" content="加载中...">
          <img src="../assets/loading.gif" slot="icon"/>
      </y-loading>
  </div>
</template>

<script>
  // import ready from '@/components/Ready'
  import travelPriceItem from '@/components/approval/travelPriceItem'
  import clear from '@/components/clear'
//  import {getUserInfo} from '@/api/getData'

  export default {
      name: 'travelPrice',
      data() {
          return {
              listshown: false,
              geturl: 'http://61.136.222.247:8086//servlet/MobileApproveServlet',
              showAlert: false,
              alertContent: '',
              showload: true
          }
      },
      components: {
          travelPriceItem, clear
      },
      methods: {
          gzbAlert(content) {
              this.alertContent = content
              this.showAlert = true
          },
          showlist() {
            this.listshown = !this.listshown
          },
          getUser() {
              let user = sessionStorage.getItem('user')
              if (!user || user === '') {
                  this.gzbAlert('未获取到用户信息，请重新打开轻应用')
                  return false
              }
              user = JSON.parse(user)
              this.$store.commit('setUserInfo', user)
          }
      },
      created: function() {
          this.getUser()
          this.$store.commit('setSearchType', '')
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index-height{
  width: 100%;
  height: 100%;
}
.index-banner{
  height: 55%;
  overflow: hidden;
  text-align: center;
  background: url(../assets/index-banner.png) no-repeat center center;
  background-size: auto 100%;
}
.index-banner img{
  height: 100%;
  width: 100%;
}
.index-item{
  padding: 4%;
  height: 45%;
  -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
      box-sizing: border-box;
}
.item-chu{
  width: 48%;
  height: 48%;
  float: left;
  background-color: #fff;
  margin-right: 4%;
  font-size: 14px;
  color: #333;
}
.item-chu >span{
  display: inline-block;
  padding-top: 50%;
}
.item-chai{
  width: 48%;
  height: 48%;
  float: left;
  background-color: #fff;
  /*margin-right: 4%;*/
  font-size: 14px;
  color: #333;
}
.item-chai >span{
  display: inline-block;
  padding-top: 50%;
}
.item-fei{
  width: 48%;
  height: 48%;
  float: left;
  background-color: #fff;
  margin-right: 4%;
  font-size: 14px;
  color: #333;
}
.item-fei >span{
  display: inline-block;
  padding-top: 50%;
}
.item-zi{
  width: 48%;
  height: 48%;
  float: left;
  background-color: #fff;
  /*margin-right: 4%;*/
  font-size: 14px;
  color: #333;
}
.item-zi >span{
  display: inline-block;
  padding-top: 50%;
}
.item-chu{
  margin-bottom: 4%;
}
.icon-chu{
  background: url(../assets/index-chu.png) no-repeat center 36%;
  background-size: auto 50%;
}
.icon-chai{
  background: url(../assets/index-chai.png) no-repeat center 36%;
  background-size: auto 50%;
}
.icon-fei{
  background: url(../assets/index-fei.png) no-repeat center 36%;
  background-size: auto 50%;
}
.icon-zi{
  background: url(../assets/index-zi.png) no-repeat center 36%;
  background-size: auto 50%;
}
</style>

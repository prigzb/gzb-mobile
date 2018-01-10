<template>
  <div class="bg">
    <!--顶部title
    <div class="top-bg">
      <span class="top-back"></span>
      <span class="top-title">顾问助手</span>
    </div>-->
    <!--项目选择栏-->
    <div class="select-project-page" @click="selectProject">
      <span class="select-project-icon"></span>
      <span class="select-text">{{project}}</span>
      <span class="select-into"></span>
    </div>
    <followUrge></followUrge>
    <commonFooter></commonFooter>
  </div>
</template>
<script>
// import ready from '@/components/Ready'
import commonFooter from '@/components/assistant/commonFooter'
import followUrge from '@/components/assistant/followUrge'
import clear from '@/components/clear'
import {XuntongJSBridge} from '@/js/qingjs'

  export default {
    name: 'assIndex',
    data() {
      return {
        type: 'assIndex'
      }
    },
    components: {
      commonFooter, followUrge, clear
    },
    methods: {
      selectProject: function () {
        this.$router.push({path: '/assistant/selectProject/0/' + this.type})
      },
      judgment() {
        let computerSide = XuntongJSBridge.getOS()
        if (computerSide === 'Qing') {
          let isphone = this.$store.state.isphone
          isphone = false
          this.$store.commit('setIsPhone', isphone)
        }
        return this.project
      },
      getUser() {
          let user = sessionStorage.getItem('user')
          let time = sessionStorage.getItem('time')
          console.log(time)
          if (!user || user === '') {
              alert('未获取到用户信息，请重新打开轻应用')
              return false
          }
          user = JSON.parse(user)
          this.$store.commit('setUserInfo', user)
          this.$store.commit('serverTime', time)
      }
    },
    created: function() {
      this.judgment()
      this.getUser()
    },
    computed: {
      project() {
        return this.$store.state.selectedProject.name
      }
    }
  }
</script>
<style scoped>
	.bg {
	  background: #EAEFF3;
	  height: 100%;
	}
	.select-project-page {
	  background: #FFFFFF;
	  height: 44px;
	}
    .select-project-page .select-project-icon {
      display: inline-block;
      float: left;
      width: 22px;
      height: 22px;
      background: url(../../assets/select-project-icon.png) no-repeat center center;
      background-size: 22px 22px;
      margin: 11px 0 11px 3.8%;
    }
    .select-project-page .select-text {
      display: inline-block;
      float: left;
      width: 200px;
      height: 16px;
      font-size: 16px;
      color: #7A797B;
      line-height: 16px;
      margin: 14px 0 14px 3.8%;/*距离父元素最左边宽度为14.4%*/
      overflow: hidden;
      text-align: left;
    }
    .select-project-page .select-into {
      display: inline-block;
      width: 6px;
      height: 12px;
      float: right;
      margin-top: 14px;
      margin-right: 12px;
      background: url(../../assets/unfurled.png) no-repeat center center;
      background-size: 6px 12px;
    }
</style>

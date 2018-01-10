<template>
  <div class="position">
  	<div class="septal-line"></div>
    <div class="common-footer">
      <div class="footer-project index" @click="bgachange"><span :class="{ indexIcon: iisShow, 'iactive': iisActive }"></span><p :class="{ p: iisShow, 'pp': iisActive }">首页</p></div>
      <div class="footer-project client" @click="bgbchange"><span :class="{ clientIcon: cisShow, 'cactive': cisActive }"></span><p :class="{ p: cisShow, 'pp': cisActive }">客户</p></div>
      <div class="footer-project table" @click="bgcchange"><span :class="{ tableIcon: tisShow, 'tactive': tisActive }"></span><p :class="{ p: tisShow, 'pp': tisActive }">销控表</p></div>
      <div class="footer-project performance" @click="bgdchange"><span :class="{ performanceIcon: pisShow, 'pactive': pisActive }"></span><p :class="{ p: pisShow, 'pp': pisActive }">业绩</p></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'commonFooter',
    data() {
      return {
        iisShow: '',
        iisActive: '',
        cisShow: '',
        cisActive: '',
        tisShow: '',
        tisActive: '',
        pisShow: '',
        pisActive: ''
      }
    },
    components: {},
    methods: {
      bga() {
          this.iisShow = false
          this.iisActive = true
          this.cisShow = true
          this.cisActive = false
          this.tisShow = true
          this.tisActive = false
          this.pisShow = true
          this.pisActive = false
      },
      bgb() {
          this.iisShow = true
          this.iisActive = false
          this.cisShow = false
          this.cisActive = true
          this.tisShow = true
          this.tisActive = false
          this.pisShow = true
          this.pisActive = false
      },
      bgc() {
          this.iisShow = true
          this.iisActive = false
          this.cisShow = true
          this.cisActive = false
          this.tisShow = false
          this.tisActive = true
          this.pisShow = true
          this.pisActive = false
      },
      bgd() {
          this.iisShow = true
          this.iisActive = false
          this.cisShow = true
          this.cisActive = false
          this.tisShow = true
          this.tisActive = false
          this.pisShow = false
          this.pisActive = true
      },
      bgachange: function () {
        this.bga()
        this.$router.push({path: '/manage/index'})
      },
      bgbchange: function () {
        this.bgb()
        this.$router.push({path: '/manage/client'})
      },
      bgcchange: function () {
        this.bgc()
        this.$router.push({path: '/manage/table'})
      },
      bgdchange: function () {
        this.bgd()
        this.$router.push({path: '/manage/performance'})
      },
      match() {
        let path = this.$router.resolve(location).location.path
        let a = path.includes('/manage/index')
        let b = path.includes('/manage/client')
        let c = path.includes('/manage/table')
        let d = path.includes('/manage/performance')
        console.log('根路径：' + path + ' ' + a + ' ' + b + ' ' + c + ' ' + d)
        if (a) {
          this.bga()
        } else if (b) {
          this.bgb()
        } else if (c) {
          this.bgc()
        } else if (d) {
          this.bgd()
        }
        return true
      }
    },
    created: function() {
      this.match()
    }
  }
</script>
<style scoped>
  .position {
    position: fixed;
    z-index: 2;
    width: 100%;
    height: 44px;
    bottom: 0;
  }
	.position .septal-line {
		width: 100%;
  	height: 0;
  	border-bottom: 1px solid #EAEFF3;
	}
  .position .common-footer {
    width: 100%;
    height: 44px;
  }
  .position .common-footer .footer-project {
    width: 25%;
    height: 44px;
    background: #FFFFFF;
    float: left;
  }
  .position .common-footer .footer-project span {
    display: block;
    width: 20px;
    height: 20px;
    margin: 6px auto 5px;
  }
  .position .common-footer .footer-project .p {
    font-size: 10px;
    color: #6B777D;
    line-height: 10px;
  }
  .position .common-footer .footer-project .pp {
    font-size: 10px;
    color: #3CBAFF !important;
    line-height: 10px;
  }
  .indexIcon {
    background: url(../../assets/index.png) no-repeat center;
    background-size: 20px 18px;
  }
  .iactive {
    background: url(../../assets/indexClick.png) no-repeat center;
    background-size: 20px 18px;
  }
  .clientIcon {
    background: url(../../assets/client.png) no-repeat center;
    background-size: 18px 20px;
  }
  .cactive {
    background: url(../../assets/clientClick.png) no-repeat center;
    background-size: 18px 20px;
  }
  .tableIcon {
    background: url(../../assets/table.png) no-repeat center;
    background-size: 18px 18px;
  }
  .tactive {
    background: url(../../assets/tableClick.png) no-repeat center;
    background-size: 18px 18px;
  }
  .performanceIcon {
    background: url(../../assets/performance.png) no-repeat center;
    background-size: 18px 18px;
  }
  .pactive {
    background: url(../../assets/performanceClick.png) no-repeat center;
    background-size: 18px 18px;
  }
</style>
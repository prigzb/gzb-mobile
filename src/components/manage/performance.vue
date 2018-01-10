<template>
  <div class="manage-performance">
    <div class="team" @click="jump('team')">
      <div class="left">
        <img src="../../assets/manage-team.png">
        <span>团队管理</span>
        <clear></clear>
      </div>
      <div class="right">
        <img src="../../assets/arrow-right.png">
      </div>
      <clear></clear>
    </div>
    <div class="performance" @click="jump('sale/')">
      <div class="left">
        <img src="../../assets/manage-performance.png">
        <span>销售业绩</span>
        <clear></clear>
      </div>
      <div class="right">
        <img src="../../assets/arrow-right.png">
      </div>
      <clear></clear>
    </div>
    <div class="phone" @click="jump('callVisit')">
      <div class="left">
        <img src="../../assets/manage-phone.png">
        <span>来电来访</span>
        <clear></clear>
      </div>
      <div class="right">
        <img src="../../assets/arrow-right.png">
      </div>
      <clear></clear>
    </div>
    <div class="zaitu" @click="jump('zaitu')">
      <div class="left">
        <img src="../../assets/manage-zaitu.png">
        <span>在途情况</span>
        <clear></clear>
      </div>
      <div class="right">
        <img src="../../assets/arrow-right.png">
      </div>
      <clear></clear>
    </div>
    <commonFooter></commonFooter>
  </div>  
</template>

<script>
  import clear from '@/components/clear'
  import commonFooter from '@/components/manage/commonFooter'

  export default {
    name: 'performance',
    components: {
      commonFooter, clear
    },
    methods: {
      jump(path) {
        let checkedType = this.$store.state.manageSaleCheckedType
        if (path === 'sale/') {
          if (checkedType === '预订') {
            this.$router.push('/manage/performance/' + path)
          } else if (checkedType === '认购') {
            this.$router.push('/manage/performance/' + path + 'subscription')
          } else if (checkedType === '签约') {
            this.$router.push('/manage/performance/' + path + 'sign')
          } else {
            this.$router.push('/manage/performance/' + path + 'payment')
          }
        } else {
            this.$router.push('/manage/performance/' + path)
        }
      }
    }
  }
</script>

<style scoped>
  .team, .performance, .phone, .zaitu {
    height: 44px;
    background: #FFFFFF;
    padding: 0 12px;
    border-bottom: 1px solid #EAEFF3;
  }
  .left {
    height: 44px;
    line-height: 44px;
    float: left;
  }
  .right {
    float: right;
  }
  .left img {
    width: 22px;
    height: 22px;
    display: inline-block;
    margin-right: 12px;
    margin-top: 11px;
    float: left;
  }
  .right img {
    width: 6px;
    height: 12px;
    margin-top: 16px;
  }
  .left span {
    font-size: 16px;
    color: #030303;
  }
</style>


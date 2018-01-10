<template>
  <div class="performanceHouse">
    <div class="house-mess">
      <div class="left">
        <img src="../../assets/house-mess.png">
        <span>房间信息</span>
      </div>
      <clear></clear>
    </div>
    <houseItem leftContent='房间名称' :rightContent='vhname' v-if="vhname != null"></houseItem>
    <houseItem leftContent='户型' :rightContent='vroomname' v-if="vroomname != null"></houseItem>
    <houseItem leftContent='朝向' :rightContent='votname' v-if="votname != null"></houseItem>
    <houseItem leftContent='建筑面积' :rightContent="nbuildarea + 'm²'" v-if="nbuildarea != ''"></houseItem>
    <houseItem leftContent='套内面积' :rightContent="ninarea + 'm²'" v-if="ninarea != ''"></houseItem>
    <houseItem leftContent='表单价' :rightContent="price + '元/m²'" v-if="price != ''"></houseItem>
    <houseItem leftContent='表总价' :redContent="prices" rightContent="元" v-if="prices != ''"></houseItem>
  </div>
</template>

<script>
  import clear from '@/components/clear'
  import houseItem from '@/components/assistant/houseItem'

  export default {
    name: 'assistantHouse',
    components: {
      clear, houseItem
    },
    data() {
      return {
        vhname: this.$store.state.roomMess.vhname,
        vroomname: this.$store.state.roomMess.vroomname,
        votname: this.$store.state.roomMess.votname,
        nbuildarea: (this.$store.state.roomMess.nbuildarea === null) ? '' : this.$store.state.roomMess.nbuildarea,
        ninarea: (this.$store.state.roomMess.ninarea === null) ? '' : this.$store.state.roomMess.ninarea,
        price: (this.$store.state.roomMess.price === null) ? '' : this.$store.state.roomMess.price,
        prices: (this.$store.state.roomMess.prices === null) ? '' : this.$store.state.roomMess.prices
      }
    }
  }
</script>

<style scoped>
  .house-mess {
    background: #FFFFFF;
    height: 46px;
    border: 1px solid #EAEFF3;
    padding: 0 12px;
    line-height: 44px;
  }
  .left {
    font-family: 'PingFangSC-Regular';
    float: left;
    color: #030303;
    font-size: 16px;
  }
  .left img {
    width: 22px;
    height: 22px;
    display: inline-block;
    margin-right: 12px;
    vertical-align: middle;
  }
</style>
<template>
  <div class="floorItem">
    <span class="floor">{{ floorNum.floor }}</span>
    <div>
      <assistantRoomItem v-for='room in floorNum.floor_list' :room='room'></assistantRoomItem>
      <clear></clear>
    </div>
  </div>
</template>

<script>
  import assistantRoomItem from '@/components/assistant/assistantRoomItem'
  import clear from '@/components/clear'

  export default {
    name: 'assistantFloorItem',
    components: {
      assistantRoomItem, clear
    },
    props: ['floorNum']
  }
</script>

<style scoped>
  .floorItem {
    width: auto;
  }
  .floor {
    width: 30px;
    height: 40px;
    line-height: 40px;
    float: left;
    background: #FFFFFF;
    text-align: middle;
    color: #7A797B;
    font-size: 14px;
    border: 1px solid #EAEFF3;
  }
</style>
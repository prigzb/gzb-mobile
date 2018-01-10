<template>
    <div class="roomItem" :class="[getColor(room.vssname)]" @click='toRoomMess'>
      <span>{{ room.vhcell }}-{{ room.vhnum }}</span>
    </div>
</template>

<script>
  import clear from '@/components/clear'

  export default {
    name: 'assistantRoomItem',
    props: ['room'],
    components: {
      clear
    },
    methods: {
      getColor(name) {
        if (name === '可售') {
          return 'blue'
        } else {
          return 'grey'
        }
      },
      toRoomMess() {
        this.$router.push('/assistant/assistantHouse')
        let roomMess = {
          vhname: this.room.vhname,
          vroomname: this.room.vroomname,
          votname: this.room.votname,
          nbuildarea: this.room.nbuildarea,
          ninarea: this.room.ninarea,
          price: this.room.nprice,
          prices: this.room.nmny
        }
        this.$store.commit('setRoomMess', roomMess)
      }
    }
  }
</script>

<style scoped>
  .roomItem {
    float: left;
    width: 64px;
    height: 40px;
    line-height: 40px;
    color: #FFFFFF;
    font-size: 14px;
    border: 1px solid #EAEFF3;
  }
  .grey {
    background: #B9C7D2;
  }
  .blue {
    background: #3CBAFF;
  }
</style>
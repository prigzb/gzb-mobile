<template>
		<div class="roomItem" :class="[getColor(room.vssname)]" @click='toRoomMess'>
			<span>{{ room.vhcell }}-{{ room.vhnum }}</span>
		</div>
</template>

<script>
	import clear from '@/components/clear'

	export default {
    name: 'roomItem',
    props: ['room'],
    components: {
      clear
    },
    methods: {
      getColor(name) {
        if (name === '不可售') {
          return 'grey'
        } else if (name === '可售') {
          return 'blue'
        } else if (name === '认购') {
          return 'red'
        } else if (name === '签约') {
          return 'green'
        } else if (name === '预订') {
          return 'purple'
        }
      },
      toRoomMess() {
        this.$router.push('/manage/houseMess')
        let manageRoomMess = this.room
        this.$store.commit('manageRoomMess', manageRoomMess)
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
	.green {
		background: #94D301;
	}
	.red {
		background: #F35959;
	}
	.blue {
		background: #3CBAFF;
	}
	.purple {
		background: #8C7CFF;
	}
</style>
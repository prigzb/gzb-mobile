<template>
	<div class="floorItem">
		<span class="floor">{{ floorNum.floor }}</span>
		<div>
			<roomItem v-for='room in floorNum.floor_list' :room='room'></roomItem>
			<clear></clear>
		</div>
	</div>
</template>

<script>
	import roomItem from '@/components/manage/roomItem'
	import clear from '@/components/clear'

	export default {
    name: 'floorItem',
    components: {
      roomItem, clear
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
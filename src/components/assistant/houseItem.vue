<template>
	<div class="houseItem">
		<div class="left">{{ leftContent }}</div>
		<div class="right"><span>{{ redContent }}</span>{{ rightContent }}</div>
		<clear></clear>
	</div>
</template>

<script>
	import clear from '@/components/clear'

	export default {
    name: 'houseItem',
    props: ['leftContent', 'rightContent', 'redContent'],
    components: {
      clear
    }
	}
</script>

<style scoped>
	.houseItem {
		background: #FFFFFF;
		height: 46px;
		border: 1px solid #EAEFF3;
		padding: 0 12px;
		line-height: 44px;
		font-size: 14px;
	}
	.left {
		float: left;
		color: #7A797B;
	}
	.right {
		float: right;
		color: #030303;
		width: 70%;
		white-space: nowrap;
		text-align: right;
		overflow: auto;
	}
	.right ::-webkit-scrollbar {
		width: 15px;
		color:red;
	}
	.right span {
		color: #F25959;
		font-size: 18px;
	}
</style>
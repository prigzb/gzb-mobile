<template>
	<div class="performanceBlock">
		<span class="left">{{ leftContent }}</span>
		<clear></clear>
		<div class="middle">
			<div class="reserve">{{ reserveNum }}</div>
			<span>套数(套)</span>
		</div>
	</div>
</template>

<script>
	import clear from '@/components/clear'

	export default {
    name: 'performanceBlock',
    props: ['reserveNum', 'leftContent'],
    components: {
      clear
    }
	}
</script>

<style scoped>
	.performanceBlock {
		height: 196px;
		background: #ffffff;
		font-family: 'PingFangSC-Regular';
		color: #030303;
		font-size: 14px;
		border-radius: 4px;
	}
	.left {
		float: left;
		margin-left: 16px;
		margin-top: 6px;
	}
	.middle {
		margin-top: 34px;
	}
	.reserve {
		color: #3CBAFF;
		font-size: 40px;
	}
	.reserve +span {
		color: #98A1A8;
		font-size: 12px;
	}
</style>
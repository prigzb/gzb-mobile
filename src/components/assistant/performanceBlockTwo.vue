<template>
	<div class="performanceBlockTwo">
		<span class="left">{{ leftContent }}</span>
		<span class="right"></span>
		<clear></clear>
		<div class="middle-top">
			<div class="subscription">{{ subscriptionNum }}</div>
			<span>套数(套)</span>
		</div>
		<div class="middle-bottom">
			<div class="money">{{ subscriptionMoney }}<span>{{ subMoney }}</span></div>
			<span>金额(万元)</span>
		</div>
	</div>
</template>

<script>
	import clear from '@/components/clear'

	export default {
    name: 'performanceBlockTwo',
    props: ['subscriptionNum', 'leftContent', 'subscriptionMoney', 'subMoney'],
    components: {
      clear
    }
	}
</script>

<style scoped>
	.performanceBlockTwo {
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
	.right {
		margin-right: 8px;
		margin-top: 6px;
		width: 14px;
		height: 14px;
		float: right;
		background: url('../../assets/arrow-right-white.png') no-repeat center;
		background-size: 14px 14px;
	}
	.middle-top {
		height: 75px;
		border-bottom: 1px solid #EAEFF3;
	}
	.middle-bottom {
		margin-top: 14px;
	}
	.subscription {
		color: #3CBAFF;
		font-size: 26px;
		margin-top: 14px;
	}
	.subscription +span {
		color: #98A1A8;
		font-size: 12px;
	}
	.money {
		color: #3CBAFF;
		font-size: 26px;
	}
	.money >span {
		font-size: 12px;
	}
	.money +span {
		color: #98A1A8;
		font-size: 12px;
	}
</style>
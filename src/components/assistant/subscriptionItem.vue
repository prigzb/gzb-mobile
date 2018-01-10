<template>
	<div class="subscriptionItem" @click="jump()">
		<div class="left">
			<span>{{ place }}</span>
		</div>
		<div class="right">
			<div>{{ customerName }}</div>
			<span>{{ phone }}</span>
		</div>
		<clear></clear>
	</div>
</template>

<script>
	import clear from '@/components/clear'

	export default {
    name: 'subscriptionItem',
    props: ['customerName', 'phone', 'place', 'billid'],
    components: {
      clear
    },
    methods: {
      jump() {
        let billid = this.billid
        this.$store.commit('setBillid', billid)
        this.$router.push('/assistant/performanceHouse')
      }
    }
	}
</script>

<style scoped>
	.subscriptionItem {
		font-family: 'PingFangSC-Regular';
		height: 55px;
		background: #ffffff;
		padding: 0 12px;
		border-bottom: 1px solid #EAEFF3;
	}
	.left {
		height: 25px;
		margin-top: 15px;
		float: left;
		line-height: 25px;
		font-size: 18px;
		color: #030303;
	}
	.right div {
		font-size: 14px;
		color: #030303;
		text-align: right;
		margin-bottom: 4px;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
	}
	.right span {
		color: #7A797B;
	}
	.right {
		margin-top: 8px;
		float: right;
    width: 70%;
    text-align: right;
	}
</style>
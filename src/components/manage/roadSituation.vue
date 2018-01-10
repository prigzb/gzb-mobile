<template>
	<div>
		<div>
			<div class="up">
				<p class="text">认购未签约</p>
				<clear></clear>
				<div class="div total-number"></div>
				<div class="div overdue"></div>
				<clear></clear>
			</div>
			<div class="down">
				<p class="text">签约未回款</p>
				<clear></clear>
				<div class="div total-number"></div>
				<div class="div overdue"></div>
				<clear></clear>
			</div>
		</div>
		<commonFooter></commonFooter>
	</div>
</template>
<script>
import commonFooter from '@/components/manage/commonFooter'
import clear from '@/components/clear'

  export default {
    name: 'roadSituation',
    components: {
      commonFooter, clear
    }
  }
</script>
<style scoped>
	/*.up {
		width: 100%;
		height: 50%;
	}
	.down {
		width: 100%;
		height: 50%;
	}*/
	.text {
		width: 100%;
		height: 30px;
		padding: 8px 12px 4px;
		text-align: left;
		font-size: 13px;
		color: #98A1A8;
		line-height: 18px;
	}
	.div {
		width: 46.3%;
		height: 196px;
		background: #FFFFFF;
		border-radius: 4px;
	}
	.total-number {
		float: left;
		margin-left: 8px;
	}
	.overdue {
		float: right;
		margin-right: 8px;
	}
</style>
<template>
	<div class="detail-info">
		<div class="line intention-project">
			<span class="title">购房资格</span>
			<span class="content">{{reserve11}}</span>
		</div>
		<div class="line customer-property">
			<span class="title">婚姻状况</span>
			<span class="content">{{fmarriagestatus}}</span>
		</div>
		<div class="line customer-level">
			<span class="title">总价预算</span>
			<span class="content">{{vdef9}}</span>
		</div>
		<div class="line customer-type">
			<span class="title">年龄范围</span>
			<span class="content">{{fagebound}}</span>
		</div>
		<div class="line cognitive-approach">
			<span class="title">教育程度</span>
			<span class="content">{{feducatedegree}}</span>
		</div>
		<div class="line id-name">
			<span class="title">家庭结构</span>
			<span class="content">{{reserve8}}</span>
		</div>
		<div class="line id-number">
			<span class="title">购房用途</span>
			<span class="content">{{fpurpose}}</span>
		</div>
		<div class="line property-consultant">
			<span class="title">年薪</span>
			<span class="content">{{fyearsalary}}</span>
		</div>
		<div class="line registration-time">
			<span class="title">职业分类</span>
			<span class="content">{{foccupationclassify}}</span>
		</div>
		<div class="line remark-column">
			<span class="title">行业</span>
			<span class="content">{{reserve4}}</span>
		</div>
	</div>
</template>
<script>
import clear from '@/components/clear'
  export default {
    name: 'detailInfo',
    data() {
      return {
        reserve11: this.$store.state.personalInfo.entitledTo,
        fmarriagestatus: this.$store.state.personalInfo.maritalStatus.value,
        vdef9: this.$store.state.personalInfo.totalPrice.value,
        fagebound: this.$store.state.personalInfo.ageRange.value,
        feducatedegree: this.$store.state.personalInfo.education.value,
        reserve8: this.$store.state.personalInfo.family,
        fpurpose: this.$store.state.personalInfo.shopPurpose.value,
        fyearsalary: this.$store.state.personalInfo.annualSalary.value,
        foccupationclassify: this.$store.state.personalInfo.occupationItems.value,
        reserve4: this.$store.state.personalInfo.industry
      }
    },
    components: {
      clear
    },
    methods: {}
  }
</script>
<style scoped>
	.detail-info {
		width: 100%;
		background: #FFFFFF;
	}
	.detail-info .line {
		width: 100%;
		height: 32px;
	}
	.title {
		display: inline-block;
		width: 48px;
		height: 17px;
		margin: 8px 12px 7px;
		float: left;
		font-size: 12px;
		color: #98A1A8;
		line-height: 17px;
	}
	.content {
		display: inline-block;
		float: right;
		height: 20px;
		margin: 6px 12px 6px;
		font-size: 14px;
		color: #030303;
		line-height: 20px;
	}
</style>
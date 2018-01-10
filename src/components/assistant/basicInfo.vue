<template>
	<div class="basic-info">
		<div class="line intention-project">
			<span class="title">意向项目</span>
			<span class="content">{{vregplace}}</span>
		</div>
		<div class="line customer-property">
			<span class="title">客户性质</span>
			<span class="content">{{fccategory}}</span>
		</div>
		<div class="line customer-level">
			<span class="title">客户等级</span>
			<span class="content">{{pk_cuslevel}}</span>
		</div>
		<div class="line customer-type">
			<span class="title">客户类型</span>
			<span class="content">{{fcustype}}</span>
		</div>
		<div class="line cognitive-approach">
			<span class="title">认知途径</span>
			<span class="content">{{vkwname}}</span>
		</div>
		<div class="line id-name">
			<span class="title">证件名称</span>
			<span class="content">{{fccardname}}</span>
		</div>
		<div class="line id-number">
			<span class="title">证件号码</span>
			<span class="content">{{vccardnum}}</span>
		</div>
		<div class="line property-consultant">
			<span class="title">置业顾问</span>
			<span class="content">{{user_name}}</span>
		</div>
		<div class="line registration-time">
			<span class="title">登记时间</span>
			<span class="content">{{dregdate}}</span>
		</div>
		<div class="dotted-line"></div>
		<div class="remark-column">
			<span class="remark">备注</span>
			<clear></clear>
			<p class="text">{{vmemo}}</p>
		</div>
	</div>
</template>
<script>
import clear from '@/components/clear'
  export default {
    name: 'basicInfo',
    data() {
      return {
        vregplace: this.$store.state.personalInfo.projectName.value,
        fccategory: this.$store.state.personalInfo.afccategory,
        pk_cuslevel: this.$store.state.personalInfo.level.value,
        fcustype: this.$store.state.personalInfo.customerTypes.value,
        vkwname: this.$store.state.personalInfo.route.value,
        fccardname: this.$store.state.personalInfo.idName.value,
        vccardnum: this.$store.state.personalInfo.id,
        user_name: this.$store.state.personalInfo.auser_name,
        dregdate: this.$store.state.personalInfo.time,
        vmemo: this.$store.state.personalInfo.vmemo
      }
    },
    components: {
      clear
    },
    methods: {}
  }
</script>
<style scoped>
	.basic-info {
		width: 100%;
		background: #FFFFFF;
	}
	.basic-info .line {
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
	.remark {
		display: block;
		height: 17px;
		margin: 6px 12px 4px;
		float: left;
		font-size: 12px;
		color: #98A1A8;
		line-height: 17px;
	}
	.text {
		width: 92.5%;
		margin: 0 12px 8px;
		font-size: 12px;
		color: #7A797B;
		line-height: 17px;
		text-align: left;
		word-wrap: break-word;
	}
	.dotted-line {
	    width: 96.3%;
  	    height: 0;
  	    border-bottom: 1px dotted #EAEFF3;
  	    margin-left: 3.7%;
	}
</style>
<template>
	<div class="addClientDetailed">
		<messHeader2></messHeader2>
		<form>
			<div class="detailedContent">
				<messCheckItem leftContent='购房资格' lContent='是' rContent='否' checkName='house'
				  yesId='house1' noId='house2' :initialPick='this.$store.state.personalInfo.entitledTo'></messCheckItem>
				<messCheckItem leftContent='婚姻状况' lContent='已婚' rContent='未婚' checkName='merry'
				  yesId='marry1' noId='merry2' :initialPick='this.$store.state.personalInfo.maritalStatus.value'></messCheckItem>
				<!-- <messTextItem leftContent='总价预算' placeholder='请输入总价预算' textName='budget' :initialPick='this.$store.state.personalInfo.totalPrice'>
				</messTextItem> -->
				<messChoiceItem leftContent='总价预算' :rightContent='this.$store.state.personalInfo.totalPrice.value' 
		         type='totalPrice'>
				</messChoiceItem>
				<messChoiceItem leftContent='年龄范围' :rightContent='this.$store.state.personalInfo.ageRange.value' 
		         type='ageRange'>
				</messChoiceItem>
				<messChoiceItem leftContent='教育程度' :rightContent='this.$store.state.personalInfo.education.value' type='educationItems'></messChoiceItem>
				<messTextItem leftContent='家庭结构' placeholder='请输入家庭结构' textName='home' :initialPick='this.$store.state.personalInfo.family' type='true'>
				</messTextItem>
				<messChoiceItem leftContent='购房用途' :rightContent='this.$store.state.personalInfo.shopPurpose.value' type='shopPurpose'></messChoiceItem>
				<messChoiceItem leftContent='年薪' :rightContent='this.$store.state.personalInfo.annualSalary.value' type='annualSalary'></messChoiceItem>
				<messChoiceItem leftContent='职业分类' :rightContent='this.$store.state.personalInfo.occupationItems.value' type='occupationItems'></messChoiceItem>
				<messTextItem leftContent='行业' placeholder='请输入行业' textName='industry' :initialPick='this.$store.state.personalInfo.industry'>
				</messTextItem>
				<messTextItem leftContent='职业' placeholder='请输入职业' textName='occupation' :initialPick='this.$store.state.personalInfo.occupation'>
				</messTextItem>
				<messTextItem leftContent='职务' placeholder='请输入职务' textName='duty' :initialPick='this.$store.state.personalInfo.duty'>
				</messTextItem>
				<messTextItem leftContent='工作区域' placeholder='请输入工作区域' textName='workArea' :initialPick='this.$store.state.personalInfo.workArea'>
				</messTextItem>
				<messChoiceItem leftContent='国籍' :rightContent='this.$store.state.personalInfo.nationality.value' type='nationality'>
				</messChoiceItem>
			</div>
		</form>
		<messFooter></messFooter>
	</div>
</template>

<script>
	import messHeader2 from '@/components/assistant/messHeader2'
	import messFooter from '@/components/assistant/messFooter'
	import messChoiceItem from '@/components/assistant/messChoiceItem'
	import messCheckItem from '@/components/assistant/messCheckItem'
	import messTextItem from '@/components/assistant/messTextItem'
	export default {
    name: 'addClientDetailed',
    data() {
      return {
      }
    },
    components:
    {
      messHeader2, messChoiceItem, messCheckItem, messTextItem, messFooter
    },
    methods: {
    },
    created: function() {
    }
  }
</script>

<style scoped>
    .addClientDetailed {
      padding-bottom: 52px;
    }
    form {
	  margin-top: 7px;
	  padding: 0 12px;
	  background: #FFF;
	}
</style>
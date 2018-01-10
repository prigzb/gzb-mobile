<template>
	<div class="detailedMess">
		<messHeader></messHeader>
		<form>
			<div class="detailedContent">
				<messCheckItem leftContent='购房资格' lContent='是' rContent='否' checkName='house'
				  yesId='house1' noId='house2'></messCheckItem>
				<messCheckItem leftContent='婚姻状况' lContent='已婚' rContent='未婚' checkName='merry'
				  yesId='marry1' noId='merry2'></messCheckItem>
				<messTextItem leftContent='总价预算' placeholder='请输入总价预算' textName='budget'>
				</messTextItem>
				<messChoiceItem leftContent='年龄范围' rightContent='请选择年龄范围' 
					:items='ageItems'>
				</messChoiceItem>
				<messChoiceItem leftContent='教育程度' rightContent='请选择教育程度' :items='
				  educationItems'></messChoiceItem>
				<messTextItem leftContent='家庭结构' placeholder='请输入家庭结构' textName='home'>
				</messTextItem>
				<messChoiceItem leftContent='购房用途' rightContent='请选择购房用途' :items='
				  purposeItems'></messChoiceItem>
				<messChoiceItem leftContent='年薪' rightContent='请选择年薪' :items='salaryItems'>
				</messChoiceItem>
				<messChoiceItem leftContent='职业分类' rightContent='请选择职业分类' :items='
				  occupationItems'></messChoiceItem>
				<messTextItem leftContent='行业' placeholder='请输入行业' textName='industry'>
				</messTextItem>
				<messTextItem leftContent='职业' placeholder='请输入职业' textName='occupation'>
				</messTextItem>
				<messTextItem leftContent='职务' placeholder='请输入职务' textName='post'>
				</messTextItem>
				<messTextItem leftContent='工作区域' placeholder='请输入工作区域' textName='workPlace'>
				</messTextItem>
				<messChoiceItem leftContent='国籍' rightContent='请选择国籍' :items='nationalityItems'>
				</messChoiceItem>
			</div>
		</form>
		<messFooter></messFooter>
	</div>
</template>

<script>
	import messHeader from '@/components/assistant/messHeader'
	import messFooter from '@/components/assistant/messFooter'
	import messChoiceItem from '@/components/assistant/messChoiceItem'
	import messCheckItem from '@/components/assistant/messCheckItem'
	import messTextItem from '@/components/assistant/messTextItem'

	export default {
    name: 'detailedMess',
    data() {
      return {
        ageItems: ['0-18', '18-25', '25-40', '40以上'],
        educationItems: ['小学', '初中', '高中', '本科', '研究生'],
        purposeItems: ['住', '当然是住啊', '有钱,你管我', '其他'],
        salaryItems: ['一个马云', '两个马云', '三个马云', '都是假的'],
        occupationItems: ['教师', '码农', '老板'],
        nationalityItems: ['中国', '美国', '英国']
      }
    },
    components:
     {
      messHeader, messChoiceItem, messCheckItem, messTextItem, messFooter
    }
  }
</script>

<style scoped>
	.detailedContent {
		margin-top: 9px;
		margin-bottom: 7px;
	}
</style>
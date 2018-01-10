<template>
	<div class="addClientBasic">
		<!-- <messHeader2></messHeader2> -->
    <messHeader2></messHeader2>
		<form>
   		<messChoiceItem leftContent='意向项目' :rightContent='this.$store.state.personalInfo.projectName.value' 
			asterisk=' *' type='addClientBasic'>
			</messChoiceItem>
			<div class="blank"></div>
			<messTextItem leftContent='客户姓名' placeholder='请输入客户姓名' textName='customerName' 
			asterisk=' *' :initialPick='this.$store.state.personalInfo.customerName'>
			</messTextItem>
			<messCheckItem leftContent='性别' lContent='男' rContent='女' checkName='sex' yesId='gender1' noId='gender2' asterisk=' *' :initialPick='this.$store.state.personalInfo.sex.value'>
			</messCheckItem>
			<messTextItem leftContent='首选联系电话' placeholder='请输入联系电话' textName='phone' 
			asterisk=' *' :initialPick='this.$store.state.personalInfo.telephone' type='true'>
			</messTextItem>
			<messChoiceItem leftContent='认知途径' :rightContent='this.$store.state.personalInfo.route.value' type='route'>
			</messChoiceItem>
			<messChoiceItem leftContent='证件名称' :rightContent='this.$store.state.personalInfo.idName.value' type='idName'>
			</messChoiceItem>
			<messTextItem leftContent='证件号码' placeholder='请输入证件号码' textName='id' :initialPick='this.$store.state.personalInfo.id'>
			</messTextItem>
			<messTextItem leftContent='联系地址' placeholder='请输入联系地址' textName='place' :initialPick='this.$store.state.personalInfo.address'>
			</messTextItem> 
			<messChoiceItem leftContent='客户类型' :rightContent='this.$store.state.personalInfo.customerTypes.value' type="customerType">
			</messChoiceItem>
			<messChoiceItem leftContent='客户级别' :rightContent='this.$store.state.personalInfo.level.value' 
				type='level'>
			</messChoiceItem>
		  <messTextItem leftContent='登记时间' placeholder='时间' textName='time' :initialPick='this.$store.state.personalInfo.time' v-if='timeRemark'>
			</messTextItem> 
			<messCheckItem leftContent='是否关注' lContent='是' rContent='否' checkName='isFollow'
				yesId='follow1' noId='follow2' :initialPick='this.$store.state.personalInfo.focusOn'>
		  </messCheckItem>
		  <div class="remark">
		     <textarea placeholder="请填写备注信息" id="myText" @input="change" v-model="vmemo"></textarea>
		  </div>
		</form>
	  <messFooter></messFooter>
	</div>
</template>

<script>
	import clear from '@/components/clear'
	import messHeader2 from '@/components/assistant/messHeader2'
	import messChoiceItem from '@/components/assistant/messChoiceItem'
	import messCheckItem from '@/components/assistant/messCheckItem'
	import messTextItem from '@/components/assistant/messTextItem'
  import messFooter from '@/components/assistant/messFooter'
	export default {
    name: 'addClientBasic',
    components: {
      messHeader2, messChoiceItem, messCheckItem, messFooter, messTextItem, clear
    },
    data() {
      return {
        vmemo: this.$store.state.personalInfo.vmemo,
        status: this.$store.state.personalInfo.status,
        timeRemark: false,
        projectName: this.$store.state.personalInfo.projectName,
        certificates: [{value: '身份证', code: 0}, {value: '军人证', code: 1}, {value: '护照', code: 2}, {value: '其他', code: 3}, {value: '外籍身份证', code: 4}, {value: '港澳通行证', code: 5}],
        types: [{value: '潜在', code: 4}, {value: '无效', code: 5}, {value: '意向', code: 0}],
        level: [{value: 'A', code: '0001Y910000000057L4B'}, {value: 'B', code: '0001Y910000000057L4C'}, {value: 'C', code: '0001Y910000000057L4D'}, {value: 'D', code: '0001Y910000000057L4E'}, {value: 'E', code: '0001Y910000000057L4F'}]
      }
    },
    methods: {
      getRow() {
        if (this.status === 'alter') {
           this.timeRemark = true
        } else {
           this.timeRemark = false
        }
      },
      change() {
         let txtVal = document.getElementById('myText').value
         let personalInfo = this.$store.state.personalInfo
         personalInfo.vmemo = txtVal
         this.$store.commit('addPersonal', personalInfo)
      }
    },
    watch: {
      vmemo: function() {
        // console.log('sss')
        let text = document.getElementById('myText').value
        let personalInfo = this.$store.state.personalInfo
        personalInfo.vmemo = text
        this.$store.commit('addPersonal', personalInfo)
      }
    },
    created: function() {
      this.getRow()
    }
	}
</script>

<style scoped>
  .addClientBasic {
    padding-bottom: 60px;
  }
  form {
    margin-top: 7px;
  }
	.project {
		background: #ffffff;
		margin-top: 8px;
		font-family: 'PingFangSC-Regular';
		font-size: 14px;
		border: 1px solid #EAEFF3;
		line-height: 44px;
	}
	.left-content {
		float: left;
		color: #7A797B;
		padding-left: 12px;
	}
	.left-content span {
		color: #F35959;
	}
	.right-content {
		float: right;
		color: #030303;
		padding-right: 12px;
	}
	.right-content .right {
		width: 3px;
		height: 6px;
		display: inline-block;
		vertical-align: middle;
		background: url('../../assets/arrow-right.png') no-repeat center;
		background-size: 3px 6px;
	}
	form {
	  margin-top: 7px;
	  padding: 0 12px;
	  background: #FFF;
	}
	.remark {
	   padding: 12px 0;
	   background: #ffffff;
	}
	.remark textarea {
	  padding-left: 10px;
	  width: 100%;
	  height: 120px;
	  font-size: 14px;
	  line-height: 20px;
	  border: 1px solid #EAEFF3;
	}
</style>
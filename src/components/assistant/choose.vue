<template>
	<div class="chooseItems">
		<ul>
			<li v-for="(item, index) in list" @click='change(item)'>{{item.value}}</li>
		</ul>
	</div>
</template>
<script>
    import {addRoute} from '@/api/getData'
    export default {
      name: 'chooseItem',
      data: function() {
        return {
          list: [],
          renderList: [],
          certificates: [{value: '身份证', code: '0'}, {value: '军人证', code: '1'}, {value: '护照', code: '2'}, {value: '其他', code: '3'}, {value: '外籍身份证', code: '4'}, {value: '港澳通行证', code: '5'}],
          type: this.$route.params.type,
          customerType: [{value: '潜在', code: '4'}, {value: '无效', code: '5'}, {value: '意向', code: '0'}],
          level: [{value: 'A', code: '0001Y910000000057L4B'}, {value: 'B', code: '0001Y910000000057L4C'}, {value: 'C', code: '0001Y910000000057L4D'}, {value: 'D', code: '0001Y910000000057L4E'}, {value: 'E', code: '0001Y910000000057L4F'}],
          ageItems: [{value: '0~20', code: '0'}, {value: '20~25', code: '1'}, {value: '25~30', code: '2'}, {value: '30~35', code: '3'}, {value: '35~40', code: '4'}, {value: '40~45', code: '5'}, {value: '45~50', code: '6'}, {value: '50~60', code: '7'}, {value: '60以上', code: '8'}],
          educationItems: [{value: '高中以下', code: '0'}, {value: '大学', code: '1'}, {value: '硕士', code: '2'}, {value: '博士', code: '3'}],
          purposeItems: [{value: '结婚', code: '0'}, {value: '改善', code: '1'}, {value: '养老', code: '2'}, {value: '上学', code: '3'}, {value: '投资', code: '4'}, {value: '其他', code: '5'}],
          salaryItems: [{value: '0~3万', code: '0'}, {value: '3~5万', code: '1'}, {value: '5~10万', code: '2'}, {value: '10~15万', code: '3'}, {value: '15~20万', code: '4'}, {value: '20~30万', code: '5'}, {value: '30万以上', code: '6'}],
          occupationItems: [{value: '机关事业人员', code: '0'}, {value: '专业技术人员', code: '1'}, {value: '办事及有关人员', code: '2'}, {value: '商业和服务人员', code: '2'}, {value: '农林牧渔人员', code: '4'}, {value: '生产和运输人员', code: '5'}, {value: '军人', code: '6'}, {value: '其他', code: '7'}],
          totalPrice: [{value: '250-300万', code: '0'}, {value: '300-350万', code: '1'}, {value: '350-400万', code: '2'}, {value: '400-450万', code: '3'}, {value: '450-500万', code: '4'}, {value: '500-550万', code: '5'}, {value: '550-600万', code: '6'}, {value: '600-650万', code: '7'}, {value: '650-700万', code: '8'}, {value: '700万以上', code: '9'}]
          // totalPrice: ['250-300万', '300-350万', '350-400万', '400-450万', '450-500万', '500-550万', '550-600万', '600-650万', '650-700万', '700万以上']
        }
      },
      methods: {
        getItem() {
           if (this.type === 'idName') {
             this.list = this.certificates
             console.log(this.list)
           } else if (this.type === 'customerType') {
             this.list = this.customerType
           } else if (this.type === 'level') {
             this.list = this.level
           } else if (this.type === 'route') {
             this.list = this.renderList
           } else if (this.type === 'ageRange') {
             this.list = this.ageItems
           } else if (this.type === 'annualSalary') {
             this.list = this.salaryItems
           } else if (this.type === 'occupationItems') {
             this.list = this.occupationItems
           } else if (this.type === 'educationItems') {
             this.list = this.educationItems
           } else if (this.type === 'shopPurpose') {
             this.list = this.purposeItems
           } else if (this.type === 'totalPrice') {
             this.list = this.totalPrice
           } else {
             this.list = ''
           }
        },
        async getlist() {
            let params = {
              // 'pk_project': '00011210000000001ZJI',
              'pk_project': this.$store.state.personalInfo.projectName.code,
              'method': 'selectway'
            }
            let res = await addRoute(params)
            if (res.data.length === 0) {
              return
            } else {
              let obj = res.data.data.list
              for (let i = 0; i < obj.length; i++) {
                let item = {}
                item.code = obj[i].pk_knowway
                item.value = obj[i].vkwname
                this.renderList.push(item)
              }
            }
            // console.log(this.renderList)
        },
        change(item) {
            let personalInfo = this.$store.state.personalInfo
            let itemList = {}
            itemList.value = item.value
            itemList.code = item.code
            // console.log(itemList)
            if (this.type === 'idName') {
              personalInfo.idName = itemList
           } else if (this.type === 'customerType') {
             personalInfo.customerTypes = itemList
           } else if (this.type === 'level') {
             personalInfo.level = itemList
           } else if (this.type === 'route') {
             personalInfo.route = itemList
           } else if (this.type === 'ageRange') {
             personalInfo.ageRange = itemList
           } else if (this.type === 'annualSalary') {
             personalInfo.annualSalary = itemList
           } else if (this.type === 'occupationItems') {
             personalInfo.occupationItems = itemList
           } else if (this.type === 'educationItems') {
             personalInfo.education = itemList
           } else if (this.type === 'shopPurpose') {
             personalInfo.shopPurpose = itemList
           } else if (this.type === 'totalPrice') {
             personalInfo.totalPrice = itemList
           } else {
           }
           this.$store.commit('addPersonal', personalInfo)
           this.$router.go(-1)
        }
      },
      created: function() {
         this.getItem()
         this.getlist()
      }
    }
</script>
<style scoped>
   .chooseItems li{
   	padding-left: 12px;
   	line-height: 42px;
   	height: 44px;
   	border: 1px solid #EAEFF3;
   	background: #FFFFFF;
   	text-align: left;
   }
</style>
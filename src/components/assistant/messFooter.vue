<template>
  <div>
	  <div class="messFooter">
			<input type="button" name="submit" value="提交" @click="addCustomer()"> 
    </div>
    <div>
      <yd-popup v-model="show" position="center" width="80%">
         <p>{{title}}</p>
         <yd-button @click.native="show = false">确认</yd-button>
      </yd-popup>
    </div>
	</div>
</template>

<script>
  import {addCustomer} from '@/api/getData'
  export default {
    name: 'messFooter',
    data: function() {
      return {
        show: false,
        title: '',
        projectName: '',
        time: false
      }
    },
    methods: {
      async addCustomer() {
        if (this.time) return false
        this.time = true
        let personalInfo = this.$store.state.personalInfo
        let _projectCode = personalInfo.projectName.vcode
        let _customerName = personalInfo.customerName
        let _sex = personalInfo.sex.code
        let _telephone = personalInfo.telephone
        // let _id = personalInfo.id
        let _address = personalInfo.address
        let _totalPrice = personalInfo.totalPrice
        let _family = personalInfo.family
        let _industry = personalInfo.industry
        let _occupation = personalInfo.occupation
        let _workArea = personalInfo.workArea
        let _duty = personalInfo.duty
        let _vmemo = personalInfo.vmemo
        // let _route = personalInfo.route.code
        if (_projectCode === '' || _customerName === '' || _sex === '' || _telephone === '') {
            this.show = true
            this.title = '请填写完必填项'
            return
        } else if (_customerName.length > 20) {
            this.show = true
            this.title = '用户名长度过长'
            return
        } else if (_address !== null && _address.length > 20) {
            this.show = true
            this.title = '地址长度过长'
            return
        } else if (_totalPrice !== null && _totalPrice.length > 20) {
            this.show = true
            this.title = '总价预算长度过长'
            return
        } else if (_vmemo !== null && _vmemo.length > 50) {
            this.show = true
            this.title = '备注字段过长'
            return
        } else if (_family !== null && _family.length > 20) {
            this.show = true
            this.title = '家庭结构长度过长'
            return
        } else if (_industry !== null && _industry.length > 20) {
            this.show = true
            this.title = '行业长度过长'
            return
        } else if (_occupation !== null && _occupation.length > 20) {
            this.show = true
            this.title = '职业长度过长'
            return
        } else if (_duty !== null && _duty.length > 20) {
            this.show = true
            this.title = '职务长度过长'
            return
        } else if (_workArea !== null && _workArea.length > 20) {
            this.show = true
            this.title = '工作区域长度过长'
            return
        }
        let budget = this.$store.state.personalInfo.totalPrice.value
        if (budget === '请选择总价预算') {
          budget = ''
        }
        let params = {
        user_id: this.$store.state.userInfo.user_id,
        pk_corp: this.$store.state.personalInfo.projectName.pk_responsecorp,
        pk_psnbasdoc: this.$store.state.userInfo.pk_psnbasdoc,
        pk_psndoc: this.$store.state.userInfo.pk_psndoc,
        fagebound: this.$store.state.personalInfo.ageRange.code,
        fccardname: this.$store.state.personalInfo.idName.code,
        sex: this.$store.state.personalInfo.sex.code,
        fcustype: this.$store.state.personalInfo.customerTypes.code,
        feducatedegree: this.$store.state.personalInfo.education.code,
        fidentitytype: '0',
        fmarriagestatus: this.$store.state.personalInfo.maritalStatus.code,
        foccupationclassify: this.$store.state.personalInfo.occupationItems.code,
        fpurpose: this.$store.state.personalInfo.shopPurpose.code,
        fyearsalary: this.$store.state.personalInfo.annualSalary.code,
        pk_cusleve: this.$store.state.personalInfo.level.code,
        pk_project: this.$store.state.personalInfo.projectName.vcode,
        projectname: this.$store.state.personalInfo.projectName.value,
        profession: this.$store.state.personalInfo.occupation,
        post: this.$store.state.personalInfo.duty,
        trade: this.$store.state.personalInfo.industry,
        family: this.$store.state.personalInfo.family,
        vccardnum: this.$store.state.personalInfo.id,
        vcname: this.$store.state.personalInfo.customerName,
        nationality: this.$store.state.personalInfo.nationality.code,
        address: this.$store.state.personalInfo.address,
        workspace: this.$store.state.personalInfo.workArea,
        budget: budget,
        vpreferredtel: this.$store.state.personalInfo.telephone,
        pk_knowway: this.$store.state.personalInfo.route.code,
        follow: this.$store.state.personalInfo.focusOn,
        qualification: this.$store.state.personalInfo.entitledTo,
        vmemo: this.$store.state.personalInfo.vmemo
        }
        if (personalInfo.status === 'alter') {
          params.method = 'conupdate'
          params.pk_customer = this.$store.state.personalInfo.customerId
          params.vccode = this.$store.state.personalInfo.vccode
          params.vbillno = this.$store.state.personalInfo.vbillno
          params.pk_customer_sellor = this.$store.state.personalInfo.pk_customer_sellor
          params.pk_customerway = this.$store.state.personalInfo.pk_customerway
          params.vdef5 = this.$store.state.personalInfo.vdef5
          params.vdef10 = this.$store.state.personalInfo.vdef10
          params.reserve10 = this.$store.state.personalInfo.reserve10
        } else {
          params.method = 'coninsert'
        }
        // console.log(params)
        let keys = Object.keys(params)
        console.log(keys.length)
        for (let i of keys) {
          // console.log(i)
          console.log(params[i])
          if (params[i] === null) {
            params[i] = ''
          }
        }
        console.log(params)
        // if (params.vpreferredtel !== '' && (/^1[34578]\d{9}$/.test(params.vpreferredtel))) {
        //   console.log('正确')
        // }
        console.log(this.$store.state.path)
        let res = await addCustomer(params)
        this.$router.replace({ path: this.$store.state.path })
        console.log(res)
      }
    }
  }
</script>

<style scoped>
	.messFooter {
	position: fixed;
  background: #ffffff;
  border-top: 1px solid #B9C7D2;
  height: 52px;
  line-height: 52px;
  margin-top: 8px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
	}
	input {
		font-size: 16px;
		width: 100%;
		height: 52px;
		color: #3CBAFF;
		font-family: 'PingFangSC-Regular';
	}
  .yd-popup-content p {
    text-align: center;
    margin: 20px 7px;
    font-size: 16px;
  }
  .yd-popup-content button {
    background-color: rgb(97, 184, 249);
    color: rgb(255, 255, 255);
    width: 33%;
    margin-bottom: 20px;
  }
</style>
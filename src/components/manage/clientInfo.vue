<template>
	<div class="client-item">
      <div class="client-check" v-if="showcheck">
       	<input type="checkbox" name="customer" v-model="pick" :id="id" class="select" @click="cancel">
      	<label :for="id" class="checkbox"><span class="input"></span></label>
      </div>
	  <div class="right">
	  	<div class="client-info" @click="customerInfo">
	  	  <div class="left-info">
	  		<p class="client-name">
	  			<span class="item name">{{name}}</span>
	  			<span class="item status type" v-if="isgrade">{{level}}</span>
	  			<span class="item status grade">{{fcustype}}</span>
	  			<span class="item status late" v-if="isOverDue">逾{{overDue}}天</span>
	  		</p>
	  		<span class="client-phone">{{vpreferredtel}}</span>
	  	  </div>
	  	  <div class="right-content">
	  		<div class="content-label">置业顾问</div>
            <div class="content-label">{{psnname}} </div>
	  	  </div>
	  	  <clear></clear>
	    </div>
	    <div class="dotted-line"></div>
	    <div class="event">
	  	  <span class="behavior">{{fproceedingtype}}</span>
	  	  <span class="behavior-time">{{dproceedingts}}</span>
	    </div>
	  </div>
	  <div class="septal-line"></div>
	</div>
</template>
<script>
import clear from '@/components/clear'
import {getCusDetails} from '@/api/getData'
import {XuntongJSBridge} from '@/js/qingjs'
  export default {
    name: 'clientInfo',
    props: ['name', 'level', 'fcustype', 'vpreferredtel', 'psnname', 'fproceedingtype', 'dproceedingts', 'id', 'showcheck', 'pkmkey', 'bpkmkey', 'isgrade', 'overDue', 'isOverDue', 'pk_psndoc', 'psnbasdoc', 'index'],
    data() {
        return {
            pick: false,
            distributionList: this.$store.state.distributionList
        }
    },
    components: {
      clear
    },
    methods: {
        async customerInfo() {
            if (this.showcheck) return false
            await this.getCusDetail()
            let item = {}
            item.pkmkey = this.pkmkey
            item.bpkmkey = this.bpkmkey
            item.pk_psndoc = this.pk_psndoc
            item.pk_psnbasdoc = this.psnbasdoc
            this.distributionList.set(this.index, item)
            this.$store.commit('setListone', this.distributionList)
            let recordInfo = this.$store.state.recordsInfo
            recordInfo.pk_project = this.pk_project
            recordInfo.name = this.name
            recordInfo.vpreferredtel = this.vpreferredtel
            this.$store.commit('setRecord', recordInfo)
            this.$router.push({path: '/manage/client/customerInfo/' + this.id})
        },
        async alterCustomerInfo() {
            await this.getCusDetail()
            this.$router.push({path: '/assistant/addClientBasic'})
        },
        async getCusDetail() {
            let params = {
                method: 'getDetial',
                pk_customer: this.id
            }
            let res = await getCusDetails(params)
            console.log(res)
            if (res.data.flag === '0') {
                console.log('请求客户详情成功！')
                this.infoList = res.data.data
                this.infoList.afccategory = this.fcCategory(res.data.data.fccategory)
                this.infoList.apk_cuslevel = this.pkCuslevel(res.data.data.pk_cuslevel)
                this.infoList.afcustype = this.fcusType(res.data.data.fcustype)
                this.infoList.afccardname = this.cardName(res.data.data.fccardname)
                this.infoList.afmarriagestatus = this.fmarriagestatus(res.data.data.fmarriagestatus)
                this.infoList.afagebound = this.fageBound(res.data.data.fagebound)
                this.infoList.afeducatedegree = this.educateDegree(res.data.data.feducatedegree)
                this.infoList.afpurpose = this.fPurpose(res.data.data.fpurpose)
                this.infoList.afyearsalary = this.yearSalary(res.data.data.fyearsalary)
                this.infoList.afoccupationclassify = this.classIfy(res.data.data.foccupationclassify)
                this.infoList.afcsex = this.sex(res.data.data.fcsex)
                console.log(this.infoList.afeducatedegree)
                let personalInfo = this.$store.state.personalInfo
                personalInfo.projectName.value = this.infoList.vregplace
                personalInfo.customerName = this.name
                personalInfo.sex.value = this.infoList.afcsex
                personalInfo.telephone = this.infoList.vpreferredtel
                if (this.infoList.vkwname === null) {
                    personalInfo.route.value = '请选择认知途径'
                } else {
                    personalInfo.route.value = this.infoList.vkwname
                }
                personalInfo.idName.value = this.infoList.afccardname
                personalInfo.id = this.infoList.vccardnum
                personalInfo.address = this.infoList.vdef3
                personalInfo.customerTypes.value = this.infoList.afcustype
                personalInfo.level.value = this.infoList.apk_cuslevel
                personalInfo.time = this.infoList.dregdate
                personalInfo.vmemo = this.infoList.vmemo
                if (this.infoList.reserve11 === '有') {
                    personalInfo.entitledTo = '是'
                } else if (this.infoList.reserve11 === '无') {
                    personalInfo.entitledTo = '否'
                } else {
                    personalInfo.entitledTo = this.infoList.reserve11
                }
                personalInfo.maritalStatus.value = this.infoList.afmarriagestatus
                personalInfo.totalPrice.value = this.infoList.vdef9
                personalInfo.ageRange.value = this.infoList.afagebound
                personalInfo.education.value = this.infoList.afeducatedegree
                if (this.infoList.reserve8 === 0) {
                    personalInfo.family = ' '
                } else {
                    personalInfo.family = this.infoList.reserve8
                }
                personalInfo.shopPurpose.value = this.infoList.afpurpose
                personalInfo.annualSalary.value = this.infoList.afyearsalary
                personalInfo.occupationItems.value = this.infoList.afoccupationclassify
                personalInfo.workArea = this.infoList.vdef4
                if (this.infoList.docname === null) {
                    personalInfo.nationality.value = '请选择国籍'
                } else {
                    personalInfo.nationality.value = this.infoList.docname
                }
                personalInfo.industry = this.infoList.reserve4
                personalInfo.occupation = this.infoList.reserve2
                personalInfo.duty = this.infoList.reserve3
                personalInfo.auser_name = this.infoList.user_name
                personalInfo.afccategory = this.infoList.afccategory
                personalInfo.focusOn = this.infoList.vdef6
                personalInfo.status = 'alter'
                personalInfo.customerId = this.id
                personalInfo.vccode = res.data.data.vccode
                personalInfo.vbillno = res.data.data.vbillno
                // code
                personalInfo.projectName.vcode = this.infoList.pk_project
                personalInfo.level.code = this.infoList.pk_cuslevel
                personalInfo.sex.code = this.infoList.fcsex
                personalInfo.route.code = this.infoList.pk_knowway
                personalInfo.idName.code = this.infoList.fccardname
                personalInfo.customerTypes.code = this.infoList.fcustype
                personalInfo.maritalStatus.code = this.infoList.fmarriagestatus
                personalInfo.ageRange.code = this.infoList.fagebound
                personalInfo.education.code = this.infoList.feducatedegree
                personalInfo.shopPurpose.code = this.infoList.fpurpose
                personalInfo.annualSalary.code = this.infoList.fyearsalary
                personalInfo.occupationItems.code = this.infoList.foccupationclassify
                personalInfo.nationality.code = this.infoList.vdef1
                this.$store.commit('addPersonal', personalInfo)
                console.log(personalInfo)
            } else {
                this.infoList = {}
            }
        },
        fcCategory(data) {
            if (data === 0) {
                this.infoList.afccategory = '个人客户'
            } else {
                this.infoList.afccategory = '其他'
            }
            return this.infoList.afccategory
        },
        pkCuslevel(data) {
            switch (data) {
                case '0001Y910000000057L4B':
                    this.infoList.apk_cuslevel = 'A'
                    break
                case '0001Y910000000057L4C':
                    this.infoList.apk_cuslevel = 'B'
                    break
                case '0001Y910000000057L4D':
                    this.infoList.apk_cuslevel = 'C'
                    break
                case '0001Y910000000057L4E':
                    this.infoList.apk_cuslevel = 'D'
                    break
                case '0001Y910000000057L4F':
                    this.infoList.apk_cuslevel = 'E'
                    break
                default:
                    this.infoList.apk_cuslevel = '请选择客户等级'
                    break
            }
            return this.infoList.apk_cuslevel
        },
        fcusType(data) {
            switch (data) {
                case 0:
                    this.infoList.afcustype = '意向'
                    break
                case 1:
                    this.infoList.afcustype = '预定'
                    break
                case 2:
                    this.infoList.afcustype = '认购'
                    break
                case 3:
                    this.infoList.afcustype = '签约'
                    break
                case 4:
                    this.infoList.afcustype = '潜在'
                    break
                case 5:
                    this.infoList.afcustype = '无效'
                    break
            }
            return this.infoList.afcustype
        },
        cardName(data) {
            switch (data) {
                case 0:
                    this.infoList.afccardname = '身份证'
                    break
                case 1:
                    this.infoList.afccardname = '军人证'
                    break
                case 2:
                    this.infoList.afccardname = '护照'
                    break
                case 3:
                    this.infoList.afccardname = '其他'
                    break
                case 4:
                    this.infoList.afccardname = '外籍身份证'
                    break
                case 5:
                    this.infoList.afccardname = '港澳通行证'
                    break
            }
            return this.infoList.afccardname
        },
        fmarriagestatus(data) {
            if (data === 0) {
                this.infoList.afmarriagestatus = '未婚'
            } else if (data === 1) {
                this.infoList.afmarriagestatus = '已婚'
            }
            return this.infoList.afmarriagestatus
        },
        fageBound(data) {
            switch (data) {
                case 0:
                    this.infoList.afagebound = '20以下'
                    break
                case 1:
                    this.infoList.afagebound = '20~25'
                    break
                case 2:
                    this.infoList.afagebound = '25~30'
                    break
                case 3:
                    this.infoList.afagebound = '30~35'
                    break
                case 4:
                    this.infoList.afagebound = '35~40'
                    break
                case 5:
                    this.infoList.afagebound = '40~45'
                    break
                case 6:
                    this.infoList.afagebound = '45~50'
                    break
                case 7:
                    this.infoList.afagebound = '50~60'
                    break
                case 8:
                    this.infoList.afagebound = '60以上'
                    break
                default:
                    this.infoList.afagebound = '请选择年龄范围'
                    break
            }
            return this.infoList.afagebound
        },
        educateDegree(data) {
            if (data > 0) {
                if (data === 1) {
                    this.infoList.afeducatedegree = '大学'
                } else if (data === 2) {
                    this.infoList.afeducatedegree = '硕士'
                } else if (data === 3) {
                    this.infoList.afeducatedegree = '博士'
                }
            } else if (data === 0) {
                this.infoList.afeducatedegree = '高中以下'
            } else if (data === null) {
                // console.log('11111111')
                this.infoList.afeducatedegree = '请选择教育程度'
            }
            console.log(this.infoList.afeducatedegree)
            return this.infoList.afeducatedegree
        },
        fPurpose(data) {
            switch (data) {
                case 0:
                    this.infoList.afpurpose = '结婚'
                    break
                case 1:
                    this.infoList.afpurpose = '改善'
                    break
                case 2:
                    this.infoList.afpurpose = '养老'
                    break
                case 3:
                    this.infoList.afpurpose = '上学'
                    break
                case 4:
                    this.infoList.afpurpose = '投资'
                    break
                case 5:
                    this.infoList.afpurpose = '其他'
                    break
                default:
                    this.infoList.afpurpose = '请选择购房用途'
                    break
            }
            return this.infoList.afpurpose
        },
        yearSalary(data) {
            switch (data) {
                case 0:
                    this.infoList.afyearsalary = '3万以下'
                    break
                case 1:
                    this.infoList.afyearsalary = '3~5万'
                    break
                case 2:
                    this.infoList.afyearsalary = '5~10万'
                    break
                case 3:
                    this.infoList.afyearsalary = '10~15万'
                    break
                case 4:
                    this.infoList.afyearsalary = '15~20万'
                    break
                case 5:
                    this.infoList.afyearsalary = '20~30万'
                    break
                case 6:
                    this.infoList.afyearsalary = '30万以上'
                    break
                default:
                    this.infoList.afyearsalary = '请选择年薪'
                    break
            }
            return this.infoList.afyearsalary
        },
        classIfy(data) {
            switch (data) {
                case 0:
                    this.infoList.afoccupationclassify = '机关事业人员'
                    break
                case 1:
                    this.infoList.afoccupationclassify = '专业技术人员'
                    break
                case 2:
                    this.infoList.afoccupationclassify = '办事及有关人员'
                    break
                case 3:
                    this.infoList.afoccupationclassify = '商业和服务人员'
                    break
                case 4:
                    this.infoList.afoccupationclassify = '农林牧渔人员'
                    break
                case 5:
                    this.infoList.afoccupationclassify = '生产和运输人员'
                    break
                case 6:
                    this.infoList.afoccupationclassify = '军人'
                    break
                case 7:
                    this.infoList.afoccupationclassify = '其他'
                    break
                default:
                    this.infoList.afoccupationclassify = '请选择职业分类'
                    break
            }
            return this.infoList.afoccupationclassify
        },
        sex(data) {
            if (data === 0) {
                this.infoList.afcsex = '男'
            } else {
                this.infoList.afcsex = '女'
            }
            return this.infoList.afcsex
        },
        cancel() {
          console.log(this.pick)
          let android = XuntongJSBridge.getOS()
          if (android === 'android' || android === 'Qing') {
            if (this.pick) {
              this.$emit('newNodeEvent')
              console.log('调用了这个函数')
            }
          } else {
            if (!this.pick) {
              this.$emit('newNodeEvent')
              console.log('调用了这个函数')
            }
          }
        }
    },
    watch: {
        pick: function (newPick) {
            if (this.pick) {
                let item = {}
                item.pkmkey = this.pkmkey
                item.bpkmkey = this.bpkmkey
                item.pk_psndoc = this.pk_psndoc
                item.pk_psnbasdoc = this.psnbasdoc
                this.distributionList.set(this.index, item)
                this.$store.commit('setListone', this.distributionList)
            } else {
                this.distributionList.delete(this.index)
                this.$store.commit('setListone', this.distributionList)
            }
        }
    }
  }
</script>
<style scoped>
    .client-check {
        float: left;
        margin: 45px 12px;
        width: 15px;
        height: 15px;
    }
    .select {
        width: 14px;
        height: 14px;
        float: left;
        border: 1px solid #B9C7D2;
        border-radius: 2px;
        opacity: 0;
    }
    .checkbox {
    	display: inline-block;
    	width: 15px;
    	height: 15px;
    	margin: 0 -15px;
    	float: left;
    }
    .checkbox .input {
    	display: inline-block;
        width: 14px;
        height: 14px;
        border: 1px solid #B9C7D2;
        border-radius: 2px;
    }
    .select:checked + .checkbox .input {
    	border: 1px solid #3CBAFF;
    	background: url(../../assets/checkbox.png) no-repeat center;
    	background-size: 100%;
    }
    .right-content {
        width: 20%;
        float: right;
        padding-top: 12px;
        padding-right: 12px;
        text-align: right;
    }
	.client-item {
		width: 100%;
		height: 105px;
		background: #FFFFFF;
	}
	.client-item .dotted-line {
	    width: 96.3%;
  	    height: 0;
  	    border-bottom: 1px dotted #EAEFF3;
  	    margin-left: 3.7%;
	}
	.client-item .septal-line {
		width: 96.3%;
  	    height: 0;
  	    border-bottom: 1px solid #EAEFF3;
  	    margin-left: 3.7%;
	}
	.client-item .client-info {
		width: 100%;
		height: 70px;
	}
	.client-item .client-info .left-info {
		width: 65.3%;
		height: 100%;
		float: left;
	}
	.client-item .client-info .left-info .client-name {
		display: block;
		height: 28px;
		margin-top: 8px;
	}
	.client-item .client-info .left-info .client-name .item {
		display: inline-block;
		float: left;
	}
	.client-item .client-info .left-info .client-name .name {
		min-width: 48px;
		max-width: 96px;
		height: 28px;
		margin: 0 2px 0 12px;
		font-size: 16px;
		color: #030303;
		line-height: 28px;
		overflow: hidden;
		text-align: left;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.client-item .client-info .left-info .client-name .status {
		min-width: 34px;
		max-width: 54px;
		height: 16px;
		margin: 7px 0 5px 4px;
		border-radius: 100px;
		border: 1px solid;
		font-size: 10px;
		line-height: 16px;
	}
	.client-item .client-info .left-info .client-name .type {
		border-color: #3CBAFF;
		color: #3CBAFF;
	}
	.client-item .client-info .left-info .client-name .grade {
		border-color: #94D301;
		color: #94D301;
	}
	.client-item .client-info .left-info .client-name .late {
		border-color: #B9C7D2;
		color: #B9C7D2;
	}
	.client-item .client-info .left-info .client-phone {
		display: block;
		height: 22px;
		margin: 4px 12px;
		font-size: 14px;
		color: #7A797B;
		line-height: 22px;
		text-align: left;
	}
	.client-item .client-info .right-icon {
		width: 28.7%;
		height: 100%;
		float: left;
	}
	.client-item .client-info .right-icon .phone {
		display: inline-block;
		width: 30px;
		height: 30px;
		margin: 20px 0 20px;
		float: left;
		background: url(../../assets/phone.png) no-repeat center;
		background-size: 30px;
	}
	.client-item .client-info .right-icon .compile {
		display: inline-block;
		width: 30px;
		height: 30px;
		margin: 20px 12px 20px;
		float: right;
		background: url(../../assets/compile.png) no-repeat center;
		background-size: 30px;
	}
	.client-item .event {
		width: 100%;
		height: 33px;
	}
	.event .behavior {
		display: inline-block;
		width: 28px;
		height: 20px;
		line-height: 20px;
		font-size: 14px;
		color: #333333;
		margin: 6px 12px;
		float: left;
	}
	.event .behavior-time {
		display: inline-block;
		width: 125px;
		height: 17px;
		line-height: 17px;
		font-size: 12px;
		color: #98A1A8;
		float: right;
		margin: 7px 12px 9px;
		text-align: right;
	}
</style>

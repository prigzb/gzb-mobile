<template>
	<div class="counsellor">
		<div class="searchBox">
			<div class="searchContent">
				<img src="../../assets/glass-grey.png">
				<input placeholder="置业顾问姓名" v-model='psnname'>
			</div>
		</div>
		<div style="padding-top: 44px;">
		<div class="property-consultant" :class="{ bg: ishide }">
			<div class="checkItem" v-for="(item, index) in consultantList">
				<div class="checkContent left" @click="transference(consultantList[index].apk_psndoc, consultantList[index].apk_psndbasdoc)">
					<input type="radio" :id="consultantList[index].apk_psndoc" name="counsellor">
					<label :for="consultantList[index].apk_psndoc"><span class="name">{{ consultantList[index].apsnname }}</span></label>
				</div>
				<div class="right">
					<p style="height: 25px;">
						<span class="text">转化率：</span>
						<span class="percentage">{{ consultantList[index].apst }}</span>
						<span class="percent">%</span>
					</p>
				</div>
				<clear></clear>
			</div>
		</div>
    <div class="no-content" v-if="consultantList === '' || consultantList.length === 0">
      <img src="../../assets/no-content.png">
    </div>
		</div>
		<div class="sure" @click.once="sure">确定</div>
		<yd-popup v-model="show" position="center" width="80%">
          <p>{{title}}</p>
          <yd-button @click.native="show = false">确认</yd-button>
        </yd-popup>
	</div>
</template>

<script>
import {saleList, personChange, getCusDetails} from '@/api/getData'
import clear from '@/components/clear'

  export default {
    name: 'counsellor',
    data() {
      return {
        psnname: '',
        consultantList: [],
        ishide: false,
        list: [],
        show: false,
        pk_psnbasdoc: '',
        pk_psndoc: '',
        title: ''
      }
    },
    watch: {
      psnname: function (newPsnname) {
        /* this.consultantList = this.consultantList.filter(function(item) {
          if (item.psnname === this.psnname) {
            return item.psnname === this.psnname
          }
        }) */
        if (newPsnname === '') {
          this.getConsultantList()
        } else {
          // console.log(this.psnname)
          this.consultantList = this.list
          this.compare(this.psnname)
        }
      }
    },
    components: {
      clear
    },
    methods: {
      async getConsultantList() {
        let params = {
          method: 'adviserliset',
          fright: this.$store.state.manageProject.fright,
          pk_project: this.$store.state.manageProject.pk_project,
          pk_psndoc: this.$store.state.userInfo.pk_psndoc,
          pk_corp: this.$store.state.manageProject.pk_responsecorp
          // '0001121000000000GZGV'
        }
        let res = await saleList(params)
        if (res.data.flag === '0') {
          console.log('请求成功！')
          this.consultantList = res.data.data.list
          this.list = res.data.data.list
          if (this.consultantList === '' || this.consultantList.length === 0) {
            this.ishide = true
          }
          for (let i = 0; i < this.consultantList.length; i++) {
            this.consultantList[i].apsnname = this.consultantList[i].psnname
            this.consultantList[i].apst = this.fix(this.consultantList[i].pst)
            this.consultantList[i].apk_psndoc = this.consultantList[i].pk_psndoc
            this.consultantList[i].apk_psndbasdoc = this.consultantList[i].pk_psnbasdoc
          }
          // console.log(res)
          // console.log(this.consultantList)
          return true
        } else {
          this.consultantList = []
          this.ishide = true
        }
      },
      compare(msn) {
        this.consultantList = this.list.filter(function(x) {
          if (x.psnname.indexOf(msn) >= 0) {
            return x
          }
        })
        // console.log(this.consultantList)
        if (this.consultantList === '' || this.consultantList.length === 0) {
          this.ishide = true
        } else {
          this.ishide = false
        }
      },
      async sure() {
        console.log('asdasdads')
        if (this.pk_psndoc === '') {
          this.show = true
          this.title = '请选择置业顾问'
        } else {
          let listone = []
          let customerList = [...this.$store.state.distributionList.values()]
          for (let i = 0; i < customerList.length; i++) {
            let item = {}
            item.pkmkey = customerList[i].pkmkey
            item.bcse = 'Y'
            // this.comparePsndoc(this.pk_psndoc, psndocList[i])
            item.pk_psnbasdoc = this.pk_psnbasdoc
            item.pk_psndoc = this.pk_psndoc
            listone.push(item)
          }
          let listtwo = []
          for (let j = 0; j < customerList.length; j++) {
            let item = {}
            item.pkmkey = customerList[j].pkmkey
            item.bpkmkey = customerList[j].bpkmkey
            item.bcse = 'N'
            // this.comparePsndoc(this.pk_psndoc, psndocList[i])
            item.pk_psnbasdoc = customerList[j].pk_psnbasdoc
            item.pk_psndoc = customerList[j].pk_psndoc
            listtwo.push(item)
          }
          // console.log(listone)
          // console.log(listtwo)
          await this.personChange(listone, listtwo)
          await this.getCusDetail()
          this.$router.go(-1)
        }
      },
        async getCusDetail() {
            let params = {
                method: 'getDetial',
                pk_customer: this.$store.state.allotId
            }
            let res = await getCusDetails(params)
            console.log(res)
            let infoList = res.data.data
            if (res.data.flag === '0') {
                console.log('请求客户详情成功！')
                let personalInfo = this.$store.state.personalInfo
                personalInfo.auser_name = infoList.user_name
                this.$store.commit('addPersonal', personalInfo)
                console.log(personalInfo)
            } else {
                infoList = {}
            }
        },
      async personChange(listone, listtwo) {
        let params = {
          method: 'personcharge',
          item_list: listone,
          olditem_list: listtwo
        }
        let res = await personChange(params)
        if (res.data.flag === '0') {
          console.log('分配成功！')
          return true
        } else {
          console.log('分配失败！')
          return false
        }
      },
      transference(dataone, datatwo) {
        this.pk_psndoc = dataone
        this.pk_psnbasdoc = datatwo
      },
      /* comparePsndoc(dataone, datatwo) {
        if (dataone === datatwo) {
          console.log('Y')
          return 'Y'
        } else {
          console.log('N')
          return 'N'
        }
      }, */
      fix(data) {
        return parseFloat(data).toFixed(1)
      }
    },
    created: function() {
      this.getConsultantList()
    }
  }
</script>

<style scoped>
	.counsellor {
		height: 100%;
	}
	.searchBox {
		font-size: 13px;
		color: #98a1a8;
		width: 100%;
		height: 44px;
		padding-top: 8px;
		position: fixed;
		top: 0;
		z-index: 99;
		background: #EAEFF3;
	}
	.searchContent {
		height: 28px;
		width: 90%;
		margin: 0 auto;
		background: #ffffff;
		border-radius: 100px;
		line-height: 28px;
	}
	.searchContent img{
		float: left;
		width: 14px;
		height: 14px;
		margin-left: 30%;
		margin-top: 7px;
	}
	.searchContent input{
		float: left;
    	width: 31.58%;
    	height: 17px;
    	margin: 4.5px 0 6.5px 3%;
    	font-size: 13px;
    	color: #98A1A8;
   		letter-spacing: -0.14px;
    	line-height: 17px;
	}
	::-webkit-input-placeholder { /* WebKit browsers */
		font-family: 'PingFangSC-Regular';
    	color: #98A1A8;
	}
	.property-consultant {
		/* margin-top: 44px; */
	}
	.bg {
		height: 83%;
		background: url(../../assets/no-content.png) no-repeat center;
		background-size: 100%;
	}
	.checkItem {
		height: 44px;
		background: #FFFFFF;
		border: 1px solid #EAEFF3;
		padding: 9px 12px 10px;
	}
	.checkItem .left {
		width: 50%;
		color: #030303;
		float: left;
		margin: 3px 0 2px;
		text-align: left;
		font-size: 14px;
	}
	.checkItem .right {
		float: right;
		margin: 3px 0 2px;
		text-align: left;
	}
	.checkItem .right .text {
		display: inline-block;
		margin: 5px 0 3px;
		width: 48px;
		height: 17px;
		line-height: 17px;
		color: #7A797B;
		float: left;
	}
	.checkItem .right .percentage {
		display: inline-block;
		color: #3CBAFF;
		font-size: 18px;
		height: 25px;
		max-width: 48px;
		line-height: 25px;
		overflow: hidden;
		word-wrap: break-word;
		float: left;
	}
	.checkItem .right .percent {
	    display: inline-block;
		color: #3CBAFF;
		font-size: 18px;
		height: 25px;
		width: 16px;
		line-height: 25px;
		float: left;
	}
	.checkItem input {
		opacity: 0;
		margin: 3px 0 3px;
		width: 14px;
		height: 14px;
	}
	.checkItem label {
		display: inline-block;
		width: 100%;
		margin-left: -18px;
		text-indent: 28px;
		background: url('../../assets/select.png') no-repeat;
		background-size: 14px 14px;
		background-position: 0 3px;
	}
	.checkItem input[type='radio']:checked+label {
		background: url('../../assets/checked.png') no-repeat;
		background-size: 14px 14px;
		background-position: 0 3px;
	}
	.sure {
		width: 100%;
		height: 44px;
		border: 1px solid #EAEFF3;
		line-height: 44px;
		text-align: center;
		color: #3CBAFF;
		font-size: 16px;
		background: #FFFFFF;
		position: fixed;
		bottom: 0;
		z-index: 99;
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
  .no-content img {
    width: 100%;
  }
</style>

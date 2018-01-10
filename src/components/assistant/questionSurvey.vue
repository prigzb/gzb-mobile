<template>
	<div class="wrap"> 
	    <div class="header">
	    	<p>客户调查问卷</p>
            <div class="gzb-list-item">
                <div class="gzb-list-title">
                  <span>{{customList[0].name}}<span class="redxin">*</span></span>
                </div>
                <div class="gzb-list-detail">
                  <yd-datetime type="date" v-model="customList[0].value" slot="right"></yd-datetime>
                </div>
            </div>
            <div class="gzb-list-item">
               <div class="gzb-list-title">
                   <span>{{customList[1].name}}<span class="redxin">*</span></span>
               </div>
               <div class="gzb-list-detail">
               <yd-datetime type="date" v-model="customList[1].value" slot="right"></yd-datetime>
          </div>
      </div>
	    </div>
	    <div class="contentWrap">
	        <div class="content" v-for="(data,index) in renderLists" :key="data.id">
            <p class="contentTitle"><span>{{index + 1}}.</span>{{data.fquestion}}</p>
	        	<div v-if="data.fqmcategory === 1" class="checkWrap">
                <div v-for='(item,oindex) in data.option'>
                <!-- <p>{{item.vanswer}}</p> -->
                    <div v-if="item.iinputtype === 0">
                       <input v-model='data.checkbox' :value='item.vquestcontent' :id='"demo"+index+oindex' type="checkbox" :name="'checkbox'+index" @click="changes(oindex,data,index)">
                       <label :for='"demo"+ index + oindex' v-text='item.vquestcontent' :class="item.checkStatus"></label>
                    </div>
                    <div v-if="item.iinputtype === 1">
                       <input type="text" :name="'input'+index" placeholder="其他" class="checkbox-text" v-model="item.vanswer" maxlength="50">
                    </div>
                </div>
	        	</div>
            <div v-else class="radioWrap">
               <div v-for='(item,oindex) in data.option'>
                   <!-- <p>{{item.vanswer}}</p> -->
                   <div v-if="item.iinputtype === 0">
                        <input class="self-radio" type="radio" :id="'radio'+ index +oindex" :name="'radio' + index" v-model="data.val" :value='item.vquestcontent' @click="change(oindex,data,index)">
                        <label :for='"radio"+ index + oindex'>{{item.vquestcontent}}</label>
                   </div>
                   <div v-if="item.iinputtype === 1">
                        <input type="text" name="" placeholder="其他" class="checkbox-text" v-model="item.vanswer"  maxlength="50">
                    </div>
                </div>
            </div>             
	        </div>    	
	    </div>
	    <div class="sumbit" @click='sumbit'>
	    	<p>提交</p>
	    </div>         
	</div>
</template>

<script>
	import clear from '@/components/clear'
  import {getQuestionContent, submitQuestion} from '@/api/getData'
  import {XuntongJSBridge} from '@/js/qingjs'
	export default {
	    name: 'questionSurvey',
	    data: function () {
        return {
            ios: XuntongJSBridge.getOS(),
            type: this.$route.params.type,
            title: '',
            renderLists: '',
            pkCustomer: this.$route.params.id,
            submitList: [],
            customList: [{
                name: '填写日期',
                value: ''
            }, {
                name: '调查日期',
                value: ''
            }]
         }
        },
        components: {
            clear
        },
        methods: {
            getTitile() {
              if (this.type === 'know') {
                this.title = '认知途径调查'
              } else if (this.type === 'customer') {
                this.title = '客户问卷调查'
              } else if (this.type === 'visit') {
                this.title = '来访问卷调查'
              } else if (this.type === 'success') {
                this.title = '住宅问卷调查'
              } else {
                this.title = '消费水平问卷调查'
              }
            },
            async getList() {
              let pkInquirek
              if (this.$store.state.questionInfo.pkInquire === null) {
                pkInquirek = ''
              } else {
                pkInquirek = this.$store.state.questionInfo.pkInquire
              }
              let params = {
               'method': 'getList',
               'pk_inquire': pkInquirek,
               'pk_examtemp': this.$store.state.questionInfo.pkexamtemp
              }
              let res = await getQuestionContent(params)
              this.renderLists = res.data.data.question
              this.customList[0].value = res.data.data.dinputdate
              this.customList[1].value = res.data.data.dinquiredate
              console.log(res)
              for (let select of this.renderLists) {
                 let option = select.option
                 select.fquestion = select.fquestion.split('.')[1]
                 // console.log(arr)
                 select.checkbox = []
                 for (let content of option) {
                   if (content.vanswer === 'Y' && select.fqmcategory === 1) {
                      select.checkbox.push(content.vquestcontent)
                      content.checkStatus = 'checkBoxs'
                   } else if (content.vanswer === 'Y' && select.fqmcategory === 0) {
                      select.val = content.vquestcontent
                   }
                 }
                 // this.renderLists1.push(select)
              }
            },
            change(oindex, data, index) {
               data.val = data.option[oindex].vquestcontent
               for (let options of data.option) {
                  if (options.iinputtype === 0) {
                    options.vanswer = 'N'
                  }
               }
               if (data.option[oindex].vanswer === 'N') {
                  data.option[oindex].vanswer = 'Y'
               } else {
                  data.option[oindex].vanswer = 'Y'
               }
               this.renderLists.splice(index, 1, data)
            },
            changes(oindex, data, index) {
                if (this.ios === 'ios') {
                  let a = data.checkbox.indexOf(data.option[oindex].vquestcontent)
                  if (a === -1) {
                    data.option[oindex].vanswer = 'N'
                    data.option[oindex].checkStatus = ''
                  } else {
                    data.option[oindex].checkStatus = 'checkBoxs'
                    data.option[oindex].vanswer = 'Y'
                  }
                } else {
                  let a = data.checkbox.indexOf(data.option[oindex].vquestcontent)
                 if (a === -1) {
                   data.checkbox.push(data.option[oindex].vquestcontent)
                   data.option[oindex].vanswer = 'Y'
                   data.option[oindex].checkStatus = 'checkBoxs'
                 } else {
                   data.checkbox.splice(a, 1)
                   data.option[oindex].checkStatus = ''
                   data.option[oindex].vanswer = 'N'
                  }
                }
               this.renderLists.splice(index, 1, data)
            },
            dateToday() {
              let date = new Date()
              let month = date.getMonth() + 1
              let today = date.getDate().toString().length === 1 ? '0' + date.getDate().toString() : date.getDate().toString()
              month = month.toString().length === 1 ? '0' + month.toString() : month.toString()
              return date.getFullYear() + '-' + month + '-' + today
           },
           async sumbit() {
              this.submitList = this.renderLists
              for (let data of this.submitList) {
                delete data.checkbox
                delete data.val
                delete data.fqmcategory
                delete data.fquestion
                data.pk_quesmanage = data.pk_questmanage
                delete data.pk_questmanage
                // data.pk_quesmanage = undefined
                for (let reserve of data.option) {
                  delete reserve.iinputtype
                  delete reserve.vquestcontent
                }
              }
              let pkInquireks
              if (this.$store.state.questionInfo.pkInquire === null) {
                pkInquireks = ''
              } else {
                pkInquireks = this.$store.state.questionInfo.pkInquire
              }
              let params = {
                'method': 'submit',
                'pk_inquire': pkInquireks,
                'vcode': this.$store.state.selectedProject.vcode,
                'pk_examtemp': this.$store.state.questionInfo.pkexamtemp,
                'pk_customer': this.pkCustomer,
                'dinputdate': this.customList[0].value,
                'dinquiredate': this.customList[1].value,
                'data': this.submitList
              }
              console.log(params)
              let res = await submitQuestion(params)
              console.log(res)
              this.$router.go(-1)
           }
        },
        created: function() {
          this.getTitile()
          this.getList()
        }
	}
</script>
       
<style scoped>
    .wrap {
    	padding-bottom: 52px;
    	box-sizing: none;
    }
    .redxin {
      color: #F35959;
      position: absolute;
      top: 4px;
      right: -10px;
    }
    .header>p {
    	background: #FFF;
    	text-align: center;
    	font-size: 16px;
    	color: #030303;
    	line-height: 44px;
    	height: 44px;
    	margin-bottom: 8px;
    }
    .date {
    	background: #FFF;
    }
    .date div {
        height: 44px;
        width: 92%;
        margin: 0 auto;
    }
    .date div:first-child {
    	border-bottom: 1px solid #EAEFF3;
    }
    .dateTitle{
    	display: block;
    	font-size: 14px;
    	color: #7A797B;
    	line-height: 42px;
    	float: left;
    }
    .dateTime{
    	display: block;
    	font-size: 14px;
    	color: #030303;
    	line-height: 42px;
    	float: right;
    }
    .xin {
    	margin-left: 4px;
    	color: #F35959;
    	font-size: 12px;
    }
    .header {
    	margin-bottom: 8px;
    }
    .contentWrap {
    	background: #FFF;
    	padding-bottom: 10px;
    }
    .content {
    	width: 92%;
    	margin: 0 auto;
    	padding-bottom: 8px;
    	border-bottom: 1px solid #EAEFF3;
    }
    .content:last-child {
    	border-bottom: none;
    }
    .contentTitle {
    	font-size: 14px;
    	color: #7A797B;
    	line-height: 16px;
    	text-align: left;
    	padding: 14px 0 10px 0;
    }
    .other {
    	width: 92%;
    	margin: 0 auto;
    }
    .other p {
    	text-align: left;
    	background: #EAEFF3;
    	border-radius: 4px;
    	height: 28px;
    	line-height: 28px;
    	padding-left: 10px;
    	font-size: 13px;
    	color: #98A1A8;
    }
    .sumbit {
    	line-height: 44px;
    	border-top: 1px solid #B9C7D2;
    	background-color: #fff;
    	position: fixed;
    	left: 0;
    	right: 0;
    	bottom: 0;
    	z-index: 99;
    }
    .sumbit p {
    	height: 44px;
    	background: #FFF;
    	font-size: 16px;
    	color: #3CBAFF;
    	line-height: 44px;
    	text-align: center;
    }
   .gzb-list-item {
      padding: 0 12px;
      line-height: 44px;
      height: 44px;
      position: relative;
      display: flex;
      vertical-align: middle;
      overflow: hidden;
      align-items: center;
      background-color: #fff;
      border-bottom: 1px solid #EBEFF3;
      text-align: left;
    }
   .gzb-list-title {
    display: block;
    width: 0;
    -ms-flex: 1;
    flex: 1;
    -webkit-box-flex: 1;
    font-size: 16px;
    }
    .gzb-list-title>span {
      color: #7A797B;
      line-height: 16px;
      font-size: 14px;
      position: relative;
    }
    .gzb-list-detail {
      color: #030303;
      font-size: 14px;
    }
    .radioWrap,.checkWrap {
      text-align: left;
    }
    .radioWrap div div,.checkWrap div div{
      padding: 4px 0;
    }
    .checkWrap input[type='checkbox']{
       opacity: 0;
       margin-left: -12px;
    }
    .radioWrap input[type='radio']{
       opacity: 0;
       margin-left: -12px;
    }
    .radioWrap label {
      background: url('../../assets/not-checked.png') no-repeat left;
      background-size: 18px 18px;
      padding-left: 24px;
      display: inline-block;
      margin-left: -5px;
      font-size: 14px;
      line-height: 20px;
      color: #030303;
    }
    .radioWrap input[type='radio']:checked+label {
      background: url('../../assets/checked.png') no-repeat left;
      background-size: 18px 18px;
      padding-left: 24px;
      display: inline-block;
      margin-left: -5px;
   }
   .checkWrap label {
      background: url('../../assets/checkbox1.png') no-repeat left;
      background-size: 18px 18px;
      padding-left: 24px;
      display: inline-block;
      margin-left: -5px;
      font-size: 14px;
      line-height: 20px;
      color: #030303;
      }
   /* .checkWrap input[type='checkbox']:checked+label {
      background: url('../../assets/checkbox.png') no-repeat left;
      background-size: 18px 18px;
      padding-left: 24px;
      display: inline-block;
      margin-left: -5px;
   }*/
    .checkBoxs {
      background: url('../../assets/checkbox.png') no-repeat left !important;
      background-size: 18px 18px !important;
      padding-left: 24px;
      display: inline-block;
      margin-left: -5px;
   }
   .checkbox-text {
      background: #EAEFF3;
      border-radius: 4px;
      height: 28px;
      width: 100%;
      padding-left: 10px;
      font-size: 12px;
      color: #030303;
    }
    .contentTitle span {
       margin-right: 2px;
    }
</style>
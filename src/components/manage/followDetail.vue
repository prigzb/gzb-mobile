<template>
  <div :class="['wrap', {'gzb-no-content': noContent}]">
	<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" distance="50">
	   <div class="line" v-for="(data,index) in clientList" :key="data.id" slot="list">
	      <div class="personInfo">
	      	 <div class="left">
	      	    <div class="icon">
	      	       <span class="name">{{data.vcname}}</span>
	      	       <span class="level item" v-if="data.apk_cuslevel && data.apk_cuslevel !== ''">
	      	          {{data.apk_cuslevel}}
	      	       </span>
	      	       <span class="intention item">{{data.afcustype}}</span>
	      	       <span class="over item" v-if="data.gdate">逾{{data.agdate}}天</span>
                </div>
                <div class="phone">
                	{{data.avpreferredtel}}
                </div>
	      	 </div>
	      	 <div class="right">
	      	  	 <span>置业顾问</span>
	      	  	 <span>{{data.psnname}}</span>
	      	 </div>
	      	 <clear></clear>
	      </div>
	      <div class="otherInfo">
	         <span class="type">{{data.afproceedingtype}}</span>
	         <span class="time">{{data.dates}}</span>
	         <clear></clear>
	      </div>
	   </div>
    </yd-infinitescroll>
  </div>  
</template>

<script>
 import clear from '@/components/clear'
 import {manageToday, manageOverDay} from '@/api/getData'
 export default {
    name: 'followDetail',
    data () {
      return {
        page_no: 1,
        type: this.$route.params.type,
        clientList: '',
        renderList: [],
        noContent: false
      }
    },
    components: {
       clear
    },
    methods: {
      async getList() {
         console.log(this.type)
         if (this.type === 'today') {
            let params = {
              'method': 'afterselect',
              'fright': this.$store.state.manageProject.fright,
              'pk_corp': this.$store.state.manageProject.pk_responsecorp,
              'pk_psndoc': this.$store.state.userInfo.pk_psndoc,
              'pk_project': this.$store.state.manageProject.pk_project,
              'page_no': this.page_no,
              'page_size': 20,
              'vcode': this.$store.state.manageProject.vcode
            }
            console.log(params)
            let res = await manageToday(params)
            console.log(res)
            if (res.data.flag === '0') {
               this.clientList = [...this.clientList, ...res.data.data.list]
               for (let data of this.clientList) {
                 data.apk_cuslevel = this.pkCuslevel(data.pk_cuslevel)
                 data.afcustype = this.fcusType(data.fcustype)
                 data.afproceedingtype = this.visitType(data.fproceedingtype)
                 data.avpreferredtel = this.encrypting(data.vpreferredtel)
                 data.dates = data.dproceedingdate
               }
               console.log(this.clientList)
               // this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
               return true
            } else if (this.page_no === 1) {
               this.clientList = []
               this.noContent = true
               return false
            } else {
               console.log('sss')
               this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
            }
         } else {
            let params = {
              'method': 'yudaylist',
              'fright': this.$store.state.manageProject.fright,
              'pk_corp': this.$store.state.manageProject.pk_responsecorp,
              'pk_psndoc': this.$store.state.userInfo.pk_psndoc,
              'pk_project': this.$store.state.manageProject.pk_project,
              'vcode': this.$store.state.manageProject.vcode,
              'page_no': this.page_no,
              'page_size': 20
            }
            console.log(params)
            let res = await manageOverDay(params)
            console.log(res)
            if (res.data.flag === '0') {
               this.clientList = [...this.clientList, ...res.data.data.list]
               // let reg = /^(\d{3})\d{4}(\d{4})$/
               for (var i = this.clientList.length - 1; i >= 0; i--) {
                 if (this.clientList[i].gdate === '0') {
                   this.clientList.splice(i, 1)
                 }
               }
               for (let data of this.clientList) {
                 data.apk_cuslevel = this.pkCuslevel(data.pk_cuslevel)
                 data.avpreferredtel = this.encrypting(data.vpreferredtel)
                 // data.dmakedate = data.vproceedingdesc
                 data.afcustype = this.fcusType(data.fcustype)
                 data.afproceedingtype = this.visitType(data.fproceedingtype)
                 data.agdate = Number(data.gdate)
               }
               console.log(this.clientList)
               return true
            } else if (this.page_no === 1) {
               this.clientList = []
               this.noContent = true
               return false
            } else {
               this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
            }
         }
       },
       async loadList() {
         this.page_no++
         let result = await this.getList()
         console.log(this.page_no)
         if (result) {
           this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
         }
       },
       encrypting(data) {
          let test2 = data.replace(/(\d{3})(\d{4})(\d{4})/g, '$1****$3')
          return test2
       },
       pkCuslevel(data) {
        let level = ''
        switch (data) {
          case '0001Y910000000057L4B':
            level = 'A'
            break
          case '0001Y910000000057L4C':
            level = 'B'
            break
          case '0001Y910000000057L4D':
            level = 'C'
            break
          case '0001Y910000000057L4E':
            level = 'D'
            break
          case '0001Y910000000057L4F':
            level = 'E'
            break
        }
        return level
      },
      fcusType(data) {
        let fcusType = ''
        switch (data) {
          case '0':
            fcusType = '意向'
            break
          case '1':
            fcusType = '预订'
            break
          case '2':
            fcusType = '认购'
            break
          case '3':
            fcusType = '签约'
            break
          case '4':
            fcusType = '潜在'
            break
          case '5':
            fcusType = '无效'
            break
        }
        return fcusType
      },
      visitType(data) {
        let visitType = ''
        switch (data) {
          case '0':
            visitType = '来电'
            break
          case '1':
            visitType = '来访'
            break
          case '2':
            visitType = '去电'
            break
          case '3':
            visitType = '去访'
            break
          case '4':
            visitType = '短信'
            break
          case '5':
            visitType = 'Email'
          break
        }
        return visitType
      }
    },
    created: function() {
       this.getList()
    }
  }
</script>
<style scoped>
    .line {
      border-bottom: 1px solid #EAEFF3;
      background: #ffffff;
      padding: 0 12px;
    }
    .personInfo {
      border-bottom: 1px dashed #EAEFF3;
    }
    .phone {
    	font-size: 14px;
    	color: #7A797B;
    	line-height: 22px;
    }
    .icon {
      height: 28px;
    }
    .phone {
      height: 21px;
    }
    .left {
      float: left;
      width: 80%;
      text-align: left;
      padding-top: 8px;
    }
    .right {
      float: right;
      padding: 12px 0 14px;
    }
    .left span.item {
      font-size: 10px;
      line-height: 16px;
      border-radius: 10px;
      height: 16px;
      /*width: 15.5%;*/
      text-align: center;
      margin-left: 4px;
      margin-top: 5px;
      float: left;
      min-width: 34px;
      padding: 0 4px;
    }
    span.name {
      font-size: 16px;
   	  line-height: 28px;
   	  color: #030303;
   	  float: left;
   	  max-width: 96px;
   	  white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    span.level {
      color: #3CBAFF;
      border: 1px solid #3CBAFF;
    }
    span.intention {
      color: #94D301;
      border: 1px solid #94D301;
    }
    span.over {
      color: #B9C7D2;
      border: 1px solid #B9C7D2;
    }
    .right span{
      font-size: 12px;
      color: #7A797B;
      line-height: 22px;
      display: block;
    }
    .otherInfo {
      line-height: 32px;
      height: 32px;
    }
    span.type {
      float: left;
      font-size: 14px;
      color: #333333;
    }
    span.time {
      float: right;
      font-size: 12px;
      color: #98A1A8;
    }
    .gzb-no-content {
      height: 100%;
      background: url('../../assets/no-content.png') no-repeat center center;
      background-size: 100% auto;
    }
</style>
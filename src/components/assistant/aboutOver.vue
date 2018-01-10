<template>
	<div :class="{ bg: ishide }">
	   <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" distance="50">
	  <aboutOverClient slot="list" v-for="(item, index) in appList" :name="appList[index].aname" :phone="appList[index].avtel" :fproceedingtype="appList[index].aftype" :dproceedingdate="appList[index].addate" :grade="appList[index].acuslevel" :type="appList[index].afctype" :id="appList[index].acustomer" :overDue="appList[index].aoverDue" :isgrade="appList[index].isgrade" :shide="appList[index].shide" :isphone="isphone" :pk_customerway="appList[index].acustomerway" :pk_customer_sellor="appList[index].asellor" :vdef5="appList[index].vdef5" :vdef10="appList[index].vdef10" :reserve10="appList[index].reserve10"></aboutOverClient>
	  <span slot="doneTip">没有客户了~~</span>
	  <img slot="loadingTip"/>
	   </yd-infinitescroll>
	  <commonFooter></commonFooter>
	</div>
</template>
<script>
import aboutOverClient from '@/components/assistant/aboutOverClient'
import commonFooter from '@/components/assistant/commonFooter'
import clear from '@/components/clear'
import {followUrg} from '@/api/getData'
  export default {
    name: 'aboutOver',
    data() {
      return {
        geturl: 'http://10.10.168.56:7000/api/servlet/NCMobileQueryAfterrecord',
        appList: [],
        Date: [],
        ishide: false,
        statusList: [{
          name: '来电',
          type: 0,
          code: 'call'
        }, {
          name: '来访',
          type: 1,
          code: 'come-visit'
        }, {
          name: '去电',
          type: 2,
          code: 'go-call'
        }, {
          name: '去访',
          type: 3,
          code: 'go-visit'
        }, {
          name: '短信',
          type: 4,
          code: 'note'
        }, {
          name: 'Email',
          type: 5,
          code: 'e-mail'
        }],
        page_no: 1,
        isphone: this.$store.state.isphone
      }
    },
    components: {
      aboutOverClient, commonFooter, clear
    },
    methods: {
      async getAPPList() {
        let params = {
          method: 'queryInfermationOfAfterrecord',
          action_type: '2',
          pk_project: this.$store.state.selectedProject.pk_project,
          user_id: this.$store.state.userInfo.user_id,
          page_no: this.page_no,
          page_size: '20'
        }
        const res = await followUrg(params)
        if (res.data.flag === '0') {
          console.log('请求成功！')
          if (res.data.data === null) {
            this.ishide = true
            return false
          }
          this.appList = [...this.appList, ...res.data.data]
          if (this.appList.length === 0) {
            this.ishide = true
          }
          console.log(this.appList)
          for (let i = 0; i < this.appList.length; i++) {
            this.appList[i].aname = this.appList[i].vcname
            this.appList[i].aftype = this.typeConversion(this.appList[i].fproceedingtype)
            if (this.appList[i].aftype === ' ') {
              this.appList[i].shide = false
            } else {
              this.appList[i].shide = true
            }
            this.appList[i].addate = this.appList[i].dproceedingdate
            this.appList[i].avtel = this.appList[i].vpreferredtel
            this.appList[i].acustomer = this.appList[i].pk_customer
            this.appList[i].acuslevel = this.pkCuslevel(this.appList[i].pk_cuslevel)
            // console.log(this.appList[i].acuslevel)
            if (this.appList[i].acuslevel === ' ') {
              this.appList[i].isgrade = false
            } else {
              this.appList[i].isgrade = true
            }
            // console.log(this.isgrade)
            this.appList[i].afctype = this.fcusType(this.appList[i].fcustype)
            this.appList[i].aoverduedays = this.appList[i].overduedays
            this.appList[i].aoverDue = this.overDue(this.appList[i].addate, this.appList[i].aoverduedays)
            this.appList[i].acustomerway = this.appList[i].pk_customerway
            this.appList[i].asellor = this.appList[i].pk_customer_sellor
          }
          console.log(res)
          return true
        } else if (this.page_no === 1) {
          this.appList = []
          this.ishide = true
          return false
        } else {
          this.appList = []
          this.ishide = true
          this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
          return false
        }
      },
      overDue(dataone, datatwo) {
        let date1 = new Date()
        let date2 = new Date()
        // console.log(dataone)
        dataone = dataone.split('-')
        // console.log(dataone)
        date1.setFullYear(dataone[0])
        date1.setMonth(dataone[1] - 1)
        date1.setDate(dataone[2])
        // console.log(date1)
        let dataa = date1.getTime() - date2.getTime()
        let datab = dataa / (1000 * 60 * 60 * 24) + parseInt(datatwo)
        console.log(datab)
        return Math.floor(datab)
      },
      typeConversion(type) {
        switch (type) {
          case 0:
            return this.statusList[0].name
          case 1:
            return this.statusList[1].name
          case 2:
            return this.statusList[2].name
          case 3:
            return this.statusList[3].name
          case 4:
            return this.statusList[4].name
          case 5:
            return this.statusList[5].name
          default:
            return ' '
        }
      },
      async loadList() {
        // console.log('start load')
        this.page_no++
        let result = await this.getAPPList()
        if (result) {
          this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
        }
      },
      pkCuslevel(data) {
        switch (data) {
          case '0001Y910000000057L4B':
            data = 'A'
            break
          case '0001Y910000000057L4C':
            data = 'B'
            break
          case '0001Y910000000057L4D':
            data = 'C'
            break
          case '0001Y910000000057L4E':
            data = 'D'
            break
          case '0001Y910000000057L4F':
            data = 'E'
            break
          default:
            data = ' '
        }
        return data
      },
      fcusType(data) {
        switch (data) {
          case 0:
            data = '意向'
            break
          case 1:
            data = '预定'
            break
          case 2:
            data = '认购'
            break
          case 3:
            data = '签约'
            break
          case 4:
            data = '潜在'
            break
          case 5:
            data = '无效'
            break
          default:
            data = ''
        }
        return data
      }
    },
    created: function () {
      this.getAPPList()
    }
  }
</script>
<style scoped>
	.bg {
		height: 100%;
		background: url(../../assets/no-content.png) no-repeat center;
		background-size: 100%;
	}
</style>
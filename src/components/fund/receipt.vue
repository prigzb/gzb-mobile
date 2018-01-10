<template>
  <div class="gzb-appr">
    <div class="gzb-appr-status" v-if="app.workflow_list.length > 0" @click="toHistory">
      <div class="gzb-appr-lefticon gzb-icon-check">

      </div>
      <div class="gzb-status-content">
          <div class="gzb-status-detail" v-if="flowStatus() === '1' && nextStatus() === '1' && app.bill_status !== '1002'">
              等待<span class="gzb-status-name" v-for="flow in app.workflow_list" v-if="flow.approveresult === ''">[{{flow.checkman}}]</span>
              审批
          </div>
          <div class="gzb-status-detail" v-if="nextStatus() === '2' || app.bill_status === '1002'">
              已通过
          </div>
          <div class="gzb-status-detail" v-if="flowStatus() === '3' && app.bill_status !== '1002'">
              未通过
          </div>
        <div class="gzb-status-time">
            {{app.workflow_list[0].senddate}}
        </div>
          <clear></clear>
      </div>
      <div class="gzb-status-righticon">

      </div>
      <clear></clear>
    </div>
    <div class="gzb-appr-content">
      <div class="gzb-content-title" v-if="app.bill_status !== '1004'">
        <div class="gzb-appr-number">
            No.{{app.djbh}}
        </div>
      </div>
      <div class="gzb-content-detail">
        <tableItem title="单据日期" :detail="app.create_date"></tableItem>
        <tableItem title="出差事由" :detail="app.description"></tableItem>
          <tableItem title="附件张数" :detail="app.fjzs"></tableItem>
        <tableItem title="报销公司" :detail="app.corp_name"></tableItem>
        <tableItem title="报销人" :detail="app.dept_name + ' ' + app.user_name"></tableItem>
        <tableItem title="费用承担公司" :detail="app.fycorp_name"></tableItem>
        <tableItem title="费用承担部门" :detail="app.fydept_name"></tableItem>
          <div class="gzb-content-png" v-if="app.file_list.length > 0 || app.bill_status ==='1004'">
              <div class="gzb-left-content">
                  附件图片
              </div>
              <div class="gzb-right-png">
                  <!--<img v-for="img in app.file_list" :src="img.url" class="gzb-png-right gzb-png-first">-->
                  <yd-lightbox>
                      <yd-lightbox-img  :src="img.url" class="gzb-png-right gzb-png-first" v-for="img in app.file_list" v-if="img.ext === 'jpg' || img.ext === 'jpeg' || img.ext === 'png' || img.ext === 'JPG' || img.ext === 'JPEG' || img.ext === 'PNG'"></yd-lightbox-img>
                  </yd-lightbox>
                  <clear></clear>
              </div>
              <clear></clear>
          </div>
          <div class="gzb-content-file" v-if="app.file_list.length > 0 || app.bill_status === '1004'">
              <div class="gzb-left-content">
                  附件下载
              </div>
              <div class="gzb-right-file">
                  <div v-for="img in app.file_list"><a class="gzb-file-a" :href="img.url" download>{{img.name}}</a>
                      <clear></clear>
                  </div>
              </div>
              <clear></clear>
          </div>
      </div>
    </div>
    <div class="gzb-appr-fund">
      <div class="gzb-fund-title">
        <div class="gzb-appr-lefticon gzb-icon-fund">

        </div>
        <div class="gzb-appr-righticon" :class="{'gzb-icon-up': fundDetail}" @click="showFundDetail">

        </div>
        <div class="gzb-fund-name">
          预计总金额
        </div>
        <div class="gzb-fund-number">
          <span class="gzb-red-number">{{app.total}}</span>&nbsp元
        </div>

      </div>
        <receiptItem v-if="fundDetail" :key="item.id" v-for="item in app.item_list" :title="item.cost_name" :price="item.amount" :number="item.defitem10" :remark="item.remarks"></receiptItem>
    </div>
    <div class="gzb-bottom" v-if="app.bill_status === '1004'">
          <div class="gzb-bottom-btn" @click="gzbConfirm('确定要删除这张单据吗?',true)">
            <div class="gzb-btn-icon gzb-icon-delete">

            </div>
            <div class="gzb-btn-title">
              删除
            </div>
          </div>
          <div class="gzb-bottom-btn" @click="toEdit">
            <div class="gzb-btn-icon gzb-icon-edit">

            </div>
            <div class="gzb-btn-title">
              编辑
            </div>
          </div>
          <div class="gzb-bottom-btn gzb-btn-bule" @click="gzbConfirm('您确定要提交单据吗?',false)">
            <div class="gzb-btn-icon gzb-icon-submit">

            </div>
            <div class="gzb-btn-title">
              提交
            </div>
          </div>
    </div>
      <yd-popup v-model="showAlert" position="center" width="70%">
          <p style="text-align: center; margin: 20px 7px 20px 7px;font-size: 16px;">
              {{alertContent}}
          </p>
          <p style="text-align: center; margin-top: 20px;">
              <yd-button @click.native="showAlert = false" size="large" bgcolor="#61b8f9" color="#fff">关闭</yd-button>
          </p>
      </yd-popup>
      <yd-popup v-model="showConfirm" position="center" width="70%">
          <p style="text-align: center; margin: 20px 7px 20px 7px;font-size: 16px;">
              {{confirmContent}}
          </p>
          <yd-button-group style="text-align: center;">
              <yd-button style="float:left;width:33%;margin-bottom: 20px;" @click.native="handleConfirm(1)"  bgcolor="#61b8f9" color="#fff">确定</yd-button>
              <yd-button style="float:right;width: 33%;margin-bottom: 20px;" @click.native="handleConfirm(0)"  bgcolor="#61b8f9" color="#fff">取消</yd-button>
          </yd-button-group>
      </yd-popup>
  </div>
</template>

<script>
import tableItem from '@/components/application/tableItem'
import receiptItem from '@/components/fund/receiptItem'
import {getApplicaionList, removeApproval, updateApproval} from '@/api/getData'
import clear from '@/components/clear'
  export default {
    name: 'receipt',
    data() {
      return {
          fundDetail: false,
          id: this.$route.params.id,
          app: {},
          alertContent: '',
          confirmContent: '',
          showAlert: false,
          showConfirm: false,
          confirmValue: false,
          loading: false,
          isDelete: false
      }
    },
    computed: {},
    mounted() {},
    methods: {
        gzbAlert(content) {
            this.alertContent = content
            this.showAlert = true
        },
        gzbConfirm(content, isdelete) {
            if (isdelete === false && !this.checkFull()) return false
            this.confirmContent = content
            this.isDelete = isdelete
            this.showConfirm = true
        },
        handleConfirm(val) {
            this.showConfirm = false
            if (val === 0) return false
            if (this.isDelete === false) {
                this.toSubmit()
            } else {
                this.toRemove()
            }
        },
        numFormatter(numString) {
            let numArray = numString.split(',')
            let num = ''
            for (let item of numArray) {
                num += item
            }
            return Number(num)
        },
        showFundDetail() {
            this.fundDetail = !this.fundDetail
        },
        async getDetailList() {
            let params = {
                user_id: this.$store.state.userInfo.user_id,
                bill_type: '264X-wangbao2',
                method: 'getDetail',
                search_type: this.$store.state.searchType,
                id: this.id
            }
            const res = await getApplicaionList(params)
            if (res.data.flag === '1') {
                this.$router.go(-2)
                return false
            }
            this.app = res.data.data
        },
        toHistory() {
            this.$store.commit('setWorkFlow', this.app.workflow_list)
            this.$router.push('/history')
        },
        toEdit() {
            this.fillItemList()
            this.app.total = this.numFormatter(this.app.total)
            this.$store.commit('editFund', this.app)
            this.$router.push('/fund/addReceipt')
        },
        async toRemove() {
            let date = new Date()
            let appYear = date.getFullYear()
            let appMonth = date.getMonth() + 1
            if (appMonth.toString().length === 1) {
                appMonth = '0' + appMonth.toString()
            } else {
                appMonth = appMonth.toString()
            }
            // let res = await getApplicaionList('a3b261e9-83c7-11e7-aa29-005056b8712a', '1', '上海', '火车', '说明：出差', '', '', '', '', '', '', '', '')
            let params = {
                user_count: this.app.user_count,
                destination: this.app.trip_dest,
                trip_type: this.app.trip_type,
                remarks: '出差备注',
                description: this.app.description,
                item_list: this.app.item_list,
                amount: this.numFormatter(this.app.total),
                kjnd: appYear,
                kjqj: appMonth,
                zt: 0,
                user_id: this.$store.state.userInfo.user_id,
                pk_psndoc: this.$store.state.userInfo.pk_psndoc,
                pk_corp: this.$store.state.userInfo.pk_corp,
                pk_deptdoc: this.$store.state.userInfo.pk_deptdoc,
                method: 'delete-fybx',
                djbh: this.app.id,
                pkmkey: this.app.id,
                lrr: this.$store.state.userInfo.user_id
            }
            let res = await removeApproval(params)
            console.log('delete', res)
            this.$router.push('/fund')
        },
        fillItemList() {
            for (let i = 0; i < this.app.item_list.length; i++) {
                let item = this.app.item_list[i]
                item.djnum = item.defitem10
                item.amount = this.numFormatter(item.amount)
                this.app.item_list.splice(i, 1, item)
            }
        },
        async toSubmit() {
            if (this.loading) return false
            if (!this.checkFull()) return false
            let date = new Date()
            let appYear = date.getFullYear()
            let appMonth = date.getMonth() + 1
            if (appMonth.toString().length === 1) {
                appMonth = '0' + appMonth.toString()
            } else {
                appMonth = appMonth.toString()
            }
            this.fillItemList()
            // let res = await getApplicaionList('a3b261e9-83c7-11e7-aa29-005056b8712a', '1', '上海', '火车', '说明：出差', '', '', '', '', '', '', '', '')
            let params = {
                user_count: this.app.user_count,
                destination: this.app.trip_dest,
                trip_type: this.app.trip_type,
                remarks: '出差备注',
                description: this.app.description,
                item_list: this.app.item_list,
                file_list: this.app.file_list,
                amount: this.numFormatter(this.app.total).toString(),
                bamount: this.numFormatter(this.app.total).toString(),
                kjnd: appYear.toString(),
                kjqj: appMonth.toString(),
                zt: '1',
                fjzs: this.app.fjzs,
                user_id: this.$store.state.userInfo.user_id,
                pk_psndoc: this.app.pk_psndoc,
                pk_corp: this.app.pk_corp,
                pk_deptdoc: this.app.pk_deptdoc,
                bdeptid: this.app.fydeptdoc,
                bcorp: this.app.fypk_corp,
                method: 'update-fybx',
                djbh: this.app.id,
                pkmkey: this.app.id,
                lrr: this.$store.state.userInfo.user_id,
                user_name: this.$store.state.userInfo.user_name,
                xusname: ''
            }
            let res = await updateApproval(params)
            if (res.data.flag === '4') {
                this.$store.commit('setFundParam', params)
                let nameList = []
                let keyList = []
                for (let person of Object.keys(res.data.data[0])) {
                    nameList.push(person)
                }
                for (let person of Object.values(res.data.data[0])) {
                    keyList.push(person)
                }
                let list = []
                for (let i = 0; i < nameList.length; i++) {
                    let person = {
                        name: nameList[i],
                        pk: keyList[i]
                    }
                    list.push(person)
                }
                this.$store.commit('setAppPath', 'fund')
                this.$store.commit('setFlowPerson', list)
                this.$router.push('/search/chooseFlow')
                return false
            }
            console.log('insert', res)
            this.$router.go(-1)
        },
        timeFormatter(date) {
              // 将2017-02-08 的日期格式转化为: 2月8日
              if (!date) return '--'
              let reg = new RegExp('0.*')
              let reg2 = new RegExp('10.*')
              let dateArr = date.split('-')
              if (reg.test(dateArr[1]) && !reg2.test(dateArr[1])) {
                  dateArr[1] = dateArr[1].slice(1)
              }
              if (reg.test(dateArr[2]) && !reg2.test(dateArr[2])) {
                  dateArr[2] = dateArr[2].slice(1)
              }
              return dateArr[1] + '月' + dateArr[2] + '日'
        },
        checkFull() {
            if (this.app.description === '') {
                this.gzbAlert('请点击编辑按钮，完善信息后再提交')
                return false
            }
            if (this.app.trip_dest === '') {
                this.gzbAlert('请点击编辑按钮，完善信息后再提交')
                return false
            }
            if (this.app.trip_type === '') {
                this.gzbAlert('请点击编辑按钮，完善信息后再提交')
                return false
            }
            if (this.app.trip_desc === '') {
                this.gzbAlert('请点击编辑按钮，完善信息后再提交')
                return false
            }
            for (let item of this.app.item_list) {
                if (Number(item.amount) === 0 || item.fyproject === '' || item.defitem10 === '') {
                    this.gzbAlert('您的信息不完善，请点击编辑按钮完善信息')
                    return false
                }
            }
            return true
        },
        typeFormatter(type) {
              for (let i = 0; i < this.typeList.length; i++) {
                  if (this.typeList[i].name === type) {
                      return this.typeList[i].type
                  }
              }
              return ''
        },
        flowStatus() {
            if (this.app.workflow_list.length === 0) return '0'  // 无审批流
            let status = '2'
            for (let flow of this.app.workflow_list) {
                if (flow.approveresult !== '批准') {
                    status = '1'
                }
            }
            return status
        },
        nextStatus() {
            if (this.app.workflow_list.length === 0) return '0'  // 无审批流
            let status = '2'                                     // 无下级审批人
            for (let flow of this.app.workflow_list) {
                if (flow.approveresult === '') {
                    status = '1'                                 // 有下级审批人
                }
            }
            return status
        }
    },
    components: {
      tableItem,
      receiptItem,
      clear
    },
    created: function () {
        this.getDetailList()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gzb-file-a{
    float: right;
    color: #3cbaff;
    text-decoration: underline !important;
}
.gzb-right-file{
    width: 75%;
    float: right;
    /*line-height: 32px;*/
    padding: 7px 0;
}
.gzb-right-file a{
    width: 100%;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.gzb-content-file {
    min-height: 40px;
    padding: 0px 4%;
}
.gzb-file-a{
    float: right;
    color: #3cbaff;
    text-decoration: underline !important;
}
.gzb-right-file{
    width: 80%;
    float: right;
}
.gzb-content-file {
    min-height: 40px;
    padding: 0px 4%;
}
.gzb-right-png{
    width: 80%;
    float: right;
}
.gzb-right-png img{
    margin-bottom: 6px;
    margin-left: 4px;
    width: 50px;
    height: 50px;
    border-radius: 6px;
}
.gzb-appr {
  width: 100%;
}
.gzb-appr-status {
  width: 100%;
  /*height: 70px;*/
  background-color: #FFFFFF;
  margin-bottom: 8px;
  padding-right: 4%;
}
.gzb-appr-lefticon {
  width: 14%;
  height: 70px;
  float: left;
}
.gzb-icon-check {
  background: url('../../assets/status-check.png') no-repeat center center;
  background-size: 22px auto;
}
.gzb-icon-flight {
  background: url('../../assets/travel-flight.png') no-repeat center center;
  background-size: 22px auto;
}
.gzb-icon-fund {
  background: url('../../assets/fund.png') no-repeat center center;
  background-size: 22px auto;
}
.gzb-appr-righticon {
  width: 5%;
  height: 70px;
  background: url('../../assets/xiala-down.png') no-repeat right center;
  background-size: 10px auto;
  float: right;
}
.gzb-status-righticon {
    width: 5%;
    height: 70px;
    background: url('../../assets/arrow-right.png') no-repeat center center;
    background-size: 6px auto;
    float: right;
}
.gzb-icon-up {
    background: url('../../assets/xiala-up.png') no-repeat right center !important;
    background-size: 10px auto !important;
    width: 5%;
    height: 70px;
    float: right;
}
.gzb-fund-title .gzb-appr-righticon{
  height: 44px;
}
.gzb-appr-lefticon.gzb-icon-fund{
  height: 44px;
}
.gzb-left {
  float: left;
}
.gzb-status-content {
  float: left;
  text-align: left;
  padding-top: 10px;
  width: 81%;
}
.gzb-status-detail {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #030303;
  line-height: 28px;
}
.gzb-status-time {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #98A1A8;
  line-height: 22px;
}
.gzb-status-name {
  color: #61B8F9;
}
.gzb-appr-content {
  background-color: #FFFFFF;
}
.gzb-content-title {
  height: 44px;
  line-height: 44px;
  border-bottom: 1px solid #EAEFF3;
}
.gzb-destiny {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #030303;
  float: left;
}
.gzb-appr-number {
  float: right;
  padding-right: 4%;
  font-family: PingFangSC-Regular;
  font-size: 13px;
  color: #98A1A8;
}
.gzb-content-png {
  /*height: 72px;*/
  padding: 0 4%;
}
.gzb-left-content {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #98A1A8;
  float: left;
  line-height: 32px;
}
.gzb-png-right {
  margin-right: 6px;
  margin-top: 6px;
  height: 54px;
  width: 54px;
  float: right;
}
.gzb-png-first {
  margin-right: 0px;
}
.gzb-appr-fund {
  /*background-color: #FFFFFF;*/
  margin-top: 8px;
  padding-bottom: 52px;
}
.gzb-fund-title {
  padding-right: 3%;
  height: 44px;
  line-height: 44px;
  border-bottom: 1px solid #EAEFF3;
  background-color: #fff;
}
.gzb-fund-name {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #030303;
  float: left;
}
.gzb-fund-number {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #030303;
  float: right;
  line-height: 44px;
  height: 44px;
  width:-webkit-calc(89% - 80px);
  width:-moz-calc(89% - 80px);
  width:calc(79% - 80px);
  text-align: right;
}
.gzb-fund-number span{
  display: inline-block;
  line-height: 1em;
  max-width: 88%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.gzb-red-number {
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #F25959;
  vertical-align: middle;
}
.gzb-bottom {
  background-color: #FFFFFF;
  margin-top: 8px;
  height: 44px;
  position: fixed;
  bottom: 0px;
  width: 100%;
}
.gzb-bottom-btn {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 33.33%;
  float: left;
  line-height: 44px;
  border-right: 1px solid #EAEFF3;
  text-align: right;
  padding-right: 7%;
}
.gzb-btn-icon {
  width: 45px;
  height: 44px;
  float: left;
}
.gzb-icon-delete {
  background: url('../../assets/delete.png') no-repeat center right;
  background-size: 20px auto;
}
.gzb-icon-edit {
  background: url('../../assets/edit.png') no-repeat center right;
  background-size: 20px auto;
}
.gzb-icon-submit {
  background: url('../../assets/submit.png') no-repeat center right;
  background-size: 20px auto;
}
.gzb-button-title {
  font-family: PingFangSC-Regular;
  font-size: 15px;
  color: #98A1A8;
}
.gzb-btn-bule {
  background: #3CBAFF;
  font-family: PingFangSC-Regular;
  font-size: 15px;
  color: #FFFFFF;
}
</style>

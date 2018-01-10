<template>
  <div>
    <div class="dispatch-list-head" v-if="app.workflow_list.length > 0" @click="toHistory">
      <div class="header-left review-icon">

        <div class="left-status" v-if="flowStatus() === '1' && nextStatus() === '1' && app.bill_status !== '1002'">等待<span v-for="flow in app.workflow_list" v-if="flow.approveresult === ''">[{{flow.checkman}}]</span>审批</div>
          <div class="left-status" v-if="nextStatus() === '2' || app.bill_status === '1002'">已通过</div>
          <div class="left-status" v-if="flowStatus() === '3' && app.bill_status !== '1002'">
              未通过
          </div>
        <div class="left-time">{{app.workflow_list[0].senddate}}</div>
      </div>
      <clear></clear>
    </div>
    <div class="dispatch-list-con">
      <div class="con-title">
        <div class="title-left plane-icon">{{app.trip_dest}}</div>
        <div class="title-right order-no" v-if="app.bill_status !== '1004'">No.{{app.djbh}}</div>
        <clear></clear>
      </div>
      <div>
        <tableItem title="单据日期" :detail="app.create_date"></tableItem>
        <tableItem title="出差事由" :detail="app.description"></tableItem>
        <tableItem title="附件张数" :detail="app.fjzs"></tableItem>
        <tableItem title="报销公司" :detail="app.corp_name"></tableItem>
        <tableItem title="报销人员" :detail="app.dept_name + ' ' + app.user_name"></tableItem>
        <tableItem title="费用承担公司" :detail="app.fycorp_name"></tableItem>
        <tableItem title="费用承担部门" :detail="app.fydept_name"></tableItem>
        <div class="gzb-content-png" v-if="app.file_list.length > 0 || app.bill_status === '1004'">
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
        </div>
          <clear></clear>
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
      <clear></clear>
    </div>
    <!-- 合计金额 -->
    <div class="dispatch-list-money">
      <div class="con-title" @click="showFundDetail">
        <div class="title-left money-icon">合计金额</div>
        <div class="title-right red-money" :class="{'gzb-icon-up': fundDetail}"><span>{{app.total}}</span>元</div>
        <clear></clear>
      </div>
      <div class="money-spread" v-for="item in app.item_list" v-if="fundDetail">
        <div class="spread-tit">
          <div class="tit-left">
            <div class="adress-blue">{{item.trip_start}}-{{item.trip_dest}}</div>
            <div class="adress-date">{{timeFormatter(item.begin_date)}}-{{timeFormatter(item.end_date)}}&nbsp;&nbsp;{{item.defitem12}}天&nbsp;&nbsp;{{item.trip_type}}</div>
          </div>
          <div class="tit-right"><span>{{item.amount}}</span>元</div>
          <clear></clear>
        </div>
        <div class="spread-item" v-if="item.defitem11 !== '' || app.bill_status === '1004'">
          <div class="item-left">路费</div>
          <div class="item-right">{{item.defitem11}}</div>
          <clear></clear>
        </div>
        <div class="spread-item" v-if="(item.defitem2 !== '' && Number(item.defitem2) !== 0) || app.bill_status === '1004'">
          <div class="item-left">市内交通费</div>
          <div class="item-right">{{item.defitem2}}</div>
          <clear></clear>
        </div>
        <div class="spread-item" v-if="(item.defitem3 !== '' && Number(item.defitem3) !== 0) || app.bill_status === '1004'">
          <div class="item-left">住宿费</div>
          <div class="item-right">{{item.defitem3}}</div>
          <clear></clear>
        </div>
          <div class="spread-item" v-if="(item.defitem6 !== '' && Number(item.defitem6) !== 0) || app.bill_status === '1004'">
              <div class="item-left">其他费用</div>
              <div class="item-right">{{item.defitem6}}</div>
              <clear></clear>
          </div>
          <div class="spread-item" v-if="(item.defitem13 !== '' && Number(item.defitem13) !== 0) || app.bill_status === '1004'">
              <div class="item-left">出差补助</div>
              <div class="item-right">{{item.defitem13}}</div>
              <clear></clear>
          </div>
      </div>
    </div>
      <!-- 底部 -->
      <div class="dispatch-hold-btn" v-if="app.bill_status === '1004'">
          <div class="btn-del grey-color">
              <div class="del-icon" @click="gzbConfirm('确定要删除这张单据吗?',true)">删除</div>
          </div>
          <div class="btn-edit grey-color" @click="toEdit">
              <div class="edit-icon">编辑</div>
          </div>
          <div class="btn-submit blue-color" @click="gzbConfirm('您确定要提交单据吗?',false)">
              <div class="submit-icon">提交</div>
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
  import fundItem from '@/components/application/fundItem'
  import clear from '@/components/clear'
  import {getApplicaionList, removeApproval, updateApproval} from '@/api/getData'
  export default {
    name: 'approval',
    components: {
      tableItem, fundItem, clear
    },
    data() {
      return {
          fundDetail: false,
          id: this.$route.params.id,
          app: {},
          showAlert: false,
          showConfirm: false,
          alertContent: '',
          confirmContent: '',
          confirmValue: false,
          loading: false,
          isDelete: false
      }
    },
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
        changeItem() {
            for (let i = 0; i < this.app.item_list.length; i++) {
                let item = this.app.item_list[i]
                item.cfadress = item.trip_start
                item.ddadress = item.trip_dest
                item.carfare = this.numFormatter(item.defitem2)
                item.other = this.numFormatter(item.defitem6)
                item.road = this.numFormatter(item.defitem11)
                item.stay = this.numFormatter(item.defitem3)
                item.allowance = this.numFormatter(item.defitem13)
                item.day = item.defitem12
                this.app.item_list.splice(i, 1, item)
            }
        },
        toEdit() {
            this.changeItem()
            this.app.total = this.numFormatter(this.app.total)
            this.$store.commit('editTravel', this.app)
            this.$store.commit('setAppItem', this.app.item_list)
            this.$router.push('/travelNew')
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
                user_id: this.$store.state.userInfo.user_id,
                user_name: this.$store.state.userInfo.user_name,
                pk_psndoc: this.$store.state.userInfo.pk_psndoc,
                pk_corp: this.$store.state.userInfo.pk_corp,
                pk_deptdoc: this.app.pk_deptdoc,
                bdeptid: this.app.fydeptdoc,
                bcorp: this.app.fypk_corp,
                description: this.app.description,
                destination: this.app.destination,
                item_list: this.app.item_list,
                file_list: this.app.file_list,
                amount: this.numFormatter(this.app.total),
                bamount: this.numFormatter(this.app.total),
                kjnd: appYear,
                kjqj: appMonth,
                zt: 0,
                id: this.id,
                djbh: this.app.id,
                pkmkey: this.app.id,
                lrr: this.$store.state.userInfo.user_id,
                method: 'delete-clfbx'
            }
            let res = await removeApproval(params)
            console.log('delete', res)
            this.$router.push('/indexTravel')
        },
        async toSubmit() {
            if (this.loading) return false
            this.changeItem()
            if (!this.checkFull()) return false
            this.loading = true
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
                file_list: this.app.file_list,
                amount: this.numFormatter(this.app.total),
                bamount: this.numFormatter(this.app.total),
                kjnd: appYear,
                kjqj: appMonth,
                zt: '1',
                fjzs: this.app.fjzs,
                user_id: this.$store.state.userInfo.user_id,
                pk_psndoc: this.app.pk_psndoc,
                pk_corp: this.app.pk_corp,
                pk_deptdoc: this.app.pk_deptdoc,
                bdeptid: this.app.fydeptdoc,
                bcorp: this.app.fypk_corp,
                method: 'update-clfbx',
                djbh: this.app.id,
                pkmkey: this.app.id,
                lrr: this.$store.state.userInfo.user_id,
                user_name: this.$store.state.userInfo.user_name,
                xusname: ''
            }
            console.log(JSON.stringify(params))
            let res = await updateApproval(params)
            this.loading = false
            if (res.data.flag === '4') {
                this.$store.commit('setTravelParam', params)
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
                this.$store.commit('setAppPath', 'travel')
                this.$store.commit('setFlowPerson', list)
                this.$router.push('/search/chooseFlow')
                return false
            }
            if (res.data.flag === '1') {
                this.gzbAlert('提交单据失败')
            } else {
                console.log('insert', res)
                this.$router.go(-1)
            }
        },
        checkFull() {
            if (this.app.destination === '') {
                this.gzbAlert('您的信息不完善，请点击编辑按钮完善信息')
                return false
            }
            if (this.app.description === '') {
                this.gzbAlert('您的信息不完善，请点击编辑按钮完善信息')
                return false
            }
            if (!this.app.fydeptdoc) {
                this.gzbAlert('您的信息不完善，请点击编辑按钮完善信息')
                return false
            }
            if (this.app.item_list.length === 0) {
                this.gzbAlert('您的信息不完善，请点击编辑按钮完善信息')
                return false
            }
            for (let item of this.app.item_list) {
                if (item.cfadress === '' || item.ddadress === '' || item.road === '' || item.trip_type === '请选择交通工具') {
                    this.gzbAlert('您的信息不完善，请点击编辑按钮完善信息')
                    return false
                }
            }
            return true
        },
        async getDetailList() {
            let params = {
                user_id: this.$store.state.userInfo.user_id,
                bill_type: '264X-wangbao',
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
        timeFormatter(date) {
            // 将2017-02-08 的日期格式转化为: 2月8日
            if (!date) return '--'
            let reg = new RegExp('0.*')
            let reg2 = new RegExp('.*.0.*')
            let dateArr = date.split('-')
            if (reg.test(dateArr[1]) && !reg2.test(dateArr[1])) {
                dateArr[1] = dateArr[1].slice(1)
            }
            if (reg.test(dateArr[2]) && !reg2.test(dateArr[2])) {
                dateArr[2] = dateArr[2].slice(1)
            }
            return dateArr[1] + '月' + dateArr[2] + '日'
        },
        flowStatus() {
            if (this.app.workflow_list.length === 0) return '0'  // 无审批流
            let status = '2'
            for (let flow of this.app.workflow_list) {
                if (flow.approveresult !== '批准') {
                    status = '1'
                }
                if (flow.approveresult === '不批准') {
                    status = '3'
                    return status
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
    created: function () {
        this.getDetailList()
    }
  }
</script>
<style scoped>
.gzb-file-a{
    float: right;
    color: #3cbaff;
    text-decoration: underline !important;
}
.gzb-right-file{
    width: 75%;
    float: right;
}
.gzb-right-file a{
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
.dispatch-list-head{
  font-size: 14px;
  margin-bottom: 8px;
  padding-left: 4%;
  background: #fff url(../../assets/arrow-right.png) no-repeat 96% 34px;
  background-size: 6px auto;
  text-align: left;
}
.header-left{
  padding: 12px 0 12px 32px;
}
.header-left.review-icon{
  background: url(../../assets/status-check.png) no-repeat left 26px;
  background-size: 20px auto;
}
.dispatch-list-head .left-status{
  color: #030303;
  line-height: 30px;
  width: 90%;
}
.dispatch-list-head .left-status span{
  color: #3CBAFF;
}
.dispatch-list-head .left-time{
  font-size: 12px;
  color: #98A1A8;
}

.dispatch-list-con{
  background-color: #fff;
  margin-bottom: 8px;
}
.dispatch-list-con .con-title{
  line-height: 44px;
  margin-left: 4%;
  padding-right: 4%;
  border-bottom: 1px solid #EAEFF3;
}
.dispatch-list-con .title-left{
  float: left;
  padding-left: 34px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 40%;
}
.dispatch-list-con  .plane-icon{
  background: url(../../assets/position.png) no-repeat left center;
  background-size: 22px auto;
}
.dispatch-list-con .title-right{
  float: right;
}
.dispatch-list-con .order-no{
  font-size: 13px;
  color: #98A1A8;
}
.gzb-content-png {
  /*height: 72px;*/
  padding: 0 4%;
}
.gzb-left-content {
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

.dispatch-list-money{
  /*background-color: #fff;*/
  padding-bottom: 52px;
}
.dispatch-list-money .con-title{
  line-height: 44px;
  padding-left: 4%;
  padding-right: 4%;
  background-color: #fff;
}
.dispatch-list-money .title-left{
  float: left;
  padding-left: 34px;
}
.dispatch-list-money .money-icon{
  background: url(../../assets/fund.png) no-repeat left center;
  background-size: 22px auto;
}
.dispatch-list-money .title-right{
  float: right;
}
.dispatch-list-money .red-money{
  font-size: 12px;
  color: #030303;
  padding-right: 24px;
  background: url(../../assets/xiala-down.png) no-repeat right center;
  background-size: 10px auto;
}
.gzb-icon-up {
    background: url('../../assets/xiala-up.png') no-repeat right center !important;
    background-size: 10px auto !important;
    float: right;
    padding-right: 24px;
}
.dispatch-list-money .red-money span{
  font-size: 18px;
  color: #F25959;
  margin-right: 2px;
}
/*合计金额展开*/
.money-spread{
  font-size: 12px;
  padding-right: 4%;
  padding-left: 4%;
  border-top: 1px solid #EAEFF3;
  background-color: #fff;
}
.money-spread .tit-left{
  float: left;
  text-align: left;
}
.money-spread .tit-right{
  float: right;
  line-height: 54px;
}
.money-spread .tit-right span{
  font-size: 14px;
  color: #F25959;
}
.money-spread .adress-blue{
  font-size: 14px;
  color: #3CBAFF;
  line-height: 24px;
  margin-top: 6px;
}
.money-spread .adress-date{
  color: #98A1A8;
}
.spread-item{
  line-height: 36px;
}
.spread-item .item-left{
  float: left;
  font-size: 13px;
  color: #030303;
}
.spread-item .item-right{
  float: right;
  color: #7A797B;
}
/*底部*/
.dispatch-hold-btn{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    line-height: 44px;
    display: flex;
    font-size: 15px;
}
.dispatch-hold-btn >div{
    flex: 1;
}
.dispatch-hold-btn .grey-color{
    border-top: 1px solid #B9C7D2;
    color: #98A1A8;
}
.dispatch-hold-btn .blue-color{
    border-top: 1px solid #3CBAFF;
    background-color: #3CBAFF;
    color: #fff;
}
.btn-del{
    border-right: 1px solid #B9C7D2;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.btn-edit{
    border-right: 1px solid #B9C7D2;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.btn-del .del-icon{
    display: inline-block;
    padding-left: 24px;
    background: url(../../assets/delete.png) no-repeat left center;
    background-size: 18px auto;
}
.btn-edit .edit-icon{
    display: inline-block;
    padding-left: 24px;
    background: url(../../assets/edit.png) no-repeat left center;
    background-size: 18px auto;
}
.btn-submit .submit-icon{
    display: inline-block;
    padding-left: 24px;
    background: url(../../assets/submit.png) no-repeat left center;
    background-size: 18px auto;
}
</style>

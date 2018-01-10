<template>
  <div class="gzb-approval">
    <div class="gzb-add-content">
        <div class="gzb-add-input">
            <div class="gzb-input-left">
            合同总金额<span class="gzb-red-star"></span>
            </div>
            <span class="gzb-right-span">元</span>
            <input type="number" v-model="htamount" name="input2" value="" class="gzb-money-input">
        </div>
        <div class="gzb-add-input">
          <div class="gzb-input-left">
            累计支付金额(不含本次)<span class="gzb-red-star"></span>
          </div>
          <span class="gzb-right-span">元</span>
          <input type="number" v-model="leljamount" name="input2" value=""  class="gzb-money-input">
        </div>
        <div class="gzb-add-area">
            <div class="gzb-input-left">
                事由<span class="gzb-red-star"></span>
            </div>
            <textarea name="textarea1" v-model="description" rows="8" cols="80" placeholder="请输入事由"></textarea>
        </div>
        <div class="gzb-add-input">
            <div class="gzb-input-left">
                附件张数<span class="gzb-red-star"></span>
            </div>
            <input type="number" name="input1" v-model="fjzs" value="" placeholder="请输入附件张数">
        </div>
      <div class="gzb-add-input">
        <div class="gzb-input-left">
          收款单位<span class="gzb-red-star"></span>
        </div>
        <input type="text" v-model="skunit" name="input1" value="" placeholder="请输入收款单位名称">
      </div>
      <div class="gzb-add-input">
        <div class="gzb-input-left">
          收款账号<span class="gzb-red-star"></span>
        </div>
        <input type="number" v-model="sknumber" name="input1" value="" placeholder="请输入收款账号">
      </div>
      <div class="gzb-add-input">
        <div class="gzb-input-left">
          银行名称<span class="gzb-red-star"></span>
        </div>
        <input type="text" v-model="bankname" name="input1" value="" placeholder="请输入银行名称">
      </div>
      <div class="gzb-add-input">
        <div class="gzb-input-left">
          开户行<span class="gzb-red-star"></span>
        </div>
        <input type="text" v-model="bankdeposit" name="input1" value="" placeholder="请输入开户行">
      </div>
      <div class="gzb-add-input">
        <div class="gzb-input-left">
          公司名称<span class="gzb-red-star"></span>
        </div>
        <div class="gzb-right-content">{{companyApp.vname}}</div>
      </div>

      <div class="gzb-add-input">
        <div class="gzb-input-left">
          申请部门<span class="gzb-red-star"></span>
        </div>
        <div class="gzb-right-list gzb-right-content" @click="toDepart('app')">{{departApp.deptname}}</div>
      </div>
      <div class="gzb-add-input">
        <div class="gzb-input-left">
          经办人<span class="gzb-red-star"></span>
        </div>
        <div class="gzb-right-list gzb-right-content" @click="toPerson('app')">{{staff.psnname}}</div>
      </div>
    </div>
    <div class="gzb-add-detail">
      <div class="gzb-add-title">
        <div class="gzb-add-lefticon gzb-fund-icon">

        </div>
        <div class="gzb-title-detail">
          费用明细
        </div>
        <div class="gzb-add-righticon" @click="addItemList">

        </div>
      </div>
      <div class="gzb-add-item" v-for="(item, index) in item_list" :key="item.id">
        <div class="gzb-choose-fund gzb-dashed-border">
          <div class="gzb-fund-choose" @click="showProject(index)">
            {{item.cost_name === '' ? '请选择费用项' : item.cost_name}}
            <div class="gzb-right-icon"></div>
          </div>
            <div class="gzb-fund-list" v-if="item.projectDetail">
                <div v-for="(project,pIndex) in projectList" :key="project.id" @click="chooseProject(index,pIndex)" class="gzb-fund-project">{{project.cost_name}}
                </div>
            </div>
          <div class="gzb-delete-righticon" @click="removeItemList(index)" v-if="index > 0">

          </div>
          <clear></clear>
        </div>
        <div class="gzb-add-input gzb-dashed-border">
          <div class="gzb-input-left">
            发票内容<span class="gzb-red-star"></span>
          </div>
          <input type="text" v-model="item.content" name="input2" value="" placeholder="请输入发票内容">
          <clear></clear>
        </div>
        <div class="gzb-add-input">
          <div class="gzb-input-left">
            税率<span class="gzb-red-star"></span>
          </div>
          <span class="gzb-right-span">%</span>
          <input type="number" v-model="item.rate" name="input2" value="" placeholder="请输入税率">
        </div>
        <div class="gzb-add-input gzb-dashed-border">
          <div class="gzb-input-left">
            申请金额<span class="gzb-red-star"></span>
          </div>
          <span class="gzb-right-span">元</span>
          <input v-model="item.amount" type="number" name="input2" value="" placeholder="请输入金额">
        </div>
        <div class="gzb-add-input gzb-dashed-border">
          <div class="gzb-input-left">
            税额<span class="gzb-red-star"></span>
          </div>
          <span class="gzb-right-span">{{tax(item.amount, item.rate)}}元</span>
        </div>
        <div class="gzb-add-input gzb-dashed-border">
          <div class="gzb-input-left">
            不含税金额<span class="gzb-red-star"></span>
          </div>
          <span class="gzb-right-span">{{notTaxed(item.amount, item.rate)}}元</span>
        </div>
      </div>
    </div>
    <div class="gzb-add-image">
      <div class="gzb-add-title">
        <div class="gzb-add-lefticon gzb-image-icon">

        </div>
        <div class="gzb-title-detail">
          附件
        </div>
        <div class="gzb-choose-number">已选择<span>{{file_list.length}}</span>张</div>
        <div class="gzb-add-photo">
          <input type="file" name="" accept="*/*" @change="upfiles">
        </div>
      </div>
        <div class="gzb-add-pic">
            <div class="gzb-pic-scoll">
                <ul>
                    <li v-for="(img,index) in file_list" :key="img.id" v-if="img.type === 'image/jpeg' || img.type === 'image/jpg' || img.type === 'image/png' || img.ext === 'jpg' || img.ext === 'jpeg' || img.ext === 'png' || img.ext === 'JPG' || img.ext === 'JPEG' || img.ext === 'PNG'">
                        <yd-lightbox>
                            <yd-lightbox-img  :src="img.imgsrc || img.url"></yd-lightbox-img>
                        </yd-lightbox>
                        <a @click="deleteFile(img.id,index)"></a>
                    </li>
                </ul>
                <clear></clear>
            </div>
            <div>
                <div v-for="(file,index) in file_list" :key="file.id" v-if="file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png' && file.ext !== 'jpg' && file.ext !== 'jpeg' && file.ext !== 'png' && file.ext !== 'JPG' && file.ext !== 'JPEG' && file.ext !== 'PNG'">
                    <a style="float:left;">{{file.name}}</a>
                    <a class="gzb-file-delete" @click="deleteFile(file.id,index)"></a>
                    <clear></clear>
                </div>
            </div>
        </div>
    </div>
    <!-- 底部 -->
    <div class="gzb-add-bottom">
      <div class="bottom-left">
        <div class="bottom-price">总价：<span>{{total}}</span>元</div>
      </div>
      <div class="bottom-right">
        <div class="btn-hold" @click="addPayment(0)">暂存</div>
        <div class="btn-apply blue-bg" @click="addPayment(1)">提交</div>
        <clear></clear>
      </div>
      <clear></clear>
    </div>
      <yd-popup v-model="showAlert" position="center" width="70%">
          <p style="text-align: center; margin: 20px 7px 20px 7px;font-size: 16px;">
              {{alertContent}}
          </p>
          <p style="text-align: center; margin-top: 20px;">
              <yd-button @click.native="showAlert = false" size="large" bgcolor="#61b8f9" color="#fff">关闭</yd-button>
          </p>
      </yd-popup>
      <div class="gzb-loading" v-if="imgloading">
          <img src="../../assets/loading.gif">
      </div>
  </div>
</template>

<script>
import clear from '@/components/clear'
import {getCompanyList, getStaffList, uploadImg, getCostList, insertPayment, updateApproval} from '@/api/getData'
  export default {
    name: 'addReceipt',
    data() {
      return {
          companyList: [],
          companyFund: {
              vname: this.$store.state.userInfo.corp_name,
              code: this.$store.state.userInfo.pk_corp
          },
          departFund: this.$store.state.departFund,
          companyApp: {
              vname: this.$store.state.userInfo.corp_name,
              code: this.$store.state.userInfo.pk_corp
          },
          description: this.$store.state.paymentInfo.description || '',
          begin_time: this.$store.state.paymentInfo.begin_time,
          amount: this.$store.state.paymentInfo.amount || '',
          notamount: this.$store.state.paymentInfo.notamount || '',
          fyproject: '招待费',
          skunit: this.$store.state.paymentInfo.skunit || this.$store.state.paymentInfo.zyx16 || '',
          sknumber: this.$store.state.paymentInfo.sknumber || this.$store.state.paymentInfo.zyx17 || '',
          bankname: this.$store.state.paymentInfo.bankname || this.$store.state.paymentInfo.zyx18 || '',
          bankdeposit: this.$store.state.paymentInfo.bankdeposit || this.$store.state.paymentInfo.zyx19 || '',
          htamount: this.$store.state.paymentInfo.htamount || this.$store.state.paymentInfo.zyx4 || '',
          leljamount: this.$store.state.paymentInfo.leljamount || this.$store.state.paymentInfo.zyx5 || '',
          content: '招待费具体内容',
          amounte: '5000',
          item_list: this.$store.state.paymentInfo.item_list,
          files: this.$store.state.paymentInfo.files,
          file_list: this.$store.state.paymentInfo.file_list,
          id: this.$store.state.paymentInfo.id,
          projectList: [],
          loading: false,
          showAlert: false,
          alertContent: '',
          imgloading: false,
          fjzs: this.$store.state.paymentInfo.fjzs
      }
    },
    computed: {
        departApp() {
            if (Object.keys(this.$store.state.departApp).length === 0) {
                return {
                    deptname: this.$store.state.userInfo.dept_name,
                    pk_deptdoc: this.$store.state.userInfo.pk_deptdoc
                }
            }
            return this.$store.state.departApp
        },
        staff() {
            if (Object.keys(this.$store.state.staff).length === 0) {
                return {
                    psnname: this.$store.state.userInfo.user_name,
                    pk_psndoc: this.$store.state.userInfo.pk_psndoc
                }
            }
            return this.$store.state.staff
        },
        total() {
            let count = Number(0)
            for (let item of this.item_list) {
                if (item.amount === '') continue
                count = count + Number(item.amount)
            }
            return count
        },
        projectDefalut() {
            for (let i of this.projectList) {
                if (i.cost_name === '差旅费') {
                  return i
                }
            }
        }
    },
    mounted() {},
    methods: {
        gzbAlert(content) {
            this.alertContent = content
            this.showAlert = true
        },
        toCompany(item) {
            this.$router.push('/searchCompany/payment/' + item + '/0')
        },
        toDepart(item) {
            this.saveInfo()
            let code = ''
            if (item === 'fund') {
                code = this.companyFund.code
            } else if (item === 'app') {
                code = this.companyApp.code
            }
            this.$router.push('/searchDepart/payment/' + item + '/' + code)
        },
        toPerson(item) {
            this.saveInfo()
            let code = this.departApp.pk_deptdoc
            this.$router.push('/searchPerson/payment/' + item + '/' + code)
        },
        saveInfo() {
            let params = {
                user_id: this.$store.state.userInfo.user_id,
                user_name: this.$store.state.userInfo.user_name,
                pk_psndoc: this.staff.pk_psndoc,
                pk_corp: this.$store.state.userInfo.pk_corp,
                pk_deptdoc: this.$store.state.userInfo.pk_deptdoc,
                bdeptid: this.departApp.pk_deptdoc,
                bcorp: this.$store.state.userInfo.pk_corp,
                description: this.description,
                amount: this.total,
                item_list: this.item_list,
                file_list: this.file_list,
                skunit: this.skunit,
                sknumber: this.sknumber,
                bankname: this.bankname,
                bankdeposit: this.bankdeposit,
                htamount: this.htamount,
                leljamount: this.leljamount,
                fjzs: this.fjzs,
                id: this.id
            }
            this.$store.commit('editPayment', params)
        },
        addItemList() {
            let listItem = {
                amount: '',
                cost_name: '',
                fyproject: '',
                content: '',
                index: 0,
                rate: 17,
                projectDetail: false
            }
            this.item_list.push(listItem)
        },
        removeItemList(index) {
            this.item_list.splice(index, 1)
        },
        changeItemList(index) {
            for (let i = 0; i < this.item_list.length; i++) {
                let item = this.item_list[i]
                item.content = item.defitem1 || ''
                item.tax = item.defitem18 || ''
                item.not = item.defitem19 || ''
                item.rate = Number(item.defitem4) || 17
                this.item_list.splice(i, 1, item)
            }
        },
        fillItemList() {
          for (let i = 0; i < this.item_list.length; i++) {
            let item = this.item_list[i]
            item.not = this.notTaxed(item.amount, item.rate).toString()
            item.eamount = this.tax(item.amount, item.rate).toString()
            this.item_list.splice(i, 1, item)
          }
        },
        async deleteFile(id, index) {
            let params = {
                method: 'deleteById',
                file_id: id
            }
            const res = await uploadImg(params)
            if (res.data.flag === '0') this.file_list.splice(index, 1)
            console.log(res)
        },
        async upfiles(val) {
            let _this = this
            this.imgloading = true
            let form = new FormData()
            form.append('file1', val.srcElement.files[0])
            console.log(val.srcElement.files[0])
            const res = await uploadImg(form)
            let img = {
                id: res.data.data[0].id,
                path: res.data.data[0].path,
                name: res.data.data[0].name,
                size: res.data.data[0].size,
                type: val.srcElement.files[0].type
            }
            let reader = new FileReader()
            reader.onloadend = function() {
                img.imgsrc = reader.result
                _this.file_list.push(img)
                console.log('file', this.file_list)
            }
            reader.readAsDataURL(val.srcElement.files[0])
            this.imgloading = false
        },
        chooseProject(index, pIndex) {
            let item = this.item_list[index]
            item.index = pIndex
            item.cost_name = this.projectList[pIndex].cost_name
            item.fyproject = this.projectList[pIndex].cost_id
            item.projectDetail = false
            this.item_list.splice(index, 1, item)
        },
        showProject(index) {
            let item = this.item_list[index]
            item.projectDetail = !item.projectDetail
            this.item_list.splice(index, 1, item)
        },
        notTaxed(num, rate) {
          rate = rate === '' ? 0 : Number(rate)
          if (num === '') return ''
          return Math.round((Number(num) / (100 + rate)) * 10000) / 100
        },
        tax(num, rate) {
          if (num === '') return ''
          return Math.round((Number(num) - this.notTaxed(num, rate)) * 100) / 100
        },
        checkFull() {
            if (this.htamount === '') {
                this.gzbAlert('请填写合同总金额')
                return false
            }
            if (this.leljamount === '') {
                this.gzbAlert('请填写累计支付金额')
                return false
            }
            if (this.description === '') {
                this.gzbAlert('请填写事由')
                return false
            }
            if (this.fjzs === '') {
                this.gzbAlert('请填写附件张数')
                return false
            }
            if (this.skunit === '') {
                this.gzbAlert('请填写收款单位')
                return false
            }
            if (this.sknumber === '') {
                this.gzbAlert('请填写收款账号')
                return false
            }
            if (this.bankname === '') {
                this.gzbAlert('请填写银行名称')
                return false
            }
            if (this.bankdeposit === '') {
                this.gzbAlert('请填写开户行')
                return false
            }
            if (this.staff.psnname === '') {
                this.gzbAlert('请选择经办人')
                return false
            }
            for (let item of this.item_list) {
                if (item.content === '' || item.eamount === '' || item.amount === '' || item.fyproject === '') {
                    this.gzbAlert('请完善费用明细')
                    return false
                }
            }
            return true
        },
        filterFile() {
            let fileList = []
            for (let i = 0; i < this.file_list.length; i++) {
                let file = this.file_list[i]
                file.imgsrc = ''
                fileList.push(file)
            }
            return fileList
        },
        async addPayment(isSubmit) {
            if (this.loading) return false
            this.loading = true
            let date = new Date()
            let appYear = date.getFullYear()
            let appMonth = date.getMonth() + 1
            if (appMonth.toString().length === 1) {
                appMonth = '0' + appMonth.toString()
            } else {
                appMonth = appMonth.toString()
            }
            this.fillItemList()
            let files = this.filterFile()
            // let res = await getApplicaionList('a3b261e9-83c7-11e7-aa29-005056b8712a', '1', '上海', '火车', '说明：出差', '', '', '', '', '', '', '', '')
            let params = {
                user_id: this.$store.state.userInfo.user_id,
                user_name: this.$store.state.userInfo.user_name,
                pk_psndoc: this.staff.pk_psndoc,
                pk_corp: this.$store.state.userInfo.pk_corp,
                bdeptid: this.departApp.pk_deptdoc,
                bcorp: this.$store.state.userInfo.pk_corp,
                description: this.description,
                fjzs: this.fjzs,
                amount: this.total.toString(),
                kjnd: appYear.toString(),
                kjqj: appMonth.toString(),
                zt: isSubmit.toString(),
                item_list: this.item_list,
                file_list: files,
                skunit: this.skunit,
                sknumber: this.sknumber.toString(),
                bankname: this.bankname,
                bankdeposit: this.bankdeposit,
                htamount: this.htamount.toString(),
                leljamount: this.leljamount.toString(),
                method: 'zjzf',
                djbh: this.id,
                pkmkey: this.id,
                lrr: this.$store.state.userInfo.user_id
            }
            if (isSubmit === 1) {
                params.xusname = ''
            }
            if (isSubmit === 1 && !this.checkFull()) {
                this.loading = false
                return false
            }
            this.saveInfo()
            if (this.id === '' || !this.id) {
                let res = await insertPayment(params)
                if (res.data.flag === '4') {
                    this.$store.commit('setPaymentParam', params)
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
                    this.$store.commit('setAppPath', 'payment')
                    this.$store.commit('setFlowPerson', list)
                    this.$router.push('/search/chooseFlow')
                    return false
                }
                if (res.data.flag === '1') {
                    this.gzbAlert('添加单据失败')
                    this.loading = false
                    return false
                }
                console.log('insert', res)
            } else {
                params.method = 'update-zjzf'
                let res = await updateApproval(params)
                if (res.data.flag === '4') {
                    this.$store.commit('setPaymentParam', params)
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
                    this.$store.commit('setAppPath', 'payment')
                    this.$store.commit('setFlowPerson', list)
                    this.$router.push('/search/chooseFlow')
                    return false
                }
                if (res.data.flag === '1') {
                    this.gzbAlert('修改单据失败')
                    this.loading = false
                    return false
                }
                console.log('update', res)
            }
            this.loading = false
            this.$router.replace('/payment')
        }
    },
    components: {
      clear
    },
    created: async function () {
        let params = {
            'method': 'getAllCorpList'
        }
        console.log(getCompanyList)
//        let com = await getCompanyList(params)
//        this.companyList = com.data.data
//        for (let [index, company] of this.companyList.entries()) {
//            if (!company.parent_code) {
//                this.companyList[index].parent_code = '0'
//            }
//        }
//        console.log(com)
//        this.$store.commit('setCompanyTree', this.companyList)
        params.method = 'selectpsndoc'
        params.pk_deptdoc = this.$store.state.userInfo.pk_deptdoc
        let staff = await getStaffList(params)
        console.log(staff)
        params = {
            method: 'getCostsubjList',
            pk_corp: this.$store.state.userInfo.pk_corp
        }
        const cost = await getCostList(params)
        this.projectList = cost.data.data
        console.log(cost)
        if (this.item_list.length === 0) this.addItemList()
        this.changeItemList()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gzb-loading {
    position: fixed;
    top: 50%;
    left: 0;
    margin-top: -60px;
    width: 100%;
    text-align: center;
}
.gzb-loading img{
    width: 100px;
    margin: auto;
    height: auto;
}
.gzb-load-img {
    width: 30%;
}
.gzb-file-delete {
    width: 15px;
    height: 15px;
    background: url('../../assets/up-close.png') no-repeat center center;
    background-size: 100% auto;
    position: absolute;
    left: 0px;
}
input {
  float: right;
  /*height: 44px;*/
  line-height: 20px;
  margin-top: 12px;
  text-align: right;
}
textarea {
    width: 96%;
    border: 0;
    font-size: 14px;
    height: 60px;
}
input::-webkit-input-placeholder {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #98A1A8;
  text-align: right;
}
textarea::-webkit-input-placeholder {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #98A1A8;
  text-align: left;
}
.gzb-money-input {
  width: 30%;
}
.gzb-approval{
  padding-bottom: 52px;
}
.gzb-add-content {
  background-color: #FFFFFF;
}
.gzb-add-input {
  height: 44px;
  line-height: 44px;
  padding: 0 4%;
  border-bottom: 1px solid #EAEFF3;
}
.gzb-add-area {
  line-height: 44px;
  padding: 0 4%;
  border-bottom: 1px solid #EAEFF3;
}
.gzb-input-left {
  float: left;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #7A797B;
}
.gzb-checkbox {
  float: right;
  background: url('../../assets/not-checked.png') no-repeat center left;
  background-size: 14px auto;
  width: 15.6%;
  margin-left: 4%;
  padding-left: 4%;
}
.gzb-red-star {
  /*color: #F35959;*/
  display: inline-block;
  width: 8px;
  height: 10px;
  background: url(../../assets/red-star.png) no-repeat center center;
  background-size: 6px auto;
}
.gzb-add-detail {
  width: 100%;
  background-color: #FFFFFF;
  margin-top: 8px;
}
.gzb-add-title {
  height: 44px;
  line-height: 44px;
  text-align: left;
  border-bottom: 1px solid #EAEFF3;
}
.gzb-add-lefticon {
  width: 14%;
  height: 100%;
  float: left;
}
.gzb-add-righticon {
  width: 14%;
  height: 100%;
  background: url('../../assets/add.png') no-repeat center center;
  background-size: 22px auto;
  float: right;
}
.gzb-delete-righticon {
  width: 14%;
  height: 100%;
  background: url('../../assets/travel-delete.png') no-repeat center center;
  background-size: 22px auto;
  float: right;
}
.gzb-fund-icon {
  background: url('../../assets/fund.png') no-repeat center center;
  background-size: 22px auto;
}
.gzb-title-detail {
  float: left;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #030303;
}
.gzb-right-span {
  float: right;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #030303;
}
.gzb-add-item {
  height: auto !important;
}
.gzb-choose-fund {
  height: 50px;
  padding-left: 4%;
  border-bottom: 1px solid #EAEFF3;
}
.gzb-fund-choose {
  text-align: left;
  margin-top: 8px;
  float: left;
  background-image: linear-gradient(-180deg, #FFFFFF 0%, #EFF4F7 100%);
  border: 1px solid #B9C7D2 !important;
  border-radius: 2.93px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
  line-height: 30px;
  height: 30px;
  width: 46%;
  padding-left: 3%;
}
.gzb-right-icon {
  background: url('../../assets/arrow-down.png') no-repeat center center;
  width: 8px;
  height: 4px;
  background-size: 8px auto;
  margin: 13px 8px 13px 24px;
  float: right;
}
.gzb-dashed-border {
  border-bottom-style: dashed;
}
/*附件图片*/
.gzb-add-image{
  background-color: #fff;
  margin-top: 8px;
}
.gzb-choose-number{
  float: left;
  font-size: 13px;
  margin-left: 6px;
  color: #98A1A8;
}
.gzb-image-icon{
  background: url('../../assets/up-images.png') no-repeat center center;
  background-size: 22px auto;
}
.gzb-add-photo{
  width: 14%;
  height: 100%;
  background: url('../../assets/up-addimages.png') no-repeat center center;
  background-size: 22px auto;
  float: right;
  overflow: hidden;
}
.gzb-add-photo input{
  width: 100%;
  height: 100%;
  opacity: 0;
}
.gzb-add-pic{
  background-color: #fff;
  padding-right: 4%;
  margin-left: 4%;
  overflow: scroll;
}
.gzb-add-pic li{
  float: left;
  width: 70px;
  height: 70px;
  border-radius: 6px;
  background-color: #0C213F;
  position: relative;
  margin-right: 8px;
}
.gzb-add-pic li img{
  width: 100%;
  height: 100%;
}
.gzb-add-pic li a{
  width: 20px;
  height: 20px;
  background: url('../../assets/up-close.png') no-repeat center center;
  background-size: 100% auto;
  position: absolute;
  top: -6px;
  right: -6px;
}
.gzb-pic-scoll{
  width: 1000px;
  padding: 15px 0 11px 0;
}
.gzb-pic-scoll li >div{
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 6px;
}
.gzb-add-pic::-webkit-scrollbar{
  width: 0px;
  height: 0px;
}
.gzb-add-pic::-webkit-scrollbar-track{
  -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}
.gzb-add-pic::-webkit-scrollbar-thumb{
  border-radius: 10px;
  background: #dddddd;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
/*底部*/
.gzb-add-bottom{
  line-height: 44px;
  border-top: 1px solid #B9C7D2;
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
.gzb-add-bottom .bottom-left{
  float: left;
  width: 50%;
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;

}
.gzb-add-bottom .bottom-right{
  float: right;
  width: 50%;
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;

}
.gzb-add-bottom .bottom-price{
  text-align: left;
  padding-left: 8%;
  font-size: 16px;
  color: #030303;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.gzb-add-bottom .bottom-price span{
  color: #F25959;
  font-size: 18px;
}
.gzb-add-bottom .btn-hold{
  float: left;
  width: 50%;
  color: #98A1A8;
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
  border-left: 1px solid #B9C7D2;
}
.gzb-add-bottom .btn-apply{
  float: left;
  width: 50%;
  color: #98A1A8;
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
  border-left: 1px solid #B9C7D2;
}
.gzb-add-bottom .blue-bg{
  background-color: #3CBAFF;
  color: #fff;
}
.gzb-right-content {
  float: right;
  height: 45px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #030303;
  width: 60%;
  text-align: right;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.gzb-right-list {
  background: url('../../assets/arrow-right.png') no-repeat right center;
  background-size: 3px auto;
  padding-right: 4.5%;
}
.gzb-appr-fund {
  background-color: #FFFFFF;
  margin-top: 8px;
  padding: 0 4%;
}
.gzb-fund-title {
  height: 44px;
  line-height: 44px;
  border-bottom: 1px solid #EAEFF3;
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
}
.gzb-red-number {
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #F25959;
  padding-top: 2px;
}
.gzb-fund-rece {
  height: 44px;
  line-height: 44px;
}
.gzb-left-cont {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #030303;
  float: left;
}
.gzb-right-cont {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #030303;
  float: right;
}
.gzb-fund-list {
    position: absolute;
    margin-top: 37px;
    background-color: #FFF;
    width: 44%;
    padding-left: 3%;
    text-align: left;
    border-radius: 2.36px;
    border: 1px solid #B9C7D2 !important;
    height: 140px;
    overflow: auto;
}
.gzb-fund-project {
    font-size: 13px;
    color: #333333;
    letter-spacing: 0;
    line-height: 30px;
    height: 30px;
}
.gzb-fund-project.choose{
  color: #3CBAFF;
  background: url('../../assets/xiala-check.png') no-repeat 94% center;
  background-size: 10px auto;
}
</style>

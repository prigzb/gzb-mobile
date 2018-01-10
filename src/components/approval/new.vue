<template>
  <div class="gzb-approval">
    <div class="gzb-add-content">
      <div class="gzb-add-input">
        <div class="gzb-input-left">
          出差地点<span class="gzb-red-star"></span>
        </div>
        <input type="text" name="destination" v-model="destination" value="" placeholder="请输入出差地点">
      </div>
        <div class="gzb-add-area">
            <div class="gzb-input-left">
                出差事由<span class="gzb-red-star"></span>
            </div>
            <textarea name="textarea1" v-model="description" rows="8" cols="80" placeholder="请输入出差事由"></textarea>
        </div>
        <div class="gzb-add-input">
            <div class="gzb-input-left">
                附件张数<span class="gzb-red-star"></span>
            </div>
            <input type="number" name="input1" v-model="fjzs" value="" placeholder="请输入附件张数">
        </div>
      <div class="gzb-add-input">
        <div class="gzb-input-left">
          报销人公司<span class="gzb-red-star"></span>
        </div>
        <div class="gzb-right-content">{{companyApp.vname}}</div>
      </div>
      <div class="gzb-add-input">
        <div class="gzb-input-left">
          报销人部门<span class="gzb-red-star"></span>
        </div>
        <div class="gzb-right-list gzb-right-content" @click="toDepart('app')">{{departApp.deptname}}</div>
      </div>
      <div class="gzb-add-input">
        <div class="gzb-input-left">
          报销人<span class="gzb-red-star"></span>
        </div>
        <div class="gzb-right-list gzb-right-content" @click="toPerson('app')">{{staff.psnname}}</div>
      </div>
      <div class="gzb-add-input">
        <div class="gzb-input-left">
          费用承担公司<span class="gzb-red-star"></span>
        </div>
        <div class="gzb-right-content gzb-right-list" @click="toCompany('fund')">{{companyFund.vname}}</div>
      </div>
      <div class="gzb-add-input">
        <div class="gzb-input-left">
          费用承担部门<span class="gzb-red-star"></span>
        </div>
        <div class="gzb-right-list gzb-right-content" @click="toDepart('fund')">{{departFund.deptname}}</div>
      </div>
    </div>
    <div class="gzb-appr-fund">
      <div class="gzb-fund-title" @click="toDetail">
        <div class="gzb-appr-lefticon gzb-icon-fund">

        </div>
        <div class="gzb-appr-righticon">

        </div>
        <div class="gzb-fund-name">
          合计金额
        </div>
        <div class="gzb-fund-number gzb-right-list">
          <span class="gzb-red-number">{{total}}</span>&nbsp元
        </div>
      </div>
      <div class="gzb-fund-rece">
        <div class="gzb-left-cont"> 财务核报金额</div>
        <div class="gzb-right-cont"><span style="float:right">元</span><span class="gzb-red-color"><input type="number" v-model="bamount" name="input2" value=""></span></div>
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
      <div class="bottom-right">
        <div class="btn-hold" @click="addFund(0)">暂存</div>
        <div class="btn-apply blue-bg" @click="addFund(1)">提交</div>
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
import {getCompanyList, getStaffList, uploadImg, getCostList, insertFund, updateApproval} from '@/api/getData'
  export default {
    name: 'addReceipt',
    data() {
      return {
          companyList: [],
          companyApp: {
              vname: this.$store.state.userInfo.corp_name,
              code: this.$store.state.userInfo.pk_corp
          },
          description: this.$store.state.travelInfo.description || '',
          item_list: this.$store.state.appItem,
          file_list: this.$store.state.travelInfo.file_list,
          id: this.$store.state.travelInfo.id || '',
          projectList: [],
          destination: this.$store.state.travelInfo.destination || this.$store.state.travelInfo.trip_dest || '',
          loading: false,
          showAlert: false,
          bamount: this.$store.state.travelInfo.bamount || Number(this.total) || '',
          alertContent: '',
          imgloading: false,
          fjzs: this.$store.state.travelInfo.fjzs
      }
    },
    computed: {
        companyFund() {
            if (this.$store.state.companyFund.code === '') {
                return {
                    vname: this.$store.state.travelInfo.fycorp_name || this.$store.state.userInfo.corp_name,
                    code: this.$store.state.travelInfo.b_corp || this.$store.state.userInfo.pk_corp
                }
            } else {
                return {
                    vname: this.$store.state.companyFund.vname,
                    code: this.$store.state.companyFund.code
                }
            }
        },
        departApp() {
            if (Object.keys(this.$store.state.departApp).length === 0) {
                return {
                    deptname: this.$store.state.userInfo.dept_name,
                    pk_deptdoc: this.$store.state.userInfo.pk_deptdoc
                }
            }
            return this.$store.state.departApp
        },
        departFund() {
            if (Object.keys(this.$store.state.departFund).length === 0) {
                return {
                    deptname: this.$store.state.userInfo.dept_name,
                    pk_deptdoc: this.$store.state.userInfo.pk_deptdoc
                }
            }
            return this.$store.state.departFund
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
            let num = 0
            for (let item of this.item_list) {
                num += this.getAmount(item)
            }
            return num
        }
    },
    mounted() {},
    methods: {
        gzbAlert(content) {
            this.alertContent = content
            this.showAlert = true
        },
        toCompany(item) {
            this.saveInfo()
            this.$router.push('/searchCompany/travel/' + item + '/0')
        },
        toDetail() {
            this.saveInfo()
            this.$router.push('/travelPriceDetail')
        },
        getAmount(item) {
            let num = 0
            num += Number(item.road) + Number(item.carfare) + Number(item.stay) + Number(item.other) + Number(item.allowance)
            return num
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
        saveInfo() {
            let params = {
                user_id: this.$store.state.userInfo.user_id,
                user_name: this.$store.state.userInfo.user_name,
                pk_psndoc: this.$store.state.userInfo.pk_psndoc,
                pk_corp: this.$store.state.userInfo.pk_corp,
                pk_deptdoc: this.departApp.pk_deptdoc,
                bdeptid: this.departFund.pk_deptdoc,
                bcorp: this.$store.state.userInfo.pk_corp,
                description: this.description,
                destination: this.destination,
                fjzs: this.fjzs,
                item_list: this.item_list,
                file_list: this.file_list,
                amount: this.total,
                bamount: this.total,
                id: this.id
            }
            this.$store.commit('editTravel', params)
        },
        toDepart(item) {
            let code = ''
            if (item === 'fund') {
                code = this.companyFund.code
            } else if (item === 'app') {
                code = this.companyApp.code
            }
            this.saveInfo()
            this.$router.push('/searchDepart/approval/' + item + '/' + code)
        },
        toPerson(item) {
            this.saveInfo()
            let code = this.departApp.pk_deptdoc
            this.$router.push('/searchPerson/approval/' + item + '/' + code)
        },
        addItemList() {
            let listItem = {
                amount: '',
                cost_name: '差旅费',
                remarks: '',
                djnum: '',
                index: 0,
                projectDetail: false
            }
            this.item_list.push(listItem)
        },
        removeItemList(index) {
            this.item_list.splice(index, 1)
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
            item.projectDetail = false
            this.item_list.splice(index, 1, item)
        },
        showProject(index) {
            let item = this.item_list[index]
            item.projectDetail = !item.projectDetail
            this.item_list.splice(index, 1, item)
        },
        checkFull() {
            if (this.destination === '') {
                this.gzbAlert('请填写出差地点')
                return false
            }
            if (this.description === '') {
                this.gzbAlert('请填写出差事由')
                return false
            }
            if (this.fjzs === '') {
                this.gzbAlert('请填写附件张数')
                return false
            }
            if (this.staff.psnname === '') {
                this.gzbAlert('请选择报销人')
                return false
            }
            if (!this.departFund.pk_deptdoc) {
                this.gzbAlert('请选择费用承担部门')
                return false
            }
            if (this.item_list.length === 0) {
                this.gzbAlert('请完善费用明细')
                return false
            }
            for (let item of this.item_list) {
                if (item.cfadress === '' || item.ddadress === '' || item.road === '' || item.trip_type === '请选择交通工具') {
                    this.gzbAlert('请完善费用明细')
                    return false
                }
            }
            return true
        },
        async addFund(isSubmit) {
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
            let files = this.filterFile()
            // let res = await getApplicaionList('a3b261e9-83c7-11e7-aa29-005056b8712a', '1', '上海', '火车', '说明：出差', '', '', '', '', '', '', '', '')
            let params = {
                user_id: this.$store.state.userInfo.user_id,
                user_name: this.$store.state.userInfo.user_name,
                pk_psndoc: this.staff.pk_psndoc,
                pk_corp: this.$store.state.userInfo.pk_corp,
                pk_deptdoc: this.departApp.pk_deptdoc,
                bdeptid: this.departFund.pk_deptdoc,
                bcorp: this.companyFund.code,
                description: this.description,
                destination: this.destination,
                fjzs: this.fjzs,
                item_list: this.item_list,
                file_list: files,
                amount: this.total,
                bamount: this.total,
                kjnd: appYear,
                kjqj: appMonth,
                zt: isSubmit,
                method: 'clfbx',
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
            if (this.id === '') {
                let res = await insertFund(params)
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
                    this.gzbAlert('添加单据失败')
                    this.loading = false
                    return false
                }
                console.log('insert', res)
            } else {
                params.method = 'update-clfbx'
                let res = await updateApproval(params)
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
                    this.gzbAlert('修改单据失败')
                    this.loading = false
                    return false
                }
                console.log('update', res)
            }
            this.loading = false
            this.$router.replace('/indexTravel')
        }
    },
    components: {
      clear
    },
    created: async function () {
        let params = {
            'method': 'getAllCorpList'
        }
        let com = await getCompanyList(params)
        this.companyList = com.data.data
        for (let [index, company] of this.companyList.entries()) {
            if (!company.parent_code) {
                this.companyList[index].parent_code = '0'
            }
        }
        console.log(com)
        this.$store.commit('setCompanyTree', this.companyList)
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
.gzb-red-color{
  color: #F35959;
  font-size: 14px;
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
}
.gzb-add-item {
  height: 182px;

}
.gzb-choose-fund {
  height: 50px;
  padding-left: 4%;
  border-bottom: 1px solid #EAEFF3;
}
.gzb-fund-choose {
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
.gzb-add-bottom .bottom-right{
  width: 100%;
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;

}
.gzb-add-bottom .bottom-price{
  text-align: left;
  padding-left: 8%;
  font-size: 16px;
  color: #030303;
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
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    line-height: 30px;
    height: 30px;
}
</style>
<style>
    .datetime-input {
        width: 21% !important;
        float: right;
    }
</style>

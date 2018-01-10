<template>
  <div class="gzb-approval">
    <div class="gzb-add-content">
      <div class="gzb-add-input">
        <div class="gzb-input-left">
          出差人数<span class="gzb-red-star"></span>
        </div>
        <input type="number" name="input1" v-model="user_count" value="" placeholder="请输入出差人数">
      </div>
      <div class="gzb-add-input">
        <div class="gzb-input-left">
          出差地点<span class="gzb-red-star"></span>
        </div>
        <input type="text" name="input2" v-model="trip_dest" value="" placeholder="请输入出差地点">
      </div>
      <div class="gzb-add-input">
        <div class="gzb-input-left">
          交通工具<span class="gzb-red-star"></span>
        </div>
          <yd-radio-group v-model="trip_type" size="15" color="#3CBAFF">
              <yd-radio style="float: right" val="飞机"></yd-radio>
              <yd-radio style="float: right" val="火车"></yd-radio>
              <yd-radio style="float: right" val="汽车"></yd-radio>
          </yd-radio-group>
      </div>
      <div class="gzb-add-input">
        <div class="gzb-input-left">
          乘坐说明<span class="gzb-red-star"></span>
        </div>
        <input type="text" name="input3" v-model="trip_desc" value="" placeholder="请输入乘坐说明">
      </div>
      <div class="gzb-add-area">
        <div class="gzb-input-left">
          出差事由<span class="gzb-red-star"></span>
        </div>
        <textarea name="textarea1" v-model="description" rows="8" cols="80" placeholder="请输入出差事由"></textarea>
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
          <div class="gzb-fund-choose">{{item.cost_name}}
            <div class="choose-icon" style="display: none;"></div>
          </div>
            <div class="gzb-fund-list" v-if="item.projectDetail">
                <div v-for="(project,pIndex) in projectList" @click="chooseProject(index,pIndex)" class="gzb-fund-project">{{project.cost_name}}
                </div>
            </div>
          <div class="gzb-delete-righticon" @click="removeItemList(index)" v-if="index > 0">

          </div>
          <clear></clear>
        </div>
        <div class="gzb-add-input gzb-dashed-border">
          <div class="gzb-input-left">
            开始时间<span class="gzb-red-star"></span>
          </div>
            <yd-datetime type="date" class="datetime-input" v-model="item.begin_date" slot="right"></yd-datetime>
          <clear></clear>
        </div>
        <div class="gzb-add-input gzb-dashed-border">
          <div class="gzb-input-left">
            结束时间<span class="gzb-red-star"></span>
          </div>
            <yd-datetime type="date" class="datetime-input" v-model="item.end_date" slot="right" ></yd-datetime>
        </div>
        <div class="gzb-add-input">
          <div class="gzb-input-left">
            预计金额<span class="gzb-red-star"></span>
          </div>
          <span class="gzb-right-span">元</span>
          <input type="number" v-model="item.amount" name="input2" value="">
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
        <div class="gzb-add-photo" >
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
        <div class="btn-hold" @click="addApp(0)">暂存</div>
        <div class="btn-apply blue-bg" @click="addApp(1)">提交</div>
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
//  import {XuntongJSBridge} from '@/js/qingjs'
  import {uploadImg, insertApproval, updateApproval, getCostList} from '@/api/getData'
  // import date from '@/components/date'
  // import {Datetime} from 'vux'
  export default {
    name: 'addApproval',
    components: {
      clear
    },
    data() {
        return {
            user_count: this.$store.state.approvalInfo.user_count,
            trip_dest: this.$store.state.approvalInfo.trip_dest,
            trip_type: this.$store.state.approvalInfo.trip_type,
            description: this.$store.state.approvalInfo.description,
            trip_desc: this.$store.state.approvalInfo.trip_desc,
            item_list: this.$store.state.approvalInfo.item_list,
            files: this.$store.state.approvalInfo.files,
            file_list: this.$store.state.approvalInfo.file_list,
            id: this.$store.state.approvalInfo.id,
            projectList: [],
            loading: false,
            showAlert: false,
            alertContent: '',
            imgloading: false
        }
    },
    methods: {
        gzbAlert(content) {
            this.alertContent = content
            this.showAlert = true
        },
        addItemList() {
            let date = new Date()
            let month = date.getMonth() + 1
            month = month.toString().length === 1 ? '0' + month.toString() : month.toString()
            let initDate = date.getFullYear() + '-' + month + '-01'
            console.log(initDate)
            let listItem = {
                amount: '',
                cost_name: '差旅费',
                begin_date: this.itemWeek,
                end_date: this.itemWeek,
                index: 0,
                projectDetail: false
            }
            this.item_list.push(listItem)
        },
        removeItemList(index) {
            this.item_list.splice(index, 1)
        },
        uploadFile() {
            window.location.href = 'http://cloud.msbu.kingdee.com:82/view/demo.html'
//            let _this = this
//            XuntongJSBridge.call('selectFile', {'selectType': '1'}, function(result) {
//                _this.gzbAlert(JSON.stringify(result))
//            })
        },
        saveInfo() {
            let params = {
                user_count: this.user_count,
                trip_dest: this.trip_dest,
                trip_type: this.trip_type,
                trip_desc: this.trip_desc,
                description: this.description,
                item_list: this.item_list,
                file_list: this.file_list,
                user_id: this.$store.state.userInfo.user_id,
                user_name: this.$store.state.userInfo.user_name,
                pk_psndoc: this.$store.state.userInfo.pk_psndoc,
                pk_corp: this.$store.state.userInfo.pk_corp,
                pk_deptdoc: this.$store.state.userInfo.pk_deptdoc,
                id: this.id
            }
            this.$store.commit('editApproval', params)
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
        upfiles2(val) {
            let _this = this
            let reader = new FileReader()
            let img = new Image()
            let file = val.srcElement.files[0]
            let canvas = document.createElement('canvas')
            let context = canvas.getContext('2d')
            img.onload = function () {
                // 图片原始尺寸
                let originWidth = this.width
                let originHeight = this.height
                // 最大尺寸限制
                let maxWidth = 400
                let maxHeight = 400
                // 目标尺寸
                let targetWidth = originWidth
                let targetHeight = originHeight
                // 图片尺寸超过400x400的限制
                if (originWidth > maxWidth || originHeight > maxHeight) {
                    if (originWidth / originHeight > maxWidth / maxHeight) {
                        // 更宽，按照宽度限定尺寸
                        targetWidth = maxWidth
                        targetHeight = Math.round(maxWidth * (originHeight / originWidth))
                    } else {
                        targetHeight = maxHeight
                        targetWidth = Math.round(maxHeight * (originWidth / originHeight))
                    }
                }

                // canvas对图片进行缩放
                canvas.width = targetWidth
                canvas.height = targetHeight
                // 清除画布
                context.clearRect(0, 0, targetWidth, targetHeight)
                console.log(targetWidth, targetHeight)
                // 图片压缩
                context.drawImage(img, 0, 0, targetWidth, targetHeight)
                let img2 = new Image()
                img2.src = canvas.toDataURL('image/png')
                console.log('img', img2.naturalWidth, img2.naturalHeight)
                img2.imgsrc = img2.src
                // canvas转为blob并上传
                canvas.toBlob(async function (blob) {
                    // 图片ajax上传
//                    let xhr = new XMLHttpRequest()
//                    // 文件上传成功
//                    xhr.onreadystatechange = function() {
//                        if (xhr.status == 200) {
//                            // xhr.responseText就是返回的数据
//                        }
//                    }
//                    // 开始上传
//                    xhr.open("POST", 'upload.php', true)
//                    xhr.send(blob)
                    let form = new FormData()
                    blob.name = 'app.jpeg'
                    form.append('file1', blob)
                    console.log(blob)
                    const res = await uploadImg(form)
                    console.log(res)
                    let img = {
                        id: res.data.data[0].id,
                        path: res.data.data[0].path,
                        name: res.data.data[0].name,
                        size: res.data.data[0].size
                    }
                    img.imgsrc = img2.src
                    _this.file_list.push(img)
                }, file.type || 'image/png')
            }
            // 文件base64化，以便获知图片原始尺寸
            reader.onload = function(e) {
                img.src = e.target.result
                console.log('before', img.naturalWidth, img.naturalHeight)
            }
            reader.readAsDataURL(file)
        },
        async addApp(isSubmit) {
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
                user_count: this.user_count,
                destination: this.trip_dest,
                trip_type: this.trip_type,
                trip_desc: this.trip_desc,
                description: this.description,
                item_list: this.item_list,
                file_list: files,
                mount: this.total.toString(),
                amount: this.total.toString(),
                kjnd: appYear.toString(),
                kjqj: appMonth.toString(),
                zt: isSubmit.toString(),
                user_id: this.$store.state.userInfo.user_id,
                user_name: this.$store.state.userInfo.user_name,
                pk_psndoc: this.$store.state.userInfo.pk_psndoc,
                pk_corp: this.$store.state.userInfo.pk_corp,
                pk_deptdoc: this.$store.state.userInfo.pk_deptdoc,
                method: 'ccsq',
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
                let res = await insertApproval(params)
                if (res.data.flag === '4') {
                    this.$store.commit('setApprovalParam', params)
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
                    this.$store.commit('setAppPath', 'approval')
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
                params.method = 'update-ccsq'
                let res = await updateApproval(params)
                if (res.data.flag === '4') {
                    this.$store.commit('setApprovalParam', params)
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
                    this.$store.commit('setAppPath', 'approval')
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
            this.$router.replace('/hello')
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
        filterFile() {
            let fileList = []
            for (let i = 0; i < this.file_list.length; i++) {
                let file = this.file_list[i]
                file.imgsrc = ''
                fileList.push(file)
            }
            return fileList
        },
        checkFull() {
            if (this.user_count === '') {
                this.gzbAlert('请填写出差人数')
                return false
            }
            if (this.trip_dest === '') {
                this.gzbAlert('请填写出差地点')
                return false
            }
            if (this.trip_type === '') {
                this.gzbAlert('请选择交通工具')
                return false
            }
            if (this.description === '') {
                this.gzbAlert('请填写出差事由')
                return false
            }
            if (this.trip_desc === '') {
                this.gzbAlert('请填写乘坐说明')
                return false
            }
            for (let item of this.item_list) {
                if (item.amount === '' || item.cost_name === '请选择费用项目') {
                    this.gzbAlert('请完善费用明细')
                    return false
                }
            }
            return true
        }
    },
    created: async function () {
        if (this.item_list.length === 0) {
            this.addItemList()
        }
        let params = {
            method: 'getCostsubjList',
            pk_corp: this.$store.state.userInfo.pk_corp
        }
        const cost = await getCostList(params)
        this.projectList = cost.data.data
        console.log(cost)
    },
    computed: {
        total() {
            let count = Number(0)
            for (let item of this.item_list) {
                if (item.amount === '') continue
                count = count + Number(item.amount)
            }
            return count
        },
        itemWeek() {
            let date = new Date()
            let month = date.getMonth() + 1
            let today = date.getDate().toString().length === 1 ? '0' + date.getDate().toString() : date.getDate().toString()
            month = month.toString().length === 1 ? '0' + month.toString() : month.toString()
            return date.getFullYear() + '-' + month + '-' + today
        }
    }
  }
</script>
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
  border: 0;
  font-size: 14px;
  line-height: 20px;
  margin-top: 12px;
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
.gzb-add-input input{
  text-align: right;
  /*margin-top: 4px;*/
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
.gzb-input-left input{
  background-color: #fff;

}
.gzb-input-left input[type="date"]::-webkit-calendar-picker-indicator {
   display: none;
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
  text-align: center;
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
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.gzb-right-icon {
  background: url('../../assets/arrow-down.png') no-repeat center center;
  background-size: 8px auto;
  margin: 13px 8px 13px 24px;
  float: right;
  width: 8px;
  height: 4px;
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
  width: 70px;
  height: 70px;
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
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
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
.choose-icon{
  background: url(../../assets/travel-triangle.png) no-repeat center center;
  background-size: 12px auto;
  width: 26px;
  height: 30px;
  float: right;
}
</style>
<style>
    .yd-radio-icon {
        vertical-align:middle !important;
    }
    .datetime-input {
        width: 21% !important;
        float: right;
    }
</style>









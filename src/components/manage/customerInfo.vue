<template>
    <div class="big-bg">
        <div class="top-client">
            <div class="left-icon">
                <span class="head-portrait"></span>
            </div>
            <div class="middle-mess">
                <p class="client-name">
                    <span>{{vcname}}</span>
                </p>
                <p class="client-phone">
                    <span>{{vpreferredtel}}</span>
                </p>
            </div>
            <div class="right-icon">
                <span class="phone-icon" @click="allotment"></span>
            </div>
            <div class="right-icon" @click='getQuestion'>
                <span class="question-icon"></span>
            </div>
        </div>
        <div class="client-info">
            <div class="client-select">
                <div class="select basic-info" :class="{ changeColor: one }" @click="first">
                    <p>基本信息</p>
                </div>
                <div class="select detail-info" :class="{ changeColor: two }" @click="second">
                    <p>详细信息</p>
                </div>
                <div class="select follow-record" :class="{ changeColor: three }" @click="third">
                    <p>跟进记录</p>
                </div>
            </div>
            <div class="scroll">
                <basicInfo class="basic-info" :class="{ isHide: !one }"></basicInfo>
                <detailInfo :class="{ isHide: !two }"></detailInfo>
                <div class="follow-records" :class="{ isHide: !three }">
                    <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" distance="50">
                        <followRecords slot="list" v-for="(item, index) in recordsList" :code="recordsList[index].rno" :fproceedingtype="recordsList[index].ftype" :dproceedingdate="recordsList[index].ddate" :vproceedingdesc="recordsList[index].vdesc" :srecord="recordsList[index].srecord"></followRecords>
                        <span slot="doneTip">没有客户了~~</span>
                        <img slot="loadingTip" src="../../assets/loading.gif"/>
                    </yd-infinitescroll>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import basicInfo from '@/components/assistant/basicInfo'
    import detailInfo from '@/components/assistant/detailInfo'
    import followRecords from '@/components/assistant/followRecords'
    import clear from '@/components/clear'
    import {getCusRecords, saleList} from '@/api/getData'
    export default {
        name: 'customerInfo',
        data() {
            return {
                one: true,
                two: false,
                three: false,
                vcname: this.$store.state.recordsInfo.name,
                vpreferredtel: this.$store.state.recordsInfo.vpreferredtel,
                recordsList: [],
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
                id: this.$route.params.id,
                page_no: 1,
                isphone: this.$store.state.isphone
            }
        },
        components: {
            basicInfo, detailInfo, followRecords, clear
        },
        methods: {
            newFollowUp: function () {
                let recordInfo = this.$store.state.followType
                recordInfo.typeIndex = 6
                recordInfo.type = 6
                this.$store.commit('setRecordType', recordInfo)
                this.newDate()
                this.$router.push({path: '/assistant/client/customerInfo/' + this.id + '/newFollow'})
            },
            newDate() {
                let date = new Date()
                let month = date.getMonth() + 1
                let day = date.getDate()
                month = month.toString().length === 1 ? '0' + month.toString() : month.toString()
                day = day.toString().length === 1 ? '0' + day.toString() : day.toString()
                let ymd = date.getFullYear() + '-' + month + '-' + day
                this.$store.commit('setymd', ymd)
                return ymd
            },
            first: function () {
                this.one = true
                this.two = false
                this.three = false
            },
            second: function () {
                this.one = false
                this.two = true
                this.three = false
            },
            third: function () {
                this.one = false
                this.two = false
                this.three = true
            },
            async getCusRecords() {
                let params = {
                    method: 'recordList',
                    pk_customer: this.id,
                    // 记得换回'1003121000000001AM8X'
                    page_no: this.page_no,
                    page_size: '20'
                }
                let res = await getCusRecords(params)
                if (res.data.flag === '0') {
                    if (res.data.data === '[]') {
                        console.log('没有数据了~~')
                        this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
                    } else {
                        console.log('请求跟进记录成功！')
                        this.recordsList = [...this.recordsList, ...res.data.data]
                        console.log(this.recordsList)
                        for (let i = 0; i < this.recordsList.length; i++) {
                            this.recordsList[i].rno = this.classAdd(this.recordsList[i].fproceedingtype)
                            this.recordsList[i].ftype = this.typeConversion(this.recordsList[i].fproceedingtype)
                            this.recordsList[i].ddate = this.recordsList[i].dproceedingdate
                            this.recordsList[i].vdesc = this.recordsList[i].vproceedingdesc
                            if (this.recordsList[i].vdesc === null) {
                                this.recordsList[i].srecord = false
                            } else {
                                this.recordsList[i].srecord = true
                            }
                        }
                        this.recordsList = this.recordsList.reverse().sort(function(x, y) {
                            return y.dproceedingdate.localeCompare(x.dproceedingdate)
                        })
                        // console.log('res:' + res)
                        // console.log('recordsList:')
                        // console.log(this.recordsList)
                        return true
                    }
                } else if (this.page_no === 1) {
                    this.recordsList = []
                    return false
                } else {
                    this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
                }
            },
            async loadList() {
                this.page_no++
                let result = await this.getCusRecords()
                if (result) {
                    this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
                }
            },
            async getSaleList() {
                let params = {
                    method: 'adviserliset',
                    fright: this.$store.state.fright
                }
                await saleList(params)
            },
            customerInfo() {
                if (this.$store.state.personalInfo.level.value === '') {
                    this.$store.state.personalInfo.level.value = '请选择客户等级'
                }
                if (this.$store.state.personalInfo.route.value === '') {
                    this.$store.state.personalInfo.route.value = '请选择认知途径'
                }
                if (this.$store.state.personalInfo.annualSalary.value === '') {
                    this.$store.state.personalInfo.annualSalary.value = '请选择年薪'
                }
                if (this.$store.state.personalInfo.education.value === '') {
                    this.$store.state.personalInfo.education.value = '请选择教育程度'
                }
                if (this.$store.state.personalInfo.ageRange.value === '') {
                    this.$store.state.personalInfo.ageRange.value = '请选择年龄范围'
                }
                if (this.$store.state.personalInfo.shopPurpose.value === '') {
                    this.$store.state.personalInfo.shopPurpose.value = '请选择购房用途'
                }
                if (this.$store.state.personalInfo.occupationItems.value === '') {
                    this.$store.state.personalInfo.occupationItems.value = '请选择职业分类'
                }
                if (this.$store.state.personalInfo.totalPrice.value === '') {
                    this.$store.state.personalInfo.totalPrice.value = '请选择总价预算'
                }
                this.$router.push({path: '/assistant/addClientBasic'})
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
                }
            },
            classAdd(data) {
                switch (data) {
                    case 0:
                        return this.statusList[0].code
                    case 1:
                        return this.statusList[1].code
                    case 2:
                        return this.statusList[2].code
                    case 3:
                        return this.statusList[3].code
                    case 4:
                        return this.statusList[4].code
                    case 5:
                        return this.statusList[5].code
                }
            },
            allotment() {
              let allotId = this.$store.state.allotId
              allotId = this.id
              this.$store.commit('setAllotId', allotId)
              this.$router.push('/manage/counsellor')
            },
            getQuestion() {
                this.$router.push('/manage/questionnaireLine/' + this.id)
            },
            init() {
                let personalInfo = this.$store.state.personalInfo
                if (this.$store.state.personalInfo.level.value === '请选择客户等级') {
                    this.$store.state.personalInfo.level.value = ''
                }
                if (this.$store.state.personalInfo.route.value === '请选择认知途径') {
                    this.$store.state.personalInfo.route.value = ''
                }
                if (this.$store.state.personalInfo.annualSalary.value === '请选择年薪') {
                    this.$store.state.personalInfo.annualSalary.value = ''
                }
                if (this.$store.state.personalInfo.education.value === '请选择教育程度') {
                    this.$store.state.personalInfo.education.value = ''
                }
                if (this.$store.state.personalInfo.ageRange.value === '请选择年龄范围') {
                    this.$store.state.personalInfo.ageRange.value = ''
                }
                if (this.$store.state.personalInfo.shopPurpose.value === '请选择购房用途') {
                    this.$store.state.personalInfo.shopPurpose.value = ''
                }
                if (this.$store.state.personalInfo.occupationItems.value === '请选择职业分类') {
                    this.$store.state.personalInfo.occupationItems.value = ''
                }
                if (this.$store.state.personalInfo.totalPrice.value === '请选择总价预算') {
                    this.$store.state.personalInfo.totalPrice.value = ''
                }
                this.$store.commit('addPersonal', personalInfo)
            },
            encrypting() {
              let test2 = this.$store.state.personalInfo
              let test = test2.id
              if (test === null || test === '') {
                test2.id = test
              } else {
                test2.id = test.replace(/(\d{10})(\d{4})(\d{4})/g, '$1****$3')
              }
              this.$store.commit('addPersonal', test2)
            }
        },
        created: function() {
            this.getCusRecords()
            this.init()
            this.getSaleList()
            this.encrypting()
        }
    }
</script>
<style scoped>
    .big-bg {
        background: #EAEFF3;
    }
    .top-client {
        width: 100%;
        height: 70px;
        background: #FFFFFF;
        position: fixed;
        top: 0;
    }
    .top-client .left-icon {
        width: 16.9%;
        height: 100%;
        float: left;
    }
    .top-client .left-icon .head-portrait {
        display: block;
        width: 30px;
        height: 30px;
        margin: 20px auto;
        background: url(../../assets/head-portrait.png) no-repeat center;
        background-size: 100%;
    }
    .top-client .middle-mess {
        float: left;
        width: 50%;
        height: 100%;
        overflow: hidden;
    }
    .top-client .middle-mess .client-name {
        margin-top: 8px;
        width: 100%;
        height: 28px;
        font-size: 16px;
        color: #030303;
        line-height: 28px;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .top-client .middle-mess .client-phone {
        height: 22px;
        font-size: 14px;
        color: #7A797B;
        line-height: 22px;
        text-align: left;
    }
    .top-client .right-icon {
        /*width: 16.9%;
        height: 100%;*/
        float: right;
    }
    .top-client .right-icon .question-icon {
        display: block;
        width: 30px;
        height: 30px;
        margin: 20px 12px;
        background: url(../../assets/questionnaire.png) no-repeat center;
        background-size: 100%;
    }
    .top-client .right-icon .phone-icon {
        display: block;
        width: 30px;
        height: 30px;
        margin: 20px 12px 20px 0;
        background: url(../../assets/allot.png) no-repeat center;
        background-size: 100%;
    }
    .client-info {
        width: 100%;
        position: fixed;
        background: #FFFFFF;
        top: 78px;
    }
    .client-info .client-select {
        width: 100%;
        height: 40px;
    }
    .client-info .client-select .select {
        float: left;
        height: 100%;
        color: #7A797B;
        border-bottom: 1px solid #EAEFF3;
    }
    .client-info .client-select .changeColor {
        color:  #3CBAFF;
        border-bottom: 3px solid #3CBAFF;
    }
    .client-info .client-select .select p {
        height: 15px;
        margin: 11px auto 14px;
        font-size: 15px;
        line-height: 15px;
        border-right: 2px solid #DCE1E8;
    }
    .client-info .client-select .basic-info {
        width: 33.1%;
    }
    .client-info .client-select .detail-info {
        width: 33.1%;
    }
    .client-info .client-select .follow-record {
        width: 33.8%;
    }
    .client-info .client-select .follow-record p {
        border: 0;
    }
    .scroll {
        overflow: scroll;
        height: 91%;
    }
    .scroll .basic-info {
        position: fixed;
        background: #FFFFFF;
        top: 118px;
        bottom: 52px;
        overflow: scroll;
    }
    .scroll .follow-records {
        width: 100%;
        position: fixed;
        background: #FFFFFF;
        top: 118px;
        bottom: 52px;
        overflow: scroll;
    }
    .isHide {
        display: none;
    }
    .bottom-client {
        width: 100%;
        height: 44px;
        background: #FFFFFF;
        position: fixed;
        bottom: 0;
    }
    .bottom-client .perfect-info {
        width: 50%;
        height: 100%;
        border: 0 solid #B9C7D2;
        float: left;
    }
    .bottom-client .new-followup {
        width: 50%;
        height: 100%;
        background: #3CBAFF;
        border: 0 solid #3CBAFF;
        float: left;
        cursor: pointer;
    }
    .button {
        width: 100%;
        height: 20px;
        margin: 12px 0;
        font-size: 15px;
    }
    .icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-left: 23.125%;
        float: left;
    }
    .perfect {
        background: url(../../assets/perfect-info.png) no-repeat center;
        background-size: 100%;
    }
    .new {
        background: url(../../assets/new-followup.png) no-repeat center;
        background-size: 100%;
    }
    .content {
        display: inline-block;
        width: 60px;
        height: 15px;
        line-height: 15px;
        margin: 2px 6px 3px;
        float: left;
    }
    .content-perfect {
        color: #98A1A8;
    }
    .content-new {
        color: #FFFFFF;
    }
</style>

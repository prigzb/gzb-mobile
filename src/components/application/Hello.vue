<template>
<div class="hello" :class="{ 'gzb-no-content': hasContent }">
    <div class="gzb-nav">
        <div class="gzb-nav-left kitbox">
            <div class="gzb-nav-item kitbox" @click="showList">
                <span class="gzb-arrow">{{showstatus}}</span>
            </div>
            <div class="gzb-nav-item kitbox">
                <router-link to='/select/approval'><span class="gzb-arrow">{{dateLabel}}</span></router-link>
            </div>
            <clear></clear>
        </div>
        <div class="gzb-nav-right" @click="toAdd"></div>
    </div>
    <div class="gzb-status-list" v-if="listshown">
      <div class="gzb-status-item" v-for="(status,index) in statusList" :key="status.id" @click="chooseList(index)" >
        <span>{{status.name}}</span>
      </div>
    </div>
     <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" distance="50">
    <div class="gzb-travel-list" v-for="group in renderList" :key="group.id" slot="list">
        <div class="gzb-travel-month">
          <span>{{group.name}}</span>
        </div>
        <travelItem v-for="app in group.data" :key="app.id" :id="app.id" :title="app.trip_dest" :status="app.billStatus" :color="app.color" :tFrom="app.beginDate" :tTo="app.endDate" :people="app.user_count" :number="app.total" :travelType="app.icon_type" ></travelItem>
    </div>
    <span slot="doneTip">没有数据啦~~</span>
    <img slot="loadingTip"/>
     </yd-infinitescroll>
    <!--<span @click="loadList">加载更多</span>-->
</div>
</template>

<script>
import ready from '@/components/Ready'
import travelItem from '@/components/application/travelItem'
import clear from '@/components/clear'
import {insertTravel, getApplicaionList, insertPayment} from '@/api/getData'
import {XuntongJSBridge} from '@/js/qingjs'

export default {
    name: 'hello',
    data: function () {
        return {
            page_no: 1,
            listshown: false,
            geturl: 'http://61.136.222.247:8086//servlet/MobileApproveServlet',
            statusList: [{
                name: '全部状态',
                code: '',
                color: ''
            }, {
                name: '待审批',
                code: '1001',
                color: 'gzb-blue'
            }, {
                name: '已通过',
                code: '1002',
                color: 'gzb-green'
            }, {
                name: '未通过',
                code: '1003',
                color: 'gzb-gray'
            }, {
                name: '暂存',
                code: '1004',
                color: 'gzb-yellow'
            }],
            typeList: [{
                name: '火车',
                type: 'gzb-train'
            }, {
                name: '汽车',
                type: 'gzb-bus'
            }, {
                name: '飞机',
                type: 'gzb-flight'
            }],
            dateList: ['全部时间', '当日', '本周', '本月', '本年', '自定义'],
            appList: [],
            renderList: [],
            hasContent: false
        }
    },
    components: {
        ready, travelItem, clear
    },
    methods: {
        chooseList(index) {
            let searchInfo = this.$store.state.approval
            searchInfo.billStatus = this.statusList[index].code
            searchInfo.statusIndex = index
            this.$store.commit('setApproval', searchInfo)
            this.page_no = 1
            this.appList = []
            this.renderList = []
            this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
            this.loadList()
            this.listshown = !this.listshown
        },
        showList() {
          this.listshown = !this.listshown
        },
        async addTravel() {
            // let res = await getApplicaionList('a3b261e9-83c7-11e7-aa29-005056b8712a', '1', '上海', '火车', '说明：出差', '', '', '', '', '', '', '', '')
            let params = {
                destination: '上海',
                description: '接洽项目',
                begin_date: '2017-02-03',
                amount: '29500',
                bamount: '29500',
                kjnd: '2017',
                kjqj: '02',
                zt: '0',
                user_id: this.$store.state.userInfo.user_id,
                pk_psndoc: this.$store.state.userInfo.pk_psndoc,
                pk_corp: this.$store.state.userInfo.pk_corp,
                pk_deptdoc: this.$store.state.userInfo.pk_deptdoc,
                bdeptid: this.$store.state.userInfo.pk_deptdoc,
                bcorp: this.$store.state.userInfo.pk_corp,
                method: 'clfbx'
            }
            let res = await insertTravel(params)
            console.log(res)
        },
        async getList() {
            // let res = await getApplicaionList('a3b261e9-83c7-11e7-aa29-005056b8712a', '1', '上海', '火车', '说明：出差', '', '', '', '', '', '', '', '')
            let params = {
                user_id: '1003121000000000E0Y7',
                page_no: '1',
                page_size: '5'
            }
            let res = await getApplicaionList(params)
            console.log(res)
        },
        async addPayment() {
            // let res = await getApplicaionList('a3b261e9-83c7-11e7-aa29-005056b8712a', '1', '上海', '火车', '说明：出差', '', '', '', '', '', '', '', '')
            let params = {
                user_id: this.$store.state.userInfo.user_id,
                pk_psndoc: this.$store.state.userInfo.pk_psndoc,
                pk_corp: this.$store.state.userInfo.pk_corp,
                pk_deptdoc: this.$store.state.userInfo.pk_deptdoc,
                bdeptid: this.$store.state.userInfo.pk_deptdoc,
                bcorp: this.$store.state.userInfo.pk_corp,
                description: '接洽项目费用',
                begin_time: '2017-02-22',
                amount: '30500',
                notamount: '25500',
                kjnd: '2017',
                kjqj: '02',
                zt: '0',
                fyproject: '招待费',
                skunit: '佰邦达测试',
                bankname: '中国银行',
                bankdeposit: '北京分行',
                htamount: '100000',
                leljamount: '150000',
                content: '招待费具体内容',
                amounte: '5000',
                method: 'zjzf'
            }
            let res = await insertPayment(params)
            console.log(res)
        },
        async getAPPList() {
            // let res = await getApplicaionList('a3b261e9-83c7-11e7-aa29-005056b8712a', '1', '上海', '火车', '说明：出差', '', '', '', '', '', '', '', '')
            let params = {
                user_id: this.$store.state.userInfo.user_id,
                begin_date: this.$store.state.approval.beginDate,
                end_date: this.$store.state.approval.endDate,
                bill_type: '264X-wangbao5',
                search_type: '',
                method: 'getList',
                page_no: this.page_no,
                page_size: 5,
                bill_status: this.$store.state.approval.billStatus
            }
            const res = await getApplicaionList(params)
            if (res.data.flag === '0') {
                this.hasContent = false
                this.appList = [...this.appList, ...res.data.data.list]
                for (let i = 0; i < this.appList.length; i++) {
                    this.appList[i].beginDate = this.timeFormatter(this.appList[i].begin_date)
                    this.appList[i].endDate = this.timeFormatter(this.appList[i].end_date)
                    let status = this.statusFormatter(this.appList[i].bill_status)
                    this.appList[i].billStatus = status.name
                    this.appList[i].color = status.color
                    this.appList[i].icon_type = this.typeFormatter(this.appList[i].trip_type)
                    this.appList[i].groupBy = this.timeSplit(this.appList[i].create_date)
                }
                this.makeGroup()
                return true
            } else if (this.page_no === 1) {
                this.appList = []
                this.renderList = []
                this.hasContent = true
                return false
            } else {
                this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
            }
        },
        async loadList() {
            let result = await this.getAPPList()
            this.page_no++
            if (result) {
                this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
            }
        },
        statusFormatter(status) {
            for (let i = 0; i < this.statusList.length; i++) {
                if (this.statusList[i].code === status) {
                    let res = {
                        name: this.statusList[i].name,
                        color: this.statusList[i].color
                    }
                    return res
                }
            }
            return ''
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
        timeSplit(date) {
            let reg = new RegExp('0.*')
            let reg2 = new RegExp('.*.0.*')
            let dateArr = date.split('-')
            if (reg.test(dateArr[1]) && !reg2.test(dateArr[1])) {
                dateArr[1] = dateArr[1].slice(1)
            }
            if (reg.test(dateArr[2]) && !reg2.test(dateArr[2])) {
                dateArr[2] = dateArr[2].slice(1)
            }
            return dateArr
        },
        typeFormatter(type) {
            for (let i = 0; i < this.typeList.length; i++) {
                if (this.typeList[i].name === type) {
                    return this.typeList[i].type
                }
            }
            return ''
        },
        makeGroup(list) {
            this.renderList = []
            const timeSet = new Set()
            for (let i of this.appList) {
                let date = new Date()
                if (i.groupBy[0] === date.getFullYear().toString()) {
                    timeSet.add(i.groupBy[1])
                } else {
                    timeSet.add(i.groupBy[0])
                }
            }
            console.log(timeSet)
            for (let i of timeSet) {
                let group = {
                    name: '',
                    data: []
                }
                if (i.length === 4) {
                    group.name = i + '年'
                } else {
                    group.name = i + '月'
                }
                for (let app of this.appList) {
                    if (app.groupBy[0] === i) {
                        group.data.push(app)
                    } else if (app.groupBy[1] === i) {
                        group.data.push(app)
                    }
                }
                this.renderList.push(group)
            }
            console.log(this.renderList)
        },
        toAdd() {
            this.$store.commit('emptyApproval')
            this.$router.push('/addApproval')
        }
    },
    created: function() {
        // this.getmess()
//         this.addTravel()
        // this.getList()
//         this.addPayment()
        this.loadList()
        XuntongJSBridge.call('setWebViewTitle', {'title': '出差申请'})
    },
    computed: {
        showstatus() {
            return this.statusList[this.$store.state.approval.statusIndex].name
        },
        dateLabel() {
            return this.dateList[this.$store.state.approval.dateIndex]
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}
.hello {
    background-color: #EBEFF3;
    height: 100%;
    margin-top: 43px;
}
.gzb-no-content {
    background: url('../../assets/no-content.png') no-repeat center center;
    background-size: 100% auto;
}
.gzb-nav {
    position: fixed;
    right: 0;
    top: 0;
    left: 0;
    text-align: center;
    background-color: #fff;
    border-bottom: 1px solid #EAEFF3
}
.gzb-nav-left {
    width: 88%;
    border-right: 1px solid #EAEFF3;
    float: left;
}
.kitbox {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.gzb-nav-item {
    width: 50%;
    text-align: center;
    margin: 10px 0;
    float: left;
}
.gzb-nav-item:first-child {
    border-right: 1px solid #EAEFF3;
}
.gzb-arrow {
    background: url('../../assets/arrow-down-bule.png') no-repeat center right;
    background-size: 12px auto;
    padding-right: 13px;
    font-size: 15px;
    color: #3CBAFF;
}
.gzb-arrow.down{
    background: url('../../assets/arrow-up-bule.png') no-repeat center right;
    background-size: 12px auto;
}
.gzb-nav-right {
    width: 12%;
    height: 42px;
    float: right;
    background: url('../../assets/icon-add.png') no-repeat center center;
    background-size: 20px auto;
}
.gzb-travel-list {
    width: 100%;
}
.gzb-travel-month {
    margin: 6px 4%;
    text-align: left;
    font-size: 13px;
}
.gzb-travel-month:first-child {
    padding-top:8px
}
.gzb-status-list {
    position: fixed;
    left: 10px;
    top: 31px;
    width:37.5%;
    height: 190px;
    background: url('../../assets/status-box.png') no-repeat center center;
    background-size: auto 190px;
}
.gzb-status-item {
    margin: 0px 12px;
    padding: 2px 0px;
    border-bottom: 1px solid #EAEFF3;
    line-height: 31px;
    font-size: 13px;
}
.gzb-status-item:first-child {
    margin: 8px 12px 0px 12px;
}
.gzb-status-item:last-child {
    border-bottom: 0px;
}
</style>

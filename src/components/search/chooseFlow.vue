<template>
    <div class="choose-company">
        <ul>
            <li v-for="(person,index) in personList">
                <input type="checkbox" @click="check(index)">
                {{person.name}}
            </li>
        </ul>
        <div class="gzb-add-bottom">
            <div class="bottom-right">
                <div class="btn-hold" @click="$router.go(-1)">取消</div>
                <div class="btn-apply blue-bg" @click="addCustomer()">确定</div>
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
    </div>
</template>

<script>
    import paymentItem from '@/components/payment/paymentItem'
    import clear from '@/components/clear'
    import {insertApproval, updateApproval} from '@/api/getData'
    export default {
        name: 'index',
        data() {
            return {
                listshown: false,
                personList: [],
                path: this.$route.params.path,
                item: this.$route.params.item,
                code: this.$route.params.code,
                choosenList: [],
                showAlert: false,
                alertContent: '',
                loading: false
            }
        },
        computed: {},
        mounted() {},
        methods: {
            gzbAlert(content) {
                this.alertContent = content
                this.showAlert = true
            },
            showlist() {
                this.listshown = !this.listshown
            },
            toChild(index) {
                if (this.item === 'fund') {
                    this.$store.commit('setStaff', this.personList[index])
                } else if (this.item === 'app') {
                    this.$store.commit('setStaff', this.personList[index])
                }
                this.$router.go(-1)
            },
            check(index) {
                let person = {
                    choose: !this.choosenList[index].choose,
                    pk: this.choosenList[index].pk
                }
                console.log(person)
                this.choosenList.splice(index, 1, person)
            },
            async addCustomer() {
                if (this.loading) return false
                this.loading = true
                let params = {}
                let appPath = this.$store.state.appPath
                let goTo = ''
                if (appPath === 'approval') {
                    params = this.$store.state.approvalParam
                    goTo = '/hello'
                } else if (appPath === 'travel') {
                    params = this.$store.state.travelParam
                    goTo = '/indexTravel'
                } else if (appPath === 'fund') {
                    params = this.$store.state.fundParam
                    goTo = '/fund'
                } else if (appPath === 'payment') {
                    params = this.$store.state.paymentParam
                    goTo = '/payment'
                }
                let list = []
                for (let item of this.choosenList) {
                    if (item.choose) {
                        list.push({
                            pk: item.pk
                        })
                    }
                }
                if (list.length === 0) {
                    this.gzbAlert('请选择审批人员')
                    this.loading = false
                    return false
                }
                params.xusname = list
                if (params.djbh === '') {
                    let res = await insertApproval(params)
                    if (res.data.flag === '1') {
                        this.gzbAlert('添加单据失败')
                        this.loading = false
                        return false
                    }
                    console.log('insert', res)
                } else {
                    if (appPath === 'approval') {
                        params = this.$store.state.approvalParam
                        params.method = 'update-ccsq'
                        goTo = '/hello'
                    } else if (appPath === 'travel') {
                        params = this.$store.state.travelParam
                        params.method = 'update-clfbx'
                        goTo = '/indexTravel'
                    } else if (appPath === 'fund') {
                        params = this.$store.state.fundParam
                        params.method = 'update-fybx'
                        goTo = '/fund'
                    } else if (appPath === 'payment') {
                        params = this.$store.state.paymentParam
                        params.method === 'update-zjzf'
                        goTo = '/payment'
                    }
                    let res = await updateApproval(params)
                    if (res.data.flag === '1') {
                        this.gzbAlert('修改单据失败')
                        this.loading = false
                        return false
                    }
                    console.log('update', res)
                }
                this.$router.replace(goTo)
            }
        },
        components: {
            paymentItem,
            clear
        },
        beforeRouteUpdate (to, from, next) {
            this.parent = to.params.path
            next()
        },
        created: function () {
            this.personList = this.$store.state.flowPerson
            for (let person of this.personList) {
                this.choosenList.push({
                    choose: false,
                    pk: person.pk
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .choose-company{
        text-align: left;
        background-color: #fff;
    }
    .choose-company ul li{
        line-height: 44px;
        font-size: 14px;
        color: #030303;
        margin-left: 4%;
        padding-right: 4%;
        border-bottom: 1px solid #EAEFF3;
    }
    .choose-company ul li.curr{
        color: #3CBAFF;
    }
    .choose-company ul li:last-child{
        border-bottom: 0;
    }
    .company-next{
        background: url(../../assets/arrow-right.png) no-repeat 96% center;
        background-size: 8px auto;
    }
    .messFooter {
        position: fixed;
        background: #ffffff;
        border-top: 1px solid #B9C7D2;
        height: 52px;
        line-height: 52px;
        margin-top: 8px;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
    }
    .check-input {
        font-size: 16px;
        width: 100%;
        height: 52px;
        color: #3CBAFF;
        font-family: 'PingFangSC-Regular';
    }
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
        text-align: center;

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
</style>

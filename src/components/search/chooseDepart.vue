<template>
    <div class="choose-company">
        <ul>
            <li v-for="(depart,index) in departList" @click="toChild(index)">{{depart.deptname}}</li>
        </ul>
    </div>
</template>

<script>
    import paymentItem from '@/components/payment/paymentItem'
    import clear from '@/components/clear'
    import {getDepartList} from '@/api/getData'
    export default {
        name: 'index',
        data() {
            return {
                listshown: false,
                departList: [],
                path: this.$route.params.path,
                item: this.$route.params.item,
                code: this.$route.params.code
            }
        },
        computed: {},
        mounted() {},
        methods: {
            showlist() {
                this.listshown = !this.listshown
            },
            toChild(index) {
                if (this.item === 'fund') {
                    console.log(this.departList[index])
                    this.$store.commit('setDepartFund', this.departList[index])
                } else if (this.item === 'app') {
                    this.$store.commit('setDepartApp', this.departList[index])
                    this.$store.commit('setStaff', {psnname: ''})
                }
                this.$router.go(-1)
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
        created: async function () {
            let params = {}
            params.method = 'selectdeptname'
            params.pk_corp = this.code
            let depart = await getDepartList(params)
            this.departList = depart.data.data.list
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
</style>

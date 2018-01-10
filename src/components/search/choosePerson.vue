<template>
    <div class="choose-company">
        <ul>
            <li v-for="(person,index) in personList" @click="toChild(index)">{{person.psnname}}</li>
        </ul>
    </div>
</template>

<script>
    import paymentItem from '@/components/payment/paymentItem'
    import clear from '@/components/clear'
    import {getStaffList} from '@/api/getData'
    export default {
        name: 'index',
        data() {
            return {
                listshown: false,
                personList: [],
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
                    this.$store.commit('setStaff', this.personList[index])
                } else if (this.item === 'app') {
                    this.$store.commit('setStaff', this.personList[index])
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
            params.method = 'selectpsndoc'
            params.pk_deptdoc = this.code
            let staff = await getStaffList(params)
            this.personList = staff.data.data.list
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

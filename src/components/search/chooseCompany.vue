<template>
  <div class="choose-company">
    <ul>
      <li @click="toChild('all')" v-if="parent === '0'">全部公司</li>
      <li v-for="(company,index) in companyTree" :key="company.id" v-if="company.parent_code === parent" v-bind:class="{'company-next': company.child_size > 0}" @click="toChild(index)">{{company.vname}}</li>
    </ul>
  </div>
</template>

<script>
  import paymentItem from '@/components/payment/paymentItem'
  import clear from '@/components/clear'
  export default {
    name: 'index',
    data() {
      return {
          listshown: false,
          companyTree: this.$store.state.companyTree,
          path: this.$route.params.path,
          item: this.$route.params.item,
          parent: this.$route.params.code
      }
    },
    computed: {},
    mounted() {},
    methods: {
        showlist() {
            this.listshown = !this.listshown
        },
        toChild(index) {
            if (index === 'all') {
                if (this.item === 'fund') {
                    this.$store.commit('setCompanyFund', {vname: '全部公司', code: ''})
                    this.$store.commit('setDepartFund', {})
                }
                if (this.path === 'fund') {
                    this.$router.push('/fund/addReceipt')
                } else if (this.path === 'search') {
                    this.$router.push('/indexSearch')
                } else if (this.path === 'travel') {
                    this.$router.push('/travelNew')
                }
                return true
            }
            if (this.companyTree[index].child_size === 0) {
                if (this.item === 'fund') {
                    this.$store.commit('setCompanyFund', this.companyTree[index])
                    this.$store.commit('setDepartFund', {dept_name: ''})
                }
                if (this.path === 'fund') {
                    this.$router.push('/fund/addReceipt')
                } else if (this.path === 'search') {
                    this.$router.push('/indexSearch')
                } else if (this.path === 'payment') {
                    this.$router.push('/payment/addReceipt')
                } else if (this.path === 'travel') {
                    this.$router.push('/travelNew')
                }
            } else {
                this.$router.push('/searchCompany/' + this.path + '/' + this.item + '/' + this.companyTree[index].code)
            }
        }
    },
    components: {
      paymentItem,
      clear
    },
    beforeRouteUpdate (to, from, next) {
        this.parent = to.params.code
        next()
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

<template>
  <div class="performanceSign">
    <performanceHeader></performanceHeader>
    <form>
      <div class="search">
        <div class="search-white">
          <div class="search-image">
            <input type="text" name="search" placeholder="搜索 姓名、电话后四位" v-model="searchContent" ref='blur'>
            <clear></clear>
          </div>
        </div>
      </div>
    </form>
    <subscriptionItem v-for="returnMess in returnMesss" :customerName="returnMess.customername" :phone="returnMess.tel" :place="returnMess.housecode" :billid="returnMess.billid" v-if="returnMesss.length > 0">
    </subscriptionItem>
    <div class="no-content" v-if="returnMesss.length == 0">
      <img src="../../assets/no-content.png">
    </div>
  </div>
</template>

<script>
  import performanceHeader from '@/components/manage/performanceHeader'
  import subscriptionItem from '@/components/manage/subscriptionItem'
  import clear from '@/components/clear'
  import {manageSale} from '@/api/getData'

  export default {
    name: 'performanceSign',
    components: {
      performanceHeader, subscriptionItem, clear
    },
    data() {
      return {
        searchContent: '',
        params: {
          method: 'selectyudinglist',
          pk_project: this.$store.state.manageProject.pk_project,
          pk_user: this.$store.state.userInfo.user_id,
          begin_date: this.$store.state.manageSaleDate.begin_date,
          end_date: this.$store.state.manageSaleDate.end_date,
          searchname: ''
        },
        returnMesss: ''
      }
    },
    methods: {
      async getMess() {
        let res = await manageSale(this.params)
        console.log(res)
        this.returnMesss = res.data.data.list
      }
    },
    watch: {
      searchContent: function() {
        this.params.searchname = this.searchContent
        this.getMess()
      }
    },
    created: function() {
      this.getMess()
    }
  }
</script>

<style scoped>
  .search {
    height: 44px;
    padding-top: 8px;
  }
  .search-white {
    margin: 0 auto;
    background: #ffffff;
    height: 28px;
    width: 93.1%;
    border-radius: 100px;
    line-height: 28px;
    padding-left: 27.8%;
    font-family: 'MicrosoftYaHei';
    color: #98A1A8;
    font-size: 13px;
    padding-top: 6px;
  }
  .search-image {
    padding-left: 23.5px;
    background: url('../../assets/glass-grey.png') left center no-repeat;
    background-size: 14px 14px;
  }
  .search-image input{
    float: left;
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    font-family: 'MicrosoftYaHei'; 
    color: #98A1A8;  
  }
  .no-content img {
    width: 100%;
  }
</style>
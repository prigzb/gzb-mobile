<template>
  <div class="performanceReserve">
    <performanceHeader></performanceHeader>
    <form>
      <div class="search">
        <div class="search-white">
          <div class="search-image">
            <input type="text" name="search" placeholder="搜索 姓名、电话" v-model='searchContent'>
          </div>
        </div>
      </div>
    </form>
    <clientInfo v-for="(reserve, index) in reserves" :name="reserve.customername" :vpreferredtel="reserve.tel"></clientInfo>
  </div>
</template>

<script>
  import performanceHeader from '@/components/assistant/performanceHeader'
  import clientInfo from '@/components/assistant/clientInfo'
  import {reserveDetails} from '@/api/getData'

  export default {
    name: 'performanceReserve',
    components: {
      performanceHeader, clientInfo
    },
    data() {
      return {
        searchContent: '',
        reserves: []
      }
    },
    methods: {
      async getDetails() {
        let params = {
          method: 'selectyudinglist',
          pk_project: '00011210000000003JXH',
          pk_user: '0001121000000000I0BC',
          begin_date: '2017-09-21',
          end_date: '2017-10-21',
          searchname: ''
        }
        let res = await reserveDetails(params)
        console.log(res)
        this.reserves = res.data.data.list
      }
    },
    created: function() {
      this.getDetails()
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
  }
  .search-image {
    background: url('../../assets/glass-grey.png') left center no-repeat;
    background-size: 14px 14px;
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    font-family: 'MicrosoftYaHei'; 
    color: #98A1A8;  
  }
</style>
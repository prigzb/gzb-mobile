<template>
	<div class="performanceSign">
		<performanceHeader></performanceHeader>
    <form>
      <div class="search">
        <div class="search-white">
          <div class="search-image">
            <input type="text" name="search" placeholder="搜索 姓名、电话" v-model="searchContent">
            <clear></clear>
          </div>
        </div>
      </div>
    </form>
		<subscriptionItem v-for="qianyueMess in qianyueMesss" :customerName="qianyueMess.customername" :phone="qianyueMess.tel" :place="qianyueMess.housecode" :billid="qianyueMess.billid" v-if="qianyueMesss.length > 0">
		</subscriptionItem>
    <div class="no-content" v-if="qianyueMesss.length == 0">
      <img src="../../assets/no-content.png">
    </div>
	</div>
</template>

<script>
	import performanceHeader from '@/components/assistant/performanceHeader'
	import subscriptionItem from '@/components/assistant/subscriptionItem'
  import {reserveDetails} from '@/api/getData'
  import clear from '@/components/clear'
	export default {
    name: 'performanceSign',
    components: {
      performanceHeader, subscriptionItem, clear
    },
    data() {
      return {
        qianyueMesss: '',
        searchContent: '',
        params: {
          method: 'selectqianyuelist',
          pk_project: this.$store.state.selectedProject.pk_project,
          pk_user: this.$store.state.userInfo.user_id,
          begin_date: this.$store.state.performanceDate.begin_date,
          end_date: this.$store.state.performanceDate.end_date,
          searchname: ''
        }
      }
    },
    methods: {
      async getMess() {
        let res = await reserveDetails(this.params)
        console.log(res)
        this.qianyueMesss = res.data.data.list
      }
    },
    created: function() {
      this.getMess()
    },
    watch: {
      searchContent: function() {
        this.params.searchname = this.searchContent
        this.getMess()
      }
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
  .search-image input {
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
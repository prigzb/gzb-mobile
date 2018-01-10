<template>
	<div class="performancePayment">
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
		<div class="subscriptionItem" v-for="(huikuanMess, index) in huikuanMesss" @click="jump(index)" v-if="huikuanMesss.length > 0">
			<div class="left">
				<span>{{ huikuanMess.housecode }}</span>
				<div>累计回款: <span>{{ huikuanMess.bl }}<span>%</span></span></div>
			</div>
			<div class="right">
				<div>{{ huikuanMess.customername }}</div>
				<span>{{ huikuanMess.tel }}</span>
			</div>
			<clear></clear>
		</div>
    <div class="no-content" v-if="huikuanMesss.length == 0">
      <img src="../../assets/no-content.png">
    </div>
	</div>
</template>

<script>
	import performanceHeader from '@/components/assistant/performanceHeader'
	import clear from '@/components/clear'
	import {reserveDetails} from '@/api/getData'

	export default {
    name: 'performancePayment',
    components: {
      performanceHeader, clear
    },
    data() {
      return {
        huikuanMesss: '',
        params: {
          method: 'selecthuikuanlist',
          pk_project: this.$store.state.selectedProject.pk_project,
          pk_user: this.$store.state.userInfo.user_id,
          begin_date: this.$store.state.performanceDate.begin_date,
          end_date: this.$store.state.performanceDate.end_date,
          searchname: ''
        },
        searchContent: ''
      }
    },
    methods: {
      async getMess() {
        let res = await reserveDetails(this.params)
        console.log(res)
        this.huikuanMesss = res.data.data.list
      },
      jump(index) {
        let billid = this.huikuanMesss[index].billid
        this.$store.commit('setBillid', billid)
        this.$router.push('/assistant/huikuanHouse')
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
	.subscriptionItem {
		font-family: 'PingFangSC-Regular';
		height: 55px;
		background: #ffffff;
		padding: 0 12px;
		border-bottom: 1px solid #EAEFF3;
	}
	.left {
		margin-top: 8px;
		float: left;
		font-size: 16px;
		color: #030303;
		text-align: left;
	}
	.left div {
		color: #7A797B;
		font-size: 12px;
	}
	.left div span {
		color: #3CBAFF;
	}
	.right div {
		font-size: 14px;
		color: #030303;
		text-align: right;
		margin-bottom: 4px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
	}
	.right span {
		color: #7A797B;
	}
	.right {
		margin-top: 8px;
		float: right;
    width: 60%;
    text-align: right;
	}
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
<template>
	<div class="performanceHouse">
		<div class="house-mess">
			<div class="left">
				<img src="../../assets/house-mess.png">
				<span>房间信息</span>
			</div>
			<clear></clear>
		</div>
		<houseItem leftContent='房间名称' :rightContent='vhname' v-if="vhname != null"></houseItem>
		<houseItem leftContent='户型' :rightContent='vroomname' v-if="vroomname != null"></houseItem>
		<houseItem leftContent='朝向' :rightContent='votname' v-if="votname != null"></houseItem>
		<houseItem leftContent='建筑面积' :rightContent="nbuildarea + 'm²'" v-if="nbuildarea != null"></houseItem>
		<houseItem leftContent='套内面积' :rightContent="ninarea + 'm²'" v-if="ninarea != null"></houseItem>
		<houseItem leftContent='表单价' :rightContent="price + '元/m²'" v-if="price != null"></houseItem>
		<houseItem leftContent='表总价' :redContent='prices' rightContent="元" v-if="prices != null"></houseItem>
		<div v-for='client in clientMess' v-if="(client.vcname != null) || (client.fccardname != null) || (client.vccardnum != null) || (client.vpreferredtel != null) || (sell_channel != null)">
			<div class="customer-mess">
				<div class="left">
					<img src="../../assets/customer-mess.png">
					<span>客户信息</span>
				</div>
				<clear></clear>
			</div>
			<houseItem leftContent='客户姓名' :rightContent='client.vcname' v-if="client.vcname != null"></houseItem>
			<houseItem leftContent='证件类型' :rightContent='getType(client.fccardname)' v-if="client.fccardname != null"></houseItem>
			<houseItem leftContent='证件号码' :rightContent="formats(client.vccardnum)" v-if="client.vccardnum != null"></houseItem>
			<houseItem leftContent='电话' :rightContent="format(client.vpreferredtel)" v-if="client.vpreferredtel != null"></houseItem>
			<houseItem leftContent='成交渠道' :rightContent='sell_channel' v-if="sell_channel != null"></houseItem>
		</div>
		<div class="sell-mess" v-if="(dsubscdate != null) || (dsigndate != null) || (nsellareaprice != null) || (nbalancemny != null) || (vpmname != null) || (seller_name != null)">
			<div class="left">
				<img src="../../assets/sell.png">
				<span>销售情况</span>
			</div>
			<clear></clear>
		</div>
		<houseItem leftContent='认购日期' :rightContent='dsubscdate' v-if="dsubscdate != null"></houseItem>
		<houseItem leftContent='签约日期' :rightContent='dsigndate' v-if="dsigndate != null"></houseItem>
		<houseItem leftContent='成交单价' :rightContent="nsellareaprice + '元/m²'" v-if="nsellareaprice != null"></houseItem>
		<houseItem leftContent='成交总价' :redContent='nbalancemny' rightContent="元" v-if="nbalancemny != null"></houseItem>
		<houseItem leftContent='付款方式' :rightContent='vpmname' v-if="vpmname != null"></houseItem>
		<houseItem leftContent='经办人' :rightContent='seller_name' v-if="seller_name != null"></houseItem>
	</div>
</template>

<script>
	import clear from '@/components/clear'
	import houseItem from '@/components/manage/houseItem'
	import {getMarketingControl} from '@/api/getData'

	export default {
    name: 'performanceHouse',
    components: {
      clear, houseItem
    },
    data() {
      return {
        vhname: this.$store.state.manageRoomMess.vhname,
        vroomname: this.$store.state.manageRoomMess.vroomname,
        votname: this.$store.state.manageRoomMess.votname,
        nbuildarea: this.$store.state.manageRoomMess.nbuildarea,
        ninarea: this.$store.state.manageRoomMess.ninarea,
        price: this.$store.state.manageRoomMess.price,
        prices: this.$store.state.manageRoomMess.prices,
        clientMess: [],
        sell_channel: this.$store.state.manageRoomMess.sell_channel,
        dsubscdate: this.$store.state.manageRoomMess.dsubscdate,
        dsigndate: this.$store.state.manageRoomMess.dsigndate,
        nsellareaprice: this.$store.state.manageRoomMess.nsellareaprice,
        nbalancemny: this.$store.state.manageRoomMess.nbalancemny,
        vpmname: this.$store.state.manageRoomMess.vpmname,
        seller_name: this.$store.state.manageRoomMess.seller_name
      }
    },
    methods: {
      async getClientMess() {
        let params = {
	        method: 'getHouseCustomList',
	        pk_sign: this.$store.state.manageRoomMess.pk_sign === null ? '' : this.$store.state.manageRoomMess.pk_sign,
	        user_id: this.$store.state.userInfo.user_id,
          pk_subsc: this.$store.state.manageRoomMess.pk_subsc === null ? '' : this.$store.state.manageRoomMess.pk_subsc,
          pk_engage: this.$store.state.manageRoomMess.pk_engage === null ? '' : this.$store.state.manageRoomMess.pk_engage
	      }
	      let res = await getMarketingControl(params)
	      console.log(res)
	      this.clientMess = res.data.data
      },
      getType(num) {
        let type = ''
        switch (num) {
          case 0:
            type = '身份证'
            break
          case 1:
            type = '军人证'
            break
          case 2:
            type = '护照'
            break
          case 3:
            type = '其他'
            break
          case 4:
            type = '外籍身份证'
            break
          case 5:
            type = '港澳通行证'
            break
        }
        return type
      },
      format(data) {
        let test2 = data.replace(/(\d{3})(\d{4})(\d{4})/g, '$1****$3')
        return test2
      },
      formats(data) {
        let test2 = data.replace(/(\d{10})(\d{4})(\d{4})/g, '$1****$3')
        return test2
      }
    },
    created: function() {
      this.getClientMess()
    }
	}
</script>

<style scoped>
	.house-mess, .customer-mess, .sell-mess {
		background: #FFFFFF;
		height: 46px;
		border: 1px solid #EAEFF3;
		padding: 0 12px;
		line-height: 44px;
	}
	.left {
		font-family: 'PingFangSC-Regular';
		float: left;
		color: #030303;
		font-size: 16px;
	}
	.left img {
		width: 22px;
		height: 22px;
		display: inline-block;
		margin-right: 12px;
		vertical-align: middle;
	}
</style>
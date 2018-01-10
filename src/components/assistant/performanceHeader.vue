<template>
	<div class="performanceHeader">
		<ul>
			<li :class="{ active: isactive }" @click='checkReserve'>
				<div>预订({{ reserveNum }})</div>
			</li>
			<li :class="{ active: isactive2 }" @click='checkSubscription'>
				<div>认购({{ subscriptionNum }})</div>
			</li>
			<li :class="{ active: isactive3 }" @click='checkSign'>
				<div>签约({{ signNum }})</div>
			</li>
			<li :class="{ active: isactive4 }" @click='checkPayment'>
				<div>回款({{ paymentNum }})</div>
			</li>
			<clear></clear>
		</ul>
		
	</div>
</template>

<script>
	import clear from '@/components/clear'

	export default {
    name: 'performanceHeader',
    data() {
      return {
        reserveNum: this.$store.state.performanceCount.yudingCount,
        subscriptionNum: this.$store.state.performanceCount.rengouCount,
        signNum: this.$store.state.performanceCount.qianyueCount,
        paymentNum: this.$store.state.performanceCount.shoukuanCount,
        isactive: this.$store.state.performanceHeader.isactive,
        isactive2: this.$store.state.performanceHeader.isactive2,
        isactive3: this.$store.state.performanceHeader.isactive3,
        isactive4: this.$store.state.performanceHeader.isactive4
      }
    },
    components: {
      clear
    },
    methods: {
      checkReserve() {
        let active = {
          isactive: true,
          isactive2: false,
          isactive3: false,
          isactive4: false
        }
        this.$router.replace({path: 'performanceReserve'})
        this.$store.commit('setActive', active)
      },
      checkSubscription() {
        let active = {
          isactive: false,
          isactive2: true,
          isactive3: false,
          isactive4: false
        }
        this.$router.replace({path: 'performanceSubscription'})
        this.$store.commit('setActive', active)
      },
      checkSign() {
        let active = {
          isactive: false,
          isactive2: false,
          isactive3: true,
          isactive4: false
        }
        this.$router.replace({path: 'performanceSign'})
        this.$store.commit('setActive', active)
      },
      checkPayment() {
        let active = {
          isactive: false,
          isactive2: false,
          isactive3: false,
          isactive4: true
        }
        this.$router.replace({path: 'performancePayment'})
        this.$store.commit('setActive', active)
      }
    }
  }
</script>

<style scoped>
	li {
		background: #ffffff;
		width: 25%;
		height: 40px;
		font-family: 'MicrosoftYaHei';
		color: #7A797B;
		font-size: 14px;
		float: left;
		padding-top: 12px;
	}
	li div {
		line-height: 15px;
		height: 16px;
		border-right: 0.5px solid #DCE1E8;
	}
	.active {
		color: #3CBAFF;
		border-bottom: 3px solid #3CBAFF;
	}
	
</style>
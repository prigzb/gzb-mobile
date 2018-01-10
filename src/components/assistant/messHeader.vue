<template>
	<div class="modifyCustomerMess">
		<div class="left-tab" :class="{ active: isactive }" @click='checkBasic'>基本信息</div>
		<div class="right-tab" :class="{ active2: isactive2 }" @click='checkDetailed'>详细信息</div>
		<clear></clear>
	</div>
</template>

<script>
	import clear from '@/components/clear'

	export default {
    name: 'messHeader',
    components: {
      clear
    },
    data: function() {
      return {
        isactive: this.$store.state.userMess.isactive,
        isactive2: this.$store.state.userMess.isactive2
      }
    },
    methods: {
      checkBasic() {
          let active = {
          isactive: true,
          isactive2: false
        }
        this.$router.push({path: 'basicMess'})
        this.$store.commit('setClass', active)
      },
      checkDetailed() {
          let active2 = {
          isactive: false,
          isactive2: true
        }
        this.$router.push({path: 'detailedMess'})
        this.$store.commit('setClass2', active2)
      }
    }
  }
</script>

<style scoped>
	.left-tab, .right-tab {
		width: 50%;
		height: 40px;
		background: #ffffff;
		line-height: 40px;
		font-size: 15px;
		font-family: 'MicrosoftYaHei';
		color: #7A797B;
	}
	.left-tab {
		float: left;
	}
	.right-tab {
		float: right;
	}
	.active, .active2 {
		color: #94D301;
	}
</style>

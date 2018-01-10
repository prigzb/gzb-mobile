<template>
	<div class="modifyCustomerMess">
		<div class="left-tab" :class="{ active: isactive }" @click='checkBasic'><span>基本信息</span></div>
		<div class="right-tab" :class="{ active2: isactive2 }" @click='checkDetailed'><span>详细信息</span></div>
		<clear></clear>
	</div>
</template>

<script>
	import clear from '@/components/clear'

	export default {
    name: 'messHeader2',
    components: {
      clear
    },
    data: function() {
      return {
      }
    },
    methods: {
      checkBasic() {
        let active = {
          isactive: true,
          isactive2: false
        }
        this.$store.commit('setClass', active)
        this.$router.replace({path: '/assistant/addClientBasic'})
      },
      checkDetailed() {
          let active2 = {
          isactive: false,
          isactive2: true
        }
        this.$store.commit('setClass', active2)
        this.$router.replace({path: '/assistant/addClientDetailed'})
      }
    },
    created: function() {
       let href = window.location.href
       let current = href.split('/')
       let currents = current[current.length - 1]
       console.log(currents)
       if (currents === 'addClientBasic') {
         let active = {
           isactive: true,
           isactive2: false
         }
          this.$store.commit('setClass', active)
       } else {
         let active = {
           isactive: false,
           isactive2: true
         }
          this.$store.commit('setClass', active)
       }
    },
    computed: {
      isactive: function() {
         return this.$store.state.userMess.isactive
      },
      isactive2: function() {
         return this.$store.state.userMess.isactive2
      }
    }
  }
</script>

<style scoped>
	.left-tab, .right-tab {
		width: 50%;
		height: 40px;
		background: #ffffff;
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
		color: #3CBAFF;
    border-bottom: 3px solid #3CBAFF;
	}
  .modifyCustomerMess div span {
    display: inline-block;
    width: 100%;
    margin-top: 10px;
    border-right: 1px solid #DCE1E8;
  }
</style>

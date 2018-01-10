<template>
	<form>
		<div class="selectProject">
			<div class="searchBox">
				<div class="searchContent">
					<img src="../../assets/glass-grey.png">
					<input type="text" placeholder="搜索 项目名称" name="projectName" v-model='projectName'>
				</div>
			</div>
			<projectItem :parent="parent" :type="type"></projectItem>
	    </div>
	</form>
</template>
<script>
  import projectItem from '@/components/assistant/projectItem'

  export default {
    name: 'selectProject',
    components: {
      projectItem
    },
    data: function() {
      return {
        projectName: '',
        parent: this.$route.params.code,
        type: this.$route.params.type
      }
    },
    watch: {
      projectName: function() {
        let searchProject = {
          projectName: ''
        }
        searchProject.projectName = this.projectName
        this.$store.commit('searchProjectName', searchProject)
      }
    },
    beforeRouteUpdate (to, from, next) {
      this.parent = to.params.code
      this.empty()
      next()
    },
    methods: {
      empty() {
        this.projectName = ''
      }
    }
  }
</script>

<style scoped>
	.searchBox {
		font-family: 'MicrosoftYaHei';
		font-size: 13px;
		color: #98a1a8;
		height: 44px;
		padding-top: 8px;
	}
	.searchContent {
		height: 28px;
		width: 90%;
		margin: 0 auto;
		background: #ffffff;
		border-radius: 100px;
		line-height: 28px;
    padding-top: 6px;
	}
	.searchContent img{
		float: left;
		width: 14px;
		height: 14px;
		margin-left: 30%;
		margin-top: 1px;
    margin-right: 9.5px;
	}
  .searchContent input {
    float: left;
  }
	::-webkit-input-placeholder { /* WebKit browsers */  
		font-family: 'PingFangSC-Regular';
    color: #98A1A8;  
	}
</style>
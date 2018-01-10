<template>
	<div>
		<ul class="projectItem" v-for= '(name,index) in names' :id= 'name.code'>
			<li class="gzb-list-index">{{ name.title }}</li>
		  <li class="gzb-list-item" v-for= 'project in projects'>
		    <div class="gzb-left-content">
		      {{project.vname}}
		    </div>
		    <div class="gzb-right-content">
		      {{project.city}}
		    </div>
		    <clear></clear>
		  </li>
		</ul>
		<ul class="right-banner">
			<li>
				<img src="../../assets/glass-grey.png" width="9px" height="9px">
			</li>
			<li v-for= '(name,index) in names' @click='slide(index)'>{{ name.title }}</li>
		</ul>
	</div>
</template>

<script>
import clear from '@/components/clear'
import {getProjectList} from '@/api/getData'

export default {
  name: 'projectItem',
  props: ['index'],
  data: function () {
    return {
      projects: [],
      names: [
        {title: 'A', code: 'classA'},
        {title: 'B', code: 'classB'},
        {title: 'C', code: 'classC'},
        {title: 'D', code: 'classD'},
        {title: 'E', code: 'classE'},
        {title: 'F', code: 'classF'},
        {title: 'G', code: 'classG'},
        {title: 'H', code: 'classH'},
        {title: 'I', code: 'classI'},
        {title: 'J', code: 'classJ'},
        {title: 'K', code: 'classK'},
        {title: 'L', code: 'classL'},
        {title: 'M', code: 'classM'},
        {title: 'N', code: 'classN'},
        {title: 'O', code: 'classO'},
        {title: 'P', code: 'classP'},
        {title: 'Q', code: 'classQ'},
        {title: 'R', code: 'classR'},
        {title: 'S', code: 'classS'},
        {title: 'T', code: 'classT'},
        {title: 'U', code: 'classU'},
        {title: 'V', code: 'classV'},
        {title: 'W', code: 'classW'},
        {title: 'X', code: 'classX'},
        {title: 'Y', code: 'classY'},
        {title: 'Z', code: 'classZ'},
        {title: '#', code: 'class#'}
      ]
    }
  },
  components: {
    clear
  },
  methods: {
    slide(index) {
      var activeObject = document.getElementById(this.names[index].code)
      var offTop = activeObject.offsetTop
      document.body.scrollTop = offTop
    },
    async getProject() {
      let params = {
        method: 'getList',
        pk_psnbasdoc: '0001121000000000S57J'
      }
      let res = await getProjectList(params)
      console.log(res)
      this.projects = res.data.data
    }
  },
  created: function() {
    this.getProject()
  }
}
</script>

<style scoped>
	.gzb-list-index {
		height: 30px;
		line-height: 30px;
		font-size: 13px;
		font-family: 'PingFangSC-Regular';
		color: #98A1A8;
		text-align: left;
		padding-left: 12px;
	}
	.gzb-list-item {
		height: 44px;
		background: #ffffff;
		line-height: 44px;
		padding-left: 12px;
		font-family: 'PingFangSC-Regular';
		border-bottom: 1px solid #EAEFF3;
		padding-right: 30px;
	}
	.gzb-left-content {
		float: left;
		color: #030303;
		font-size: 16px;
	}
	.gzb-right-content {
		float: right;
		color: #98A1A8;
		font-size: 12px;
	}
		.right-banner {
			position: fixed;
	    top: 92px;
	    right: 7px;
	    width: 10px;
	    font-family: 'PingFangSC-Medium';
	    font-size: 10px;
	    color: #7A797B
		}
		.prompt {
			width: 50px;
			height: 50px;
			background: #94D301;
			font-size: 32px;
			color: #ffffff;
			position: fixed;
			top: 270px;
			left: 44%;
			border-radius: 50px;
			line-height: 50px;
		}
</style>
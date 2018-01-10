<template>
	<div class="national">
		<div class="searchBox">
			<div class="searchContent">
				<img src="../../assets/glass-grey.png">
				<input type="text" placeholder="搜索 国籍名称" name="projectName" v-model='projectName'>
			</div>
		</div>
		<ul v-for='(nation, pindex) in nations' v-if='nation.contents.length > 0' :id='nation.code'>
			<li class="code">{{ nation.code }}</li>
			<li class="name" v-for='(content, index) in nation.contents' @click='jump(pindex, index)'>{{ content.docname }}</li>
		</ul>
		<ul class="right-banner">
			<li>
				<img src="../../assets/glass-grey.png" width="9px" height="9px">
			</li>
			<li v-for= '(nation, index) in nations' @click='slide(index)' v-if="nation.contents.length > 0">{{ nation.code }}</li>
		</ul>
	</div>
</template>

<script>
	import {getNationalList} from '@/api/getData'
	import pinyin from 'pinyin'

	export default {
    name: 'national',
    data() {
      return {
        res: [],
        projectName: ''
      }
    },
    methods: {
      slide(index) {
        var activeObject = document.getElementById(this.nations[index].code)
        var offTop = activeObject.offsetTop
        document.body.scrollTop = offTop
      },
      async getNationals() {
        let params = {
          method: 'selectnationality'
        }
        let res = await getNationalList(params)
        this.res = res.data.data.list
        console.log(this.res)
        let map = new Map()
        for (let data of this.res) {
           map.set(data.docname, data.pk_defdoc)
        }
        console.log(map)
        let nationList = this.$store.state.nations
        nationList = map
        this.$store.commit('setNations', nationList)
      },
      pinyins(data) {
        let code = ''
        switch (data) {
          case '厄':
            code = 'E'
            break
          case '喀':
            code = 'K'
            break
          case '圭':
            code = 'G'
            break
          case '斐':
          case '梵':
            code = 'F'
            break
          case '瑙':
            code = 'N'
            break
          default:
            code = data
        }
        return code
      },
      jump(pindex, index) {
        // console.log(pindex)
        // console.log(index)
        let personalInfo = this.$store.state.personalInfo
        let data = this.nations[pindex].contents[index]
        personalInfo.nationality.value = data.docname
        personalInfo.nationality.code = data.pk_defdoc
        this.$store.commit('addPersonal', personalInfo)
        this.$router.go(-1)
        // this.$router.push('/assistant/addClientDetailed')
      }
	  },
	  computed: {
      nations: function() {
        let nations = []
        let letterss = []
        for (let data of this.res) {
          let code = pinyin(data.docname, {style: pinyin.STYLE_FIRST_LETTER})[0][0].toUpperCase(
          )
          letterss.push(this.pinyins(code))
        }
        let letters = Array.from(new Set(letterss)).sort()
        // console.log(letterss)
        // console.log(letters)
        for (let letter of letters) {
          nations.push({code: letter, contents: []})
        }
        for (let nation of nations) {
          for (let data of this.res) {
            let letter = pinyin(data.docname, {style: pinyin.STYLE_FIRST_LETTER})[0][0].toUpperCase()
            if (nation.code === this.pinyins(letter) && data.docname.indexOf(this.projectName) > -1) {
              nation.contents.push(data)
            }
          }
        }
        return nations
      }
    },
	  created: function() {
	    this.getNationals()
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
	}
	.searchContent img{
		float: left;
		width: 14px;
		height: 14px;
		margin-left: 30%;
		margin-top: 7px;
	}
	::-webkit-input-placeholder { /* WebKit browsers */  
		font-family: 'PingFangSC-Regular';
    color: #98A1A8;  
	}
	.code {
		height: 30px;
		line-height: 30px;
		padding-left: 12px;
		text-align: left;
	}
	.name {
		padding-left: 12px;
		line-height: 42px;
		height: 44px;
		border: 1px solid #EAEFF3;
		background: #FFFFFF; 
		text-align: left;
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
</style>
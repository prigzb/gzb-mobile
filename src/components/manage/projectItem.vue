<template>
	<div>
		<ul class="projectItem" v-for= '(project,pIndex) in projects' :id= 'project.codes' v-if="project.contents.length > 0">
			<li class="gzb-list-index">{{ project.codes }}</li>
		  <li class="gzb-list-item" v-for='(projectContents, index) in project.contents'>
		    <div class="gzb-left-content" @click="LToChild(pIndex, index)">
		      {{projectContents.names}}
		    </div>
		    <div class="gzb-right-content" @click="RToChild(pIndex,index)">
		      <img src="../../assets/arrow-right.png" v-if="projectContents.childSize > 0">
          <clear></clear>
		    </div>
		    <clear></clear>
		  </li>
		</ul>
    <div class="no-content" v-if="check()">
      <img src="../../assets/no-content.png">
    </div>
	</div>
</template>

<script>
import clear from '@/components/clear'
import {getProjectList, defaultProject} from '@/api/getData'
import pinyin from 'pinyin'

export default {
  name: 'projectItem',
  props: ['index', 'parent', 'type'],
  data: function () {
    return {
      // projects: [{
      //   codes: '',
      //   contents: [{
      //     names: '',
      //     citys: ''
      //   }
      //   ]
      // }],
      // codes: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'],
      projectName: this.$store.state.project.projectName,
      letters: [],
      letts: [],
      returnRes: []
    }
  },
  components: {
    clear
  },
  methods: {
    async getProject() {
      let params = {
        method: 'getChargeList',
        pk_psnbasdoc: this.$store.state.userInfo.pk_psnbasdoc
      }
      let res = await getProjectList(params)
      console.log(res)
      this.returnRes = res
      // for (let project of res.data.data) {
      //   for (let i of this.letts) {
      //     if (project.code.substr(0, 1) === i) {
      //       this.projects.names.push(project)
      //     }
      //   }
      // }
      // console.log(this.letters)
      // console.log(this.letts)
      // this.projects.codes = this.letts
      // console.log(this.projects.names)
      // console.log(this.projects.codes)

      // let item = {
      //   name: [],
      //   code: []
      // }
    },
    check() {
      let show = true
      for (let i of this.projects) {
        if (i.contents.length !== 0) {
          show = false
        }
      }
      return show
    },
    async LToChild(pIndex, index) {
      if (this.type === 'table') {
        if (this.projects[pIndex].contents[index].childSize === 0) {
          let manageProjectTable = {
            pk_project: this.projects[pIndex].contents[index].pkProject,
            name: this.projects[pIndex].contents[index].names
          }
          this.$store.commit('manageProjectTable', manageProjectTable)
          this.$router.push('/manage/selectBuilding/' + this.type)
        } else {
          this.$router.push('/manage/selectProject/' + this.projects[pIndex].contents[index].code + '/' + this.type)
        }
      } else {
        let manageProject = this.$store.state.manageProject
        let frights = this.$store.state.fright
        let check = false
        manageProject.pk_project = this.projects[pIndex].contents[index].pkProject
        manageProject.name = this.projects[pIndex].contents[index].names
        manageProject.pk_responsecorp = this.projects[pIndex].contents[index].pk_responsecorp
        manageProject.vcode = this.projects[pIndex].contents[index].code
        if (this.projects[pIndex].contents[index].parentCode === '0') {
          manageProject.outvcode = this.projects[pIndex].contents[index].code
        }
        let params = {
          method: 'update-project',
          vdef1: this.checkNull(this.projects[pIndex].contents[index].pkProject),
          pk_psnbasdoc: this.checkNull(this.$store.state.manageUserInfo.pk_psnbasdoc),
          pk_corp: this.checkNull(this.$store.state.manageUserInfo.pk_corp),
          psnname: this.checkNull(this.$store.state.manageUserInfo.psnname),
          birthdate: this.checkNull(this.$store.state.manageUserInfo.birthdate),
          createtime: this.checkNull(this.$store.state.manageUserInfo.createtime),
          creator: this.checkNull(this.$store.state.manageUserInfo.creator),
          id: this.checkNull(this.$store.state.manageUserInfo.id),
          modifier: this.checkNull(this.$store.state.manageUserInfo.modifier),
          modifytime: this.checkNull(this.$store.state.manageUserInfo.modifytime),
          joinworkdate: this.checkNull(this.$store.state.manageUserInfo.joinworkdate),
          sex: this.checkNull(this.$store.state.manageUserInfo.sex),
          ssnum: this.checkNull(this.$store.state.manageUserInfo.ssnum),
          email: this.checkNull(this.$store.state.manageUserInfo.email),
          homephone: this.checkNull(this.$store.state.manageUserInfo.homephone),
          postalcode: this.checkNull(this.$store.state.manageUserInfo.postalcode),
          approveflag: this.checkNull(this.$store.state.manageUserInfo.approveflag),
          basgroupdef1: this.checkNull(this.$store.state.manageUserInfo.basgroupdef1),
          basgroupdef2: this.checkNull(this.$store.state.manageUserInfo.basgroupdef2),
          basgroupdef3: this.checkNull(this.$store.state.manageUserInfo.basgroupdef3),
          bloodtype: this.checkNull(this.$store.state.manageUserInfo.bloodtype),
          characterrpr: this.checkNull(this.$store.state.manageUserInfo.characterrpr),
          computerlevel: this.checkNull(this.$store.state.manageUserInfo.computerlevel),
          health: this.checkNull(this.$store.state.manageUserInfo.health),
          hroperator: this.checkNull(this.$store.state.manageUserInfo.hroperator),
          indocflag: this.checkNull(this.$store.state.manageUserInfo.indocflag),
          interest: this.checkNull(this.$store.state.manageUserInfo.interest),
          joinpolitydate: this.checkNull(this.$store.state.manageUserInfo.joinpolitydate),
          joinsysdate: this.checkNull(this.$store.state.manageUserInfo.joinsysdate),
          marital: this.checkNull(this.$store.state.manageUserInfo.marital),
          nationality: this.checkNull(this.$store.state.manageUserInfo.nationality),
          nativeplace: this.checkNull(this.$store.state.manageUserInfo.nativeplace),
          permanreside: this.checkNull(this.$store.state.manageUserInfo.permanreside),
          polity: this.checkNull(this.$store.state.manageUserInfo.polity)
        }
        for (let fright of frights) {
          if (this.projects[pIndex].contents[index].pk_responsecorp === fright.pk_responsecorp) {
            manageProject.fright = fright.fright
            check = true
          }
        }
        if (!check) {
          manageProject.fright = ''
        }
        await defaultProject(params)
        this.$store.commit('manageProjectName', manageProject)
        this.$router.push('/manage/' + this.type)
      }
    },
    RToChild(pIndex, index) {
      if (this.type === 'table') {
        if (this.projects[pIndex].contents[index].childSize > 0) {
          this.$router.push('/manage/selectProject/' + this.projects[pIndex].contents[index].code + '/' + this.type)
        }
      } else {
        let manageProject = this.$store.state.manageProject
        if (this.projects[pIndex].contents[index].parentCode === '0') {
          manageProject.outvcode = this.projects[pIndex].contents[index].code
        }
        if (this.projects[pIndex].contents[index].childSize > 0) {
          this.$router.push('/manage/selectProject/' + this.projects[pIndex].contents[index].code + '/' + this.type)
        }
        this.$store.commit('manageProjectName', manageProject)
      }
      this.emptyProject()
      // if (this.projects[pIndex].contents[index].childSize === 0) {
      //   let selectedProject = {
      //     pk_project: this.projects[pIndex].contents[index].pkProject,
      //     name: this.projects[pIndex].contents[index].names
      //   }
      //   if (this.type === 'table' || 'index') {
      //     this.$store.commit('manageProjectName', selectedProject)
      //     this.$router.push('/manage/selectBuilding/' + this.type)
      //   }
      // } else {
      //   this.$router.push('/manage/selectProject/' + this.projects[pIndex].contents[index].code + '/' + this.type)
      // }
    },
    checkNull(str) {
      if (str === null) {
        return ''
      } else if (typeof str === 'string') {
        if (str.replace(/(\s*$)/g, '') === 'null') {
          return ''
        } else {
          return str
        }
      } else {
        return str
      }
    },
    emptyProject() {
      let project = {
        projectName: ''
      }
      this.$store.commit('searchProjectName', project)
    }
  },
  created: function() {
    this.getProject()
    this.emptyProject()
  },
  computed: {
    projects: function() {
      let projectList = []
      if (this.returnRes.length === 0) return []
      for (let project of this.returnRes.data.data) {
        if (project.parent_code === '') {
          project.parent_code = '0'
        }
        if (project.vname.indexOf(this.$store.state.project.projectName) > -1 && project.parent_code === this.parent) {
          this.letters.push(pinyin(project.vname, {style: pinyin.STYLE_FIRST_LETTER})[0][0].toUpperCase())
        }
      }
      this.letts = Array.from(new Set(this.letters)).sort()
      for (let i = 0; i < this.letts.length; i++) {
        projectList.push({codes: this.letts[i], contents: []})
      }
      for (let i = 0; i < projectList.length; i++) {
        for (let house of this.returnRes.data.data) {
          if (pinyin(house.vname, {style: pinyin.STYLE_FIRST_LETTER})[0][0].toUpperCase() === projectList[i].codes) {
            if (house.vname.indexOf(this.$store.state.project.projectName) > -1 && house.parent_code === this.parent) {
              projectList[i].contents.push({names: house.vname, citys: house.city_name, parentCode: house.parent_code, code: house.code, childSize: house.child_size, pkProject: house.pk_project, pk_responsecorp: house.pk_responsecorp})
            }
          }
        }
      }
      console.log(projectList)
      return projectList
      // let searchContent = this.$store.state.project.projectName
      // let selectProject = []
      // if (searchContent === null) {
      //   return this.projects
      // } else {
      //   for (let project of this.projects) {
      //     for (let projectContent of project.contents) {
      //       if (projectContent.names.splice(0, searchContent.length) === searchContent) {
      //         selectProject.push(projectContent)
      //       }
      //       project.push(selectProject)
      //     }
      //     this.projects.push(project)
      //   }
      //   return projects
      // }
    }
  }
  // watch: {
  //  console.log(this.projectName)
  // }
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
		padding-right: 12px;
	}
	.gzb-left-content {
		float: left;
		color: #030303;
		font-size: 16px;
    width: 70%;
    text-align: left;
	}
	.gzb-right-content {
		float: right;
    width: 30%;
    height: 44px;
	}
  .gzb-right-content img {
    float: right;
    margin-top: 18px;
    width: 6px;
    height: 12px;
  }
  .no-content img {
    width: 100%;
  }
</style>
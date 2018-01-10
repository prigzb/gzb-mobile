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
        method: 'getList',
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
      if (this.type === 'assistantTable') {
        if (this.projects[pIndex].contents[index].childSize === 0) {
          let selectedProjectTable = {
            pk_project: this.projects[pIndex].contents[index].pkProject,
            name: this.projects[pIndex].contents[index].names,
            vincode: this.projects[pIndex].contents[index].vincode,
            vcode: this.projects[pIndex].contents[index].vincode
          }
          this.$store.commit('setProjectNameTable', selectedProjectTable)
          this.$router.push('/assistant/selectBuilding/' + this.type)
        } else {
          this.$router.push('/assistant/selectProject/' + this.projects[pIndex].contents[index].code + '/' + this.type)
        }
      } else if (this.type === 'addClientBasic') {
          let personalInfo = this.$store.state.personalInfo
          if (this.projects[pIndex].contents[index].parentCode === '0') {
            personalInfo.projectName.code = this.projects[pIndex].contents[index].pkProject
          }
          personalInfo.projectName.value = this.projects[pIndex].contents[index].names
          personalInfo.projectName.vcode = this.projects[pIndex].contents[index].pkProject
          personalInfo.projectName.pk_responsecorp = this.projects[pIndex].contents[index].pk_responsecorp
          this.$store.commit('addPersonal', personalInfo)
          this.$router.push('/assistant/' + this.type)
      } else {
        let selectedProject = this.$store.state.selectedProject
        if (this.projects[pIndex].contents[index].parentCode === '0') {
          selectedProject.vcodes = this.projects[pIndex].contents[index].code
          selectedProject.outpk_project = this.projects[pIndex].contents[index].pkProject
        }
        selectedProject.pk_project = this.projects[pIndex].contents[index].pkProject
        selectedProject.name = this.projects[pIndex].contents[index].names
        selectedProject.vincode = this.projects[pIndex].contents[index].vincode
        selectedProject.vcode = this.projects[pIndex].contents[index].code
        selectedProject.pk_responsecorp = this.projects[pIndex].contents[index].pk_responsecorp
        let params = {
          method: 'update-project',
          vdef1: this.projects[pIndex].contents[index].pkProject,
          pk_psnbasdoc: this.checkNull(this.$store.state.updateUserInfo.pk_psnbasdoc),
          pk_corp: this.checkNull(this.$store.state.updateUserInfo.pk_corp),
          psnname: this.checkNull(this.$store.state.updateUserInfo.psnname),
          birthdate: this.checkNull(this.$store.state.updateUserInfo.birthdate),
          createtime: this.checkNull(this.$store.state.updateUserInfo.createtime),
          creator: this.checkNull(this.$store.state.updateUserInfo.creator),
          id: this.checkNull(this.$store.state.updateUserInfo.id),
          modifier: this.checkNull(this.$store.state.updateUserInfo.modifier),
          modifytime: this.checkNull(this.$store.state.updateUserInfo.modifytime),
          joinworkdate: this.checkNull(this.$store.state.updateUserInfo.joinworkdate),
          sex: this.checkNull(this.$store.state.updateUserInfo.sex),
          ssnum: this.checkNull(this.$store.state.updateUserInfo.ssnum),
          email: this.checkNull(this.$store.state.updateUserInfo.email),
          homephone: this.checkNull(this.$store.state.updateUserInfo.homephone),
          postalcode: this.checkNull(this.$store.state.updateUserInfo.postalcode),
          approveflag: this.checkNull(this.$store.state.updateUserInfo.approveflag),
          basgroupdef1: this.checkNull(this.$store.state.updateUserInfo.basgroupdef1),
          basgroupdef2: this.checkNull(this.$store.state.updateUserInfo.basgroupdef2),
          basgroupdef3: this.checkNull(this.$store.state.updateUserInfo.basgroupdef3),
          bloodtype: this.checkNull(this.$store.state.updateUserInfo.bloodtype),
          characterrpr: this.checkNull(this.$store.state.updateUserInfo.characterrpr),
          computerlevel: this.checkNull(this.$store.state.updateUserInfo.computerlevel),
          health: this.checkNull(this.$store.state.updateUserInfo.health),
          hroperator: this.checkNull(this.$store.state.updateUserInfo.hroperator),
          indocflag: this.checkNull(this.$store.state.updateUserInfo.indocflag),
          interest: this.checkNull(this.$store.state.updateUserInfo.interest),
          joinpolitydate: this.checkNull(this.$store.state.updateUserInfo.joinpolitydate),
          joinsysdate: this.checkNull(this.$store.state.updateUserInfo.joinsysdate),
          marital: this.checkNull(this.$store.state.updateUserInfo.marital),
          nationality: this.checkNull(this.$store.state.updateUserInfo.nationality),
          nativeplace: this.checkNull(this.$store.state.updateUserInfo.nativeplace),
          permanreside: this.checkNull(this.$store.state.updateUserInfo.permanreside),
          polity: this.checkNull(this.$store.state.updateUserInfo.polity)
        }
        await defaultProject(params)
        this.$store.commit('setProjectName', selectedProject)
        this.$router.push('/assistant/' + this.type)
      }
    },
    RToChild(pIndex, index) {
      if (this.type === 'assistantTable') {
        if (this.projects[pIndex].contents[index].childSize > 0) {
          this.$router.push('/assistant/selectProject/' + this.projects[pIndex].contents[index].code + '/' + this.type)
        }
      } else if (this.type === 'addClientBasic') {
        let personalInfo = this.$store.state.personalInfo
        if (this.projects[pIndex].contents[index].parentCode === '0') {
          personalInfo.projectName.code = this.projects[pIndex].contents[index].pkProject
        }
        this.$store.commit('addPersonal', personalInfo)
        if (this.projects[pIndex].contents[index].childSize > 0) {
          this.$router.push('/assistant/selectProject/' + this.projects[pIndex].contents[index].code + '/' + this.type)
        }
      } else {
        let selectedProject = this.$store.state.selectedProject
        if (this.projects[pIndex].contents[index].parentCode === '0') {
          selectedProject.vcodes = this.projects[pIndex].contents[index].code
          selectedProject.outpk_project = this.projects[pIndex].contents[index].pkProject
        }
        if (this.projects[pIndex].contents[index].childSize > 0) {
          this.$router.push('/assistant/selectProject/' + this.projects[pIndex].contents[index].code + '/' + this.type)
        }
        this.$store.commit('setProjectName', selectedProject)
      }
      this.emptyProject()
    },
    emptyProject() {
      let project = {
        projectName: ''
      }
      this.$store.commit('searchProjectName', project)
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
              projectList[i].contents.push({names: house.vname, parentCode: house.parent_code, code: house.code, childSize: house.child_size, pkProject: house.pk_project, vincode: house.vincode, pk_responsecorp: house.pk_responsecorp})
            }
          }
        }
      }
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
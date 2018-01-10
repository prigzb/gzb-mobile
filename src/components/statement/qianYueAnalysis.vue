<template>
	<div class="qianYueAnalysis">
		<div class="header" v-for="returnMess in returnMesss">
			<div class="title">
				<span class="icon"></span>
				<span>{{select(returnMess, 'name')}}</span>
				<clear></clear>
			</div>
			<div class="content">
				<div class="item">
					<span class="time">小于1月</span>
					<span class="num">{{select(returnMess, 'jan')}}</span>
				</div>
				<div class="item">
					<span class="time">1-3月</span>
					<span class="num">{{select(returnMess, 'thu')}}</span>
				</div>
				<div class="item">
					<span class="time">4-6月</span>
					<span class="num">{{select(returnMess, 'jun')}}</span>
				</div>
				<div class="item">
					<span class="time">6月以上</span>
					<span class="num">{{select(returnMess, 'jul')}}</span>
				</div>
				<clear></clear>
			</div>   
		</div>
	</div>
</template>

<script>
  import clear from '@/components/clear'
  import {overDateQianYue} from '@/api/getData'

  export default {
    name: 'qianYueAnalysis',
    components: {
      clear
    },
    data() {
      return {
        params: {
          method: 'daygroup',
          fright: this.$store.state.statementProject.fright,
          vcode: this.$store.state.statementProject.vcode,
          pk_psndoc: this.$store.state.userInfo.pk_psndoc
        },
        params2: {
          method: 'alldaygroup',
          pk_psndoc: this.$store.state.userInfo.pk_psndoc
        },
        returnMesss: []
      }
    },
    methods: {
      async getMess() {
        let projectlist = []
        let projectName = this.$store.state.statementProject.name
        let res = ''
        if (projectName === '全部项目') {
          this.$dialog.loading.open('很快加载好了')
          res = await overDateQianYue(this.params2)
          this.$dialog.loading.close()
          let projectlists = []
          for (let mess of res.data.data.list) {
            projectlists.push(mess.vshowname)
          }
          projectlist = Array.from(new Set(projectlists))
          console.log(res)
          console.log(projectlist, 111111111111)
        } else {
          res = await overDateQianYue(this.params)
          projectlist.push(this.$store.state.statementProject.name)
          console.log(res)
        }
        for (let project of projectlist) {
          let projectMess = {
            name: '',
            jan: {
              money: 0,
              num: 0
            },
            thu: {
              money: 0,
              num: 0
            },
            jun: {
              money: 0,
              num: 0
            },
            jul: {
              money: 0,
              num: 0
            }
          }
          if (projectName === '全部项目') {
            for (let mess of res.data.data.list) {
              if (mess.vshowname === project) {
                projectMess.name = project
                if (parseInt(mess.days) < 30) {
                  projectMess.jan.num++
                  projectMess.jan.money += parseFloat(mess.famount)
                } else if (parseInt(mess.days) >= 30 && parseInt(mess.days) <= 90) {
                  projectMess.thu.num++
                  projectMess.thu.money += parseFloat(mess.famount)
                } else if (parseInt(mess.days) > 90 && parseInt(mess.days) <= 180) {
                  projectMess.jun.num++
                  projectMess.jun.money += parseFloat(mess.famount)
                } else {
                  projectMess.jul.num++
                  projectMess.jul.money += parseFloat(mess.famount)
                }
              }
            }
          } else {
            for (let mess of res.data.data.list) {
              projectMess.name = projectName
              if (parseInt(mess.days) < 30) {
                projectMess.jan.num++
                projectMess.jan.money += parseFloat(mess.famount)
              } else if (parseInt(mess.days) >= 30 && parseInt(mess.days) <= 90) {
                projectMess.thu.num++
                projectMess.thu.money += parseFloat(mess.famount)
              } else if (parseInt(mess.days) > 90 && parseInt(mess.days) <= 180) {
                projectMess.jun.num++
                projectMess.jun.money += parseFloat(mess.famount)
              } else {
                projectMess.jul.num++
                projectMess.jul.money += parseFloat(mess.famount)
              }
            }
          }
          this.returnMesss.push(projectMess)
        }
      },
      select(mess, fla) {
        if (fla === 'name') {
          return mess.name
        } else {
          if (this.$store.state.overDateType === '金额(万元)') {
            if (fla === 'jan') {
              return (mess.jan.money / 10000).toFixed(2)
            } else if (fla === 'thu') {
              return (mess.thu.money / 10000).toFixed(2)
            } else if (fla === 'jun') {
              return (mess.jun.money / 10000).toFixed(2)
            } else {
              return (mess.jul.money / 10000).toFixed(2)
            }
          } else {
            if (fla === 'jan') {
              return mess.jan.num
            } else if (fla === 'thu') {
              return mess.thu.num
            } else if (fla === 'jun') {
              return mess.jun.num
            } else {
              return mess.jul.num
            }
          }
        }
      }
    },
    created: function() {
      this.getMess()
    }
  }
</script>

<style scoped>
	.qianYueAnalysis {
	}
	.header {
		font-size: 16px;
		color: #030303;
		/*line-height: 44px;*/
		/*background: url('../../assets/unfurled.png') no-repeat;
		background-size: 7px 14px;
		background-position: right 12px top 14px;*/
		/*padding: 0 12px;*/
		margin-bottom: 8px;
		background: #ffffff;
	}
	.title {
		height: 44px;
		padding: 0 12px;
		text-align: left;
        border-bottom: 1px solid #EAEFF3;
        background: url('../../assets/unfurled.png') no-repeat;
		background-size: 7px 14px;
		background-position: right 12px top 14px;
	}
	.title span {
		display: block;
		float: left;
		margin-top: 11px;
		margin-right: 12px;
	}
	.header .icon {
		display: inline-block;
		width: 22px;
		height: 22px;
		background: url('../../assets/select-project-icon.png') no-repeat;
		background-size: 100%;
	}
	.content {
		font-size: 0;
	}
	.item {
		width: 25%;
		height: 80px;
		display: inline-block;
	}
	.time {
		font-size: 12px;
		color: #98A1A8;
		display: block;
		padding: 16px 0 12px 0;
	}
	.num {
		font-size: 16px;
		color: #030303;
		display: block;
	}
</style>
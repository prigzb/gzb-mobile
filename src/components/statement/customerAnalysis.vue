<template>
	<div class="wrap">
		<div class="header">
			<div class="project" @click="selectProject">{{projectName}}</div>
			<div class="time" @click="selectTime">{{showdateList}}</div>
			<div class="icon">
				<span :class="isactive1?'table-yes':'table-no'" @click="changeTable"></span>
				<span :class="isactive2?'cartogram-no':'cartogram-yes'" @click="changeCartogram"></span>
			</div>
		</div>
		<div :class="['table', {'tableHide':isTable}]">
	        <table cellspacing="0px" cellpadding="0px">
		   <thead>
			    <tr>
				    <th width="15%">项目</th>
				    <th width="25%">认知途径</th>
				    <th width="20%" @click="sorts('phone')">来电量</th>
				    <th width="20%" @click="sorts('visit')">来访量</th>
				    <th width="20%" @click="sorts('deal')">成交量</th>
			    </tr>
		    </thead>
		    <tbody v-if="projectName === '全部项目' && totalArr.length > 0">
			    <tr>
				    <td :rowspan="totalArrs.length + 1" class='total'>合计</td>
				    <td class="text">{{totalFirst.way}}</td>
				    <td class="number">{{totalFirst.phone}}</td>
				    <td class="number">{{totalFirst.visit}}</td>
				    <td class="number">{{totalFirst.deal}}</td>
			    </tr>
			    <tr v-for="item in totalArrs">
				    <td class="text">{{item.way}}</td>
				    <td class="number">{{item.phone}}</td>
				    <td class="number">{{item.visit}}</td>
				    <td class="number">{{item.deal}}</td>
			    </tr>
			</tbody>
			<tbody v-if="projectName === '全部项目'" v-for="data in allData">
			    <tr>
				    <td :rowspan="data.dataList.length + 1" class='total' style="text-align: center; vertical-align: middle;"><span class="title">{{data.name}}</span></td>
				    <td class="text">{{data.firstData.way}}</td>
				    <td class="number">{{data.firstData.phone}}</td>
				    <td class="number">{{data.firstData.visit}}</td>
				    <td class="number">{{data.firstData.deal}}</td>
			    </tr>
			    <tr v-for="item in data.dataList">
			        <!-- <td rowspan="6" class='total'>合计</td> -->
				    <td class="text">{{item.way}}</td>
				    <td class="number">{{item.phone}}</td>
				    <td class="number">{{item.visit}}</td>
				    <td class="number">{{item.deal}}</td>
			    </tr>
			</tbody>
			<tbody v-if="projectName !== '全部项目'">
			    <tr>
				    <td :rowspan="renderCartogram.length" class='total' style="text-align: center; vertical-align: middle;"><span class="title">{{projectName}}</span></td>
				    <td class="text">{{firstArr.way}}</td>
				    <td class="number">{{firstArr.phone}}</td>
				    <td class="number">{{firstArr.visit}}</td>
				    <td class="number">{{firstArr.deal}}</td>
			    </tr>
			    <tr v-for="item in renderTable">
			        <!-- <td rowspan="6" class='total'>合计</td> -->
				    <td class="text">{{item.way}}</td>
				    <td class="number">{{item.phone}}</td>
				    <td class="number">{{item.visit}}</td>
				    <td class="number">{{item.deal}}</td>
			    </tr>
			</tbody>
		    </table>	
		</div>
		<div :class="['cartogram', {'tableHide':!isTable}]">
		    <p class="cartogram-title">{{projectName}}</p>
		    <div class="cartogram-route">
		  	    <span :class="showPhone ? 'select-span':''" @click="phone">来电量</span>
		  	    <span :class="showVisit ? 'select-span':''" @click="visit">来访量</span>
		  	    <span :class="showDeal ? 'select-span':''" @click="deal">成交量</span>
		    </div>
		    <div class="cartogram-img">
		  	    <span class="route">认知途径</span>
		  	    <span class="num">数量(人)</span>
		  	    <clear></clear>
		    </div>
		    <!-- 表格内容 -->
		    <div class="content" v-for="item in renderCartogram">
		  	    <div class="data">
		  	        <span class="route">{{item.way}}</span>
		  	        <div ref="mybox" class="progress">
		  	 	       <div class="progress-index" :style="{width: item.width}"></div>
		  	        </div>
                <span class="num" v-if="showPhone">{{item.phone}}</span>
                <span class="num" v-if="showVisit">{{item.visit}}</span>
		  	        <span class="num" v-if="showDeal">{{item.deal}}</span>
		  	        <clear></clear>
		        </div>
		    </div>
        <div class="noDataInfo" v-if="noData">无数据</div>
		    <div class="footer">
		        <p>合计<span class="red">{{totalPerson}}</span><span>人</span></p>
		    </div>  
		</div>
	</div>
</template>

<script>
    import clear from '@/components/clear'
    import {customerForm, customerFormOrder} from '@/api/getData'
    export default {
      name: 'customerAnalysis',
      data: function () {
        return {
          projectName: this.$store.state.statementProject.name,
          // date: time(this.$store.state.approval.dateIndex),
          dateList: [{
            name: '今日'
          }, {
            name: '本周'
          }, {
            name: '本月'
          }, {
            name: '本年'
          }, {
            name: '自定义'
          }],
          type: 'customerAnalysis',
          // 验证图片切换和内容切换
          isactive1: this.$store.state.isTable.isactive1,
          isactive2: this.$store.state.isTable.isactive2,
          isTable: this.$store.state.isTable.isTable,
          allData: '',
          totalArr: [],
          totalArrs: [],
          totalFirst: '',
          renderCartogram: [],
          renderTable: [],
          firstArr: '',
          totalPerson: 0,
          showPhone: true,
          showVisit: false,
          showDeal: false,
          nowTime: '',
          endTime: '',
          width: '',
          noData: false,
          phonetimes: 0,
          visittimes: 0,
          dealtimes: 0
        }
      },
      components: {
        clear
      },
      methods: {
        changeTable() {
          console.log('1')
          this.isactive2 = true
          this.isactive1 = true
          this.isTable = false
          let project = this.$store.state.isTable
          project.isTable = false
          project.isactive1 = true
          project.isactive2 = true
          this.$store.commit('isTable', project)
        },
        async changeCartogram() {
          if (this.showPhone === true) {
            await this.phone()
          } else if (this.showVisit === true) {
            await this.visit()
          } else {
            await this.deal()
          }
          this.isactive1 = false
          this.isactive2 = false
          this.isTable = true
          let project = this.$store.state.isTable
          project.isTable = true
          project.isactive1 = false
          project.isactive2 = false
          this.$store.commit('isTable', project)
        },
        init() {
          console.log(this.showdateList)
          if (this.projectName === '全部项目' && this.isTable === false) {
             // 返回的是多项目表格
             this.getAllData('default')
          } else if (this.projectName === '全部项目' && this.isTable === true) {
             // 返回的是多项目图表
             this.phone()
          } else if (this.projectName !== '全部项目' && this.isTable === true) {
            // 返回的是单项目图表
            this.phone()
          } else {
            // 返回的是单项目表格
             this.getCustomerData('default')
          }
        },
        selectProject() {
            this.$router.push('/statement/selectProject/0/' + this.type)
        },
        selectTime() {
          this.$router.push('/statement/selectTime')
        },
        time() {
          let oldYear = parseInt(this.$store.state.serverTime.split(',')[0])
          let oldMonth = parseInt(this.$store.state.serverTime.split(',')[1])
          let oldDay = parseInt(this.$store.state.serverTime.split(',')[2])
          console.log(oldYear + oldMonth + oldDay)
          this.nowTime = new Date(oldYear, oldMonth, oldDay)
          // console.log(this.nowTime.getDay())
        },
        compare(property) {
          return function(a, b) {
            let value1 = a[property]
            let value2 = b[property]
            return value2 - value1
          }
        },
        // 单项目
        async getCustomerData(type) {
            console.log(type)
            if (this.showdateList !== '自定义') {
              let date = this.nowTime
              this.endTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() - 1)
            } else {
              this.endTime = this.$store.state.approval.endDate
            }
            // 为了排序 method不同
            let method
            if (type === 'phone') {
               method = 'OrderPhone'
            } else if (type === 'visit') {
              method = 'OrderVisit'
            } else if (type === 'deal') {
              method = 'OrderDeal'
            } else {
              method = 'project'
            }

            let param = {
               'method': method,
               'pk_psndoc': this.$store.state.userInfo.pk_psndoc,
               'pk_project': this.$store.state.statementProject.pk_project,
               'fright': this.$store.state.statementProject.fright,
               'vcode': this.$store.state.statementProject.vcode,
               'ptype': '0',
               'vtype': '1',
               'pk_corp': this.$store.state.statementProject.pk_responsecorp,
               'start_time': this.$store.state.approval.beginDate,
               'end_time': this.endTime
            }
            let res
            if (type !== 'default') {
              console.log('走单项目排序')
              res = await customerFormOrder(param)
            } else {
              console.log('单项目不走排序 默认的')
              res = await customerForm(param)
            }
            console.log(res)
            let newArr = []
            for (let item of res.data.data.list) {
                 newArr.push(item)
            }
            // 不改变原数组计算总人数
            this.renderCartogram = newArr
            this.firstArr = this.renderCartogram[0]
            this.renderTable = this.renderCartogram.slice(1)
            this.totalPerson = 0
            // for (let i = 0; i < this.renderCartogram.length; i++) {
            //   if (type === 'phone') {
            //     this.totalPerson += parseInt(this.renderCartogram[i].phone)
            //   } else if (type === 'visit') {
            //     this.totalPerson += parseInt(this.renderCartogram[i].visit)
            //   } else if (type === 'deal') {
            //     this.totalPerson += parseInt(this.renderCartogram[i].deal)
            //   }
            // }
            // // 计算宽度
            // for (let i = 0; i < this.renderCartogram.length; i++) {
            //   if (this.totalPerson === 0) {
            //      this.renderCartogram[i].width = '0%'
            //   } else if (type === 'phone') {
            //     this.renderCartogram[i].width = (Math.round(this.renderCartogram[i].phone / this.totalPerson * 10000) / 100) + '%'
            //   } else if (type === 'visit') {
            //     this.renderCartogram[i].width = (Math.round(this.renderCartogram[i].visit / this.totalPerson * 10000) / 100) + '%'
            //   } else if (type === 'deal') {
            //     this.renderCartogram[i].width = (Math.round(this.renderCartogram[i].deal / this.totalPerson * 10000) / 100) + '%'
            //   }
            // }
            console.log(this.renderCartogram)
            if (type === 'phone') {
              let cartogram = this.$store.state.phoneCartogram
              cartogram = this.renderCartogram
              this.$store.commit('phoneCartogram', cartogram)
            } else if (type === 'visit') {
              let cartogram = this.$store.state.visitCartogram
              cartogram = this.renderCartogram
              this.$store.commit('visitCartogram', cartogram)
            } else if (type === 'deal') {
              let cartogram = this.$store.state.dealCartogram
              cartogram = this.renderCartogram
              this.$store.commit('dealCartogram', cartogram)
            }
        },
        // 全部项目
        async getAllData(type) {
            console.log(type)
            if (this.showdateList !== '自定义') {
              let date = this.nowTime
              this.endTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() - 1)
            } else {
              this.endTime = this.$store.state.approval.endDate
            }
            // 为了排序 method不同
            let method
            if (type === 'phone') {
               method = 'allOrderPhone'
            } else if (type === 'visit') {
              method = 'allOrderVisit'
            } else if (type === 'deal') {
              method = 'allOrderDeal'
            } else {
              method = 'allproject'
            }
            let param = {
                'method': method,
                'pk_psndoc': this.$store.state.userInfo.pk_psndoc,
                'start_time': this.$store.state.approval.beginDate,
                'end_time': this.endTime,
                'ptype': '0',
                'vtype': '1'
            }
            let res
            if (type !== 'default') {
              console.log('走排序')
              res = await customerFormOrder(param)
            } else {
              console.log('不走排序 默认的')
              res = await customerForm(param)
            }
            console.log(res)
            // debugger
            for (let i = 0; i < res.data.data.list.length; i++) {
              if (res.data.data.list[i].way === '') {
                res.data.data.list[i].way = '—'
              }
            }
            console.log('原始求数据')
            console.log(res)
            // 合计需要的数据
            let route = []
            for (let item of res.data.data.list) {
                 route.push(item.way)
            }
            route = [...new Set(route)]
            console.log(route)
            // 清空之前的合计
            this.totalArr = []
            for (let i = 0; i < route.length; i++) {
               let obj = {}
               if (route[i] !== '—') {
                 obj.way = route[i]
                 obj.deal = 0
                 obj.phone = 0
                 obj.visit = 0
                 this.totalArr.push(obj)
               }
            }
            console.log('合计数据')
            console.log(this.totalArr)
            for (let j = 0; j < this.totalArr.length; j++) {
                for (let i = 0; i < res.data.data.list.length; i++) {
                    if (this.totalArr[j].way === res.data.data.list[i].way) {
                       this.totalArr[j].deal += parseInt(res.data.data.list[i].deal)
                       this.totalArr[j].phone += parseInt(res.data.data.list[i].phone)
                       this.totalArr[j].visit += parseInt(res.data.data.list[i].visit)
                    }
                }
            }
            // 合计排序
            if (type === 'phone') {
               this.totalArr.sort(this.compare('phone'))
            } else if (type === 'visit') {
              this.totalArr.sort(this.compare('visit'))
            } else if (type === 'deal') {
              this.totalArr.sort(this.compare('deal'))
            }
            this.renderCartogram = this.totalArr
            // 计算单项目总人数
            this.totalPerson = 0
            for (let i = 0; i < this.totalArr.length; i++) {
              if (type === 'phone') {
                this.totalPerson += this.totalArr[i].phone
              } else if (type === 'visit') {
                this.totalPerson += this.totalArr[i].visit
              } else if (type === 'deal') {
                this.totalPerson += this.totalArr[i].deal
              }
            }
            // 计算宽度
              console.log(this.totalPerson)
            for (let i = 0; i < this.renderCartogram.length; i++) {
              if (this.totalPerson === 0) {
                this.renderCartogram[i].width = '0%'
              } else if (type === 'phone') {
                this.renderCartogram[i].width = (Math.round(this.renderCartogram[i].phone / this.totalPerson * 10000) / 100) + '%'
              } else if (type === 'visit') {
                this.renderCartogram[i].width = (Math.round(this.renderCartogram[i].visit / this.totalPerson * 10000) / 100) + '%'
              } else if (type === 'deal') {
                this.renderCartogram[i].width = (Math.round(this.renderCartogram[i].deal / this.totalPerson * 10000) / 100) + '%'
              }
            }
            this.totalFirst = this.totalArr[0]
            this.totalArrs = this.totalArr.slice(1)
            console.log('渲染图标的合计数据')
            console.log(this.renderCartogram)
            if (type === 'phone') {
              let cartogram = this.$store.state.phoneCartogram
              cartogram = this.renderCartogram
              this.$store.commit('phoneCartogram', cartogram)
            } else if (type === 'visit') {
              let cartogram = this.$store.state.visitCartogram
              cartogram = this.renderCartogram
              this.$store.commit('visitCartogram', cartogram)
            } else if (type === 'deal') {
              let cartogram = this.$store.state.dealCartogram
              cartogram = this.renderCartogram
              this.$store.commit('dealCartogram', cartogram)
            }
            // 其余项目去重
            let project = []
            for (let item of res.data.data.list) {
                project.push(item.vshowname)
            }
            project = [...new Set(project)]
            // 前端渲染数据格式
            let renderList = []
            for (let i = 0; i < project.length; i++) {
               let obj = {}
               obj.name = project[i]
               obj.dataList = []
               obj.firstData = []
               renderList.push(obj)
            }
            // console.log(renderList)
            // 处理后台穿过来的数据
            for (let i = 0; i < res.data.data.list.length; i++) {
               for (let j = 0; j < renderList.length; j++) {
                  if (renderList[j].name === res.data.data.list[i].vshowname) {
                    renderList[j].dataList.push(res.data.data.list[i])
                  }
               }
            }
            console.log('-------------------------------------------全部项目的数据1')
            console.log(renderList)
            // 去掉第一个 因为第一个tr我们手动输入 不用循环
            for (let i = 0; i < renderList.length; i++) {
               if (renderList[i].dataList.length > 1) {
                 for (let j = 0; j < renderList[i].dataList.length; j++) {
                    if (renderList[i].dataList[j].way === '—') {
                        renderList[i].dataList.splice(j, 1)
                        j--
                    }
                 }
               }
               renderList[i].firstData = renderList[i].dataList[0]
               renderList[i].dataList.shift()
            }
            this.allData = renderList
            console.log('-------------------------------------------全部项目的数据')
            console.log(this.allData)
        },
        //
        math(type) {
          this.totalPerson = 0
          for (let i = 0; i < this.renderCartogram.length; i++) {
              if (type === 'phone') {
                this.totalPerson += parseInt(this.renderCartogram[i].phone)
              } else if (type === 'visit') {
                this.totalPerson += parseInt(this.renderCartogram[i].visit)
              } else if (type === 'deal') {
                this.totalPerson += parseInt(this.renderCartogram[i].deal)
              }
            }
            // 计算宽度
            for (let i = 0; i < this.renderCartogram.length; i++) {
              if (this.totalPerson === 0) {
                 this.renderCartogram[i].width = '0%'
              } else if (type === 'phone') {
                this.renderCartogram[i].width = (Math.round(this.renderCartogram[i].phone / this.totalPerson * 10000) / 100) + '%'
              } else if (type === 'visit') {
                this.renderCartogram[i].width = (Math.round(this.renderCartogram[i].visit / this.totalPerson * 10000) / 100) + '%'
              } else if (type === 'deal') {
                this.renderCartogram[i].width = (Math.round(this.renderCartogram[i].deal / this.totalPerson * 10000) / 100) + '%'
              }
            }
          },
        // 展示和计算总人数
        async phone() {
          if (this.phonetimes > 0) {
            let cartogram = this.$store.state.phoneCartogram
            this.renderCartogram = cartogram
            this.$dialog.loading.close()
            this.showPhone = true
            this.showVisit = false
            this.showDeal = false
            this.math('phone')
            return
          } else {
            if (this.projectName === '全部项目') {
              this.$dialog.loading.open('请求中')
              await this.getAllData('phone')
            } else {
              await this.getCustomerData('phone')
              this.math('phone')
            }
            this.$dialog.loading.close()
            this.showPhone = true
            this.showVisit = false
            this.showDeal = false
          }
          this.phonetimes ++
           // this.totalPerson = 0
           // if (this.projectName === '全部项目') {
           //   for (let i = 0; i < this.totalArr.length; i++) {
           //     this.totalPerson += this.totalArr[i].phone
           //   }
           // } else {
             // for (let i = 0; i < this.renderCartogram.length; i++) {
             //   this.totalPerson += parseInt(this.renderCartogram[i].phone)
             // }
           // }
        },
        async visit() {
          if (this.visittimes > 0) {
            let cartogram = this.$store.state.visitCartogram
            this.renderCartogram = cartogram
            this.$dialog.loading.close()
            this.showPhone = false
            this.showVisit = true
            this.showDeal = false
            this.math('visit')
            return
          } else {
            if (this.projectName === '全部项目') {
              this.$dialog.loading.open('请求中')
              await this.getAllData('visit')
            } else {
              await this.getCustomerData('visit')
              this.math('visit')
            }
            this.$dialog.loading.close()
            this.showPhone = false
            this.showVisit = true
            this.showDeal = false
          }
          this.visittimes ++
           // this.totalPerson = 0
           // if (this.projectName === '全部项目') {
           //   for (let i = 0; i < this.totalArr.length; i++) {
           //     this.totalPerson += this.totalArr[i].visit
           //   }
           // } else {
           //   for (let i = 0; i < this.renderCartogram.length; i++) {
           //     this.totalPerson += parseInt(this.renderCartogram[i].visit)
           //   }
           // }
        },
        async deal() {
          if (this.dealtimes > 0) {
          let cartogram = this.$store.state.dealCartogram
          this.renderCartogram = cartogram
            this.$dialog.loading.close()
            this.showPhone = false
            this.showVisit = false
            this.showDeal = true
            this.math('deal')
            return
          } else {
            if (this.projectName === '全部项目') {
              this.$dialog.loading.open('请求中')
              await this.getAllData('deal')
            } else {
              await this.getCustomerData('deal')
              this.math('deal')
            }
            this.$dialog.loading.close()
            this.showPhone = false
            this.showVisit = false
            this.showDeal = true
          }
          this.dealtimes ++
             // this.totalPerson = 0
             // if (this.projectName === '全部项目') {
             //   for (let i = 0; i < this.totalArr.length; i++) {
             //     this.totalPerson += this.totalArr[i].deal
             //   }
             // } else {
             //   for (let i = 0; i < this.renderCartogram.length; i++) {
             //     this.totalPerson += parseInt(this.renderCartogram[i].deal)
             //   }
             // }
        },
         sorts(type) {
          console.log(type)
          if (type === 'phone') {
            this.showPhone = true
            this.showVisit = false
            this.showDeal = false
          } else if (type === 'visit') {
            this.showPhone = false
            this.showVisit = true
            this.showDeal = false
          } else {
            this.showPhone = false
            this.showVisit = false
            this.showDeal = true
          }
          if (this.projectName === '全部项目') {
             this.getAllData(type)
          } else {
            this.getCustomerData(type)
          }
        }
      },
      created: function() {
        this.time()
        this.init()
        // this.getCustomerData()
        // this.getAllData()
      },
      computed: {
        showdateList() {
          return this.dateList[this.$store.state.approval.dateIndex].name
        }
      },
      watch: {
        renderCartogram() {
           if (this.renderCartogram.length < 1) {
             this.noData = true
           }
        }
      }
   }
</script>

<style scoped>
.tableHide {
display: none;
}
.header {
height: 40px;
background: #ffffff;
margin-bottom: 8px;
}
.project {
width: 44%;
float: left;
font-size: 15px;
color: #3CBAFF;
line-height: 40px;
border-right: 1px solid #EAEFF3;
background: url('../../assets/statment-slide.png') no-repeat;
background-size: 10px 5px;
background-position: right 7px top 18px;
height: 40px;
}
.time {
display: inline-block;
float: left;
width: 31%;
font-size: 15px;
color: #3CBAFF;
line-height: 40px;
border-right: 1px solid #EAEFF3;
background: url('../../assets/statment-slide.png') no-repeat;
background-size: 10px 5px;
background-position: right 7px top 18px;
}
.icon {
float: right;
width: 25%;
}
.icon span{
display: inline-block;
width: 20px;
height: 20px;
margin-top: 10px;
}
.table-yes {
background: url(../../assets/table-yes.png) no-repeat center;
background-size: 100%;
margin-right: 19px;
}
.table-no {
background: url(../../assets/table-no.png) no-repeat center;
background-size: 100%;
margin-right: 19px;
}
.cartogram-no {
background: url(../../assets/cartogram-no.png) no-repeat center;
background-size: 100%;
}
.cartogram-yes {
background: url(../../assets/cartogram-yes.png) no-repeat center;
background-size: 100%;
}
.table table{
width:100%;
border:0;
border-collapse:collapse;
font-size:12px;
}
.table table th{
border-collapse:collapse;
background: #FCFDFE;
height:40px;
border-right:1px solid #EAEFF3;
border-bottom:1px solid #EAEFF3;
font-size: 14px;
color: #030303;
}
.table table td{
height:22px;
word-wrap:break-word;
background: #ffffff;
max-width:200px;
text-align:center;
vertical-align:middle;
border-right:1px solid #EAEFF3;
border-bottom:1px solid #EAEFF3;
height: 40px;
}
.table table td.total {
font-size: 16px;
color: #030303;
}
.table table td.text {
font-size: 12px;
color: #7A797B;
}
.table table td.number {
font-size: 14px;
color: #3CBAFF;
}
.cartogram {
padding: 0 12px 50px;
background: #ffffff;
}
.cartogram .cartogram-title {
font-size: 14px;
color: #030303;
line-height: 16px;
padding: 10px 0;
text-align: left;
}
.cartogram .cartogram-route span {
margin-right: 5%;
padding: 5px 0;
width: 29%;
/*background: #3CBAFF;*/
border-radius: 3px;
display: inline-block;
font-size: 14px;
color: #3CBAFF;
border: 1px solid #3CBAFF;
}
.cartogram .cartogram-route span:last-child{
margin-right: 0% !important;
}
.select-span {
background: #3CBAFF;
color: #FFFFFF !important;
}
.content {
margin-top: -6px;
padding-bottom: 11px;
border-bottom: 1px solid #EAEFF3;
}
.cartogram-img>span {
font-size: 12px;
color: #98A1A8;
line-height: 20px;
margin-top: 10px;
}
.route {
float: left;
width: 60px;
text-align: right;
}
.num {
float: right;
}
.data {
height: 20px;
margin-top: 10px;
}
.data>span {
line-height: 20px;
}
.data>span:first-child {
text-align: right;
width: 60px;
}
.data .progress {
width: 54%;
height: 10px;
float: left;
background: #EAEFF3;
margin-top: 5px;
margin-left: 2%;
}
.progress-index {
width: 0%;
height: 10px;
background: #3CBAFF;
}
.footer {
background: #ffffff;
width: 100%;
text-align: right;
position: fixed;
bottom: 0;
right: 0;
font-size: 16px;
line-height: 22px;
padding: 13px 20px 13px 0;
}
.title {
width: 20px;
margin: 0 auto;
display: block;
}
.red {
color: #F35959;
}
.noDataInfo {
  font-size: 18px;
  color: #98A1A8;
}
</style>
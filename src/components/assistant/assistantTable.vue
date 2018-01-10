<template>
  <div class="indexAssistant">
    <div class="header">
      <div class="select-project" @click='jump()'>
        <img src="../../assets/select-project-green.png">
        <span>{{ projectName }}</span>
        <img src="../../assets/arrow-right.png">
        <clear></clear>
      </div>
      <div class="sell-mess-box">
        <div class="sell-mess">
          <ul>
            <li>
              <div class="circle grey"></div>
              <span>不可售({{ cantSellNum }})</span>
            </li>
            <li>
              <div class="circle blue"></div>
              <span>可售({{ canSellNum }})</span>
            </li>
            <clear></clear>
          </ul>
        </div>
      </div>
    </div>
    <div class="floor">
      <div class="floorScroll" id="floorScroll">
        <assistantFloorItem v-for='house in roomList' :floorNum='house' v-if="roomList.length > 0"></assistantFloorItem>
      </div>
    </div>
    <div class="no-content" v-if="roomList.length == 0">
      <img src="../../assets/no-content.png">
    </div>
    <div></div>
    <commonFooter></commonFooter>
  </div>
</template>

<script>
import clear from '@/components/clear'
import {getMarketingControl} from '@/api/getData'
import assistantFloorItem from '@/components/assistant/assistantFloorItem'
import commonFooter from '@/components/assistant/commonFooter'

export default {
  name: 'assistantTable',
  components: {
    clear, assistantFloorItem, commonFooter
  },
  data: function() {
    return {
      projectName: this.$store.state.selectedProjectTable.name + '-' + this.$store.state.selectedBuilding.name,
      cantSellNum: '0',
      canSellNum: '0',
      subscriptionNum: '0',
      signNum: '0',
      reserveNum: '0',
      roomList: [],
      floorList: [],
      roomCount: 0,
      type: 'assistantTable'
      // cellCount: '',
      // statusList: [{
      //   name: '不可售',
      //   color: 'grey'
      // }, {
      //   name: '可售',
      //   color: 'green'
      // }, {
      //   name: '认购',
      //   color: 'red'
      // }, {
      //   name: '签约',
      //   color: 'blue'
      // }, {
      //   name: '预定',
      //   color: 'purple'
      // }
      // ]
    }
  },
  methods: {
    async getHouseList() {
      let params = {
        pk_project: this.$store.state.selectedProjectTable.pk_project,
        pk_building: this.$store.state.selectedBuilding.pk_building,
        method: 'getHouseList'
      }
      let res = await getMarketingControl(params)
      console.log(res)
      // 房间的数量计算
      for (let houses of res.data.data) {
        for (let house of houses.house_list) {
          for (let room of house.floor_list) {
            if (room.vssname === '可售') {
              this.canSellNum++
            } else {
              this.cantSellNum++
            }
          }
        }
      }

      // 重新组装数据
      for (let houses of res.data.data) {
        for (let house of houses.house_list) {
          this.floorList.push(house.floor)
        }
      }
      this.floorList = Array.from(new Set(this.floorList)).sort(function(a, b) {
        return b - a
      })
      console.log(this.floorList)
      for (let i = 0; i < this.floorList.length; i++) {
        this.roomList.push({floor: this.floorList[i], floor_list: []})
      }
      console.log(this.roomList)
      for (let houses of res.data.data) {
        for (let house of houses.house_list) {
          for (let room of this.roomList) {
            if (room.floor === house.floor) {
              for (let list of house.floor_list) {
                room.floor_list.push(list)
              }
            }
          }
        }
      }
      // 通过判断每层楼的最大房间数，来设置宽度
      for (let i = 0; i < this.roomList.length; i++) {
        this.roomCount = (this.roomCount > this.roomList[i].floor_list.length) ? this.roomCount : this.roomList[i].floor_list.length
      }
      // 设置宽度
      let floorScroll = document.getElementById('floorScroll')
      let width = (this.roomCount) * 64 + 40
      floorScroll.style.width = width + 'px'
      console.log(width)
      // for (let i = 0; i < this.houseList; i++) {
      //   let floor = this.houseList[i]
      //   for (let j = 0; j < floor.floor_list.length; j++) {
      //     let room = floor.floor_list[i]
      //     if (room.vssname === '不可售') {
      //       this.cantSellNum++
      //       room.color = 'grey'
      //     }
      //     floor.floor_list[j] = room
          // if (room.vssname === '可售') {
          //   this.cantSellNum++
          //   this.houseList.colorList.push('grey')
          // }
          // if (room.vssname === '认购') {
          //   this.subscriptionNum++
          //   this.houseList.colorList.push('grey')
          // }
          // if (room.vssname === '签约') {
          //   this.signNum++
          //   this.houseList.colorList.push('grey')
          // }
          // if (room.vssname === '预定') {
          //   this.reserveNum++
          //   this.houseList.colorList.push('grey')
          // }
        // }
        // this.
      // }
    },
    jump() {
      this.$router.push('/assistant/selectProject/0/' + this.type)
    },
    checkProject() {
      if (this.$store.state.selectedBuilding.name === '') {
        this.$router.replace('/assistant/selectProject/0/' + this.type)
      }
    }
    // setWidth() {
    //   let floorScroll = document.getElementById('floorScroll')
    //   console.log(floorScroll)
    //   let count = this.roomCount + 1
    //   console.log(count)
    //   floorScroll.style.width = '(this.roomCount + 1)*64px'
    //   console.log(floorScroll.style.width)
    // }
  },
  created: function() {
    this.checkProject()
    this.getHouseList()
  }
}
</script>

<style scoped>
  .header {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
  }
  .select-project {
    height: 44px;
    background: #ffffff;
    line-height: 44px;
    font-family: 'PingFangSC-Regular';
    color: #030303;
    font-size: 16px;
    padding: 0 12px;
  }
  .select-project :first-child {
    width: 20px;
    height: 20px;
    float: left;
    margin-top: 12px;
    margin-right: 13px;
  }
  .select-project img:nth-of-type(2) {
    width: 6px;
    height: 12px;
    float: right;
    margin-top: 16px;
  }
  .select-project span {
    float: left;
  }
  .sell-mess-box {
    background: #EAEFF3;
    height: 31px;
    padding-top: 9px;
  }
  .sell-mess {
    height: 14px;
    color: #98A1A8;
    font-size: 10px;
  }
  .sell-mess li {
    padding-left: 12px;
    float: left;
    width: 30%;
    text-align: left;
  }
  .sell-mess .circle {
    float: left;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    margin-top: 5px;
    margin-right: 1px;
  }
  .sell-mess .grey {
    background: #B9C7D2;
  }
  .sell-mess .blue {
    background: #3CBAFF;
  }
  .floor {
    overflow: auto;
    margin-top: 77px;
    padding-bottom: 44px;
  }
  .no-content img {
    width: 100%;
  }
</style>

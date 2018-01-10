<template>
  <div class="overDate">
    <div class="left-tab" :class="{ active: isactive }" @click="jump('')"><span>认购未签约</span></div>
    <div class="right-tab" :class="{ active: isactive2 }" @click="jump('/overDateQianYue')"><span>签约未回款</span></div>
    <clear></clear>
    <div class="top-title">
      <div class="interval"></div>
      <div class="select" @click="jumpProject()">
        <p><span>{{projectName}}</span></p>
      </div>
      <div class="interval"></div>
      <div class="select" @click="showanalysize">
        <p><span>{{checkedType}}</span></p>
      </div>
      <div class="interval"></div>
    </div>
    <div class="analysize-list" v-if="listshown">
      <div class="analysize-item" v-for="(analysize,index) in analysizeList" :key="analysize.id" @click="chooseList(index)">
        <p><span>{{analysize}}</span></p>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import clear from '@/components/clear'

  export default {
    name: 'overDate',
    components: {
      clear
    },
    data() {
      return {
        isactive: this.$store.state.statementOverIsactive.isactive,
        isactive2: this.$store.state.statementOverIsactive.isactive2,
        listshown: false,
        analysizeList: ['金额(万元)', '套数(套)'],
        checkedType: this.$store.state.overDateType,
        projectName: this.$store.state.statementProject.name
      }
    },
    methods: {
      showanalysize() {
        this.listshown = !this.listshown
      },
      chooseList(index) {
        this.checkedType = this.analysizeList[index]
        this.listshown = !this.listshown
        this.$store.commit('overDateType', this.checkedType)
      },
      jump(router) {
        if (router === '') {
          this.isactive = true
          this.isactive2 = false
        } else {
          this.isactive = false
          this.isactive2 = true
        }
        let statementOverIsactive = {
          isactive: this.isactive,
          isactive2: this.isactive2
        }
        this.$store.commit('statementOverIsactive', statementOverIsactive)
        this.$router.replace('/statement/overDate' + router)
      },
      jumpProject() {
        if (this.isactive === true) {
          this.$router.replace('/statement/selectProject/0/overDate')
        } else {
          this.$router.replace('/statement/selectProject/0/overDateQianYue')
        }
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
  .active {
    color: #3CBAFF;
    border-bottom: 3px solid #3CBAFF;
  }
  .left-tab span, .right-tab span {
    display: inline-block;
    width: 100%;
    margin-top: 10px;
    border-right: 1px solid #DCE1E8;
  }
  .top-title {
    position: relative;
    width: 100%;
    height: 50px;
    display: -webkit-flex;
    -webkit-flex-direction: row;
    -webkit-flex: 1 1 auto;
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;
    justify-content: center;
    align-items: center;
  }
  .interval {
    flex-shrink: 0;
    flex-basis: 2.5%;
    height: 30px;
  }
  .select {
    flex-shrink: 0;
    flex-grow: 1;
    flex-basis: 96px;
    height: 30px;
    background-image: linear-gradient(-180deg, #FFFFFF 0%, #EFF4F7 100%);
    border: 1px solid #B9C7D2;
    border-radius: 2.93px;
  }
  .select p {
    width: 100%;
    margin: 5px 0;
    font-size: 14px;
    color: #333333;
    background: url(../../assets/arrow-down-gray.png) no-repeat center;
    background-size: 8px 4px;
    background-position: 92% 9px;
  }
  .select span {
    display: block;
    height: 16px;
    width: 60%;
    margin: 0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .analysize-list {
    position: absolute;
    width: 46%;
    height: 60px;
    background-image: linear-gradient(-180deg, #FFFFFF 0%, #EFF4F7 100%);
    z-index: 2;
    left: 51.5%;
    top: 78px;
    border-top: 1px solid #B9C7D2;
    border-radius: 2.93px;
  }
  .analysize-list .analysize-item {
    height: 30px;
    font-size: 14px;
    color: #333333;
    line-height: 20px;
    padding: 5px 0;
    border-bottom: 1px solid #B9C7D2;
  }
  .analysize-list .analysize-item:hover {
    background-image: linear-gradient(-180deg, #FFFFFF 0%, #EFF5F7 100%);
  }
</style>
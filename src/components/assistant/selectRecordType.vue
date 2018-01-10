<template>
  <div class="select">
    <div class="record-type" v-for="(item, index) in followList" @click="chooseLabel(index)">
    	<p class="type">{{item.name}}</p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'selectRecordType',
    data() {
      return {
        followList: [{
          name: '来电',
          type: 0
        }, {
          name: '来访',
          type: 1
        }, {
          name: '去电',
          type: 2
        }, {
          name: '去访',
          type: 3
        }, {
          name: '短信',
          type: 4
        }, {
          name: 'Email',
          type: 5
        }],
        id: this.$route.params.id
      }
    },
    methods: {
      chooseLabel(index) {
        let recordInfo = this.$store.state.followType
        recordInfo.typeIndex = index
        recordInfo.type = this.followList[index].type
        this.$store.commit('setRecordType', recordInfo)
        console.log(index)
        console.log(this.followList[index].type)
        this.$router.go(-1)
      }
    }
  }
</script>
<style scoped>
	.select {
		width: 100%;
		background: #FFFFFF;
	}
	.select .record-type {
		width: 100%;
		height: 44px;
		border-bottom: 1px solid #EAEFF3;
	}
	.select .record-type .type {
		height: 16px;
		padding: 14px 16px;
		font-size: 14px;
		color: #030303;
		line-height: 16px;
		text-align: left;
	}
</style>

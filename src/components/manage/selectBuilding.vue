<template>
	<div>
		<div class="building"  v-for='(building, index) in buildingList' @click="checkBuilding(index)" v-if="buildingList.length > 0">{{ building.vbuildingname }}
    </div>
    <div class="no-content" v-if="buildingList.length == 0">
      <img src="../../assets/no-content.png">
    </div>
	</div>
</template>

<script>
  import {getBuildingList} from '@/api/getData'

  export default {
    name: 'selectBuilding',
    data() {
      return {
        buildingList: [],
        type: this.$route.params.type
      }
    },
    methods: {
      async getBuilding() {
        let params = {
          method: 'getBuildingList',
          pk_project: this.$store.state.manageProjectTable.pk_project,
          user_id: this.$store.state.userInfo.user_id
        }
        let res = await getBuildingList(params)
        console.log(res)
        this.buildingList = res.data.data
        console.log(this.buildingList)
      },
      checkBuilding(index) {
        let selectedBuilding = {
          pk_building: this.buildingList[index].pk_building,
          name: this.buildingList[index].vbuildingname
        }
        this.$store.commit('manageBuildingName', selectedBuilding)
        this.$router.push('/manage/' + this.type)
      }
    },
    created: function() {
      this.getBuilding()
    }
  }
</script>

<style scoped>
	.building {
		height: 40px;
		border: 1px solid #EAEFF3;
		line-height: 38px;
		background: #FFFFFF;
		text-align: left;
		padding-left: 10px;
		font-size: 16px;
	}
  .no-content img {
    width: 100%;
  }
</style>
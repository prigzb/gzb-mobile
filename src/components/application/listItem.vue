<template>
  <div class="gzb-list-item" @click="goto">
    <div class="gzb-list-title">
      <span>{{title}}</span>
    </div>
    <div class="gzb-list-detail">
      <span>{{detail}}</span>
    </div>
  </div>
</template>
<script>
export default {
    name: 'listItem',
    props: ['title', 'detail'],
    methods: {
      goto() {
         let info = this.$store.state.approval
         console.log(info)
         this.$router.go(-1)
      }
    }
}
</script>
<style scoped>
.gzb-list-item {
    padding: 0 12px;
    line-height: 44px;
    height: 44px;
    position: relative;
    display: flex;
    vertical-align: middle;
    overflow: hidden;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #EBEFF3;
}
.gzb-list-title {
    display: block;
    width: 0;
    -ms-flex: 1;
    flex: 1;
    -webkit-box-flex: 1;
    font-size: 16px;
}
.gzb-list-detail {
    color: #98a1a8;
    font-size: 14px;
}
</style>

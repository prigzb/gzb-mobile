<template>
  <div class="content" @click='toedit'>             
    <span class="content-title">{{message}}</span>
    <div class="content-icon">  
    </div>
    <span class="content-info">                
      <span :class="color">{{numberone}}</span>/<span>{{numbertwo}}</span>            
    </span>              
    <clear></clear>           
  </div>
</template>

<script>
  import clear from '@/components/clear'
  export default {
  name: 'questionContent',
  data: function() {
      return {
         color: ''
      }
  },
  props: ['message', 'numberone', 'numbertwo', 'type', 'mainkey', 'examkey', 'id'],
  components: {
    clear
  },
  methods: {
      toedit() {
        let questionInfo = this.$store.state.questionInfo
        questionInfo.pkInquire = this.mainkey
        questionInfo.pkexamtemp = this.examkey
        this.$store.commit('getQuestionInfo', questionInfo)
        this.$router.push('/manage/questionnaireLine/' + this.id + '/' + this.type)
      },
      changeColor() {
        if (this.numberone < this.numbertwo && this.numberone !== 0) {
          this.color = 'red'
        } else if (this.numberone === this.numbertwo) {
          this.color = 'green'
        }
      }
  },
  created: function() {
      this.changeColor()
  }
  }
</script>
<style scoped>
    .content {
        height: 44px;
        line-height: 44px;
    }
    .content .content-title {
        float: left;
        font-size: 16px;
        color: #030303;
    }
    .content .content-info {
        float: right;
        font-size: 16px;
        color: #98A1A8;
        margin-right: 6px;
    }
   .content-icon {
      width: 4%;
      height: 44px;
      float: right;
      background: url(../../assets/arrow-right.png) no-repeat center right;
      background-size: 8px auto;
    }
    .green {
        color: #90CB36;
    }
    .red {
        color: #F35959;
    }
</style>

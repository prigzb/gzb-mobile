<template>
  <div class="questionnaire">
      <div class="line" v-for="(data,index) in renderListsa" :key='data.id'>
          <p>{{data.name}}</p>
          <div v-for="(data,index) in data.contents">
             <questionContent :message='data.vetname' :numberone='data.answernum' :numbertwo='data.questnum' :type='data.fettypename' :mainkey='data.pk_inquire' :examkey='data.pk_examtemp' :id='pkCustomer'></questionContent>
          </div>
      </div>
   </div>
</template>


<script>
    import messCheckItem from '@/components/manage/messCheckItem'
    import questionContent from '@/components/manage/questionContent'
    import {getQuestionList} from '@/api/getData'
    export default {
      name: 'questionnaire',
      data: function() {
        return {
          renderListsa: [],
          pkCustomer: this.$route.params.id
        }
      },
      components: {
        messCheckItem, questionContent
      },
      methods: {
        async getList() {
            console.log(this.pkCustomer)
            let params = {
             'method': 'getList',
             // 'vcode': 'QPXM',
             'vcode': this.$store.state.manageProject.vcode,
             'pk_customer': this.pkCustomer
             // 'pk_customer': '10081210000000008B0S'
            }
            let res = await getQuestionList(params)
            console.log(res)
            let namess = []
            let renderLists = []
            for (let data of res.data.data) {
              let nameType = data.fettypename
              namess.push(nameType)
            }
            let names = Array.from(new Set(namess))
            for (let name of names) {
               renderLists.push({name: name, contents: []})
            }
            for (let renderList of renderLists) {
               for (let data of res.data.data) {
                  let typeName = data.fettypename
                  if (renderList.name === typeName) {
                     renderList.contents.push(data)
                  }
               }
            }
            // console.log(renderLists)
            this.renderListsa = renderLists
            return renderLists
         }
      },
      created: function() {
          this.getList()
      }
    }
</script>

  
<style scoped>
    body {
        background: #EAEFF3;
    }
    .line {
       margin: 0 auto;
    }
    .line p {
        font-size: 13px;
        padding: 6px 4%;
        color: #98A1A8;
        text-align: left;
    }
    .line>div {
       padding: 0 4%;
       background: #FFF;
    }
    .line>div div {
       border-bottom: 1px solid #EAEFF3;
    }
    .hrwrap {
        background: #FFF;
    }
    .hr {
      margin: 0 auto;
      background: #EAEFF3;
      width: 92%;
      height: 1px;
    }
</style>
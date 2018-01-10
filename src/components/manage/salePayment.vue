<template>
  <div class="saleReserve">
    <ve-histogram :series="series" :dataZoom="dataZoom" :xAxis="xAxis" :yAxis="yAxis" :legend="legend"></ve-histogram>  
  </div>
</template>

<script>
  import clear from '@/components/clear'
  import {huikuanNum, huikuanAmount} from '@/js/getTable'

  export default {
    name: 'salePayment',
    components: {
      clear
    },
    data() {
      return {
        legend: {
          data: ['套数(套)', '金额(万元)'],
          textStyle: {
            color: '#030303'
          }
        },
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0],
            filterMode: 'empty',
            start: 80,
            end: 20,
            zoomLock: true
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '套数(套)'
          },
          {
            type: 'value',
            name: '金额(万元)'
          }
        ],
        performanceCheckedDate: this.$store.state.performanceCheckedDate
      }
    },
    computed: {
      xAxis() {
        return {
            type: 'category',
            data: this.$store.state.manageDates
          }
      },
      series() {
        return [
          {
            name: '套数(套)',
            type: 'bar',
            data: huikuanNum(this.$store.state.manageTable),
            itemStyle: {
              normal: {
                color: '#EAEFF3'
              },
              emphasis: {
                color: '#3CBAFF'
              }
            }
          },
          {
            name: '金额(万元)',
            type: 'line',
            data: huikuanAmount(this.$store.state.manageTable),
            itemStyle: {
              normal: {
                color: '#F7BF28'
              }
            },
            yAxisIndex: 1
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .saleReserve {
    padding-top: 20px;
    background: #FFFFFF;
  }
</style>
<template>
	<div class="follow-record">
		<div class="septal-line"></div>
		<p class="record">
			<span class="pone icon" :class="[code]"></span>
			<span class="pone description">{{fproceedingtype}}</span>
			<span class="pone latest-time">{{dproceedingdate}}</span>
		</p>
		<p class="content" v-if="srecord">
			{{vproceedingdesc}}
		</p>
	</div>
</template>
<script>
import clear from '@/components/clear'
  export default {
    name: 'followRecords',
    props: ['fproceedingtype', 'dproceedingdate', 'vproceedingdesc', 'code', 'srecord'],
    components: {
      clear
    },
    methods: {
      con() {
        console.log(this.code)
      }
    },
    created: function() {
      this.con()
    }
  }
</script>
<style scoped>
	.follow-record {
		width: 100%;
		/*min-height: 79px;*/
		max-height: 98px;
	}
	.follow-record .record {
		height: 22px;
		margin: 12px 0;
	}
	.follow-record .record .pone {
		display: inline-block;
		float: left;
	}
	.follow-record .record .icon {
		width: 22px;
		height: 22px;
		margin: 0 8px 0 12px;
	}
	.call {
		background: url(../../assets/callUp.png) no-repeat center;
		background-size: 100%;
	}
	.go-call {
		background: url(../../assets/go-call.png) no-repeat center;
		background-size: 100%;
	}
	.come-visit {
		background: url(../../assets/come-visit.png) no-repeat center;
		background-size: 100%;
	}
	.go-visit {
		background: url(../../assets/go-visit.png) no-repeat center;
		background-size: 100%;
	}
	.note {
		background: url(../../assets/note.png) no-repeat center;
		background-size: 100%;
	}
	.e-mail {
		background: url(../../assets/e-mail.png) no-repeat center;
		background-size: 100%;
	}
	.follow-record .record .description {
		width: 32px;
		height: 16px;
		font-size: 16px;
		color: #030303;
		line-height: 16px;
		margin: 3px 0;
	}
	.follow-record .record .latest-time {
		width: 118px;
		height: 17px;
		font-size: 12px;
		color: #98A1A8;
		line-height: 17px;
		margin: 3px 12px 2px 116px;
		float: right;
		text-align: right;
	}
	.follow-record .content {
		min-height: 20px;
		max-height: 40px;
		margin: 0 12px 13px;
		font-size: 14px;
		color: #7A797B;
		line-height: 20px;
		text-align: left;
		word-wrap: break-word;
		overflow: scroll;
		text-overflow: ellipsis;
	}
	.follow-record .septal-line {
		width: 96.3%;
  		height: 0;
  		border-bottom: 1px solid #EAEFF3;
  		margin-left: 3.7%;
	}
</style>
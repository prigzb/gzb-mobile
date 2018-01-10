<template>
	<div class="messChoiceItem">
		<div class="left-content">{{ leftContent }}<span>{{ asterisk }}</span></div>
		<div class="right-content">
			<div class="nav-item" @click='showList'>
				<span :class="arrow">{{ myrightContent }}</span>&nbsp;&nbsp;
				<span class='right'></span>
			</div>
		</div>
		<clear></clear>
	</div>
</template>

<script>
	import clear from '@/components/clear'
	export default {
    name: 'messChoiceItem',
    data() {
      return {
        code: 0,
        myrightContent: this.rightContent,
        arrow: ''
      }
    },
    components: {
      clear
    },
    props: ['leftContent', 'rightContent', 'items', 'asterisk', 'type'
    ],
    methods: {
      showList() {
        // console.log(this.status)
        if (this.rightContent === '预定' || this.rightContent === '签约' || this.rightContent === '认购') {
            return false
        }
        if (this.type === 'nationality') {
          this.$router.push('/assistant/addClientDetailed/national')
        } else if (this.type === 'addClientBasic') {
          this.$router.push('/assistant/selectProject/0/' + this.type)
        } else {
          this.$router.push('/assistant/addClientBasic/' + this.type)
        }
      },
      color() {
         if (this.myrightContent.indexOf('请选择') < 0) {
           this.arrow = 'arrow'
         }
      }
    },
    created: function() {
       this.color()
    }
  }
</script>

<style scoped>
	.messChoiceItem {
		height: 44px;
		border-bottom: 1px solid #DCE1E8;
		line-height: 44px;
		font-size: 14px;
		background: #ffffff;
		position: relative;
	}
	.left-content {
		float: left;
		color: #7A797B;
		padding-left: 12px;
	}
	.left-content span {
		color: #F35959;
	}
	.right-content {
		float: right;
		color: #98A1A8;
		padding-right: 12px;
	}
	.right-content .right {
		width: 3px;
		height: 6px;
		display: inline-block;
		vertical-align: middle;
		background: url('../../assets/arrow-right.png') no-repeat center;
		background-size: 3px 6px;
	}
	.right-content .down {
		width: 6px;
		height: 3px;
		display: inline-block;
		vertical-align: middle;
		background: url('../../assets/arrow-down.png') no-repeat center;
		background-size: 6px 3px;
	}
	.list {
		width: 30%;
		position: absolute;
		right: 15px;
		top: 40px;
		z-index: 10;
	}
	.item {
		height: 40px;
		border: 1px solid #EAEFF3;
		background: #ffffff;
	}
	.list :first-child {
		border-radius: 10px 10px 0 0;
	}
	.list :last-child {
		border-radius: 0 0 10px 10px;
	}
	.arrow {
	  color: #030303;
	}
</style>
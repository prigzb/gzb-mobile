<template>
	<div class="messCheckItem">
		<div class="left-content">{{ leftContent }}<span>{{ asterisk }}</span></div>
		<div class="right-content">
			<div class="radio1">
				<input type="radio" :name="checkName" :id="yesId" class="radio" :value='lContent' v-model="pick" v-bind:disabled="isDisabled">
				<label :for="yesId">{{ lContent }}</label>
			</div>
			<div class="radio2">
				<input type="radio" :name="checkName" :id="noId" class="radio" :value='rContent' v-model="pick" v-bind:disabled="isDisabled">
				<label :for="noId">{{ rContent }}</label>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
    name: 'messCheckItem',
    props: ['leftContent', 'lContent', 'rContent', 'checkName', 'yesId', 'noId', 'asterisk', 'initialPick'],
    data: function () {
        return {
          isDisabled: true,
          status: this.$store.state.personalInfo.status,
          pick: this.initialPick
        }
    },
    methods: {
      Disabled() {
        if (this.status === 'alter' && this.checkName === 'sex') {
         this.isDisabled = true
        } else {
         this.isDisabled = false
        }
      }
    },
    watch: {
      pick: function() {
       console.log(this.checkName)
       let personalInfo = this.$store.state.personalInfo
       if (this.checkName === 'sex') {
          personalInfo.sex.value = this.pick
          if (this.pick === '男') {
            personalInfo.sex.code = '0'
          } else {
            personalInfo.sex.code = '1'
          }
          this.$store.commit('addPersonal', personalInfo)
        } else if (this.checkName === 'isFollow') {
          personalInfo.focusOn = this.pick
          this.$store.commit('addPersonal', personalInfo)
        } else if (this.checkName === 'house') {
          personalInfo.entitledTo = this.pick
          this.$store.commit('addPersonal', personalInfo)
        } else if (this.checkName === 'merry') {
          personalInfo.maritalStatus.value = this.pick
          if (this.pick === '已婚') {
            personalInfo.maritalStatus.code = '1'
          } else {
            personalInfo.maritalStatus.code = '0'
          }
          this.$store.commit('addPersonal', personalInfo)
        }
      }
    },
    created: function() {
      this.Disabled()
    }
  }
</script>

<style scoped>
	.messCheckItem {
		height: 44px;
		border: 1px solid #EAEFF3;
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
		color: #030303;
		width: 75%;
	}
	.radio1 {
		text-align: left;
		width: 30%;
		display: inline-block;
	}
	.radio2 {
		margin-right: -48px;
		text-align: left;
		width: 30%;
		display: inline-block;
	}
	input {
		opacity: 0;
	}
	label {
	  background: url('../../assets/not-checked.png') no-repeat left;
      background-size: 18px 18px;
      padding-left: 24px;
      display: inline-block;
      font-size: 14px;
      line-height: 20px;
      color: #030303;
	}
	input[type='radio']:checked+label {
	  background: url('../../assets/checked.png') no-repeat left;
      background-size: 18px 18px;
      padding-left: 24px;
      display: inline-block;
	}
</style>
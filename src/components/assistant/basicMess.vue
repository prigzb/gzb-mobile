<template>
	<div class="basicMess">
		<messHeader></messHeader>
		<form>
			<div class="basicContent">
				<div class="project">
					<div class="left-content">意向项目 <span>*</span></div>
					<div class="right-content">
						<router-link to='/assistant/selectProject'>
							<span>{{ projectName }}</span>&nbsp;&nbsp;
						  <span :class="arrow"></span>
						</router-link>
					</div>
					<clear></clear>
				</div>
				<div class="customer-name">
					<div class="left-content">客户姓名 <span>*</span></div>
					<div class="right-content">{{ customerName }}</div>
					<clear></clear>
				</div>
				<messCheckItem leftContent='性别' lContent='男' rContent='女' checkName='
				gender' yesId='gender1' noId='gender2' asterisk=' *'></messCheckItem>
				<div class="telephone">
					<div class="left-content">首选联系电话 <span>*</span></div>
					<div class="right-content">{{ telephone }}</div>
					<clear></clear>
				</div>
				<div class="know-method">
					<div class="left-content">认知途径 <span>*</span></div>
					<div class="right-content">
						<div class="nav-item" @click='showList'>
							<span class="arrow">{{ checkedMethod }}</span>&nbsp;&nbsp;
							<span :class="methodArrow"></span>
						</div>
					</div>
					<clear></clear>
					<div class="method-list" v-if='listshown'>
						<div class="method-item" v-for= '(method, index) in methods' @click='checkMethod(index)'>{{ method }}</div>
					</div>
				</div>
				<div class="certificates">
					<div class="left-content">证件名称</div>
					<div class="right-content">
						<div class="nav-item" @click='showCertificates'>
							<span class="arrow">{{ checkedCertificate}}</span>&nbsp;&nbsp;
							<span :class='certificatesArrow'></span>
						</div>
					</div>
					<clear></clear>
					<div class="certificates-list" v-if='cerListshown'>
						<div class="certificates-item" v-for='(certificate, index) in certificates' @click='checkCertificate(index)'>{{ certificate }}</div>
					</div>
				</div>
				<div class="certificates-num">
					<div class="left-content">证件号码</div>
					<div class="right-content">
						<input type="text" name="" placeholder="请输入证件号码">
					</div>
					<clear></clear>
				</div>
				<div class="customer-place">
					<div class="left-content">联系地址</div>
					<div class="right-content">
						<input type="text" name="" placeholder="请输入联系地址">
					</div>
				</div>
				<div class="customer-type">
					<div class="left-content">客户类型</div>
					<div class="right-content">
						<div class="nav-item" @click='showTypes'>
							<span class="arrow">{{ checkedType}}</span>&nbsp;&nbsp;
							<span :class='typesArrow'></span>
						</div>
					</div>
					<clear></clear>
					<div class="types-list" v-if='typeListshown'>
						<div class="type-item" v-for='(type, index) in types' @click='checkType(index)'>{{ type }}</div>
					</div>
				</div>
				<div class="customer-level">
					<div class="left-content">客户级别</div>
					<div class="right-content">
						<div class="nav-item" @click='showLevels'>
							<span class="arrow">{{ checkedLevel}}</span>&nbsp;&nbsp;
							<span :class='levelsArrow'></span>
						</div>
					</div>
					<clear></clear>
					<div class="types-list" v-if='levelListshown'>
						<div class="type-item" v-for='(level, index) in levels' @click='checkLevel(index)'>{{ level }}</div>
					</div>
				</div>
				<div class="register-time">
					<div class="left-content">登记时间</div>
					<div class="right-content">{{ registerTime }}</div>
				</div>
				<messCheckItem leftContent='是否关注' lContent='是' rContent='否' checkName='isFollow'
				  yesId='follow1' noId='follow2'></messCheckItem>
			</div>
		</form>
		<messFooter></messFooter>
	</div>
</template>

<script>
	import messHeader from '@/components/assistant/messHeader'
	import clear from '@/components/clear'
	import messFooter from '@/components/assistant/messFooter'
	import messCheckItem from '@/components/assistant/messCheckItem'

	export default {
    name: 'basicMess',
    components: {
      messHeader, clear, messFooter, messCheckItem
    },
    data() {
      return {
        listshown: false,
        projectName: '国博城',
        customerName: '王小明',
        telephone: 13900201628,
        checkedMethod: '广告',
        methods: ['广告', '电视', '手机', '朋友'],
        checkedCertificate: '身份证',
         certificates: ['身份证', '军人证', '护照', '其他', '外籍身份证', '港澳通行证'],
        checkedType: '潜在',
        types: ['潜在', '过去顾客', '目标顾客'],
        checkedLevel: '请选择客户级别',
        levels: ['A', 'B', 'C', 'D', 'E'],
        imgsrc: '../../assets/arrow-right.png',
        arrow: 'right',
        methodArrow: 'right',
        certificatesArrow: 'right',
        typesArrow: 'right',
        levelsArrow: 'right',
        cerListshown: false,
        typeListshown: false,
        levelListshown: false,
        registerTime: '2017-03-20 12:20:31'
      }
    },
    methods: {
      // 通过类名获取元素
      // getElementsByClass(classname) {
      //   var classObj = []
      //   var classInt = 0
      //   var tags = document.getElementsByTagName('*')
      //   for (var i in tags) {
      //     if (tags[i].nodeType === 1) {
      //       if (tags[i].getAttribute('class') === classname) {
      //         classObj[classInt] = tags[i]
      //         classInt++
      //       }
      //     }
      //   }
      //   return classObj
      // },
      showList() {
        if (this.listshown) {
          this.methodArrow = 'right'
        } else {
          this.methodArrow = 'down'
        }
        this.listshown = !this.listshown
      },
      showCertificates() {
        if (this.cerListshown) {
          this.certificatesArrow = 'right'
        } else {
          this.certificatesArrow = 'down'
        }
        this.cerListshown = !this.cerListshown
      },
      showTypes() {
        if (this.typeListshown) {
          this.typesArrow = 'right'
        } else {
          this.typesArrow = 'down'
        }
        this.typeListshown = !this.typeListshown
      },
      showLevels() {
        if (this.levelListshown) {
          this.levelsArrow = 'right'
        } else {
          this.levelsArrow = 'down'
        }
        this.levelListshown = !this.levelListshown
      },
      checkMethod(index) {
        if (this.listshown) {
          this.methodArrow = 'right'
        } else {
          this.methodArrow = 'down'
        }
        this.listshown = !this.listshown
        this.checkedMethod = this.methods[index]
      },
      checkCertificate(index) {
        if (this.cerListshown) {
          this.certificatesArrow = 'right'
        } else {
          this.certificatesArrow = 'down'
        }
        this.cerListshown = !this.cerListshown
        this.checkedCertificate = this.certificates[index]
      },
      checkType(index) {
        if (this.typeListshown) {
          this.typesArrow = 'right'
        } else {
          this.typesArrow = 'down'
        }
        this.typeListshown = !this.typeListshown
        this.checkedType = this.types[index]
      },
      checkLevel(index) {
        if (this.levelListshown) {
          this.levelsArrow = 'right'
        } else {
          this.levelsArrow = 'down'
        }
        this.levelListshown = !this.levelListshown
        this.checkedLevel = this.levels[index]
      }
    }
  }
</script>

<style scoped>
	.basicContent {
		background: #ffffff;
		margin-top: 8px;
		font-family: 'PingFangSC-Regular';
		font-size: 14px;
	}
	.basicContent > div {
		height: 46px;
		border: 1px solid #EAEFF3;
		line-height: 44px;
	}
	.left-content {
		float: left;
		color: #7A797B;
		padding-left: 12px;
	}
	.right-content {
		float: right;
		color: #030303;
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
	.option1, .option2 {
		width: 14px;
		height: 14px;
		border-radius: 7px;
		background: url('../../assets/not-checked.png') no-repeat center;
		background-size:14px 14px;
	}
	.telephone .right-content {
		color: #98A1A8;
	}
	.left-content span {
		color: #F35959;
		font-size: 12px;
	}
	.method-list, .certificates-list, .types-list, .levels-list {
		width: 25%;
		position: absolute;
		right: 0;
		top: 40px;
		z-index: 10;
	}
	.method-item, .certificates-item, .type-item, .level.item {
		height: 40px;
		border: 1px solid #EAEFF3;
		background: #ffffff;
	}
	.method-list :first-child, .certificates-list :first-child, .types-list :first-child, .levels-list :first-child {
		border-radius: 10px 10px 0 0;
	}
	.method-list :last-child, .certificates-list :last-child, .types-list :last-child, .levels-list :last-child {
		border-radius: 0 0 10px 10px;
	}
	.know-method, .certificates, .customer-type, .customer-level {
		position: relative;
	}
	.certificates-num input, .customer-place input {
		text-align: right;
		color: #98A1A8;
	}
	::-webkit-input-placeholder { /* WebKit browsers */  
		font-family: 'PingFangSC-Regular';
        color: #98A1A8;  
	}
	.customer-level span, .register-time .right-content {
		color: #98A1A8;
	}
</style>
<template>
<!-- 创建一个用于分享的弹出面板 -->
<y-action-sheet type="panel" panelTitle="分享到" :actionSheetItem="actionSheetPanelItem" @maskClicked="maskClicked" :show="showActionPanel" @cancel="maskClicked">
</y-action-sheet>
</template>
<script>
import {XuntongJSBridge} from '../js/qingjs'
export default {
    name: 'ready',
    props: {},
    data() {
        return {
            actionSheetPanelItem: [{
                    title: '同事圈',
                    icon: require('../assets/logo.png'),
                    callback: this.actionItemClick
                },
                {
                    title: '收藏',
                    icon: require('../assets/logo.png'),
                    callback: this.actionItemClick
                }
            ],
            actionSheetCheckboxItem: [{
                    title: '上传到电脑',
                    checked: true,
                    value: 'upload',
                    icon: require('../assets/logo.png'),
                    callback: this.actionItemClick
                },
                {
                    title: '转发',
                    icon: require('../assets/logo.png'),
                    callback: this.actionItemClick
                }
            ],
            showActionList: false,
            showActionCheckbox: false
        }
    },
    methods: {
        maskClicked: function() {
            console.log('mask clicked')
            this.showActionList = false
            this.showActionCheckbox = false
        //    this.showActionPanel = false
            this.$store.commit('showorhide')
            this.showPop = false
        },
        checkboxChange: function(value, status) {
            console.log(value)
            console.log(status)
        },
        actionItemClick: function() {
            alert(this.isYzjApp)
            if (!this.isYzjApp) {
                alert('Hello！当前不在云之家App（桌面端）中！开启您的轻应用之旅吧！')
            } else {
                XuntongJSBridge.call('createPop', { 'popTitle': '保存' })
            }
        },
        actionSheetChange: function(value, status) {
            console.log(value, status)
        }
    },
    computed: {
        isYzjApp: function() {
            if (navigator.userAgent.match(/Qing\/.*;(iOS|iPhone|Android).*/)) {
                return true
            } else {
                return false
            }
        },
        showActionPanel () {
            return this.$store.state.showItem
        }
    }
}
</script>

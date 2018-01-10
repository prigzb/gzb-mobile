  <template>
    <div style="padding-bottom:52px;">
        <div class="travel-price-detail" v-for="(item, index) in item_list">
            <div class="price-title">
                <div class="title-left">明细{{index+1}}</div>
                <div class="title-del" v-if="index > 0" @click="removeItemList(index)"></div>
                <clear></clear>
            </div>
            <ul>
                <li>
                    <div class="detail-li-left">出发日期<span>*</span></div>
                    <yd-datetime type="date" class="datetime-input" v-model="item.begin_date" slot="right"></yd-datetime>
                    <clear></clear>
                </li>
                <li>
                    <div class="detail-li-left">出发地点<span>*</span></div>
                    <div class="detail-li-right">
                        <input type="text" name="" placeholder="请输入地点" v-model="item.cfadress">
                    </div>
                    <clear></clear>
                </li>
                <li>
                    <div class="detail-li-left">到达日期<span>*</span></div>
                    <yd-datetime type="date" class="datetime-input" v-model="item.end_date" slot="right"></yd-datetime>
                    <clear></clear>
                </li>
                <li>
                    <div class="detail-li-left">到达地点<span>*</span></div>
                    <div class="detail-li-right">
                        <input type="text" name="" placeholder="请输入地点" v-model="item.ddadress">
                    </div>
                    <clear></clear>
                </li>
                <li>
                    <div class="detail-li-left">交通工具<span>*</span></div>
                    <div class="detail-li-right traffic-choose">
                        <div class="choose-title" @click="showList">{{toolChoosed(index)}}<span></span></div>
                        <ul v-if="listShown">
                            <li v-for="(tool, tIndex) in typeList" @click="chooseList(tIndex, index)">{{tool}}</li>
                        </ul>
                    </div>
                    <clear></clear>
                </li>
                <li>
                    <div class="detail-li-left">路费<span>*</span></div>
                    <div class="detail-li-right">
                        <span class="price-yuan">元</span>
                        <input class="small-width" type="number" name="" placeholder="" v-model="item.road">
                    </div>
                    <clear></clear>
                </li>
                <li>
                    <div class="detail-li-left">市内交通费</div>
                    <div class="detail-li-right">
                        <span class="price-yuan">元</span>
                        <input class="small-width" type="number" name="" placeholder="" v-model="item.carfare">
                    </div>
                    <clear></clear>
                </li>
                <li>
                    <div class="detail-li-left">住宿费</div>
                    <div class="detail-li-right">
                        <span class="price-yuan">元</span>
                        <input class="small-width" type="number" name="" placeholder="" v-model="item.stay">
                    </div>
                    <clear></clear>
                </li>
                <li>
                    <div class="detail-li-left">其他费用</div>
                    <div class="detail-li-right">
                        <span class="price-yuan">元</span>
                        <input class="small-width" type="number" name="" placeholder="" v-model="item.other">
                    </div>
                    <clear></clear>
                </li>
                <li>
                    <div class="detail-li-left">出差天数</div>
                    <div class="detail-li-right">
                        <span class="price-yuan">天</span>
                        <input class="small-width" type="number" name="" placeholder="" v-model="item.day">
                    </div>
                    <clear></clear>
                </li>
                <li>
                    <div class="detail-li-left">出差补助</div>
                    <div class="detail-li-right">
                        <span class="price-yuan">元</span>
                        <input class="small-width" type="number" name="" placeholder="" v-model="item.allowance">
                    </div>
                    <clear></clear>
                </li>
                <li>
                    <div class="detail-li-left black-color">报销金额</div>
                    <div class="detail-li-right"><span class="red-total">{{getAmount(item)}}</span>元</div>
                    <clear></clear>
                </li>
            </ul>
        </div>
        <!-- 新增明细 -->
        <div class="travel-detail-add">
            <div class="add-icon" @click="addItemList">新增明细</div>
        </div>
        <!-- 底部 -->
        <div class="travel-detail-footer">
            <div class="footer-total">总价：<span class="red-color">{{total}}</span><span class="total-yuan">元</span></div>
            <div class="footer-sure" @click="confirm">确定</div>
            <clear></clear>
        </div>
    </div>
</template>

<script>
    // import ready from '@/components/Ready'
    import travelPriceItem from '@/components/approval/travelPriceItem'
    import clear from '@/components/clear'

    export default {
        name: 'travelPrice',
        data() {
            return {
                listShown: false,
                geturl: 'http://61.136.222.247:8086//servlet/MobileApproveServlet',
                item_list: this.$store.state.appItem,
                typeList: ['火车', '汽车', '飞机']
            }
        },
        components: {
            travelPriceItem, clear
        },
        methods: {
            showList() {
              this.listShown = !this.listShown
            },
            getmess: async function() {
              let res = await this.$http.get(this.geturl, {
                params: {
                  'userid': '0001C410000000000YQ3',
                  'statuskey': 'ishandled',
                  'statuscode': 'unhandled',
                  'startline': '0',
                  'count': '10',
                  'condition': '',
                  'method': 'getTaskList'
                }
              })
              console.log(res)
            },
            itemWeek() {
                let date = new Date()
                let month = date.getMonth() + 1
                let today = date.getDate().toString().length === 1 ? '0' + date.getDate().toString() : date.getDate().toString()
                month = month.toString().length === 1 ? '0' + month.toString() : month.toString()
                return date.getFullYear() + '-' + month + '-' + today
            },
            addItemList() {
                let item = {
                    begin_date: this.itemWeek(),
                    end_date: this.itemWeek(),
                    cfadress: '',
                    ddadress: '',
                    trip_type: '',
                    road: '',
                    carfare: '',
                    stay: '',
                    other: '',
                    day: '',
                    allowance: '',
                    amount: '',
                    toolIndex: -1
                }
                this.item_list.push(item)
            },
            removeItemList(index) {
                this.item_list.splice(index, 1)
            },
            getAmount(item) {
                let num = 0
                num += Number(item.road) + Number(item.carfare) + Number(item.stay) + Number(item.other) + Number(item.allowance)
                return num
            },
            chooseList(index, itemIndex) {
                this.listShown = !this.listShown
                this.item_list[itemIndex].toolIndex = index
            },
            toolChoosed(index) {
                if (!this.item_list[index].toolIndex && this.item_list[index].toolIndex !== 0 && this.item_list[index].trip_type) return this.item_list[index].trip_type
                if ((!this.item_list[index].toolIndex && this.item_list[index].toolIndex !== 0) || this.item_list[index].toolIndex === -1) return '请选择交通工具'
                return this.typeList[this.item_list[index].toolIndex]
            },
            fillItemList() {
                for (let i = 0; i < this.item_list.length; i++) {
                    let item = this.item_list[i]
                    item.amount = this.getAmount(item).toString()
                    item.trip_type = this.toolChoosed(i) || item.trip_type
                    this.item_list.splice(i, 1, item)
                }
            },
            confirm() {
                this.fillItemList()
                this.$store.commit('setAppItem', this.item_list)
                let info = this.$store.state.travelInfo
                let count = 0
                for (let item of this.item_list) {
                    count += Number(item.amount)
                }
                info.amount = count
                info.bamount = count
                this.$store.commit('editTravel', info)
                this.$router.go(-1)
            }
        },
        created: function() {
            if (this.item_list.length === 0) {
                this.addItemList()
            }
        },
        computed: {
            total() {
                let num = 0
                for (let item of this.item_list) {
                    num += this.getAmount(item)
                }
                return num
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}
ul {
    list-style-type: none;
}
.travel-price-detail{
    background-color: #fff;
    font-size: 14px;
    margin-bottom: 8px;
}
.price-title{
    line-height: 44px;
    padding-right: 4%;
    margin-left: 4%;
    border-bottom: 1px solid #EAEFF3;
}
.title-left{
    float: left;
    color: #030303;
    font-size: 16px;
}
.title-del{
    float: right;
    width: 20px;
    height: 44px;
    background: url(../../assets/delete.png) no-repeat right center;
    background-size: 18px auto;
}
.travel-price-detail ul li{
    width: 96%;
    margin-left: 4%;
    padding-right: 4%;
    border-bottom: 1px solid #EAEFF3;
    line-height: 44px;
    color: #7A797B;
    -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
            box-sizing: border-box;
}
.travel-price-detail ul li:last-child{
    border-bottom: 0;
}
.datetime-input {
    width: 40% !important;
    text-align: right;
}
.detail-li-left{
    float: left;
}
.detail-li-left span{
    color: #F35959;
    font-size: 12px;
    margin-left: 4px;
}
.detail-li-left.black-color{
    color: #030303;
}
.detail-li-right{
    float: right;
    width: 70%;
    text-align: right;
}
.detail-li-right .red-total{
    color: #F25959;
    font-size: 18px;
}
.detail-li-right input{
    text-align: right;
    font-size: 14px;
    height: 30px;
    width: 100%;
    border: 0;
}
input.small-width{
    width: 80%;
}
.detail-li-right span.price-yuan{
    line-height: 44px;
    float: right;
}
.traffic-choose{
    width: 45%;
}
.traffic-choose .choose-title{
    line-height: 30px;
    height: 30px;
    background-image: linear-gradient(-180deg, #FFFFFF 0%, #EFF4F7 100%);
    border: 1px solid #B9C7D2;
    border-radius: 3px;
    margin-top: 6px;
    color: #333;
    padding-left: 12px;
    text-align: center;
    -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
            box-sizing: border-box;
}
.traffic-choose .choose-title span{
    display: inline-block;
    float: right;
    width: 17%;
    height: 30px;
    background: url(../../assets/travel-triangle.png) no-repeat center center;
    background-size: 8px auto;
}
.traffic-choose ul {
    border: 1px solid #B9C7D2;
    position: absolute;
    width: 41%;
    background: #FFFFFF;
}
.traffic-choose li {
    text-align: center;
    line-height: 30px !important;
    color: #333;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
/*新增明细*/
.travel-detail-add{
    text-align: center;
    background-color: #fff;
    color: #3CBAFF;
    font-size: 16px;
    /*margin-bottom: 52px;*/
}
.travel-detail-add .add-icon{
    padding-left: 22px;
    background: url(../../assets/icon-add.png) no-repeat left center;
    background-size: 16px auto;
    display: inline-block;
    line-height: 44px;
}
.travel-detail-footer{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 16px;
    background-color: #fff;
    line-height: 44px;
    padding-left: 4%;
}
.footer-total {
    float: left;
    width: 75%;
}
.footer-total .red-color{
    display: inline-block;
    max-width:-webkit-calc(100% - 70px);
    max-width:-moz-calc(100% - 70px);
    max-width:calc(100% - 70px);
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.footer-total .red-color{
    font-size: 18px;
    color: #F25959;
}
.footer-total .total-yuan{
    font-size: 12px;
    margin-left: 4px;
}
.footer-sure{
    width: 25%;
    color: #fff;
    float: right;
    background-color: #3CBAFF;
}
</style>

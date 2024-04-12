<template>
  <view class="business_listWrap">
    <!-- 头部 -->
    <view class="pageHead">
      <view class="header-wrap">
        <view class="indexHeader">
          <view class="index-header">
            <view class="headerLeftMenu">
              <text class="backIcon" @tap="navigateBack"></text>
            </view>
            <view class="header-title-wrap">
              <view class="detail_anchor_wrap">
                <view class="title_text_box">
                  <text>匹配数据</text>
                </view>
              </view>
            </view>
            <view class="headerRightMenu">
              <text class="menu" @tap="isShowNewListFun">{{banraName}}</text>
              <!-- 二级菜单-->
              <view class="H-newlist" :class="{'active':isShowNewList == true}">
                <view class="HnewlistWrap">
                  <view class="listItem" v-for="(i, index) in brandList" :key="index" @tap="selectBran(i)">
                    <text>{{i.title}}</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="height128"></view>
    </view>

    <view class="contentWrap" @tap="isShowNewList = false">
      <!-- start top_wrap -->
      <view class="top_wrap">
        <view class="top_wrap_item1">
          <view class="top_wrap_item1_left">
            <view class="order_number">
              【{{result.expect}}】
            </view>
            <view class="order_result">
              订单匹配结果
            </view>
          </view>
          <view class="top_wrap_item1_right">
            <view class="Matching" v-if="isShow">
              订单正在匹配中...
            </view>
            <view class="item1_right_type" v-else>
              <view class="item1_right_type_text1">
                {{result.size == 0 ? '统货Ct+1' : '优品AR+1'}}
              </view>
              <view class="item1_right_type_text2">
                {{result.quantity == 1 ? '单/件' : '双/件'}}
              </view>
            </view>

          </view>
        </view>
        <view class="top_wrap_item2">
          <view class="wrap_item2_left">
            <view class="item2_left_order">【{{current.expectCurr}}】</view>
            <view class="item2_left_orderTxt">订单匹配截至</view>
          </view>
          <view class="wrap_item2_right">
            <view class="hour time">{{hourString}}</view>
            <view class="division">:</view>
            <view class="minute time">{{minuteString}}</view>
            <view class="division">:</view>
            <view class="second time">{{secondString}}</view>
          </view>
        </view>
      </view>
      <!-- end top_wrap -->
      <!-- start list_cont -->
      <view class="list_cont">
        <view class="list_cont_title">
          <view class="cont_title_item" v-for="(item, index) of typeList" :key="index" :class="{active: arrLeng.includes(index)}" @tap="titleFun(index, item, item.name)">{{item.name}}</view>
        </view>
        <view class="list_cont_box">
          <view class="cont_box_item" :class="{activeItem: index == item.value }" v-for="(item, index) in brandImg" :key="index" @tap="brandImgFun(item, index)"><image :src="item.img" mode=""></image></view>
        </view>
      </view>
      <!-- end list_cont -->
      <view class="seizeSeat" :style="{height: heights,width: '100%'}"></view>
      <!-- start footer -->
      <view class="footer">
        <!--
                <view class="footer_top" v-if="arrLeng.length > 0">
                    <view class="footer_top_title">
                        <view class="f_top_title_l">
                            当前余额：
                            <text class="balance">{{allMoney}}</text>
                        </view>
                        <view class="f_top_title_r" @tap="cleanUp">清空</view>
                    </view>
                    <view class="footer_top_cont">
                        <view class="f_top_cont_L">
                            <text class="reduce" @tap="reduceFun()">-</text>
              <input type="number" @input="inputFun" class="numbers" :value="multiple" />
                            <text class="plus" @tap="plusAdd()">+</text>
                        </view>
                        <view class="f_top_cont_R">
              <picker mode="selector" :value="selcIndex" :range="options" range-key="value" @change="bindPickerChange" class="picker_wrap">
                  <view class="picker">
                      <text>{{moneyName}}</text>
                  </view>
              </picker>
                        </view>
                    </view>
                </view> -->
        <view class="footer_bottom">
          <!--
                  <view class="footer_bottom_left">
                      共{{arrLeng.length}}件:合计<text class="b_money">￥{{total.toFixed(2)}}元</text>
                  </view> -->
          <view class="footer_bottom_left">
            金额：<input type="number" v-model="total" @input="IntInput" />
          </view>
          <view class="footer_bottom_right" v-if="isShow">订单匹配中</view>
          <view class="footer_bottom_right" v-if="!isShow" @tap="SubmitOrder()">提交订单</view>
          <view class="footer_bottom_right footer_bottom_right2" v-if="!isShow" @tap="cleanUp()">清空订单</view>

        </view>
      </view>
    </view>
  </view>
</template>

<script>
var setIn;
var setInTer;
export default {
  name:"businessList",
  data() {
    return {
      heights: '80rpx',
      banraName: '', // 头部选择品牌名称
      branCode: '', // 品牌code
      brandList: [], // 商家列表
      allMoney: '', // 余额
      result: { // 上期开奖结果
        expect: '',
        openCode: '',
        quantity: '', // 1 双 0单
        size: '', // 1大 0 小
      },
      current:{ // 当前期数
        expectLast: '',
        expectCurr: '',
        timeOpen: 0
      },
      prevExpectLast:'',//时间
      multiple: 1, // 倍数
      selcIndex: 0, // 选择器的下标
      selcMoney: '2', // 选择金额 -钱
      moneyName: '2元', //
      getMoneyFlag:false,
      total: 0, // 合计
      amount: 0, // 数量
      imgIndex: "-1", // 当前选中的品牌
      // typeList: ["优品Ar+1","统货Ct+1","单/件","双/件"],
      typeList: [
        {
          name: '优品Ar+1',
          field: 'size',//大小类型
          value: 1 //值为大
        },
        {
          name: '统货Ct+1',
          field: 'size',//大小类型
          value: 0 //值为大
        },
        {
          name: '单/件',
          field: 'quantity',// 单双类型
          value: 1 //值为单
        },
        {
          name: '双/件',
          field: 'quantity',// 单双类型
          value: 0 //值为双
        }
      ],
      arrLeng : [],
      // isShow: false, // 是否匹配订单中
      timeExpect: 0,
      timeInterval: 0,
      remainTime: 0, //倒计时总秒数  倒计时 > timeExpect - timeInterval 不能点击
      hour: '', // 时
      minute: '', // 分
      second: '', // 秒
      promiseTimer: '', // 时间
      moneyTimer:null,
      isShowNewList:false, // 二级菜单
      options: [], // 产品金额列表
      // 品牌
      brandImg: [
        {img: require("@/static/images/brand/pp_lining_1.png"),value:-1,title:"李宁"},
        {img: require("@/static/images/brand/pp_361_2.png"),value:-1,title:"361"},
        {img: require("@/static/images/brand/pp_erke_3.png"),value:-1,title:"鸿星尔克"},
        {img: require("@/static/images/brand/pp_tb_4.png"),value:-1,title:"特步"},
        {img: require("@/static/images/brand/pp_bql_5.png"),value:-1,title:"百雀羚"},
        {img: require("@/static/images/brand/pp_ynf_6.png"),value:-1,title:"御泥坊"},
        {img: require("@/static/images/brand/pp_wnn_7.png"),value:-1,title:"薇婼娜"},
        {img: require("@/static/images/brand/pp_xybc_8.png"),value:-1,title:"相宜本草"},
        {img: require("@/static/images/brand/pp_hw_9.png"),value:-1,title:"华为"},
        {img: require("@/static/images/brand/pp_zx_10.png"),value:-1,title:"中兴"},
        {img: require("@/static/images/brand/pp_xm_11.png"),value:-1,title:"小米"},
        {img: require("@/static/images/brand/pp_vv_12.png"),value:-1,title:"vivo"},
        {img: require("@/static/images/brand/pp_gmdq_13.png"),value:-1,title:"国美"},
        {img: require("@/static/images/brand/pp_sndq_14.png"),value:-1,title:"苏宁"},
        {img: require("@/static/images/brand/pp_md_15.png"),value:-1,title:"美的"},
        {img: require("@/static/images/brand/pp_gl_16.png"),value:-1,title:"格力"},
      ],
      // 提交的数据
      objData: {
        expect: '', //当前产品期号
        name: '', // k3dw ,//产品名称
        moneyTypeId: '6', //金额 id
        number: 2, // 倍数
        money: 0, //总金额
        code: [],
        product : []
      },
      openCodeTimer:null,
      product1 : []
    }
  },
  // 页面加载
  onLoad(options) {
    // this.remainTime = 300 // 总秒数
    console.log(options, 'options')
    this.banraName = options.title;
    this.branCode = options.name
    this.objData.name = options.name
    this.timeExpect = options.timeEx
    this.timeInterval = options.timeIn
    this.brandList = uni.getStorageSync('brandList');
    this.initData() // 初始化
    this.getMoneyList() //产品金额列表
  },
  // 挂载完成
  onShow() {

  },
  created() {
    //this.arrLeng.push(this.typeList[0]);
    setIn = setInterval(()=>{
      this.getOpenTimeData() // 当前期数
    },5000)
  },
  methods: {
    IntInput(e){
      e.target.value = e.target.value.replace(/^0|[^\d]|[.]/g, '')
      console.log(e.target.value)
      this.total = e.target.value.replace(/^0|[^\d]|[.]/g, '')
    },
    // 初始化
    initData(){
      this.getOpenTimeData() // 当前期数
      // this.getCurrentUser() // 用户信息
    },

    // 返回
    navigateBack() {
      clearInterval(setIn);
      clearInterval(this.moneyTimer)
      uni.switchTab({
        url:"/pages/home/index"
      })
    },

    // 显示隐藏二级菜单
    isShowNewListFun(){
      if(this.isShowNewList == false){
        this.isShowNewList = true
      }else{
        this.isShowNewList = false
      }
    },
    // 获取当前期号
    getOpenTimeData(){
      this.$tools.Post("dock/product/product/getOpenTime",{name: this.branCode}).then((res) =>{
        uni.hideLoading()
        if(res.errCode == 0){
          this.current = res.data;
          this.remainTime = res.data.timeOpen
          this.objData.expect = res.data.expectCurr //当前期号 --提交时用到
          if (this.remainTime > 0) {
            this.hour = Math.floor((this.remainTime / 3600) % 24)
            this.minute = Math.floor((this.remainTime / 60) % 60)
            this.second = Math.floor(this.remainTime % 60)
            this.countDowm()
          }
          //获取上期结果
          this.prevExpectLast=res.data.expectLast;
          this.getOpenCodeData(res.data.expectLast)
        } else {
          uni.showToast({
            title: res.errMsg,
            duration: 1500,
            icon:'none'
          });
        }
      })
    },

    // 产品结果
    getOpenCodeData(expect) {
      uni.hideLoading()
      if(this.openCodeTimer){
        clearTimeout(this.openCodeTimer);
      }
      this.$tools.Post("dock/product/product/getOpenCode",{name: this.branCode, expect: expect}).then((res) =>{
        if(res.errCode == 0 ){
          if(res.data.openCode==''){
            this.openCodeTimer=setTimeout(()=>{
              this.getOpenCodeData(this.prevExpectLast)
            },2000)
          }else{
            this.result = res.data;
          }
        } else{
          uni.showToast({
            title: res.errMsg,
            duration: 1500,
            icon:'none'
          });
        }
      })
    },
    // 产品金额列表
    getMoneyList(){
      uni.hideLoading()
      this.$tools.Post("dock/product/product/moneyList").then((res) =>{
        if(res.errCode == 0){
          this.options = res.dataSet;
          this.changeSelect() // 触发选择金额
        } else {
          uni.showToast({
            title: res.errMsg,
            duration: 1500,
            icon:'none'
          });
        }
      })
    },

    bindPickerChange(e){
      console.log(e.detail,'88')
      this.selcIndex = e.detail.value;
      this.selcMoney = this.options[this.selcIndex].money;
      this.moneyName = this.options[this.selcIndex].value;

      // money
      let _this = this
      let obj = this.options.filter(function (val, index, arry){
        if(val.money == _this.selcMoney){
          return val
        }
      })
      console.log(obj,'id')
      this.objData.moneyTypeId = obj[0].id
    },
    // 选择金额
    changeSelect(){
      // money
      let _this = this
      let obj = this.options.filter(function (val, index, arry){
        if(val.money == _this.selcMoney){
          return val
        }
      })
      this.objData.moneyTypeId = obj[0].id
    },

    // 用户信息
    getCurrentUser(){
      if(this.moneyTimer){
        clearInterval(this.moneyTimer)
      }
      this.moneyTimer=setInterval(()=>{
        if(!this.getMoneyFlag){
          this.getMoneyFlag=true
          this.$tools.Post("dock/member/member/currentUser").then((res) =>{
            uni.hideLoading()
            this.getMoneyFlag=false
            if(res.errCode == 0){
              this.allMoney = res.data.money;
            } else {
              uni.showToast({
                title: res.errMsg,
                duration: 1500,
                icon:'none'
              });
            }
          })
        }
      },2000)

    },

    // tab 选择 大， 小  单  双
    titleFun(index, row, name){
      if(this.arrLeng.includes(index)){
        //includes()方法判断是否包含某一元素,返回true或false表示是否包含元素，对NaN一样有效
        //filter()方法用于把Array的某些元素过滤掉，filter()把传入的函数依次作用于每个元素，然后根据返回值是true还是false决定保留还是丢弃该元素：生成新的数组
        this.arrLeng = this.arrLeng.filter(function (ele){return ele != index;});
        this.objData.code = this.objData.code.filter(function (ele){return ele.name != name;});
      }else{
        this.arrLeng.push(index);
        this.objData.code.push(row)
      }
      if(this.arrLeng.length >=1){
        this.heights = "320rpx"
      }else{
        this.heights = "110rpx"
      }
    },

    // 选择品牌
    selectBran(row) {
      this.banraName = row.title
      this.branCode = row.name
      this.objData.name = row.name // 下单时用到
      this.timeExpect = row.timeExpect
      this.timeInterval = row.timeInterval
      this.isShowNewList = false
      this.initData() // 初始化
    },

    // 减减
    reduceFun(){
      if(this.multiple <=1){
        return false
      } else{
        this.multiple --
      }
    },

    // 选择品牌
    brandImgFun(item,index){
      let num = 0;
      for(let i=0;i<this.brandImg.length;i++){
        if(this.brandImg[i].value != -1){
          num+=1;
        }
      }
      if(item.value == index ){
        item.value = -1
      }else{
        if(num == 2){
          return
        }
        item.value = index
      }
      this.product1 = []
      for(let i=0;i<this.brandImg.length;i++){
        if(this.brandImg[i].value != -1){
          this.product1.push(this.brandImg[i].title)
        }
      }
      //this.imgIndex = index
    },

    // 清空
    cleanUp(){
      this.arrLeng = []
      this.objData.code = []
      this.heights = "110rpx"
      this.multiple = 1 // 倍数
      this.selcMoney = '2' //钱
      this.total = 0 // 合计
      this.changeSelect()
    },
    //
    inputFun(e) {
      console.log(e)
      this.multiple = e.target.value.replace(/\D/g, '').replace(/^0{1,}/g, '');
      // if(e.target.value.length==1){
      // 	this.multiple = e.target.value.replace(/[^1-9]/g,'')
      // }else{
      // 	this.multiple = e.target.value.replace(/\D/g,'')
      // }
    },
    // 加加
    plusAdd(){
      this.multiple ++
    },
    // 提交订单
    SubmitOrder(){
      let _this = this
      if(_this.objData.code.length <= 0) {
        uni.showToast({
          title: "请选择注数",
          duration: 1500,
          icon:'none'
        });
        return false
      }
      if(_this.multiple == ''){
        uni.showToast({
          title: "请输入倍数",
          duration: 1500,
          icon:'none'
        });
        return false
      }
      if(_this.product1.length == 0) {
        uni.showToast({
          title: "请选择商品",
          duration: 1500,
          icon:'none'
        });
        return false
      }
      _this.objData.number = _this.multiple; // 倍数
      _this.objData.money = _this.total // 合计
      _this.objData.product = _this.product1 //
      uni.showLoading()
      _this.SubmitOrderFun()
      //          uni.showModal({
      //              title: '',
      //              content: '确认下单',
      //              success: function (res) {
      //                  if (res.confirm) {
      // uni.showLoading()
      //                      console.log('用户点击确定');
      //                      _this.SubmitOrderFun()
      //                  } else if (res.cancel) {
      //                      console.log('用户点击取消');
      //                  }
      //              }
      //          });
    },
    // 最终提交订单
    SubmitOrderFun(){
      this.$tools.Post("dock/product/product/buy",this.objData).then((res) =>{
        if(res.errCode == 0){
          uni.hideLoading()
          this.initData()
          uni.showToast({
            title: "下单成功！",
            duration: 1500,
            icon:'none'
          });
          // this.getCurrentUser()
        } else {
          uni.showToast({
            title: res.errMsg,
            duration: 1500,
            icon:'none'
          });
        }
      })
    },

    //倒计时
    countDowm () {
      let self = this
      clearInterval(this.promiseTimer)
      this.promiseTimer = setInterval(function () {
        if (self.hour === 0) {
          if (self.minute !== 0 && self.second === 0) {
            self.second = 59
            self.minute -= 1
          } else if (self.minute === 0 && self.second === 0) {
            self.second = 0
            clearInterval(self.promiseTimer)
          } else {
            self.second -= 1
          }
        } else {
          if (self.minute !== 0 && self.second === 0) {
            self.second = 59
            self.minute -= 1
          } else if (self.minute === 0 && self.second === 0) {
            self.hour -= 1
            self.minute = 59
            self.second = 59
          } else {
            self.second -= 1
          }
        }
        self.remainTime-=1
        if(Number(self.remainTime) < 30){
          this.isShow = true
        } else{
          this.isShow = false
        }
        if(Number(self.remainTime) < 2){
          self.initData()
        }
        if(Number(self.remainTime) ==0){
          uni.showLoading()
        }
      }, 1000)
    },
    // 时间转换
    formatNum (num) {
      return num < 10 ? '0' + num : '' + num
    }
  },
  // 计算
  computed: {
    hourString () {
      return this.formatNum(this.hour)
    },
    minuteString () {
      return this.formatNum(this.minute)
    },
    secondString () {
      return this.formatNum(this.second)
    },
    isShow () {
      return Number(this.remainTime) < 30 ? true : false
    }
  },
  destroyed(){
    clearInterval(this.promiseTimer)
  },
  onUnload(){
    clearInterval(this.promiseTimer)
  },
  // 监听
  watch:{
    selcMoney: {
      handler (newName, oldName) {
        this.total = this.multiple * newName * this.arrLeng.length
      },
      // immediate: true
    },
    // 倍数
    multiple: {
      handler (newName, oldName) {
        this.total = this.selcMoney * newName * this.arrLeng.length
      },
      // immediate: true
    },
    // 件数
    arrLeng: {
      handler (newName, oldName) {
        this.total = this.selcMoney * this.multiple * newName.length
      },
      // immediate: true
    },
  }
}
</script>

<style scoped lang="less">
@import url('../../static/css/mian.css');
.contentWrap{
  position: relative;
  z-index: 1;
}
.business_listWrap{
  background: #F5F5F5;
  /* start pageHead */
  .pageHead{
    box-shadow: 0 0 20rpx 0px rgba(0, 0, 0, 0.1);
    border-bottom: 1rpx solid #eee;
    position: relative;
    z-index: 2;
    .header-wrap {
      width: 100%;
      position: fixed;
      top: 0;
      z-index: 999;
      .indexHeader{
        height: 88rpx;
        line-height: 88rpx;
        // padding: 0 20rpx;
        /* #ifdef APP-PLUS */
        padding-top: 80rpx;
        /* #endif */
        background-color: #FFFFFF;
        font-size: 28rpx;
        color: #1A1A1A;
        // display: flex;
        // align-items: center;
        // justify-content: space-between;
        .index-header {
          font-size: 32rpx;
          display: flex;
          padding: 0 20rpx;
          align-items: center;
          background-color: #FFFFFF;
          justify-content: space-between;
          position: relative;
          .headerLeftMenu{
            background: #FFFFFF;
            border-radius: 100%;
            height: 60rpx;
            width: 60rpx;
            display: flex;
            .backIcon{
              height: 60rpx;
              width: 60rpx;
              border-radius: 50%;
              background: url('../../static/images/fanh.png') no-repeat center center;
              background-size: 36rpx 36rpx;
            }
          }
          .header-title-wrap {
            flex: 1;
            height: 60rpx;
            line-height: 60rpx;
            color: #FFFFFF;
            position: absolute;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
            .detail_anchor_wrap{
              line-height: 60rpx;
              height: 60rpx;
              font-weight: bold;
              text-align: center;
              .title_text_box{
                display: inline-block;
                border:3rpx solid #E3E3E3;
                border-radius: 8rpx;
                padding:0 40upx 0 10upx;
                position: relative;
              }
              .title_text_box::after{
                content:"";
                position: absolute;
                top:65%;
                transform: translateY(-65%);
                right: 10rpx;
                border:12rpx solid transparent;
                border-top-color: #F7A206;
              }
              text{
                flex: 1;
                text-align: center;
                color: #1A1A1A;
                font-size: 32rpx;
              }
            }
          }
          .headerRightMenu{
            height: 88rpx;
            min-width: 60rpx;
            line-height: 88rpx;
            display: flex;
            position: relative;
            .menu{
              height: 88rpx;
              min-width: 60rpx;
              line-height: 88rpx;
              font-weight: bold;
              color: #E6241A;
              padding-right: 30rpx;
              background-size: 18rpx 10rpx;
              position: relative;
            }
            .menu::after{
              content:"";
              position: absolute;
              top: 60%;
              right: 0;
              transform: translateY(-60%);
              border: 12rpx solid transparent;
              border-top-color:#F7A206;
            }
            .H-newlist{
              position: absolute;
              top: 86rpx;
              width: 300rpx;
              text-align: center;
              background: #999;
              overflow: inherit;
              right: 5rpx;
              border-radius: 10rpx;
              padding-bottom: 5rpx;
              opacity: 0;
              display: none;
              &.active{
                position: absolute;
                opacity: 1;
                z-index: 999;
                display: block;
              }
              .HnewlistWrap{
                position: relative;
                z-index: 5;
                zoom: 1;
                display: flex;
                flex-wrap: wrap;
                .listItem{
                  font-size: 24rpx;
                  width: 150rpx;
                  // border-bottom: 1rpx #DDEEDD solid;
                  border-right: 1rpx #DDEEDD solid;
                  color: #FFFFFF;
                  padding-left: 15rpx;
                  line-height: 70rpx;
                  text-align: center;
                  text{
                    text-align: center;
                  }
                  &:last-child{
                    border-bottom: none;
                  }
                  &:nth-child(2n){
                    border-right: none;
                  }
                  image{
                    width: 40rpx;
                    height: 40rpx;
                    margin-right: 10rpx;
                    margin-top: 10rpx;
                  }
                }
              }
              .HnewlistWrap:before{
                content: "";
                width: 0;
                height: 0;
                border-left: 7px transparent solid;
                border-right: 7px transparent solid;
                border-bottom: 7px #999 solid;
                border-top: none;
                position: absolute;
                z-index: 1;
                zoom: 1;
                right: 8px;
                top: -7px;
              }
            }
          }
        }
      }
    }
    .height128{
      height: 88rpx;
      /* #ifdef APP-PLUS */
      height: 128rpx;
      /* #endif */
      width: 100%;
    }
  }


  .top_wrap{
    padding: 18rpx 31rpx;
    /* #ifdef APP-PLUS */
    padding-top: 50rpx;
    /* #endif */
    background: #FFFFFF;
    border-bottom: 1rpx solid #e5e5e5;
    box-shadow: 0 0 20rpx 0px rgba(0, 0, 0, 0.1);
    margin-bottom: 20rpx;
    .top_wrap_item1{
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;
      .top_wrap_item1_left{
        width: 330rpx;
        background: url(../../static/images/sekuai.png) no-repeat center center;
        background-size: 100% 100%;
        color:#fff;
        margin-right: 36rpx;
        padding:10rpx 32rpx 10rpx 20rpx;
        text-align: lect;
        .order_number{
          font-size: 32rpx;
          font-weight: bold;
          margin-left: -14rpx;
        }
        .order_result{
          font-size: 28rpx;
          font-weight: bold;
        }
      }
      .top_wrap_item1_right{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item1_right_type{
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .item1_right_type_text1{
            background: #FFE1AD;
            border-radius: 6rpx;
            font-size: 32rpx;
            color: #DF6900;
            margin-right: 15rpx;
            flex:1;
            height: 90rpx;
            line-height: 90rpx;
            text-align: center;
          }
          .item1_right_type_text2{
            background: #ADDFFF;
            border-radius: 6rpx;
            font-size: 32rpx;
            color: #0081D4;
            flex:1;
            height: 90rpx;
            line-height: 90rpx;
            text-align: center;
          }
        }
        .Matching{
          font-size: 40rpx;
          text-align: center;
          font-weight: bold;
        }
      }
    }
    .top_wrap_item2{
      display: flex;
      align-items: center;
      .wrap_item2_left{
        width: 330rpx;
        text-align: center;
        color: #000000;
        margin-right: 36rpx;
        padding:0 32rpx 0 20rpx;
        text-align: left;
        .item2_left_order{
          font-size: 32rpx;
          font-weight: bold;
          margin-left: -14rpx;
        }
        .item2_left_orderTxt{
          font-size: 28rpx;
          font-weight: bold;
        }
      }
      .wrap_item2_right{
        flex: 1;
        display: flex;
        align-items: center;
        font-weight: 400;
        justify-content: space-between;
        .time{
          width: 100rpx;
          height: 80rpx;
          background: #E0E0E0;
          border: 1rpx solid #999999;
          border-radius: 6rpx;
          font-weight: 500;
          line-height: 80rpx;
          color: #444;
          text-align: center;
          font-size: 60rpx;
        }
        .division{
          font-size: 60rpx;
          height: 80rpx;
          text-align: center;
          line-height: 60rpx;
        }
      }
    }
  }

  .list_cont{
    background: #F5F5F5;
    .list_cont_title{
      padding: 0 30rpx 20rpx;
      display: flex;
      align-items: center;
      .cont_title_item{
        flex:1;
        height: 80rpx;
        line-height: 80rpx;
        margin-right: 10rpx;
        border-radius: 40rpx;
        font-size: 28rpx;
        background: #E0E0E0;
        color: #999999;
        text-align: center;
        &:last-child{
          margin-right: 0rpx;
        }
        &.active{
          background: #E6241A;
          color: #FFFFFF;
        }
      }
    }
    .list_cont_box{
      padding: 0 30rpx;
      display: flex;
      flex-wrap: wrap;
      .cont_box_item{
        width: calc(25% - 8rpx);
        height: 165rpx;
        background: #FFFFFF;
        margin-right: 10rpx;
        margin-bottom: 20rpx;
        border: 2px solid #E0E0E0;
        border-radius: 10rpx;
        overflow: hidden;
        image{
          width: 100%;
          height: 100%;
          border-radius: 10rpx;
        }
        &.activeItem{
          border: 2px solid #E6241A !important;
        }
        &:nth-child(4n){
          margin-right: 0rpx;
        }
      }
    }
  }

  .footer{
    position: fixed;
    z-index: 998;
    left: var(--window-left);
    right: var(--window-right);
    bottom: 0;
    box-sizing: border-box;
    overflow: hidden;
    .footer_top{
      padding: 30rpx;
      background: #FFFFFF;
      .footer_top_title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .f_top_title_l{
          color: #999999;
          font-weight: bold;
          font-size: 26rpx;
          .balance{
            color: #2A79DA;
          }
        }
        .f_top_title_r{
          color: #333333;
          font-size: 28rpx;
          font-weight: bold;
        }
      }
      .footer_top_cont{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 28rpx;
        .f_top_cont_L{
          width: 204rpx;
          height: 60rpx;
          display: flex;
          align-items: center;
          border-radius: 8rpx;
          .reduce{
            width: 60rpx;
            height: 60rpx;
            text-align: center;
            line-height: 50rpx;
            color: #999999;
            font-size: 40rpx;
            background: #E0E0E0;
            border-radius: 8px 0px 0px 8px;
          }
          .numbers{
            flex: 1;
            height: 56rpx;
            line-height: 56rpx;
            font-size: 32rpx;
            text-align: center;
            background: #FFFFFF;
            border: 1px solid #E0E0E0;
          }
          .plus{
            width: 60rpx;
            height: 60rpx;
            text-align: center;
            font-size: 40rpx;
            color: #FFFFFF;
            line-height: 50rpx;
            background: #E6241A;
            border-radius: 0px 8px 8px 0px;
          }
        }
        .f_top_cont_R{
          width: 154rpx;
          height: 62rpx;
          display: flex;
          background: #E6241A;
          align-items: center;
          background: #FFFFFF;
          border: 1px solid #E6241A;
          border-radius: 6rpx;

          .picker_wrap{
            display: flex;
            align-items: center;
            .picker{
              display: flex;
              background: url(../../static/images/select_bg.png) no-repeat center center;
              background-size: 150rpx 58rpx;
              overflow: hidden;
              border-radius: 6rpx;
              width: 150rpx;
              height: 58rpx;
              align-items: center;
              .time{
                width: 32rpx;
                height: 32rpx;
                margin-top: 2px;
              }
              text{
                font-size: 28rpx;
                font-weight: 500;
                color: #FFFFFF;
                padding: 0 17rpx;
              }
              .select{
                width: 22rpx;
                height: 10rpx;
                margin-top: 1px;
              }
            }
          }
        }
      }
    }
    .footer_bottom{
      background: #FFFFFF;
      border-top: 1rpx solid #E0E0E0;
      display: flex;
      align-items: center;
      padding: 10rpx 28rpx;
      .footer_bottom_left{
        flex: 1;
        color: #333333;
        font-size: 24rpx;
        display: flex;
        align-items: center;
        input{
          width: 160upx;
          border-bottom: 2px solid #c90a00;
        }
        .b_money{
          color: #E6241A;
          font-size: 30rpx;
          font-weight: 500;
        }
      }
      .footer_bottom_right{
        padding: 28rpx;
        background: #E6241A;
        font-size: 32rpx;
        text-align: center;
        color: #FFFFFF;
        border-radius: 44px;
      }
      .footer_bottom_right2{
        background: #2979ff;
        margin-left: 12px;
      }
    }
  }
}
</style>
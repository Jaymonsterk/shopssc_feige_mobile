<template>
	<view class="main">
       <view class="item" @click="selectLang('zh-CN')">
          chinese
       </view>
       <view class="item" @click="selectLang('en-US')">
          English
       </view>
       <view class="item" @click="selectLang('vi-VN')">
          Tiếng Việt
       </view>
       <view class="item" @click="selectLang('id-ID')">
          Indonesia
       </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
         goType:''
      }
    },
    onLoad(option){
       console.log(option)
       if(option.type){
          this.goType = option.type
       }
    },
	computed: {
	    i18n () {
	       return this.$t("login")
	    }
	},
	onShow() {
		
	},
	onReady() {
		uni.setNavigationBarTitle({
			title:this.i18n.lang
		})
	},
    methods:{
        selectLang(lang){
            console.log(lang)
            uni.setStorageSync('lang',lang)
            this._i18n.locale = lang
            if(this.goType == 'mine'){
              uni.redirectTo({
              	 url:'/pages/mine/mine'
              })
              console.log('mine')
            }else{
              uni.navigateBack({
                delta:1
              })
              console.log('login')
            }

        }
    }
  }
</script>

<style scoped lang="less">
.main{
  padding:20rpx 30rpx;
  background: #fff;
  height: 100%;
  min-height: 100vh;
}
   .item{
      height: 90rpx;
      line-height: 90rpx;
      text-align: left;
      border-bottom: 1px solid #ddd;
      font-size: 16px;
      color: #000;
   }
</style>

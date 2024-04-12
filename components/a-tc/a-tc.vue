<template>
	<!-- end 收益专栏 -->
	<view class="message-layer" v-if="notice">
		<view class="content-box">
			<view class="bg-image">
				<image src="../../static/images/tcbjt.png" mode="widthFix"></image>
				<view class="box">
					<!-- 轮播图 -->
					<view class="uni-padding-wrap1">
					    <view class="page-section swiper">
					        <view class="page-section-spacing">
					            <swiper class="swiper" :indicator-dots="indicatorDots" :circular="true" :autoplay="autoplay" :interval="interval" :duration="duration" indicator-color="rgba(0, 0, 0, .3)" indicator-active-color="#DA3A3F">
					                <swiper-item v-for="(item, index) in dataArr" :key="index">
										<view>{{item.title}}</view>
										<view class="content">{{zhuanLang(item.content)}}</view>
					                </swiper-item>
					            </swiper>
					        </view>
					    </view>
					</view>
					<!--
					<view class="title">1</view>
					<view class="content">
						2
					</view> -->
					<view class="btns">
						<view class="look" @click="goHomeDetail">{{i18n.redead}}</view>
						<!-- <navigator class="look" click="goHomeDetail">查看</navigator> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorDots: true, //是否显示面板指示点
				autoplay: false, //是否自动切换
				interval: 2000, //自动切换时间间隔
				duration: 500, // 滑动时长
				notice : false,
				dataArr : [],
				imgList:[],
				setIn : '',
				messageList:[],
				timer:null
			}
		},
		mounted() {
			let routes = getCurrentPages() //获取当前页面栈
			let curRoute = routes[routes.length - 1].route //获取当前页面的路由
			// console.log(uni.getStorageSync('url_'))
			// console.log(curRoute)
			
			uni.setStorageSync('url_', curRoute);
			// console.log(uni.getStorageSync('url_'))
			this.getMessage()
			let msg = uni.getStorageSync('message1');
			this.dataArr = msg
		    this.fdawefd();
		},
		destroyed() {
			console.log('destroyed')
			clearInterval(this.timer)
			this.timer = null
		},
		onUnload() {
			console.log('onUnload')
			clearInterval(this.timer)
			this.timer = null
		},
		computed: {
		    i18n () {
		       return this.$t("contentText")
		    },
		},
		methods: {
			getMessage(){
				this.$tools.Post("dock/member/member/currentUser").then((res) =>{
					if(res.errCode == 0){
						if(res.data.message.length == 0){
							this.notice = false;
						}else{
							this.messageList = res.data.message
							//初始化
						}
					}	
				})
			},
			goHomeDetail(){
				this.notice = false;
				this.$tools.Post("dock/member/member/setMessageAffirm").then((res) =>{
					uni.removeStorageSync('message1')
					this.notice = false
					this.messageList=[]
					this.getMessage()
				})
			},
			fdawefd(){
				    if(this.timer == null){
						this.timer = setInterval(()=>{
						    let msg = uni.getStorageSync('message1');
							this.dataArr = msg
							console.log(this.messageList.length)
							console.log(msg.length)
							if(this.messageList.length == msg.length){
								this.notice = false
							}else{
								this.notice = true
							}
						 },3000)
					}
				   
			},
			zhuanLang(msg){
				let langText = msg.subString(0,6)
				let shengText = msg.subString(6)
				if(langText == '系统转出金额'){
					let noLang = this.i18n.xtZhuan
					return noLang+shengText
				}else{
					return msg
				}
				
			}
		},
	}
</script>

<style scoped lang="less">
	.message-layer{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 9989;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			background-color: rgba(0,0,0,0.6);
			.content-box{
				width: 608rpx;
				position: relative;
				image{
					width: 100%;
				}
				.content{
					text-align: left;
					padding:30rpx 30rpx 0;
					height:250rpx;
					overflow-y: auto;
				}
				.box{
					position: absolute;
					top: 330rpx;
					left:50%;
					transform: translateX(-50%);
					width: 100%;
					text-align: center;
					.title{
						color:#E72A31;
						font-weight:bold;
					}
					.btns{
						display: flex;
						padding:40rpx 50rpx 0;
						view,navigator{
							flex:1;
							height: 80rpx;
							line-height: 80rpx;
							border-radius: 200rem;
							border:2rpx solid #E0E0E0;
						}
						.look{
							margin-left: 33rpx;
							border-color:#DA3A3F;
							background-color:#DA3A3F;
							color:#fff;
							box-shadow: 0px 10px 10px 0px rgba(218, 58, 63, 0.25);
							
						}
					}
				}
				.close{
					text-align: center;
					padding-top: 20rpx;
					image{
						width: 60rpx;
						height: 60rpx;
					}
				}
			}
	}	
</style>

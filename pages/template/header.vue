<template>
	<view class="header-container">
		<view class="header-fixed" :style="'background-color:'+bgColor">
			<view class="header-left" v-if="backBtnType>0">
				<view class="back" v-if="backBtnType>0" @click="gotoBack">
					<image v-if="!bgColor" src="../../static/images/back.png"></image>
					<image v-else src="../../static/images/back_black.png"></image>
				</view>
			</view>
			<view class="title" v-if="title" :style="bgColor.indexOf('fff')!=-1?'color:#333':''">{{title}}</view>
			<view class="logo" v-else-if="logo"><image :src="logo"></image></view>
			<view class="header-right" v-if="isLiveChat" @click.stop="openLivechatLayer">
				<image src="../../static/images/kf.png" class="livechat-img"></image>
				<text class="text" v-if="isLiveChat" :style="bgColor?'color:#000':''">客服</text>
			</view>
			<a class="header-right" v-else-if="isDownload" target="_blank" :href="downloadUrl">
				<view class="text" v-if="isDownload">
					<image src="../../static/images/xz.png" class="download-img"></image>
					<text>APP</text>
				</view>
			</a>
			<view class="livechat-layer" v-if="openLiveChat">
				<a :href="item" target="_blank" class="item" v-for="(item,index) in liveChats" :key="index">客服{{index+1}}</a>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				showLiveChatLayer:this.$props.openLiveChat
			}
		},
		props:{
			title:{
				type:String,
				default:""
			},
			backBtnType:{
				type:String,
				default:"1",//0 不显示 1 返回上一级，2 返回首页
			},
			isLiveChat:{
				type:Boolean,
				default:false
			},
			logo:{
				type:String,
				default:""
			},
			isDownload:{
				type:Boolean,
				default:false
			},
			bgColor:{
				type:String,
				default:""
			},
			downloadUrl:{
				type:String,
				default:""
			},
			backUrl:{
				type:String,
				default:""
			},
			liveChats:{
				type:Array,
				default:()=>[]
			},
			openLiveChat:{
				type:Boolean,
				default:false,
			}
		},
		methods:{
			gotoBack(){
				if(this.backBtnType==1){
					if(this.$props.backUrl.indexOf('center/center')!=-1){
						uni.switchTab({
							url:"/pages/center/center"
						})
					}else{
						uni.navigateBack()
					}
				}else if(this.backBtnType==2){
					uni.switchTab({
						url:"/pages/index/index"
					})
				}
			},
			openLivechatLayer(){
				this.$emit('closeLivechatLayer',!this.$props.openLiveChat)
			}
			
		}
	}
</script>

<style lang="less" scoped>
	.header-container{
		height:90rpx;
		line-height: 90rpx;
		padding:var(--status-bar-height) 30rpx 0;
		position: relative;
		background-color:var(--red_bg);
		.back{
			padding-top: var(--status-bar-height);
			image{
				width: 38rpx;
				height: 38rpx;
				vertical-align: middle;
			}
		}
		.header-fixed{
			position: fixed;
			top: 0;
			padding-top: var(--status-bar-height);
			left: 0;
			width: 100%;
			height: calc(var(--status-bar-height) + 90rpx);
			z-index: 999;
			background-color:var(--red_bg);
		}
		.title{
			color:#fff;
			text-align: center;
			font-size: 32rpx;
		}
		.logo{
			text-align: center;
			position: relative;
			image{
				width: 218rpx;
				height: 58rpx;
				vertical-align: middle;
			}
		}
		.header-left,.header-right{
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
		}
		.header-left{
			left: 30rpx;
		}
		.header-right{
			width: 20%;
			color:#fff;
			right: 30rpx;
			text-align: right;
			.text{
				font-size: 32rpx;
			}
			.download-img{
				width: 26rpx;
				height: 26rpx;
				vertical-align: middle;
				margin-right: 10rpx;
			}
			.livechat-img{
				width: 31rpx;
				height: 32rpx;
				vertical-align: middle;
				margin-right: 10rpx;
			}
		}
		.header-right{
			display:block;
			padding-top:var(--status-bar-height)
		}
	}
	.livechat-layer{
		position: absolute;
		top: 90rpx;
		right: 30rpx;
		padding:0 30rpx;
		background-color:#fff;
		box-shadow: 0 0 10rpx 10rpx rgba(0,0,0,0.1);
		border-radius: 10rpx;
		.item{
			display: block;
			padding:24rpx 0;
			line-height: 1;
			color:#333;
		}
		.item:not(:first-child){
			border-top:2px solid #eee;
		}
	}
</style>

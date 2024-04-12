<template>
	<view>
		<view class="boty">
			<view class="xiank">
				<view class="tgh" @click="choose(1)">
					<image src="../../static/img/dbsy.png" v-show="num==1"></image>
					<image src="../../static/img/shouyh.png" v-show="num!=1"></image>
					<view class="webc">{{i18n.home}}</view>
				</view>
				<view class="tgh" @click="choose(2)">
					<image class="ert" src="../../static/img/dbdingdjb.png"  v-show="num==2"></image>
					<image class="ert" src="../../static/img/dbdingd.png"  v-show="num!=2"></image>
					<view class="webc">{{i18n.order}}</view>
				</view>
				<view class="tgh" @click="choose(3)">
					<image class="erts" src="../../static/img/hj.png"  v-show="num==3"></image>
					<image class="erts" src="../../static/img/hj.png"  v-show="num!=3"></image>
					<view class="webc">{{i18n.shop}}</view>
				</view>
				<view class="tgh" @click="choose(4)">
					<image class="ertd" src="../../static/img/dbhd.png" v-show="num!=4"></image>
					<image class="ertd" src="../../static/img/dbhdjb.png" v-show="num==4"></image>
					<view class="webc">{{i18n.active}}</view>
				</view>
				<view class="tgh" @click="choose(5)">
					<image class="ertf" src="../../static/img/dbwd.png" v-show="num!=5"></image>
					<image class="ertf" src="../../static/img/dbwdjb.png" v-show="num==5"></image>
					<view class="webc">{{i18n.mine}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:["num",],
		data() {
			return {
				
			}
		},
		computed: {
		    i18n () {
		       return this.$t("tabBar")
		    }
		},
		methods: {
			choose(e){
				if(e==1){
					uni.navigateTo({
						url: '/pages/home/index',
					});
				}else if(e==2){
					uni.navigateTo({
						url: '/pages/order/order',
					});
				}else if(e==3){
					uni.navigateTo({
						url: '/pages/business/business',
					});
				}else if(e==4){
					uni.navigateTo({
						url: '/pages/activity/activity',
					});
				}else if(e==5){
					uni.navigateTo({
						url: '/pages/mine/mine',
					});
				}
			}
		}
	}
</script>

<style  lang="less" scoped='scoped'>
.boty{
	position: fixed;
	bottom:0;
	left:0;
	width:100%;
	height: 120rpx;
	z-index: 22;
	background: url(../../static/dbbol.png)no-repeat center;
	background-size:cover;
	.xiank{
		width:100%;
		height:120rpx;
		display: flex;
		
		justify-content: space-between;
		border-top:1rpx solid transparent;
		.tgh{
			width:20%;
			height:80rpx;
			text-align: center;
			font-size:30rpx;
			image{
				width:55rpx;
				height:52rpx;
				margin-top:15rpx;
				&.ert{
					width:44rpx;
					height:54rpx;
					margin-top:13rpx;
				}
				&.erts{
					width:87rpx;
					height:87rpx;
					margin-top:-23rpx;
				}
				&.ertd{
					width:50rpx;
					height:52rpx;
				}
				&.ertf{
					width:43rpx;
					height:54rpx;
					margin-top:13rpx;
				}
			}
			.webc{
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #fff;
				
			}
		}
	}
}
</style>

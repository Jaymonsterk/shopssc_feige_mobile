<template>
	<view class="page">
		<view class="status-bar"></view>
		<Header :title="details.title" backBtnType="1"></Header>
		<view class="content">
			<image :src="details.img" mode="widthFix"></image>
			<rich-text :nodes="details.content">活动内容</rich-text>
		</view>
	</view>
</template>

<script>
	import Header from "../template/header.vue"
	export default {
		components:{
			Header
		},
		data() {
			return {
				details:{},
			}
		},
		onLoad(option) {
			this.getDetails(option.id);
		},
		methods: {
			getDetails(detailId){
				uni.showLoading()
				this.$api('/system/Activity/detail',{activityId:detailId},"post").then(res=>{
					this.details=res.data;
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	uni-page-body{
		height: 100%;
		background-color: #fff;
	}
	.page{
		height: 100%;
		background-color: #fff;
	}
	.content{
		padding: 20rpx;
		line-height: 1.8;
		background-color: #fff;
		image{
			width: 100%;
			margin-bottom: 30rpx;
		}
	}
</style>

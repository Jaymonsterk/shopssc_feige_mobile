<template>
	<view class="notice_warp">
		<view class="msg_warp">
			<view class="msg_title">{{msgInfo.title}}</view>
			<view class="msg_time">{{i18n.time}}：{{msgInfo.timeCreated | formatDate}}</view>
		</view>
		<view class="contents"> {{msgInfo.content}}</view>
	</view>
</template>

<script>
	export default {
		name: 'activityDetail',
		components: {},

		computed: {
		    i18n () {
		       return this.$t("activity")
		    }
		},

		data() {
			return {
				msgInfo: {
					
				}
			}
		},
		// 页面加载
		onLoad(options) {
			console.log(options, 'options')
            this.msgInfo = JSON.parse(decodeURIComponent(options.obj));
		},
		created() {
            
		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style lang="less">
page {
	width: 100%;
	height: 100%;
	overflow: hidden;

	.notice_warp {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		font-size: 28rpx;
		padding-top: 1rpx;

		.msg_warp {
			width: 100%;
			background: #FFFFFF;
			padding: 30rpx 0;
			text-align: center;
			margin: 0 auto;
			border-bottom: 2rpx solid rgba(116, 116, 128, 0.08);

			.msg_title {
				color: #323232;
				font-size: 32rpx;
				font-weight: 550;
				margin-bottom: 10rpx;
			}

			.msg_time {
				font-size: 24rpx;
				color: #8F8B7F;
			}
		}

		.contents {
			padding: 20rpx;
			color: #323232;
			line-height: 40rpx;
			font-size: 28rpx;
			text-indent: 25rpx
		}
	}
}
</style>

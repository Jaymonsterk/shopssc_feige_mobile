<template>
	<view class="notice_warp">
		<view class="msg_warp">
			<view class="msg_title">{{msgInfo.title}}</view>
			<!-- <view class="msg_time">发布时间：{{msgInfo.timeCreated | formatDate}}</view> -->
		</view>
		<view class="contents">
            <rich-text :nodes='msgInfo.content'></rich-text>
        </view>
	</view>
</template>

<script>
	export default {
		name: 'noticeDetail',
		components: {},
		data() {
			return {
				msgInfo: {
					
				},
				messId:''
			}
		},
		// 页面加载
		onLoad(options) {
			console.log(options.id)
			console.log(options.cid)
			if(options.id  != undefined){
				this.lookDetail(options.id)
			}else{
				this.getData(options.cid)
			}
			/*
			if(showDetail != undefined){
				this.messId= options.cid
				this.getData()
			}else{
			   this.msgInfo = JSON.parse(decodeURIComponent(options.obj));
			
			}*/
		},
		computed: {
		    i18n () {
		       return this.$t("notice")
		    }
		},
		onShow() {
		   
		},
		onReady() {
			uni.setNavigationBarTitle({
				title:this.i18n.detail
			})
		},
		created() {
            
		},
		mounted() {

		},
		methods: {
			// 查看活动详情
			getData(id) {
				let that = this
				let params = {
				    id: id
				}
				this.$tools.Post("dock/system/message/detail",params).then((res) =>{
						this.msgInfo = res.data			 
				})
				
			},
			// 查看公告详情
			lookDetail(id) {
				let that = this
				let params = {
				    id: id
				}
				this.$tools.Post("dock/system/activity/detail",params).then((res) =>{
						this.msgInfo = res.data			 
				})
				
			},
		}
	}
</script>

<style lang="less">
page {
	width: 100%;
	height: 100%;
	// overflow: hidden;

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

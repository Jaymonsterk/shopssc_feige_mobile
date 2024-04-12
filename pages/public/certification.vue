<template>
	<view class="container">
		<view class="list_wrap">
			<view>
				<text>姓名</text>
				<input type="text" placeholder="请输入真实姓名" confirm-type='done' placeholder-class="input-placeholder"/>
			</view>
			
			<view>
				<text>身份证号码</text>
				<input type="idcard" placeholder="请输入身份证号码" maxlength="18" placeholder-class="input-placeholder"/>
			</view>
			
			<view>
				<text>资金密码</text>
				<input type="text" placeholder="请输入资金密码" confirm-type='done' placeholder-class="input-placeholder"/>
			</view>
		</view>
		
		<view class="submit">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="less">
	page{
		background: #fff;
		font-family: PingFang SC;
		.container{
			padding: 10rpx 30rpx 0 30rpx;
			.list_wrap{
				view{
					height: 86rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1px solid #E6E6E6;
					text{
						width: 140rpx;
						text-align: right;
						font-size: 28rpx;
						color: #333333;
					}
					.input-placeholder{
						font-size: 28rpx;
						font-weight: 500;
						color: #CCCCCC;
					}
					input{
						flex:1;
						padding-left: 44rpx;
						height: 100%;
					}
						
				}
			}
			.submit{
				width: 600rpx;
				height: 80rpx;
				margin: 100rpx auto 0 auto;
				line-height: 80rpx;
				text-align: center;
				background: #E6241A;
				border-radius: 16rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #FFFFFF;
			}
			
		}
	}
</style>

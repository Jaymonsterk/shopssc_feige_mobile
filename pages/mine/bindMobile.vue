<template>
	<view class="container">
		<view class="list_wrap">
			<view>
				<text>{{i18n.phone}}</text>
				<input type="number" v-model="phoneInfo.phone" :placeholder="i18n.place_phone" maxlength="11" confirm-type='done' placeholder-class="input-placeholder"/>
			</view>
		</view>
		
		<view class="submit" @click="updateMobile">{{i18n.confim}}</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneInfo:{
					field:"phone",
					phone:""
				}
			}
		},
		onLoad(){
			let phone = uni.getStorageSync('phone');
			if(phone){
				this.phoneInfo.phone = phone
			}
		},
		computed: {
		    i18n () {
		       return this.$t("tel")
		    }
		},
		onShow(){
			
		},
		onReady(){
			uni.setNavigationBarTitle({
				title:this.i18n.bind
			})
		},
		methods: {
			updateMobile(){
				if(!this.phoneInfo.phone){
				    uni.showToast({
				        title: this.i18n.place_phone,
				        duration: 1500,
				        icon:'none'
				    });
				    return false
				}
				this.$tools.Post("dock/member/member/update",this.phoneInfo).then((res) =>{
				    if(res.errCode == 0){
						uni.setStorageSync('phone', this.phoneInfo.phone);
				        uni.showToast({
				            title: this.i18n.succ,
				            duration: 1000,
				            icon:'none'
				        });
						setTimeout(()=> {
							uni.navigateBack({
								delta: 1
							});
						}, 1000)
						
				    } else {
				        uni.showToast({
				            title: res.errMsg,
				            duration: 1500,
				            icon:'none'
				        });
				    }
				})
				
			}
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
				background: #F02539;
				border-radius: 16rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #FFFFFF;
			}
			
		}
	}
</style>

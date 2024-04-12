<template>
	<view class="container">
		<view class="list_wrap">
			<view>
				<text>{{i18n.old}}</text>
				<input type="text" password v-model="passwordInfo.password" :placeholder="i18n.place_old" confirm-type='done' placeholder-class="input-placeholder"/>
			</view>
			
			<view>
				<text>{{i18n.new}}</text>
				<input type="text" password v-model="passwordInfo.newPassword" :placeholder="i18n.place_new" confirm-type='done' placeholder-class="input-placeholder"/>
			</view>
			
			<view>
				<text>{{i18n.que}}</text>
				<input type="text" password v-model="passwordInfo.confirmWord" :placeholder="i18n.place_que" confirm-type='done' placeholder-class="input-placeholder"/>
			</view>
		</view>
		
		<view class="submit" @click="updatePassword">{{i18n.confim}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				passwordInfo:{
					field:"password",
					password:"",
					newPassword:"",
					confirmWord:""
					
				}
			}
		},
		computed: {
		    i18n () {
		       return this.$t("setpass")
		    }
		},
		onLoad(){
			
		},
		
		onShow(){
		  
		},
		onReady(){
			uni.setNavigationBarTitle({
			 	title:this.i18n.head_title
			})
		},
		methods: {
			updatePassword(){
				const {password,newPassword,confirmWord} = this.passwordInfo
				if(!password){
				    uni.showToast({
				        title: this.i18n.place_old,
				        duration: 1500,
				        icon:'none'
				    });
				    return false
				}
				if(!newPassword){
				    uni.showToast({
				        title: this.i18n.place_new,
				        duration: 1500,
				        icon:'none'
				    });
				    return false
				}
				if(!confirmWord){
				    uni.showToast({
				        title: this.i18n.place_que,
				        duration: 1500,
				        icon:'none'
				    });
				    return false
				}
				if(newPassword!==confirmWord){
					uni.showToast({
					    title: this.i18n.two,
					    duration: 1500,
					    icon:'none'
					});
					return false
				}
				
				this.$tools.Post("dock/member/member/update",this.passwordInfo).then((res) =>{
				    if(res.errCode == 0){
				        uni.showToast({
				            title: this.i18n.succ,
				            duration: 1000,
				            icon:'none',
							success(){
								setTimeout(()=> {
									uni.navigateTo({
									    url: '/pages/public/login'
									});
								}, 1000)
							}
				        });
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

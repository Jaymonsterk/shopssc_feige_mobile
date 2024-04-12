<template>
	<view class="container">
		<view class="list_wrap">
			<view>
				<text>姓名</text>
				<input type="text" v-model="addressInfo.name" placeholder="请输入姓名" confirm-type='done' placeholder-class="input-placeholder"/>
			</view>
			
			<view>
				<text>手机</text>
				<input type="number" v-model="addressInfo.phone" placeholder="请输入手机号码" maxlength="11" placeholder-class="input-placeholder"/>
			</view>
			
			<view>
				<text>地址</text>
				<input type="text" v-model="addressInfo.address" placeholder="请输入详细地址" confirm-type='done' placeholder-class="input-placeholder"/>
			</view>
		</view>
		
		<view class="submit" @click="submitAddress">提交</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressInfo:{
					name:"",
					phone:"",
					address:""
				}
			}
		},
		onLoad(){
			this.getAddressInfo()
		},
		
		onShow(){
			
		},
		onReady(){
			
		},
		methods: {
			// 获取地址信息
			getAddressInfo(){
			    this.$tools.Post("dock/member/address/get").then((res) =>{
			        if(res.errCode == 0){
			            this.addressInfo = res.data;
			        } else {
			            uni.showToast({
			                title: res.errMsg,
			                duration: 1500,
			                icon:'none'
			            });
			        }
			    })
			},
			
			submitAddress(){
                let that = this;
				const {name,phone,address} = this.addressInfo
				if(!name){
				    uni.showToast({
				        title: "请输入姓名",
				        duration: 1500,
				        icon:'none'
				    });
				    return false
				}
				if(!phone){
				    uni.showToast({
				        title: "请输入手机号码",
				        duration: 1500,
				        icon:'none'
				    });
				    return false
				}
				if(!address){
				    uni.showToast({
				        title: "请输入详细地址",
				        duration: 1500,
				        icon:'none'
				    });
				    return false
				}
				let options = {isLoad: false,action:"form"}
				this.$tools.Post("dock/member/address/set",this.addressInfo,options).then((res) =>{
				    if(res.errCode == 0){
                        uni.showToast({
                            title: "地址设置成功",
                            duration: 1500,
                            icon:'success',
                            success(){
                                this.getAddressInfo()
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
						font-weight: 500;
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

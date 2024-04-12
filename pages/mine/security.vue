<template>
	<view class="container">
		<view class="header_wrap">
			<view class="security_level">
				<view class="star_wrap">
                    <view class="default_wrap">
                        <view class="star" v-for="index in 5" key="index"></view>
                    </view>
                    <view class="active_wrap">
                       <view class="activeStar" v-for="index in 3" key="index"></view> 
                    </view>
				</view>
				
				<view class="security_des">
					<text>{{i18n.an}}</text>
				</view>
			</view>
			
			<view class="login_wrap">
				<view class="login">
					<text>{{i18n.top}}:{{safeInfo.lastLoginTime | format}}</text>
				</view>
				<view class="ip">IP：{{safeInfo.ip}}</view>
			</view>
		</view>

		<view class="list_wrap">
			<view class="list" v-for="(item,index) in list" :key='index' @click="jumpLink(item)">
				<view class="left">
					<image :src="item.url"></image>
					<text>{{item.name}}</text>
				</view>
				<view class="arrow"></view>
			</view>	
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
                safeInfo: {
                    lastLoginTime: '',
                    ip: ''
                }, 
				list:[
					{name:"绑定银行卡",url:require("@/static/images/mine/band_card.png"),path:"bindCard"},
					{name:"登陆密码",url:require("@/static/images/mine/password.png"),path:"modifyPassword"},
					{name:"汇款银行卡管理",url:require("@/static/images/mine/remit_card.png"),path:"cardManage"},
					{name:"设置密保手机",url:require("@/static/images/mine/mb_mobile.png"),path:"bindMobile"},
				]
			}
		},
        onLoad() {
            this.getSafeInfo()
        },
		computed: {
		    i18n () {
		       return this.$t("security")
		    }
		},
		onShow() {
			
		},
		onReady() {
			this.list = [
				{name:this.i18n.bindCard,url:require("@/static/images/mine/band_card.png"),path:"bindCard"},
				{name:this.i18n.login_pass,url:require("@/static/images/mine/password.png"),path:"modifyPassword"},
				{name:this.i18n.card,url:require("@/static/images/mine/remit_card.png"),path:"cardManage"},
				{name:this.i18n.set,url:require("@/static/images/mine/mb_mobile.png"),path:"bindMobile"},
			],
			uni.setNavigationBarTitle({
				title:this.i18n.head_title
			})
		},
		methods: {
            
            // 安全中心信息
            getSafeInfo(){
                this.$tools.Post("dock/member/member/safe").then((res) =>{
                    if(res.errCode == 0){
                        this.safeInfo = res.data;
                    } else {
                        uni.showToast({
                            title: res.errMsg,
                            duration: 1500,
                            icon:'none'
                        });
                    }
                })
            },
            
			jumpLink(item){
				uni.navigateTo({
				    url: `/pages/mine/${item.path}`
				});
			}
		}
	}
</script>

<style scoped lang="less">

		page{
			background: #fff;
			.container{
				font-family: PingFang SC;
				.header_wrap{
					position: relative;
					width: 100%;
					height: 492rpx;
					padding: 225rpx 46rpx 0 26rpx;
					margin-top: -4rpx;
					background: url(@/static/images/mine/security_bg.png) no-repeat center bottom;
					background-size: 100%;
					.security_level{
						margin-bottom: 50rpx;
						text-align: center;
						.star_wrap{
							display: inline-block;
							margin: 0 auto;
                            position: relative;
                            .default_wrap{
                                display: block;
								margin:0 auto;
								position: relative;
                                .star{
									display: inline-block;
                                	width: 52rpx;
                                	height: 50rpx;
                                	background:url(@/static/images/mine/default.png) no-repeat center;
                                	background-size: 100%;
                                }
                            }
                            .active_wrap{
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                position: absolute;
								left: 0;
								top: 0;
                                .activeStar{
                                    width: 52rpx;
                                    height: 50rpx;
                                    background:url(@/static/images/mine/active.png) no-repeat center;
                                    background-size: 100%;
                                }
                            }   
						}
						
						.security_des{
							margin-top: 20rpx;
							text-align: center;
							text{
								font-size: 24rpx;
								font-weight: 500;
								color: #FFFFFF;
							}
						}
					}
					.login_wrap{
						.login{
							display: flex;
							align-items: center;
							justify-content: space-between;
							margin-bottom: 18rpx;
							text{
								font-size: 24rpx;
								font-weight: 500;
								color: #FFFFFF;
							}
						}
						.ip{
							font-size: 24rpx;
							font-weight: 500;
							color: #FFFFFF;
						}
					}
				}
				
				.list_wrap{
					background: #fff;
					padding: 22rpx 40rpx 60rpx 40rpx;
					.list{
						display: flex;
						align-items: center;
						justify-content: space-between;
						border-bottom: 1px solid #E0E0E0;
						height: 94rpx;
						.left{
							display: flex;
							align-items: center;
							image{
								width: 34rpx;
								height: 34rpx;
								margin-right: 16rpx;
							}
							text{
								font-size: 28rpx;
								font-weight: 500;
								color: #333333;
							}
						}
						
						.arrow{
							width: 14rpx;
							height: 24rpx;
							background: url(@/static/images/mine/arrow_right.png) no-repeat center;
							background-size: 100%;
						}
					}
				}
			}
		}
	
	
	
	
</style>

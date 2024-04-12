<template>
	<view class="container">
		<!-- <view class="status_bar"> </view> -->
		<view class="header_wrap">
			<view class="account_wrap">
				<image src="@/static/images/heade_icon.png" class="user_icon"></image>
				<view class="account_id">
					<text>{{i18n.user}}：{{userInfo.username}}</text>
					<text v-if="userInfo.remark">{{i18n.bemer}}：{{userInfo.remark}}</text>
					<text class="idkl">ID：{{userInfo.id}}</text>
				</view>
				<image src="@/static/images/mine/set.png" class="set" @click="set"></image>
				<view class="mine-leave" @click="toRecordvip">
										<image src="/static/xing.png" style="width: 60rpx;height: 60rpx;"></image>
										<view class="dengji">
											<!-- {{userInfo.level+1}} -->
										   {{userInfo.levelTitle}}<image src="/static/fff.png" style="height: 32rpx;width: 32rpx;margin-left:30rpx;"></image>
										</view>
				</view>
			</view>
			<view class="balance_wrap">
				<view >
					<view class="title">{{i18n.jifen}}</view>
					<view class="money">{{thousand(userInfo.money)}}</view>
				</view>
				<view class="refresh_btn" @click="refresh"><image src="../../static/images/shuaxin.png"></image></view>
			</view>
		</view>

		<view class="dabox">
			<view class="tab_wrap">
				<view class="remittance" @click="remittance">
					
					<text>{{i18n.dui}}</text>
				</view>
				<view class="buy_order" @click="buyOrder">
					
					<text>{{i18n.chong}}</text>
				</view>
			</view>
			
			<view class="des_tab_wrap">
				<view @click="toRecord('billRecord')">
					<image src="@/static/images/mine/jsq.png"></image>
					<text>{{i18n.ming}}</text>
				</view>
				<view @click="toRecord('rechargeRecord')">
					<image src="@/static/images/mine/gdjl.png"></image>
					<text>{{i18n.buy}}</text>
				</view>
				<view @click="toRecord('withdrawalRecord')">
					<image src="@/static/images/mine/hkjl.png"></image>
					<text>{{i18n.hui}}</text>
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

		<bottom :num='5'></bottom>
		<a-tc></a-tc>
	</view>
	
</template>

<script>
	import bottom from '../home/bottom.vue'
	export default {
		data() {
			return {
                userInfo: {},
				list:[
					{name:"安全中心",url:require("@/static/images/mine/usd1.png"),path:"security"},
					{name:"我的消息",url:require("@/static/images/mine/usd2.png"),path:"myNews"},
					// {name:"收货地址",url:require("@/static/images/mine/usd3.png"),path:"address"},
					{name:"联系客服",url:require("@/static/images/mine/usd4.png"),path:"http://collect.doubleyu.cn/"},
				],
				ghost :''
			}
		},
        onLoad() {
            
        },
		computed: {
		    i18n () {
		       return this.$t("mine")
		    }
		},
		components:{
			bottom
		},
        onShow(){
            this.getServiceUrl();
        	this.getUserInfo();
			this.list = [
				{name:this.i18n.center,cnName:"安全中心",url:require("@/static/images/mine/usd1.png"),path:"security"},
				{name:this.i18n.msg,cnName:"我的消息",url:require("@/static/images/mine/usd2.png"),path:"myNews"},
				{name:this.i18n.lian,cnName:"联系客服",url:require("@/static/images/mine/usd4.png"),path:"kefu"},
			]
        },
        
		methods: {
			thousand(num) {
			    return  Math.floor(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
			},
			toRecordvip(){
				uni.navigateTo({
					url: '/pages/activity/activity',
				});
			},
			refresh(){
				uni.showLoading()
				this.getUserInfo()
			},
            // 获取用户信息
            getUserInfo(){
                this.$tools.Post("dock/member/member/currentUser").then((res) =>{
                    if(res.errCode == 0){
                        this.userInfo = res.data;
                        uni.setStorageSync('realName', this.userInfo.realName);
						uni.setStorageSync('phone', this.userInfo.phone);
						uni.setStorageSync('username', this.userInfo.username);
						uni.hideLoading()
						this.ghost = res.data.ghost
                    } else {
                        uni.showToast({
                            title: res.errMsg,
                            duration: 1500,
                            icon:'none'
                        });
                    }
                })
            },
            
            // 获取客服链接
            getServiceUrl(){
                this.$tools.Post("dock/system/config/get").then((res) =>{
                    if(res.errCode == 0){
                     
                        // this.list[3].path = res.data.onlineService 
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
                // if(item.cnName == "联系客服"){
                //     //#ifdef H5
                //         location.href = item.path
                //     //#endif
                    
                //     //#ifdef APP-PLUS
                //         // plus.runtime.openWeb(item.path);
                //         plus.webview.open(item.path)
                //     //#endif
                // }
                // else{
                    uni.navigateTo({
                        url: `/pages/mine/${item.path}`
                    }); 
                // }
			},
			
			remittance(){
				if(this.userInfo.realName){
					uni.navigateTo({
					    url: '/pages/mine/remittance'
					}); 
				}
				else{
					uni.navigateTo({
					    url: '/pages/mine/bindCard'
					});
				}
			},
			
			buyOrder(){
				//判断
				uni.navigateTo({
				    url: `/pages/mine/recharge`
				});
				// console.log(this.ghost)
				// if(this.ghost == 0){
				// 	uni.showToast({
				// 	    title: '请联系订单员获取购单方式',
				// 	    icon: 'none',
				// 	    duration: 2000
				// 	})
				// }else{
				// 	uni.navigateTo({
				// 	    url: `/pages/recharge?type=bank`
				// 	});
				// }
				
			},
			
			toRecord(value){
				uni.navigateTo({
				    url: `/pages/mine/${value}`
				});
			},
			
			set(){
				uni.navigateTo({
				    url: `/pages/mine/set`
				});
			}
		}
	}
</script>

<style scoped lang="less">
    @import url('../../static/css/mian.css');
	.mine-leave{
	     display: flex;
	     height: 60rpx;
	     align-items: center;
	     background: linear-gradient(45deg,#ff4646,#ffaf5c);
	     width: 240rpx;
	     border-top-left-radius: 25px;
	     border-bottom-left-radius: 25px;
		 position:absolute;
		 top: 60rpx;
		 right: -48rpx;
	     .dengji{
	       display: flex;
	       justify-content: flex-end;
	       align-items: center;
	       flex: 1;
	       color: #fff;
	       font-size: 14px;
	       padding-right: 8px;
	     }
	}
	.container{
		font-family: PingFang SC;
		.status_bar {
		    height: var(--status-bar-height);
		    width: 100%;
		    background-color: #E6241A;
		}
		.header_wrap{
			position: relative;
			width: 100%;
			height: 380rpx;
			padding: 88rpx 45rpx 0 45rpx;
			background: url(@/static/images/mine/mine_bg.png) no-repeat center;
			background-size: 100% 100%;
			.account_wrap{
				position: relative;
				display: flex;
				align-items: center;
				padding-left: 15rpx;
				.user_icon{
					width: 88rpx;
					height: 88rpx;
					border-radius: 50%;
				}
				.account_id{
					display: flex;
					flex-direction: column;
					justify-content: center;
					text{
						flex: 1;
						margin-left: 28rpx;
						font-size: 32rpx;
						font-weight: 500;
						color: #FFFFFF;
					}
					.idkl{
						background: #D01710;
						padding-left:10rpx;
						border-radius: 16rpx;
						margin-top:6rpx;
					}
				}
				
				.set{
					position: absolute;
					top: 0;
					right: 0;
					width: 38rpx;
					height: 38rpx;
					margin-top:-8rpx
				}
			}
			.balance_wrap{
				position: absolute;
				bottom: 0;
				width:660rpx;
				height: 134rpx;
				background: url(@/static/images/mine/balance.png) no-repeat center;
				background-size: 100%;
				display: flex;
				justify-content: space-between;
				.title{
					font-family: PingFang SC;
					font-weight: 800;
					color: #FFFFFF;
					font-size:28rpx;
					width:180rpx;
					text-align: center;
					line-height: 54rpx;
				}
				.money{
					font-size: 48rpx;
					font-weight: bold;
					color: #542E01;
					margin-left:45rpx;
				}
				.refresh_btn{
					margin-top:49rpx;
					margin-right:49rpx;
					image{
						width: 52rpx;
						height: 52rpx;
					}
				}
			}
		}
		.tab_wrap{
			display: flex;
			justify-content: center;
			width:690rpx;
			margin:0 auto;
			padding-top:20rpx;
			.remittance{
				position: relative;
				width:320rpx;
				height:160rpx;
				background: url(@/static/images/mine/huikuan.png) no-repeat center;
				background-size: 100%;
				text-align: center;
				text{
					display: block;
					color:#fff;
					font-family: PingFang SC;
					font-weight: bold;
					font-size:36rpx;
					margin-top:88rpx;
				}
			}
			.buy_order{
				position: relative;
				width:320rpx;
				height:160rpx;
				background: url(@/static/images/mine/goudan.png) no-repeat center;
				background-size: 100%;
				text-align: center;
				text{
					display: block;
					color:#fff;
					font-family: PingFang SC;
					font-weight: bold;
					font-size:36rpx;
					margin-top:88rpx;
				}
			}
		}
		.des_tab_wrap{
			display: flex;
			justify-content: center;
			height: 180rpx;
			width: 690rpx;
			height: 180rpx;
			background: rgba(255, 255, 255, 0.2);
			margin: 18rpx auto;
			border-radius: 20rpx;
			view{
				width: 33.33%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				image{
					display: block;
					width: 69rpx;
					height: 68rpx;
					margin-bottom: 24rpx;
				}
				text{
					font-size: 28rpx;
					font-weight: 500;
					color:#fff;
				}
			}
			
		}
		.list_wrap{
			background: rgba(255, 255, 255, 0.2);
			width:690rpx;
			margin:0 auto;
			height:340rpx;
			border-radius: 20rpx;
			border-top:1rpx solid transparent;
			.list{
				width:630rpx;
				margin:0 auto;
				display: flex;
				margin-top:50rpx;
				align-items: center;
				justify-content: space-between;
				.left{
					display: flex;
					align-items: center;
                    position: relative;
					image{
						max-width: 46rpx;
						min-width: 35rpx;
						min-height:38rpx;
						max-height:45rpx;
						margin-right: 16rpx;
					}
					text{
						font-size: 32rpx;
						font-weight: 500;
						color: #fff;
					}
				}
				.arrow{
					width: 14rpx;
					height: 24rpx;
					background: url(@/static/images/mine/gd.png) no-repeat center;
					background-size: 100%;
				}
			}
			
		}
	}
.dabox{
	background: url(@/static/images/userbg.png) no-repeat center;
	background-size: 100%;
	width:100%;
	height:1111rpx;
}
</style>

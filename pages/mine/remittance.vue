<template>
	<view class="container">
		<view class="list_wrap">

			<!-- <view>
				<text>是否满足回款条件</text>
				<text class="active">{{withdrawalInfo.withdrawStatus==1?"是":"否"}}</text>
			</view> -->
			<view>
				<text>{{i18n.user}}</text>
				<text class="right">{{withdrawalInfo.realName}}</text>
			</view>
			
			<view>
				<text>{{i18n.yue}}</text>
				<text class="right">{{Math.floor(Number(withdrawalInfo.money))}}</text>
			</view>
			
			<view>
				<text>{{i18n.huikuan}}</text>
				<text class="right">{{withdrawalInfo.withdrawalMoney}}</text>
			</view>
			
			<view>
				<text>{{i18n.huizh}}</text>
				<picker :value="index" style="margin-right: -26rpx;" :range="bankCardList" range-key="card" @change="bindPickerChange">
				    <text class="uni-input">{{bankCard}}</text>
				</picker>
			</view>
			
			<view>
				<text>{{i18n.huiMoney}}</text>
				<input type="digit" v-model="money" :placeholder="backMoney" confirm-type='done' placeholder-class="input-placeholder"/>
			</view>
			
			<view>
				<text>{{i18n.shen_time}}</text>
				<view class="time">
					{{shenTime}}
				</view>
			</view>
		</view>
		
		<view class="submit" @click="submit">{{i18n.submit}}</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index:0,
				bankId:"",
                bankCard:"请选择回款账户",
                money:"",
				array:[
					{name:"王立",account:"555555"},
					{name:"张三",account:"666"}
				],
                withdrawalInfo:{},
                bankCardList:[],
				backMoney:'',
				shenTime:'',
				timer:null
			}
		},
        onLoad() {
            this.getBankCardList()
            this.getWithdrawalInfo()
			if(this.timer == null){
				this.timer = setInterval(()=>{
					this.shenTime = this.getTime()
				},1000)
			}else{
				clearInterval(this.timer)
				this.timer = null
			}
        },
		computed: {
		    i18n () {
		       return this.$t("remittance")
		    }
		},
		onShow() {
			this.bankCard = this.i18n.select
			
			
		},
		onUnload() {
			// clearInterval(this.timer)
			// this.timer = null
		},
		onReady() {
			uni.setNavigationBarTitle({
				title:this.i18n.head_title
			})
		},
		methods: {
			getTime:function(){
						var date = new Date(),
						year = date.getFullYear(),
						month = date.getMonth() + 1,
						day = date.getDate(),
						hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
						minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
						second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
						month >= 1 && month <= 9 ? (month = "0" + month) : "";
						day >= 0 && day <= 9 ? (day = "0" + day) : "";
						var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
						return timer;
			},
            // 获取银行卡列表
            getBankCardList(){
                this.$tools.Post("dock/member/bank/all").then((res) =>{
                    if(res.errCode == 0){
						if(!res.dataSet){
							
						}else{
							this.bankCardList = [...res.dataSet]
							this.bankId = this.bankCardList[this.index].id;
							this.bankCard = this.bankCardList[this.index].card;
						}
                        
                    } else {
                        uni.showToast({
                            title: res.errMsg,
                            duration: 1500,
                            icon:'none'
                        });
                    }
                })
            },
            // 获取提现信息
            getWithdrawalInfo(){
                this.$tools.Post("dock/member/withdrawal/info").then((res) =>{
                    if(res.errCode == 0){
						console.log(res.data.minWithdrawMoney)
						if (res.data.bankCount <= 0) {
							uni.redirectTo({
							    url: '/pages/mine/bindCard'
							}); 
						}
                        this.withdrawalInfo = res.data;
						this.backMoney = this.i18n.min + res.data.minWithdrawMoney
                    } else {
                        uni.showToast({
                            title: res.errMsg,
                            duration: 1500,
                            icon:'none'
                        });
                    }
                })
            },
            
			bindPickerChange(e){
				console.log(e,"9999");
				this.index = e.detail.value;
				this.bankId = this.bankCardList[this.index].id;
                this.bankCard = this.bankCardList[this.index].card;
			},
            
            submit(){
                if(this.withdrawalInfo.withdrawStatus==1){
                    if(!this.bankId){
                        uni.showToast({
                            title: this.i18n.select,
                            duration: 1500,
                            icon:'none'
                        });
                        return false
                    }
                    if(!this.money){
                        uni.showToast({
                            title: this.i18n.toast_money,
                            duration: 1500,
                            icon:'none'
                        });
                        return false
                    }
                    else{
                        if(Number(this.money) < Number(this.withdrawalInfo.minWithdrawMoney)){
                            uni.showToast({
                                title: this.i18n.wMin+this.withdrawalInfo.minWithdrawMoney,
                                duration: 1500,
                                icon:'none'
                            });
                            return false
                        }
                    }
                    this.submitWithdrawal()
                }
                else{
                    uni.showToast({
                        title: this.i18n.noWith,
                        duration: 1500,
                        icon:'none'
                    });
                    return false
                }
            },
            
            //提现申请
            submitWithdrawal(){
                var params = {
                    money: this.money,
                    bankId: this.bankId,
					time: this.shenTime
                }
                this.$tools.Post("dock/member/withdrawal/add",params).then((res) =>{
                    if(res.errCode == 0){
                        uni.showToast({
                            title: this.i18n.succ,
                            duration: 1000,
                            icon:'none',
                        	success(){
                        		setTimeout(()=> {
                        			uni.navigateTo({
                        			    url: '/pages/mine/mine'
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
            },
		}
	}
</script>

<style scoped lang="less">
	page{
		background: #fff;
		font-family: PingFang SC;
		.container{
			background: #fff;
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
						color: #999999;
					}
					.right{
						color: #333333;
					}
					.active{
						color: #E6241A;
					}
					.input-placeholder{
						font-size: 28rpx;
						font-weight: 500;
						color: #CCCCCC;
					}
					input{
						flex:1;
						text-align: right;
						height: 100%;
					}
					.time{
						flex:1;
						text-align: right;
						height: 100%;
						border-bottom: none;
						justify-content: flex-end;
					}
					picker{
						flex: 1;
						text-align: right;
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

<template>
	<view class="container">
		<view class="list_wrap">
			<view class="list" v-for="(item,index) in bankCardList" :key="index" @touchend="maskTouchend(item)">
				<view class='item'>
					<image src="@/static/images/mine/bank.png"></image>
					<text>{{item.bankName}}</text>
				</view>
				<view class='item no_wrap'>
					<text class="card_no">{{item.card}}</text>
					<text>{{i18n.del}}</text>
				</view>
				<view class="mark" v-if='item.active==1'>{{i18n.mo}}</view>
			</view>
		</view>
		
		<view class="tips">{{i18n.tips}}</view>
		
		<view class="add_card" @click="addCard">
			<image src="@/static/images/mine/add.png"></image>
			<text>{{i18n.add}}</text>
		</view>
		
	</view>
</template>

<script>
	export default {
        name: 'cardManage',
		data() {
			return {
				touchNum:0,
				bankCardList:[]
			}
		},
        
        onLoad(){
        	
        },
        computed: {
            i18n () {
               return this.$t("cardMange")
            }
        },
        onShow(){
        	this.getBankCardList();
			
        },
        onReady(){
        	uni.setNavigationBarTitle({
        		title:this.i18n.head_title
        	})
        },
        
		methods: {
            // 获取银行卡列表
            getBankCardList(){
                this.$tools.Post("dock/member/bank/all").then((res) =>{
                    if(res.errCode == 0){
                        this.bankCardList = [...res.dataSet]
                    } else {
                        uni.showToast({
                            title: res.errMsg,
                            duration: 1500,
                            icon:'none'
                        });
                    }
                })
            },
            maskTouchend(item){
				this.touchNum ++
				setTimeout(()=>{
					if(this.touchNum == 1){
						this.showDetaleModal("delete",this.i18n.delCard,item)
					}
					if(this.touchNum >= 2){
						this.showDetaleModal("set",this.i18n.moren,item)
					}
					this.touchNum = 0
				},250)
			},	

            showDetaleModal(type,content,item){
				let that = this;
                uni.showModal({
                    content: content,
                    success: function (res) {
                        if (res.confirm) {
                            if(type == "delete"){
								that.deleteBankCard(item)
							}
							else if(type=="set"){
								that.setBankActive(item)
							}
                        } else if (res.cancel) {
                            
                        }
                    }
                });
            },
            
            //删除银行卡
            deleteBankCard(item){
               let that = this;
                let pamars = {bankId:item.id}
                this.$tools.Post("dock/member/bank/delete",pamars).then((res) =>{
                    if(res.errCode == 0){
                        uni.showToast({
                            title: this.i18n.succ,
                            duration: 1500,
                            icon:'success',
                            success(){
                                that.getBankCardList()
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
			
			//设为默认银行卡
			setBankActive(item){
			   let that = this;
			    let pamars = {bankId:item.id}
			    this.$tools.Post("dock/member/bank/setActive",pamars).then((res) =>{
			        if(res.errCode == 0){
			            uni.showToast({
			                title: this.i18n.set,
			                duration: 1500,
			                icon:'success',
			                success(){
			                    that.getBankCardList()
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
            
			addCard(){
				uni.navigateTo({
				    url: '/pages/mine/bindCard'
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	page{
		background: #F0F0F0;
		.container{
			margin-top: 30rpx;
			font-family: PingFang SC;
			.list_wrap{
				margin: 0 20rpx;
				.list{
					position: relative;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					width: 100%;
					height: 160rpx;
					background: #FFFFFF;
					border-radius: 10rpx;
					padding: 30rpx 30rpx 24rpx 30rpx;
					.item{
						display: flex;
						align-items: center;
						image{
							width: 58rpx;
							height: 58rpx;
							margin-right: 22rpx;
						}
						text{
							font-size: 28rpx;
							color: #333333;
						}
						.card_no{
							font-size: 32rpx;
							font-weight: bold;
						}
						.delete{
							font-size: 24px;
						}
					}
					.no_wrap{
						padding-left: 76rpx;
						justify-content: space-between;
					}
					.mark{
						position: absolute;
						top: 0;
						right: 0;
						padding: 14rpx 16rpx;
						font-size: 24rpx;
						font-weight: 500;
						color: #E6241A;
						background: #FFDDDB;
						border-radius: 0px 10rpx 0px 10rpx;
					}
					
				}
                .list:not(:last-child){
                    margin-bottom: 20rpx;
                }
			}
			.tips{
				margin: 20rpx 30rpx 114rpx 30rpx;
				padding: 14rpx 24rpx;
				background: #E0E0E0;
				border: 1rpx solid #B3B3B3;
				border-radius: 10rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #999999;
			}
			.add_card{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 600rpx;
				height: 80rpx;
                margin: 0 auto;
				background: #E6241A;
				border-radius: 16rpx;
				image{
					display: block;
					width: 32rpx;
					height: 32rpx;
					margin-right: 10rpx;
				}
				text{
					font-size: 28rpx;
					font-weight: 500;
					color: #FFFFFF;
				}
			}
		} 
	}
    
        /deep/ .uni-modal{
            width: 66%;
        }
     
</style>

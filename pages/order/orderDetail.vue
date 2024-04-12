<template>
    <view class="orderDetail">
        <view class="topWrap">
            <view class="topImg">
                <image :src="infoData.img" mode=""></image>
            </view>
            <view class="title">
                {{infoData.title}}
            </view>
            <view class="expect">
                {{order.di}}{{infoData.expect}}{{order.o_dan}}
            </view>
        </view>
        <view class="contentWrap">
            <view class="con_title">
				<text class="left_icon"></text>
				<text class="title_txt">{{i18n.deails}}</text>
            </view>
            <view class="items">
                <view class="items_left" style="color: red;">{{i18n.status}}</view>
                <view class="items_right">
					<text v-if="infoData.isWin == 'win'" class="cg">{{order.success}}</text>
					<text v-if="infoData.isWin == 'padding'" class="dd">{{order.padding}}</text>
					<text v-if="infoData.isWin == 'lose'" class="sb">{{order.error}}</text>
				</view>
            </view>
            <view class="items">
                <view class="items_left">{{i18n.fen}}</view>
                <view class="items_right">{{thousand(Math.floor(Number(infoData.moneyOrderWin)))}}</view>
            </view>
            <view class="items">
                <view class="items_left">{{i18n.order}}</view>
                <view class="items_right">{{fieldStr(infoData.field)}}</view>
            </view>
            <view class="items">
                <view class="items_left">{{i18n.pipei}}</view>
                <view class="items_right" v-if="infoData.isWin != 'padding'">
				{{infoData.openSize == 1 ? order.you : order.tong}}{{infoData.openQuantity == 1 ? order.dan : order.shuang}}
				</view>
				<view class="items_right" v-else>{{i18n.padding}}</view>
            </view>
            <view class="items">
                <view class="items_left">{{i18n.time}}</view>
                <view class="items_right">{{infoData.timeCreated  | formatDate}}</view>
            </view>
            <view class="items">
                <view class="items_left">{{i18n.order_num}}</view>
                <view class="items_right">{{infoData.orderNo}}</view>
            </view>
            <view class="items">
                <view class="items_left">{{i18n.shop}}</view>
                <view class="items_right">{{infoData.title}}</view>
            </view>
            <view class="items">
                <view class="items_left">{{i18n.money}}</view>
                <view class="items_right">{{thousand(Math.floor(Number(infoData.moneyOrder)))}}</view>
            </view>
			<!-- <view class="items" v-if="addressInfo.name">
			    <view class="items_left">姓名</view>
			    <view class="items_right">{{addressInfo.name}}</view>
			</view>
			<view class="items" v-if="addressInfo.phone">
			    <view class="items_left">电话</view>
			    <view class="items_right">{{addressInfo.phone}}</view>
			</view>
			<view class="items" v-if="addressInfo.address">
			    <view class="items_left">收货地址</view>
			    <view class="items_right">{{addressInfo.address}}</view>
			</view> -->
			<!-- <view class="CgImg">
				<image v-if="infoData.isWin =='win'" src="../../static/images/chengdg.png" mode=""></image>
				<image v-if="infoData.isWin =='lose'" src="../../static/images/ppwwc.png" mode=""></image>
			</view> -->
        </view>
		
    </view>
</template>

<script>
    export default {
        data() {
            return {
                orderId: '',
                infoData: {},
				addressInfo:{
					name:"",
					phone:"",
					address:""
				},
            }
        },
		computed: {
		    i18n () {
		        return this.$t("order_deails")
		    },
			order() {
				return this.$t("order") 
			}
		},
		onShow() {
			
		},
		onReady() {
			uni.setNavigationBarTitle({
				title:this.i18n.deails
			})
		},
        onLoad(opotion) {
            this.orderId = opotion.orderId
            this.getDetailData()
			this.getAddressInfo()
        },
        methods: {
            thousand(num) {
                return  Math.floor(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },
            getDetailData(){
                let params = {
                    orderId: this.orderId
                }
                this.$tools.Post("dock/product/order/info",params).then((res) =>{
                    if(res.errCode == 0){
                        this.infoData = res.data;
                    } else {
                        uni.showToast({
                            title: res.errMsg,
                            duration: 1500,
                            icon:'none'
                        });
                    }
                })
            },
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
			// 格式化数据
			fieldStr(field){
				// ["优品Ar+1","统货Ct+1","单/件","双/件"],
				let name = ''
				if(field == 'quantity'){ // quantity - 单双
					name = this.infoData.value == '1' ? this.order.dan : this.order.shuang
				}else if(field == 'size'){// size - 大小
					name = this.infoData.value == '1' ?  this.order.you : this.order.tong
				}
				return name
			},
        }
    }
</script>

<style lang="less" scoped>
    
    page{
        width: 100%;
        height: 100vh;
        background: #FFFFFF;
        .orderDetail{
            width: 100%;
            height: 100vh;
            background: url(../../static/images/order/bjt.png) no-repeat;
            background-size: 100% 100%;
            .topWrap{
                text-align: center;
                padding: 25rpx 0rpx;
                .topImg{
                    width: 140rpx;
                    height: 140rpx;
                    margin: 0 auto;
                    border-radius: 100%;
                    background: #FFFFFF;
                    image{
                      width: 140rpx;
                      height: 140rpx;
                      border-radius: 100%;  
                    }
                }
                .title{
                    margin-top: 20rpx;
                    margin-bottom: 20rpx;
                    font-size: 36rpx;
                    color: #FFFFFF;
                }
                .expect{
                    font-size: 28rpx;
                    color: #FFFFFF;
                }
            }
            .contentWrap{
                width: 690rpx;
                height: 78vh;
                margin: 0 auto;
                background: #FFFFFF;
                border-radius: 10rpx;
                position: relative;
                .con_title{
                    margin: 0rpx 30rpx 20rpx;
                    padding: 20rpx 0rpx;
                    font-weight: bold;
					display: flex;
					align-items: center;
                    color: #333333;
                    font-size: 32rpx;
                    border-bottom: 1px dashed #F14C43;
					.left_icon{
						width: 4rpx;
						height: 32rpx;
						background: #F14B43;
						border-radius: 2rpx;
						margin-right: 20rpx;
					}
                }
                .items{
                    padding: 20rpx 30rpx;
                    font-size: 34rpx;
                    display: flex;
                    .items_left{
                        color: #999999;
                        font-size: 34rpx;
                        flex: 1;
                        text-align: left;
                        margin-right: 10rpx;
                    }
                    .items_right{
                        color: #333333;
                        font-size: 34rpx;
                        font-weight: bold;
                        text-align: left;
                        flex: 2;
						.cg{
							color: #E8281E !important;
						}
						.dd{
							color: #999999;
						}
						.sb{
							color: #E8281E !important;
						}
                    }
                }
				.CgImg{
					width: 230rpx;
					height: 189rpx;
					border-radius: 100%;
					position: absolute;
					z-index: 2;
					top: 50vh;
					right: 40rpx;
					image{
						width: 230rpx;
						height: 189rpx;
					}
				}
            }
        }
    }    
</style>

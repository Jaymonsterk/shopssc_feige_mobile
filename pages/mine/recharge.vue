<template>
	<view class="page">
		<view class="status-bar"></view>
		<view class="bank-box">
			 <view class="box-item">
				<view class="label">{{i18n.qian}}</view>
				<view class="value value1" style="color: #333;">
					<radio-group @change="changeRadio" style="">	
						<label v-for="item in identity" :key="item.type" style="display: block;text-align: left;margin-bottom: 10rpx;">
							<radio :value="item.type" :checked="item.type==radioValue" />{{item.name}}
						</label>
					</radio-group>

				</view>
			</view>
			<!-- <view class="box-item">
				<view class="label">收款户名</view>
				<view class="value">
					{{bankMax}}
				</view>
				<view class="icon-img" @click="copyValue(bankMax)">
					<image src="../static/images/copy.png"></image>
				</view>
			</view>
			<view class="box-item">
				<view class="label">收款账号</view>
				<view class="value">
					{{bankMin}}
				</view>
				<view class="icon-img" @click="copyValue(bankMin)">
					<image src="../static/images/copy.png"></image>
				</view>
			</view> -->
			<view class="box-item">
				<view class="label">{{i18n.chong}}</view>
				<input type="number" v-model="money" :placeholder="i18n.place" placeholder-style="text-align:right;">
			</view>
		</view>
		<view class="btn submit" @click="submit">{{i18n.sure}}</view>
		<!-- <view class="tips">
			<view>1、请转账到以上收款银行账户;</view>
			<view>2、请正确填写转账银行卡的持卡人姓名和充值金额,以便及时核对;</view>
			<view>3、转账1笔提交1次,请勿重复提交订单;</view>
			<view>4、请务必转账后再提交订单,否则无法及时查到您的款项;</view>
			<view>5、转帐完成后请保留单据作为核对证明。</view>
		</view> -->
	</view>
</template>

<script>
	export default {
			data() {
				return {
					radioValue:'',      //选中的value值
					identity:[],
					money:''
				};
			},
			mounted() {
				this.getBankType()
			},
			computed: {
			    i18n () {
			       return this.$t("mineRecharge")
			    }
			},
			onReady() {
				uni.setNavigationBarTitle({
					title:this.i18n.head_title
				})
			},
			methods: {
				getBankType(){
					this.$tools.Post("dock/member/recharge/types").then((res) =>{
					    if(res.errCode == 0){
					            let obj = res.data
						
							    let key = Object.keys(obj) //取出当前对象的索引
							
							    let values=Object.values(obj) //取出当前对象的值
							    
							    //将拿到的索引 跟 值 组到一起，返回数组对象
							    let arrObj=key.map((item,index)=>{
							        return{
							            name:values[index],//values是一个数组，加index是为了拿到跟索引同个位置的值
							            type:item
							        }
							    })
							    this.identity = arrObj
							    // console.log(this.identity,"对象转成 数组对象");
					    } else {
					        uni.showToast({
					            title: res.errMsg,
					            duration: 1500,
					            icon:'none'
					        });
					    }
					})
				},
				submit(){
					let dataObj = {
						type:this.radioValue,
						money:this.money
					}
					if(this.radioValue == ''){
						uni.showToast({
							title:this.i18n.select,
							icon:'none'
						})
						return
					}
					if(this.moeny == '' || Number(this.money) < 20000){
						uni.showToast({
							title:this.i18n.minMoney,
							icon:'none'
						})
						return
					}
					this.$tools.Post("dock/member/recharge/go",dataObj).then((res) =>{
					    if(res.errCode == 0){
					        this.radioValue = ''
							this.money = ''
							let url = res.data.url
							if(url){
								//#ifdef H5
									location.href = url
								//#endif
											        
								//#ifdef APP-PLUS
									plus.webview.open(url)
								//#endif
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
				changeRadio(e){
					this.radioValue = e.detail.value;
					console.log(this.radioValue);
				}
			}
	}
</script>

<style lang="less" scoped>
	.bank-box{
		margin: 20rpx 30rpx;
		padding:0 20rpx;
		background-color: #fff;
		.box-item{
			border-bottom: 2rpx solid #E0E0E0;
			display: flex;
			padding:30rpx 0;
			align-items: center;
			.label{
				font-size: 30rpx;
				color:#333;
				width: 25%;
			}
			.value,input{
				flex:1;
			}
			input{
				padding-left: 20rpx;
				text-align: right;
			}
			.picker-box{
				flex:1;
				text-align: right;
			}
			.value{
				color:#1C60D1;
				text-align: right;
			}
			.value1{
				text-align: right;
				/deep/.uni-radio-input-checked{
							background-color: rgb(236, 51, 42)!important;
							border-color: rgb(236, 51, 42)!important;
							background-clip: content-box!important;
							padding: 6rpx!important;
							box-sizing: border-box;
				}
				/deep/.uni-radio-input-checked::before{
						display: none!important;
				}
				/deep/.uni-radio-input{
					  width: 40rpx !important;
					  height: 40rpx !important;
				}
			}
			.icon-img{
				padding-left: 10rpx;
				image{
					width: 32rpx;
					height: 32rpx;
					vertical-align: middle;
				}
			}
			.arrow{
				image{
					width: 26rpx;
					height: 26rpx;
				}
			}
		}
		.box-item:last-child{
			border-bottom: none;
		}
	}
	.submit{
		margin-top: 60rpx;
	}
	.tips{
		color:#989898;
		font-size: 28rpx;
		background-color: #E6E6E6;
		margin: 60rpx 30rpx 30rpx;
		padding:30rpx 20rpx;
		border-radius: 10rpx;
		text{
			color:var(--red_font);
		}
		view{
			line-height: 40rpx;
		}
	}
	.submit{
	    margin-top: 30px;
	}
	.btn {
	    width: 270px;
	    margin: 0 auto;
	    height: 45px;
	    line-height: 45px;
	    border-radius: 2000rem;
	    text-align: center;
	    background-color: #da3a3f;
	    color: #fff;
	    font-size: 17px;
	    box-shadow: 0px 10px 10px 0px #da3a3f40;
		margin-top: 100rpx;
	}
</style>

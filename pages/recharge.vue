<template>
	<view class="page">
		<view class="status-bar"></view>
		<view class="bank-box">
			<view class="box-item">
				<view class="label">收款银行</view>
				<view class="value value1" style="color: #333;">
					{{modeSelect}}
				</view>
			</view>
			<view class="box-item">
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
			</view>
			<view class="box-item">
				<view class="label">充值金额</view>
				<input type="number" v-model="bankRechargeInfo.money" placeholder="请输入充值金额">
			</view>
			<!--
			<view class="box-item">
				<view class="label">收款户名</view>
				<view class="value">{{modeSelect.arr[modeSelect.index].name}}</view>
				<view class="icon-img" @click="copyValue(modeSelect.arr[modeSelect.index].name)">
					<image src="../static/images/copy.png"></image>
				</view>
			</view>
			<view class="box-item">
				<view class="label">收款账号</view>
				<view class="value">{{modeSelect.arr[modeSelect.index].card}}</view>
				<view class="icon-img" @click="copyValue(modeSelect.arr[modeSelect.index].card)">
					<image src="../static/images/copy.png"></image>
				</view>
			</view>
			<view class="box-item">
				<view class="label">充值金额</view>
				<input type="number" v-model="bankRechargeInfo.money" placeholder="请输入充值金额">
			</view>
			<view class="box-item">
				<view class="label">存款人姓名</view>
				<input type="text" v-model="bankRechargeInfo.name" placeholder="请输入存款人姓名">
			</view> -->
		</view>
		<view class="btn submit" @click="submit">确定</view>
		<view class="tips">
			<view>1、请转账到以上收款银行账户;</view>
			<view>2、请正确填写转账银行卡的持卡人姓名和充值金额,以便及时核对;</view>
			<view>3、转账1笔提交1次,请勿重复提交订单;</view>
			<view>4、请务必转账后再提交订单,否则无法及时查到您的款项;</view>
			<view>5、转帐完成后请保留单据作为核对证明。</view>
		</view>
	</view>
</template>

<script>
	import { setClipboardData, getClipboardData } from '@/uni_modules/u-clipboard/js_sdk'
	export default {
		data(){
			return {
				title:"",
				type:"",
				modeSelect: '',
				bankMin:"",
				bankMax:"",
				passSelect:{
					arr:['通道1(等待加载完成即可)','通道2(等待加载完成即可)'],
					index:0
				},
				bankRechargeInfo:{
					money:"",
					name:"",
				}
			}
		},
		onLoad(option){
			this.type=option.type;
			
		},
		onShow(){
			this.getBankInfo();
		},
		methods:{
			changeMode(e) {
				this.modeSelect.index = e.target.value;
			},
			changePass(e) {
				this.passSelect.index = e.target.value;
			},
			getBankInfo(){
				this.$tools.Post("dock/system/withdrawal/bank").then((res) =>{
				   this.modeSelect=res.data.bankName;
				   this.bankMax=res.data.bankAccount
				   this.bankMin=res.data.bankCard
				})
				/*
				this.$api('/system/recharge/bank','','post').then(res=>{
					if(res.errCode==0){
						this.modeSelect.arr=res.data.bankList;
						this.bankMax=res.data.priceMax
						this.bankMin=res.data.priceMin
					}
				})*/
			},
			//复制户名与账号
			copyValue(text){
				setClipboardData(text).then(res=>{
					if(res==text){
						uni.showToast({
							title:"复制成功"
						})
					}
				})
			},
			submit(){
				let error=""
				if(this.type=='bank'){
					if(!this.bankRechargeInfo.money){
						error="请输入充值金额"
					}
					if(error){
						uni.showToast({
							title:error,
							icon:"none"
						})
						return
					}
					uni.showLoading()
					let params = {
						money : this.bankRechargeInfo.money,
					}
					this.$tools.Post("dock/member/recharge/add",params).then((res) =>{
					    if(res.errCode == 0){
							uni.showToast({
								title:"提交成功"
							})
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
	}
</style>

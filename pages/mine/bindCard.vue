<template>
	<view class="container">
		<view class="list_wrap">
			<view>
				<text>{{i18n.cardUser}}</text>
				<input type="text" v-model="realName" :placeholder="i18n.place_user" confirm-type='done' placeholder-class="input-placeholder" :disabled="isDisabled"/>
			</view>
			
			<view>
				<text>{{i18n.bank}}</text>
				<picker value="index" :range="bankList" range-key="name" @change="bindPickerChange" class="picker_wrap">
				    <view class="picker">
				        {{pickerName}}
				        <image src="@/static/images/game/xialh.png" class="select"></image>
				    </view>
				</picker>
				<!-- <u-picker mode="selector" v-model="show"   :default-selector="[0]" :range="bankList" range-key="name">
					
				</u-picker> -->
			</view>
			
			<view>
				<text>{{i18n.card}}</text>
				<input type="number" v-model="card" :placeholder="i18n.place_card" confirm-type='done' placeholder-class="input-placeholder"/>
			</view>
		</view>
		
		<view class="submit" @click="submit">{{i18n.submit}}</view>
		
	</view>
</template>

<script>
	import uPicker from '../../uview-ui/components/u-picker/u-picker'
	export default {
        name: 'bindCard',
		data() {
			return {
                realName:"",
                bankName:"",
                card:"",
                isDisabled:true,
				bankList:[],
				pickerName:'',
				show:true
			}
		},
		components:{
			uPicker
		},
        computed: {
            i18n () {
               return this.$t("bindcard")
            }
        },
        onLoad(){
			this.getBanks()
        	this.userName =  uni.getStorageSync('realName');
            if(!this.userName){
                this.isDisabled = false;
            }
            else{
                this.realName = this.userName;
            }
        },
        
        onShow(){
        	
        },
        onReady(){
        	uni.setNavigationBarTitle({
        		title:this.i18n.head_title
        	})
        },
        
		methods: {
			bindPickerChange(e){
				this.index = e.detail.value;
				this.pickerName = this.bankList[this.index].name;
			},	
			getBanks(){
				this.$tools.Post("dock/system/config/banks").then((res) =>{
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
						this.bankList = arrObj
				    } else {
				        uni.showToast({
				            title: res.errMsg,
				            duration: 1500,
				            icon:'error',   
				        });
				    }
				})
			},
			submit(){
                if(this.realName == ''){
                    uni.showToast({
                        title: this.i18n.place_user,
                        duration: 1500,
                        icon:'none'
                    });
                    return false
                } else if(this.pickerName == ''){
                    uni.showToast({
                        title: this.i18n.place_bank,
                        duration: 1500,
                        icon:'none'
                    });
                    return false
                }else if(this.card == ''){
                    uni.showToast({
                        title: this.i18n.place_card,
                        duration: 1500,
                        icon:'none'
                    });
                    return false
                }
                uni.showLoading()
                let pamars = this.userName?{bankName:this.pickerName,card:this.card}:{realName:this.realName,bankName:this.pickerName,card:this.card}
                this.$tools.Post("dock/member/bank/add",pamars).then((res) =>{
                    if(res.errCode == 0){
						uni.hideLoading()
                        uni.showToast({
                            title: this.i18n.succ,
                            duration: 1500,
                            icon:'success',
                            success(){
                                uni.navigateBack({
                                    delta: 1
                                });
                            }
                        });
                    } else {
                        uni.showToast({
                            title: res.errMsg,
                            duration: 1500,
                            icon:'error',   
                        });
                    }
                })
            }
		}
	}
</script>

<style scoped lang="less">
	.select{
	    width: 22rpx;
	    height: 22rpx;
	    margin-top: 1px;
		position: absolute;
		right: 0;
	}
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
						width: 146rpx;
						text-align: right;
						font-size: 28rpx;
						color: #333333;
					}
					.input-placeholder{
						font-size: 28rpx;
						font-weight: 500;
						color: #CCCCCC;
					}
					input,.picker_wrap{
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

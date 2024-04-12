<template>
	<view class="list_wrap">
		<view class="list" v-for="(item,index) in list" :key='index' @click="jumpLink(item)">
			<view class="list-item">
				<view class="left">{{item.title}}</view>
				<view class="right">
					<image></image>
				</view>
			</view>
			
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		computed: {
		    i18n () {
		       return this.$t("mine")
		    }
		},
		onShow() {
			
		},
		onReady() {
			uni.setNavigationBarTitle({
				title:this.i18n.lian
			})
		},
		created() {
			this.getServiceUrl()
		},
		methods:{
			// 获取客服链接
			getServiceUrl(){
			    this.$tools.Post("dock/system/config/get").then((res) =>{
			        if(res.errCode == 0){
			         
			            this.list = res.kefu
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
				
			        //#ifdef H5
			            location.href = item.href
			        //#endif
			        
			        //#ifdef APP-PLUS
			            // plus.runtime.openWeb(item.path);
			            plus.webview.open(item.href)
			        //#endif
			    
			},
		}
	}
</script>

<style scoped lang="less">
	.list_wrap{
		padding: 20rpx 30rpx;
		height: 100%;
		min-height: 100vh;
		background: #fff;
	}
	.list-item{
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #ddd;
		.left{
			font-size: 16px;
			color: #000;
		}
		.right{
			display: flex;
			align-items: center;
			image{
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
</style>
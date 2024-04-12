<template>
	<view class="businessWrap">
		<!-- 内容 -->
		<view class="youhui">{{i18n.head_title}}</view>
		<view class="list_box">
			<!-- 菜单左边 -->
			<view class="left">
				<scroll-view :scroll-y="true" :show-scrollbar="false" :scroll-into-view="scrollInto" :style="{ 'height':scrollHeight }">
					<view class="item" v-for="(item,index) in leftArray" :key="index" :id='"item-"+index' :class="{ 'active':index==leftIndex }"
					 :data-index="index" @tap="leftTap($event, index, item)">{{item.main_name}}</view>
				</scroll-view>
			</view>
			<view class="main">
				<scroll-view :scroll-y="true" :style="{ 'height':scrollHeight }" scroll-with-animation="true" @touchstart="mainTouch" id="scroll-el">
					<block>
						<view class="listItem">
							<view class="title">
								<text style="color: #999;">一</text>
								<text style="margin-left: 10rpx;margin-right: 10rpx;color: #333;">{{main_name}}</text>
								<text style="color: #999;">一</text>
							</view>
							<view class="goods">
								<view class="boxItem" v-for="(item,index) in mainArray" :key="index" @tap="gotoSearchLists(item,index)">
									<image :src="item.img"></image>
									<view class="texts">{{item.title}}</view>
									<view v-if="item.timeOpen">
										<view class="time_css" v-if="item.timeOpen>=600">
										
										   {{Math.floor(item.timeOpen/60)}}:
										   <span v-if="item.timeOpen - (Math.floor(item.timeOpen/60)*60)>=10">
												{{item.timeOpen - (Math.floor(item.timeOpen/60)*60)}}
										   </span>
										   <span v-else>
												0{{item.timeOpen - (Math.floor(item.timeOpen/60)*60)}}
										   </span>
										</view>
										<view class="time_css" v-else-if="item.timeOpen<600">
											0{{Math.floor(item.timeOpen/60)}}:
											<span v-if="item.timeOpen - (Math.floor(item.timeOpen/60)*60)>=10">
												{{item.timeOpen - (Math.floor(item.timeOpen/60)*60)}}
											</span>
											<span v-else>
												0{{item.timeOpen - (Math.floor(item.timeOpen/60)*60)}}
											</span>
										</view>
										<view class="time_css" v-else-if="item.timeOpen<60">
											00:
											<span v-if="item.timeOpen>9">
											  {{item.timeOpen}}
											</span>
											<span v-else>
											   0{{item.timeOpen}}
											</span>
										</view>
									</view>
									<view v-else>
										{{i18n.padding}}...
									</view>
									<view class="red_text">{{item.subtitle}}</view>
									
									
								</view>
							</view>
						    <view style="height: 160rpx;"></view>
						</view>
					</block>
				</scroll-view>
			</view>
		</view>
		<bottom :num="3"></bottom>
		<a-tc></a-tc>
	</view>
</template>

<script>
	import bottom from '../home/bottom.vue'
	export default {
		data() {
			return {
                scrollHeight: '500rpx',
                scrollInto:"", // 滚动的id名
                cid:'', // cid
                isMainScroll: false,
                leftIndex: 0, // 下标
				leftArray: [
                    {id: 0,main_name: '全部'},
                    {id: 1,main_name: '商家列表'}
                ], //左边导航
                main_name: '全部',
				mainArray: [], //右边列表
				timer:null,
			}
		},
		components:{
			bottom
		},
		computed: {
		    i18n () {
		       return this.$t("business")
		    }
		},
		onShow() {
			this.leftArray = [
				{id: 0,main_name: this.i18n.all},
				{id: 1,main_name: this.i18n.shop}
			]
			this.main_name = this.i18n.all
			this.getOpenTime()
		},
        onLoad() {
        	uni.getSystemInfo({
        		success: (res) => {
        			/* 设置当前滚动容器的高，若非窗口的告诉，请自行修改 */
        			// #ifdef APP-PLUS
        			this.scrollHeight = `${res.windowHeight - 55}px`;
        			// #endif
        			// #ifdef H5 || MP-WEIXIN
        			this.scrollHeight = `${res.windowHeight - 45}px`;
        			// #endif
        			console.log('gaodu', res.windowHeight)
        		}
        	});
        	//获取列表数据
        	this.getListData();
        },
		mounted() {
			
		},
		onUnload() {
			clearInterval(this.timer)
			this.timer = null
		
		},
		onHide() {
			clearInterval(this.timer)
			this.timer = null
			
		},
		unmounted() {
			clearInterval(this.timer)
			this.timer = null
		
		},
		methods: {
            getOpenTime(){
            	if(this.timer == null){
            		this.timer = setInterval(()=>{
            			this.getListData()
            		},1000)
            	}
            },
            /* 获取列表数据 */
            getListData() {
            	let self = this
				let params = {
				    pageIndex: 1,
				    pageSize: 99,
				}
            	this.$tools.Post('dock/product/product/all',params).then(function(res){
            		if(res.errCode == 0){
            			self.mainArray = res.dataSet  // 初始化第一条数据
                        uni.setStorage({
                            key: 'brandList',
                            data: res.dataSet,
                            success: function () {
                                console.log('success');
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
            // 跳转品牌内页
            gotoSearchLists (row,index){
            	uni.navigateTo({
            		url: '../business/businessList?id='+row.id + '&Index='+ index
            	});
            },
            
            /* 主区域触摸 */
            mainTouch() {
            	this.isMainScroll = true;
            },
			/* 左侧导航点击 */
			leftTap(e, index, item) {
                console.log(item)
				let inds = e.currentTarget.dataset.index;
				this.isMainScroll = false;
                this.main_name = item.main_name;
				this.leftIndex = Number(index);
				this.scrollInto = `item-${inds}`;
			}
		}
	}
</script>

<style scoped>
	.youhui{
		height:88rpx;
		text-align: center;
		font-family: PingFang SC;
		font-weight: bold;
		color:#fff;
		font-size:32rpx;
		line-height: 88rpx;
		background-color: #E6241A;
	}
    @import url('../../static/css/mian.css'); 
    page{background: #f4f4f4 !important;height: 100%;}
    .businessWrap{height: 100%;overflow: hidden;}
    /* 内容 */
    .list_box {height: 100%;overflow: hidden;display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: flex-start;align-items: flex-start;align-content: flex-start;font-size: 28rpx;}
    .left {height: 100%;width: 199rpx;background-color: #fff;line-height: 90rpx;box-sizing: border-box;font-size: 32rpx;text-align:center;}
    .item {padding-left: 20rpx;position: relative;}
    .item.active {color: #E6241A;background-color: #F5F5F5;}
    
    .main {padding:0 20rpx;width: 0;flex-grow: 1;box-sizing: border-box;height: 100%;overflow: hidden;}
    .listItem{text-align: center;}
    .tips {line-height: 64rpx;font-size: 24rpx;font-weight: bold;color: #666;height: 64rpx;position: fixed;top: 44px;right: 0;width: 530rpx;z-index: 10;background-color: #fff;padding-left: 10rpx;}
    .title {line-height: 90rpx;position: relative;font-size: 30rpx;color: #666;height: 90rpx;text-align: center;}
    .goods {display: flex; flex-wrap: wrap;justify-content: space-between;}
    .goods .boxItem{
		width: 48%;
		background: #fff;
		margin-bottom: 20rpx;
		padding-top: 30rpx;
		padding-bottom: 30rpx;
		border-radius: 6px;
	}
    .goods .boxItem image {
		width: 140rpx;height:140rpx;
		margin: 0 auto;
		border-radius: 50%;
	}
    .texts {font-size: 26rpx;color: #333;padding: 5px 0;overflow: hidden;}
	.red_text{
		text-align: center;
		font-size: 14px;
		color: #E6241A;
	}
	.time_css{
		text-align: center;
		font-size: 14px;
		color: #000;
		margin: 6rpx 0;
	}
</style>

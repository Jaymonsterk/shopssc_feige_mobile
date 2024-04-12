<template>
	<view class="noticeList">
		<view class="list_item" v-for="(item, index) in noticeList" :key="index" @tap="gotoDetail(item)">
			<view class="item_title">{{item.title}}</view>
            <view class="item_time">{{item.timeCreated | formatMD}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "noticeList",
		data() {
			return {
				noticeList: [],
                pageIndex: 1,
                pageSize: 10,
				status: 'more',
                hasMore: false,
			}
		},
		onLoad() {
			this.queryByInput() // 获取公告列表
		},
		computed: {
		    i18n () {
		       return this.$t("notice")
		    }
		},
        onShow() {
            
        },
		onReady() {
			uni.setNavigationBarTitle({
				title:this.i18n.notice
			})
		},
		//下拉刷新
		onPullDownRefresh(){
		    uni.stopPullDownRefresh();
		    this.noticeList = [];
		    this.queryByInput()
		},
		//上拉加载
		onReachBottom(){
		    if (this.status == 'noMore'){
		        return;
		    }
		    this.pageIndex ++;
		    this.getMessageAll(); // 获取活动列表
		},
		methods: {
			
			// 初始数据
			queryByInput(){
			    this.pageIndex = 1;
			    this.getMessageAll(); //获取公告列表
			},
			
			// 获取公告列表
			getMessageAll(){
				var that = this;
				let params = {
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				}
			    this.$tools.Post("dock/system/message/all",params).then((res) =>{
					//这里只会在接口是成功状态返回
					that.hasMore = res.hasMore
					//第一次加载时，若只有一页数据
					if(that.noticeList.length == 0) {
					    that.status = 'more'
					    that.noticeList = that.noticeList.concat(res.dataSet)
					    if(res.hasMore == false) {
					        that.status = 'noMore'
					        return false;
					    } 
					} else {
					    if(res.hasMore == false) {
					        that.status = 'noMore'
							that.noticeList = that.noticeList.concat(res.dataSet)
					        return false;
					    } else {
					        that.status = 'more'
					        that.tableList = that.tableList.concat(res.dataSet)
					    }
					}
			    })
			},
            
			// 详情页
			gotoDetail(item){
				uni.navigateTo({
				    url: '/pages/home/noticeDetail?cid='+ item.id
				});
			}
		}
	}
</script>

<style scoped lang="less">
	page{
		background: #FFFFFF;
		.noticeList{
			padding: 10rpx 20rpx;
			.list_item{
				padding: 20rpx 0;
				border-bottom: 1rpx solid #dedede;
				.item_title{
					font-size: 28rpx;
					color: #666;
				}
				.item_time{
					font-size: 24rpx;
					margin-top: 10rpx;
					color: #989898;
				}
			}
		}
	}
</style>

<template>
	<view class="activityWrap">
		<view class="youhui">{{i18n.title}}</view>
		<!-- <view class="listItem" v-for="(item, index) in tableList" :key="index" @click="gotoDetail(item)">
		    <view class="item_img">
		        <image :src="item.img" mode=""></image>
		    </view>
            <view class="item_cont">
                <view class="item_text">
                    {{item.title}}
                </view>
                <text class="item_icons"></text>
            </view>
		</view> -->
       <!-- <view class="example-body">
            <uni-load-more :status="status" :content-text="contentText"/>
        </view> -->
		<view class="vip" v-for="(item,index) in levelArr" :key="index">
			<image :src="'/static/images/vip/'+index+'.png'"></image>
			<view class=" vip-title vip1">
				{{item.title}}
			</view>
			<view class="jifen">
				{{item.money}}{{i18n.jifen}}
			</view>
		</view>
		<view style="height: 160rpx;"></view>
		<bottom :num='4'></bottom>
		<a-tc></a-tc>
	</view>
</template>

<script>
    import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import bottom from '../home/bottom.vue'
	export default {
        name: "activityWrap",
        components: {
            uniLoadMore,
			bottom
        },
		data() {
			return {
				total: 0,
                pageIndex: 1,
                pageSize: 10,
                hasMore: false,
                tableList: [],
                status: 'more',
                contentText: {
                    contentdown: '查看更多',
                    contentrefresh: '加载中',
                    contentnomore: '没有更多了'
                },
				levelArr:[]
			}
		},
		computed: {
		    i18n () {
		       return this.$t("activity")
		    },
			more() {
				return this.$t("contentText")
			}
		},
		onShow() {
			this.contentText = {
				contentdown: this.more.contentdown,
				contentrefresh: this.more.contentrefresh,
				contentnomore: this.more.contentnomore
			}
		},
        onLoad() {
            this.queryByInput()
			this.getList()
        },
        
        //上拉加载
        onReachBottom(){
            if (this.status == 'noMore'){
                return;
            }
            this.pageIndex ++;
            console.log(this.pageIndex)
            this.getActivityList(); // 获取活动列表
        },
        
        //下拉刷新
        onPullDownRefresh(){
            uni.stopPullDownRefresh();
            this.tableList = [];
            this.queryByInput()
        },
		methods: {
			getList(){
				var that = this;
				this.$tools.Post('dock/member/member/levels').then(function(res) {
				      that.levelArr = res.dataSet  
				}).catch(function(error) {
				    //这里只会在接口是失败状态返回，不需要去处理错误提示
				    console.log(error);
				});	
			},
			// 初始数据
            queryByInput(){
                this.pageIndex = 1;
                this.getActivityList(); //获取活动列表
            },
            
            //获取活动列表
            getActivityList: function() {
                var that = this;
                var params = {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
                }
                this.$tools.Post('dock/system/activity/all', params).then(function(res) {
                    //这里只会在接口是成功状态返回
                    that.hasMore = res.hasMore
                    //第一次加载时，若只有一页数据
                    if(that.tableList.length == 0) {
                        that.status = 'more'
                        that.tableList = that.tableList.concat(res.dataSet)
                        if(res.hasMore == false) {
                            that.status = 'noMore'
                            return false;
                        } 
                    } else {
                        if(res.hasMore == false) {
                            that.status = 'noMore'
							that.tableList = that.tableList.concat(res.dataSet)
                            return false;
                        } else {
                            that.status = 'more'
                            that.tableList = that.tableList.concat(res.dataSet)
                        }
                    }
                }).catch(function(error) {
                    //这里只会在接口是失败状态返回，不需要去处理错误提示
                    console.log(error);
                });
            },
            
            // 详情页
            gotoDetail(item){
				console.log(item)
            	uni.navigateTo({
            	    url: '/pages/home/noticeDetail?id='+ item.id
            	});
            }
		}
	}
</script>

<style scoped lang="less">
	.vip{
		margin:0 20rpx 20rpx;
		position: relative;
		image{
			width: 100%;
			height: 200rpx;
		}
		.vip-title{
			font-size: 20px;
			font-family: PingFang SC;
			font-weight: 800;
			font-style: italic;
			position: absolute;
			top: 50rpx;
			right: 60rpx;
		}
		.vip1{
			color: #3F4761;
		}
		.jifen{
			position: absolute;
			bottom: 54rpx;
			right: 60rpx;
			font-size: 14px;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
		}
	}
    page{
        background: #F5F5F5;
        .activityWrap{
            position: fixed;
			top:0;
			left:0;
			bottom:0;
			right:0;
			background: url(../../static/images/mine/hsddbj.png) no-repeat center;
			background-size:cover;
			overflow: scroll;
			.youhui{
				height:88rpx;
				text-align: center;
				font-family: PingFang SC;
				font-weight: bold;
				color:#fff;
				font-size:32rpx;
				line-height: 88rpx;
			}
            .listItem{
                border-radius: 10rpx;
				margin:0 auto;
                margin-bottom: 20rpx;
				width:690rpx;
				
                .item_img{
                    width: 100%;
                    height: 280rpx;
                    border-radius: 10rpx;
                    image{
                        width: 100%;
                        height: 100%;
                        border-radius: 10rpx 10rpx 0rpx 0rpx;
                    }
                }
                .item_cont{
                    padding: 25rpx 20rpx;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: #FFFFFF;
                    .item_text{
                        flex: 1;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        font-size: 28rpx;
                        color: #333333;
                    }
                    .item_icons{
                        width: 13rpx;
                        height: 24rpx;
                        background: url(../../static/images/mine/arrow_right.png) no-repeat center center;
                        background-size: 13rpx 24rpx;
                    }
                }
            }
        }
    }
.example-body{
	margin-bottom:120rpx;
}
</style>

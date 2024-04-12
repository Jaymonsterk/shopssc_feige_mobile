<template>
	<view class="list_wrap">
		<view class="list" v-for="(item,index) in newsList" :key="index" @click="setNewsReady(item)">
			<view class="item" v-if="item.type != 'alert'">
				<text class="new_type">
					<span v-if="item.typeTitle == '回款提示'">{{myNews.hui}}</span>
					<span v-if="item.typeTitle == '提现拒绝'">{{myNews.ju}}</span>
				</text>
				<text class="money" :class="Number(item.money)<0?'reduce':''">{{item.money}}</text>
			</view>
			
			<view class="item" v-if="item.type != 'alert'">
				<text class="time">{{item.timeCreated | timeDep}}</text>
				<text class="money_type">
				   <span class="substring" v-if="item.content.substring(0,6) == '系统转出金额'">{{myNews.xi}}{{item.content.substring(6)}}</span>
				   <span class="substringNo" v-else>{{item.content}}</span>
				</text>
			</view>
			<view class=" itemMsg" v-if="item.type == 'alert'">
				<view class="item_head">
					 <span v-if="item.title == '提现拒绝'">{{myNews.ju}}</span>
					 <span v-else>{{item.title}}</span>
				</view>
				     <text class="money_type">
				        <span class="substring" v-if="item.content.substring(0,6) == '系统转出金额'">{{myNews.xi}}{{item.content.substring(6)}}</span>
				        <span class="substringNo" v-else>{{item.content}}</span>
				     </text>
				<view class="item_time">
					 {{item.timeCreated | timeDep}}
				</view>
			</view>
		</view>
        
        <view class="example-body">
            <uni-load-more :status="status" color="#000" :content-text="contentText"/>
        </view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newsList:[],
                total: 0,
                pageIndex: 1,
                pageSize: 10,
                hasMore: false,
                status: 'more',
                contentText: {
                    contentdown: '查看更多',
                    contentrefresh: '加载中',
                    contentnomore: '没有更多了'
                }
			}
		},
		onLoad(e){
			this.queryByInput()
		},
		computed: {
		    i18n () {
		       return this.$t("mine")
		    },
			more() {
				return this.$t("contentText")
			},
			myNews() {
				return this.$t("myNews")
			}
		},
		filters:{
			timeDep(timestamp){
				let date;
				if((timestamp + '').length == "10"){
				    date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				}
				else{
				    date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				}
				var Y = date.getFullYear() + "-";
				var M =
				  (date.getMonth() + 1 < 10
					? "0" + (date.getMonth() + 1)
					: date.getMonth() + 1) + "-";
				var D = date.getDate() + " ";
				var h = date.getHours();
				var m = date.getMinutes() ;
				var s = date.getSeconds();
				if(h >=0 && h <=9) {
										h = '0' + h
									}
									if(m >=0 && m <=9) {
										m = '0' + m
									}
									if(s >=0 && s <=9) {
										s = '0' + s
									}
				// return Y + M + D + h + m + s;
				return Y + M + D + h + ":" + m + ":" + s ;
			}
		},
		onShow(){
			this.contentText = {
				contentdown: this.more.contentdown,
				contentrefresh: this.more.contentrefresh,
				contentnomore: this.more.contentnomore
			}
		},
		onReady(){
			uni.setNavigationBarTitle({
				title:this.i18n.msg
			})
		},
        
        //上拉加载
        onReachBottom(){
            if (this.status == 'noMore'){
                return;
            }
            this.pageIndex ++;
            console.log(this.pageIndex)
            this.getNewsList();
        },
        
        //下拉刷新
        onPullDownRefresh(){
            uni.stopPullDownRefresh();
            this.newsList = [];
            this.queryByInput()
        },
        
		methods: {
            // 初始数据
            queryByInput(){
                this.pageIndex = 1;
                this.getNewsList(); 
            },
            
			// 获取消息列表
			getNewsList(){
                var that = this;
                var params = {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
                }
			    this.$tools.Post("dock/member/message/all",params).then((res) =>{
			        if(res.errCode == 0){
			            //这里只会在接口是成功状态返回
			            that.hasMore = res.total
			            //第一次加载时，若只有一页数据
			            if(that.newsList.length == 0) {
			                that.status = 'more'
			                that.newsList = that.newsList.concat(res.dataSet)
			                if(res.total == false) {
			                    that.status = 'noMore'
			                    return false;
			                } 
			            } else {
			                if(res.total == false) {
			                    that.status = 'noMore';
                                that.newsList = that.newsList.concat(res.dataSet)
			                    return false;
			                } else {
			                    that.status = 'more'
			                    that.newsList = that.newsList.concat(res.dataSet)
			                }
			            }
			        } else {
			            uni.showToast({
			                title: res.errMsg,
			                duration: 1500,
			                icon:'none'
			            });
			        }
			    }).catch(function(error) {
                    //这里只会在接口是失败状态返回，不需要去处理错误提示
                    console.log(error);
                });
			},
            
            //消息标为已读
            setNewsReady(item){
                if(item.affirm == "0"){
                    var params = {messageId: item.id}
                    this.$tools.Post("dock/member/message/ready",params).then((res) =>{
                        if(res.errCode == 0){
                            uni.showToast({
                                title: "该消息已标为已读",
                                duration: 1500,
                                icon:'none'
                            });
                        } else {
                            uni.showToast({
                                title: res.errMsg,
                                duration: 1500,
                                icon:'none'
                            });
                        }
                    })
                }
            },
		}
	}
</script>

<style lang="less" scoped>
	.item_head{
		text-align: left;
		font-size: 30rpx;
		margin-bottom: 8rpx;
	}
	.itemMsg{
		
		// border-bottom: 1px solid #ddd;
	}
	.item_time{
		margin-top: 8rpx;
		text-align: right;
		font-size: 20rpx;
		color: #999999;
	}
	page{
		background-color: #fff;
		.list_wrap{
			padding: 0 30rpx;
			font-family: PingFang SC;
			.list{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				// height: 124rpx;
				padding: 20rpx 0;
				border-bottom: 1px solid #E6E6E6;
				.item{
					display: flex;
					align-items: center;
					justify-content: space-between;
					.new_type{
						font-size: 28rpx;
						font-weight: 500;
						color: #333333;
					}
					.money{
						font-size: 28rpx;
						font-weight: bold;
						color: #E6241A;
					}
					.time{
						font-size: 20rpx;
						font-weight: 500;
						color: #999999;
					}
					.money_type{
						font-size: 20rpx;
						font-weight: 500;
						color: #333333;
					}
                    .reduce{
                       color: green;
                    }
				}
			}
		}
	}
	
</style>

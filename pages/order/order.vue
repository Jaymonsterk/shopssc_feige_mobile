<template>
	<view class="container">
        <!-- 自定义导航栏 -->
            <!-- 这里是状态栏 -->
        <view class="nav_bar">
            <view class="status_bar"> </view>
            <view class="nav_wrap">
                <view class="title">{{i18n.order}}</view>
                <picker :value="timeVal" :range="timeArray" range-key="name" @change="bindPickerChange" class="picker_wrap">
                    <view class="picker">
                        <image src="@/static/images/order/time.png" class="time"></image>
                        <text>{{pickerName}}</text>
                        <image src="@/static/images/order/arrow_b.png" class="select"></image>
                    </view>
                </picker>
            </view>    
        </view>
        
		<view class="tabs">
			<view :class="flag==index?'current':''" v-for="(item,index) in tabs" :key='index' @click="tabFun(index, item.val)">
				{{item.name}}
			</view>
		</view>
		
		<view class="list_wrap">
			<view v-for="(item,index) in list" :key='index' class="list" @click="gotoDetail(item)">
				<view>
					<image :src="item.img"></image>
					<text class="name">{{item.title}}</text>
					<text class="data">{{i18n.di}}{{item.expect}}{{i18n.qi}}</text>
				</view>
				<view>
					<text class="match1">{{fieldStr(item)}}</text>
					<!--
				<image src="@/static/images/order/cup.png" class="cup"></image> -->
				<text class="money">{{item.product}}</text>
				</view>
				<view>
					<text class="match">{{i18n.pipei}}{{thousand(Math.floor(Number(item.moneyOrder)))}}{{i18n.jifen}}</text>
					<text v-if="item.isWin == 'win'" class="cg">{{i18n.success}}</text>
					<text v-if="item.isWin == 'padding'" class="dd">{{i18n.padding}}</text>
					<text v-if="item.isWin == 'lose'" class="sb">{{i18n.error}}</text>
				</view>
			</view>
		</view>
		<view class="example-body">
		    <uni-load-more :status="status" :content-text="contentText"/>
		</view>
		
		<bottom :num='2'></bottom>
	</view>
	
</template>

<script>
    
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import bottom from '../home/bottom.vue'
	import {format} from "@/static/js/utils/filters.js"
	export default {
		components: {
		    uniLoadMore,
			bottom
		},
		data() {
			return {
				contentText: {
				    contentdown: '查看更多',
				    contentrefresh: '加载中',
				    contentnomore: '没有更多了'
				},
				flag:0,
                timeVal: 0,
				tabs:[
					{name:"全部", val:''},
					{name:"匹配成功", val:'win'},
					{name:"匹配失败", val: 'lose'},
					{name:"等待匹配", val: 'padding'}
				],
                isWin: '',
                timeCreatedStart: '',
                timeCreatedEnd: '',
                pageIndex: 1,
                pageSize: 10,
                hasMore: false,
                status: 'more',
				// {url:require("@/static/images/order/cup.png"),name:"京东",data:"099888",match:"匹配10.00元",money:"19.9"}
				list:[
					
				],
				pickerName:"全部",
                timeArray:[
                    // {name:"全部",time:"1"},
                    // {name:"今天",time:"2"},
                    // {name:"昨天",time:"3"},
                    // {name:"七天",time:"4"}
                ]
			}
		},
		computed: {
		    i18n () {
		       return this.$t("order")
		    },
			more() {
				return this.$t("contentText")
			}
		},
		onShow() {
			this.timeArray=[
			    {name:this.i18n.all,time:"1"},
			    {name:this.i18n.today,time:"2"},
			    {name:this.i18n.yesday,time:"3"},
			    {name:this.i18n.seven,time:"4"}
			]
			this.pickerName = this.i18n.all
			this.tabs = [
				{name:this.i18n.all, val:''},
				{name:this.i18n.success, val:'win'},
				{name:this.i18n.error, val: 'lose'},
				{name:this.i18n.padding, val: 'padding'}
			]
			// this.contentText = {
			// 	contentdown: this.more.contentdown,
			// 	contentrefresh: this.more.contentrefresh,
			// 	contentnomore: this.more.contentnomore
			// }
			this.contentText = {
				contentdown: '',
				contentrefresh: '',
				contentnomore: ''
			}
			console.log(this.more)
			console.log(this.more.contentdown)
		},
        // 
        onLoad() {
            this.queryByInput()
			
        },
		//下拉刷新
		onPullDownRefresh(){
		    uni.stopPullDownRefresh();
		    this.list = [];
		    this.queryByInput()
		},
        //上拉加载
        onReachBottom(){
            if (this.status == 'noMore'){
                return;
            }
            this.pageIndex ++;
            this.getOrderAll()
        },
		methods: {
			thousand(num) {
			    return  Math.floor(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
			},
			// 初始数据
			queryByInput(){
			    this.pageIndex = 1;
			    this.getOrderAll()
			},
			
			bindPickerChange(e){
                this.timeVal = e.detail.value;
                this.pickerName = this.timeArray[this.timeVal].name;
                let range = this.timeArray[this.timeVal].time;
                let date = (format(new Date())).slice(0, 10)    // 今天的年月日
                let startTime = date + ' ' + '00:00:00'         //今天年月日+00:00:00
                let nowTime = format(new Date());               //当前时间日期
                if(range=="1"){//全部
                    this.timeCreatedStart = "";
                    this.timeCreatedEnd = "";
                }
                else if(range=="2"){//今天
                    this.timeCreatedStart = (new Date(startTime).getTime())/1000;
                    this.timeCreatedEnd = (new Date(nowTime).getTime())/1000;   
                }
                else if(range=="3"){//昨天
                    this.timeCreatedStart = ((new Date(startTime).getTime()) - 24 * 3600 *1000)/1000        //昨天年月日+00:00:00 （秒）
                    this.timeCreatedEnd = (new Date(startTime).getTime())/1000;                            //昨天年月日+23:59:59（秒）
                }
                else if(range=="4"){//七天
                    this.timeCreatedStart = ((new Date(startTime).getTime()) - 7 * 24 * 3600 *1000)/1000;         //七天前年月日+00:00:00 （秒）
                    this.timeCreatedEnd = (new Date(nowTime).getTime())/1000;                               //当前时间转 （秒）
                }
                this.queryByInput()
            },
            
            // 切换
            tabFun(index, val){
                this.flag = index
                this.isWin = val
                this.list = [];
                this.queryByInput()
            },
			
            // 获取订单列表
            getOrderAll(){
				var self = this;
                let params = {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                    isWin: this.isWin,
					timeCreatedStart: this.timeCreatedStart,
					timeCreatedEnd: this.timeCreatedEnd
                }
                this.$tools.Post("dock/product/order/all",params).then((res) =>{
					if(res.errCode == 0){
					    //这里只会在接口是成功状态返回
					    self.hasMore = res.hasMore
					    //第一次加载时，若只有一页数据
					    if(self.list.length == 0) {
					        self.status = 'more'
					        self.list = self.list.concat(res.dataSet)
					        if(res.hasMore == false) {
					            self.status = 'noMore'
					            return false;
					        } 
					    } else {
					        if(res.hasMore == false) {
					            self.status = 'noMore';
								self.list = self.list.concat(res.dataSet)
					            return false;
					        } else {
					            self.status = 'more'
					            self.list = self.list.concat(res.dataSet)
					        }
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
            // 去订单详情页
            gotoDetail(item){
                uni.navigateTo({
                    url: '/pages/order/orderDetail?orderId='+ item.id
                });
            },
			fieldStr(values) {
				let name = ''
				if(values.field == 'quantity'){ // quantity - 单双
					name = values.value == '1' ? this.i18n.dan : this.i18n.shuang
				}else if(values.field == 'size'){// size - 大小
					name = values.value == '1' ? this.i18n.you : this.i18n.tong
				}
				return name
			}
		}
	}
</script>

<style lang="less" scoped>
    @import url('../../static/css/mian.css');
	.container{
		font-family: PingFang SC; 
		position: fixed;
		top:0;
		right:0;
		bottom:0;
		left:0;
		overflow: scroll;
		background: url('../../static/images/orderbg.png') no-repeat center;
		background-size: 100% 100%;
        .nav_bar{
            position: sticky;
            width: 100%;
            left: 0;
            right: 0;
            top:0;
            z-index: 3;
            .status_bar {
                height: var(--status-bar-height);
                width: 100%;
                background-color: #E6241A;
            }
            .nav_wrap{
                height: 88rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #E6241A;
				position: relative;
                .title{
                    font-size: 32rpx;
                    font-weight: bold;
                    color: #FFFFFF;
                }
                .picker_wrap{
                    display: flex;
                    align-items: center;
					position: absolute;
					right: 30rpx;
                    .picker{
                        display: flex;
                        align-items: center;
                        .time{
                            width: 32rpx;
                            height: 32rpx;
                            margin-top: 2px;
                        }
                        text{
                            font-size: 28rpx;
                            font-weight: 500;
                            color: #FFFFFF;
                            padding: 0 10rpx;
                        }
                        .select{
                            width: 22rpx;
                            height: 10rpx;
                            margin-top: 1px;
                        }
                    }
                }
            }
        }
        
		.tabs{
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 100rpx;
			// padding-left: 78rpx;
			// padding-right: 50rpx;
			padding-bottom: 20rpx;
			background: #E6241A;
			border-top:1rpx solid #E6241A;
			position: fixed;
			z-index: 99;
			view{
				font-size: 28rpx;
				font-weight: 500;
				color: #FF6A62;
				flex:1;
			    display: flex;
				align-items: center;
				justify-content: center;
			}
			.current{
				background: url('../../static/images/dikuai.png') no-repeat center;
				background-size: 100% 100%;
				font-weight: bold;
				color: #FFFFFF;
			}
		}
		.list_wrap{
			padding-top: 122rpx;
			width:690rpx;
			margin:0 auto;
			.list{
				width: 100%;
				background: #FFFFFF;
				border-radius: 10rpx;
				view{
					display: flex;
					align-items: center;
					padding: 16rpx 22rpx;
					image{
						width: 28rpx;
						height: 28rpx;
						display: block;
						margin-right: 8rpx;
					}
					text{
						font-size: 28rpx;
						font-weight: 500;
						color: #666666;
					}
					.data{
						font-size: 20rpx;
						color: #666666;
						flex: 1;
						text-align: right;
					}
					.match{
						flex: 1;
						text-align: left;
						margin-left: 28rpx;
						font-size: 28rpx;
						color: #333333;
						font-weight: bold;
					}
					.match1{
						flex: 1;
						text-align: left;
						margin-left: 28rpx;
						font-size: 28rpx;
						color: #333333;
					}
					.cup{
						width: 22rpx;
						height: 22rpx;
						display: block;
						margin-right: 10rpx;
					}
					.money{
						font-size: 28rpx;
						color: #333;
					}
					.cg{
						color: #E8281E !important;
					}
					.dd{
						color: #333333;
					}
					.sb{
						color: #999999 !important;
					}
				}
				
			}
			.list:not(last-child){
				margin-bottom: 10rpx;
			}
		}
	}
.example-body{
	margin-bottom:150rpx;
	
}
</style>

<template>
    <view class="container">
        <!-- 自定义导航栏 -->
        <view class="nav_wrap">
            <text class="backIcon" @tap="navigateBack"></text>
            <view class="title">{{i18n.buy_title}}</view>
            <picker :value="index" :range="timeArray" range-key="name" @change="bindPickerChange" class="picker_wrap">
                <view class="picker">
                    <text>{{pickerName}}</text>
                    <image src="@/static/images/order/arrow_b.png" class="select"></image>
                </view>
            </picker>
        </view>
        
        <view class="list_wrap">
        	<view class="list" v-for="(item,index) in list" :key='index'>
        		<view class="item">
        			<text class="new_type">{{i18n.gou}}</text>
        			<text class="money"><text v-text="Number(item.money)>0?'+':''"></text>{{Math.floor(Number(item.money))}}</text>
        		</view>
        		
        		<view class="item">
        			<text class="time">{{item.timeCreated | format}}</text>
        			<text class="money_type reduce">{{i18n.gou}}</text>
        		</view>
        	</view>
            
            <view class="example-body">
                <uni-load-more :status="status" color="#000" :content-text="contentText"/>
            </view>
        </view>
		
    </view>
</template>

<script>
    import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import {format} from "@/static/js/utils/filters.js"
	export default {
		data() {
			return {
                total: 0,
                pageIndex: 1,
                pageSize: 10,
                timeCreatedStart:"",
                timeCreatedEnd:"",
                hasMore: false,
                status: 'more',
                contentText: {
                    contentdown: '查看更多',
                    contentrefresh: '加载中',
                    contentnomore: '没有更多了'
                },
                title:"",
				type:"",
                index:0,
                pickerName:"全部",
                timeArray:[
                    {name:"全部",time:"1"},
                    {name:"今天",time:"2"},
                    {name:"昨天",time:"3"},
                    {name:"七天",time:"4"}
                ],
                list:[]
			}
		},
		onLoad(e){
            this.queryByInput()
		},
        
		computed: {
		    i18n () {
		       return this.$t("bill")
		    },
			more() {
				return this.$t("contentText")
			}
		},
		onShow(){
			this.timeArray = [
		            {name:this.i18n.all,time:"1"},
		            {name:this.i18n.today,time:"2"},
		            {name:this.i18n.yesday,time:"3"},
		            {name:this.i18n.seven,time:"4"}
		    ],
			this.pickerName = this.i18n.all
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
		},
        
		onReady(e){

		},
        
		methods: {
            // 初始数据
            queryByInput(type){
                this.pageIndex = 1;
                this.list = [];
                this.getRechargeList()
            },
            
            //上拉加载
            onReachBottom(){
                if (this.status == 'noMore'){
                    return;
                }
                this.pageIndex ++;
                console.log(this.pageIndex)
                this.getRechargeList()
            },
            
            //下拉刷新
            onPullDownRefresh(){
                uni.stopPullDownRefresh();
                this.list = [];
                this.queryByInput()
            },
                      
            // 获取购单列表
            getRechargeList(){
                var that = this;
                var params = {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                    timeCreatedStart:this.timeCreatedStart,
                    timeCreatedEnd:this.timeCreatedEnd
                }
                this.$tools.Post("dock/member/recharge/all",params).then((res) =>{
                    if(res.errCode == 0){
                        //这里只会在接口是成功状态返回
                        that.hasMore = res.hasMore
                        //第一次加载时，若只有一页数据
                        if(that.list.length == 0) {
                            that.status = 'more'
                            that.list = that.list.concat(res.dataSet)
                            if(res.hasMore == false) {
                                that.status = 'noMore'
                                return false;
                            } 
                        } else {
                            if(res.hasMore == false) {
                                that.status = 'noMore';
                                that.list = that.list.concat(res.dataSet)
                                return false;
                            } else {
                                that.status = 'more'
                                that.list = that.list.concat(res.dataSet)
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
            
            bindPickerChange(e){
            	this.index = e.detail.value;
            	this.pickerName = this.timeArray[this.index].name;
                let range = this.timeArray[this.index].time;
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
            
			navigateBack(){
                uni.navigateBack({
                    delta: 1
                });
            }
		},
       
        
        components:{
            uniLoadMore
        }
	}
</script>

<style lang="less" scoped>
	page{
        .container{
            
            .nav_wrap{
                position: sticky;
                left: 0;
                right: 0;
                top:0;
                width: 100%;
                height: 90rpx;
                padding-right: 30rpx;
                padding-left: 30rpx;
				// padding-top: 40rpx;
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: #E6241A;
                .backIcon{
                    height: 60rpx;
                    width: 60rpx;
                    border-radius: 50%;
                    background: url('../../static/images/fanh.png') no-repeat center center;
                    background-size: 36rpx 36rpx;
                }
                .title{
                    font-size: 32rpx;
                    font-weight: bold;
                    color: #FFFFFF;
                }
                .picker_wrap{
                    display: flex;
                    align-items: center;
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
            .list_wrap{
            	padding: 0 30rpx;
            	font-family: PingFang SC;
            	.list{
            		display: flex;
            		flex-direction: column;
            		justify-content: space-between;
            		height: 124rpx;
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
		
	}
	
</style>

<template name="pageHead">
    <view class="pageHead">
        <view class="header-wrap">
            <view class="indexHeader">
                <!-- left  -->
                <view class="index-header-hd">
                    <view class="leftWrap">
						<view class="surplus" v-if="isSurplus" @click="goToCenter">
							<slot name="left">
							    <text class="iconfont" v-if="rightIcon" @click="rightIconClick"></text>
							    <text  v-if="rightTxt" @click="rightClick()">{{rightTxt}}</text>
							</slot>
						</view>
                        <text class="backIcon" v-if="isShoeBack" @click="goToBack"></text>
                        <text class="leftTitle" v-if="leftTxt">{{leftTxt}}</text>
                    </view>
                </view>
                <!-- content -->
                <view class="index-header-bd">
                    <slot name="content">
                        <view class="input-wrap" v-if="title">{{title}}</view>
                    </slot>
                </view>
                <!-- right -->
                <view class="index-header-ft">
                    <view class="map-wrap">
                        <slot name="right">
                            <text class="iconfont" v-if="rightIcon" @click="rightIconClick"></text>
                            <text  v-if="rightTxt" @click="rightClick()">{{rightTxt}}</text>
                        </slot>
                    </view>
                </view>
            </view>
        </view>
        <view class="blank"></view>
    </view>
</template>
 
<script>
    export default {
        name: "pageHead",
        props: {
			isShoeBack: {
				type: Boolean,
				default: false,
			},
            leftTxt: {//返回按钮文字
				type: String,
				default: ''
			},
			isSurplus:{
				type:Boolean,
				default:false
			},
            title: {//标题
				type: String,
				default: ''
			},
            rightIcon: {//右边图标
				type: Boolean,
				default: false,
			},
            rightTxt: {//右边文字
				type: String,
				default: ''
			}, 
			headStyle: {
				type: Object,
				default(){
					return {
						fontSize: "28", //字体大小(rpx)
						textColor: "#fff", //字体颜色
						backColor: "#FFFFFF", //背景色
					}
				}
			}
        },
        data () {
            return {
                value: '',
				hdStyle: {
					fontSize: "", //字体大小(rpx)
					textColor: "", //字体颜色
					backColor: "", //背景色
				}
            }
        },
		mounted() {
			
		},
        methods: {
			//返回上一层
			goToBack(){
				uni.navigateBack({
					
				})
			},
			goToCenter(){
				uni.switchTab({
					url:'/pages/mine/mine'
				})
			},
			//点击右边文字
            rightClick() {
				this.$emit("eventName")
            },
			//筛选
			rightIconClick(){
				this.$emit("eventName")
			}
        }
    }
</script>

<style scoped lang="less">
	
	.pageHead{
            view,
            image,
            text {
              box-sizing: content-box;
              flex-shrink: 0;
            }
		.header-wrap {
            width: 100%;
            position: fixed;
            top: 0;
            z-index: 999;
            
            
            .indexHeader{
                height: 88rpx;
                line-height: 88rpx;
                padding: 0 30rpx;
                /* #ifdef APP-PLUS */
                padding-top: 70rpx;
                /* #endif */
                background-color: transparent;
                font-size: 28rpx;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: space-between;
                // left
                .index-header-hd{
                    font-size: 32rpx;
                    display: flex;
                    align-items: center;
                    .leftWrap{
                        position: relative;
                        width: auto;
                        margin: 0 4rpx;
                        word-break: keep-all;
                        white-space: pre;
                        cursor: pointer;
                        box-sizing: border-box;
                        .backIcon{
                            width: 36rpx;
                            height: 36rpx;
                            text-align: center;
                            display: block;
                            margin-right: 15rpx;
                            background: url(../../static/images/fanh.png) no-repeat center center;
                            background-size:36rpx 36rpx;
                        }
                        .leftTitle {
                            font-size: 36rpx;
                            color: #37416B;
                        }
                    }
                }
                // content
                .index-header-bd{
                    position: absolute;
                    left: 140rpx;
                    right: 140rpx;
                    min-width: 0;
                    .input-wrap {
                        font-weight: 600;
                        font-size: 32rpx;
                        line-height: 60rpx;
                        opacity: 1;
                        text-align: center;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
                // right
                .index-header-ft{
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: flex;
                    -webkit-box-align: center;
                    -webkit-align-items: center;
                    align-items: center;
                    -webkit-box-orient: horizontal;
                    -webkit-box-direction: reverse;
                    -webkit-flex-direction: row-reverse;
                    flex-direction: row-reverse;
                    font-size: 28rpx;
                    .map-wrap{
                        position: relative;
                        width: auto;
                        margin: 0 2px;
                        // word-break: keep-all;
                        // white-space: pre;
                        cursor: pointer;
                        .iconfont {
                            overflow: hidden;
                            min-width: 1em;
                        }
                        text {
                            font-size: 28rpx;
                            color: #FFFFFF;
                        } 
                    }
                }
            }    
		}    
		.blank {
			height: 88rpx;
			height: calc(88rpx + env(safe-area-inset-top));
			/* #ifdef APP-PLUS */
			height: 156rpx;
			/* #endif */
		}
	}
	
    
</style>
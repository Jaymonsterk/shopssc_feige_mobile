<template>

    <view class="home" >
		<!-- <a-tc></a-tc> -->
		<header-top :title="headTitle" :isSurplus="true">
			<template v-slot:left>
				<image src="../../static/images/heade_icon.png" class="left_icon"></image>
				<text class="surplus">{{userInfo.money}}</text>
			</template>
			<template v-slot:right>
				<image src="../../static/images/sy_xx.png" class="right_icon" @click="gotoMsg()"></image>
				<text class="dian" style="font-size: small;" v-if="userInfo.noReady >= 1"><span style="position: absolute;
    top: -15px;
    left: 4px;
    color: #fff;">{{userInfo.noReady}}</span></text>
			</template>
		</header-top>
        <!-- 头部 -->
        <view class="content">
        	<!-- 轮播图 -->
        	<view class="uni-padding-wrap">
        	    <view class="page-section swiper">
        	        <view class="page-section-spacing">
        	            <swiper class="swiper" :indicator-dots="indicatorDots" :circular="true" :autoplay="autoplay" :interval="interval" :duration="duration" indicator-color="rgba(0, 0, 0, .3)" indicator-active-color="#FFFFFF">
        	                <swiper-item v-for="(item, index) in imgList"  :key="index">
        	                    <image style="width: 100%;height:100%;" :src="item" :id="index"></image>
        	                </swiper-item>
        	            </swiper>
        	        </view>
        	    </view>
        	</view>
        </view>
        <!-- 热点-->
        <view class="hotspotWrap">
			<!--
            <view class="hotspotItem" v-if="noticeList.length>0" @click="gotoMsg()">
                <image src="../../static/images/sy_red.png" class="left_img" mode=""></image>
                <view class="right_text">
                    {{noticeList[0].title}}
                </view>
            </view>-->
		<!-- 	<image src="../../static/images/laba.png" class="redain"></image> -->
			<u-notice-bar class='ertyf' :icon="false"   :list="noticeList" color="#fff" bg-color="transparent" >

			</u-notice-bar>
        </view>

        <!-- 消息弹窗 -->
        <!-- <a-tc></a-tc> -->
        <!-- 热门商家 -->
        <view class="activity">
            <view class="activityTitleWrap">

                <text class="ac-title disd">{{i18n.hot}}</text>

            </view>
            <view class="banner-gap">
            	<view class="container">
            		<view class="item-warp" v-for="(item, index) in brand"  :key="index" @click="toDetail(item,index)">
                        <view class="itemWrap_left">
                            <image :src="item.img" mode=""></image>
                        </view>
            			<view class="itemWrap_right">
            			    <view class="itemWrap_right_title">{{item.title}}</view>
                            <view class="itemWrap_right_text">{{item.subtitle}}</view>
            			</view>
            		</view>
            	</view>
            </view>
        </view>

        <!-- start 收益专栏 -->
        <!-- <view class="activity">
            <view class="activityTitleWrap">

                <text class="ac-title">收益专栏</text>

            </view>
            <view class="profitWrap">
                <view class="broadcastTopBtm" :style="'font-size:'+broadcastStyle.font_size+'rpx;color:'+broadcastStyle.text_color+';background:'+broadcastStyle.back_color+';height:'+broadcastStyle.viewHeight+'rpx;--scrollHeight--:'+(-broadcastTopBtmHeight/2)+'px;--scrollSpeed--:'+((broadcastTopBtmHeight/2)/broadcastStyle.speed)+'s;'">
                    <view class="broadcastDataTopBtmDatacss_top">
                        <view class="profitCont" v-for="(item, index) in profitList" :key="index">
                            <view class="Cont_item_top">
                                <view class="item_top_left">
                                    <image src="/static/images/heade_icon.png" mode=""></image>
                                    <text>{{item.name}}</text>
                                </view>
                                <view class="item_top_right">{{item.time}}分钟前</view>
                            </view>
                            <view class="Cont_item_bott">
                                <view class="item_bott_con">
                                    <image :src="item.img" mode=""></image>
                                    <view class="profitText">在{{item.title}}赚取差价收益
                                        <text class="money">{{item.money}}</text>元
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view> -->
        <!-- end 收益专栏 -->
        <view class="message-layer" v-if="noticeLayerIsShow">
        	<view class="content-box">
        		<view class="bg-image">
        			<image src="../../static/images/tcbjt.png" mode="widthFix"></image>
        			<view class="box">
        				<view class="title">{{strTitle}}</view>
        				<view class="content">
							<rich-text :nodes="strings"></rich-text>
        					<!-- <rich-text :nodes="allList.content"></rich-text> -->
        				</view>
        				<view class="btns">
        					<view @click="changeMessageLayer">{{contentText.cancel}}</view>
        					<view class="look" @click="goHomeDetail">{{i18n.look}}</view>
        					<!-- <navigator class="look" click="goHomeDetail">查看</navigator> -->
        				</view>
        			</view>
        		</view>
        		<!-- <view class="close" @click="changeMessageLayer">
        			<image src="../../static/images/guanbi.png"></image>
        		</view> -->
        	</view>
        </view>
		<view style="height: 160rpx;"></view>
		<bottom :num='1'></bottom>
		<a-tc></a-tc>
    </view>

</template>

<script>
	import HeaderTop from '../../components/common/headertopBar.vue'
	import bottom from './bottom.vue'
	export default {
		name: 'home',
		components:{
			HeaderTop,
			bottom
		},
		data() {
			return {
				userInfo:{},
				indicatorDots: true, //是否显示面板指示点
				autoplay: true, //是否自动切换
				interval: 2000, //自动切换时间间隔
				duration: 500, // 滑动时长

                noticeList: [], // 公告
				imgList:[], // require("@/static/images/ssd.jpg")
				// 商家
    //             {img: require("@/static/images/brand/slyg.png"), title: "苏宁易购", content: "全天15483单"},
    //             {img: require("@/static/images/brand/ymt.png"), title: "洋碼頭", content: "3分钟1单"},
    //             {img: require("@/static/images/brand/yamx.png"), title: "亚马逊", content: "全天15483单"},
    //             {img: require("@/static/images/brand/wph.png"), title: "唯品会", content: "1分钟1单"},
    //             {img: require("@/static/images/brand/kus.png"), title: "寺库", content: "全天15483单"},
    //             {img: require("@/static/images/brand/taob.png"), title: "淘宝网", content: "全天15483单"},
    //             {img: require("@/static/images/brand/pdd.png"), title: "拼多多", content: "全天15483单"},
    //             {img: require("@/static/images/brand/mgj.png"), title: "蘑菇街", content: "全天15483单"},
    //             {img: require("@/static/images/brand/jhs.png"), title: "聚美优品", content: "全天15483单"},
    //             {img: require("@/static/images/brand/jmyp.png"), title: "聚划算", content: "全天15483单"},
    //             {img: require("@/static/images/brand/jd.png"), title: "京东", content: "全天15483单"},
    //             {img: require("@/static/images/brand/hbl.png"), title: "红布林", content: "全天15483单"},
                brand: [],  // 商家列表
                broadcastStyle: {
                    speed: 30, //每秒3个字
                    font_size: "32", //字体大小(rpx)
                    text_color: "#333", //字体颜色
                    back_color: "#fff", //背景色
                    viewHeight: "400", // 滚动视图高度
                },
                broadcastTopBtmHeight: 0,
                profitList: [], // 收益
				noticeLayerIsShow:false,
				allList:{},
				content:'',
				strings:'',
				strTitle:'',
				strId:'',
				headTitle:'',
				bhnj:''
			}
		},
		computed: {
		    i18n () {
		       return this.$t("index")
		    },
			contentText(){
				return this.$t('contentText')
			}
		},
		onLoad() {
            this.getProduct() // 收益专栏
		},
		// 监听头部消息按钮
		onNavigationBarButtonTap(a) {
			console.log(a,"点击了自定义按钮");
		},
        onShow() {
           this.getBrandList() // 商家列表
        },
        mounted() {
            this.getBannerList()  // 获取banner
            this.getMessageAll() // 获取公告列表
			let noticeStatuc = uni.getStorageSync('noticeStatus')
			console.log('noticeStatuc',noticeStatuc)
			if(!noticeStatuc){
				this.noticeLayerIsShow = true
			}else{
				this.noticeLayerIsShow = !noticeStatuc
			}
        },
		created() {
			this.getShowModalTitle()
			this.getDedail()
		},
		methods: {

			goHomeDetail(){
				uni.navigateTo({
					 url: '/pages/home/noticeDetail?cid='+this.strId
				})
			},
			changeMessageLayer(){
				this.noticeLayerIsShow = false
				uni.setStorageSync('noticeStatus',true)
			},
			getDedail(){

			},
			getShowModalTitle(){
				 this.$tools.Post("/dock/system/message/important").then((res) =>{

					 if(res.data == []){
						 this.noticeLayerIsShow = false
						
					 }else{
                         // console.log(res.data.id)
						 this.strId = res.data.id
						 this.strTitle = res.data.title
						 this.strings = res.data.content
					 }
					 // console.log(this.noticeLayerIsShow)

				 })
			},
			// 获取用户信息
			getUserInfo(){
			    this.$tools.Post("dock/member/member/currentUser").then((res) =>{
			        if(res.errCode == 0){
			            this.userInfo = res.data;
			            uni.setStorageSync('realName', this.userInfo.realName);
						uni.setStorageSync('phone', this.userInfo.phone);
						uni.setStorageSync('username', this.userInfo.username);
			        } else {
			            uni.showToast({
			                title: res.errMsg,
			                duration: 1500,
			                icon:'none'
			            });
			        }
			    })
			},
            // 获取banner
            getBannerList(){
                this.$tools.Post("dock/system/config/get").then((res) =>{
					// console.log(res.data)
					// console.log(res.data[4].field)
                    if(res.errCode == 0){
                        this.imgList = res.data.banner;
						this.headTitle = res.data.webTitle
                    } else {
                        uni.showToast({
                            title: res.errMsg,
                            duration: 1500,
                            icon:'none'
                        });
                    }
                })
            },

            // 获取公告列表
            getMessageAll(){
                this.$tools.Post("dock/system/message/all").then((res) =>{
                    if(res.errCode == 0){
                        this.noticeList = [];
						for(let i = 0;i<res.dataSet.length;i++){
							//this.noticeList.push(res.dataSet[i].title)
						}
						if(!res.dataSet){
							this.noticeList.push(res.dataSet[0].title)
						}else{
							
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

            // 商家列表
            getBrandList(){
				let params = {
				    pageIndex: 1,
				    pageSize: 99,
				}
                this.$tools.Post("dock/product/product/all",params).then((res) =>{
                    if(res.errCode == 0){
                        this.brand = res.dataSet;
                        uni.setStorage({
                            key: 'brandList',
                            data: res.dataSet,
                            success: function () {
                                // console.log('success');
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

            // 收益专栏
            getProduct(){
                this.$tools.Post("dock/product/product/rank").then((res) =>{
                    if(res.errCode == 0){
                        this.profitList = res.dataSet;
                        this.initialization() // 初始化滚动文字
                    } else {
                        uni.showToast({
                            title: res.errMsg,
                            duration: 1500,
                            icon:'none'
                        });
                    }
                })
            },
            // 初始化滚动文字
            initialization() {
            	let that = this;
                let arr = [...that.profitList];
                arr = arr.concat(arr);
                that.profitList = arr;
                that.$nextTick(() => {
                	let dir = `.broadcastDataTopBtmDatacss_top`
                	const query2 = uni.createSelectorQuery().in(that);
                	query2.select(dir).boundingClientRect(rect => {
                		that.broadcastTopBtmHeight = rect.height;
                		// console.log(rect, '==rect.height')
                		if (that.viewHeight - rect.height > 10) {
                			that.qualifications = false;
                			that.animation_paused = true;
                			that.broadcastDataTopBtmDataes.splice(that.broadcastDataTopBtmDataes.length / 2, that.broadcastDataTopBtmDataes
                				.length - 1);
                		}
                	}).exec();
                })
            },

			// 去品牌内页
            toDetail(item,index){
                uni.navigateTo({
                    url: '/pages/business/businessList?id='+item.id + '&Index='+ index
                });
            },

			// 消息页
			gotoMsg(){
				uni.navigateTo({
				    url: '/pages/home/noticeList'
				});
			}
		}
	}
</script>

<style lang="less">
.u-type-warning-light-bg{
	background-color: #fff!important;
}
.uni-padding-wrap{
    width: 710rpx;
	margin:0 auto;
	border-radius: 10rpx;
    padding: 0rpx 0rpx !important;
}

page{
    width: 100%;
    height: 100%;

}
.home{
 position: fixed;
 top:0;
 left:0;
 bottom:0;
 right:0;
 overflow: scroll;
    background: url(~@/static/images/homebg.png) no-repeat center center;
    background-size: 100%;
	.right_icon{
		width: 45rpx;
		height: 45rpx;
		margin-right: 20rpx;
		margin-top: 34rpx;
	}
	.left_icon{
		width: 53rpx;
		height: 53rpx;
		vertical-align:middle;
		margin-right: 6rpx;
	}
	.surplus{
		font-size: 28rpx;
		vertical-align: middle;
	}
	.dian{
		position: absolute;
		top: 16rpx;
		right: 8rpx;
		width: 30rpx;
		height: 30rpx;
		border-radius: 100%;
		background: #ff7600;
	}
    .content{
        .page-section{
            border-radius: 10rpx;
        }
        .activeColor {
            background:#FFFFFF
        }
    }

    // 热点
    .hotspotWrap{
        // padding: 20rpx 25rpx;
        // background: #FFFFFF;
		position: relative;
		width:710rpx;
		background: transparent;
		.redain{
			position: absolute;
			left:0;
			top:18rpx;
			width:68rpx;
			z-index: 999999;
			height:40rpx;
		}
		margin:0 auto;
        .hotspotItem{
            display: flex;
            align-items: center;
            .left_img{
                width: 60rpx;
                height: 32rpx;
                margin-right: 8rpx;
            }
            .right_text{
                color: #333333;
                font-size: 28rpx;
            }
        }
    }

    /* 广告图二 */
    .activity{
        // background: #F5F5F5;
        .activityTitleWrap{
			text-align: center;
            padding: 32rpx 25rpx;
            .ac-title{
                color: #fff;
                font-size: 32rpx;
                text-align: center;
				font-weight: 700;
            }
			.disd{
				display: block;
				width:360rpx;
				height:88rpx;
				margin:0 auto;
				background: url(~@/static/images/dis.png) no-repeat center center;
				background-size: cover;
				line-height: 88rpx;
			}
            // .icons1{
            //     width: 4rpx;
            //     height: 18rpx;
            //     border-radius: 2rpx;
            //     background: #E6241A;
            //     margin-right: 4rpx;
            //     margin-left: 4rpx;
            //     opacity: 0.5;
            // }
            // .icons2{
            //     width: 4rpx;
            //     height: 28rpx;
            //     border-radius: 2rpx;
            //     background: #E6241A;
            //     margin-left: 4rpx;
            //     margin-right: 4rpx;
            // }
        }
        .banner-gap{
            width: 100%;
			margin:0 auto;
            .container {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                flex-wrap: wrap;
				background: #fff;
				border-top: 1px solid #EEEEEE;
                .item-warp {
                    width: 33.33%;
                    // display: flex;
                    padding: 15rpx 0rpx 20rpx;
					// background: linear-gradient(0deg, #FFD9D9, #FFFFFF, #FFFFFF, #FFD9D9);
					background: #fff;
					box-sizing: border-box;
					border-right: 1px solid #EEEEEE;
					border-bottom: 1px solid #EEEEEE;
                    .itemWrap_left{
                        width: 110rpx;
                        height: 110rpx;
                        margin:0 auto;
                        image{
                            width: 104rpx;
                            height: 104rpx;
                            border-radius: 100%;
                        }
                    }
                    .itemWrap_right{
                        flex: 1;
                        .itemWrap_right_title{
                            margin-top: 8rpx;
                            color: #333333;
                            font-size: 14px;
							text-align: center;
                        }
                        .itemWrap_right_text{
                            // background: #FFF2F4;
                            color: #D41632;
                            border-radius: 16px;
                            font-size: 20rpx;
							text-align: center;
                        }
                    }
                    &:nth-child(3n) {
                       border-right: none;
                    }
                } //item-warp
            }
        }
        .profitWrap{
            overflow: hidden;
            height: auto;
			width:710rpx;
			margin:0 auto;
			margin-bottom:150rpx;
            .broadcastTopBtm {
                padding: 12rpx;
                overflow: hidden;
                position: relative;
				height: 658rpx !important;
				background: linear-gradient(0deg, #FFFFFF, #FFFFFF, #FFD9D9) !important;
				border-radius: 10rpx !important;
                @keyframes around_top {
                    from {
                        top: 0%;
                    }

                    to {
                        top: var(--scrollHeight--);
                    }
                }
                .broadcastDataTopBtmDatacss_top {
                    width: 100%;
                    animation-name: around_top;
                    animation-duration: var(--scrollSpeed--);
                    animation-iteration-count: infinite;
                    animation-timing-function: linear;
                    position: absolute;
                    left: 0;
                    .Cont_item_top{
                        display: flex;
                        align-items: center;
                        padding: 20rpx 30rpx;
                        // background: #fff;
                        justify-content: space-between;
                        .item_top_left{
                            flex: 1;
                            display: flex;
                            align-items: center;
                            font-size: 28rpx;
                            color: #666666;
                            image{
                                width: 36rpx;
                                height: 36rpx;
                                border-radius: 100%;
                                margin-right: 12rpx;
                            }
                        }
                        .item_top_right{
                            color: #666666;
                            font-size: 20rpx;
                        }
                    } // Cont_item_top
                    .Cont_item_bott{
                        padding: 10rpx 30rpx;
                        // background: #F0F0F0;
						border-bottom:1rpx solid #E0E0E0;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .item_bott_con{
                            display: flex;
                            align-items: center;
                            image{
                                width: 60rpx;
                                height: 60rpx;
                                border-radius: 6rpx;
                                margin-right: 10rpx;
                            }
                            .profitText{
                                color: #333333;
                                font-size: 24rpx;
                                .money{
                                    color: #E5241A;
                                }
                            }
                        }
                    }
                }
            }
        } // profitWrap

    }
}// home
.message-layer{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.content-box{
			width: 608rpx;
			position: relative;
			image{
				width: 100%;
			}
			.content{
				text-align: left;
				padding:30rpx 30rpx 0;
				height:250rpx;
				overflow-y: auto;
			}
			.box{
				position: absolute;
				top: 330rpx;
				left:50%;
				transform: translateX(-50%);
				width: 100%;
				text-align: center;
				.title{
					color:#E72A31;
					font-weight:bold;
				}
				.btns{
					display: flex;
					padding:40rpx 50rpx 0;
					view,navigator{
						flex:1;
						height: 80rpx;
						line-height: 80rpx;
						border-radius: 200rem;
						border:2rpx solid #E0E0E0;
					}
					.look{
						margin-left: 33rpx;
						border-color:#DA3A3F;
						background-color:#DA3A3F;
						color:#fff;
						box-shadow: 0px 10px 10px 0px rgba(218, 58, 63, 0.25);

					}
				}
			}
			.close{
				text-align: center;
				padding-top: 20rpx;
				image{
					width: 60rpx;
					height: 60rpx;
				}
			}
		}
}
</style>

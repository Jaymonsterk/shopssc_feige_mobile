

<script>
	export default {
		onLaunch: function() {
			console.log('App Launch --1')
            // #ifdef APP-PLUS
            // token标志来判断
            let token= uni.getStorageSync('token');    
            if (token) {
                //存在则关闭启动页进入首页
                plus.navigator.closeSplashscreen();
            } else {
                //不存在则跳转至登录页
                uni.reLaunch({
                    url: "/pages/public/login",
                    success: () => {
                        plus.navigator.closeSplashscreen();
                    }
                })
            }
            // #endif
		},
		onShow: function() {
			console.log('App Show--2')
			this.globalRefresh();
		},
		onHide: function() {
			console.log('App Hide --3')
		}
	}
</script>

<style lang="scss">
	.uni-tabbar{
		height: 125upx;
	}
	.uni-tabbar__icon{
		width: 76upx!important;
		height: 76upx!important;
		margin-top: -10upx!important;
	}
	.uni-tabbar .uni-tabbar__label{
		margin-top: 0!important;
	}
	.uni-tabbar__item:nth-child(4) {
		margin-top: -30upx;
	}
	.uni-tabbar__item:nth-child(4) .uni-tabbar__icon{
		width: 90upx!important;
		height: 90upx!important;
	}
	.uni-tabbar__item:nth-child(4) .uni-tabbar__label{
		margin-top: 16upx!important;
	}
    /* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	/* 引入官方css库 */
	@import './static/css/uni.css';
	/* 引入自定义图标库 */
	@import './static/css/icon.css';
	/* 引入动画库 */
	@import './static/css/animate.css';
	/* 公共样式 */
	@import './static/css/common.css';
    .status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
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
			background-color: rgba(0,0,0,0.6);
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

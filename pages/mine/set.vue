<template>
	<view class="container">
		<view class="list_wrap">
			<view @click="goLang">
				<text>{{i18n.lang}}</text>
			</view>
			<view>
				<text>{{i18n.user}}</text>
				<text class="right">{{userName}}</text>
			</view>

			<view>
				<text>{{i18n.ban}}</text>
				<text class="right">1.0.10</text>
			</view>

			<view @click="clearModal">
				<text>{{i18n.clear}}</text>
				<text class="right">{{fileSizeString}}</text>
			</view>
		</view>

		<view class="submit" @click="outLogin()">{{i18n.out}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName:"",
				fileSizeString:""
			}
		},
		computed: {
		    i18n () {
		       return this.$t("set")
		    }
		},
		onLoad(){
			let userName = uni.getStorageSync('username');
			if(userName){
				this.userName = userName
			}
			//#ifdef APP-PLUS
			this.formatSize()
			// #endif
		},

		onShow(){
			
		},
		onReady(){
            uni.setNavigationBarTitle({
            	title:this.i18n.set
            })
		},
		methods: {
			goLang(){
				uni.navigateTo({
					url:'/pages/public/lang?type='+'mine'
				})
			},
			formatSize() {
				let that = this;
				plus.cache.calculate(function(size) {
					let sizeCache = parseInt(size);
					if (sizeCache == 0) {
						that.fileSizeString = "0B";
					} else if (sizeCache < 1024) {
						that.fileSizeString = sizeCache + "B";
					} else if (sizeCache < 1048576) {
						that.fileSizeString = (sizeCache / 1024).toFixed(2) + "KB";
					} else if (sizeCache < 1073741824) {
						that.fileSizeString = (sizeCache / 1048576).toFixed(2) + "MB";
					} else {
						that.fileSizeString = (sizeCache / 1073741824).toFixed(2) + "GB";
					}
				});
			},

			clearModal(){
				//#ifdef APP-PLUS
				let that = this;
				uni.showModal({
				    content: this.i18n.conClear,
				    success: function (res) {
				        if (res.confirm) {
				            that.clearCache()
				        } else if (res.cancel) {

				        }
				    }
				})
				//#endif
			},

			clearCache() {
				let that = this;
				let os = plus.os.name;
				if (os == 'Android') {
					let main = plus.android.runtimeMainActivity();
					let sdRoot = main.getCacheDir();
					let files = plus.android.invoke(sdRoot, "listFiles");
					let len = files.length;
					for (let i = 0; i < len; i++) {
						let filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径
						plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
							if (entry.isDirectory) {
								entry.removeRecursively(function(entry) { //递归删除其下的所有文件及子目录
									uni.showToast({
										title: this.i18n.endClear,
										duration: 2000
									});
									that.formatSize(); // 重新计算缓存
								}, function(e) {
									console.log(e.message)
								});
							} else {
								entry.remove();
							}
						}, function(e) {
							console.log('文件路径读取失败')
						});
					}
				} else { // ios
					plus.cache.clear(function() {
						uni.showToast({
							title: this.i18n.endClear,
							duration: 2000
						});
						that.formatSize();
					});
				}
			},

            // 退出登录
            outLogin() {
                uni.clearStorageSync();
                uni.reLaunch({
                	url: '/pages/public/login'
                })
            }
		}
	}
</script>

<style scoped lang="less">
	page{
		background: #fff;
		font-family: PingFang SC;
		.container{
			padding: 10rpx 30rpx 0 30rpx;
			.list_wrap{
				view{
					height: 86rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1px solid #E6E6E6;
					text{
						font-size: 28rpx;
						color: #999999;
					}
					.right{
						color: #333333;
					}
				}
			}
			.submit{
				width: 600rpx;
				height: 80rpx;
				margin: 100rpx auto 0 auto;
				line-height: 80rpx;
				text-align: center;
				background: #CCCCCC;
				border-radius: 16rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #666666;
			}

		}
	}
</style>

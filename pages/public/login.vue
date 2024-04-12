<template>
    <view class="loginWrap">
        <view class="loginWrap_cont">
            <view class="loginWrap_cont_title">{{i18n.title}}{{headTitle}}</view>
            <view class="loginWrap_cont_textCon">
                <view class="cont_textCon_item">
                    <text class="icons_phone"></text>
                    <input type="text" :placeholder="i18n.place_user" v-model="username" class="inputStyle" placeholder-class="inpuyh"/>
                </view>
                <view class="cont_textCon_item">
                    <text class="icons_psw"></text>
                    <input type="password" :placeholder="i18n.place_pass" v-model="password" class="inputStyle" placeholder-class="inpuyh"/>
                </view>
                <view class="cont_textCon_but" @click="signIn()">
                    <text class="textCon_but_txt">{{i18n.login}}</text>
                </view>
                <view class="registerWap">
					<view class="register" @click="gotolang()"> {{i18n.lang}}</view>
                    <view class="register" @click="gotoRegister()"> {{i18n.regis}}</view>
                   
                    
                </view>
				
				<view class="retrieve" @click="gotoRetrieve()">{{i18n.forget}}?</view>
				<!-- {{langage}} -->
            </view>
        </view>
		<!-- <a-tc></a-tc> -->
    </view>
	
</template>

<script>
    export default {
        data() {
            return {
                username: "",
                password: "",
				headTitle:'',
				systemInfo:{},
				langage:''
            }
        },
		computed: {
		    i18n () {
		       return this.$t("login")
		    }
		},
        onLoad() {
            this.getHeadTitle()
			this.getLang()
			// 语言: this.systemInfo.model
        },
        onShow() {
           try {
                const value = uni.getStorageSync('loginInfo');
                if (value) {
                   this.username = value.username
                   this.password = value.password
				   this.signIn();
                }
           } catch (e) {
               // error
           } 
        },
        methods: {
			getLang(){
				// uni.getSystemInfo({
				//     success: (res) => {
				// 		console.log(res)
				//         this.systemInfo = res
				// 		console.log(res.language)
				// 		this.langage = res.language
				// 		uni.setStorageSync('lang',res.language)
				// 		this._i18n.locale = res.language
				//     }
				// })
				// let langage = uni.getSystemInfoSync().language
				let langage = 'id-ID'
				console.log(langage)
				this.langage = langage
				uni.setStorageSync('lang',langage)
				this._i18n.locale = langage
			},
            getHeadTitle(){
                this.$tools.Post("dock/system/config/get").then((res) =>{
						uni.setNavigationBarTitle({
							title:res.data.webTitle
						})
            			this.headTitle = res.data.webTitle
                  
                })
            },
            // 登录
            signIn(){
                if(this.username == ''){
                    uni.showToast({
                        title:this.i18n.place_user,
                        duration: 1500,
                        icon:'none'
                    });
                    return false
                } else if(this.password == ''){
                    uni.showToast({
                        title: this.i18n.place_pass,
                        duration: 1500,
                        icon:'none'
                    });
                    return false
                }
                let params ={
                    username: this.username,
                    password: this.password
                }
				uni.showLoading({title:'loading...'})
                // 登录
                this.$tools.Post("dock/member/member/login",params).then((res) =>{
                    if(res.errCode == 0){
						 
                         uni.setStorageSync('loginInfo', params);
						 uni.setStorageSync('less',true);
						 uni.hideLoading()
                         uni.setStorage({
                            key: 'token',
                            data: res.data.token,
                            success: function () {
                                uni.reLaunch({
                                    url: '../home/index'
                                });
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
            // 注册账号
            gotoRegister(){
                uni.navigateTo({
                    url: '../public/register'
                });
            },
			// 选择语言
			gotolang(){
			    uni.navigateTo({
			        url: '../public/lang'
			    });
			},
            // 忘记密码
            gotoRetrieve(){
                uni.showToast({
                    title: this.i18n.getkefu,
                    duration: 1500,
                    icon:'none'
                });
                // uni.navigateTo({
                //     url: '../public/verificationUser'
                // });
            }
        }
    }
</script>

<style scoped lang="less">
    
    page{
        
        overflow: hidden;
        height: 100vh;
        :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            color: #FEB1A3; 
        }
        
        ::-moz-placeholder {  /* Mozilla Firefox 19+ */
            color: #FEB1A3;
        }
        
        input:-ms-input-placeholder{
            color: #FEB1A3;
        }
        
        input::-webkit-input-placeholder{
            color: #FEB1A3;
        }
        .loginWrap{
            background: url(~@/static/images/bj1.png) no-repeat center center;
            background-size: cover;
            height: 100vh;
            
            .loginWrap_cont{
                padding: 200rpx 65rpx 0rpx;
                .loginWrap_cont_title{
                    margin: 0 auto;
                    text-align: center;
                    color: #fff;
					font-weight: bold;
                    font-size: 48rpx;
                }
                .loginWrap_cont_textCon{
                    margin-top: 60rpx;
                    .cont_textCon_item{
                        display: flex;
                        align-items: center;
                        border-radius: 50rpx;
                        background: rgba(255,255,255,0.2);
                        padding: 30rpx 27rpx;
                        margin-bottom: 60rpx;
                        color: #333;
                        .icons_phone{
                            width: 30rpx;
                            height: 30rpx;
                            margin-right: 17rpx;
                            background: url(@/static/images/dl_sj.png) no-repeat center center;
                            background-size: 30rpx 30rpx;
                        }
                        .icons_psw{
                            width: 30rpx;
                            height: 30rpx;
                            margin-right: 17rpx;
                            background: url(@/static/images/dl_mm.png) no-repeat center center;
                            background-size: 30rpx 30rpx;
                        }
                        .inputStyle{
                            flex: 1;
                            font-size: 28rpx;
                            text-align: left;
                            color: #FEB1A3;
							
                        }
						.inpuyh{
							color: #FEB1A3;
						}
                        
                    }
                    .cont_textCon_but{
                        display: flex;
                        align-items: center;
                        border-radius: 50rpx;
                        padding: 30rpx 27rpx;
                        text-align: center;
                        justify-content: center;
                        background: #FFFFFF;
                        color: #E6241A;
						font-size:28rpx;
						font-family: PingFang SC;
                    }
                    .registerWap{
                        color: #FFFFFF;
                        font-size: 28rpx;
                        margin-top: 20rpx;
                        font-weight: 500;
						display: flex;
						justify-content: space-between;
						padding: 0 10rpx;
						.register{
							display: inline-block;
						}
						
                        .seat{
                            width: 4rpx;
                            height: 25rpx;
                            margin-left: 15rpx;
                            margin-right: 15rpx;
                            background: #fff;
							display: inline-block;
                        }
                    }
					.retrieve{
						text-align: center;
						margin-top: 40rpx;
						color: #FFFFFF;
					}
                }
            }
        }
    }

    
</style>

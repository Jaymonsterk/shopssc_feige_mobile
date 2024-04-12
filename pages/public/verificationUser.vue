<template>
    <view class="verificationUserWrap">
        <uni-forms :value="formData" ref="form" :rules="rules" label-position="left">
            <uni-forms-item label="" name="username" label-align="right">
                <input type="text" class="inputs" v-model="formData.username" placeholder="请输入您的用户名" />
            </uni-forms-item>
        </uni-forms>
        <view class="buttons" @click="submit">提交</view>
    </view>
</template>

<script>
    export default {
        name:"verificationUser",
        data() {
            return {
                formData: {
                   username: ""
                },
                rules: {
                    username: {
                        rules: [{
                               required: true,
                               errorMessage: '请输入您的用户名',
                            }
                        ]
                    }
                }
            }
        },
        methods: {
            
            // 提交
            submit(){
                this.$refs.form.validate().then(res=>{
                    console.log('表单数据信息：', res);
                    uni.navigateTo({
                        url: '../public/checkmode'
                    });
                }).catch(err =>{
                    console.log('表单错误信息：', err);
                })
            }
        }
    }
</script>

<style scoped lang="less">
    page{
        background: #FFFFFF;
        .verificationUserWrap{
            padding: 30rpx;
            /deep/ .uni-forms-item__inner{
                padding: 15rpx 0;
                border-bottom: 1rpx solid #E6E6E6;
            }
            .buttons{
                margin: 88rpx auto 0;
                width: 600rpx;
                height: 80rpx;
                line-height: 80rpx;
                color: #FFFFFF;
                background: #E6241A;
                border-radius: 16rpx;
                text-align: center;
            }
            .inputs{
                height: 72rpx;
                line-height: 72rpx;
                font-size: 28rpx;
            }
        }
    }
    
    
</style>

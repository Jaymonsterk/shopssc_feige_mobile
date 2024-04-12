<template>
    <view class="checkMode">
        <uni-forms :value="formData" label-position="left">
            <uni-forms-item label="" name="type" label-align="right">
                <radio-group @change="radioFun">
                    <label class="radio" :class="{red: type == 'mobile'}"><radio value="mobile" :checked=" type == 'mobile'"/>手机</label>
                    <label class="radio" :class="{red: type == 'email'}"><radio value="email" :checked=" type == 'email'"/>邮箱</label>
                    <label class="radio" :class="{red: type == 'QQ'}"><radio value="QQ" :checked=" type == 'QQ'"/>QQ</label>
                </radio-group>
            </uni-forms-item>
            
            <uni-forms-item label="" name="mobile" label-align="right" v-if="type=='mobile'">
                <input type="text" class="inputs" maxlength="11" v-model="formData.mobile" placeholder="请输入您的手机号" />
            </uni-forms-item>
            
            <uni-forms-item label="" name="email" label-align="right" v-if="type=='email'">
                <input type="text" class="inputs" v-model="formData.email" placeholder="请输入您的邮箱" />
            </uni-forms-item>
            
            <uni-forms-item label="" name="QQ" label-align="right" v-if="type=='QQ'">
                <input type="text" class="inputs" v-model="formData.QQ" placeholder="请输入您的QQ" />
            </uni-forms-item>
        </uni-forms>
        <view class="buttons" @click="submit">确定</view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                type: "mobile",
                formData: {
                    mobile: "",
                    email: "",
                    QQ: ''
                }
            }
        },
        methods: {
            
            // 选择类型
            radioFun(evt){
                this.type = evt.detail.value
            },
            // 提交
            submit(){
                if(this.type == "mobile" && this.formData.mobile == ''){
                    uni.showToast({
                        title: '请输入手机号',
                        icon: 'error',
                        duration: 2000
                    });
                    return false
                }
                if(this.type == "email" && this.formData.email == ''){
                    uni.showToast({
                        title: '请输入邮箱',
                        icon: 'error',
                        duration: 2000
                    });
                    return false
                }
                if(this.type == "QQ" && this.formData.QQ == ''){
                    uni.showToast({
                        title: '请输入QQ',
                        icon: 'error',
                        duration: 2000
                    });
                    return false
                }
            }
        }
    }
</script>

<style scoped lang="less">
    page{
        background: #FFFFFF;
        .checkMode{
            padding: 30rpx;
            /deep/ .uni-forms-item__inner{
                padding: 15rpx 0;
                border-bottom: 1rpx solid #E6E6E6;
            }
            /deep/ .uni-radio-input-checked{
                background-color: rgb(236, 0, 34) !important;
                border-color: rgb(236, 0, 34) !important;
            }
            /deep/ .uni-radio-input{
                width: 30rpx !important;
                height: 30rpx !important;
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
            .radio{
                color: #999999;
                font-size: 28rpx;
             }
            .red{
                color: #EC0022 !important;
            }
        }
    }
    
    
    
    
</style>

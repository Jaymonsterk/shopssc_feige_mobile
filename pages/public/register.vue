<template>
    <view class="registerWrap">
<!--        <uni-forms :value="formData" ref="form" :rules="rules" label-position="left">-->
<!--            <uni-forms-item :label="i18n.user" name="username" label-align="right">-->
<!--                <input type="text" class="inputs" v-model="formData.username" :placeholder="i18n.place_user" />-->
<!--            </uni-forms-item>-->
<!--            <uni-forms-item :label="i18n.set_pass" name="password" label-align="right">-->
<!--                <input type="password" class="inputs" v-model="formData.password" :placeholder="i18n.place_set" />-->
<!--            </uni-forms-item>-->
<!--            <uni-forms-item :label="i18n.que_pass" name="new_password" label-align="right">-->
<!--                <input type="password" class="inputs" v-model="formData.new_password" :placeholder="i18n.place_que" />-->
<!--            </uni-forms-item>-->
<!--            <uni-forms-item :label="i18n.code" name="staffId" label-align="right">-->
<!--                <input type="text" class="inputs" v-model="formData.staffId" :placeholder="i18n.place_code" />-->
<!--            </uni-forms-item>-->
<!--            &lt;!&ndash; <uni-forms-item label="真实姓名" name="realName" label-align="right">-->
<!--                <input type="text" class="inputs" v-model="formData.realName" placeholder="请输入真实姓名" />-->
<!--            </uni-forms-item> &ndash;&gt;-->
<!--        </uni-forms>-->
		    <view class="regis-item">
           <view class="item-left">
              {{i18n.user}}
           </view>
           <input type="text" class="item-right inputs " v-model="formData.username" :placeholder="i18n.place_user">
        </view>
        <view class="regis-item">
          <view class="item-left">
            {{i18n.set_pass}}
          </view>
          <input type="password" class="item-right inputs " v-model="formData.password" :placeholder="i18n.place_set">
        </view>
        <view class="regis-item">
          <view class="item-left">
            {{i18n.que_pass}}
          </view>
          <input type="password" class="item-right inputs " v-model="formData.new_password" :placeholder="i18n.place_que">
        </view>
        <view class="regis-item">
          <view class="item-left">
            {{i18n.code}}
          </view>
          <input type="password" class="item-right inputs " v-model="formData.staffId" :placeholder="i18n.place_code">
        </view>
        <view class="buttons" @click="submit">{{i18n.regis}}</view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                formData: {
                   username: "",
                   password: "",
                   new_password:"",
                   staffId: "",
                   realName:""
                },
                rules: {
                    // 对username字段进行必填验证
                    username: {
                        rules: [{
                                required: true,
                                errorMessage: '请输入账号！',
                            }
                        ]
                    },
                    // 对password字段进行必填验证
                    password: {
                        rules: [{
                            required: true,
                            errorMessage: '请输入密码！',
                        }]
                    },
                    new_password: {
                        rules: [{
                            required: true,
                            errorMessage: '请输入确认密码',
                        },{
                            validateFunction:function(rule,value,data,callback){
                                if (value != data.password) {
                                    callback('新密码和确认密码不一致！')
                                }
                                return true
                            }
                        }]
                    },
                    staffId: {
                        rules: [{
                            required: true,
                            errorMessage: '输入邀请码！',
                        }]
                    },
                    // realName: {
                    //     rules: [{
                    //         required: true,
                    //         errorMessage: '输入真实姓名！',
                    //     }]
                    // }
                }
            }
        },
        computed: {
            i18n () {
               return this.$t("regis")
            }
        },
        onShow() {
        	
        },
		onReady() {
			uni.setNavigationBarTitle({
				title:this.i18n.head_title
			})
		},
        methods: {

            // 提交
            submit(){

                if(this.formData.username.length < 6){

                     uni.showToast({
                        title:this.i18n.user_leng,
                        icon:"none"
                     })
                     return false
                }else{
                  const rule = new RegExp(/[^\w\.\/]/ig) ;//如果你们需要字母或者数字，就改这儿！
                  if(rule.test(this.formData.username)){
                    uni.showToast({
                      title:this.i18n.user_type,
                      icon:"none"
                    })
                    return false
                  }
                }
                if(this.formData.password.length == 0){
                  uni.showToast({
                    title:this.i18n.place_set,
                    icon:"none"
                  })
                  return false
                }
              if(this.formData.new_password.length == 0){
                uni.showToast({
                  title:this.i18n.place_que,
                  icon:"none"
                })
                return false
              }
              if(this.formData.password != this.formData.new_password){
                uni.showToast({
                  title:this.i18n.newold,
                  icon:"none"
                })
                return false
              }
              if(this.formData.staffId.length == 0){
                uni.showToast({
                  title:this.i18n.place_code,
                  icon:"none"
                })
                return false
              }
                // this.$refs.form.validate().then(data=>{

                    let params ={
                        username: this.formData.username,
                        password: this.formData.password,
                        staffId:  this.formData.staffId,
                        realName: '',
                    }
                    console.log(params)
                    // 注册
                    this.$tools.Post("dock/member/member/register",params).then((res) =>{
                        console.log(res,'99')
                        if(res.errCode == 0){
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
                            console.log(res,'66')
                            uni.showToast({
                                title: res.errMsg,
                                duration: 1500,
                                icon:'none'
                            });
                        }
                    })
                // }).catch(err =>{
                //     console.log('表单错误信息：', err);
                // })
            }
        }
    }
</script>

<style scoped lang="less">
.regis-item{
   display: flex;
   align-items: center;
   height: 100rpx;
   border-bottom:1px solid #E6E6E6 ;
   .item-left{
      width: 140rpx;
      text-align: right;
   }
   .item-right{
      flex: 1;
   }
}
    page{
        background: #FFFFFF;
        .registerWrap{
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
                background: #F02539;
                border-radius: 16rpx;
                text-align: center;
            }
            .inputs{
                height: 72rpx;
                line-height: 72rpx;
                margin-left: 44rpx;
                font-size: 28rpx;
            }
        }
    }




</style>

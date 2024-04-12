import Vue from 'vue'
import App from './App'
import * as filters from './static/js/utils/filters'
import Tools from './static/js/utils/Tools.js'
import Queue from './static/js/utils/queue.js'
import config_ from './static/js/utils/config.js'
// import BackTop from '@/components/common/backTop.vue'
import uView from "uview-ui";
Vue.use(uView);
Vue.config.productionTip = false
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.prototype.$tools = Tools
Vue.prototype.$queue = Queue
Vue.prototype.CONFIGAPI = config_
Vue.prototype.$url = Vue.prototype.$tools.config.apiUrl
Vue.prototype.isArray = Array.isArray || function (obj) {
  return obj instanceof Array;
}

import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
console.log(uni.getStorageSync('lang'))
const i18n = new VueI18n({
	locale: uni.getStorageSync('lang') == (undefined || "" || null) ? "id-ID" : uni.getStorageSync('lang'),
	// locale:"cn",
	messages:{
		'zh-CN':require('./static/lang/cn.json'),
		'en-US':require('./static/lang/en.json'),
		'vi-VN':require('./static/lang/vn.json'),
		'id-ID':require('./static/lang/yn.json'),
	}
})

Vue.prototype._i18n = i18n

let timer;
Vue.prototype.globalRefresh = function(){
    if (timer == undefined) {
		timer = setInterval(()=>{
			let arr=uni.getStorageSync('less')
			if(!arr){

			}else{

				this.$tools.Post("dock/member/member/currentUser").then((res) =>{
					//console.log(res.data.message)
					uni.setStorageSync('message1',res.data.message)
				})
			}
		},1000)
	}
}
// Vue.use(BackTop)
// Vue.component("back-top",BackTop) // 返回顶部
App.mpType = 'app'

const app = new Vue({
	i18n,
    ...App
})
app.$mount()

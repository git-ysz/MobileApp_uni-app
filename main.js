import Vue from 'vue'
import App from './App'
import store from './store'
import native from "./lib/utils/native" //原生工具类
import utils from "./lib/utils/index" //工具类
import server from "./lib/server" //http请求封装
import mixin from "./lib/mixins/global" //全局混入

// import uniNavBar from "@/components/uni/uni-nav-bar"
import uniIcon from "@/components/uni/uni-icon"
// 
// Vue.component('uni-nav-bar', uniNavBar)
Vue.component('uni-icon', uniIcon)
Vue.config.productionTip = false
Vue.prototype.$store = store

utils(Vue.prototype)
native(Vue.prototype)
server(Vue.prototype)

App.mpType = 'app'
Vue.mixin(mixin)
const app = new Vue({
  store,
	...App
})
app.$mount()
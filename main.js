// import Vue from 'vue'
// import App from './App'
// 
// Vue.config.productionTip = false
// 
// App.mpType = 'app'
// 
// const app = new Vue({
//     ...App
// })
// app.$mount()
// 
import Vue from 'vue'
import App from './App'
// import store from '@/store/store'
import util from './libs/util'

Vue.prototype.util = util;
// Vue.prototype.$store=uni.getStorage({key: 'login_info'});
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

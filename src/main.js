import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'

// 全局导入基本样式库
import '@/assets/css/base.css'
// 全局导入自定义样式库
import '@/assets/css/free.css'

// rem h5适配
import 'amfe-flexible/index.js'

// 在main.js中全局导入你要在项目中使用的vant组件
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入2d地图样式库
import 'leaflet/dist/leaflet.css'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

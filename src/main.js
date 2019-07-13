// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import store from './store'
import moment from 'moment'//导入文件
import {post} from './axios/index.js'
import echarts from 'echarts'

// import * as fundebug from "fundebug-javascript";
// import fundebugVue from "fundebug-vue";
// fundebug.apikey = "6a6a98e7d0ef3f80941bc61b0f61bc797fbb22a8f41d7574a68bffdbd093ed5b";
// fundebugVue(fundebug, Vue);

Vue.use(ElementUI, {size: 'mini'});
Vue.config.productionTip = false;
Vue.prototype.$moment = moment;         //赋值使用
Vue.prototype.$post = post;
Vue.prototype.$echarts = echarts;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

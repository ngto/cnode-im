// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import vant from 'vant';
import 'vant/lib/vant-css/index.css';
//移动端rem适配
import './config/rem'
import './assets/font/iconfont.css';
//移动端点击事件
import FastClick from 'fastclick'
import { Waterfall } from 'vant';

Vue.use(vant);

Waterfall.install(Vue);
Vue.config.productionTip = false

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

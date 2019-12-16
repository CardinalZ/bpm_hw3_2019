// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './assets/css/animate.min.css'
import VueLodash from 'vue-lodash'
import axios from 'axios'
import VueAxios from 'vue-axios'
import APIUtil from './services/APIUtil'
import Util from './services/Util'
import PDFGenerator from './services/PDFGenerator'
import store from './store'
import SDK from '../lib/NIM_Web_SDK_v7.0.3'

Vue.prototype.SDK = SDK

Vue.config.productionTip = false
Vue.use(iView)
Vue.use(VueLodash) // Vue._.
Vue.use(VueAxios, axios)
Vue.use(require('vue-moment'))
Vue.use(PDFGenerator)

APIUtil.init()

Date.prototype.format = function (fmt) {
  let o = {
    'M+': this.getMonth() + 1,                 //月份
    'd+': this.getDate(),                    //日
    'h+': this.getHours(),                   //小时
    'm+': this.getMinutes(),                 //分
    's+': this.getSeconds(),                 //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    'S': this.getMilliseconds()             //毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

/*
 * register global filter
 */
Vue.filter('beijing', function (utcTimeStamp) {
  return Util.timeStampFormatter(utcTimeStamp * 1000)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})

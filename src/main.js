/*
 * @Description: 介绍
 * @Author: chenyongxuan
 * @Date: 2021-10-18 10:00:31
 * @LastEditors: chenyongxuan
 * @LastEditTime: 2021-10-18 21:38:34
 */
import Vue from 'vue'
import App from './App.vue'
import { Input, Popover, Form, FormItem } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Input)
Vue.use(Popover)
Vue.use(Form)
Vue.use(FormItem)

new Vue({
  el: '#app',
  render: h => h(App)
})

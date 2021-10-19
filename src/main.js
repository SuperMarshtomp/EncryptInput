/*
 * @Description: 介绍
 * @Author: chenyongxuan
 * @Date: 2021-10-18 10:00:31
 * @LastEditors: chenyongxuan
 * @LastEditTime: 2021-10-19 10:28:05
 */
import Vue from "vue"
import App from "./App.vue"
import { Input, Popover } from "element-ui"

Vue.use(Input)
Vue.use(Popover)

new Vue({
  el: "#app",
  render: (h) => h(App),
})

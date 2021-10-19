/*
 * @Description: 介绍
 * @Author: chenyongxuan
 * @Date: 2021-10-19 12:49:25
 * @LastEditors: chenyongxuan
 * @LastEditTime: 2021-10-19 12:53:13
 */
import EncryptInput from "./src/components/EncryptInput.vue"
import _Vue from "vue"

EncryptInput.install = (Vue) => {
  if (!Vue) {
    window.Vue = Vue = _Vue
  }
  Vue.component(EncryptInput.name, EncryptInput)
}
export default EncryptInput

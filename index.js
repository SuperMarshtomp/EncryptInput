/*
 * @Description: 介绍
 * @Author: chenyongxuan
 * @Date: 2021-10-19 12:49:25
 * @LastEditors: chenyongxuan
 * @LastEditTime: 2021-10-19 12:53:13
 */
import EncryptInput from "./dist/encrypt-input"

EncryptInput.install = (Vue) => {
  if (!Vue) {
    alert("encrypt-input need vue2!")
  } else {
    Vue.component(EncryptInput.name, EncryptInput)
  }
}
export default EncryptInput

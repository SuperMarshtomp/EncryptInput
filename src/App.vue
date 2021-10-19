<!--
 * @Description: 介绍
 * @Author: chenyongxuan
 * @Date: 2021-10-18 10:00:31
 * @LastEditors: chenyongxuan
 * @LastEditTime: 2021-10-19 10:29:57
-->
<template>
  <encrypt-input
    :inputStyle="{ width: '250px' }"
    v-model="msg"
    publicKey="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDNNorgFngK1zjHOnQlIUh5NjOxZIiEPZ8Knu6B/IyY0LBRToo1TZC7/nK6j8on/2sBdv5nFuTwlOpW9UL8C4yZJdjTwYXn5X+wZZsz1RXNI5zjhSXuGeYzF7WhxusKo6zrR6b0IMNg2W016PWU3UkjOXxoaIGkMN77oIorPP5bHQIDAQAB"
  ></encrypt-input>
</template>

<script>
import EncryptInput from "./components/EncryptInput.vue"
export default {
  name: "app",
  components: { EncryptInput },
  data() {
    return {
      msg: "Paas@2020",
    }
  },
}
</script>

<style lang="scss"></style>

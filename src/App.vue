<!--
 * @Description: 介绍
 * @Author: chenyongxuan
 * @Date: 2021-10-18 10:00:31
 * @LastEditors: chenyongxuan
 * @LastEditTime: 2021-10-21 14:53:41
-->
<template>
  <div>
    <encrypt-input
      :input-style="{ width: '300px' }"
      ref="einput"
      v-model="msg"
      :require-default-rules="true"
      :require-encrypt="true"
      public-key="xxx"
    >
    </encrypt-input>
    <!-- <p style="width: 300px;word-wrap:break-word;">密文：{{ msg }}</p> -->
  </div>
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
  methods: {
    encrypt() {
      this.$refs["einput"].encryptPassword()
    },
  },
}
</script>

<style lang="scss"></style>

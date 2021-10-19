<!--
 * @Description: 介绍
 * @Author: chenyongxuan
 * @Date: 2021-10-18 10:00:31
 * @LastEditors: chenyongxuan
 * @LastEditTime: 2021-10-18 22:39:37
-->
<template>
  <div id="app">
    <p>{{ msg }}</p>
    <encrypt-input
      :inputStyle="{ width: '250px' }"
      v-model="msg"
      publicKey="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDNNorgFngK1zjHOnQlIUh5NjOxZIiEPZ8Knu6B/IyY0LBRToo1TZC7/nK6j8on/2sBdv5nFuTwlOpW9UL8C4yZJdjTwYXn5X+wZZsz1RXNI5zjhSXuGeYzF7WhxusKo6zrR6b0IMNg2W016PWU3UkjOXxoaIGkMN77oIorPP5bHQIDAQAB"
    ></encrypt-input>
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
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

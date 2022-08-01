## Install

`npm i -S encrypt-input`


## Input Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 绑定值 |
| input-style | 作用在输入框上的样式 | string / object |  |
| public-key | 公钥 | string |  |
| require-default-rules | 是否需要默认规则 | boolean | false |
| require-encrypt | 是否需要RSA加密 | boolean | false |

## Input Methods

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| encryptPassword | 对绑定值加密，允许对传入参数加密，绑定值变为**密文** | (val?: string)

其余参数和方法和https://element.eleme.cn/#/zh-CN/component/input 一致

## Usage


```js
<template>
  <div id="app">
    <encrypt-input
      ref="einput"
      :input-style="{ width: '250px' }"
      v-model="msg"
      :require-default-rules="true"
      :require-encrypt="true"
      public-key="xxx"
    >
    </encrypt-input>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
import EncryptInput from "encrypt-input";
export default {
  name: "app",
  components: { EncryptInput },
  data() {
    return {
      msg: ""
    };
  },
  methods: {
    encrypt() {
      this.$refs['einput'].encryptPassword()
    }
  }
};
</script>
```


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/69547c0990ea44cea1a64341b95036a9~tplv-k3u1fbpfcp-watermark.image?)
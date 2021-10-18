<!--
 * @Description: 介绍
 * @Author: chenyongxuan
 * @Date: 2021-10-18 10:06:59
 * @LastEditors: chenyongxuan
 * @LastEditTime: 2021-10-18 22:47:12
-->
<template>
  <el-popover
    placement="right"
    width="200"
    trigger="manual"
    v-model="popoverVisible"
    :disabled="hasRules"
  >
    <div class="popover-tips">
      <p class="popover-tips__title">需要包含以下规则：</p>
      <p v-for="(ruleItem, index) in defaultRules" :key="index">
        <i
          :class="{
            'el-icon-success': !!ruleItem.isPass,
            'popover-tips__icon-success': !!ruleItem.isPass,
            'el-icon-error': !ruleItem.isPass,
            'popover-tips__icon-error': !ruleItem.isPass,
          }"
        />&nbsp;{{ ruleItem.message }}
      </p>
    </div>
    <template slot="reference">
      <el-input
        v-bind="$props"
        :style="inputStyle || ''"
        :class="{ 'not-pass': !isPass }"
        :disabled="disabled || disabledInput"
        v-model.trim="password"
        :placeholder="placeholder"
        type="password"
        ref="passwordInput"
        :show-password="!sameAsDefaultPwd(password) && !!password"
        :clearable="false"
        @change="handleInputChange"
        @input="handleInputInput"
        @clear="$emit('clear')"
        @focus="handleFocus"
        @blur="handleInputBlur"
      ></el-input>
    </template>
  </el-popover>
</template>

<script>
import defaultRules from "./validate"
import JSEncrypt from "jsencrypt"
export default {
  name: "EncryptInput",
  props: {
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "请输入",
    },
    publicKey: {
      type: String,
      default: ``,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    requireEncrypt: {
      type: Boolean,
      default: true,
    },
    rules: {
      default() {
        return {}
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    encryptMethod: Function,
    inputStyle: [String, Object],
  },
  data() {
    return {
      password: "",
      defaultPwd: "********",
      defaultRules: Array.isArray(this.rules) ? this.rules : defaultRules,
      popoverVisible: false,
      disabledInput: false,
      isPass: true,
      encrypt: new JSEncrypt(),
      tempPassword: "",
    }
  },
  computed: {
    hasRules() {
      return Array.isArray(this.rules)
    },
  },
  watch: {
    isEdit(newVal, oldVal) {
      if (newVal) {
        this.password = this.defaultPwd
      } else this.password = this.value
    },
    value(newVal, oldVal) {
      // if (!this.isEdit) {
      //   this.password = newVal;
      // }
    },
  },
  created() {
    if (this.isEdit) {
      this.password = this.defaultPwd
    } else {
      this.password = this.value
      if (this.password) {
        this.emitInput(this.password, "created")
      }
    }
    if (this.publicKey) {
      this.encrypt.setPublicKey(this.publicKey)
    } else if (this.requireEncrypt) {
      this.disabledInput = true
    }
    this.isPass = true
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.$refs.clearValidate();
    // });
  },
  methods: {
    focus() {
      this.$refs.passwordInput.focus()
    },
    blur() {
      this.$refs.passwordInput.blur()
    },
    select() {
      this.$refs.passwordInput.select()
    },
    sameAsDefaultPwd(pwd) {
      return pwd === this.defaultPwd
    },
    emitInput(val, type = "input", event = null) {
      this.defaultRules.forEach(rule => {
        rule.validator &&
          rule.validator(rule, val, err => {
            if (!err) {
              this.$set(rule, "isPass", true)
            } else {
              this.$set(rule, "isPass", false)
            }
          })
      })
      if (this.defaultRules.filter(rule => !rule.isPass).length === 0) {
        this.isPass = true
        this.$emit(
          type,
          event
            ? event
            : this.encryptMethod
            ? this.encryptMethod(val)
            : this.requireEncrypt
            ? this.encrypt.encrypt(val)
            : val || null
        )
      } else {
        this.isPass = false
        this.$emit(type, event ? event : "")
      }
    },
    handleInputChange(val) {
      this.emitInput(val, "change")
    },
    handleFocus(event) {
      this.popoverVisible = true
      if (this.isEdit && this.sameAsDefaultPwd(this.password))
        this.password = ""

      this.$emit("focus", event)
    },
    handleInputInput(val) {
      this.emitInput(val, "input")
    },
    handleInputBlur(event) {
      this.popoverVisible = false
      if (this.isEdit && !this.password) this.password = this.defaultPwd
      this.emitInput(this.password, "blur", event)
    },
  },
}
</script>

<style lang="scss">
.popover-tips {
  font-size: 12px;
  p {
    margin: 6px;
  }
  &__title {
    color: #909399;
  }
  &__icon-success {
    color: #67c23a;
  }
  &__icon-error {
    color: #f56c6c;
  }
}
.not-pass {
  .el-input__inner {
    border-color: #f56c6c;
  }
}
.el-popper .popper__arrow {
  display: none;
}
</style>

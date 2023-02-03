<!--
 * @Description: 介绍
 * @Author: chenyongxuan
 * @Date: 2021-10-18 10:06:59
 * @LastEditors: chenyongxuan
 * @LastEditTime: 2021-11-19 15:17:07
-->
<template>
  <el-popover
    placement="right"
    width="200"
    trigger="manual"
    v-model="popoverVisible"
    :disabled="!requireDefaultRules"
    class="el-input"
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
        />{{ ruleItem.message }}
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
      >
        <template v-if="type === 'text'" slot="prefix">
          <slot name="prefix"></slot>
        </template>
        <template v-if="type === 'text'" slot="suffix">
          <slot name="suffix"></slot>
        </template>
        <template v-if="type === 'text'" slot="prepend">
          <slot name="prepend"></slot>
        </template>
        <template v-if="type === 'text'" slot="append">
          <slot name="append"></slot>
        </template>
      </el-input>
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
      default: false,
    },
    requireDefaultRules: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    encryptMethod: Function,
    inputStyle: [String, Object],
    type: String,
    maxlength: Number,
    minlength: Number,
    showWordLimit: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    size: String,
    prefixIcon: String,
    suffixIcon: String,
    rows: Number,
    autosize: [Object, Boolean],
    autocomplete: {
      type: String,
      default: "off",
    },
    autoComplete: {
      type: String,
      default: "off",
    },
    name: String,
    readonly: {
      type: Boolean,
      default: false,
    },
    resize: String,
    autofocus: {
      type: Boolean,
      default: false,
    },
    form: String,
    label: String,
    tabindex: String,
    validateEvent: String,
  },
  data() {
    return {
      password: "",
      defaultPwd: "********",
      defaultRules: !this.requireDefaultRules ? [] : defaultRules,
      popoverVisible: false,
      disabledInput: false,
      isPass: true,
      encrypt: new JSEncrypt(),
      tempPassword: "",
    }
  },
  watch: {
    isEdit(newVal, oldVal) {
      if (newVal) {
        this.password = this.defaultPwd
      } else this.password = this.value
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
    encryptPassword(val = null) {
      const encryptPwd = this.encryptMethod
        ? this.encryptMethod(val)
        : this.publicKey
        ? this.encrypt.encrypt(val || this.password)
        : val || this.password
      // this.$emit("input", encryptPwd)
      return encryptPwd
    },
    emitInput(val, type = "input", event = null) {
      this.defaultRules.forEach((rule) => {
        rule.validator &&
          rule.validator(rule, val, (err) => {
            if (!err) {
              this.$set(rule, "isPass", true)
            } else {
              this.$set(rule, "isPass", false)
            }
          })
      })
      if (this.defaultRules.filter((rule) => !rule.isPass).length === 0) {
        this.isPass = true
        this.$emit(
          type,
          event
            ? event
            : this.encryptMethod
            ? this.encryptMethod(val)
            : this.requireEncrypt && this.publicKey
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
</style>

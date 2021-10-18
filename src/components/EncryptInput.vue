<!--
 * @Description: 介绍
 * @Author: chenyongxuan
 * @Date: 2021-10-18 10:06:59
 * @LastEditors: chenyongxuan
 * @LastEditTime: 2021-10-18 17:30:25
-->
<template>
  <el-form
    :model="ruleForm"
    :status-icon="false"
    :rules="defaultRules"
    ref="ruleForm"
    :disabled="disabled || disabledInput"
  >
    <el-form-item prop="password">
      <el-popover
        placement="right"
        width="200"
        trigger="manual"
        v-model="popoverVisible"
        :disabled="hasRules"
      >
        <div class="popover-tips">
          <p class="popover-tips__title">需要包含以下规则</p>
          <p v-for="(ruleItem, index) in defaultRules.password" :key="index">
            <i
              :class="{
                'el-icon-success': isPass,
                'popover-tips__icon-success': isPass,
                'el-icon-info': !isPass,
                'popover-tips__icon-info': !isPass
              }"
            />&nbsp;{{ ruleItem.message }}
          </p>
        </div>
        <span slot="reference">
          <el-input
            v-model.trim="ruleForm.password"
            :placeholder="placeholder"
            type="password"
            ref="passwordInput"
            :show-password="
              !sameAsDefaultPwd(ruleForm.password) && !!ruleForm.password
            "
            :clearable="false"
            @change="handleInputChange"
            @input="handleInputInput"
            @clear="$emit('clear')"
            @focus="
              event => {
                popoverVisible = true;
                if (isEdit && sameAsDefaultPwd(ruleForm.password))
                  ruleForm.password = '';
                $emit('focus', event);
              }
            "
            @blur="handleInputBlur"
          ></el-input>
        </span>
      </el-popover>
    </el-form-item>
  </el-form>
</template>

<script>
import defaultRules from "./validate";
import JSEncrypt from "jsencrypt";
export default {
  name: "EncryptInput",
  props: {
    value: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "请输入"
    },
    publicKey: {
      type: String,
      default: ``
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    requireEncrypt: {
      type: Boolean,
      default: true
    },
    rules: {
      default() {
        return {};
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ruleForm: {
        password: ""
      },
      defaultPwd: "********",
      defaultRules: {
        password: Array.isArray(this.rules) ? this.rules : defaultRules
      },
      popoverVisible: false,
      isPass: false,
      disabledInput: false,
      encrypt: new JSEncrypt()
    };
  },
  computed: {
    hasRules() {
      return Array.isArray(this.rules);
    }
  },
  watch: {
    isEdit(newVal, oldVal) {
      if (newVal) {
        this.ruleForm.password = this.defaultPwd;
      } else this.ruleForm.password = this.value;
    },
    value(newVal, oldVal) {
      // if (!this.isEdit) {
      //   this.ruleForm.password = newVal;
      // }
    }
  },
  created() {
    if (this.isEdit) {
      this.ruleForm.password = this.defaultPwd;
    } else this.ruleForm.password = this.value;
    if (this.publicKey) {
      this.encrypt.setPublicKey(this.publicKey);
    } else if (this.requireEncrypt) {
      this.disabledInput = true;
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.$refs.ruleForm.clearValidate();
    // });
  },
  methods: {
    focus() {
      this.$refs.passwordInput.focus();
    },
    blur() {
      this.$refs.passwordInput.blur()
    },
    select() {
      this.$refs.passwordInput.select()
    },
    sameAsDefaultPwd(pwd) {
      return pwd === this.defaultPwd;
    },
    handleInputChange(val) {
      this.$refs.ruleForm.validateField("password", errorMessage => {
        if (!errorMessage) {
          this.isPass = true;
          this.$emit(
            "change",
            this.requireEncrypt ? this.encrypt.encrypt(val) : val || null
          );
        } else {
          this.isPass = false;
          this.$emit("change", "");
        }
      });
    },
    handleInputInput(val) {
      this.$refs.ruleForm.validateField("password", errorMessage => {
        if (!errorMessage) {
          this.isPass = true;
          this.$emit(
            "input",
            this.requireEncrypt ? this.encrypt.encrypt(val) : val || null
          );
        } else {
          this.isPass = false;
          this.$emit("input", "");
        }
      });
    },
    handleInputBlur(event) {
      this.popoverVisible = false;
      if (this.isEdit && !this.ruleForm.password)
        this.ruleForm.password = this.defaultPwd;
      this.$emit("blur", event);
    }
  }
};
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
    color: #909399;
  }
}
</style>

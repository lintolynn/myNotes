<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <span v-if="errorMessage">{{errorMessage}}</span>
  </div>
</template>

<script>
import Schema from "async-validator";
export default {
  name: "elFormItem",
  inject: ["elForm"], // 去找父亲的._provided属性 找到后合并到自己的身上
  data() {
    return { errorMessage: null };
  },
  props: {
    label: {
      type: String
    },
    prop: {
      type: String
    }
  },
  methods: {
    validate() {
      if (this.prop) {
        let value = this.elForm.model[this.prop]; // 当前数据
        let ruleValue = this.elForm.rules[this.prop];

        // element async-validate

        let schema = new Schema({
          [this.prop]: ruleValue // username:rule
        });

        return schema.validate({ [this.prop]: value }, (err, res) => {
          if (err) {
            this.errorMessage = err[0].message;
          } else {
            this.errorMessage = null;
          }
        });
      }
    }
  },
  mounted() {
    // 挂载的顺序 是先子在父
    this.$on("validate", () => {
      this.validate();
    });
  }
  // 在el-form-item中需要校验当前你输入的内容是否符合规范  用户更改对应的输入框 对应的el-form-item 应该知道
};
</script>
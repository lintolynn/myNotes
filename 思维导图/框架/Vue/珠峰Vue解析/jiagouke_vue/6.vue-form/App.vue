<template>
  <div>
      <!-- el-form 表单 model (数据源),rules (规则) -->
      <!-- el-form-item div 校验  label + 属性校验-->
      <!-- el-input input标签 v-model 纯的语法糖 = value + input-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item label="用户名" prop="username">
        {{ruleForm.username || '空'}}
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        
           {{ruleForm.password || '空'}}
          <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <button @click="submitForm">提交表单</button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import elForm from "./components/el-form";
import elInput from "./components/el-input";
import elFormItem from "./components/el-form-item";
export default {
  components: {
    "el-form": elForm,
    "el-input": elInput,
    "el-form-item": elFormItem
  },
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符" }
        ],
        password: [{ required: true, message: "请输入密码" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
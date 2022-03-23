<template>
  <div class="edit">
    <div class="edit-list">
      <button @click="$emit('run')">运行</button>
      <button>清空</button>
      {{code}}
    </div>
    <div class="edit-box">
        <!-- value + input  v-model    -->
        <!-- 对于原生标签 v-model 并不等于 input + value 内部会对输入法做处理，而且不同的标签解析出的结果不一样 type checkbox = checked + change -->
        <textarea 
            :value="code" @input="handleInput" @keydown.9.prevent="handleKeyDown"
        ></textarea>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {code:''}
    },
    methods:{
        handleInput(e){
            this.code = e.target.value;
            // 当输入的时候 将数据传递给父组件
            // 发布订阅可以实现组件的解耦合

            this.$emit('input',this.code);
        },
        handleKeyDown(e){
            // console.log('用户按了tab');
        }
    }
};
</script>
<style lang="stylus">
.edit {
  .edit-list {
    padding: 10px;
    button {
      height: 40px;
      width: 80px;
      margin: 5px;
    }
    background #ccc
  }

  .edit-box {
      position absolute;
      top:60px;
      bottom:0;
      left:0;
      right:0
      textarea{
          border none;
          outline none;
          width 50%;
          height:100%;
          font-size:24px;
      }
  }
}
</style>
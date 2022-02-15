<template>
    <input type="text" :value="value"  @input="handleInput">
</template>

<script>
export default {
    
    name:'elInput',
    props:{ // 属性不能改，你可以让父组件的数据更新 =》 让子再次更新
        value:{
            type:String
        }
    },
    methods:{
        handleInput(e){
            this.$emit('input',e.target.value);
            // 组件在创建的过程中会确定父子关系 指代的是组件

            // $parent 指向不明确 parent.parent.parent.
            // this.$parent.$emit('validate')

            // 自己实现dispatch
            this.$dispatch('elFormItem','validate')
        }   
    }
}
</script>
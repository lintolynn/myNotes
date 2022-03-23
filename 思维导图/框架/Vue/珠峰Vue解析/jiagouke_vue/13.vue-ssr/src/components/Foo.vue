<template>
<div>
  <div class="foo" @click="handleClick">foo</div>
</div>
</template>
<script>
export default {
    methods:{
        handleClick(){
            alert(1)
        }
    }
}
</script>
<style >
.foo {
  color: blue;
}
</style>
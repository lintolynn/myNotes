<template>
  <div @click="handle" class="div">
      hello world
  </div>
</template>

<script>
export default {
  methods:{
    handle(){
      alert('click')
    }
  }
}
</script>

<style>
.div{
  background: red;
}
</style>
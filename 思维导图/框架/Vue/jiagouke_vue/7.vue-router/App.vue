<template>
  <div>
    <router-link to="/" tag="p">首页</router-link>  
    <router-link to="/about" tag="p">关于</router-link> 
    
    <!-- 目前还不具备渲染 -->
    <router-view></router-view>


  </div>
</template>

<script>
export default {
  name:'App',
  mounted(){
    console.log(this.$route);
  console.log(this.$router);
  }
};
</script>

<style>
</style>




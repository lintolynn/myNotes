<template>
  <div>
    <h1>about</h1>

    <router-link to="/about/a">去a</router-link>
    <router-link to="/about/b">去b</router-link>


    <router-view></router-view>
  </div>
</template>


<script>
export default {
    name:'about'
}
</script>
<template>
  <div id="app">
    <Navbar/>
   <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "../src/components/Navbar.vue"

export default {
  
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
#app{
		background-color: #F0F0F0;
}
</style>

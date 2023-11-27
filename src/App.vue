<template>
  <div id="app">
      <TheNavbar/>
      <div class="container">
         <router-view/>
       </div>
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar.vue'
export default {
  components: {
    TheNavbar
  },
  name: 'app'
}
</script>

<style>
  @import "assets/css/style.css";
  .container {
    width: 100%;
  }
</style>

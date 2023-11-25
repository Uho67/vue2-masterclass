<template>
  <div id="app">
      <TheNavbar/>
      <div class="container">
         <router-view/>
       </div>
  </div>
</template>

<script>
import sourceData from '@/data.json'
import TheNavbar from './components/TheNavbar.vue'

console.log(sourceData)
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

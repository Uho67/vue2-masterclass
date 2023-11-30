<template>
  <div id="app">
      <TheNavbar/>
      <div class="container">
         <router-view v-show="!showLoader" @startLoading="showLoader=true" @stopLoading="showLoader=false"/>
        <AppSpinner v-show="showLoader"></AppSpinner>
       </div>
  </div>
</template>

<script>
import AppSpinner from './components/AppSpinner.vue'
import TheNavbar from './components/TheNavbar.vue'
// import asyncDataStatus from './mixins/asyncDataStatus'
export default {
  components: {
    TheNavbar,
    AppSpinner
  },
  // mixins: [asyncDataStatus],
  name: 'app',
  data () {
    return {
      showLoader: false
    }
  },
  computed: {
    show () {
      return true
    }
  }
}
</script>

<style>
  @import "assets/css/style.css";
  .container {
    width: 100%;
  }
</style>

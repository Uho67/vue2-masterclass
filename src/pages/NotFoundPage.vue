<template>
  <div>
    <h1 class="notFoundHead">Not found</h1>
    <router-link
      :to="{
          name: 'home',
        }"
    >
      <p :class="$style.notFoundDescription">Press , to go home</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFoundPage'
}
</script>

<style module>
.notFoundDescription {
  background-color: #8f6e4e;
}
</style>

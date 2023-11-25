<template>
  <div class="thread-list">

    <h2 class="list-title">Threads</h2>
    <ThreadListCard v-for="(thread, index) in threads" :key="index" :thread="thread" />
  </div>
</template>

<script>
import ThreadListCard from './ThreadListItem.vue'

export default {
  name: 'ThreadList',
  components: {
    ThreadListCard
  },
  props: {
    threads: {
      required: true
    }
  }
}
</script>

<style scoped>

</style>

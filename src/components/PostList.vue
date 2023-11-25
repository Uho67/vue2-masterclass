<template>
  <div class="post-list">
    <PostListItem v-for="(post,index) in posts" :post="post" :key="index"/>
  </div>
</template>
<script>

import PostListItem from '@/components/PostListItem.vue'

export default {
  components: {
    PostListItem
  },
  name: 'PostList',
  props: {
    posts: {
      required: true
    }
  }
}
</script>
<style scoped>

</style>

<template>
  <div class="category-item">
    <div class="forum-list">
      <router-link
        :to="{
          name: 'category.show',
          params: {
            id: category['.key']
          },
        }"
      >
        <h2 class="list-title"> {{ category.name }} </h2>
      </router-link>
      <ForumList :forumIds="Object.values(category.forums)"></ForumList>
    </div>
  </div>
</template>
<script>
import ForumList from '@/components/ForumList.vue'

export default {
  name: 'CategoryListItem',
  components: {
    ForumList
  },
  props: {
    category: {
      required: true,
      type: Object
    }
  }
}
</script>

<style scoped>

</style>

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
      <ForumList v-if="forums" :forums="forums"></ForumList>
    </div>
  </div>
</template>
<script>
import ForumList from '@/components/ForumList.vue'

export default {
  name: 'CategoryListItem',
  data () {
    return {
      forums: null
    }
  },
  components: {
    ForumList
  },
  props: {
    category: {
      required: true,
      type: Object
    }
  },
  async created () {
    this.forums = await this.$store.dispatch('fetchItemsByIds', {source: 'forums', ids: this.category.forums})
  }
}
</script>

<style scoped>

</style>

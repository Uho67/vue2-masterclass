<template>
  <div class="container">
    <div class="col-full push-top">
      <h1>Discussions</h1>
    </div>
    <ForumList :forumIds="Object.values(category.forums)"/>

  </div>
</template>
<script>
import ForumList from '@/components/ForumList.vue'
export default {
  name: 'CategoryShowPage',
  components: {
    ForumList
  },
  data () {
    return {
      category: this.$store.getters.getCategoryById(this.id)
    }
  },
  props: {
    id: {
      required: true
    }
  }
}
</script>
<style scoped>

</style>

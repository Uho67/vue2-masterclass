<template>
  <div v-if="category" class="container">
    <div class="col-full push-top">
      <h1>Discussions</h1>
    </div>
    <ForumList v-if="forums" :forums="forums"/>

  </div>
</template>
<script>
import ForumList from '@/components/ForumList.vue'
import {mapActions} from 'vuex'
export default {
  name: 'CategoryShowPage',
  components: {
    ForumList
  },
  data () {
    return {
      category: null,
      forums: null
    }
  },
  methods: {
    ...mapActions(['fetchItem', 'fetchItemsByIds'])
  },
  props: {
    id: {
      required: true
    }
  },
  async created () {
    this.category = await this.fetchItem({source: 'categories', id: this.id})
    this.forums = await this.fetchItemsByIds({source: 'forums', ids: this.category.forums})
  }
}
</script>
<style scoped>

</style>

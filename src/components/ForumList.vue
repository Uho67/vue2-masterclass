<template>
  <div class="col-full">
    <div class="forum-list">
      <ForumListItem v-for="(forum, index) in forums"
                     :forum="forum"
                     :key="index"
      />
    </div>
  </div>
</template>
<script>

import ForumListItem from '@/components/ForumListItem.vue'
export default {
  name: 'ForumList',
  components: {
    ForumListItem
  },
  props: {
    forums: {
      required: true,
      type: Array
    }
  }
}
</script>
<style scoped>

</style>

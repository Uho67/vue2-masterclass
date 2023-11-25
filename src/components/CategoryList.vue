<template>
  <div class="col-full">
    <CategoryListItem
      v-for="(category, index) in categories"
      :key="index"
      :category="category" />
  </div>
</template>
<script>
import CategoryListItem from '@/components/CategoryListItem.vue'
export default {
  name: 'CategoryList',
  components: {CategoryListItem},
  props: {
    categories: {
      required: true
    }
  }
}
</script>
<style scoped>

</style>

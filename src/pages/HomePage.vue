<template>
  <div class="col-full">
    <CategoryList :categories="categories"/>
  </div>
</template>

<script>
import ThreadList from '@/components/ThreadList.vue'
import CategoryList from '@/components/CategoryList.vue'
import {mapGetters} from 'vuex'

export default {
  name: 'HomePage',
  components: {
    CategoryList,
    ThreadList
  },
  computed: {
    ...mapGetters({
      'categories': 'getCategories'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tread {
  border: #42b983 1px solid;
}

.post_text {
  border: darkred 1px solid;
}

.user {
  background: aqua;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

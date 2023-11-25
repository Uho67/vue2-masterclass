<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>
    <router-link
      tag="button"
      class="btn-blue"
      :to="{
      name: 'tread.edit',
      params: {
        threadId: thread['.key']
      }
    }"> Edit thread</router-link>
    <p>
      By <a href="#" class="link-unstyled">Robin</a>, 2 hours ago.
      <span style="float:right; margin-top: 2px;" class="hide-mobile text-faded text-small">{{ repliesCount }} replies by {{ contributorsCount }} contributors</span>
    </p>
    <PostList :posts="posts"/>
    <PostEditor :threadId="thread['.key']"/>
  </div>
</template>
<script>

import PostEditor from '../components/PostEditor.vue'
import PostList from '../components/PostList.vue'
import {mapGetters} from 'vuex'

export default {
  components: {
    PostList,
    PostEditor
  },
  name: 'ThreadPage',
  data () {
    return {
      thread: this.$store.getters.getThreadById(this.id),
      newPostText: ''
    }
  },
  computed: {
    ...mapGetters({
      getPostsByIds: 'getPostsByIds',
      getThreadById: 'getThreadById',
      getTreadsByIds: 'getTreadsByIds',
      getRepliesCount: 'getRepliesCount',
      getContributorsCount: 'contributorsCount'
    }),
    contributorsCount () {
      return this.getContributorsCount(this.thread['.key'])
    },
    repliesCount () {
      return this.getRepliesCount(this.thread['.key'])
    },
    posts () {
      return this.$store.getters.getPostsByIds(this.thread.posts)
    }
  },
  props: {
    id: {
      type: String
    }
  },
  beforeMount () {
    if (!this.getTreadsByIds([this.id]).length) {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
</style>

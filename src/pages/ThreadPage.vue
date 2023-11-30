<template>
  <div class="col-large push-top" v-if="!isAsyncDataLoading">
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
    <PostList v-if="posts" :posts="posts"/>
    <PostEditor :threadId="thread['.key']"/>
  </div>
</template>
<script>

import PostEditor from '../components/PostEditor.vue'
import PostList from '../components/PostList.vue'
import {mapActions, mapGetters} from 'vuex'
import asyncDataStatus from '../mixins/asyncDataStatus'

export default {
  components: {
    PostList,
    PostEditor
  },
  name: 'ThreadPage',
  mixins: [asyncDataStatus],
  data () {
    return {
      thread: null,
      newPostText: ''
    }
  },
  computed: {
    ...mapGetters({
      getRepliesCount: 'getRepliesCount',
      getContributorsCount: 'contributorsCount',
      getPostsByIds: 'getPostsByIds'
    }),
    contributorsCount () {
      return this.getContributorsCount(this.thread['.key'])
    },
    repliesCount () {
      return this.getRepliesCount(this.thread['.key'])
    },
    posts () {
      debugger
      return this.getPostsByIds(this.thread.posts)
    }
  },
  props: {
    id: {
      type: String
    }
  },
  methods: {
    ...mapActions(['fetchItem', 'fetchItemsByIds'])
  },
  async created () {
    this.startDataLoading()
    this.thread = await this.$store.dispatch('fetchItem', {source: 'threads', id: this.id})
    if (!this.thread) {
      this.dataLoaded()
      this.$router.push('/')
    }
    await this.$store.dispatch('fetchItemsByIds', {source: 'posts', ids: this.thread.posts})
    this.dataLoaded()
  }
}
</script>

<style scoped>
</style>

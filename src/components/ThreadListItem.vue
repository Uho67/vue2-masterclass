<template>
  <div class="thread">
    <div>
      <router-link
        :to="{
          name: 'tread.show',
          params: {
            id: thread['.key']
          },
        }"
      >
        <p>{{ thread.title }}</p>
      </router-link>
      <p class="text-faded text-xsmall">
        By <a href="profile.html">{{ threadAuthor.name }}</a>,
        <AppDate :date="thread.publishedAt"/>.
      </p>
    </div>

    <div class="activity">
      <p class="replies-count">
        {{ countOfReply }} reply
      </p>

      <img class="avatar-medium"
           src="http://i0.kym-cdn.com/photos/images/facebook/000/010/934/46623-batman_pikachu_super.png"
           alt="">

      <div>
        <p class="text-xsmall">
          <a href="profile.html">{{ lastPost.name }}</a>
        </p>
        <p class="text-xsmall text-faded">
          <AppDate :date="lastPost.publishedAt"/>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  name: 'ThreadListCard',
  data () {
    return {
      lastPost: null,
      threadAuthor: null
    }
  },
  props: {
    thread: {
      required: true
    }
  },
  computed: {
    ...mapGetters(['getObjectsCount']),
    countOfReply () {
      return this.getObjectsCount(this.thread.posts) - 1
    }
  },
  async created () {
    this.lastPost = await this.$store.dispatch('fetchItem', {source: 'posts', id: this.thread.lastPostId})
    this.threadAuthor = await this.$store.dispatch('fetchItem', {source: 'users', id: this.thread.userId})
  }
}
</script>
<style scoped>

</style>

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
      <p v-if="threadAuthor" class="text-faded text-xsmall">
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
          <a v-if="lastPostAuthor" href="profile.html">{{ lastPostAuthor.name }}</a>
        </p>
        <p class="text-xsmall text-faded">
          <AppDate v-if="lastPost" :date="lastPost.publishedAt"/>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'ThreadListCard',
  data () {
    return {
      lastPost: null,
      threadAuthor: null,
      lastPostAuthor: null
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
  methods: {
    ...mapActions(['fetchItem'])
  },
  async created () {
    this.lastPost = await this.fetchItem(({source: 'posts', id: this.thread.lastPostId}))
    this.lastPostAuthor = await this.fetchItem(({source: 'users', id: this.lastPost.userId}))
    this.threadAuthor = await this.fetchItem(({source: 'users', id: this.thread.userId}))
  }
}
</script>
<style scoped>

</style>

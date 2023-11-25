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
        <AppDate :date="thread.publishedAt"/>
        .
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
          <a href="profile.html">{{ lastPostUserName }}</a>
        </p>
        <p class="text-xsmall text-faded">
          <AppDate :date="lastPost.publishedAt"/>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapGetters} from 'vuex'

export default {
  name: 'ThreadListCard',
  props: {
    thread: {
      required: true
    }
  },
  computed: {
    ...mapState(['users']),
    ...mapGetters({
      getPostById: 'getPostById',
      getUserById: 'getUserById',
      getPostCount: 'getPostCount'
    }),
    threadAuthor () {
      return this.getUserById(this.thread.userId)
    },
    countOfReply () {
      return this.getPostCount(this.thread) - 1
    },
    lastPost () {
      return this.getPostById(this.thread.lastPostId)
    },
    lastPostUserName () {
      return this.lastPost.name
    }
  }
}
</script>
<style scoped>

</style>

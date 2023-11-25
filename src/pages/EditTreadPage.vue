<template>
  <div class="col-full push-top">

    <h1>Create new thread in <i>{{ forum.name }}</i></h1>

    <form action="" @submit.prevent="createNewTread">
      <div class="form-group">
        <label for="thread_title">Title:</label>
        <input type="text" id="thread_title" class="form-input" name="title"
               v-model="newTreadData.title">
      </div>

      <div class="form-group">
        <label for="thread_content">Content:</label>
        <textarea
          id="thread_content"
          class="form-input"
          name="content"
          rows="8"
          cols="140"
          v-model="newTreadData.text"
        ></textarea>
      </div>

      <div class="btn-group">
        <button class="btn btn-ghost" @click.prevent="cancel">Cancel</button>
        <button class="btn btn-blue" type="submit" name="Publish">Publish</button>
      </div>
    </form>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  name: 'EditTreadPage',
  data () {
    return {
      newTreadData: {}
    }
  },
  props: {
    threadId: {
      required: true
    }
  },
  computed: {
    ...mapGetters({
      getThreadById: 'getThreadById',
      getPostById: 'getPostById',
      getForumById: 'getForumById'
    }),
    thread () {
      return this.getThreadById(this.threadId)
    },
    forum () {
      return this.getForumById(this.thread.forumId)
    }
  },
  created () {
    this.initTreadData()
  },
  methods: {
    cancel () {
      this.$router.push({name: 'tread.show', params: {id: this.threadId}})
    },
    initTreadData () {
      const post = this.getPostById(this.thread.firstPostId)
      this.newTreadData = {title: this.thread.title, text: post.text}
    },
    createNewTread () {
      this.$store.dispatch('updateTread', {
        threadId: this.thread['.key'],
        title: this.newTreadData.title,
        firstPostText: this.newTreadData.text
      }).then(threadId => this.$router.push({name: 'tread.show', params: {id: threadId}}))
    }
  }
}
</script>

<style scoped>

</style>

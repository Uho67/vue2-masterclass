<template>
  <div class="col-full push-top" v-if="forum">

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
import {mapActions} from 'vuex'

export default {
  name: 'EditTreadPage',
  data () {
    return {
      forum: null,
      thread: null,
      newTreadData: {}
    }
  },
  props: {
    threadId: {
      required: true
    }
  },
  async created () {
    this.thread = await this.fetchItem({source: 'threads', id: this.threadId})
    this.forum = await this.fetchItem({source: 'forums', id: this.thread.forumId})
    const post = await this.fetchItem({source: 'posts', id: this.thread.firstPostId})
    this.newTreadData = {title: this.thread.title, text: post.text}
  },
  methods: {
    ...mapActions(['fetchItem', 'fetchItemsByIds']),
    cancel () {
      this.$router.push({name: 'tread.show', params: {id: this.threadId}})
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

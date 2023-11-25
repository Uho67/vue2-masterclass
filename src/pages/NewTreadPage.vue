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
  name: 'NewTreadPage',
  data () {
    return {
      newTreadData: {}
    }
  },
  props: {
    forumId: {
      required: true
    }
  },
  computed: {
    ...mapGetters({
      getForumById: 'getForumById'
    }),
    forum () {
      return this.getForumById(this.forumId)
    }
  },
  methods: {
    cancel () {
      this.$router.push({name: 'forum.show', params: {id: this.forumId}})
    },
    createNewTread () {
      this.$store.dispatch('createTread', {
        forumId: this.forumId,
        title: this.newTreadData.title,
        firstPostText: this.newTreadData.text
      }).then(threadId => this.$router.push({name: 'tread.show', params: {id: threadId}}))
    }
  }
}
</script>

<style scoped>

</style>

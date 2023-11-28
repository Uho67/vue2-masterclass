<template>
  <form @submit.prevent="save()">
    <div class="form-group">
      <textarea
        cols="30"
        rows="10"
        class="form-input"
        v-model="newPostText">
      </textarea>
    </div>
    <div class="form-actions">
      <button class="btn-blue">{{post ? 'Update' : 'Submit post'}}</button>
    </div>
  </form>
</template>
<script>
import {mapActions} from 'vuex'

export default {
  name: 'PostEditor',
  data () {
    return {
      newPostText: ''
    }
  },
  props: {
    threadId: {
      required: true
    },
    post: {
      required: false,
      type: Object,
      validator: obj => {
        return typeof obj['.key'] === 'string'
      }
    }
  },
  created () {
    this.newPostText = this.post ? this.post.text : ''
  },
  methods: {
    ...mapActions(['createNewPost']),
    save () {
      return this.post ? this.updatePost() : this.publishNewPost()
    },
    updatePost () {
      this.post.text = this.newPostText
      this.$store.dispatch('updatePost', this.post)
      this.$emit('postUpdated')
    },
    async publishNewPost () {
      await this.createNewPost({newPostText: this.newPostText, threadId: this.threadId})
      this.newPostText = ''
    }
  }
}
</script>
<style scoped>

</style>

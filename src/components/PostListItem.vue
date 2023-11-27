<template>
  <div>
    <UserInfoCard v-if="user" :user="user"/>
    <div class="post-content">
      <template v-if="!editMode">
        <div>
          <p> {{ post.text }}</p>
        </div>
        <p style="margin-left: auto;"
           class="link-unstyled"
           title="Make a change"
           @click.prevent="editMode=true">
          <i class="fa fa-pencil"></i>
        </p>

      </template>
      <PostEditor
        v-else
        :thread-id="post.threadId"
        :post="post"
        @postUpdated="editMode=false"
      />
    </div>

    <div v-if="post.edited" class="edition-info">edited</div>
    <div class="post-date text-faded">
      <AppDate :date="post.publishedAt"/>
    </div>
  </div>
</template>
<script>
import PostEditor from './PostEditor.vue'
import UserInfoCard from './UserInfoCard.vue'

export default {
  name: 'PostListItem',
  components: {
    UserInfoCard,
    PostEditor
  },
  data () {
    return {
      user: null,
      editMode: false
    }
  },
  props: {
    post: {
      required: true,
      type: Object
    }
  },
  async created () {
    this.user = await this.$store.dispatch('fetchItem', {source: 'users', id: this.post.userId})
  }
}
</script>

<style scoped>

</style>

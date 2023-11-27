<template>
  <div class="profile-card">

    <p class="text-center">
      <img :src="user.avatar" alt="" class="avatar-xlarge">
    </p>

    <h1 class="title">{{ user.username }}</h1>

    <p class="text-lead">{{ user.name }}</p>

    <p class="text-justify" v-if="user.bio">{{ user.bio }}</p>
    <p class="text-justify" v-else>No bio specified</p>

    <span class="online">{{ user.name }} is online</span>


    <div class="stats">
      <span>{{ userPostCount }} {{ userPostCount > 0 ? 'posts' : 'post' }}</span>
      <span>{{ userThreadsCount }} {{ userThreadsCount > 0 ? 'threads' : 'thread' }}</span>
    </div>

    <hr>

    <p class="text-large text-center"><i class="fa fa-globe"></i> <a href="#">batman.com</a></p>

  </div>
</template>
<script>
import { countObjectProperties } from '@/helpers'

export default {
  name: 'UserProfileCard',
  data () {
    return {
      user: null
    }
  },
  props: {
    userId: {
      required: true
    }
  },
  computed: {
    userPostCount () {
      return countObjectProperties(this.user.posts)
    },
    userThreadsCount () {
      return countObjectProperties(this.user.threads)
    }
  },
  created () {
    this.user = this.$store.dispatch('fetchItem', {source: 'users', id: this.userId})
  }
}
</script>
<style scoped>

</style>

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
import {mapGetters} from 'vuex'

export default {
  name: 'UserProfileCard',
  computed: {
    ...mapGetters({
      getUserById: 'getUserById',
      getUserPostCount: 'getUserPostCount',
      getUserThreadsCount: 'getUserThreadsCount'
    }),
    user () {
      return this.getUserById(this.userId)
    },
    userPostCount () {
      return this.getUserPostCount(this.user)
    },
    userThreadsCount () {
      return this.getUserThreadsCount(this.user)
    }
  },
  props: {
    userId: {
      required: true
    }
  }
}
</script>
<style scoped>

</style>

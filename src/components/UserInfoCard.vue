<template>
  <div class="user-info">
    <a href="profile.html#profile-details" class="user-name"> {{ user.name }} </a>

    <a href="profile.html#profile-details">
      <img class="avatar-large" :src="user.avatar" alt="">
    </a>

    <p class="desktop-only text-small"> {{ postCount }} {{ postCount > 1 ? 'posts' : 'post' }}</p>

    <p class="desktop-only text-small">{{ treadsCount }} {{ treadsCount > 1 ? 'threads' : 'thread' }}</p>

    <span class="online desktop-only">online</span>

  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'UserInfoCard',
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      getUserThreadsCount: 'getUserThreadsCount',
      getObjectsCount: 'getObjectsCount'
    }),
    treadsCount () {
      return this.getObjectsCount(this.user.threads)
    },
    postCount () {
      return this.getObjectsCount(this.user.posts)
    }
  },
  props: {
    user: {
      required: true
    }
  }
}
</script>
<style scoped>

</style>

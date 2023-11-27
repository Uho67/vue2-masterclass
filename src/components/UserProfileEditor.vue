<template>
  <div class="profile-card">

    <p class="text-center">
      <img :src="user.avatar" alt="" class="avatar-xlarge img-update">
    </p>

    <div class="form-group">
      <input type="text" v-model="activeUser.username" placeholder="Username" class="form-input text-lead text-bold">
    </div>

    <div class="form-group">
      <input type="text" v-model="activeUser.name" placeholder="Full Name" class="form-input text-lead">
    </div>

    <div class="form-group">
      <label for="user_bio">Bio</label>
      <textarea class="form-input" id="user_bio" placeholder="Write a few words about yourself." v-model="activeUser.bio"></textarea>
    </div>

    <div class="stats">
      <span>{{ userPostCount }} {{ userPostCount > 0 ? 'posts' : 'post' }}</span>
      <span>{{ userThreadsCount }} {{ userThreadsCount > 0 ? 'threads' : 'thread' }}</span>
    </div>

    <hr>

    <div class="form-group">
      <label class="form-label" for="user_website">Website</label>
      <input autocomplete="off" class="form-input" id="user_website" v-model="activeUser.website">
    </div>

    <div class="form-group">
      <label class="form-label" for="user_email">Email</label>
      <input autocomplete="off" class="form-input" id="user_email" v-model="activeUser.email">
    </div>

    <div class="form-group">
      <label class="form-label" for="user_location">Location</label>
      <input autocomplete="off" class="form-input" id="user_location" v-model="activeUser.bio" >
    </div>

    <div class="btn-group space-between">
      <button class="btn-ghost" @click="$emit('cancelEditMode')">Cancel</button>
      <button type="submit" class="btn-blue" @click="submitUserInfo">Save</button>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {merge} from 'lodash'

export default {
  name: 'UserProfileEditor',
  data () {
    return {
      activeUser: this.user
    }
  },
  props: {
    userId: {
      required: true
    }
  },
  methods: {
    submitUserInfo () {
      const newUser = merge(this.user, this.activeUser)
      this.$store.dispatch('replaceUserData', newUser)
      this.$emit('cancelEditMode')
    }
  },
  computed: {
    ...mapGetters({
      getObjectsCount: 'getObjectsCount',
      getUserById: 'getUserById'
    }),
    user () {
      return this.getUserById(this.userId)
    },
    userPostCount () {
      return this.getObjectsCount(this.user.posts)
    },
    userThreadsCount () {
      return this.getObjectsCount(this.user.threads)
    }
  },
  beforeMount () {
    this.activeUser = {...this.user}
  }
}
</script>

<style scoped>

</style>

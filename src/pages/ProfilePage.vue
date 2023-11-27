<template>
  <div class="flex-grid">
    <div class="col-3 push-top">
      <template v-if="user">
        <UserProfileCard
          v-if="!editMode"
          :userId="user['.key']"
        />
        <UserProfileEditor
          v-if="editMode"
          :userId="user['.key']"
          @cancelEditMode="redirectProfilePage"
        />
      </template>
      <!--      <div class="profile-card">-->

      <!--        <p class="text-center">-->
      <!--          <img :src="user.avatar" alt="" class="avatar-xlarge">-->
      <!--        </p>-->

      <!--        <h1 class="title">{{ user.username }}</h1>-->

      <!--        <p class="text-lead">{{ user.name }}</p>-->

      <!--        <p class="text-justify" v-if="user.bio">{{ user.bio }}</p>-->
      <!--        <p class="text-justify" v-else>No bio specified</p>-->

      <!--        <span class="online">{{ user.name }} is online</span>-->


      <!--        <div class="stats">-->
      <!--          <span>{{ postsCount }} {{ postsCount > 0 ? 'posts' : 'post'}}</span>-->
      <!--          <span>{{ threadsCount }} {{ threadsCount > 0 ? 'threads' : 'thread'}}</span>-->
      <!--        </div>-->

      <!--        <hr>-->

      <!--        <p class="text-large text-center"><i class="fa fa-globe"></i> <a href="#">batman.com</a></p>-->

      <!--      </div>-->

      <p class="text-xsmall text-faded text-center">Member since june 2003, last visited 4 hours
        ago</p>

      <div class="text-center">
        <hr>
        <router-link
          class="btn-green btn-small"
          :to="{
            name: 'profile',
            params: {
              mode: 'edit'
          }
        }"
        >Edit Profile
        </router-link>
      </div>

    </div>

    <div class="col-7 push-top">

      <div class="profile-header">
                  <span class="text-lead" v-if="user">
                      {{ user.name }}'s recent activity
                  </span>
        <a href="#">See only started threads?</a>
      </div>

      <hr>

      <PostList :posts="posts"/>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import PostList from '../components/PostList.vue'
import UserProfileCard from '../components/UserProfileCard.vue'
import UserProfileEditor from '../components/UserProfileEditor.vue'

export default {
  name: 'UserProfilePage',
  data () {
    return {
      user: null,
      posts: null
    }
  },
  components: {
    PostList,
    UserProfileCard,
    UserProfileEditor
  },
  props: {
    editMode: {
      default: false
    }
  },
  computed: {
    ...mapGetters({
      getAuthUserId: 'getAuthUserId',
      getObjectsCount: 'getObjectsCount'
    }),
    postsCount () {
      return this.getObjectsCount(this.user.posts)
    },
    threadsCount () {
      return this.getObjectsCount(this.user.threads)
    }
  },
  async created () {
    this.user = await this.fetchItem({source: 'users', id: this.getAuthUserId})
    this.posts = await this.fetchItemsByIds({
      source: 'posts',
      ids: this.user.posts
    })
  },
  methods: {
    ...mapActions(['fetchItem', 'fetchItemsByIds']),
    redirectProfilePage () {
      this.$router.push({
        name: 'profile'
      })
    }
  }
}
</script>
<style scoped>

</style>

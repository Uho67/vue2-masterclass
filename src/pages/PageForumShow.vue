<template>
  <div class="forum-wrapper">

    <div class="col-full push-top">
      <ul class="breadcrumbs">
        <li><a href="/index.html"><i class="fa fa-home fa-btn"></i>Home</a></li>
        <li><a href="/category.html">Discussions</a></li>
        <li class="active"><a href="#">Cooking</a></li>
      </ul>

      <div v-if="!isAsyncDataLoading" class="forum-header">
        <div class="forum-details">
          <h1>{{ forum.name }}</h1>
          <p class="text-lead">{{ forum.description }}</p>
        </div>
        <router-link :to="{
          name:'tread.new',
          params: {
            forumId:forum['.key']
          }
        }"
        class="btn-green btn-small">
          Start a thread
        </router-link>
      </div>
    </div>

    <!--    <div class="col-full">-->
    <!--      <div class="category-item">-->
    <!--        <div class="forum-list">-->
    <!--          <h2 class="list-title">Recipes</h2>-->
    <!--          <div class="forum-listing">-->
    <!--            <div class="forum-details">-->
    <!--              <a href="#" class="forum-name">{{ forum.name }}</a>-->

    <!--              <p class="forum-description ">{{ forum.description }}</p>-->
    <!--            </div>-->


    <!--            <div class="threads-count">-->
    <!--              <p class="count text-lead">{{ threads.length}}</p> threads-->
    <!--            </div>-->

    <!--            <div class="last-thread">-->
    <!--              <img class="avatar"-->
    <!--                   src="http://cleaneatsfastfeets.com/wp-content/uploads/2013/05/Mr-Burns.gif"-->
    <!--                   alt="">-->
    <!--              <div class="last-thread-details">-->
    <!--                <a href="#">How I grill my fish</a>-->
    <!--                <p class="text-xsmall">By <a href="profile.html">Charles Montgomery Burns</a>, 2-->
    <!--                  days ago</p>-->
    <!--              </div>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->

    <div class="col-full">
      <ThreadList v-if="threads" :threads="threads"></ThreadList>
    </div>

  </div>
</template>
<script>

import ThreadList from '@/components/ThreadList.vue'
import {mapActions} from 'vuex'
import asyncDataStatus from '../mixins/asyncDataStatus'

export default {
  name: 'PageForumShow',
  components: {ThreadList},
  mixins: [asyncDataStatus],
  data () {
    return {
      forum: null,
      threads: null
    }
  },
  props: {
    id: {
      required: true
    }
  },
  methods: {
    ...mapActions(['fetchItem', 'fetchItemsByIds'])
  },
  async created () {
    this.$emit('startLoader')
    this.startDataLoading()
    this.forum = await this.fetchItem({source: 'forums', id: this.id})
    this.threads = await this.fetchItemsByIds({source: 'threads', ids: this.forum.threads})
    this.dataLoaded()
    this.$emit('stopLoader')
  }
}
</script>
<style scoped>
.forum-wrapper {
  width: 100%;
}
</style>

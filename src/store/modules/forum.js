import sourceData from '@/data.json'
import Vue from 'vue'

export default {
  state: {
    forums: {...sourceData.forums}
  },
  // computed '.getters'
  getters: {
    getForums (state, getters) {
      return state.forums
    },
    getForumsByIds (state, getters) {
      return function (forumIds) {
        const forumIdsArray = Object.values(forumIds)
        return Object.values(state.forums).filter(forum => forumIdsArray.includes(forum['.key']))
      }
    },
    getForumById (state, getters) {
      return function (forumId) {
        return Object.values(state.forums).find(forum => forum['.key'] === forumId)
      }
    }
  },
  mutations: {
    addThreadToForum (state, {treadId, forumId}) {
      const forum = Object.values(state.forums).find(forum => forum['.key'] === forumId)
      Vue.set(forum.threads, treadId, treadId)
      Vue.set(state.forums, forumId, forum)
    }
  }
}

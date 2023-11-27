import Vue from 'vue'

export default {
  state: {
    forums: {}
  },
  // computed '.getters'
  getters: {
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

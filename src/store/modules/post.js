import sourceData from '@/data.json'
import Vue from 'vue'

export default {
  state: {
    posts: {...sourceData.posts}
  },
  // computed '.getters'
  getters: {
    getPosts (state, getters) {
      return state.post
    },
    getPostsByIds (state, getters) {
      return function (postIds) {
        const postIdsArray = Object.values(postIds)
        return Object.values(state.posts).filter(post => postIdsArray.includes(post['.key']))
      }
    },
    getPostById (state, getters) {
      return function (postId) {
        return Object.values(state.posts).find(post => post['.key'] === postId)
      }
    }
  },
  actions: {
    createNewPost ({commit, getters}, {newPostText, threadId}) {
      return new Promise((resolve, reject) => {
        const post = {
          'text': newPostText,
          'publishedAt': Math.floor(Date.now() / 1000),
          '.key': 'customPost' + Date.now(),
          'threadId': threadId,
          'userId': getters.getAuthUser['.key']
        }
        commit('addPost', post)
        commit('addPostToThread', {threadId: post.threadId, postId: post['.key']})
        commit('addPostToUser', {userId: post.userId, postId: post['.key']})
        resolve(post['.key'])
      }
    )
    },
    updatePost ({rootState, commit}, post) {
      if (typeof post.edited !== 'object') {
        post.edited = {}
      }
      post.edited.at = Math.floor(Date.now() / 1000)
      post.edited.by = rootState.userStore.authId
      commit('addPost', post)
    }
  },
  mutations: {
    addPost (state, post) {
      Vue.set(state.posts, post['.key'], post)
    }
  }
}

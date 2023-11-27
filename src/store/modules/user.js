import Vue from 'vue'
import { countObjectProperties } from '@/helpers'
export default {
  state: {
    users: {},
    authId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2'
  },
  // computed '.getters'
  getters: {
    getAuthUserId (state) {
      return state.authId
    },
    getUserThreadsCount (state) {
      return function (user) {
        return countObjectProperties(user.threads)
      }
    },
    getAuthUser (state, getters) {
      return getters.getUserById(state.authId)
    },
    getUserById (state, getters) {
      return function (userId) {
        return Object.values(state.users).find(user => user['.key'] === userId)
      }
    }
  },
  // methods 'dispatch'
  actions: {
    replaceUserData ({commit}, user) {
      commit('replaceUserData', user)
    },
    addPostToUser ({commit}, {userId, postId}) {
      commit('addPostToUser', {userId, postId})
    }
  },
  mutations: {
    replaceUserData (state, user) {
      Vue.set(state.users, user['.key'], user)
    },
    addPostToUser (state, {userId, postId}) {
      const user = Object.values(state.users).find(user => user['.key'] === userId)
      Vue.set(user.posts, postId, postId)
    }
  }
}

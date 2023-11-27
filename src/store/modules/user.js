import Vue from 'vue'
import { countObjectProperties } from '@/helpers'
export default {
  state: {
    users: {},
    authId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2'
  },
  // computed '.getters'
  getters: {
    getUsers (state, getters) {
      return state.users
    },
    getAuthUserId (state) {
      return state.authId
    },
    getUserPostCount (state) {
      return function (user) {
        return countObjectProperties(user.posts)
      }
    },
    getUserThreadsCount (state) {
      return function (user) {
        return countObjectProperties(user.threads)
      }
    },
    getUsersByIds (state, getters) {
      return function (userIds) {
        const userIdsArray = Object.values(userIds)
        return Object.values(state.users).filter(user => userIdsArray.includes(user['.key']))
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

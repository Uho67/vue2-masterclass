import Vue from 'vue'
import firebase from 'firebase'

export default {
  state: {
    posts: {}
  },
  // computed '.getters'
  getters: {
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
    async createNewPost ({commit, getters, dispatch}, {newPostText, threadId, postKey}) {
      debugger
      const postId = postKey || firebase.database().ref('posts').push().key
      const post = {
        'key': postId,
        'text': newPostText,
        'publishedAt': Math.floor(Date.now() / 1000),
        'threadId': threadId,
        'userId': getters.getAuthUser['.key']
      }
      await dispatch('updatePostFirebaseTransaction', post)
      commit('saveItem', {source: 'posts', item: post})
      commit('addPostToThread', {threadId: post.threadId, postId: post['.key']})
      commit('addPostToUser', {userId: post.userId, postId: post['.key']})
      return post['.key']
    },
    updatePostFirebaseTransaction ({commit}, post) {
      const postId = post['key']
      const updates = {}
      updates[`posts/${postId}`] = post
      updates[`threads/${post.threadId}/posts/${postId}`] = postId
      updates[`threads/${post.threadId}/contributors/${post.userId}`] = post.userId
      updates[`users/${post.userId}/posts/${postId}`] = postId
      firebase.database().ref().update(updates)
    },
    async updatePost ({rootState, commit}, post) {
      if (typeof post.edited !== 'object') {
        post.edited = {}
      }
      post.edited.at = Math.floor(Date.now() / 1000)
      post.edited.by = rootState.usersStore.authId
      let updates = {}
      updates.text = post.text
      updates.edited = post.edited
      await firebase.database().ref('posts').child(post['.key']).update(updates)
      commit('addPost', post)
    }
  },
  mutations: {
    addPost (state, post) {
      Vue.set(state.posts, post['.key'], post)
    }
  }
}

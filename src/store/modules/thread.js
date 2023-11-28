import Vue from 'vue'
import {countObjectProperties} from '@/helpers'
import firebase from 'firebase'

export default {
  state: {
    threads: {}
  },
  // computed '.getters'
  getters: {
    getRepliesCount: state => id => countObjectProperties(state.threads[id].posts) - 1,
    contributorsCount: (state, getters) => id => {
      return countObjectProperties(state.threads[id].contributors)
    },
    getThreadById (state, getters) {
      return function (threadId) {
        return Object.values(state.threads).find(thread => thread['.key'] === threadId)
      }
    }
  },
  // methods 'dispatch'
  actions: {
    updateTread ({commit, getters, dispatch}, {threadId, title, firstPostText}) {
      const thread = getters.getThreadById(threadId)
      const post = getters.getPostById(thread.firstPostId)
      if (post && thread) {
        post.text = firstPostText
        dispatch('updatePost', post)
        thread.title = title
        commit('saveTread', thread)
      }
    },
    async createTread ({commit, getters, dispatch}, {forumId, title, firstPostText}) {
      const threadKey = firebase.database().ref('threads').push().key
      const postKey = firebase.database().ref('posts').push().key
      const thread = {
        'key': threadKey,
        forumId: forumId,
        lastPostId: postKey,
        firstPostId: postKey,
        posts: {
          postKey: postKey
        },
        publishedAt: Math.floor(Date.now() / 1000),
        title: title,
        userId: getters.getAuthUser['.key']
      }
      await dispatch('updateThreadFirebaseTransaction', thread)
      debugger
      await dispatch('createNewPost', {
        newPostText: firstPostText,
        threadId: threadKey,
        postId: postKey
      })
      commit('saveItem', {source: 'threads', item: thread})
      commit('addThreadToForum', {treadId: thread['.key'], forumId: forumId})
      return thread['.key']
    },
    async updateThreadFirebaseTransaction ({dispatch}, thread) {
      const threadId = thread['key']
      const updates = {}
      updates[`threads/${threadId}`] = thread
      updates[`forums/${thread.forumId}/threads/${threadId}`] = threadId
      updates[`users/${thread.userId}/threads/${threadId}`] = threadId
      firebase.database().ref().update(updates)
      return dispatch('fetchItem', {source: 'threads', id: threadId})
    },
    addPostToTread ({commit}, {threadId, postId}) {
      commit('addPostToThread', {threadId, postId})
    }
  },
  mutations: {
    saveTread (state, tread) {
      Vue.set(state.threads, tread['.key'], tread)
    },
    addPostToThread (state, {threadId, postId}) {
      const thread = Object.values(state.threads).find(threadItem => threadItem['.key'] === threadId)
      thread.lastPostId = postId
      Vue.set(thread.posts, postId, postId)
      Vue.set(state.threads, thread['.key'], thread)
    }
  }
}

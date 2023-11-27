import Vue from 'vue'
import {countObjectProperties} from '@/helpers'

export default {
  state: {
    threads: {}
  },
  // computed '.getters'
  getters: {
    getRepliesCount: state => id => countObjectProperties(state.threads[id].posts) - 1,
    getTreads (state, getters) {
      return state.thread
    },
    contributorsCount: (state, getters) => id => {
      const replyIds = Object.values(state.threads[id].posts).filter(postId => postId !== state.threads[id].firstPostId)
      const userIds = getters.getPostsByIds(replyIds).map(post => post.userId)
      return [...new Set(userIds)].length
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
    createTread ({commit, getters, dispatch}, {forumId, title, firstPostText}) {
      return new Promise((resolve, reject) => {
        const tread = {
          '.key': 'newTread' + Date.now(),
          forumId: forumId,
          posts: {},
          publishedAt: Math.floor(Date.now() / 1000),
          title: title,
          userId: getters.getAuthUser['.key']
        }
        commit('saveTread', tread)
        dispatch('createNewPost', {newPostText: firstPostText, threadId: tread['.key']})
                             .then(postId => {
                               const thread = getters.getThreadById(tread['.key'])
                               Vue.set(thread, 'firstPostId', postId)
                             })
        commit('addThreadToForum', {treadId: tread['.key'], forumId: forumId})
        resolve(tread['.key'])
      }
      )
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

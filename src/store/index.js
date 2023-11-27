// eslint-disable-next-line import/no-duplicates
import Vuex from 'vuex'
// eslint-disable-next-line import/no-duplicates
import {createStore} from 'vuex'
import Vue from 'vue'
import categoryStore from './modules/category'
import forumStore from './modules/forum'
import threadsStore from './modules/thread'
import postsStore from './modules/post'
import usersStore from './modules/user'
import firebase from 'firebase'
import { countObjectProperties } from '@/helpers'
Vue.use(Vuex)
// eslint-disable-next-line no-new
export default createStore({
  modules: {
    categoryStore,
    forumStore,
    threadsStore,
    postsStore,
    usersStore
  },
  getters: {
    getObjectsCount () {
      return (objects) => countObjectProperties(objects)
    }
  },
  actions: {
    async fetchItemsByIds ({commit, state, dispatch}, {source, ids}) {
      const itemIds = Array.isArray(ids) ? ids : Object.values(ids)
      const itemPromises = []
      for (let itemId of itemIds) {
        itemPromises.push(dispatch('fetchItem', {source, id: itemId}))
      }
      return Promise.all(itemPromises)
    },
    async fetchItem ({commit, state}, {source, id}) {
      const database = firebase.database()
      await database.ref(source).child(id).once('value', itemRecord => {
        const item = {...itemRecord.val()}
        item['.key'] = itemRecord.key
        commit('saveItem', {source, item})
      })
      return state[source + 'Store'][source][id]
    }
  },
  mutations: {
    saveItem (state, {source, item}) {
      Vue.set(state[source + 'Store'][source], item['.key'], item)
    }
  }
})

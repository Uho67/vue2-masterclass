// eslint-disable-next-line import/no-duplicates
import Vuex from 'vuex'
// eslint-disable-next-line import/no-duplicates
import {createStore} from 'vuex'
import Vue from 'vue'
import categoriesStore from './modules/category'
import forumsStore from './modules/forum'
import threadsStore from './modules/thread'
import postsStore from './modules/post'
import usersStore from './modules/user'
import firebase from 'firebase'
import { countObjectProperties } from '@/helpers'
Vue.use(Vuex)
// eslint-disable-next-line no-new
export default createStore({
  modules: {
    categoriesStore,
    forumsStore,
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
    async fetchAllItems ({commit, state, dispatch}, {source}) {
      await firebase.database().ref(source).once('value', snapshot => {
        const objects = snapshot.val()
        for (let object of Object.values(objects)) {
          commit('saveItem', {source, item: object})
        }
      })
      return state[source + 'Store'][source]
    },
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
        commit('saveItem', {source, item})
      })
      return state[source + 'Store'][source][id]
    }
  },
  mutations: {
    saveItem (state, {source, item}) {
      if (!item['.key']) {
        item['.key'] = item['key']
      }
      Vue.set(state[source + 'Store'][source], item['.key'], item)
    }
  }
})

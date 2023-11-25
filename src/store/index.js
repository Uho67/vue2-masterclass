// eslint-disable-next-line import/no-duplicates
import Vuex from 'vuex'
// eslint-disable-next-line import/no-duplicates
import {createStore} from 'vuex'
import Vue from 'vue'
import categoryStore from './modules/category'
import forumStore from './modules/forum'
import threadStore from './modules/thread'
import postStore from './modules/post'
import userStore from './modules/user'
Vue.use(Vuex)

// eslint-disable-next-line no-new
export default createStore({
  modules: {
    categoryStore,
    forumStore,
    threadStore,
    postStore,
    userStore
  }
})

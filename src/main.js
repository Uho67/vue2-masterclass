// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import AppDate from './components/AppDate.vue'
// import firebase from 'firebase'
import firebase from 'firebase'
import store from './store'

Vue.component('AppDate', AppDate)
const firebaseConfig = {
  apiKey: 'AIzaSyDI4xAu6lpOVKAPhYRqD3uWkImrZdSclvM',
  authDomain: 'vue-firebase-start.firebaseapp.com',
  databaseURL: 'https://vue-firebase-start-default-rtdb.firebaseio.com',
  projectId: 'vue-firebase-start',
  storageBucket: 'vue-firebase-start.appspot.com',
  messagingSenderId: '670634157051',
  appId: '1:670634157051:web:ada1196642ae86cb66e15e'
}
firebase.initializeApp(firebaseConfig)

Vue.prototype.$store = store
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ThreadPage from '@/pages/ThreadPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import PageForumShow from '@/pages/PageForumShow.vue'
import CategoryShowPage from '@/pages/CategoryShowPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import NewTreadPage from '@/pages/NewTreadPage.vue'
import EditTreadPage from '@/pages/EditTreadPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/category/:id/',
      name: 'category.show',
      component: CategoryShowPage,
      props: true
    },
    {
      path: '/profile/:mode?',
      name: 'profile',
      component: ProfilePage,
      props: (route) => ({ editMode: route.params.mode === 'edit' })
    },
    {
      path: '/new-tread/:forumId?',
      name: 'tread.new',
      component: NewTreadPage,
      props: true
    },
    {
      path: '/edit-tread/:threadId?',
      name: 'tread.edit',
      component: EditTreadPage,
      props: true
    },
    {
      path: '/forum/:id/',
      name: 'forum.show',
      component: PageForumShow,
      props: true
    },
    {
      path: '/thread/:id/',
      name: 'tread.show',
      component: ThreadPage,
      props: (route) => ({ id: route.params.id })
    },
    {
      path: '*',
      name: 'Not found',
      component: NotFoundPage
    }
  ],
  mode: 'history'
})

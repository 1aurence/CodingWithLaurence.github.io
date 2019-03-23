import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import LogIn from '@/components/LogIn'
import SignUp from '@/components/SignUp'
import ViewArticle from '@/components/ViewArticle'
import SavedArticles from '@/components/SavedArticles'
import Profile from '@/components/Profile'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/login',
      name: 'ViewArticle',
      component: ViewArticle,
      props: true
    },
    {
      path: '/saved-articles',
      name: 'SavedArticles',
      component: SavedArticles,
      props: true
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      props: true
    },

  ]
})





export default router
import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'aboutme',
      component: () => import('../views/AboutMe.vue')
    },
    {
      path: '/twitterclone',
      name: 'twitterclone',
      component: () => import('../views/TwitterClone.vue')
    },
    {
      path: '/animelist',
      name: 'animelist',
      // meta: {
      //   keepAlive: false
      // },
      component: () => import('../views/AnimeList.vue')
    }
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router

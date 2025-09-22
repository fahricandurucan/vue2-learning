import AboutPage from '@/views/AboutPage.vue'
import ContactPage from '@/views/ContactPage.vue'
import HomePage from '@/views/HomePage.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'
import PhotosPage from '@/views/PhotosPage.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/about',
        name: 'About',
        component: AboutPage
    },
    {
        path: '/contact',
        name: 'Contact',
        component: ContactPage
    },
    {
        path: '/photos/:id',
        name: 'Photos',
        component: PhotosPage
    },
    {
        path: '*',
        component: NotFoundPage
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// router.beforeEach((to, from, next) => {
//     console.log(to)
//     console.log(from)
//     next()

// })

router.beforeResolve((to, from, next) => {
    if(to.name){
        NProgress.start()
    }
    next()
})

router.afterEach(() => {
    NProgress.done()
})



export default router

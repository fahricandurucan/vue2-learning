import Vue from 'vue'
import VueRouter from 'vue-router'
import SearchTrip from '@/views/SearchTrip.vue'
import SelectSeatView from '@/views/SelectSeatView.vue'
import PassengerInfo from '@/views/PassengerInfo.vue'
import AboutView from '@/views/AboutView.vue'
import PaymentView from '@/views/PaymentView.vue'

Vue.use(VueRouter)

const routes= [
        {
            path: '/',
            alias: '/home',
            name: 'home',
            redirect: '/searchtrip',
            
        },
        {
            path: '/searchtrip',
            name: 'searchtrip',
            component: SearchTrip
        },
        {
            path: '/selectseat/:sefer_id?',
            name: 'selectseat',
            component: SelectSeatView
        },
        {
            path: '/passengerinfo',
            name: 'passengerinfo',
            component: PassengerInfo
        },
        {
            path: '/paymentInfo',
            name: 'paymentInfo',
            component: PaymentView
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: AboutView
        }
    ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

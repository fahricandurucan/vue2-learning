import Home from 'src/pages/Home.vue'
import Settings from 'src/pages/Settings.vue'
import Todos from 'src/pages/Todos.vue'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: Home },
      {path: '/todos', component: Todos},
      {path: '/settings', component: Settings}
    ]
  },



  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

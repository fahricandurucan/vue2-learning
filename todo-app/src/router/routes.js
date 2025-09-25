import Home from 'src/pages/Home.vue'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: Home }
    ]
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

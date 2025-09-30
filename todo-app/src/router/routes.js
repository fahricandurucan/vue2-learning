import Home from 'src/pages/Home.vue'
import LateTodos from 'src/pages/LateTodos.vue'
import Settings from 'src/pages/Settings.vue'
import TodoDetail from 'src/pages/TodoDetail.vue'
import Todos from 'src/pages/Todos.vue'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: Home },
      {path: '/todos', component: Todos},
      {path: '/settings', component: Settings},
      {path: '/detail/:id', name: 'todo-detail', component: TodoDetail},
      {path: '/lateTodos', name:'late-todos', component: LateTodos}
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

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    myTodoList:[
      {
    id: 1,
    title: 'Toplantı notlarını hazırla',
    description: 'Yarınki ekip toplantısı için tüm notları toparla ve sunuma ekle.',
    isDone: false,
    priority: 'Yüksek',
    tag: ['İş'],
    createdAt: new Date('2025-09-20T10:00:00'),
    updatedAt: new Date('2025-09-21T15:30:00'),
    dueDate: new Date('2025-09-25T09:00:00'),
    completedAt: null,
    status: 'unCompleted'
  },
  {
    id: 2,
    title: 'Alışveriş listesi oluştur',
    description: 'Hafta sonu için gerekli gıda ve temizlik malzemelerini listele.',
    isDone: true,
    priority: 'Orta',
    tag: ['Kişisel'],
    createdAt: new Date('2025-09-18T12:15:00'),
    updatedAt: new Date('2025-09-19T14:00:00'),
    dueDate: new Date('2025-09-22T18:00:00'),
    completedAt: new Date('2025-09-21T17:45:00'),
    status: 'completed'
  },
  {
    id: 3,
    title: 'Projeyi GitHub’a yükle',
    description: 'Tüm dosyaları GitHub repository’sine yükle ve README güncelle.',
    isDone: false,
    priority: 'Yüksek',
    tag: ['İş', 'Önemli'],
    createdAt: new Date('2025-09-19T09:30:00'),
    updatedAt: null,
    dueDate: new Date('2025-09-28T12:00:00'),
    completedAt: null,
    status: 'unCompleted'
  },
  {
    id: 4,
    title: 'Kitap oku',
    description: 'Haftalık okuma hedefine göre 50 sayfa oku.',
    isDone: true,
    priority: 'Düşük',
    tag: ['Kişisel'],
    createdAt: new Date('2025-09-15T20:00:00'),
    updatedAt: new Date('2025-09-18T21:00:00'),
    dueDate: new Date('2025-09-20T20:00:00'),
    completedAt: new Date('2025-09-18T20:30:00'),
    status: 'completed'
  },
  {
    id: 5,
    title: 'Ev temizliği yap',
    description: 'Salonda ve mutfakta detaylı temizlik yap.',
    isDone: false,
    priority: 'Orta',
    tag: ['Kişisel', 'Önemli'],
    createdAt: new Date('2025-09-22T11:00:00'),
    updatedAt: null,
    dueDate: new Date('2025-09-26T16:00:00'),
    completedAt: null,
    status: 'continue'
  }
   
    ],
    completedTodoList: [],
    notCompletedTodoList: [],
    activeTodo:{}
  },
  getters: {
    allTodos(state){
      return state.myTodoList;
    },
    completedTodoList(state){
      return state.myTodoList.filter(todo => (todo.isDone === true) && (todo.status === 'completed'))
    },
    activeTodoList(state){
      return state.myTodoList.filter(todo => (todo.isDone === false) && (todo.status === 'unCompleted'))
    },
    inProgressTodoList(state){
      return state.myTodoList.filter(todo => todo.status === 'continue')
    },
     onHoldTodoList(state){
      return state.myTodoList.filter(todo => todo.status === 'wait')
    }
  },
  mutations: {
    addNewTodo(state, todo){
      state.myTodoList.push(todo)
    },
    toggleTodoDone(state, todoId){
      const todo = state.myTodoList.find(t => t.id === todoId)
      if (todo) {
        todo.isDone = !todo.isDone
        
        if (todo.isDone) {
          todo.completedAt = new Date()
        } else {
          todo.completedAt = null
        }
      }

    },
    deleteTodo(state, todoId){
      const todoIndex = state.myTodoList.findIndex(todo => todo.id === todoId);
      if(todoIndex !== -1){
        state.myTodoList.splice(todoIndex,1);
      }
    },
    updateTodo(state, updatedTodo){
      const index = state.myTodoList.findIndex(todo => todo.id === updatedTodo.id);
      
      if (index !== -1) {
        state.myTodoList.splice(index, 1, updatedTodo)
      }

    },
    changeTaskStatusForKanban(state, { todoId, status }) {
      let todo = state.myTodoList.find(t => t.id === todoId);
      console.log('mutation başlangıcı '+state + todoId)
      if (todo) {
        todo.status = status;
      }
      if(status === 'completed'){
        todo.isDone = true;
        todo.completedAt = new Date()
      }
    }
  },

  // async
  actions: {
    setUser(context){
      context.commit('setUser');
    },
    incrementFollower: ({commit}) => commit('incrementFollower'),
    decreaseFollower({commit, state}){
      if(state.activeUser.follower > 0){
        commit('decreaseFollower')
      }
    },
   incrementFollowerAsync({ commit }) {
      return new Promise((resolve) => {   
        setTimeout(() => {
          commit('incrementFollower')
          resolve() 
        }, 5000)
      })
    }


  },
  modules: {
  }
})
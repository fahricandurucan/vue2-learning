import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    myTodoList:[
      {
        id: 1,
        title: 'Todo 1',
        description: 'Todo 1 description',
        isDone: false,
        priority: 'Düşük',
        tag: ['İş']
       
      },
      {
        id: 2,
        title: 'Todo 2',
        description: 'Todo 2 description',
        isDone: true,
        priority: 'Orta',
        tag: ['İş']
      },
      {
        id: 3,
        title: 'Todo 3',
        description: 'Todo 3 description',
        isDone: false,
        priority: 'Yüksek',
        tag: ['İş']
      },
      {
        id: 4,
        title: 'Todo 4',
        description: 'Todo 4 description',
        isDone: false,
        priority: 'Yüksek',
        tag: ['İş']
      },
      {
        id: 5,
        title: 'Todo 5',
        description: 'Todo 5 description',
        isDone: false,
        priority: 'Yüksek',
        tag: ['İş']
      }
      ,
      // {
      //   id: 6,
      //   title: 'Todo 6',
      //   description: 'Todo 6 description',
      //   isDone: false,
      //   priority: 'Yüksek',
      //   tag: ['İş']
      // },
      // {
      //   id: 7,
      //   title: 'Todo 7',
      //   description: 'Todo 7 description',
      //   isDone: false,
      //   priority: 'Yüksek',
      //   tag: ['İş']
      // },
      // {
      //   id: 8,
      //   title: 'Todo 8',
      //   description: 'Todo 8 description',
      //   isDone: false,
      //   priority: 'Yüksek',
      //   tag: ['İş']
      // },
      // {
      //   id: 9,
      //   title: 'Todo 9',
      //   description: 'Todo 9 description',
      //   isDone: false,
      //   priority: 'Yüksek',
      //   tag: ['İş']
      // },
      // {
      //   id: 10,
      //   title: 'Todo 10',
      //   description: 'Todo 10 description',
      //   isDone: false,
      //   priority: 'Yüksek',
      //   tag: ['İş']
      // },
      // {
      //   id: 11,
      //   title: 'Todo 11',
      //   description: 'Todo 11 description',
      //   isDone: false,
      //   priority: 'Yüksek',
      //   tag: ['İş']
      // },
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
      return state.myTodoList.filter(todo => todo.isDone === true)
    },
    activeTodoList(state){
      return state.myTodoList.filter(todo => todo.isDone === false)
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
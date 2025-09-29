// store/localStoragePlugin.js
import { LocalStorage } from 'quasar'

export const localStoragePlugin = (storageKey = 'myTodoList') => {
  let timer = null
  const tracked = [
    'addNewTodo',
    'updateTodo',
    'deleteTodo',
    'toggleTodoDone',
    'changeTaskStatusForKanban',
    'setTodos',
    'setAppTheme'
  ]

  return store => {
    store.subscribe((mutation, state) => {
      if (!tracked.includes(mutation.type)) return
      clearTimeout(timer)
      timer = setTimeout(() => {
        LocalStorage.set(storageKey, {
          todos: state.myTodoList,
          darkMode: state.darkMode
        })
      }, 100)
    })
  }
}

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeUser:{

    }
  },
  getters: {
    fullName(state){
      return state.activeUser.name + ' - ' + state.activeUser.surname
    },
    isYoung(state){
      if(state.activeUser.age <= 30){
        return 'Young'
      }else{
        return 'Old'
      }
    }
  },
  mutations: {
    setUser(state){
      state.activeUser = {
        name:'Fahrican',
        surname:'Durucan',
        age:23,
        follower:123,
        title: 'Software Developer',
        image: 'logo.png'
      }
    },
    incrementFollower(state){
      state.activeUser.follower++
    },
    decreaseFollower(state){
      state.activeUser.follower--
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

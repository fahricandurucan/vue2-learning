<template>
  <div id="app">
    <h3>Declarative Rendering</h3>
    <p>{{ message }}</p>
    <button v-on:click="message = 'Butona Tıklandı'">Button</button>
    <br>
    <span v-bind:title="title">Fareyi üstüne getir</span>
    <br>
    <span v-bind:title="testMessage">Bekleeee</span>
    <br>
    <p>Input text = {{ inputText }}</p>
    <input type="text" v-model="inputText" placeholder="Bir şeyler yazın">
    
    <h3>Conditionals and Loops</h3>
    <p v-if="isChamp">Fenerbahçe şampiyon</p>
    <p>ADS şampiyon</p>

    <p v-if="type == 'A'">Type A</p>
    <p v-else-if="type == 'B'">Type B</p>
    <p v-else>Type C</p>

    <ul>
      <li v-for="(team, index) in activeTeams" :key="index">
        {{ team.name }}
      </li>
    </ul>

    <h3>Handling User Input</h3>
    <p>{{ eventMessage }}</p>
    <button v-on:click="reverseMessage">Mesajı Ters Çevir</button>

    <h3>TODO EXAMPLE</h3>
    <p>{{ todo }}</p>
    <input type="text" v-model="todo" placeholder="Yeni görev ekle">
    <button @click="addTodo">Ekle</button>

    <li v-for="(value, index) in todoList" :key="index">
      {{ value }}
    </li>


  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      message: 'Butona Tıklanmadı',
      title: 'Bu mesaj span elementinin title özelliğine bağlandı',
      testMessage: 'Sen çok uzakta bir yerdesin' + new Date().toLocaleString(),
      inputText: '',
      isChamp: true,
      type: 'B',
      teams:[
        {
          name: 'Fenerbahçe',
          isChamp: false
        },
        {
          name: 'Galatasaray',
          isChamp: false
        },
        {
          name: 'Beşiktaş',
          isChamp: true
        }
      ],
      eventMessage: 'Mesaj Ters Çevrilmedi',
      todo: '',
      todoList: []
    }
  },
   computed: {
    activeTeams() {
      return this.teams.filter(team => team.isChamp)
    }
  },
  methods: {
    reverseMessage: function () {
      this.eventMessage = this.eventMessage.split('').reverse().join('')
    },
    addTodo: function() {
      if(this.todo.trim() !== '') {
        this.todoList.push(this.todo);
        this.todo = '';
      }
    }

  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

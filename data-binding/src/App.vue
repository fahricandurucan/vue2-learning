<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>*** v-model, data ve iki yönlü bağlama ***</h1>
    <p>{{ name }}</p>
    <input type="text" v-model="name" placeholder="Adınızı Giriniz"/>

    <h1>*** method, clik kullanımı ***</h1>
    <p>{{ count }}</p>
    <button @click="increment">Arttır</button> <button @click="decrease">Azalt</button>

    <h1>*** computed kullanımı ***</h1>
    <p>Orijinal: {{ message }}</p>
    <p>Büyük Harf: {{ upperCase }}</p>

    <h1>*** watch kullanımı ***</h1>
    <input v-model="watchName" placeholder="Adınızı girin"/>
    <p>Merhaba: {{ greeting }}</p>
  </div>
</template>

<script>


export default {
  name: 'App',
  data() {
    return {
      name: '',
      count: 0,
      message: 'vue öğrenmeye başladım',
      watchName: '',
    }
  },
  methods: {
    increment() {
      this.count += 1;
    },
    decrease() {
      if(this.count > 0){
        this.count -= 1;
      }
      
    }
  },
  computed: {
    upperCase() {
      return this.message.toUpperCase();
    }
  },
   watch: {
    watchName(newVal) {
      this.greeting = newVal ? `Merhaba, ${newVal}!` : "";
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

<template>
  <div id="app">
    <div class="card" style="width: 18rem;" v-if="this.$store.state.activeUser.name">
      <img :src="profileImage" class="card-img-top" alt="...">
      <div class="card-body">
        <!-- <h5 class="card-title">{{ $store.state.activeUser.name }} {{ $store.state.activeUser.surname }}</h5> -->
        <h5 class="card-title">{{ fullName }}
          <span class="bg-success text-white p-1 rounded">
            {{ isYoung }}
          </span>
        </h5>
        <p>Unvan: {{ $store.state.activeUser.title }}</p>
        <p>Takipçi sayısı: {{ $store.state.activeUser.follower }}</p>
      </div>

    </div>

    <hr>

    <button @click="setUser" class="btn btn-primary">Kullanıcı Ayarla</button>
    <button @click="incrementFollower" class="btn btn-success">Arttır</button>
    <button @click="incrementFollowerAsync" class="btn btn-success">Arttır(Async)</button>

    <button @click="decreaseFollower" class="btn btn-danger">Azalt</button>


  </div>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
  name: 'App',
  created() {
    this.$store.commit('setUser');

  },
  computed: {
    profileImage() {
      if (this.$store.state.activeUser.profileImage) {
        return require('./assets/' + this.$store.state.activeUser.image);

      }
      else {
        return require('./assets/' + this.$store.state.activeUser.image);


      }
    },
    ...mapGetters(['fullName', 'isYoung'])
  },
  methods: {
    setUser() {
      this.$store.commit('setUser');
      console.log(this.$store.state.activeUser.profileImage)
    },
    incrementFollower() {
      // this.$store.commit('incrementFollower');
      this.$store.dispatch('incrementFollower')
    },
    decreaseFollower() {
      this.$store.commit('decreaseFollower');
    },
    incrementFollowerAsync(){
      this.$store.dispatch('incrementFollowerAsync').then(() => {})
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

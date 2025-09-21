<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img src="./assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
          Envanter Takip Projesi
        </a>
        <!-- Toggler düğmesi -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <!-- Form -->
          <form class="d-flex ms-auto my-2 my-lg-0" @submit.prevent="search">
            <input type="search" class="form-control me-2" placeholder="Ara" aria-label="Ara" v-model="searchQuery">
            <button class="btn btn-success" type="submit">Ara</button>
          </form>
        </div>
      </div>
    </nav>


    <div class="container">
      <EnvanterForm :title="'Envanter Form Kayıt'" @save-item="itemSaved"></EnvanterForm>


      <hr>
      <div class="row">
        <EnvanterList :title="'Aktif Kayıtlar'" :envanter-list="activeItems" @delete-item="itemDeleted"></EnvanterList>
        <EnvanterList :title="'Arşiv Kayıtlar'" :envanter-list="arsivItems" @delete-item="itemDeleted"></EnvanterList>
      </div>
    </div>
  </div>



</template>

<script>
import EnvanterForm from './components/EnvanterForm.vue';
import EnvanterList from './components/EnvanterList.vue';


export default {
  name: 'App',
  components: {
    EnvanterList,
    EnvanterForm
  },
  data() {
    return {
      item: {},
      allItems: [
        { "id": 1, "baslik": "Masa", "kategori": "Mobilya", "adet": "1", "fiyat": 259, "arsiv": false },
        { "id": 2, "baslik": "Kitaplık", "kategori": "Mobilya", "adet": "2", "fiyat": 159, "arsiv": false },
        { "id": 3, "baslik": "Monitor", "kategori": "Elektronik", "adet": "5", "fiyat": 400, "arsiv": true }
      ],
      searchQuery: '',
      filteredItems: [],
      isSearching: false

    };
  },
  methods: {
    itemDeleted(itemId) {
      this.allItems = this.allItems.filter(item => item.id !== itemId);

    },
    itemSaved(newItem) {
      this.allItems.push(newItem);
    },
    search() {
      if(this.searchQuery.length>0){
        this.isSearching = true;
        this.filteredItems = this.allItems.filter(item => item.baslik.toLowerCase().includes(this.searchQuery.toLowerCase()));
      } else {
        this.isSearching = false;
        this.filteredItems = this.allItems
      }
     
    }
  },


  computed: {
    activeItems() {
      return this.filteredItems.filter(item => !item.arsiv);
    },
    arsivItems() {
      return this.filteredItems.filter(item => item.arsiv);
    },
  },
  created() {
    this.filteredItems = this.allItems;
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

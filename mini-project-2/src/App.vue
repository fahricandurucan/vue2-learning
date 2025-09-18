<template>
  <div id="app">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top shadow-sm">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="#">
          <img src="./assets/logo.png" style="height: 28px" class="me-2">
          Yapılacaklar Listesi
        </a>
        <button 
          class="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#collapseContent" 
          aria-controls="collapseContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="collapseContent">
          <form class="d-flex ms-auto my-2 my-lg-0">
            <input class="form-control me-2" type="search" placeholder="Aranan" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Ara</button>
          </form>
          <ul class="navbar-nav ms-3">
            <li class="nav-item dropdown">
              <a 
                class="nav-link dropdown-toggle" 
                href="#" 
                id="navbarDropdown" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                Kullanıcı
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Profil</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Çıkış</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- İçerik -->
    <main role="main" class="container mt-5 pt-4">
      <div class="row">
        <!-- Sidebar -->
        <div class="col-md-3" id="sidebar">
          <h5 class="text-muted mb-3">Kategoriler</h5>
          <div class="list-group mb-3">
            <a 
              v-for="(category,index) in categoryLists" 
              :key="index"
              href="#"
              class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              :class="category.id % 2 === 0 ? 'list-group-item-success' : 'list-group-item-primary'"
              @click="currentCategory = category.title"
            >
              {{ category.title }}
              <span class="badge bg-danger rounded-pill">{{ todoCountOfCategory(category.title) }}</span>
            </a>
          </div>
          <input 
            class="form-control" 
            placeholder="Kategori ekle (Enter)" 
            v-model="newCategory" 
            @keyup.enter="addNewCategory"
          >
        </div>

        <!-- Todo List -->
        <div class="col-md-9">
          <h4 class="mb-3">
            {{currentCategory}}
            <small class="text-muted">({{ todoCountOfCategory(currentCategory) }})</small>
          </h4>
          <form class="row g-2 mb-3" @submit="submitTodo">
            <div class="col-sm">
              <input 
                type="text" 
                class="form-control" 
                placeholder="Yeni görev yaz" 
                v-model="dataItem.title"
              >
            </div>
            <div class="col-sm-auto">
              <button 
                type="submit" 
                class="btn btn-primary w-100"
                :disabled="!dataItem.title.length>0"
              >
                Kaydet
              </button>
            </div>
          </form>

          <!-- Yapılacaklar -->
          <table class="table table-hover align-middle">
            <p v-if="unCompletedTodos.length == 0" class="text-muted">Yapılacak iş kalmadı 🎉</p>
            <tr v-for="(todo,index) in unCompletedTodos" :key="index">
              <td style="width:50px">
                <button 
                  class="btn btn-sm" 
                  :class="todo.status ? 'btn-success' : 'btn-outline-secondary'" 
                  @click="addingCompletedList(todo.id)"
                >
                  <i :class="todo.status ? 'bi bi-check' : 'bi bi-x-circle'"></i>
                </button>
              </td>
              <td class="text-start">{{ todo.title }}</td>
              <td class="text-end">
                <button class="btn btn-sm btn-danger" @click="deleteItem(todo.id)">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </table>

          <hr>

          <!-- Tamamlananlar -->
          <h5 class="mb-2">Tamamlananlar</h5>
          <p v-if="completedTodos.length == 0" class="text-muted">Henüz tamamlanan görev yok</p>
          <table class="table table-hover align-middle">
            <tr v-for="(todo,index) in completedTodos" :key="index">
              <td style="width:50px">
                <button class="btn btn-sm btn-success" @click="removeCompletedList(todo.id)">
                  <i class="bi bi-check"></i>
                </button>
              </td>
              <td class="text-start">{{ todo.title }}</td>
            </tr>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>


<script>


export default {
  name: 'App',
  data() {
    return {
      dataLists: [
        { id: 1, title: 'ders notlarını hazırla', status: true, category: 'is' },
        { id: 2, title: 'alışverişe git', status: false, category: 'ev' },
        { id: 3, title: 'spor yap', status: false, category: 'kişisel' },
        { id: 4, title: 'kitap oku', status: true, category: 'kişisel' },
        { id: 5, title: 'ödevleri yap', status: false, category: 'is' },
      ],
      categoryLists: [
        { id: 1, title: 'İş'},
        { id: 2, title: 'Ev'},
        { id: 3, title: 'Genel'},
        { id: 4, title: 'Okul'},
        { id: 5, title: 'Kişisel'},
      ],
      currentCategory: '',
      dataItem: { id: null, title: '', status: false, category: '' },
      newCategory: '',
    }
  },
  computed: {
    completedTodos(){
      return this.dataLists.filter(item => item.status === true && (item.category.toLowerCase() === this.currentCategory.toLowerCase()));
    },
    unCompletedTodos(){
      return this.dataLists.filter(item => item.status === false && (item.category.toLowerCase() === this.currentCategory.toLowerCase()));
    },
  },
  methods: {
    addingCompletedList(id){
      const index = this.dataLists.findIndex(item => item.id === id);
      if(index !== -1){
        this.dataLists[index].status = !this.dataLists[index].status;
      }
    },
    removeCompletedList(id){
      const index = this.dataLists.findIndex(item => item.id === id);
      if(index !== -1){
        this.dataLists[index].status = !this.dataLists[index].status;
      }
    },
    submitTodo(e){
      e.preventDefault();
      const newId = this.dataLists.length ? Math.max(...this.dataLists.map(item => item.id)) + 1 : 1;
      this.dataItem.category = this.currentCategory;

      const newItem = { ...this.dataItem, id: newId };
      this.dataLists.push(newItem);
      this.dataItem.title = '';
      this.dataItem.status = false;
      this.dataItem.category = '';
      this.dataItem.id = null;
    },
    deleteItem(index){
      this.dataLists = this.dataLists.filter(item => item.id !== index);
    },
    todoCountOfCategory(categoryTitle){
      console.log(categoryTitle);
      return this.dataLists.filter(item => item.category.toLowerCase() === categoryTitle.toLowerCase()).length;
    },
    addNewCategory(e){
      e.preventDefault();
      if(!this.newCategory.length){
        alert('Kategori adı boş olamaz');
        return;
      }
      const newId = this.categoryLists.length ? Math.max(...this.categoryLists.map(item => item.id)) + 1 : 1;
      const newCategory = { id: newId, title: this.newCategory };
      this.categoryLists.push(newCategory);
      this.newCategory = '';
    },
   
  },
  created(){
    this.currentCategory = this.categoryLists[0].title;
  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 100px;
}

.list-group-item.row {
  display: flex;
}

#sidebar  h2 {
  font-size: 1.1rem; color: #666666;
}
</style>

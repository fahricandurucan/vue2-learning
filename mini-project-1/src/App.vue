<template>
  <div id="app">
    <button class="btn btn-info float-right" v-on:click="newUser">Yeni Kayıt</button>
    <!-- Modal -->
    <div class="modal fade" id="userModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Yeni Kullanıcı</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <p>Kullanıcı bilgilerini buraya ekle</p>
            <form @submit.prevent>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">İsim</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" v-model="activeUser.name" placeholder="İsim">
                </div>
              </div>
              <br>

              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Yaş</label>
                <div class="col-sm-10">
                  <input type="number" class="form-control" v-model="activeUser.age" placeholder="Yaş">
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Kapat</button>
            <button type="button" class="btn btn-primary" v-on:click="addUser">Kaydet</button>
          </div>
        </div>
      </div>
    </div>
    <h1>
      Kullanıcılar 
      <span class="badge bg-primary">{{ users.length }}</span>
    </h1>
    <hr>
    <table class="table table-bordered table-hover">
      <tr class="bg-success text-white">
        <th>ID</th>
        <th>Ad</th>
        <th>Yaş</th>
        <th>İşlem</th>
      </tr>
      <tr v-for="(user, index) in users" :key="index">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.age }}</td>
        <td>
          <button class="btn btn-danger btn-sm" style="margin-right: 5px;" @click="deleteUser(index)">
              <i class="bi bi-trash"></i>
          </button>
          <button class="btn btn-warning btn-sm" style="margin-right: 5px;" @click="editUser(index)">
            <i class="bi bi-pencil"></i>
          </button>

        </td>
      </tr>
    </table>

  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  name: 'App',
  data(){
    return{
      users: [{id:1, name:"Ahmet", age:30},
              {id:2, name:"Mehmet", age:25},
              {id:3, name:"Ayşe", age:28},
              {id:4, name:"Fatma", age:32}],
      activeUser:{id:"", name:"", age:""},        
    }
  },
  methods:{
    newUser(){
      this.openModal();

    },
    addUser(){
      if(this.activeUser.name === "" || this.activeUser.age === ""){
        alert("Lütfen tüm alanları doldurun!");
        return;
      }
      if(isNaN(this.activeUser.age) || this.activeUser.age <= 0 || this.activeUser.age > 120){
        alert("Lütfen geçerli bir yaş girin!");
        return;
      }
      // günceleme işlemi
      if(this.activeUser.id > 0){
        let user = this.users.find(u => u.id === this.activeUser.id);
        // eslint-disable-next-line no-unused-vars
        user = this.activeUser;
        this.closeModal();

      }
      else{
        this.activeUser.id = this.users.length + 1;
        this.users.push(this.activeUser);
        this.activeUser = {id:"", name:"", age:""};
        this.closeModal();
      }
      
    },
    openModal() {
      const modalEl = document.getElementById('userModal');
      this.userModal = new Modal(modalEl);
      this.userModal.show();
    },
    closeModal() {
      if (this.userModal) {
        this.activeUser = {id:"", name:"", age:""};
        this.userModal.hide();
      }
    },
    deleteUser(index){
      this.users.splice(index, 1);

    },
    editUser(index){
      this.activeUser = this.users[index];
      this.openModal();

    }  
  }


}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  padding: 30px;
}
</style>

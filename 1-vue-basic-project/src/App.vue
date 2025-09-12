<template>
  <div id="app">
    <h1>Not Defterim</h1>
    <p>Hoş geldiniz! Notlarınızı buraya ekleyebilirsiniz.</p>
    <!--1---not ekleme alanı -->
    <input type="text" placeholder="Başlık" v-model="noteTitle"/>
    <textarea type="text" placeholder="İçerik" v-model="noteContent"></textarea>
    <button @click="addNote">Kaydet/Ekle</button>
    
    <!--2---notları listeleme alanı -->
    <div v-for="(note,index) in notes" :key="index" :style="noteStyle(note)">
      <h3>{{ note.title }}</h3>
      <p>{{ note.content }}</p>
    </div>

    <!--3---canlı not özeti -->
    <div>
      <h2>Özet</h2>
      <p>Toplam Not Sayısı: {{ totalNotes }}</p>
      <p>En Uzun Not: {{ longestNote }}</p>
      <p>En Son Eklenen Not: {{ lastNote }}</p>
    </div>

  </div>

  
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      noteTitle: '',
      noteContent: '',
      notes: []

    };
  },
  methods: {
    addNote() {
      if (this.noteTitle && this.noteContent) {
        this.notes.push({
          title: this.noteTitle,
          content: this.noteContent
        });
        this.noteTitle = '';
        this.noteContent = '';
      } else {
        alert('Lütfen başlık ve içerik giriniz.');
      }
    },
    noteStyle(note) {
      return {
        backgroundColor: note.content.length > 50 ? '#f8d7da' : '#d4edda',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px'
      };
    }
  },
  computed: {
    totalNotes(){
      return this.notes.length;
    },
    longestNote(){
      if(this.notes.length === 0) return 'Yok';
      let longest = this.notes.reduce((a,b) => a.content.length > b.content.length ? a : b);
      return longest.title;
    },
    lastNote(){
      if(this.notes.length === 0) return 'Yok';
      return this.notes[this.notes.length - 1].title;
    }
  },
  watch: {
    notes(newNotes) {
      console.log("Notlar değişti:", newNotes);
    }
  }

}
</script>

<style>
#app {
  max-width: 600px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
}
body {
  background-color: #c2c59e;
  color: #333;
}
input, textarea {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
}
button {
  margin-bottom: 20px;
}
</style>

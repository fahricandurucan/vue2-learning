<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <ParentComponent/>
    <hr>
    <h3>Event Bus emit/on</h3>
    <div class="row">
      <CardItem :item="sampleItem"/>
    </div>
    <ModalComponent/>
    <CardLists :cards="sampleItems" title="Kurs Listesi"/>
  </div>
</template>

<script>
import CardItem from './components/CardItem.vue';
import CardLists from './components/CardLists.vue';
import ModalComponent from './components/ModalComponent.vue';
import ParentComponent from './components/ParentComponent.vue';
import logo from '@/assets/logo.png'


export default {
  name: 'App',
  components: {
    ParentComponent,
    CardItem,
    ModalComponent,
    CardLists

  },
  data() {
    return {
      sampleItem: {
         title: 'Sample Title',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
          detail: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        imageUrl: logo
      },
            sampleItems: [
            {
                title: 'JavaScript Kursu',
                description: 'JavaScript ile web uygulamaları yapın',
                detail: 'JavaScript ile web uygulamaları yapın<br><b>Fiyatı:</b> 29',
                price: 29,
                imageUrl: logo
            }, {
                title: 'Vue.js Kursu',
                description: 'Vue.js ile web uygulamaları yapın',
                detail: 'Vue.js ile web uygulamaları yapın<br><b>Fiyatı:</b> 39',
                price: 39,
                imageUrl: logo
            }, {
                title: 'Laravel Kursu',
                description: 'Laravel ile web uygulamaları yapın',
                detail: 'Laravel ile web uygulamaları yapın<br><b>Fiyatı:</b> 59',
                price: 59,
                imageUrl: logo
            }, {
                title: 'Ionic ile Mobil Uygulama Geliştirme Kursu',
                description: 'Ionic ile mobil uygulamalar geliştirin',
                detail: 'Ionic ile mobil uygulamalar geliştirin<br><b>Fiyatı:</b> 59',
                price: 59,
                imageUrl: logo
            }]
    };
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

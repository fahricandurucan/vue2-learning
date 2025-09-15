<template>
  <div id="app">

    <!-- Class Binding:
    Elementin class’larını reactive bir şekilde değiştirmek
    Koşullu class ekleme/kaldırma
    Object ve Array ile esnek kullanım

    Style Binding:
    Inline style’ları reactive olarak değiştirmek
    Computed property veya data ile temiz, yeniden kullanılabilir yapı
    Array ile birden fazla style objesini üst üste uygulayabilmek -->



    <!-- CLASS BINDING -->
    <!-- Object syntax -->
    <div v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>

    <!-- static class lar ile kullanımı -->
    <!-- render sonucu : <div class="static active"></div> -->
    <div
      class="static"
      v-bind:class="{ active: isActive, 'text-danger': hasError }"
    ></div>

    <!-- computed properties ile kullanımı -->
    <div v-bind:class="classObject"></div>


    <!-- Array syntax -->
    <!-- Array kullanarak birden fazla sınıf bağlayabilirsin.
    Array elemanları string veya object olabilir -->

    <div v-bind:class="[activeClass, errorClass]"></div>
    <!-- render sonucu : <div class="active text-danger"></div> -->

    <!-- toggle class kullanımı -->

    <div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>

    <!-- Array içinde object de kullanabilirsin: -->
     <div v-bind:class="[{ active: isActive }, errorClass]"></div>
    <!-- render sonucu : <div class="active text-danger"></div> -->


    <!-- STYLE BINDING -->
    <!-- Object syntax -->
    <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
    <!-- render sonucu : <div style="color: red; font-size: 30px;"></div> -->

    <!-- Computed property ile kullanımı -->
    <div v-bind:style="styleObject"></div>
    <!-- render sonucu : <div style="color: red; font-size: 30px;"></div> -->


    <!-- b) Array Syntax -->
    <!-- Birden fazla style objesini üst üste uygulamak için kullanılır: -->
    <div v-bind:style="[baseStyles, overridingStyles]"></div>


  </div>
</template>

<script>


export default {
  name: 'App',
  data() {
  return {
    // render sonucu : <div class="active"></div>
    isActive: true,    
    hasError: false,
    activeClass: 'active',
    errorClass: 'text-danger',
    activeColor: 'red',
    fontSize: 30
  }
},
computed: {
  // CSS class’larını dinamik şekilde üretmek için bir obje döndü
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  },
  // Computed property ile daha temiz kullanım
  styleObject() {
    return {
      color: this.activeColor,
      fontSize: this.fontSize + 'px'
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

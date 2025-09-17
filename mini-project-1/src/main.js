import Vue from 'vue'
import App from './App.vue'
// Bootstrap CSS & JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

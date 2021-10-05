import { createApp } from 'vue'
import App from './App.vue'
import Vue from 'vue';
import router from './router'

createApp(App).use(router).use(router).mount('#app')


//**Global Variables**
//ApiUrl
Vue.prototype.$apiUrl = 'http://localhost:3001/api';
//User / Token
if (localStorage.user != undefined) {
  Vue.prototype.$token = JSON.parse(localStorage.user).token;
  Vue.prototype.$userid = JSON.parse(localStorage.user);
}
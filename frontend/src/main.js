import 'font-awesome/css/font-awesome.css'
import { createApp } from 'vue'
import App from './App.vue'  // sempre coloque a extensão .vue para evitar problemas
import store from './config/store';

const app = createApp(App)

app.use(store) // registers the Vuex store in the application

app.mount('#app')

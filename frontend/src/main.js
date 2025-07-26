import 'font-awesome/css/font-awesome.css'
import { createApp } from 'vue'
import App from './App.vue' 
import store from './config/store';
import './config/bootstrap'

const app = createApp(App)

app.use(store) // registers the Vuex store in the application

app.mount('#app')

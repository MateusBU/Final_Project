import 'font-awesome/css/font-awesome.css'
import { createApp } from 'vue'
import App from './App.vue' 
import store from './config/store';
import router from './config/router';
import './config/bootstrap'

const app = createApp(App)
    .use(store) // registers the Vuex store in the application
    .use(router)

    app.mount('#app')

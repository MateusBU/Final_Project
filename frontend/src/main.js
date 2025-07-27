import 'font-awesome/css/font-awesome.css'
import { createApp } from 'vue'
import App from './App.vue' 
import store from './config/store';
import router from './config/router';
import setupBootstrap from './config/bootstrap'


const app = createApp(App)
    .use(store) // registers the Vuex store in the application
    .use(router)

setupBootstrap(app)
app.mount('#app')

import 'font-awesome/css/font-awesome.css'
import { createApp } from 'vue'
import App from './App.vue' 
import store from './config/store';
import router from './config/router';
import setupBootstrap from './config/bootstrap'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import 'quill/dist/quill.snow.css'


const app = createApp(App)
    .use(store) // registers the Vuex store in the application
    .use(router)

app.use(Toast, {
  timeout: 3000,
  icon: true,
});

setupBootstrap(app)
app.mount('#app')

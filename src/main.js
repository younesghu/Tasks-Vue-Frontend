import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css';
import './index.css'

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')

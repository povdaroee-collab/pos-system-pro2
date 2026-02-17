import { createApp } from 'vue'
import { createPinia } from 'pinia' // 1. នាំចូល Pinia
import './assets/main.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia()) // 2. ប្រើប្រាស់ Pinia
app.use(router)

app.mount('#app')
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'  // ← styles 폴더 추가

createApp(App).use(router).mount('#app')
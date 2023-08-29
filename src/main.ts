import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import handler from './components/handler'

const app = createApp(App);
app.use(handler); //注册
app.mount("#app");

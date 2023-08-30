import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { svgWheel, svgDrag } from "svg-zoom-drag-vue-directives";

const app = createApp(App);
svgWheel(app);
svgDrag(app);
app.mount("#app");

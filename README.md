# svgHandler

Vite + Vue 3 + TypeScript

## use

```
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { svgWheel, svgDrag } from "svg-zoom-drag-vue-directives"; // need to be installed

const app = createApp(App);
svgWheel(app);
svgDrag(app);
app.mount("#app");
```

```
<script lang="ts" setup>
import {svgHandler} from 'vue-svg-handler'
import svg from 'YOUR_SVG.svg'
import { onMounted,ref } from 'vue'
import axios from 'axios'

const svgString = ref("")

onMounted(()=>{
  axios.get(svg).then(res=>{
    svgString.value = res.data
  })
})

</script>

<template>
  <svgHandler :svgGet="svgString" />
</template>

<style scoped></style>
```
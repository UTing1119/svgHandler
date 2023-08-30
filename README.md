# svgHandler

Vite + Vue 3 + TypeScript

## use
```javascript
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
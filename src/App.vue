<script lang="ts" setup>
import {svgHandler} from 'vue-svg-handler'
import car from './car_3.svg'
import { onMounted,ref } from 'vue'
import axios from 'axios'

const svg = ref("")

onMounted(()=>{
  axios.get(car).then(res=>{
    svg.value = res.data
  })
})

</script>

<template>
  <svgHandler :svgGet="svg" />
  <div></div>
</template>

<style scoped></style>

<script lang="ts" setup>
import {svgHandler} from 'vue-svg-handler'
import type {optionType} from 'vue-svg-handler'
import svgHandlerTest from './components/handler/svgHandler.vue'
import type{optionInterface} from './components/handler/svgHandler'
import car from './svg/car_3.svg'
import battery from './svg/battery.svg'
import { onMounted,ref } from 'vue'
import axios from 'axios'

const svg = ref("")

const option = ref<optionInterface>({
  items:[
    {
      name: 'battery_2',
      gsap:{
        type: 'to',
        action:{
          fill: '#fff',
          repeat: -1,
          duration: 2,
          yoyo: true,
        }
      }
    },
    {
      name: 'battery_3',
      gsap:{
        type: 'set',
        action:{
          fill: '#fff',
        }
      }
    },
    {
      name: 'battery_4',
      gsap:{
        type: 'set',
        action:{
          fill: '#fff',
        }
      }
    }
  ]
})

onMounted(()=>{
  axios.get(battery).then(res=>{
    svg.value = res.data
  })
})

</script>

<template>
  <svgHandlerTest :svgGet="svg" :optionProp="option" />
</template>

<style scoped></style>

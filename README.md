# vue-svg-handler

Vue 3 + TypeScript

Simple svg dragging and zooming in/out, and simple animations.

Animate by [gsap](https://greensock.com/gsap/)

## use
```javascript
<script lang="ts" setup>
import {svgHandler} from 'vue-svg-handler'

import svg from './svg/YOUR_SVG.svg'
import { onMounted,ref } from 'vue'
import axios from 'axios'

const svgString = ref("")

const option = ref({
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
  axios.get(svg).then(res=>{
    svgString.value = res.data
  })
})

</script>

<template>
  <svgHandlerTest :svgGet="svgString" :optionProp="option" />
</template>

<style scoped></style>

```

## prop

### svgGet

> notice:
> this string will be used to v-html, please confirm the string's safety.

```javascript
type: string
default: ""
```

### option

```javascript
type: optionType
default: ()=>{items: []}
```


## type

### optionType

```JSON
{
  items: Array<item>
}
```

### item

```JSON
{
  name: string // svg item's id
  gsap?: gsap // gasp
  textStyle?: textStyle // svg text label setting
  itemStyle?: itemStyle // svg item label setting
}
```

### gsap

[gsap](https://greensock.com/docs/v3/GSAP/gsap.from()) to/from/fromTo/set only

```JSON
{
  action: gsapAction | gsapAction[]
  type: 'to'|'from'|'fromTo'|'set'
}
```

#### gsapAction

[gsap](https://greensock.com/docs/v3/GSAP/gsap.from()) to/from/fromTo/set only

```JSON
{
  timeScale?: number
  ease?: string
  duration?: number|string
  yoyo?: boolean
  repeat?: number
  xPercent?: number
  yPercent?: number
  x?: number
  y?: number
  opacity?: number
  fill?: string
  css?: object
  motionPath?: motionPath 
}
```

### textStyle

svg text label

```JSON
{
  content: string
  fontSize?: string
  color?: string
}
```

### itemStyle

```JSON
{
  fillColor?: string
  border?: string
  opacity?: number
}
```
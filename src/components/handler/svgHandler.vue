<template>
  <div id="svg" v-html="svgString" style="background-color: #FEF4D2;" v-svgWheel v-svgDrag></div>
  <div style="height: 100px; width: 100px; background-color: #FEF4D2;">
    測試資料
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
  name:'svgHandler'
})
</script>
<script setup lang='ts'>
import { toRef, onMounted, watch, nextTick,onUnmounted, } from 'vue';
import type { PropType } from 'vue';
import type { optionType } from './svgHandler'

import gsap from 'gsap';
import { CSSPlugin } from "gsap/CSSPlugin";
import { MotionPathPlugin, default as gsapMotionPath}from "gsap/MotionPathPlugin";

gsap.registerPlugin(CSSPlugin,MotionPathPlugin)

const props = defineProps({
  svgGet:{
    type: String,
    default: '',
  },
  optionProp:{
    type: Object as PropType<optionType>,
    default: ()=>({}),
  }
})


const svgString = toRef(props,'svgGet')

const option = toRef(props,'optionProp')

watch(()=>option.value.items,(n,o)=>{
  console.log('update')
  handle_option()
},{deep: true})

const handle_option = () => {
  option.value.items.forEach(item=>{
    if(document.getElementById(item.name) !== null){
      const element = document.getElementById(item.name)!
      // gsap.killTweensOf(element)
      const get_animation = gsap.getTweensOf(element);
      
      if(item.gsap !== undefined){
        if(item.gsap.type !== undefined){
          if(item.gsap.type === 'to' && !Array.isArray(item.gsap.action)){
            let temp:any = JSON.parse(JSON.stringify(item.gsap.action))
            Object.assign(temp,{
              onComplete:()=>{
                if(get_animation && Array.isArray(get_animation) && get_animation.length > 0)
                  get_animation[0].kill()
              }
            })
            gsap.to(element,temp as typeof gsapMotionPath)
          }
          else if(item.gsap.type === 'from' && !Array.isArray(item.gsap.action)){
            let temp:any = JSON.parse(JSON.stringify(item.gsap.action))
            Object.assign(temp,{
              onComplete:()=>{
                if(get_animation && Array.isArray(get_animation) && get_animation.length > 0)
                  get_animation[0].kill()
              }
            })
            gsap.from(element,temp as typeof gsapMotionPath)
          }
          else if(item.gsap.type === 'fromTo' && Array.isArray(item.gsap.action) && item.gsap.action.length === 2){
            gsap.fromTo(element,item.gsap.action[0] as typeof gsapMotionPath,item.gsap.action[1] as typeof gsapMotionPath)
          }
          else if(item.gsap.type === 'set' && !Array.isArray(item.gsap.action)){
            let temp:any = JSON.parse(JSON.stringify(item.gsap.action))
            Object.assign(temp,{
              onComplete:()=>{
                if(get_animation && Array.isArray(get_animation) && get_animation.length > 0)
                  get_animation[0].kill()
              }
            })
            gsap.set(element,temp as typeof gsapMotionPath)
          }
        }
        else
          console.log('item gsap need to be set correctly!')
      }
      if(item.itemStyle !== undefined){
        if(item.itemStyle.fillColor !== undefined){
          element.style.fill = item.itemStyle.fillColor
        }
        if(item.itemStyle.border !== undefined)
          element.style.border = item.itemStyle.border
        if(item.itemStyle.opacity !== undefined)
          element.style.opacity = String(item.itemStyle.opacity)
      }

      if(item.textStyle !== undefined){
        if(item.textStyle.content !== undefined)
          element.textContent = item.textStyle.content
        if(item.textStyle.fontSize !== undefined)
          element.style.fontSize = item.textStyle.fontSize
        if(item.textStyle.color !== undefined)
          element.style.color = item.textStyle.color
      }
        
      if(item.keyframeAnimation){
        var list:any = {}
        
        item.keyframeAnimation.keyframes.forEach(keyframe=>{
          var precent = keyframe.precent + "%"
          var k:any = {}
          if(keyframe.rotate !== undefined)
            k.rotate = keyframe.rotate
          if(keyframe.x !== undefined)
            k.x = keyframe.x
          if(keyframe.y !== undefined)
            k.y = keyframe.y
          list[precent] = Object.assign({},k)
        })

        gsap.to(element,{
          keyframes: list,
          duration: item.keyframeAnimation.duration,
          repeat: item.keyframeAnimation.loop? -1:0,
          delay: item.keyframeAnimation.delay,
          ease: item.keyframeAnimation.easingFunction === undefined? "linear": item.keyframeAnimation.easingFunction
        })
      }
    }
  })
}

watch(()=>svgString.value,()=>{
  if(svgString.value !== ""){
    nextTick(()=>{
      handle_option()
    })
  }
})


const wheelEvent = (e:any)=>{
  //阻止默认行为（页面的滚动行为）
  e.preventDefault()
}

onMounted(()=>{
  if(svgString.value !== ""){
    nextTick(()=>{
      handle_option()
    })
  }
  const svg = document.getElementById('svg')
  if(svg !== null)
  svg.onmouseout = function(event:any){
    var x=event.clientX;
    var y=event.clientY;
    var divx1 = svg.offsetLeft;
    var divy1 = svg.offsetTop;
    var divx2 = svg.offsetLeft + svg.offsetWidth;
    var divy2 = svg.offsetTop + svg.offsetHeight;
    if( x < divx1 || x > divx2 || y < divy1 || y > divy2){
      //如果離開，則執行。。
      document.removeEventListener('wheel',wheelEvent,false)
    }
    else{
      document.addEventListener('wheel',wheelEvent,{
        passive: false
      })
    }
  }

  document.addEventListener('wheel',wheelEvent,{
    passive: false
  })
})
onUnmounted(()=>{
  document.removeEventListener('wheel',wheelEvent,false)
})

</script>

<style lang='scss' scoped>

</style>
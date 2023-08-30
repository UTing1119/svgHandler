<template>
  <div id="container">
    <div id="svg" v-html="svgString"></div>
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
    default: ()=>({items: []}),
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
      const container = document.getElementById('container')
      container?.addEventListener('mousedown', mouseDown, false);
      container?.addEventListener('mousemove', drag, false);
      document?.addEventListener('mouseup', mouseUp, false);
      container?.addEventListener('wheel', zoom, false);
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
  if(svg !== null){
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
  }
  

  document.addEventListener('wheel',wheelEvent,{
    passive: false
  })
  
  // document.getElementById('container')?.addEventListener('mousedown', onPanStart);
})
onUnmounted(()=>{
  document.removeEventListener('wheel',wheelEvent,false)
  const container = document.getElementById('container')
  container?.removeEventListener('mousedown', mouseDown, false);
  container?.removeEventListener('mousemove', drag, false);
  document?.removeEventListener('mouseup', mouseUp, false);
  container?.removeEventListener('wheel', zoom, false);
})

/*
開始：滑鼠拖拉的效果
*/
let moving:boolean;
//  滑鼠點下，開始拖拉
function mouseDown(e:any) {
  moving = true;
}

//  拖拉的移動過程

function drag(e:any) {
  const svg = document.getElementsByTagName('svg')
  if (moving === true && svg !== null && svg.length > 0 && svg[0] !== null && svg[0].getAttribute('viewBox') !== null) {
    // 1. 取得一開始的 viewBox 值，原本是字串，拆成陣列，方便之後運算
    let startViewBox = svg[0]!
      .getAttribute('viewBox')!
      .split(' ')
      .map((n:any) => parseFloat(n));

    //  2. 取得滑鼠當前 viewport 中 client 座標值
    let startClient = {
      x: e.clientX,
      y: e.clientY,
    };

    //  3. 計算對應回去的 SVG 座標值
    let newSVGPoint = (svg[0] as any).createSVGPoint();
    let CTM = (svg[0] as any).getScreenCTM();
    newSVGPoint.x = startClient.x;
    newSVGPoint.y = startClient.y;
    let startSVGPoint = newSVGPoint.matrixTransform(CTM.inverse());

    //  4. 計算拖曳後滑鼠所在的 viewport client 座標值
    let moveToClient = {
      x: e.clientX + e.movementX,
      y: e.clientY + e.movementY,
    };

    //  5. 計算對應回去的 SVG 座標值
    newSVGPoint = (svg[0] as any).createSVGPoint();
    CTM = (svg[0] as any).getScreenCTM();
    newSVGPoint.x = moveToClient.x;
    newSVGPoint.y = moveToClient.y;
    let moveToSVGPoint = newSVGPoint.matrixTransform(CTM.inverse());

    //  6. 計算位移量
    let delta = {
      dx: startSVGPoint.x - moveToSVGPoint.x,
      dy: startSVGPoint.y - moveToSVGPoint.y,
    };

    //  7. 設定新的 viewBox 值
    let moveToViewBox = `${startViewBox[0] + delta.dx} ${startViewBox[1] + delta.dy} ${
      startViewBox[2]
    } ${startViewBox[3]}`;
    svg[0].setAttribute('viewBox', moveToViewBox);
  }
}
//  滑鼠點擊結束（拖曳結束）
function mouseUp() {
  moving = false;
} //  結束：滑鼠拖拉的效果

/*
開始：滑鼠縮放的效果
*/
function zoom(e:any) {
  const svg = document.getElementsByTagName('svg')
  if (svg !== null && svg.length > 0 && svg[0] !== null && svg[0].getAttribute('viewBox') !== null) {
    //  1.取得一開始的 viewBox。
    let startViewBox = svg[0]!
      .getAttribute('viewBox')!
      .split(' ')
      .map((n) => parseFloat(n));

    //  2.取得滑鼠執行縮放位置的 viewPort Client 座標，並利用 CTM 對應取得 SVG 座標。

    //  2.1 取得滑鼠執行縮放的位置
    let startClient = {
      x: e.clientX,
      y: e.clientY,
    };

    //  2.2 轉換成 SVG 座標系統中的 SVG 座標點
    let newSVGPoint = svg[0].createSVGPoint();
    let CTM = svg[0].getScreenCTM();
    
    newSVGPoint.x = startClient.x;
    newSVGPoint.y = startClient.y;
    let startSVGPoint:DOMPoint = {} as DOMPoint
    if(CTM !== null)
      startSVGPoint = newSVGPoint.matrixTransform(CTM.inverse());

    //  3.進行縮放，如果要讓原本的尺寸縮放兩倍的話。
    //  3.1 設定縮放倍率
    let r;
    if (e.deltaY > 0) {
      r = 0.9;
    } else if (e.deltaY < 0) {
      r = 1.1;
    } else {
      r = 1;
    }
    //  3.2 進行縮放
    svg[0].setAttribute(
      'viewBox',
      `${startViewBox[0]} ${startViewBox[1]} ${startViewBox[2] * r} ${startViewBox[3] * r}`,
    );

    //  4.將一開始滑鼠的執行縮放位置的 viewPort Client 座標利用新的 CTM ，轉換出對應的 SVG 座標。
    CTM = svg[0].getScreenCTM();
    let moveToSVGPoint:DOMPoint = {} as DOMPoint
    if(CTM !== null)
      moveToSVGPoint = newSVGPoint.matrixTransform(CTM.inverse());

    //  5.取得在縮放過程中該圓點的位移量 `(svgX0 - svgX1)`。
    let delta = {
      dx: startSVGPoint.x - moveToSVGPoint.x,
      dy: startSVGPoint.y - moveToSVGPoint.y,
    };

    //  6.設定最終的 viewBox2
    let middleViewBox = svg[0]!
      .getAttribute('viewBox')!
      .split(' ')
      .map((n) => parseFloat(n));
    let moveBackViewBox = `${middleViewBox[0] + delta.dx} ${middleViewBox[1] + delta.dy} ${
      middleViewBox[2]
    } ${middleViewBox[3]}`;
    svg[0].setAttribute('viewBox', moveBackViewBox);

    //  更新 viewBox 資訊
    // showViewBox();
  }
} //  結束：滑鼠縮放的效果

</script>

<style lang='scss' scoped>

</style>
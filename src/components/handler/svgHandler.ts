export interface optionInterface{
  items: Array<item>
  background?: string
}

export interface item{
  name: string
  gsap?: gsap
  // keyframeAnimation?: keyframeAnimation
  textStyle?: textStyle
  itemStyle?: itemStyle
}

interface gsap{
  // target: String
  action: gsapAction | gsapAction[]
  type: 'to'|'from'|'fromTo'|'set'
}

interface gsapAction{
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

interface motionPath{
  path: string,
  align: string,
  autoRotate: boolean,
  alignOrigin: number|number[]
}

interface textStyle{
  content?: string
  fontSize?: string
  color?: string
}

interface itemStyle{
  fillColor?: string
  border?: string
  opacity?: number
}

interface keyframeAnimation{
  duration: number // ms
  loop: boolean
  delay: number
  easingFunction?: "none"
  | "power1" | "power1.in" | "power1.out" | "power1.inOut"
  | "power2" | "power2.in" | "power2.out" | "power2.inOut"
  | "power3" | "power3.in" | "power3.out" | "power3.inOut"
  | "power4" | "power4.in" | "power4.out" | "power4.inOut"
  | "back" | "back.in" | "back.out" | "back.inOut"
  | "bounce" | "bounce.in" | "bounce.out" | "bounce.inOut"
  | "circ" | "circ.in" | "circ.out" | "circ.inOut"
  | "elastic" | "elastic.in" | "elastic.out" | "elastic.inOut"
  | "expo" | "expo.in" | "expo.out" | "expo.inOut"
  | "sine" | "sine.in" | "sine.out" | "sine.inOut";
  keyframes: Array<keyframes>
}

interface keyframes {
  precent: number
  // transform?: any
  x?: number
  y?: number
  xPercent?: number
  yPercent?: number
  rotate?: number
  // top?: number|string,
  // left?: number|string,
}

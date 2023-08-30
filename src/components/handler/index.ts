import svgHandler from "./svgHandler.vue";
import type{ optionType } from "./svgHandler";

// 按需引入
export { svgHandler };
export type { optionType }

const component = [svgHandler];

const handler = {
    install(Vue:any) {
        component.forEach((item) => {
            Vue.component(item.name, item);
        });
    },
};

export default handler;
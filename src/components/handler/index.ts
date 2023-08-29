import svgHandler from "./svgHandler.vue";

// 按需引入
export { svgHandler };

const component = [svgHandler];

const handler = {
    install(Vue:any) {
        component.forEach((item) => {
            Vue.component(item.name, item);
        });
    },
};

export default handler;
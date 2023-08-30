import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path"
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        outDir: "svg-handler", //输出文件名称
        lib: {
            entry: path.resolve(__dirname, "./src/components/handler/index.ts"), //指定组件编译入口文件
            name: "svg-handler",
            fileName: "svg-handler",
        }, //库编译模式配置
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: ['vue'],
            output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                vue: 'Vue',
                },
                dir: resolve(__dirname, "./dist/lib")
            },
        }, // rollup打包配置
    },
});
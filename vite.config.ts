import { svgBuilder } from "./src/plugins/svgBuilder";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import { defineConfig } from "vite";

function pathResolve(dir: string) {
  return path.resolve(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const basicOption = {
    base: "./",
    define: {
      "process.env": process.env,
    },
    resolve: {
      alias: {
        "@": pathResolve("src"),
        components: pathResolve("./src/components"),
      },
    },
    assetsInclude: ["@/assets", /^w+\.ttf/],
    optimizeDeps: {
      include: [],
    },
    plugins: [vue(), svgBuilder("./src/icons/svg/")],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            "font-size-base": "14px",
            "primary-color": "#4F8ACF",
            "link-color": "#4F8ACF",
          },
          additionalData: '@import "./src/style/variable.less";',
          // 支持内联 JavaScript
          javascriptEnabled: true,
          math: "always",
        },
      },
    },
    server: {
      port: Number(process.env.VITE_PORT ?? 3000),
      // 是否自动在浏览器打开
      open: true,
      // 是否开启 https
      https: false,
      fs: {
        // Allow serving files from one level up to the project root
        allow: ["."],
      },
    },
    build: {
      target: "es2020",
      assetsDir: "static/",
      outDir: "./dist",
      cssCodeSplit: true,
      emptyOutDir: true,
      sourcemap: false,
      commonjsOptions: {
        exclude: ["../../node_modules/**"],
      },
      rollupOptions: {
        output: {
          manualChunks: {},
        },
      },
      minify: "terser" as const,
    },
  };

  if (mode === "production") {
    basicOption.plugins.push();
  }

  return basicOption;
});

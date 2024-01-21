import { fileURLToPath, URL } from "node:url";
import { resolve } from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@api": fileURLToPath(
                new URL("./src/packages/api", import.meta.url)
            ),
            "@uikit": fileURLToPath(
                new URL("./src/packages/uikit", import.meta.url)
            ),
            "@helpers": fileURLToPath(
                new URL("./src/helpers", import.meta.url)
            ),
            "@stores": fileURLToPath(new URL("./src/stores", import.meta.url)),
            "@icons": fileURLToPath(new URL("./src/icons", import.meta.url)),
            "@views": fileURLToPath(new URL("./src/views", import.meta.url)),
            "@packages": fileURLToPath(
                new URL("./src/packages", import.meta.url)
            ),
        },
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                prod: resolve(__dirname, "prod/index.html"),
                staging: resolve(__dirname, "staging/index.html"),
                local: resolve(__dirname, "local/index.html"),
            },
            output: {
                manualChunks: undefined,
            },
        },
        outDir: "docs",
    },
    base: "/new-widget-rih/",
});

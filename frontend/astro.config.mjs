// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },
    fonts: [
        {
            provider: fontProviders.google(),
            name: "Barlow", // Google Fontsでの正式名称
            cssVariable: "--font-barlow",
            weights: [500, 600],
            subsets: ["latin"], // 日本語を使う場合
        },
    ],
});

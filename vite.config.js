import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "CryptoQuote",
        short_name: "CryptoQuote",
        description: "Cotización de Cryptomonedas",
        theme_color: "#ffffff",
        icons: [
          {
            src: "cripto_192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "cripto_512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});

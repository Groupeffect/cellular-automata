import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VitePWA({ 
      registerType: 'autoUpdate',
      manifest: {
        name: "Cellular-Automata",
        short_name: "cellular",
        description: "Wolframs algorithm by Groupeffect",
        background_color: "#000000",
        display:"standalone",
        icons: [
            {
              sizes:"144x144",
              src:"assets/logo144.png",
              type: "img/png"
            },
            {
              sizes:"128x128",
              src:"assets/logo128.png",
              type: "img/png"
            },
            {
              sizes:"48x48",
              src:"assets/logo48.png",
              type: "img/png"
            },
            {
              sizes:"16x16",
              src:"assets/logo16.png",
              type: "img/png"
            },
          ]
        }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: "../docs"
  },
  base: 
  process.env.NODE_ENV === 'production'
    ? '/cellular-automata/'
    : '/'
})

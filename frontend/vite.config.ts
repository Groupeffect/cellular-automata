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
        background_color: "#ffffff",
        display:"standalone",
        theme_color: "#ffffff",
        icons: [
            {
              sizes:"144x144",
              src:"logo144.png",
              type: "img/png",
              purpose: 'any'
            },
            {
              sizes:"144x144",
              src:"logo144.png",
              type: "img/png",
              purpose: 'maskable'
            },
            {
              sizes:"512x512",
              src:"logo512.png",
              type: "img/png",
              purpose: 'maskable'
            },
            {
              sizes:"512x512",
              src:"logo512.png",
              type: "img/png",
              purpose: 'any'
            },
            {
              sizes:"any",
              src:"logo.svg",
            },
            {
              sizes:"128x128",
              src:"logo128.png",
              type: "img/png"
            },
            {
              sizes:"48x48",
              src:"logo48.png",
              type: "img/png"
            },
            {
              sizes:"16x16",
              src:"logo16.png",
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

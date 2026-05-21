import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue(), VitePWA({
    registerType: 'autoUpdate'
  })],
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 1500
  }
})

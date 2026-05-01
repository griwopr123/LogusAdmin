import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true,
    allowedHosts: ['https://tired-falcons-bow.loca.lt/']
  }
})
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nosotros: resolve(__dirname, 'src/pages/Nosotros.html'),
        catalogo: resolve(__dirname, 'src/pages/Catalago.html')
      }
    }
  }
})

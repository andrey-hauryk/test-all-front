import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom', // 👈 Обязательно для mount
    globals: true,        // 👈 чтобы не импортировать describe/it/expect вручную
  },
})

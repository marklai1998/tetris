import { defineConfig } from 'vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  resolve: {
    alias: {
      jsxRuntime: path.resolve(__dirname, 'src/jsxRuntime.ts'),
    },
  },
})

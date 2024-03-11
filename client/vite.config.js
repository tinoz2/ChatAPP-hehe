import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { URL } from './config/host'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket.io': {
        target: URL,
        ws: true
      }
    }
  }
})

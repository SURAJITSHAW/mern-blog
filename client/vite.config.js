import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
      proxy: {
        // Proxy requests starting with '/api' to 'http://localhost:8000'
        '/api': {
          target: 'http://localhost:3000',
          secure: false, // Optional: Disable if targeting an insecure server
        },
      },
    },
  plugins: [react()],
})

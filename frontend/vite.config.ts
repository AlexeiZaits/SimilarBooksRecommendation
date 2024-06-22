import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      app: "/src/app",
      features: "/src/features",
      entities: "/src/entities",
      shared: "/src/shared",
      widjets: "/src/widjets",
      pages: "/src/pages",
    }
  }
})

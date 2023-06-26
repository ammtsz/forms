import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import packageJson from './package.json'

const sharedDependencies = packageJson.dependencies
delete sharedDependencies.zustand

// https://vitejs.dev/config/
export default defineConfig({
  server: {
      port: 3003,
  },
  plugins: [
    react(),
  ],
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import moduleFederation from '@originjs/vite-plugin-federation'
import packageJson from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
      port: 3001,
  },
  plugins: [
    react(),
    moduleFederation({
        name: 'marketing',
        filename: 'remoteEntry.js',
        exposes: {
            './Forms': './src/bootstrap'
        },
        shared: packageJson.dependencies,
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})

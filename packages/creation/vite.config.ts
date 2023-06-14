import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import moduleFederation from '@originjs/vite-plugin-federation'
import packageJson from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
      port: 3002,
  },
  plugins: [
    react(),
    moduleFederation({
        name: 'form-creation',
        filename: 'remoteEntry.js',
        exposes: {
            './FormCreation': './src/bootstrap'
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

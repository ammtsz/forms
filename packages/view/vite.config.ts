import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
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
  resolve: {
    alias: [
      { find: '@app', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@creation', replacement: fileURLToPath(new URL('../creation/src', import.meta.url)) },
      { find: '@container', replacement: fileURLToPath(new URL('../container/src', import.meta.url)) },
      { find: '@submission', replacement: fileURLToPath(new URL('../submission/src', import.meta.url)) },
    ],
  },
})

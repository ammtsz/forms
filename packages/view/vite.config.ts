import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import react from '@vitejs/plugin-react'

import moduleFederation from '@originjs/vite-plugin-federation'

import packageJson from './package.json'

const sharedDependencies = packageJson.dependencies
delete sharedDependencies.zustand

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    port: 3003,
  },
  plugins: [
    react(),
    moduleFederation({
      name: 'view',
      filename: 'remoteEntry.js',
      exposes: {
          './FormView': './src/pages/FormView',
      },
      remotes: {
        container: 'http://localhost:3000/assets/remoteEntry.js',
      },
      shared: sharedDependencies,
  }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        '@emotion/react',
        '@emotion/styled',
      ],
    },
  },
  resolve: {
    alias: [
      { find: '@app', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@view', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@creation', replacement: fileURLToPath(new URL('../creation/src', import.meta.url)) },
      { find: '@container', replacement: fileURLToPath(new URL('../container/src', import.meta.url)) },
      { find: '@submission', replacement: fileURLToPath(new URL('../submission/src', import.meta.url)) },
    ],
  },
})

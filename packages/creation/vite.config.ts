import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import react from '@vitejs/plugin-react'

// import moduleFederation from '@originjs/vite-plugin-federation'

import packageJson from './package.json'

const sharedDependencies = packageJson.dependencies
delete sharedDependencies.zustand

// https://vitejs.dev/config/
export default defineConfig({
  server: {
      port: 3002,
  },
  plugins: [
    react(),
    // moduleFederation({
    //     name: 'creation',
    //     filename: 'remoteEntry.js',
    //     exposes: {
    //         './FormCreation': './src/App.tsx',
    //         './SelectCreation': './src/components/fields/Select/index.tsx'
    //     },
    //     // shared: sharedDependencies,
    // }),
  ],
  // build: {
  //   modulePreload: false,
  //   target: 'esnext',
  //   minify: false,
  //   cssCodeSplit: false
  // },
  resolve: {
    alias: [
      { find: '@app', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@container', replacement: fileURLToPath(new URL('../container/src', import.meta.url)) },
      { find: '@submission', replacement: fileURLToPath(new URL('../submission/src', import.meta.url)) },
      { find: '@view', replacement: fileURLToPath(new URL('../view/src', import.meta.url)) },
    ],
  },
})

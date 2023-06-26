import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'

// import moduleFederation from '@originjs/vite-plugin-federation'

import packageJson from './package.json'

const sharedDependencies = packageJson.dependencies
delete sharedDependencies.zustand

// https://vitejs.dev/config/
export default defineConfig({
  server: {
      port: 3001,
  },
  plugins: [
    react(),
    // moduleFederation({
    //     name: 'form-submission',
    //     filename: 'remoteEntry.js',
    //     exposes: {
    //         './FormSubmission': './src/App.tsx'
    //     },
    //     shared: sharedDependencies,
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
      { find: '@creation', replacement: fileURLToPath(new URL('../creation/src', import.meta.url)) },
      { find: '@container', replacement: fileURLToPath(new URL('../container/src', import.meta.url)) },
      { find: '@view', replacement: fileURLToPath(new URL('../view/src', import.meta.url)) },
    ],
  },
})

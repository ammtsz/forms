import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
// import moduleFederation from '@originjs/vite-plugin-federation'
// import packageJson from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
      port: 3000,
  },
  plugins: [
    react(),
    // moduleFederation({
    //     name: 'form-manager',
    //     remotes: {
    //       submission: 'http://localhost:3001/assets/remoteEntry.js',
    //       creation: 'http://localhost:3002/assets/remoteEntry.js',
    //     },
    //     filename: 'remoteEntry.js',
    //     exposes: {
    //         './FormManager': './src/App.tsx'
    //     },
    //     // shared: packageJson.dependencies,
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
      { find: '@submission', replacement: fileURLToPath(new URL('../submission/src', import.meta.url)) },
      { find: '@view', replacement: fileURLToPath(new URL('../view/src', import.meta.url)) },
    ],
  },
})

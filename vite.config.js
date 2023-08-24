import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {viteCommonjs, esbuildCommonjs} from '@originjs/vite-plugin-commonjs'

export default defineConfig({
  plugins: [viteCommonjs(), react()],
  build: {
    outDir: 'build',
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildCommonjs(['react-s3'])],
    },
  },
  define: {
    'process.env': {
      REACT_APP_KEY: JSON.stringify(process.env.REACT_APP_KEY),
      REACT_APP_WEBSOCKETS_SERVER: JSON.stringify(process.env.REACT_APP_WEBSOCKETS_SERVER),
    },
  },
})
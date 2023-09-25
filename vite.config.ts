import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css:{
    modules:{
      scopeBehaviour: 'local',
      localsConvention: 'camelCaseOnly',
    }
  },
  build:{
    lib:{
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'kage-editor',
      fileName: 'kage-editor',
      formats: ['es',],
    },
    rollupOptions:{
      external: ['react', ],
      output:{
        globals:{
          react: 'React',
        }
      }
    }
  }
})

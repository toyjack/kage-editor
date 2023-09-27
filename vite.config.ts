import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label'
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    babel:{
      plugins:[
        jotaiDebugLabel,
        jotaiReactRefresh,
      ]
    }
  })],
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
        assetFileNames: 'kage-editor.[ext]',
      }
    }
  }
})

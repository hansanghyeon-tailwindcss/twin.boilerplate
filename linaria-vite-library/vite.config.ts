import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import linaria from '@linaria/vite'
import path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'
// package.json을 import하고싶다.
import { name } from './package.json'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    linaria({
      include: ['**/*.{ts,tsx}'],
      babelOptions: {
        presets: ['@babel/preset-typescript', '@babel/preset-react'],
      },
    }),
  ],
  define: {
    'process.env': {},
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name,
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => {
        let f;
        switch (format) {
          case 'es':
            f = 'mjs';
            break;
          case 'cjs':
            f = 'cjs';
            break;
          case 'umd':
            f = 'umd.js';
            break;
          default:
            break;
        }
        
        return `index.${f}`
      },
    },
    rollupOptions: {
      plugins: [
        // window객체에서 vite로 해쉬된 전역변수 전역함수 코어함수에 접근할 수없도록 IIEF 설정 추가하는 방법
        {
          name: 'wrap-in-iife',
          generateBundle(outputOptions, bundle) {
            Object.keys(bundle).forEach((fileName) => {
              const file = bundle[fileName]
              if (fileName.slice(-3) === '.js' && 'code' in file) {
                file.code = `(() => {\n${file.code}})()`
              }
            })
          }
        },
        cssInjectedByJsPlugin(),
      ]
    }
  }
})

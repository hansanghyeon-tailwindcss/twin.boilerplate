import linaria from '@linaria/vite';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['twin', {
            "exclude": [
              "\x00commonjsHelpers.js" // Avoid build error
            ]
          }],
          'macros',
          '@emotion/babel-plugin'
        ]
      }
    }),
    linaria({
      include: ['**/*.{ts,tsx}'],
      babelOptions: {
        presets: ['@babel/preset-typescript', '@babel/preset-react', '@linaria'],
      },
    }),
    tsconfigPaths(),
  ],
  define: {
    'process.env': {},
  },
  build: {
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
      ]
    }
  }
})

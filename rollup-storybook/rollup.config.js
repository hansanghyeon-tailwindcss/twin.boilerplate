import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import pkg from './package.json'

const config = {
  // name: 'DesignSystem',
  extensions: ['.ts', '.tsx'],
}

// rollup 설정에 단일 객체가아닌 [] 배열로 여러개의 설정을 넣을 수 있다.
export default {
  input: 'index.ts',
  output: [
    {
      // ES Modules: Modern browser imports

      // Browser usage:
      // <script type="module">
      //   import { func } from 'my-lib';
      //   func();
      // </script>

      // js/tsx file usage:
      // import { func } from 'my-lib';
      // func();
      file: pkg.module,
      sourcemap: 'inline',
      format: 'es',
    },
  ],
  plugins: [
    // Automatically add peerDependencies to the `external` config
    // https://rollupjs.org/guide/en/#external
    peerDepsExternal({
      // 각 패키지의 peerDependencies를 external에 추가하기위해 커스텀 추가
      // packageJsonPath: 'my/folder/package.json'
    }),

    // External modules not to include in your bundle (eg: 'lodash', 'moment' etc.)
    // https://rollupjs.org/guide/en/#external
    // external: []

    resolve({ extensions: config.extensions }),

    commonjs(),

    babel({
      extensions: config.extensions,
      include: ['packages/**/*'],
      exclude: 'node_modules/**',
    }),
  ],
}

import { build } from 'esbuild'
import { readFile } from 'fs/promises'

const packageJson = JSON.parse(await readFile('./package.json'))

const entryFile = 'src/index.tsx'
const shared = {
  bundle: true,
  entryPoints: [entryFile],
  external: Object.keys(packageJson.dependencies),
  logLevel: 'info',
  minify: true,
  sourcemap: true,
}

console.log(shared)

build({
  ...shared,
  format: 'esm',
  outfile: `./${packageJson.main}`,
  target: ['esnext', 'node18.12.0'],
})

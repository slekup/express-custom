import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/index.ts'],
  tsconfig: './tsconfig.json',
  platform: 'node',
  format: ['cjs', 'esm'],
  outDir: 'dist',
  keepNames: true,
  dts: true,
  minify: true,
  sourcemap: true,
  clean: true,
  watch: process.env.NODE_ENV === 'development',
});

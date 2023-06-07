import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/index.ts'],
  format: ['cjs', 'esm'],
  outDir: 'dist',
  dts: true,
  minify: true,
  sourcemap: true,
  clean: true,
  watch: process.env.NODE_ENV === 'development',
});

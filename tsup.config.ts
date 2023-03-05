import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/lambda.ts'],
  external: ['oracledb'],
  watch: false,
  splitting: false,
  sourcemap: true,
  clean: true,
});

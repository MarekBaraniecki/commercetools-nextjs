const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: ['src/getApp.ts'],
    outfile: 'dist/app.js',
    bundle: true,
    minify: true,
    sourcemap: true,
    platform: 'node',
    target: 'node16',
    plugins: [],
  })
  .catch(() => process.exit(1));
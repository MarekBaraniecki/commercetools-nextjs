const esbuild = require('esbuild');

const logGreen = (value) => console.log('\x1b[32m', value, '\x1b[0m');
const logYellow = (value) => console.log('\x1b[33m', value, '\x1b[0m');

const onRebuild = (error, result) => {
  if (error) {
    console.error('watch build failed:', error);
  } else {
    logGreen('Rebuild success');

    if (result.warnings.length) {
      result.warnings.forEach((warning) => logYellow(warning));
    }
  }
};

const watch = process.argv[2] === 'watch' ? { onRebuild } : false;

if (watch) {
  const chokidarFileWatcher = require('chokidar');
  chokidarFileWatcher
    .watch('.', {
      ignoreInitial: true,
      ignored: './dist',
    })
    .on('all', (event, path) => {
      console.log(event, path);
    });
}

esbuild
  .build({
    entryPoints: ['app.ts'],
    outfile: 'dist/app.js',
    bundle: true,
    minify: true,
    sourcemap: false,
    platform: 'node',
    target: 'node16',
    watch,
    plugins: [],
  })
  .catch(() => process.exit(1));
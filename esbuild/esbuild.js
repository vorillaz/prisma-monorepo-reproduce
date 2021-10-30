const { build } = require('esbuild');
const path = require('path');


const source = path.resolve(process.cwd());

const src = path.join(source, 'server.ts');
const out = path.join(source, './dist/server.js');

var passedArgs = process.argv.slice(2) || [];

const watch = passedArgs.includes('--watch');

build({
  entryPoints: [src],
  outfile: out,
  minify: false,
  bundle: true,
  watch,
  sourcemap: 'external',
  platform: 'node',
  plugins: [
    
  ],
  define: {
    'process.env.NODE_ENV': '"production"',
  },
}).catch(() => process.exit(0));

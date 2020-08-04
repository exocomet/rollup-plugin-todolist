import pkg from './package.json';

const external = Object.keys(pkg.dependencies);
const globals = {};
const plugins = [];

export default function() {
  let config = {
    external,
    input: "src/index.js",
    output: [
      {file: pkg.main, format: 'cjs', globals, exports: 'named'},
      {file: pkg.module, format: 'es', globals, exports: 'named'},
    ],
    plugins,
  }
  return config;
};

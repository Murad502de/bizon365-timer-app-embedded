import serve from "rollup-plugin-serve";
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import alias from '@rollup/plugin-alias';


export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.min.js",
    format: "iife",
    name: 'bizon365_timer_app_embedded',
    plugins: [terser()],
  },
  plugins: [
    alias({
      entries: [
        { find: '@components', replacement: `${__dirname}/src/components` },
      ]
    }),
    json(),
    postcss({
      extract: false,
      modules: true,
      use: ['sass'],
    }),
    nodeResolve({
      extensions: [".js", ".jsx", ".scss"],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    babel({
      presets: ["@babel/preset-react"],
    }),
    commonjs(),
    serve({
      open: false,
      verbose: true,
      contentBase: ["", "./"],
      host: "localhost",
      port: 3000,
    }),
  ],
};
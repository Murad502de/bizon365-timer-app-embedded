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
    file: "build/bundle.min.js",
    format: "iife",
    name: 'bizon365_timer_app_embedded',
    plugins: [terser()],
  },
  plugins: [
    alias({
      entries: [
        { find: '@components', replacement: `${__dirname}/src/components` },
        { find: '@api', replacement: `${__dirname}/src/api` },
        { find: '@helpers', replacement: `${__dirname}/src/helpers` },
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
      'process.env.NODE_ENV': JSON.stringify('development'),
      // 'process.env.API_URL': JSON.stringify('http://localhost:8090/api/v1/embedded'),
      'process.env.API_URL': JSON.stringify('https://dev.centriym.ru/gift-timer/bizon365-timer-app-gateway/public/api/v1/embedded'),
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
      port: 8080,
    }),
  ],
};
// import pkg from "./package.json";
import typescript from "@wessberg/rollup-plugin-ts";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";

// const intelnalDeps = Object.keys(pkg.devDependencies);
const intelnalDeps = [];

export default {
  external: (test) => !(intelnalDeps.includes(test) || test.startsWith(".")),
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "cjs",
    sourcemap: true,
  },
  plugins: [
    json({ compact: true }),
    resolve({
      extensions: [".js", ".ts", ".tsx"],
    }),
    typescript({
      transpileOnly: true,
    }),
  ],
};

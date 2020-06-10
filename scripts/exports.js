const fs = require("fs");
const path = require("path");
const walkdir = require("walkdir");

const cwd = path.resolve(process.cwd(), "src");

const files = walkdir.sync(cwd);
const lines = [`export * from "./exports";`, ""];

lines.push(
  ...files
    .map((filePath) => filePath.replace(cwd, "."))
    .map((filePath) => filePath.replace(/\\/g, "/"))
    .filter((filePath) => filePath !== "./index.ts")
    .filter((filePath) => filePath !== "./exports.ts")
    .filter((filePath) => !filePath.includes("/_"))
    .filter((filePath) => !filePath.includes("/translations/"))
    .filter((filePath) => !filePath.endsWith(".layout.tsx"))
    .filter((filePath) => filePath.endsWith(".ts") || filePath.endsWith(".tsx"))
    .map((filePath) => filePath.replace(".tsx", ""))
    .map((filePath) => filePath.replace(".ts", ""))
    .map(
      (filePath) => `export { ${path.basename(filePath)} } from "${filePath}";`
    )
);

lines.push("");

fs.writeFileSync("./src/index.ts", lines.join("\n"));

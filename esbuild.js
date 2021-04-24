const esbuild = require("esbuild");

const { argv } = process;
const argObj = argv.slice(2).reduce((currObj, currItem) => {
  const [key, val] = currItem.replace("--", "").split("=");
  currObj[key] = val;
  return currObj;
}, {});

const { mode, platform } = argObj;

const entryPoints =
  platform === "node" ? ["server/index.ts"] : ["client/index.tsx"];

const outfile = platform === "node" ? "dist/bundle.js" : "public/bundle.js";

const target =
  mode === "production" && platform === "browser"
    ? ["es2015"]
    : ["es2020", "node14"];

esbuild
  .build({
    entryPoints,
    outfile,
    bundle: true,
    target,
    platform,
    sourcemap: true,
    minify: !!(mode === "production"),
  })
  .catch((e) => {
    console.log(e);
  });

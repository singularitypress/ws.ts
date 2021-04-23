const esbuild = require("esbuild");

const { argv } = process;
const mode = argv[2];
const config = {
  entryPoints: ["src/index.ts"],
  outfile: "dist/bundle.js",
  bundle: true,
  platform: "node",
  sourcemap: true,
  minify: !!(mode === "--build"),
};

esbuild.buildSync(config);

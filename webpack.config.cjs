const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const fs = require("fs");

// Dynamically generate entries for each project
const entries = fs.readdirSync("./src/").reduce((acc, dir) => {
  if (fs.existsSync(`./src/${dir}/sketch.js`)) {
    acc[dir] = `./src/${dir}/sketch.js`;
  }
  return acc;
}, {});

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  mode: "production",
};

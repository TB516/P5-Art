import gulp from "gulp";
import replace from "gulp-replace";
import fs from "fs";
import webpack from "webpack";
import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const tempDir = "./gulpBuilding";

const prepBuildProcess = () => {
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
  if (fs.existsSync("./dist")) {
    fs.rmSync("./dist", { recursive: true, force: true });
  }

  return new Promise((resolve) => {
    resolve();
  });
};

const copyForBuild = () => {
  const projects = fs.readdirSync("./src/");

  fs.mkdirSync(tempDir);

  for (let i = 0; i < projects.length; ++i) {
    const sourceDir = `./src/${projects[i]}`;
    const destDir = `${tempDir}/${projects[i]}`;
    fs.cpSync(sourceDir, destDir, { recursive: true });
  }

  return new Promise((resolve) => {
    resolve();
  });
};

const replaceShaders = () => {
  /**
   * @type {string[]}
   */
  const shaderProjects = fs.readdirSync(`./${tempDir}/`).reduce((acc, dir) => {
    if (
      fs.existsSync(`./${tempDir}/${dir}/sketch.mjs`) &&
      fs.existsSync(`./${tempDir}/${dir}/shaders`)
    ) {
      acc.push(dir);
    }
    return acc;
  }, []);

  for (let i = 0; i < shaderProjects.length; ++i) {
    const fragShader = fs
      .readFileSync(
        `./${tempDir}/${shaderProjects[i]}/shaders/shader.frag`,
        "utf8"
      )
      .replace(/\r?\n/g, "\\n");

    const vertShader = fs
      .readFileSync(
        `./${tempDir}/${shaderProjects[i]}/shaders/shader.vert`,
        "utf8"
      )
      .replace(/\r?\n/g, "\\n");

    gulp
      .src(`./${tempDir}/${shaderProjects[i]}/sketch.mjs`)
      .pipe(
        replace(
          /loadStrings\("shaders\/shader\.vert"\);/g,
          `\"${vertShader}\".split(\"\\n\");`
        )
      )
      .pipe(
        replace(
          /loadStrings\("shaders\/shader\.frag"\);/g,
          `\"${fragShader}\".split(\"\\n\");`
        )
      )
      .pipe(gulp.dest(`./${tempDir}/${shaderProjects[i]}`));
  }

  return new Promise((resolve) => {
    resolve();
  });
};

const bundle = () => {
  const projects = fs.readdirSync(tempDir).reduce((acc, dir) => {
    const sketchPath = `./${tempDir}/${dir}/sketch.mjs`;
    if (fs.existsSync(sketchPath)) {
      acc[dir] = sketchPath;
    }
    return acc;
  }, {});

  const webpackConfig = {
    entry: projects,
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

  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err || stats.hasErrors()) {
        reject(err || stats.toJson().errors);
      } else {
        resolve();
      }
    });
  });
};

const cleanup = () => {
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }

  return new Promise((resolve) => {
    resolve();
  });
};

gulp.task(
  "build",
  gulp.series(prepBuildProcess, copyForBuild, replaceShaders, bundle, cleanup)
);

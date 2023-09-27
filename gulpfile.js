/*
  Usage:
  1. npm install //To install all dev dependencies of package
  2. npm run dev //To start development and server for live preview
  3. npm run prod //To generate minifed files for live server
*/

const { src, dest, watch, series, parallel } = require("gulp");
const clean = require("gulp-clean");
const options = require("./config");
const browserSync = require("browser-sync").create();

const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const concat = require("gulp-concat");
const uglify = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const webpHtml = require("gulp-webp-html-nosvg");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");
const logSymbols = import("log-symbols");
const includePartials = require("gulp-file-include");
const rename = require("gulp-rename");
const purgecss = require("gulp-purgecss");

function livePreview(done) {
  browserSync.init({
    server: {
      baseDir: options.paths.dist.base,
    },
    port: options.config.port || 5000,
  });
  done();
}

function previewReload(done) {
  console.log("\n\t" + logSymbols.info, "Reloading Browser Preview.\n");
  browserSync.reload();
  done();
}

//Development Tasks
function devHTML() {
  return src(`${options.paths.src.base}/**/*.html`)
    .pipe(
      includePartials({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(webpHtml())
    .pipe(dest(options.paths.dist.base));
}

function devStyles() {
  const tailwindcss = require("tailwindcss");
  const autoprefixer = require("autoprefixer");
  return src(`${options.paths.src.css}/**/*.scss`)
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([tailwindcss(options.config.tailwindjs), autoprefixer()]))
    .pipe(concat({ path: "style.css" }))
    .pipe(dest(options.paths.dist.css));
}

function devScripts() {
  return src([
    `${options.paths.src.js}/libs/**/*.js`,
    `${options.paths.src.js}/external/**/*.js`,
  ])
    .pipe(
      rename(function (path) {
        if (!path.basename.endsWith(".min")) {
          path.extname = ".min.js";
        }
      })
    )
    .pipe(dest(options.paths.dist.js));
}

function devImages() {
  return src(`${options.paths.src.img}/**/*`)
    .pipe(dest(options.paths.dist.img))
    .pipe(src(options.paths.src.img))
    .pipe(webp())
    .pipe(dest(options.paths.dist.img));
}

function devFonts() {
  return src(`${options.paths.src.fonts}/**/*`)
    .pipe(ttf2woff())
    .pipe(dest(options.paths.dist.fonts))
    .pipe(src(`${options.paths.src.fonts}/**/*`))
    .pipe(ttf2woff2())
    .pipe(dest(options.paths.dist.fonts));
}

function devAssets() {
  return src(`${options.paths.src.assets}/**/*`).pipe(
    dest(options.paths.dist.assets)
  );
}

function watchFiles() {
  watch(
    `${options.paths.src.base}/**/*.{html,php}`,
    series(devHTML, devStyles, previewReload)
  );
  watch(
    [options.config.tailwindjs, `${options.paths.src.css}/**/*.scss`],
    series(devStyles, previewReload)
  );
  watch(`${options.paths.src.js}/**/*.js`, series(devScripts, previewReload));
  watch(`${options.paths.src.img}/**/*`, series(devImages, previewReload));
  watch(`${options.paths.src.fonts}/**/*`, series(devFonts, previewReload));
  watch(`${options.paths.src.assets}/**/*`, series(devAssets, previewReload));
  watch(
    `${options.paths.src.assets}/**/*`,
    series(prodAssets, previewReload)
  );
  console.log("\n\t" + logSymbols.info, "Watching for Changes..\n");
}

function devClean() {
  console.log(
    "\n\t" + logSymbols.info,
    "Cleaning dist folder for fresh start.\n"
  );
  return src(options.paths.dist.base, { read: false, allowEmpty: true }).pipe(
    clean()
  );
}

function prodHTML() {
  return src(`${options.paths.src.base}/**/*.{html,php}`)
    .pipe(includePartials())
    .pipe(webpHtml())
    .pipe(dest(options.paths.build.base));
}

function prodStyles() {
  const tailwindcss = require("tailwindcss");
  const autoprefixer = require("autoprefixer");
  const cssnano = require("cssnano");
  return src(`${options.paths.src.css}/**/*.scss`)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      postcss([
        tailwindcss(options.config.tailwindjs),
        autoprefixer(),
        cssnano(),
      ])
    )
    .pipe(dest(options.paths.build.css));
}

function prodScripts() {
  return src([
    `${options.paths.src.js}/libs/**/*.js`,
    `${options.paths.src.js}/external/**/*.js`,
  ])
    .pipe(uglify())
    .pipe(
      rename(function (path) {
        if (!path.basename.endsWith(".min")) {
          path.extname = ".min.js";
        }
      })
    )
    .pipe(dest(options.paths.build.js));
}

function prodImages() {
  const pngQuality = Array.isArray(options.config.imagemin.png)
    ? options.config.imagemin.png
    : [0.7, 0.7];
  const jpgQuality = Number.isInteger(options.config.imagemin.jpeg)
    ? options.config.imagemin.jpeg
    : 70;
  const plugins = [
    pngquant({ quality: pngQuality }),
    mozjpeg({ quality: jpgQuality }),
  ];

  return src(options.paths.src.img + "/**/*")
    .pipe(imagemin([...plugins]))
    .pipe(dest(options.paths.build.img))
    .pipe(src(options.paths.src.img))
    .pipe(webp())
    .pipe(dest(options.paths.build.img));
}

function prodFonts() {
  return src(`${options.paths.src.fonts}/**/*`)
    .pipe(ttf2woff())
    .pipe(dest(options.paths.build.fonts))
    .pipe(src(`${options.paths.src.fonts}/**/*`))
    .pipe(ttf2woff2())
    .pipe(dest(options.paths.build.fonts));
}

function prodAssets() {
  return src(`${options.paths.src.assets}/**/*`).pipe(
    dest(options.paths.build.assets)
  );
}

function prodClean() {
  console.log(
    "\n\t" + logSymbols.info,
    "Cleaning build folder for fresh start.\n"
  );
  return src(options.paths.build.base, { read: false, allowEmpty: true }).pipe(
    clean()
  );
}

function buildFinish(done) {
  console.log(
    "\n\t" + logSymbols.info,
    `Production build is complete. Files are located at ${options.paths.build.base}\n`
  );
  done();
}

exports.default = series(
  devClean,
  parallel(devStyles, devScripts, devImages, devFonts, devAssets, devHTML),
  livePreview,
  watchFiles
);

exports.prod = series(
  prodClean,
  parallel(
    prodStyles,
    prodScripts,
    prodImages,
    prodHTML,
    prodFonts,
    prodAssets
  ),
  buildFinish
);

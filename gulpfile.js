const { path, projectFolder } = require("./config");

const { src, dest } = require("gulp"),
  gulp = require("gulp"),
  browsersync = require("browser-sync").create(),
  fileinclude = require("gulp-file-include"),
  del = require("del"),
  scss = require("gulp-sass")(require("sass")),
  autoprefixer = require("gulp-autoprefixer"),
  groupmedia = require("gulp-group-css-media-queries");

function browserSync() {
  browsersync.init({
    server: {
      baseDir: "./" + projectFolder + "/",
    },
    port: 3000,
    notify: false,
  })
}

function html() {
  return src(path.dev.html)
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}
function css() {
  return src(path.dev.css)
    .pipe(
        scss({
        outputStyle: "expanded",
      })
    )
    .pipe(
      groupmedia()
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: true,
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}
function assets() {
  return src(path.dev.assets)
    .pipe(dest(path.build.assets))
    .pipe(browsersync.stream())
}
function fonts() {
  return src(path.dev.fonts)
  .pipe(dest(path.build.fonts)) 
  
}

function fileWather() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
}

function fileCleaner() {
  return del(path.clean);
}

const build = gulp.series(fileCleaner, gulp.parallel(html, css, assets, fonts));
const watch = gulp.parallel(build, fileWather, browserSync);

exports.fonts = fonts;
exports.assets = assets;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;

exports.default = watch;
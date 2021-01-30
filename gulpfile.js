const gulp = require("gulp");
const sass = require("gulp-sass");
const browsersync = require("browser-sync").create();
const pug = require('gulp-pug');
const babel = require('gulp-babel');

function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./layout"
    },
    port: 3000
  });
  done();
}

function css() {
  return gulp
    .src("./layout/sass/**/all.scss")
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("./layout/css/"))
    .pipe(browsersync.stream());
}

function views() {
  return gulp
    .src("./layout/pug/index.pug")
    .pipe(pug())
    .pipe(gulp.dest('./layout/'))
    .on('end', browsersync.reload)
}

function js() {
  return gulp
    .src("./layout/js/**/all.jsx")
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('build/js'))
}


function watchFiles() {
  gulp.watch("./layout/sass/**/*.scss", css);
  gulp.watch("./layout/js/**/*.js").on('change', browsersync.reload);
  gulp.watch('./layout/*.html').on('change', browsersync.reload);
  gulp.watch('./layout/pug/**/*.pug').on('change', views);
  gulp.watch("./layout/js/**/*.jsx", js);
}

const watch = gulp.parallel(watchFiles, browserSync, css, views, js);

exports.css = css;
exports.watch = watch;
exports.views = views;
exports.js = js;
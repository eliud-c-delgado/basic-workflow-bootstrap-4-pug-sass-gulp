const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const gutil = require('gulp-util');

gulp.task('sass', function () {
  return gulp.src('./sass/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({ style: 'expanded', errLogToConsole: true }))
    .pipe(autoprefixer('last 2 version', "> 1%", 'ie 8', 'ie 9'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'))
    .on('error', gutil.log)
    .pipe(browserSync.stream());
});

gulp.task('views', function buildHTML() {
  return gulp.src('./*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./'))
    .on('error', gutil.log)
    .pipe(browserSync.stream())
});

gulp.task('serve', ['sass', 'views'], function () {

  browserSync.init({
    server: "./"
  });

  gulp.watch("./sass/*.sass", ['sass']);
  gulp.watch("./*.pug", ['views']);
  gulp.watch("./css/*.css").on('change', browserSync.reload);
  gulp.watch("./*.html").on('change', browserSync.reload);
})

gulp.task('build', ['sass', 'views'], () => console.log("building..."));

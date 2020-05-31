var gulp = require('gulp');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssdeclsort = require('css-declaration-sorter');
var mqpacker = require('css-mqpacker');
var browserSync  = require('browser-sync');

gulp.task('sass', function() {
  return gulp.src('./sass/**/*.scss')
    .pipe(plumber({errorHandler: notify.onError("Error:<%= error.message %>")}))
    .pipe(sassGlob())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss([mqpacker()]))
    .pipe(postcss([cssdeclsort({order: 'alphabetical'})]))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('./css'));
});

//ブラウザ自動更新
gulp.task('browser-sync', function(done) {
  browserSync.init({
      server: {
          baseDir: './',
          index: 'index.html'
      }
  });
  done();
});

gulp.task('bs-reload', function (done) {
  browserSync.reload();
  done();
});

gulp.task( 'watch',  function(done) {
  gulp.watch('./sass/**/*.scss', gulp.task('sass'));
  gulp.watch( './*.html', gulp.task('bs-reload'));
  gulp.watch( './css/*.css', gulp.task('bs-reload'));
  gulp.watch( './js/*.js', gulp.task('bs-reload'));
  done();
});

// default
gulp.task('default', gulp.series(gulp.parallel('browser-sync', 'watch')));
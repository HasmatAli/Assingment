var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var coffee = require('coffee');
var imagemin = require('gulp-imagemin');
var connect = require('gulp-connect');
var browserify = require('browserify');
var gp_rename = require('gulp-rename');
 
var paths = {
  scripts: ['js/*.js'],
  images: 'images/*'
};
 
gulp.task('connect', function () {
  connect.server({
    root: 'public',
    port: 30001
  })
});

gulp.task('images', function(){
  return gulp.src(paths.images)
      // Pass in options to the task
      .pipe(imagemin({optimizationLevel: 5}))
      .pipe(gulp.dest('public/img'));
});

gulp.task('js-fef', function(){
  return gulp.src(['js/controller/*.js', 'app.js'])
      .pipe(sourcemaps.init())
      .pipe(concat('concat.js'))
      .pipe(gulp.dest('public/js'))
      .pipe(gp_rename('uglify.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('public/js'));
});

gulp.task('watch', function() {
  gulp.watch('js/**/*.js', ['browserify'])
});

gulp.task('default', ['connect', 'watch','images','js-fef']);
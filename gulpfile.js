var gulp = require("gulp");
var babel = require("gulp-babel");
var sass = require('gulp-sass');
var somaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

gulp.task('transform', function() {
  var controller = gulp.src("ES6/controller/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/controller"));

  var main = gulp.src("ES6/js/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/js"));

  var lib = gulp.src("ES6/lib/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/lib"));

  var model = gulp.src("ES6/model/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/model"));

  return [controller, main, lib, model];

});

gulp.task('sass', function() {
  return gulp.src('stylus/sass/**/*.sass')
             .pipe(somaps.init())
             .pipe(sass().on('error', sass.logError))
             .pipe(somaps.write('../maps', {sourceRoot: '../stylus'}))
             .pipe(gulp.dest('stylus/css'))
});

gulp.task('sass:watch', function(){
  gulp.watch('stylus/sass/*.sass', ['sass'], function(event) {
    gutil.log(gutil.colors.cyan('Sass file was transformed into css.'))
  })
});

gulp.task('js:watch', function() {
  gulp.watch('ES6/**/*.js', ['transform'], function(event) {
    gutil.log('Ecma6 File ' + event.path + ' was transformed into Ecma5.');
  })
});

gulp.task("default", ['js:watch', 'sass:watch'], function(){
  gutil.log(gutil.colors.green('Gulp started! Running Tasks...'));
});

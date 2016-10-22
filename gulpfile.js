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
/**
 * deguide plugins
 */
  var deguide = gulp.src("plugins/deguide/app/ES6/*.js")
    .pipe(babel())
    .pipe(gulp.dest("plugins/deguide/app/assets/javascripts"));

  return [controller, main, lib, model, deguide];

});

var sassOpts = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};
//var sassIn = 'stylus/sass/**/*.sass';
//var sassOut = 'assets/css/';
var sassIn = 'plugins/deguide/app/sass/**/*.sass'
var sassOut = 'plugins/deguide/app/assets/css/'
gulp.task('sass', function() {
  return gulp.src(sassIn)
             .pipe(somaps.init())
             .pipe(sass(sassOpts).on('error', sass.logError))
             .pipe(somaps.write('./maps'))
             .pipe(gulp.dest(sassOut))
});

gulp.task('sass:watch', function(){
  gulp.watch(sassIn, ['sass'], function(event) {
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

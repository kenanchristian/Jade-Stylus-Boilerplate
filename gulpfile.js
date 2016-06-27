var gulp = require('gulp');
var stylus = require('gulp-stylus');
var plumber = require('gulp-plumber');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var imagemin = require('gulp-imagemin');

//HTML
gulp.task('templates', function() {
  return gulp.src(['./src/jade/*.jade','!./src/jade/_*.jade'])
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
});

//STYLE-MINIFY
gulp.task('styleCompress', function () {
  return gulp.src(['./src/styl/*.styl','!./src/styl/_*.styl'])
    .pipe(plumber())
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(connect.reload());
});

//SCRIPTS-MINIFY
gulp.task('scriptMinify', function () {
  return gulp.src('src/js/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'))
    .pipe(connect.reload());
});

//COMPRESS IMAGE
gulp.task('compressImage',function(){
  return gulp.src('./src/images/*')
    .pipe(plumber())
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/images'))
});

//COPY ANIMATE.CSS
gulp.task('copyAnimateCSS', function() {
    gulp.src('./vendor/animate.css/*.min.css')
    .pipe(gulp.dest('./dist/vendor/css/'));
});


//COPY BOOTSTRAP
gulp.task('copyBootstrapCSS', function() {
    gulp.src('./vendor/bootstrap/dist/css/*.min.css')
    .pipe(gulp.dest('./dist/vendor/css/'));
});

gulp.task('copyBootstrapJS', function() {
    gulp.src('./vendor/bootstrap/dist/js/*.min.js')
    .pipe(gulp.dest('./dist/vendor/js/'));
});

gulp.task('copyBootstrapFont', function() {
    gulp.src('./vendor/bootstrap/dist/fonts/*.{eot,svg,ttf,woff,woff2}')
    .pipe(gulp.dest('./dist/vendor/fonts/'));
});


//COPY FONTAWESOME
gulp.task('copyFontawesomeCSS', function() {
    gulp.src('./vendor/font-awesome/css/*.min.css')
    .pipe(gulp.dest('./dist/vendor/css/'));
});

gulp.task('copyFontawesomeFont', function() {
    gulp.src('./vendor/font-awesome/fonts/*.{eot,svg,ttf,otf,woff,woff2}')
    .pipe(gulp.dest('./dist/vendor/fonts/'));
});

gulp.task('copyJqueryJS', function() {
    gulp.src('./vendor/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('./dist/vendor/js/'));
});

gulp.task('copyLibs',['copyAnimateCSS','copyBootstrapCSS','copyBootstrapJS','copyBootstrapFont','copyFontawesomeCSS','copyFontawesomeFont','copyJqueryJS']);

// CONNECT - LIVERELOAD
gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('watch', function() {

  gulp.watch('./src/jade/*.jade', ['templates']);
  gulp.watch('./src/styl/*.styl', ['styleCompress']);
  gulp.watch('./src/js/*.js', ['scriptMinify']);
  gulp.watch('./src/images/**', ['imageCompress']);

});

gulp.task('default',['copyLibs','templates','styleCompress','scriptMinify','compressImage','connect','watch']);

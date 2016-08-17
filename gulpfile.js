var gulp = require('gulp');
var stylus = require('gulp-stylus');
var plumber = require('gulp-plumber');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();

//HTML
gulp.task('templates', function() {
  return gulp.src(['./src/jade/*.jade','!./src/jade/_*.jade'])
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('template-watch',['templates'], browserSync.reload);

//STYLE-MINIFY
gulp.task('styleCompress', function () {
  return gulp.src(['./src/styl/*.styl','!./src/styl/_*.styl'])
    .pipe(plumber())
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream());
});

//SCRIPTS-MINIFY
gulp.task('scriptMinify', function () {
  return gulp.src('src/js/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'))
});

gulp.task('script-watch',['scriptMinify'], browserSync.reload);

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

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
});

gulp.task('watch', function() {
  gulp.watch([ 'src/jade/**/*.jade', 'src/jade/*.jade' ], ['template-watch']);
  gulp.watch(['src/styl/*.styl', './src/styl/**/*.styl'], ['styleCompress']);
  gulp.watch('src/js/*.js', ['script-watch']);
  gulp.watch('src/images/**', ['compressImage']);
});

gulp.task('default',['copyLibs','templates','styleCompress','scriptMinify','compressImage','browser-sync','watch']);

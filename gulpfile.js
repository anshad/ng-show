/*
 * @Author: Anshad Vattapoyil
 * @Date:   2017-08-24 21:51:48
 * @Last Modified by:   Anshad Vattapoyil
 * @Last Modified time: 2017-08-27 15:17:22
 */
var gulp = require('gulp'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  stripComment = require('gulp-strip-comments'),
  stripDebug = require('gulp-strip-debug'),
  gulpif = require('gulp-if'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  gutil = require('gulp-util'),
  sass = require('gulp-sass')(require('sass')),
  connect = require('gulp-connect'),
  minifyCSS = require('gulp-clean-css'),
  minifyHTML = require('gulp-htmlmin'),
  templatecache = require('gulp-angular-templatecache'),
  replace = require('gulp-replace'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  sassLint = require('gulp-sass-lint');

var devDir = './dev',
  distDir = './dist',
  srcDir = './src',
  dist = false;

/**
 * Bundle library scripts
 */
gulp.task('libs', async function () {
  var libs = [
    './bower_components/jquery/dist/jquery.js',
    './bower_components/underscore/underscore.js',
    './bower_components/angular/angular.min.js',
    './bower_components/angular-bootstrap/ui-bootstrap.js',
    './bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    './bower_components/angular-ui-router/release/angular-ui-router.js',
  ];

  return gulp
    .src(libs)
    .pipe(concat('dep.min.js'))
    .pipe(uglify())
    .on('error', function (err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulpif(!dist, gulp.dest(devDir + '/scripts/')))
    .pipe(gulpif(dist, gulp.dest(distDir + '/scripts/')));
});

/**
 * Bundle styles
 */
gulp.task('styles', async function () {
  var styles = [
    //'./bower_components/font-awesome/scss/font-awesome.scss',
    srcDir + '/assets/styles/app.scss',
  ];

  return (
    gulp
      .src(styles)
      //.pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(concat('app.min.css'))
      //.pipe(gulpif(!dist, sourcemaps.write('.')))
      .pipe(gulpif(!dist, connect.reload()))
      .pipe(minifyCSS())
      .pipe(gulpif(!dist, gulp.dest(devDir + '/styles/')))
      .pipe(gulpif(dist, gulp.dest(distDir + '/styles/')))
  );
});

/**
 * Bundle fonts
 */
gulp.task('fonts', async function () {
  var fonts = [
    //'./bower_components/font-awesome/fonts/**.*',
    './bower_components/bootstrap/dist/fonts/**.*',
  ];

  return gulp
    .src(fonts)
    .pipe(gulpif(!dist, gulp.dest(devDir + '/fonts')))
    .pipe(gulpif(dist, gulp.dest(distDir + '/fonts')));
});

/**
 * Bundle images
 */
gulp.task('images', async function () {
  return gulp
    .src(srcDir + '/assets/images/**/*')
    .pipe(gulpif(!dist, gulp.dest(devDir + '/images/')))
    .pipe(gulpif(dist, gulp.dest(distDir + '/images/')));
});

/**
 * Bundle scripts
 */
gulp.task('scripts', async function () {
  function createErrorHandler(name) {
    return function (err) {
      console.error('Error from ' + name + ' in task', err.toString());
    };
  }

  return (
    gulp
      .src(srcDir + '/app/**/*.js')
      .on('error', createErrorHandler('gulp.src'))
      .pipe(replace(/('|")use strict\1/g, ';'))
      .on('error', createErrorHandler('remove'))
      //.pipe(sourcemaps.init())
      .pipe(concat('app.min.js'))
      //.pipe(gulpif(!dist, sourcemaps.write('/')))
      .pipe(gulpif(!dist, connect.reload()))
      .pipe(uglify())
      .on('error', createErrorHandler('uglify'))
      .pipe(gulpif(dist, stripDebug()))
      .on('error', createErrorHandler('strip'))
      .pipe(gulpif(dist, stripComment()))
      .on('error', createErrorHandler('strip'))
      .pipe(gulpif(!dist, gulp.dest(devDir + '/scripts/')))
      .pipe(gulpif(dist, gulp.dest(distDir + '/scripts/')))
      .on('error', createErrorHandler('gulp.dest'))
  );
});

/**
 * Bundle JSON
 */
gulp.task('json', async function () {
  return gulp
    .src(srcDir + '/assets/json/*')
    .pipe(gulpif(!dist, gulp.dest(devDir + '/json/')))
    .pipe(gulpif(dist, gulp.dest(distDir + '/json/')));
});

/**
 * Live reload
 */
gulp.task('connect-dev', async function () {
  return connect.server({
    root: 'dev',
    port: '1212',
    livereload: true,
  });
});

/**
 * Set production
 */
gulp.task('set-production', async function () {
  dist = true;
});

/**
 * Bundle HTML
 */
gulp.task('html', async function () {
  return gulp
    .src(srcDir + '/index.html')
    .pipe(gulpif(!dist, gulp.dest(devDir)))
    .pipe(gulpif(!dist, connect.reload()))
    .pipe(gulpif(dist, gulp.dest(distDir)));
});

// Lint Task - Lint all javascript files using jshint
gulp.task('jslint', async function () {
  return gulp
    .src(srcDir + '/app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// Lint Task - Lint all SASS/CSS files
gulp.task('csslint', async function () {
  return gulp
    .src([srcDir + '/app/**/*.s+(a|c)ss', srcDir + '/assets/styles/app.scss'])
    .pipe(
      sassLint({
        configFile: '.sass-lint.yml',
      })
    )
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

/**
 * Bundle angular templates
 */
gulp.task('templates', async function () {
  return gulp
    .src(srcDir + '/app/**/*.html')
    .pipe(
      minifyHTML({
        empty: true,
        quotes: true,
        spare: true,
      })
    )
    .pipe(
      templatecache('tpl.min.js', {
        module: 'app',
        standalone: false,
      })
    )
    .pipe(uglify())
    .pipe(gulpif(!dist, gulp.dest(devDir + '/scripts/')))
    .pipe(gulpif(!dist, connect.reload()))
    .pipe(gulpif(dist, gulp.dest(distDir + '/scripts/')));
});

/**
 * Watch for changes
 */
gulp.task('watch', async function () {
  gulp.watch(srcDir + '/*.html', gulp.series('html'));
  gulp.watch(srcDir + '/app/**/*.js', gulp.series('scripts', 'jslint'));
  gulp.watch(srcDir + '/**/*.scss', gulp.series('styles', 'csslint'));
  gulp.watch(srcDir + '/app/**/*.html', gulp.series('templates'));
  gulp.watch(srcDir + '/assets/json/*.json', gulp.series('json'));
});

/**
 * Development tasks
 */
gulp.task(
  'dev',
  gulp.series(
    'connect-dev',
    'libs',
    'styles',
    'fonts',
    'html',
    'scripts',
    'templates',
    'images',
    'watch',
    'json'
  )
);

/**
 * Production tasks
 */
gulp.task(
  'dist',
  gulp.series(
    'set-production',
    'libs',
    'styles',
    'fonts',
    'html',
    'scripts',
    'templates',
    'images',
    'json'
  )
);

/**
 * Default task
 */
gulp.task('default', gulp.series('dev'), async function () {});

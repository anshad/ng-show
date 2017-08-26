/*
* @Author: Anshad Vattapoyil
* @Date:   2017-08-24 21:51:48
* @Last Modified by:   Anshad Vattapoyil
* @Last Modified time: 2017-08-26 14:52:21
*/
var gulp = require('gulp'),
sourcemaps = require("gulp-sourcemaps"),
concat = require("gulp-concat"),
stripComment = require('gulp-strip-comments'),
stripDebug = require('gulp-strip-debug'),
gulpif = require('gulp-if'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
gutil = require('gulp-util'),
sass = require('gulp-sass'),
connect = require('gulp-connect'),
minifyCSS = require('gulp-clean-css'),
minifyHTML = require('gulp-htmlmin'),
templatecache = require('gulp-angular-templatecache'),
replace = require('gulp-replace');

var devDir = './dev',
distDir = './dist',
srcDir = './src',
dist = false;

/**
* Bundle library scripts
*/
gulp.task('libs', function() {
	var libs = [
	'./bower_components/jquery/dist/jquery.js',
	'./bower_components/underscore/underscore.js',
	'./bower_components/angular/angular.min.js',
	'./bower_components/angular-bootstrap/ui-bootstrap.js',
	'./bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
	'./bower_components/angular-ui-router/release/angular-ui-router.js',
	];

	return gulp.src(libs)
	.pipe(concat('dep.min.js'))
	.pipe(uglify())
	.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
	.pipe(gulpif(!dist, gulp.dest(devDir + '/scripts/')))
	.pipe(gulpif(dist, gulp.dest(distDir + '/scripts/')));
});

/**
* Bundle styles
*/
gulp.task('styles', function() {

	var styles = [
	//'./bower_components/font-awesome/scss/font-awesome.scss',
	srcDir + '/assets/styles/app.scss'
	];

	return gulp.src(styles)
	//.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(concat('app.min.css'))
	//.pipe(gulpif(!dist, sourcemaps.write('.')))
	.pipe(gulpif(!dist, connect.reload()))
	.pipe(minifyCSS())
	.pipe(gulpif(!dist, gulp.dest(devDir + '/styles/')))
	.pipe(gulpif(dist, gulp.dest(distDir + '/styles/')));
});

/**
* Bundle fonts
*/
gulp.task('fonts', function() {
	var fonts = [
	//'./bower_components/font-awesome/fonts/**.*',
	'./bower_components/bootstrap/dist/fonts/**.*'
	];

	return gulp.src(fonts)
	.pipe(gulpif(!dist, gulp.dest(devDir + '/fonts')))
	.pipe(gulpif(dist, gulp.dest(distDir + '/fonts')));
});

/**
* Bundle images
*/
gulp.task('images', function() {
	return gulp.src(srcDir + '/assets/images/**/*')
	.pipe(gulpif(!dist, gulp.dest(devDir + '/images/')))
	.pipe(gulpif(dist, gulp.dest(distDir + '/images/')));
});

/**
* Bundle scripts
*/
gulp.task('scripts', function() {

	function createErrorHandler(name) {
		return function(err) {
			console.error('Error from ' + name + ' in task', err.toString());
		};
	}

	return gulp.src(srcDir + '/app/**/*.js')
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
	.on('error', createErrorHandler('gulp.dest'));
});

/**
* Bundle JSON
*/
gulp.task('json', function() {
	return gulp.src(srcDir + '/assets/json/*')
	.pipe(gulpif(!dist, gulp.dest(devDir + '/json/')))
	.pipe(gulpif(dist, gulp.dest(distDir + '/json/')))
});

/**
* Live reload
*/
gulp.task('connect-dev', function() {
	return connect.server({
		root: 'dev',
		port: '1212',
		livereload: true
	});
});

/**
* Set production
*/
gulp.task('set-production', function() {
	dist = true;
});

/**
* Bundle HTML
*/
gulp.task('html', function() {
	return gulp.src(srcDir + '/index.html')
	.pipe(gulpif(!dist, gulp.dest(devDir)))
	.pipe(gulpif(!dist, connect.reload()))
	.pipe(gulpif(dist, gulp.dest(distDir)));
});

/**
* Bundle angular templates
*/
gulp.task('templates', function() {
	return gulp.src(srcDir + '/app/**/*.html')
	.pipe(minifyHTML({
		empty: true,
		quotes: true,
		spare: true
	}))
	.pipe(templatecache('tpl.min.js', {
		module: 'app.templates',
		standalone: true
	}))
	.pipe(uglify())
	.pipe(gulpif(!dist, gulp.dest(devDir + '/scripts/')))
	.pipe(gulpif(!dist, connect.reload()))
	.pipe(gulpif(dist, gulp.dest(distDir + '/scripts/')));
});

/**
* Watch for changes
*/
gulp.task('watch', function() {
	gulp.watch(srcDir + '/*.html', ['html']);
	gulp.watch(srcDir + '/app/**/*.js', ['scripts']);
	gulp.watch(srcDir + '/**/*.scss', ['styles']);
	gulp.watch(srcDir + '/app/**/*.html', ['templates']);
	gulp.watch(srcDir + '/assets/json/*.json', ['json']);
});

/**
* Development tasks
*/
gulp.task('dev', ['connect-dev','libs','styles','fonts','html','scripts','templates','images','watch', 'json']);

/**
* Production tasks
*/
gulp.task('dist', ['set-production','libs','styles','fonts','html','scripts','templates','images','json']);

/**
* Default task
*/
gulp.task('default', ['dev'], function() {});
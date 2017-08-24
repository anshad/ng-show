/*
* @Author: Anshad Vattapoyil
* @Date:   2017-08-24 21:51:48
* @Last Modified by:   Anshad Vattapoyil
* @Last Modified time: 2017-08-24 23:23:48
*/
var gulp = require('gulp'),
sourcemaps = require("gulp-sourcemaps"),
concat = require("gulp-concat"),
stripComment = require('gulp-strip-comments'),
stripDebug = require('gulp-strip-debug'),
gulpif = require('gulp-if'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
gutil = require('gulp-util');

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
* Development tasks
*/
gulp.task('dev', ['libs']);

/**
* Default task
*/
gulp.task('default', ['dev']);
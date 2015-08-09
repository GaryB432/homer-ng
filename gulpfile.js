var gulp = require('gulp');
'use strict';

var concat = require('gulp-concat');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var pkg = require('./package.json');


gulp.task('scripts', function () {
    return gulp.src([
        'source/bower_components/angular/angular.js',
        'source/bower_components/angular-touch/angular-touch.js',
        'source/bower_components/angular-animate/angular-animate.js',
        'source/bower_components/angular-resource/angular-resource.js',
        'source/bower_components/angular-route/angular-route.js',
        'source/geo/geo.js'
    ])
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('./app/js/'));
});

gulp.task('templates', function () {
    gulp.src('./source/jade/**/*.jade')
        .pipe(jade({
            data: {
                debug: false,
                timestamp: new Date().toISOString(),
                version: pkg.version
            },
            pretty: true
        }))
        .pipe(gulp.dest('./app/'))
});

gulp.task('sass', function () {
    gulp.src('./source/sass/style.scss')
        .pipe(sass({ outputStyle: 'compact', outFile: 'style.css' })
            .on('error', sass.logError))
        .pipe(gulp.dest('./app/css/'));
});
 
// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass']);
// });

gulp.task('default', ['scripts', 'templates', 'sass']);


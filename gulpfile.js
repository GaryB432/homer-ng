var gulp = require('gulp');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
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

gulp.task('default', ['scripts', 'templates']);


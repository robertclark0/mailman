// Include gulp
var gulp = require('gulp');
var concat = require('gulp-concat');
var order = require('gulp-order');


// Javascript Libraries
gulp.task('libraries.js', function () {
    return gulp.src([
        'libraries/jquery/jquery-1.12.3.min.js',
        'libraries/angular/angular.min.js',
        'libraries/angular/angular-material.min.js',
        'libraries/angular/angular-loading-bar.min.js',
        'libraries/angular/angular-sanitize.min.js',
        'libraries/angular/angular-animate.min.js',
        'libraries/angular/angular-aria.min.js',
        'libraries/angular/angular-resource.min.js',
        'libraries/angular/angular-ui-router.min.js',
        'libraries/angular/angular-css.min.js',
        'libraries/jsoneditor/jsoneditor-minimalist.min.js'
    ])
      .pipe(concat('dist.libraries.min.js'))
      .pipe(gulp.dest('assets/js'));
});


//  Main 
gulp.task('mailman.module.js', function () {
    return gulp.src([
        'assets/js/app.module.js',
        'assets/js/app.config.js',
        'core-components/**/*.js',
        'shared-components/**/*.js'
    ])
      .pipe(order([
          'app.module.js',
          '**/module.js'
      ]))
      .pipe(concat('dist.js'))
      .pipe(gulp.dest('assets/js'));
});
gulp.task('mailman.module.css', function () {
    return gulp.src([
        'assets/css/roboto.css',
        'libraries/angular/angular-material.min.css',
        'libraries/angular/angular-loading-bar.min.css',
        'libraries/jsoneditor.min.css',
        'assets/css/style.css',
		'core-components/**/*.css',		
        'shared-components/**/*.css'
    ])
      .pipe(concat('dist.css'))
      .pipe(gulp.dest('assets/css'));
});


// Execute Default Tasks
gulp.task('default', [
    'libraries.js',
    'mailman.module.js',
    'mailman.module.css'
    ]);
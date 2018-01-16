/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';

var gulp = require('gulp');
var wrench = require('wrench');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});


/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */

var s3 = require("gulp-s3");
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
gulp.task('deploy:test', function () {
  var settings = require('./aws.json');
  return gulp.src('./dist/**/*').pipe(s3(settings, {
    uploadPath: "/ces-s9/"
  }));
});

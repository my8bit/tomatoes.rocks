const gulp = require('gulp');
const del = require('del');
const conf = require('../conf/gulp.conf');

gulp.task('clean', () => del([conf.paths.dist, conf.paths.tmp]));

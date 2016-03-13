import gulp from 'gulp';
import requireDir from 'require-dir';
import connect from 'gulp-connect';

requireDir('./gulp', {recurse: true})


gulp.task('devserver', () => {
  connect.server({
    root: ['templates', '.'],
    port: 3000,
    livereload: true,
  });
});


gulp.task('watch', () => {
  gulp.watch('assets/scss/**/*.scss', ['styles']);
});


gulp.task('default', ['svg-sprite', 'styles', 'devserver', 'watch']);

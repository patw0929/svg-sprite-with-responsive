import gulp from 'gulp';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import mqpacker from 'css-mqpacker';
import autoprefixer from 'autoprefixer';
import atImport from 'postcss-import';
import cssnano from 'cssnano';
import rename from 'gulp-rename';
import notify from 'gulp-notify';
import connect from 'gulp-connect';


gulp.task('styles', () => {
  gulp.src('./assets/scss/*.scss').pipe(sass({
    includePaths: ['./node_modules'],
    errLogToConsole: true,
    outputStyle: 'compressed',
  }))
  .pipe(postcss([
    atImport({
      path: ['./node_modules'],
    }),
    mqpacker({
      sort: true,
    }),
    autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }),
    cssnano(),
  ]))
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulp.dest('./static/css'))
  .pipe(connect.reload())
  .pipe(notify('Done: <%= file.relative %>'));
});

import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import svg2png from 'gulp-svg2png';
import filter from 'gulp-filter';
import fs from 'fs';
import plumber from 'gulp-plumber';

// Generate SVG sprites
gulp.task('svg-sprite', () => {
  gulp.src('./assets/svg/*.svg')
    .pipe(plumber())
    .pipe(svgSprite({
      shape: {
        spacing: {
          padding: 2,
        },
      },
      mode: {
        view: {
          bust: false,
          render: {
            scss: {
              template: './gulp/tasks/sprite/scss.scss',
              dest: '../../assets/scss/sprite/_icons.scss',
            },
          },
          sprite: 'sprite.svg',
          layout: 'vertical',
          dest: 'images',
        },
      },
      variables: {
        pngPath: 'sprite.png',
      },
    }))
    .pipe(gulp.dest('./static'))
    .pipe(filter('images/sprite.svg'))
    .pipe(svg2png())
    .pipe(gulp.dest('./static'))
});

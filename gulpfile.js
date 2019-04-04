const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const webpack = require('webpack-stream');
const browserSync = require('browser-sync').create();

const taskHtml = () => src('src/**/*.html').pipe(dest('public'));
const taskSass = () => (
  src('src/sass/style.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(dest('public'))
    .pipe(browserSync.stream())
)
const taskJS = () => (
  src('src/js/index.js')
    .pipe(webpack({ mode: 'development'}))
    .pipe(babel({
      presets: ['@babel/env'],
      plugins: ['@babel/plugin-syntax-dynamic-import']
    }))
    .pipe(concat('app.js'))
    .pipe(dest('public'))
)

const taskServe = () => {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  })
}

const taskWatch = () => {
  watch('src/**/*.js', taskJS).on('change', browserSync.reload);
  watch('src/**/*.scss', taskSass);
  watch('src/**/*.html', taskHtml).on('change', browserSync.reload);
}


exports.default = series(
  parallel(
    taskHtml,
    taskSass,
    taskJS
  ),
  parallel(
    taskWatch,
    taskServe
  )
);

exports.build = parallel(
  taskHtml, taskSass, taskJS
);
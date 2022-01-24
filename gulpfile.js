const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');

function compilescss(){
    return src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(minify())
    .pipe(dest('public/styles'))
}

function jsmin(){
    return src('src/scripts/**/*.js')
    .pipe(terser())
    .pipe(dest('public/scripts'))
}

function watchTask(){
    watch('src/scss/**/*.scss', compilescss);
    watch('src/scripts/**/*.js', jsmin);
}

exports.default = watchTask;

exports.default = series(
    compilescss,
    jsmin,
    watchTask
);
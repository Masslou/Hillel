'use strict';


const {series, src, dest, watch} = require('gulp');
const concat = require('gulp-concat');
const inject = require('gulp-inject');
const sass = require('gulp-sass');
const del = require('del');

function cleanTask() {
    return del('dist/**', {force: true});
}

function concatJS(cb) {
    src(['./script/**/*.js', './src/js/**/*.js'])
        .pipe(concat('build.js'))
        .pipe(dest('./dist/js'));

    cb();
}

function concatStyles(cb) {
    src('./src/assets/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(dest('./dist/css'));

    cb();
}

function injectTask() {
    const target = src('./src/index.html');
    const sources = src(['./dist/js/*.js', './dist/css/*.css'], {read: false});

    return target.pipe(inject(sources, {relative: true}))
        .pipe(dest('dist/'));
}


function devTask() {
    watch('./src/index.html', series(injectTask));
    watch('./src/js/**/*.js', concatJS);
    watch('./src/assets/**/*.scss', concatStyles);
}

module.exports.build = series(cleanTask, concatJS, concatStyles, injectTask);
module.exports.dev = devTask;

const {series, src, dest, watch} = require('gulp');

function copyTask(cb) {
    src('src/index.html')
        .pipe(dest('dist/'));
    console.log('copying....');
    cb();
}


function devTask() {
    watch('src/**/*.*', {}, function (cb) {
        src('src/*.html')
            .pipe(src('src/**/*.css'))
            .pipe(dest('dist/'));


        cb();

    })
}


function minify(cb) {
    console.log('copying....');
    cb();
}


function defaultTask(cb) {
    console.log('I am doing smth');

    cb();
}

module.exports.default = defaultTask;
module.exports.build = series(copyTask, minify);
module.exports.dev = devTask();



const gulp = require('gulp');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const rollup = require('gulp-rollup');
const replace = require('@rollup/plugin-replace');
const scripts = {
    src: './src/server/**/*.js',
    dest: 'dist/server/',
};
let build = null;
function buildDev() {
    // Endless stream mode
    return watch(scripts.src, { ignoreInitial: false })
        .pipe(babel({
            babelrc: false,
            plugins: ['@babel/plugin-transform-modules-commonjs']
        }))
        .pipe(gulp.dest(scripts.dest));
}
function cleanConfig() {
    return gulp.src(scripts.src)
        .pipe(rollup({
            // rollup: require('rollup'),
            input: './src/server/config/index.js',
            output: {
                format: "cjs",
            },
            plugins: [
                replace({
                  // alternatively, one could pass process.env.NODE_ENV or 'development` to stringify
                  'process.env.NODE_ENV': JSON.stringify('production'),
                })
            ]
        }))
        .pipe(gulp.dest(scripts.dest));
}
function buildProd() {
    return gulp.src(scripts.src, { sourcemaps: true })
        .pipe(babel({
            babelrc: false,
            // ignore: ['./src/server/config/index.js'],
            plugins: ['@babel/plugin-transform-modules-commonjs']
        }))
        .pipe(gulp.dest(scripts.dest));
}
if (process.env.NODE_ENV !== 'production') {
    // build = gulp.series(buildDev);
    build = buildDev;
} else {
    build = gulp.series(buildProd, cleanConfig);
}
// 定义了一个默认的任务build
gulp.task('default', build);
/*
 * Export a default task
 * 导出一个默认任务(都可以用)
 */
// exports.default = build;
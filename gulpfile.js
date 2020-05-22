const gulp = require('gulp');
// gulp 核心方法
const { src, dest, series, parallel, watch } = require('gulp');
// gulp压缩js
const uglify = require('gulp-uglify');
// gulp判断
const gulpif = require('gulp-if');
// gulp压缩css
const cleanCSS = require('gulp-clean-css');
// 删除文件
const del = require('delete');
// 实时刷新浏览器
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
// 文件合并
const useref = require('gulp-useref');
// uglify js压缩配置 https://github.com/mishoo/UglifyJS#minify-options
const uglifyOptions = {
    compress: {
        drop_console: true
    }
}

// 清除dist目录
function clean() {
    return del(['dist']);
}
//监听文件+重载
function watchReload() {
    serve();
    const watcher = watch(['src/**']);

    // 多次刷新节流
    let reloadTimer = null;
    watcher.on('change', function (path, stats) {
        if (reloadTimer !== null) {
            return;
        }
        reloadTimer = setTimeout(() => {
            reload();
            reloadTimer = null;
        }, 500);

    });
}

// 打包js
function js() {
    return src(['src/**/*.html', '!src/lib/**'])
        .pipe(useref(), function () {
            return vinylPaths(del)
        })
        .pipe(gulpif(isJavaScript, uglify(uglifyOptions)))
        .pipe(gulpif(isCss, cleanCSS()))
        .pipe(dest('dist/'))
}
// 打包其他文件
function otherFile() {
    return src(['src/**', '!src/**/*.html', '!src/**/*.js', '!src/**/*.css', '!src/lib/**'])
        .pipe(dest('dist/'))
}

// 静态服务器
function serve() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
}

// 判断文件的扩展名是否是 '.js' , 且需要为未压缩过的js
function isJavaScript(file) {
    return file.extname === '.js';
}

// 判断文件的扩展名是否是 '.css' , 且需要为未压缩过的css
function isCss(file) {
    return file.extname === '.css';
}

const build = series(clean, parallel(js, otherFile));
const dev = watchReload;

exports.build = build;
exports.dev = dev;
exports.default = build;
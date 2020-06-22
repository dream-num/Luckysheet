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

// rollup打包，处理es6模块
const { rollup } = require('rollup');
// rollup寻找node_modules模块
const { nodeResolve } = require('@rollup/plugin-node-resolve');
// rollup把commonjs模块转化为es6模块
const commonjs = require('@rollup/plugin-commonjs');
// rollup代码压缩
const terser = require('rollup-plugin-terser').terser;
// rollup babel plugin, support the latest ES grammar
const babel = require('@rollup/plugin-babel').default;
// 区分开发与生产环境
const production = !process.env.ROLLUP_WATCH;

// uglify js压缩配置 https://github.com/mishoo/UglifyJS#minify-options
const uglifyOptions = {
    compress: {
        drop_console: true
    }
}

const babelConfig = {
    babelHelpers: 'bundled',
    exclude: 'node_modules/**', // 只编译我们的源代码
    plugins: [
    ],
    presets: [
        '@babel/preset-env'
    ]
};


// 清除dist目录
function clean() {
    return del(['dist']);
}
//监听文件+重载
function watchReload() {
    serve();
    core();
    const watcher = watch(['src/**']);

    // 多次刷新节流
    let reloadTimer = null;
    watcher.on('change', function (path, stats) {
        console.info('change------',path)
        

        if (reloadTimer !== null) {
            return;
        }
        reloadTimer = setTimeout(() => {
            reload();
            // core();
            reloadTimer = null;
        }, 500);

    });
}

//打包核心代码
async function core() {
    const bundle = await rollup({
        input: 'src/index.js',
        plugins: [
            nodeResolve(), // tells Rollup how to find date-fns in node_modules
            commonjs(), // converts date-fns to ES modules
            // postcss({
            // 	plugins: [],
            // 	extract: true,
            // 	// minimize: isProductionEnv,
            // }),
            // production && terser(), // minify, but only in production
            babel(babelConfig)
        ],
    });

    return bundle.write({
        file: 'src/luckysheet.js',
        format: 'umd',
        name: 'luckysheet',
        sourcemap: true
    });
}

// 打包js
function js() {
    return src(['src/**/*.html', '!src/luckysheet-core.js','!src/luckysheet-function.js','!src/luckysheet-chart.js'])
        .pipe(useref(), function () {
            return vinylPaths(del)
        })
        .pipe(gulpif(isJavaScript, uglify(uglifyOptions)))
        .pipe(gulpif(isCss, cleanCSS()))
        .pipe(dest('dist/'))
}
// 打包其他文件
function otherFile() {
    return src(['src/**', '!src/**/*.html', '!src/**/*.js', '!src/**/*.css', '!src/luckysheet-core.js','!src/luckysheet-function.js','!src/luckysheet-chart.js'])
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

const build = series(clean, parallel(js, otherFile, core));
const dev = watchReload;

exports.build = build;
exports.dev = dev;
exports.default = build;
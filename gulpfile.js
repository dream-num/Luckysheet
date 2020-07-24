const gulp = require('gulp');
// gulp core function
const { src, dest, series, parallel, watch } = require('gulp');
// gulp compress js
const uglify = require('gulp-uglify');
// gulp judgment
const gulpif = require('gulp-if');
// gulp compress css
const cleanCSS = require('gulp-clean-css');
// Delete Files
const del = require('delete');
// Refresh the browser in real time
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
// According to html reference, files are merged
// const useref = require('gulp-useref');
// File merge
const concat = require('gulp-concat');
// rollup packaging, processing es6 modules
const { rollup } = require('rollup');
// rollup looks for node_modules module
const { nodeResolve } = require('@rollup/plugin-node-resolve');
// rollup converts commonjs module to es6 module
const commonjs = require('@rollup/plugin-commonjs');
// rollup code compression
const terser = require('rollup-plugin-terser').terser;
// rollup babel plugin, support the latest ES grammar
const babel = require('@rollup/plugin-babel').default;
// Distinguish development and production environments
const production = process.env.NODE_ENV === 'production' ? true : false;

// uglify js Compression configuration https://github.com/mishoo/UglifyJS#minify-options
const uglifyOptions = {
    compress: {
        drop_console: true
    }
}

// babel config
const babelConfig = {
    babelHelpers: 'bundled',
    exclude: 'node_modules/**', // Only compile our source code
    plugins: [
    ],
    presets: [
        '@babel/preset-env'
    ]
};

// file handler paths
const paths = {
    // static resources,contains index.html, fonts and images,and extension plugins dependency
    staticHtml: ['src/*.html'],
    staticFonts: ['src/fonts/**'],
    staticImages: ['src/plugins/images/*.png'],
    staticExpendPlugins: ['src/expendPlugins/**', '!src/expendPlugins/**/plugin.js'],
    staticDemoData: ['src/demoData/*.js'],
    staticCssImages: ['src/css/**','!src/css/*.css'],

    // static resources dest
    destStaticHtml: ['dist'],
    destStaticFonts: ['dist/fonts'],
    destStaticImages: ['dist/plugins/images'],
    destStaticExpendPlugins: ['dist/expendPlugins'],
    destStaticDemoData: ['dist/demoData'],
    destStaticCssImages: ['dist/css'],

    //core es module
    core: ['src/**/*.js','!src/demoData/*.js','src/expendPlugins/**/plugin.js','!src/plugins/js/*.js'], 

     //plugins src
    pluginsCss: ['src/plugins/css/*.css'],
    plugins: ['src/plugins/*.css'],
    css:['src/css/*.css'],
    pluginsJs:[
        'src/plugins/js/jquery.min.js',
        'src/plugins/js/clipboard.min.js',
        'src/plugins/js/spectrum.min.js',
        'src/plugins/js/jquery-ui.min.js',
        'src/plugins/js/jquery.mousewheel.min.js',
        'src/plugins/js/moment.min.js',
        'src/plugins/js/moment-timezone-with-data.min.js',
        'src/plugins/js/moment-msdate.js',
        'src/plugins/js/numeral.min.js',
        'src/plugins/js/html2canvas.min.js',
        'src/plugins/js/pako.min.js',
        'src/plugins/js/localforage.min.js',
        'src/plugins/js/lodash.min.js',
        'src/plugins/js/daterangepicker.js',
        'src/plugins/js/jstat.min.js'
    ],

    //plugins concat
    concatPluginsCss: 'pluginsCss.css',
    concatPlugins: 'plugins.css',
    concatCss: 'luckysheet.css',
    concatPluginsJs: 'plugin.js',
    
    //plugins dest
    destPluginsCss: ['dist/plugins/css'],
    destPlugins: ['dist/plugins'],
    destCss: ['dist/css'],
    destPluginsJs: ['dist/plugins/js'],

    // Package directory
    dist: 'dist',
};

// Clear the dist directory
function clean() {
    return del([paths.dist]);
}

// Static server
function serve(done) {
    browserSync.init({
        server: {
            baseDir: paths.dist
        }
    }, done)
}

// Monitoring file changes
function watcher(done) {
    watch(paths.core,{ delay: 500 }, series(core, reloadBrowser));

    // watch plugins and css
    watch(paths.pluginsCss,{ delay: 500 }, series(pluginsCss, reloadBrowser));
    watch(paths.plugins,{ delay: 500 }, series(plugins, reloadBrowser));
    watch(paths.css,{ delay: 500 }, series(css, reloadBrowser));
    watch(paths.pluginsJs,{ delay: 500 }, series(pluginsJs, reloadBrowser));

    // watch static
    watch(paths.staticHtml,{ delay: 500 }, series(copyStaticHtml, reloadBrowser));
    watch(paths.staticFonts,{ delay: 500 }, series(copyStaticFonts, reloadBrowser));
    watch(paths.staticImages,{ delay: 500 }, series(copyStaticImages, reloadBrowser));
    watch(paths.staticExpendPlugins,{ delay: 500 }, series(copyStaticExpendPlugins, reloadBrowser));
    watch(paths.staticDemoData,{ delay: 500 }, series(copyStaticDemoData, reloadBrowser));
    watch(paths.staticCssImages,{ delay: 500 }, series(copyStaticCssImages, reloadBrowser));

    done();
}

// Refresh browser
function reloadBrowser(done) {
    reload();

    done();
}

//Package the core code
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
            production && terser(), // minify, but only in production
            babel(babelConfig)
        ],
    });

    bundle.write({
        file: 'dist/luckysheet.umd.js',
        format: 'umd',
        name: 'luckysheet',
        sourcemap: true
    });

    if(production){
        bundle.write({
            file: 'dist/luckysheet.esm.js',
            format: 'esm',
            name: 'luckysheet',
            sourcemap: true
        });
    }
    
}

// According to the build tag in html, package js and css
function pluginsCss() {
    return src(paths.pluginsCss)
        .pipe(concat(paths.concatPluginsCss))
        .pipe(gulpif(production, cleanCSS()))
        .pipe(dest(paths.destPluginsCss))
    
}

function plugins() {
    return src(paths.plugins)
        .pipe(concat(paths.concatPlugins))
        .pipe(gulpif(production, cleanCSS()))
        .pipe(dest(paths.destPlugins));
}

function css() {
    return  src(paths.css)
        .pipe(concat(paths.concatCss))
        .pipe(gulpif(production, cleanCSS()))
        .pipe(dest(paths.destCss));
}

function pluginsJs() {
    return  src(paths.pluginsJs)
        .pipe(concat(paths.concatPluginsJs))
        .pipe(gulpif(production, uglify(uglifyOptions)))
        .pipe(dest(paths.destPluginsJs));
}

// Copy static resources
function copyStaticHtml(){
    return src(paths.staticHtml)
        .pipe(dest(paths.destStaticHtml));
}
function copyStaticFonts(){
    return src(paths.staticFonts)
        .pipe(dest(paths.destStaticFonts));
}
function copyStaticImages(){
    return src(paths.staticImages)
        .pipe(dest(paths.destStaticImages));
}
function copyStaticExpendPlugins(){
    return src(paths.staticExpendPlugins)
        .pipe(dest(paths.destStaticExpendPlugins));
}
function copyStaticDemoData(){
    return src(paths.staticDemoData)
        .pipe(dest(paths.destStaticDemoData));
}
function copyStaticCssImages(){
    return src(paths.staticCssImages)
        .pipe(dest(paths.destStaticCssImages));
}

const dev = series(clean, parallel(pluginsCss, plugins, css, pluginsJs, copyStaticHtml, copyStaticFonts, copyStaticImages, copyStaticExpendPlugins, copyStaticDemoData, copyStaticCssImages, core), watcher, serve);
const build = series(clean, parallel(pluginsCss, plugins, css, pluginsJs, copyStaticHtml, copyStaticFonts, copyStaticImages, copyStaticExpendPlugins, copyStaticDemoData, copyStaticCssImages, core));

exports.dev = dev;
exports.build = build;
exports.default = dev;
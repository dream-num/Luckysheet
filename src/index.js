import './utils/math'
import { luckysheet } from './core'
import __firefox from './utils/polyfill'
// Prevent gulp warning: 'Use of eval is strongly discouraged, as it poses security risks and may cause issues with minification'
// window.evall = window.eval;
// polyfill event in firefox
if (window.addEventListener && (navigator.userAgent.indexOf("Firefox") > 0)) {
    __firefox();
}

// export default luckysheet;
// use esbuild,bundle iife format
module.exports = luckysheet
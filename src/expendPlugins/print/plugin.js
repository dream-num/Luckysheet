import { seriesLoadScripts, loadLinks, $$ } from '../../utils/util'


// Dynamically load dependent scripts and styles
const dependScripts = [
    // 'expendPlugins/chart/chartmix.umd.min.js',
    'http://localhost:8080/luckysheetPluginPrint.umd.js',
]

const dependLinks = [
    // 'expendPlugins/chart/chartmix.css',
    'http://localhost:8080/luckysheetPluginPrint.css',
]

// Initialize the chart component
function print(data, isDemo) {
    loadLinks(dependLinks);

    seriesLoadScripts(dependScripts, null, function () {
        
    });
}



export { print }

import { seriesLoadScripts, loadLinks, $$, arrayRemoveItem } from "../../utils/util";
import { luckysheetPrint } from "./print";
import Store from "../../store";

// Dynamically load dependent scripts and styles
const dependScripts = [
    // 'expendPlugins/chart/chartmix.umd.min.js',
    // "http://localhost:8080/luckysheetPluginPrint.umd.js",
];

const dependLinks = [
    // 'expendPlugins/chart/chartmix.css',
    // "http://localhost:8080/luckysheetPluginPrint.css",
];

// Initialize the chart component
function print(options, config, isDemo) {
    const data = options.data;
    // loadLinks(dependLinks);

    // seriesLoadScripts(dependScripts, null, function() {});
    if (luckysheetPrint) {
        arrayRemoveItem(Store.asyncLoad, "print");
        Store.luckysheetPrint = luckysheetPrint;
        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", "./expendPlugins/print/print.css");
        document.head.appendChild(link);
    }
}

export { print };

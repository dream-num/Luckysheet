import { seriesLoadScripts, loadLinks, $$ } from '../../utils/util'
// import { generateRandomKey , deepCopy } from '../../utils/chartUtil'
// import { chartOptions } from '../../data/chartJson'
import chartInfo from '../../store'

// Dynamically load dependent scripts and styles
const dependScripts = [
    'https://cdn.jsdelivr.net/npm/vue@2.6.11',
    'https://unpkg.com/vuex@3.4.0',
    'https://unpkg.com/element-ui/lib/index.js',
    'expendPlugins/chart/chartmix.umd.js'
]

const dependLinks = [
    'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
    'expendPlugins/chart/chartmix.css'
]



// Initialize the chart component
function chart() {
    loadLinks(dependLinks);

    seriesLoadScripts(dependScripts, null, function () {
        const store = new Vuex.Store()
        console.info('chartmix::', chartmix.default)

        Vue.use(chartmix.default, { store })
        let outDom = document.getElementById('luckysheet_info_detail')
        chartmix.default.initChart(outDom)
        $('.chartSetting').css({
            position: 'absolute',
            zIndex: 999,
            right: 0,
            width: '300px',
            display: 'none'
        })
        chartInfo.createChart = chartmix.default.createChart
    });
}

export { chart }
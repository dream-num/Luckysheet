import {seriesLoadScripts, loadLinks, $$} from '../../utils/util'

// Dynamically load dependent scripts and styles
const dependScripts = [
    'https://cdn.jsdelivr.net/npm/vue@2.6.11',
    'https://unpkg.com/vuex@3.4.0',
    'https://unpkg.com/element-ui/lib/index.js',
    './src/expendPlugins/chart/chartmix.umd.js'
]

const dependLinks = [
    'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
    './src/expendPlugins/chart/chartmix.css'
]

// Initialize the chart component
function chart(){
    loadLinks(dependLinks);

    seriesLoadScripts(dependScripts,null,function () {
        const store = new Vuex.Store()
        console.info('chartmix::',chartmix.default)
        console.info('store::',store)

        Vue.use(chartmix.default,{store})

        $$('#luckysheet_info_detail').innerHTML = `<div id="chartmix">
        <chart-mix msg="你猜猜"/>
      </div>`;

        var app = new Vue({
        el: '#chartmix',
        store: store,
        data: {
            message: 'Hello Vue!'
        }
        })
    });
}

export default chart;
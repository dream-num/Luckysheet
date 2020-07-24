import { seriesLoadScripts, loadLinks, $$ } from '../../utils/util'
import { generateRandomKey , deepCopy } from '../../utils/chartUtil'
import { chartOptions } from '../../data/chartJson'
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
        // chartInfo.store = store
        window.vue = Vue
        console.dir(window.vue)

        $$('#luckysheet_info_detail').innerHTML = `<div id="chartmix"></div>`;

        new Vue({
            el: '#chartmix',
            store: chartInfo.store,
            computed: {
                chartOptions() {
                    if (!chartInfo.store.state.chartSetting.currentChartIndex) {
                        return null
                    }
                    return chartInfo.store.state.chartSetting.chartLists[chartInfo.store.state.chartSetting.currentChartIndex].chartOptions
                }
            },
            template: `<ChartSetting :chartOptions="chartOptions"></ChartSetting>`
        })

        $('.chartSetting').css({
            position: 'absolute',
            zIndex: 999,
            right: 0,
            width: '300px',
            display: 'none'
        })
    });
}

function createChart() {
    let chart_id = generateRandomKey('chart')

    let dom = document.createElement('div')
    dom.id =  chart_id
    let renderDom = document.createElement('div')
    renderDom.id = 'render' + chart_id
    dom.appendChild(renderDom)
    $$('.luckysheet-grid-container').append(dom);

    const store = new Vuex.Store()
    Vue.use(chartmix.default, { store })
    // chartInfo.store = store

    chartInfo.store.state.chartSetting.currentChartIndex = chartInfo.store.state.chartSetting.chartLists.length
    chartInfo.store.state.chartSetting.chartLists.push({
        'chart_id': chart_id,
        'active': true,
        'chartOptions': deepCopy(chartOptions)
    })
    new Vue({
        el: '#render' + chart_id,
        store: chartInfo.store,
        data(){
            return{
                chart_id
            }
        },
        computed: {
            options() {
                return this.$store.state.chartSetting.chartLists.find(item => item.chart_id == this.chart_id).chartOptions
            },
            active(){
                return this.$store.state.chartSetting.chartLists.find(item => item.chart_id == this.chart_id).active
            }
        },
        template: `<ChartRender :chartOptions="options" :chart_id="chart_id" :active="active"></ChartRneder>`
    })
    let render = document.getElementById(chart_id)
    render.style.height = '250px'
    render.style.width = '400px'
    render.style.position = 'absolute'
    render.style.background = '#fff'
    render.style.zIndex = chartInfo.zIndex
    chartInfo.zIndex++
    let chartSetting = document.getElementsByClassName('chartSetting')[0]
    chartSetting.style.display = 'block'
}

export { chart, createChart }
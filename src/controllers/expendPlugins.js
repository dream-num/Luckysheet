import { chart } from '../expendPlugins/chart/plugin'

const pluginsObj = {
    'chart':chart
}

const isDemo = true

/**
 * Register plugins
 */
function initPlugins(plugins , data){
    if(plugins.length){
        plugins.forEach(plugin => {
            pluginsObj[plugin](data , isDemo)
        });
    }
}

export {
    initPlugins
}
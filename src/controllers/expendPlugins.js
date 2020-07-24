import { chart } from '../expendPlugins/chart/plugin'

const pluginsObj = {
    'chart':chart
}
/**
 * Register plugins
 */
function initPlugins(plugins){
    if(plugins.length){
        plugins.forEach(plugin => {
            pluginsObj[plugin]();
        });
    }
}

export {
    initPlugins
}
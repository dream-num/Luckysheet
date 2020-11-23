/**
 * Monitor special variables
 */
import {createProxy} from '../utils/util'
import Store from '../store/index'
const initListener = function(){
    createProxy(Store,['jfredo']);
}

export {
    initListener
}
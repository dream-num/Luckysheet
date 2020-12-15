/**
 * Monitor special variables
 */
import {createProxy} from '../utils/util';
import Store from '../store/index';
import method from '../global/method';
import { getluckysheetfile } from '../methods/get'
import { toJson } from '../global/api';

const initListener = function(){
    // createProxy(Store,['jfredo']);
    createProxy(Store, 'jfredo',(target, property, val, receiver)=>{
        if (property !== 'length') {
            //  钩子函数
            method.createHookFunction('updated',val)
        }
    } );

    createProxy(Store, 'asyncLoad', (target, property, val, receiver)=>{
        if(property === 'length' && val === 0){
            method.createHookFunction('workbookCreateAfter', toJson())
        }
    })
}

export {
    initListener
}
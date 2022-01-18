/**
 * Monitor special variables
 */
import {createProxy} from '../utils/util';
import Store from '../store/index';
import method from '../global/method';
import { getluckysheetfile } from '../methods/get'
import { toJson } from '../global/api';

let undoTimer,redoTimer;
function undoAccessible(len) {
    clearTimeout(undoTimer);
    undoTimer = setTimeout(() => {
        $('#luckysheet-icon-undo')[len ? 'removeClass' : 'addClass']('disabled');
    }, 10);
}
function redoAccessible(len) {
    clearTimeout(redoTimer);
    redoTimer = setTimeout(() => {
        $('#luckysheet-icon-redo')[len ? 'removeClass' : 'addClass']('disabled');
    }, 10);
}

const initListener = function(){
    // createProxy(Store,['jfredo']);
    createProxy(Store, 'jfredo',(target, property, val, receiver)=>{
        if (property !== 'length') {
            //  钩子函数
            method.createHookFunction('updated',val)
        }
        undoAccessible(Store.jfredo.length);
    } );
    createProxy(Store, 'jfundo',(target, property, val, receiver)=>{
        redoAccessible(Store.jfundo.length);
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
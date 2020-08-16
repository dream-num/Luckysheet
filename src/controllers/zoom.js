import Store from '../store';
import locale from '../locale/locale';
import { replaceHtml } from '../utils/util';
import rhchInit from '../global/rhchInit';
import luckysheetConfigsetting from './luckysheetConfigsetting';


export function zoomInitial(){
    //zoom
    Store.rowHeaderWidth = luckysheetConfigsetting.rowHeaderWidth * Store.zoomRatio;
    Store.columeHeaderHeight = luckysheetConfigsetting.columeHeaderHeight *Store.zoomRatio;
    $("#luckysheet-rows-h").width((Store.rowHeaderWidth-1.5));
    $("#luckysheet-cols-h-c").height((Store.columeHeaderHeight-1.5));
    $("#luckysheet-left-top").css({width:Store.rowHeaderWidth-1.5, height:Store.columeHeaderHeight-1.5});
}

export function zoomChange(){

}
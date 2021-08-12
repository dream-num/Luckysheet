import { 
    gridHTML, 
    menuToolBar, 
    flow, 
    columnHeaderHTML,
    maskHTML,
    colsmenuHTML,
    rightclickHTML,
    inputHTML,
    filtermenuHTML,
    filtersubmenuHTML,
    sheetconfigHTML,
} from '../controllers/constant';
import luckysheetConfigsetting from '../controllers/luckysheetConfigsetting';
import luckysheetPostil from '../controllers/postil';
import { datagridgrowth } from './getdata';
import editor from './editor';
import rhchInit from './rhchInit';
import { replaceHtml } from '../utils/util';
import Store from '../store';
import locale from '../locale/locale';

export default function luckysheetcreatedom(colwidth, rowheight, data, menu, title) {
    // //最少30行
    // if(rowheight < 30){
    //     rowheight = 30;
    // }

    // //最少22列
    // if(colwidth < 22){
    //     colwidth = 22;
    // }

    let gh = gridHTML();
    gh = replaceHtml(gh, { "logotitle": title });//设置title
    gh = replaceHtml(gh, { "menu": menuToolBar() });//设置需要显示的菜单

    // if (data.length == 0) {
    //     Store.flowdata = datagridgrowth(data, rowheight, colwidth);
    // }
    // else if (data.length < rowheight && data[0].length < colwidth) {
    //     Store.flowdata = datagridgrowth(data, rowheight - data.length, colwidth - data[0].length);
    // }
    // else if (data.length < rowheight) {
    //     Store.flowdata = datagridgrowth(data, rowheight - data.length, 0);
    // }
    // else if (data[0].length < colwidth) {
    //     Store.flowdata = datagridgrowth(data, 0, colwidth - data[0].length);
    // }
    // else {
    //     Store.flowdata = data;
    // }
    
    let flowHTML = flow;
    if(Store.config == null){
        Store.config = {};
    }

    rhchInit(rowheight, colwidth);

    const _locale = locale();
    const locale_info = _locale.info;

    let addControll = '<button id="luckysheet-bottom-add-row" class="btn btn-default">'+locale_info.add+'</button><input id="luckysheet-bottom-add-row-input" type="text" class="luckysheet-datavisual-config-input luckysheet-mousedown-cancel" placeholder="'+(luckysheetConfigsetting.addRowCount || 100)+'"><span style="font-size: 14px;">'+ locale_info.row +'</span><span style="font-size: 14px;color: #9c9c9c;">('+locale_info.addLast+')</span>';
    let backControll = ' <button id="luckysheet-bottom-bottom-top" class="btn btn-default" style="">'+ locale_info.backTop +'</button>';
    // let pageControll = ' <span id="luckysheet-bottom-page-info" style="font-size: 14px;color: #f34141;">共'+ luckysheetConfigsetting.pageInfo.totalPage +'页，当前已显示'+ (luckysheetConfigsetting.pageInfo.currentPage) +'页，每页'+ luckysheetConfigsetting.pageInfo.pageSize +'条</span> <button id="luckysheet-bottom-page-next" class="btn btn-danger" style="">下一页</button>';
    let pageInfo = replaceHtml(locale_info.pageInfo,{
        total:luckysheetConfigsetting.total?luckysheetConfigsetting.total:"",
        totalPage:luckysheetConfigsetting.pageInfo.totalPage?luckysheetConfigsetting.pageInfo.totalPage:"",
        currentPage:luckysheetConfigsetting.pageInfo.currentPage?luckysheetConfigsetting.pageInfo.currentPage:"",
    });
    let pageControll = ' <span id="luckysheet-bottom-page-info" style="font-size: 14px;color: #f34141;">'+ pageInfo +'</span> <button id="luckysheet-bottom-page-next" class="btn btn-danger" style="">下一页</button>';
    let pageControll2 = ' <span id="luckysheet-bottom-page-info" style="font-size: 14px;color: #f34141;">'+pageInfo+'</span>';

    let bottomControll = "";
    if(luckysheetConfigsetting.enableAddRow){
        bottomControll += addControll;
    }

    if(luckysheetConfigsetting.enablePage){
        if(parseInt(luckysheetConfigsetting.pageInfo.totalPage) == 1){
            bottomControll += pageControll2;
        }
        else{
            bottomControll += pageControll;
        }
    }

    if(luckysheetConfigsetting.enableAddBackTop){
        bottomControll += backControll;
    }

    let flowstr = replaceHtml('<div id="luckysheetcoltable_0" class="luckysheet-cell-flow-col"> <div id ="luckysheet-sheettable_0" class="luckysheet-cell-sheettable" style="height:${height}px;width:${width}px;"></div><div id="luckysheet-bottom-controll-row" class="luckysheet-bottom-controll-row"> '+ bottomControll +' </div> </div>', { "height": Store.rh_height, "width": Store.ch_width - 1 });

    let colsheader = replaceHtml(columnHeaderHTML, { "width": Store.ch_width, "index": 0, "column": "" });

    flowHTML = replaceHtml(flowHTML, { "width": Store.ch_width, "flow": flowstr, "index": 0 });

    gh = replaceHtml(gh, { "flow": flowHTML, "rowHeader": "<div style='height:" + Store.rh_height + "px' id='luckysheetrowHeader_0' class='luckysheetsheetchange'></div>", "columnHeader": colsheader, "functionButton": luckysheetConfigsetting.functionButton });//设置需要显示的菜单

    $("#" + Store.container).append(gh);

    $("#luckysheet-scrollbar-x div").width(Store.ch_width);
    $("#luckysheet-scrollbar-y div").height(Store.rh_height + Store.columnHeaderHeight - Store.cellMainSrollBarSize - 3);

    //新建行菜单
    $("body").append(maskHTML);
    $("body").append(colsmenuHTML);
    $("body").append(rightclickHTML());
    $("body").append(inputHTML);
    $("body").append(replaceHtml(filtermenuHTML(), { "menuid": "filter" }));
    $("body").append(replaceHtml(filtersubmenuHTML(), { "menuid": "filter" }));
    $("body").append(sheetconfigHTML());

    $("#luckysheet-rows-h").width((Store.rowHeaderWidth-1.5));
    $("#luckysheet-cols-h-c").height((Store.columnHeaderHeight-1.5));
    $("#luckysheet-left-top").css({width:Store.rowHeaderWidth-1.5, height:Store.columnHeaderHeight-1.5});

    // //批注
    // luckysheetPostil.buildAllPs(Store.flowdata);

    $("#luckysheet_info_detail_input").val(luckysheetConfigsetting.title);
}
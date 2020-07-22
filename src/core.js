
import defaultSetting from './config.js';
import { common_extend } from './utils/util';
import Store from './store';
import server from './controllers/server';
import luckysheetConfigsetting from './controllers/luckysheetConfigsetting';
import sheetmanage from './controllers/sheetmanage';
import luckysheetsizeauto from './controllers/resize';
import luckysheetHandler from './controllers/handler';

let luckysheet = {};

luckysheet.create = function (setting) {
    let extendsetting = common_extend(defaultSetting, setting);

    let loadurl = extendsetting.loadUrl,
        menu = extendsetting.menu,
        title = extendsetting.title;

    let container = extendsetting.container;
    Store.container = container;
    Store.luckysheetfile = extendsetting.data;
    Store.defaultcolumnNum = extendsetting.column;
    Store.defaultrowNum = extendsetting.row;
    Store.fullscreenmode = extendsetting.fullscreenmode;
    Store.lang = extendsetting.lang; //language

    server.gridKey = extendsetting.gridKey;
    server.loadUrl = extendsetting.loadUrl;
    server.updateUrl = extendsetting.updateUrl;
    server.updateImageUrl = extendsetting.updateImageUrl;
    server.title = extendsetting.title;
    server.loadSheetUrl = extendsetting.loadSheetUrl;
    server.allowUpdate = extendsetting.allowUpdate;

    luckysheetConfigsetting.autoFormatw = extendsetting.autoFormatw;
    luckysheetConfigsetting.accuracy = extendsetting.accuracy;
    luckysheetConfigsetting.total = extendsetting.data[0].total;

    luckysheetConfigsetting.allowCopy = extendsetting.allowCopy;
    luckysheetConfigsetting.showtoolbar = extendsetting.showtoolbar;
    luckysheetConfigsetting.showinfobar = extendsetting.showinfobar;
    luckysheetConfigsetting.showsheetbar = extendsetting.showsheetbar;
    luckysheetConfigsetting.showstatisticBar = extendsetting.showstatisticBar;
    luckysheetConfigsetting.pointEdit = extendsetting.pointEdit;
    luckysheetConfigsetting.pointEditUpdate = extendsetting.pointEditUpdate;
    luckysheetConfigsetting.pointEditZoom = extendsetting.pointEditZoom;

    luckysheetConfigsetting.userInfo = extendsetting.userInfo;
    luckysheetConfigsetting.userMenuItem = extendsetting.userMenuItem;
    luckysheetConfigsetting.myFolderUrl = extendsetting.myFolderUrl;
    luckysheetConfigsetting.functionButton = extendsetting.functionButton;

    luckysheetConfigsetting.showConfigWindowResize = extendsetting.showConfigWindowResize;
    luckysheetConfigsetting.enableAddRow = extendsetting.enableAddRow;
    luckysheetConfigsetting.enableAddCol = extendsetting.enableAddCol;
    luckysheetConfigsetting.enablePage = extendsetting.enablePage;
    luckysheetConfigsetting.pageInfo = extendsetting.pageInfo;

    luckysheetConfigsetting.editMode = extendsetting.editMode;
    luckysheetConfigsetting.chartConfigChange = extendsetting.chartConfigChange;
    luckysheetConfigsetting.beforeCreateDom = extendsetting.beforeCreateDom;

    luckysheetConfigsetting.fireMousedown = extendsetting.fireMousedown;

    let devicePixelRatio = extendsetting.devicePixelRatio;
    if(devicePixelRatio == null){
        devicePixelRatio = 1;
    }
    Store.devicePixelRatio = Math.ceil(devicePixelRatio);

    //loading
    $("#" + container).append('<div id="luckysheetloadingdata" style="width:100%;text-align:center;position:absolute;top:0px;height:100%;font-size: 16px;z-index:1000000000;background:#fff;"><div style="position:relative;top:45%;width:100%;"> <div class="luckysheetLoaderGif"> </div> <span>渲染中...</span></div></div>');

    let data = [];
    if (loadurl == "") {
        sheetmanage.initialjfFile(menu, title);
        luckysheetsizeauto();
        luckysheetHandler();
    }
    else {
        $.post(loadurl, {"gridKey" : server.gridKey}, function (d) {
            let data = eval("(" + d + ")");
            Store.luckysheetfile = data;
            
            sheetmanage.initialjfFile(menu, title);
            luckysheetsizeauto();
            luckysheetHandler();

            //需要更新数据给后台时，建立WebSocket连接
            if(server.allowUpdate){
                server.openWebSocket();    
            }
        });
    }
}

export {
    luckysheet
}
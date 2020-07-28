
import defaultSetting from './config.js';
import { common_extend } from './utils/util';
import Store from './store';
import server from './controllers/server';
import luckysheetConfigsetting from './controllers/luckysheetConfigsetting';
import sheetmanage from './controllers/sheetmanage';
import luckysheetsizeauto from './controllers/resize';
import luckysheetHandler from './controllers/handler';
import {initPlugins} from './controllers/expendPlugins';
import { 
    getluckysheetfile, 
    getluckysheet_select_save, 
    getconfig, 
} from './methods/get';
import { 
    setluckysheetfile,
    setluckysheet_select_save,
    setconfig,
} from './methods/set';
import { luckysheetrefreshgrid } from './global/refresh';
import functionlist from './function/functionlist';

let luckysheet = {};

//创建luckysheet表格
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
    Store.allowEdit = extendsetting.allowEdit;

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
    luckysheetConfigsetting.plugins = extendsetting.plugins;

    // Register plugins
    initPlugins(extendsetting.plugins);

    // Store formula information, including internationalization
    functionlist();

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

//获取所有表格数据
luckysheet.getluckysheetfile = getluckysheetfile;

//获取当前表格 选区
luckysheet.getluckysheet_select_save = getluckysheet_select_save;

//设置当前表格 选区
luckysheet.setluckysheet_select_save = setluckysheet_select_save;

//获取当前表格 config配置
luckysheet.getconfig = getconfig;

//设置当前表格 config配置
luckysheet.setconfig = setconfig;

//二维数组数据 转化成 {r, c, v}格式 一维数组 (传入参数为二维数据data)
luckysheet.getGridData = sheetmanage.getGridData;

//生成表格所需二维数组 （传入参数为表格数据对象file）
luckysheet.buildGridData = sheetmanage.buildGridData;

luckysheet.luckysheetrefreshgrid = luckysheetrefreshgrid;

export {
    luckysheet
}
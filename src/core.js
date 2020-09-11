
import defaultSetting from './config.js';
import { common_extend } from './utils/util';
import Store from './store';
import server from './controllers/server';
import luckysheetConfigsetting from './controllers/luckysheetConfigsetting';
import sheetmanage from './controllers/sheetmanage';
import luckysheetsizeauto from './controllers/resize';
import luckysheetHandler from './controllers/handler';
import {initialFilterHandler} from './controllers/filter';
import {initialMatrixOperation} from './controllers/matrixOperation';
import {initialSheetBar} from './controllers/sheetBar';
import {formulaBarInitial} from './controllers/formulaBar';
import {rowColumnOperationInitial} from './controllers/rowColumnOperation';
import {keyboardInitial} from './controllers/keyboard';
import {orderByInitial} from './controllers/orderBy';
import {initPlugins} from './controllers/expendPlugins';
import { 
    getluckysheetfile, 
    getluckysheet_select_save, 
    getconfig, 
} from './methods/get';
import { 
    setluckysheet_select_save
} from './methods/set';
import { luckysheetrefreshgrid, jfrefreshgrid } from './global/refresh';
import functionlist from './function/functionlist';
import { luckysheetlodingHTML } from './controllers/constant';
import { getcellvalue, getdatabyselection } from './global/getdata';
import { setcellvalue } from './global/setdata';
import { selectHightlightShow } from './controllers/select';
import {zoomInitial} from './controllers/zoom';
import method from './global/method';

import * as api from './global/api';

let luckysheet = {};

// mount api
// luckysheet.api = api;
Object.assign(luckysheet, api);

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
    luckysheetConfigsetting.beforeCreateDom = extendsetting.beforeCreateDom;

    luckysheetConfigsetting.fireMousedown = extendsetting.fireMousedown;
    luckysheetConfigsetting.forceCalculation = extendsetting.forceCalculation;
    luckysheetConfigsetting.plugins = extendsetting.plugins;

    luckysheetConfigsetting.rowHeaderWidth = extendsetting.rowHeaderWidth;
    luckysheetConfigsetting.columeHeaderHeight = extendsetting.columeHeaderHeight;

    luckysheetConfigsetting.defaultColWidth = extendsetting.defaultColWidth;
    luckysheetConfigsetting.defaultRowHeight = extendsetting.defaultRowHeight;

    luckysheetConfigsetting.title = extendsetting.title;

    // Register plugins
    initPlugins(extendsetting.plugins , extendsetting.data);

    // Store formula information, including internationalization
    functionlist();

    let devicePixelRatio = extendsetting.devicePixelRatio;
    if(devicePixelRatio == null){
        devicePixelRatio = 1;
    }
    Store.devicePixelRatio = Math.ceil(devicePixelRatio);

    //loading
    $("#" + container).append(luckysheetlodingHTML());

    let data = [];
    if (loadurl == "") {
        sheetmanage.initialjfFile(menu, title);
        // luckysheetsizeauto();
        initialWorkBook();
    }
    else {
        $.post(loadurl, {"gridKey" : server.gridKey}, function (d) {
            let data = eval("(" + d + ")");
            Store.luckysheetfile = data;
            
            sheetmanage.initialjfFile(menu, title);
            // luckysheetsizeauto();
            initialWorkBook();

            //需要更新数据给后台时，建立WebSocket连接
            if(server.allowUpdate){
                server.openWebSocket();    
            }
        });
    }
}

function initialWorkBook(){
    luckysheetHandler();//Overall dom initialization
    initialFilterHandler();//Filter initialization
    initialMatrixOperation();//Right click matrix initialization
    initialSheetBar();//bottom sheet bar initialization
    formulaBarInitial();//top formula bar initialization
    rowColumnOperationInitial();//row and coloumn operate initialization
    keyboardInitial();//Keyboard operate initialization
    orderByInitial();//menu bar orderby function initialization
    zoomInitial();//zoom method initialization
}

//获取所有表格数据
luckysheet.getluckysheetfile = getluckysheetfile;

//获取当前表格 选区
luckysheet.getluckysheet_select_save = getluckysheet_select_save;

//设置当前表格 选区
luckysheet.setluckysheet_select_save = setluckysheet_select_save;

//获取当前表格 config配置
luckysheet.getconfig = getconfig;

//二维数组数据 转化成 {r, c, v}格式 一维数组 (传入参数为二维数据data)
luckysheet.getGridData = sheetmanage.getGridData;

//生成表格所需二维数组 （传入参数为表格数据对象file）
luckysheet.buildGridData = sheetmanage.buildGridData;

// Refresh the canvas display data according to scrollHeight and scrollWidth
luckysheet.luckysheetrefreshgrid = luckysheetrefreshgrid;

// Refresh canvas
luckysheet.jfrefreshgrid = jfrefreshgrid;

// Get the value of the cell
luckysheet.getcellvalue = getcellvalue;

// Set cell value
luckysheet.setcellvalue = setcellvalue;

// Get selection range value
luckysheet.getdatabyselection = getdatabyselection;

luckysheet.sheetmanage = sheetmanage;

// Data of the current table
luckysheet.flowdata = function () {
    return Store.flowdata;
}

// Set selection highlight
luckysheet.selectHightlightShow = selectHightlightShow;

// Set the worksheet to hide
// Use the call method to change the `this` of the function to `this` of sheetmanage,
// Prevent _this error in setSheetHide
luckysheet.setSheetHide = function(index) {
    return sheetmanage.setSheetHide.call(sheetmanage,index);
}

// Set the worksheet to show
luckysheet.setSheetShow = function(index) {
    return sheetmanage.setSheetShow.call(sheetmanage,index);
}

// Reset parameters after destroying the table
luckysheet.destroy = method.destroy;

export {
    luckysheet
}
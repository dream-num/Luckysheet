
import defaultSetting from './config.js'
import luckysheet from './luckysheet-chart'




luckysheet.create = function (setting) {
    var extendsetting = common_extend(defaultSetting, setting);
    var //defaultflow = extendsetting.defaultflow,
        loadurl = extendsetting.loadUrl,
        //data1 = extendsetting.data,
        menu = extendsetting.menu,
        title = extendsetting.title;

    container = extendsetting.container;
    //config = extendsetting.config;
    luckysheetfile = extendsetting.data;
    defaultcolumnNum = extendsetting.column;
    defaultrowNum = extendsetting.row;
    fullscreenmode = extendsetting.fullscreenmode;

    luckysheet.server.gridKey = extendsetting.gridKey;
    luckysheet.server.loadUrl = extendsetting.loadUrl;
    luckysheet.server.updateUrl = extendsetting.updateUrl;
    luckysheet.server.updateImageUrl = extendsetting.updateImageUrl;
    luckysheet.server.title = extendsetting.title;
    luckysheet.server.loadSheetUrl = extendsetting.loadSheetUrl;
    luckysheet.server.allowUpdate = extendsetting.allowUpdate;

    luckysheetConfigsetting.autoFormatw = extendsetting.autoFormatw;
    luckysheetConfigsetting.accuracy = extendsetting.accuracy;
    luckysheetConfigsetting.total = luckysheetfile[0].total;

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

    devicePixelRatio = extendsetting.devicePixelRatio;
    if(devicePixelRatio==null){
        devicePixelRatio = 1;
    }
    devicePixelRatio = Math.ceil(devicePixelRatio);

    //luckysheet.tooltip.chartPointConfig("luckysheet-chart-point-config");

    //loading
    $("#" + container).append('<div id="luckysheetloadingdata" style="width:100%;text-align:center;position:absolute;top:0px;height:100%;font-size: 16px;z-index:1000000000;background:#fff;"><div style="position:relative;top:45%;width:100%;"> <div class="luckysheetLoaderGif"> </div> <span>渲染中...</span></div></div>');

    if(luckysheetConfigsetting.pointEdit){
        //编辑器qksheet表格编辑状态
        $("#" + container).attr("tabindex", 0).focus();
        $("#luckysheetloadingdata .luckysheetLoaderGif").css({ "width": "4em", "height": "4em" });
    }

    var data = [];
    if (loadurl == "") {
        luckysheet.sheetmanage.initialjfFile(menu, title);
        luckysheet.luckysheetsizeauto();
        luckysheet.luckysheetHandler();
        luckysheet.chartInitial();
        //luckysheet.luckysheetactiveCell();
    }
    else {
        $.post(loadurl, {"gridKey" : luckysheet.server.gridKey}, function (d) {
            var data = eval("(" + d + ")");
            luckysheetfile = data;
            
            luckysheet.sheetmanage.initialjfFile(menu, title);
            luckysheet.luckysheetsizeauto();
            luckysheet.luckysheetHandler();
            luckysheet.chartInitial();

            //需要更新数据给后台时，建立WebSocket连接
            if(luckysheet.server.allowUpdate){
                luckysheet.server.openWebSocket();    
            }

            // setTimeout(function(){
            //     $("#luckysheetloadingdata").fadeOut().remove();
            // }, 500);
            //luckysheet.luckysheetactiveCell();
        });
    }

    return luckysheet;
}
export {
    luckysheet
}
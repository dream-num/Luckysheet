import server from '../controllers/server';
import { luckysheetlodingHTML, luckyColor } from '../controllers/constant';
import sheetmanage from '../controllers/sheetmanage';
import luckysheetformula from './formula';
import imageCtrl from '../controllers/imageCtrl';
import dataVerificationCtrl from '../controllers/dataVerificationCtrl';
import pivotTable from '../controllers/pivotTable';
import luckysheetFreezen from '../controllers/freezen';
import { getSheetIndex } from '../methods/get';
import { luckysheetextendData } from './extend';
import luckysheetConfigsetting from '../controllers/luckysheetConfigsetting';
import editor from './editor';
import luckysheetcreatesheet from './createsheet';
import Store from '../store';

const defaultConfig = {
    defaultStore:{
        container: null, 
        luckysheetfile: null, 
        defaultcolumnNum: 60, 
        defaultrowNum: 84, 
        fullscreenmode: true,
        devicePixelRatio: 1,
    
        currentSheetIndex: 0,
        calculateSheetIndex: 0,
        flowdata: [],
        config: {},
    
        visibledatarow: [],
        visibledatacolumn: [],
        ch_width: 0,
        rh_height: 0,
    
        cellmainWidth: 0,
        cellmainHeight: 0,
        toolbarHeight: 0,
        infobarHeight: 0,
        calculatebarHeight: 0,
        rowHeaderWidth: 46,
        columnHeaderHeight: 20,
        cellMainSrollBarSize: 12,
        sheetBarHeight: 31,
        statisticBarHeight: 23,
        luckysheetTableContentHW: [0, 0], 
    
        defaultcollen: 73,
        defaultrowlen: 19,
    
        jfcountfuncTimeout: null, 
        jfautoscrollTimeout: null,
    
        luckysheet_select_status: false,
        luckysheet_select_save: [{ "row": [0, 0], "column": [0, 0] }],
        luckysheet_selection_range: [],
    
        luckysheet_copy_save: {}, //复制粘贴
        luckysheet_paste_iscut: false,
    
        filterchage: true, //筛选
        luckysheet_filter_save: { "row": [], "column": [] },
    
        luckysheet_sheet_move_status: false,
        luckysheet_sheet_move_data: [],
        luckysheet_scroll_status: false,
    
        luckysheetisrefreshdetail: true,
        luckysheetisrefreshtheme: true,
        luckysheetcurrentisPivotTable: false,
    
        luckysheet_rows_selected_status: false,  //行列标题相关参
        luckysheet_cols_selected_status: false,  
        luckysheet_rows_change_size: false,
        luckysheet_rows_change_size_start: [],
        luckysheet_cols_change_size: false,
        luckysheet_cols_change_size_start: [],
        luckysheet_cols_dbclick_timeout: null,
        luckysheet_cols_dbclick_times: 0,
    
        luckysheetCellUpdate: [],
        
        luckysheet_shiftpositon: null,
    
        iscopyself: true,
    
        orderbyindex: 0, //排序下标
    
        luckysheet_model_move_state: false, //模态框拖动
        luckysheet_model_xy: [0, 0],
        luckysheet_model_move_obj: null,
    
        luckysheet_cell_selected_move: false,  //选区拖动替换
        luckysheet_cell_selected_move_index: [],
    
        luckysheet_cell_selected_extend: false,  //选区下拉
        luckysheet_cell_selected_extend_index: [],
        luckysheet_cell_selected_extend_time: null,
    
        clearjfundo: true,
        jfredo: [],
        jfundo: [],
        lang: 'en', //language
        createChart: '',
        highlightChart: '',
        zIndex: 15,
        chartparam: {
            luckysheetCurrentChart: null, //current chart_id
            luckysheetCurrentChartActive: false,
            luckysheetCurrentChartMove: null, // Debounce state
            luckysheetCurrentChartMoveTimeout: null,//拖动图表框的节流定时器
            luckysheetCurrentChartMoveObj: null, //chart DOM object
            luckysheetCurrentChartMoveXy: null, //上一次操作结束的图表信息，x,y: chart框位置，scrollLeft1,scrollTop1: 滚动条位置
            luckysheetCurrentChartMoveWinH: null, //左右滚动条滑动距离
            luckysheetCurrentChartMoveWinW: null, //上下滚动条滑动距离
            luckysheetCurrentChartResize: null,
            luckysheetCurrentChartResizeObj: null,
            luckysheetCurrentChartResizeXy: null,
            luckysheetCurrentChartResizeWinH: null,
            luckysheetCurrentChartResizeWinW: null,
            luckysheetInsertChartTosheetChange: true, // 正在执行撤销
            luckysheetCurrentChartZIndexRank : 100,
            luckysheet_chart_redo_click:false, //撤销重做时标识
            luckysheetCurrentChartMaxState: false, //图表全屏状态
            jfrefreshchartall: '',
            changeChartCellData: '',
            renderChart: '',
            getChartJson: ''
        },
        functionList:null, //function list explanation
        luckysheet_function:null,
        chart_selection: {},
        currentChart: '',
        scrollRefreshSwitch:true,
    
        measureTextCache:{},
        measureTextCellInfoCache:{},
        measureTextCacheTimeOut:null,
        cellOverflowMapCache:{},
    
        zoomRatio:1,
    
        visibledatacolumn_unique:null,
        visibledatarow_unique:null,
    
        showGridLines:true,
    
        toobarObject: {}, //toolbar constant
        inlineStringEditCache:null,
        inlineStringEditRange:null,
    
        fontList:[],

        currentSheetView:"viewNormal",
    
    },    
    defaultFormula:{
        searchFunctionCell: null,
        functionlistPosition: {},
        rangechangeindex: null,
        rangestart: false,
        rangetosheet: null,
        rangeSetValueTo: null,
        func_selectedrange: {}, //函数选区范围
        rangedrag_column_start: false,
        rangedrag_row_start: false,
        rangeResizeObj: null,
        rangeResize: null,
        rangeResizeIndex: null,
        rangeResizexy: null,
        rangeResizeWinH: null,
        rangeResizeWinW: null,
        rangeResizeTo: null,
        rangeMovexy: null,
        rangeMove: false,
        rangeMoveObj: null,
        rangeMoveIndex: null,
        rangeMoveRangedata: null,
        functionHTMLIndex: 0,
        functionRangeIndex: null,
        execvertex: {},
        execFunctionGroupData: null,
        execFunctionExist: null,
        formulaContainSheetList:{},
        cellTextToIndexList:{},
        isFunctionRangeSave: false,
        formulaContainCellList:{},
        execFunctionGlobalData:{},
        groupValuesRefreshData: [],
        functionResizeData: {},
        functionResizeStatus: false,
        functionResizeTimeout: null,
        data_parm_index: 0  //选择公式后参数索引标记
    },
    defaultSheet:{
        sheetMaxIndex: 0,
        nulldata: null,
        mergeCalculationSheet:{},
        checkLoadSheetIndexToDataIndex:{},
        CacheNotLoadControll:[],
    },
    defaultPivotTable:{
        pivotDatas: null,
        pivotSheetIndex: 0,
        pivotDataSheetIndex: 0,
        celldata: null,
        origindata: null,
        pivot_data_type: {},
        pivot_select_save: null,
        column: null,
        row: null,
        values: null,
        filter: null,
        showType: null,
        rowhidden: null,
        selected: null,
        caljs: null,
        initial: true,
        filterparm: null,
        luckysheet_pivotTable_select_state: false,
        jgridCurrentPivotInput: null,
        movestate: false,
        moveitemposition: [],
        movesave: {},
        drawPivotTable: true,
        pivotTableBoundary: [12, 6],
    },
    defaultImage:{
        imgItem: {
            type: '3',  //1移动并调整单元格大小 2移动并且不调整单元格的大小 3不要移动单元格并调整其大小
            src: '',  //图片url
            originWidth: null,  //图片原始宽度
            originHeight: null,  //图片原始高度
            default: {
                width: null,  //图片 宽度
                height: null,  //图片 高度
                left: null,  //图片离表格左边的 位置
                top: null,  //图片离表格顶部的 位置
            },
            crop: {
                width: null,  //图片裁剪后 宽度
                height: null,  //图片裁剪后 高度
                offsetLeft: 0,  //图片裁剪后离未裁剪时 左边的位移
                offsetTop: 0,  //图片裁剪后离未裁剪时 顶部的位移
            },
            isFixedPos: false,  //固定位置
            fixedLeft: null,  //固定位置 左位移
            fixedTop: null,  //固定位置 右位移
            border: {
                width: 0,  //边框宽度
                radius: 0,  //边框半径
                style: 'solid',  //边框类型
                color: '#000',  //边框颜色
            }
        },
        images: null,
        currentImgId: null,
        currentWinW: null,
        currentWinH: null,
        resize: null,  
        resizeXY: null,
        move: false,
        moveXY: null,
        cropChange: null,  
        cropChangeXY: null,
        cropChangeObj: null,
        copyImgItemObj: null,
    },
    defaultDataVerification:{
        defaultItem: {
            type: 'dropdown',  //类型
            type2: null,  //
            value1: '',  //
            value2: '',  //
            checked: false,
            remote: false,  //自动远程获取选项
            prohibitInput: false,  //输入数据无效时禁止输入
            hintShow: false,  //选中单元格时显示提示语
            hintText: '',  //
        },
        curItem: null,
        dataVerification: null,
        selectRange: [],
        selectStatus: false,
    }
}

const method = {
    //翻页
    addDataAjax: function(param, index, url, func){
        let _this = this;

        if(index == null){
            index = Store.currentSheetIndex;
        }

        if(url == null){
            url = server.loadSheetUrl;
        }

        $("#luckysheet-grid-window-1").append(luckysheetlodingHTML());
        param.currentPage++;
        
        let dataType = 'application/json;charset=UTF-8';
        let token = sessionStorage.getItem('x-auth-token');

        $.ajax({
            method: 'POST',
            url: url,
            headers: { "x-auth-token": token },
            data: JSON.stringify(param),
            contentType: dataType,
            success: function(d) {
                //d可能为json字符串
                if(typeof d == "string"){
                    d = JSON.parse(d);
                }

                let dataset = d.data;
                
                let newData = dataset.celldata;
                luckysheetextendData(dataset["row"], newData);

                setTimeout(function(){
                    Store.loadingObj.close()
                }, 500);

                if(func && typeof(func)=="function"){ 
                    func(dataset);
                }
            }
        })
    },
    //重载
    reload: function(param, index, url, func){
        let _this = this;

        if(index == null){
            index = Store.currentSheetIndex;
        }

        if(url == null){
            url = server.loadSheetUrl;
        }

        $("#luckysheet-grid-window-1").append(luckysheetlodingHTML());

        let arg = {"gridKey" : server.gridKey, "index": index};
        param = $.extend(true, param, arg);
        let file = Store.luckysheetfile[getSheetIndex(index)];

        $.post(url, param, function (d) {
            let dataset = new Function("return " + d)();
            file.celldata = dataset[index.toString()];
            let data = sheetmanage.buildGridData(file);

            setTimeout(function(){
                Store.loadingObj.close()
            }, 500);

            file["data"] = data;
            Store.flowdata = data;
            editor.webWorkerFlowDataCache(data);//worker存数据

            luckysheetcreatesheet(data[0].length, data.length, data, null, false);
            file["load"] = "1";

            Store.luckysheet_select_save.length = 0;
            Store.luckysheet_selection_range = [];

            server.saveParam("shs", null, Store.currentSheetIndex);

            sheetmanage.changeSheet(index);

            if(func && typeof(func)=="function"){ 
                func();
            }
        });
    },
    clearSheetByIndex: function(i){
        let index = getSheetIndex(i);
        let sheetfile = Store.luckysheetfile[index];

        if(!sheetfile.isPivotTable){
            sheetfile.data = [];
            sheetfile.row = Store.defaultrowNum;
            sheetfile.column = Store.defaultcolumnNum;

            sheetfile.chart = [];
            sheetfile.config = null;
            sheetfile.filter = null;
            sheetfile.filter_select = null;
            sheetfile.celldata = [];
            sheetfile.pivotTable = {};
            sheetfile.calcChain = [];
            sheetfile.status = 0;
            sheetfile.load = 0;

            Store.flowdata = [];
            editor.webWorkerFlowDataCache(Store.flowdata);//worker存数据

            $("#"+ Store.container +" .luckysheet-data-visualization-chart").remove();
            $("#"+ Store.container +" .luckysheet-datavisual-selection-set").remove();

            $("#luckysheet-row-count-show, #luckysheet-formula-functionrange-select, #luckysheet-row-count-show, #luckysheet-column-count-show, #luckysheet-change-size-line, #luckysheet-cell-selected-focus, #luckysheet-selection-copy, #luckysheet-cell-selected-extend, #luckysheet-cell-selected-move, #luckysheet-cell-selected").hide();

            delete sheetfile.load;
        }
        else {
            delete Store.luckysheetfile[index];
        }
    },
    clear: function(index){
        let _this = this;

        if(index == "all"){
            for(let i = 0; i < Store.luckysheetfile.length; i++){
                let sheetfile = Store.luckysheetfile[i];
                _this.clearSheetByIndex(sheetfile.index);
            }
            
        }
        else{
            if(index == null){
                index = Store.currentSheetIndex;
            }
            _this.clearSheetByIndex(index);
        }

        sheetmanage.changeSheet(Store.luckysheetfile[0].index);
    },
    destroy:function(){
        $("#" + Store.container).empty();
        $("body > .luckysheet-cols-menu").remove();

        $("#luckysheet-modal-dialog-mask, #luckysheetTextSizeTest, #luckysheet-icon-morebtn-div").remove();
        $("#luckysheet-input-box").parent().remove();
        $("#luckysheet-formula-help-c").remove();
        $(".chartSetting, .luckysheet-modal-dialog-slider").remove();

        //document event release
        $(document).off(".luckysheetEvent");
        $(document).off(".luckysheetProtection");
        
        //参数重置
        luckysheetFreezen.initialHorizontal = true;
        luckysheetFreezen.initialVertical = true;

        let defaultStore = $.extend(true, {}, defaultConfig.defaultStore);
        for(let key in defaultStore){
            if(key in Store){
                Store[key] = defaultStore[key];
            }
        }

        let defaultFormula = $.extend(true, {}, defaultConfig.defaultFormula);
        for(let key in defaultFormula){
            if(key in luckysheetformula){
                luckysheetformula[key] = defaultFormula[key];
            }
        }

        let defaultSheet = $.extend(true, {}, defaultConfig.defaultSheet);
        for(let key in defaultSheet){
            if(key in sheetmanage){
                sheetmanage[key] = defaultSheet[key];
            }
        }

        let defaultPivotTable = $.extend(true, {}, defaultConfig.defaultPivotTable);
        for(let key in defaultPivotTable){
            if(key in pivotTable){
                pivotTable[key] = defaultPivotTable[key];
            }
        }

        let defaultImage = $.extend(true, {}, defaultConfig.defaultImage);
        for(let key in defaultImage){
            if(key in imageCtrl){
                imageCtrl[key] = defaultImage[key];
            }
        }

        let defaultDataVerification = $.extend(true, {}, defaultConfig.defaultDataVerification);
        for(let key in defaultDataVerification){
            if(key in dataVerificationCtrl){
                dataVerificationCtrl[key] = defaultDataVerification[key];
            }
        }

        // remove proxy
        Store.asyncLoad = ['core'];
    },
    editorChart:function(c){
        let chart_selection_color = luckyColor[0];
        let chart_id = "luckysheetEditMode-datav-chart";
        let chart_selection_id = chart_id + "_selection";
        c.chart_id = chart_id;
        let chartTheme = c.chartTheme;
        chartTheme = chartTheme == null ? "default0000" : chartTheme;

        luckysheet.insertChartTosheet(c.sheetIndex, c.dataSheetIndex, c.option, c.chartType, c.selfOption, c.defaultOption, c.row, c.column, chart_selection_color, chart_id, chart_selection_id, c.chartStyle, c.rangeConfigCheck, c.rangeRowCheck, c.rangeColCheck, c.chartMarkConfig, c.chartTitleConfig, c.winWidth, c.winHeight, c.scrollLeft, c.scrollTop, chartTheme, c.myWidth, c.myHeight, c.myLeft!=null?parseFloat(c.myLeft):null, c.myTop!=null?parseFloat(c.myTop):null, c.myindexrank, true);

        $("#"+chart_id).find(".luckysheet-modal-controll-update").click();
    },
    /**
     * 获取单元格的值
     * @param {name} 函数名称
     * @param {arguments} 函数参数
     */
    createHookFunction:function(){
        let hookName = arguments[0];
        if(luckysheetConfigsetting.hook && luckysheetConfigsetting.hook[hookName]!=null && (typeof luckysheetConfigsetting.hook[hookName] == "function")){
            var args = Array.prototype.slice.apply(arguments);
            args.shift();
            let ret = luckysheetConfigsetting.hook[hookName].apply(this, args);
            if(ret===false){
                return false;
            }
            else{
                return true;
            }
        }

        return true;
    }

}

export default method;
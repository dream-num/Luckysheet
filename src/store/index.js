const Store = {
    container: null, 
    loadingObj:{},
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
    jfundo: [],
    jfredo: [],
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
    defaultFontSize: 10,

    currentSheetView:"viewNormal",

    // cooperative editing
    cooperativeEdit:{
        usernameTimeout:{

        },
        changeCollaborationSize:[], //改变行高或者列宽时，协同提示框需要跟随改变所需数据
        allDataColumnlen:[],//列宽发生过改变的列
        merge_range:{},//合并时单元格信息
        checkoutData:[],//切换表格页时所需数据
    },

    // Resources that currently need to be loaded asynchronously, especially plugins. 'Core' marks the core rendering process.
    asyncLoad:['core'],
    // 默认单元格
    defaultCell: {
        bg: null,
        bl: 0,
        ct: {fa: "General", t: "n"},
        fc: "rgb(51, 51, 51)",
        ff: 0,
        fs: 11,
        ht: 1,
        it: 0,
        vt: 1,
        m: '',
        v: ''
    },
    conditionFormatCells: {}, // 条件格式高亮的单元格

}

export default Store;
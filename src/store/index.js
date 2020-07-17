const Store = {
    container: null, 
    luckysheetfile: null, 
    defaultcolumnNum: 60, 
    defaultrowNum: 84, 
    fullscreenmode: true,
    devicePixelRatio: 1,

	currentSheetIndex: 0,
	flowdata: [],
    config: {},

    visibledatarow: [],
    visibledatacolumn: [],
    ch_width: 0,
    rh_height: 0,

    cellmainWidth: 0,
    cellmainHeight: 0,
    toolbarHeight: 35,
    infobarHeight: 30,
    calculatebarHeight: 30,
    rowHeaderWidth: 46,
    columeHeaderHeight: 20,
    cellMainSrollBarSize: 12,
    sheetBarHeight: 27,
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
}

export default Store;
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
    luckysheet_select_save: [{ "row": [0, 0], "column": [0, 0] }],

    countfuncTimeout: null, 
    autoscrollTimeout: null,
}

// TODO:class store
// const _store = {
//     visibledatarow: []
// }

// class Store{
//     constructor(){
//     }
//     addVisibledatarow(value){
//         _store.visibledatarow.push(value);
//     }
//     getVisibledatarow(){
//         return _store.visibledatarow;
//     }
// }

export default Store;
const luckysheetConfigsetting = {
    autoFormatw: false,
    accuracy: undefined,
    total: 0,

    allowCopy: true,
    showtoolbar: true,
    showinfobar: true,
    showsheetbar: true,
    showstatisticBar: true,
    pointEdit: false,
    pointEditUpdate: null,
    pointEditZoom: 1,

    userInfo: null,
    userMenuItem: [],
    myFolderUrl: null,
    functionButton: null,

    showConfigWindowResize: true,
    enableAddRow: true,
    enableAddCol: true,
    enablePage: true,
    pageInfo: null,
    
    
    editMode: false,
    beforeCreateDom: null,
    fireMousedown: null,
    plugins:[],
    forceCalculation:false,//强制刷新公式，公式较多会有性能问题，慎用

    defaultColWidth:73,
    defaultRowHeight:19,
}

export default luckysheetConfigsetting;